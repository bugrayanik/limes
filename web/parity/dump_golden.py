"""Golden oracle for the TypeScript engine port (Phase 0).

Plays a match on the validated Python engine and emits a deterministic JSON
trace: a canonical state hash after every round, plus the final result. The TS
port replays the SAME (seed, config, bots) and must reproduce every hash. Any
divergence localises the first round where the port differs from the oracle.

Usage:
  python3 dump_golden.py --seed 12345 --p1 HONEST --p2 AGGRO [--config '{...}']
  python3 dump_golden.py --suite           # a fixed battery of seeds/pairings -> golden.json
"""
import argparse
import hashlib
import json
import os
import sys

SIM = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__)))), 'sim')
sys.path.insert(0, SIM)
import engine   # noqa: E402
import bots     # noqa: E402


def _jsonable(v):
    if isinstance(v, tuple):
        return list(v)
    if isinstance(v, (list,)):
        return [_jsonable(x) for x in v]
    if isinstance(v, dict):
        return {str(k): _jsonable(x) for k, x in v.items()}
    if isinstance(v, (int, float, str, bool)) or v is None:
        return v
    return repr(v)          # last-resort stable string


def _unit_snap(u):
    """Canonical scalar snapshot of a Unit (uses __slots__, no __dict__)."""
    slots = getattr(type(u), '__slots__', None) or ()
    return {k: _jsonable(getattr(u, k)) for k in slots}


def snapshot(g):
    units = sorted((_unit_snap(u) for u in g.units.values()),
                   key=lambda d: d.get('uid', 0))
    return {
        'round': g.round,
        'komi': g.komi,
        'stakes': list(g.stakes),
        'res': _jsonable(g.res),
        'units': units,
        'wagons': _jsonable(g.wagons),
        'fields': sorted(([list(k), _jsonable(v)] for k, v in g.fields.items()),
                         key=lambda kv: kv[0]),
        'palisades': sorted([[k, v] for k, v in g.palisades.items()]),
        'entrench': sorted([[list(k), v] for k, v in g.entrench.items()]),
    }


def state_hash(g):
    blob = json.dumps(snapshot(g), sort_keys=True, separators=(',', ':'))
    return hashlib.sha1(blob.encode()).hexdigest()[:16]


def run(seed, p1, p2, config, terrain_seed=None):
    b0, b1 = bots.make_bot(p1), bots.make_bot(p2)
    g = engine.Game([b0, b1], seed, overrides=config, terrain_seed=terrain_seed)
    for p in (0, 1):
        [b0, b1][p].reset(seed, p)
    g.setup()
    hashes = [state_hash(g)]          # post-setup, pre-round-1
    winner = wtype = None
    try:
        while True:
            g.play_round()
            hashes.append(state_hash(g))
    except engine.GameOver as e:
        winner, wtype = e.winner, e.wtype
    return {
        'seed': seed, 'p1': p1, 'p2': p2,
        'config': config or {}, 'terrain_seed': terrain_seed,
        'round_hashes': hashes,
        'result': {'winner': winner, 'win_type': wtype, 'rounds': g.round},
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--seed', type=int, default=12345)
    ap.add_argument('--p1', default='HONEST')
    ap.add_argument('--p2', default='AGGRO')
    ap.add_argument('--config', default=None)
    ap.add_argument('--suite', action='store_true')
    ap.add_argument('--out', default=None)
    a = ap.parse_args()
    cfg = json.loads(a.config) if a.config else None
    if a.suite:
        pairs = [('HONEST', 'AGGRO'), ('TURTLE', 'PROBER'),
                 ('AGGRO', 'AGGRO'), ('SANDBAGGER', 'HONEST')]
        out = [run(70000 + i, p1, p2, cfg) for i, (p1, p2) in enumerate(pairs)]
        blob = json.dumps(out, indent=1)
    else:
        blob = json.dumps(run(a.seed, a.p1, a.p2, cfg), indent=1)
    if a.out:
        open(a.out, 'w').write(blob)
        print(f"wrote {a.out}")
    else:
        print(blob)


if __name__ == '__main__':
    main()
