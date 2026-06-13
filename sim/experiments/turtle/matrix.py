"""Turtle experiment -- contract C & D policy matrix runner.

Runs the full HONEST/AGGRO/TURTLE/PROBER pairing matrix (6 distinct pairs +
4 mirrors), N matches per pairing, terrain off (flat) and/or on (seeded),
optionally with CONSTANTS overrides. Seats alternate per match (as run.py).

Usage:
  python3 matrix.py [-n 500] [--terrain off|on|both] [--seed0 1]
                    [--tseed0 1000] [--overrides '{"K": V, ...}']
                    [--pairs HONEST:TURTLE,...] [--out FILE.json]

Output: JSON with per-(pairing, terrain) aggregates and pooled contract-D
stats across all matches.
"""

import argparse
import itertools
import json
import multiprocessing as mp
import os
import sys
import time

SIM = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, SIM)

import engine   # noqa: E402
import bots     # noqa: E402

POLICIES = ('HONEST', 'AGGRO', 'TURTLE', 'PROBER')

_G = {}


def _init(overrides):
    _G['overrides'] = overrides


def _one(job):
    name_a, name_b, seed, tseed, a_is_p1 = job
    bot_p1 = bots.make_bot(name_a if a_is_p1 else name_b)
    bot_p2 = bots.make_bot(name_b if a_is_p1 else name_a)
    r = engine.play_match([bot_p1, bot_p2], seed,
                          overrides=_G['overrides'], terrain_seed=tseed)
    r['bot_winner'] = 'A' if (r['winner'] == 0) == a_is_p1 else 'B'
    return {k: r.get(k) for k in
            ('bot_winner', 'winner', 'win_type', 'rounds', 'r1_winner',
             'lead_changes', 'lead_changes_after_r7')}


def aggregate(results):
    n = len(results)
    wins_a = sum(1 for r in results if r['bot_winner'] == 'A')
    win_types = {}
    for r in results:
        win_types[r['win_type']] = win_types.get(r['win_type'], 0) + 1
    rounds = sorted(r['rounds'] for r in results)
    med = rounds[n // 2] if n % 2 else (rounds[n // 2 - 1] + rounds[n // 2]) / 2
    wr = sorted(r['rounds'] for r in results
                if r['win_type'] in ('wagons', 'rout'))
    wr_med = (wr[len(wr) // 2] if len(wr) % 2 else
              (wr[len(wr) // 2 - 1] + wr[len(wr) // 2]) / 2) if wr else None
    r1d = [r for r in results if r['r1_winner'] is not None]
    r1c = sum(1 for r in r1d if r['r1_winner'] == r['winner'])
    lead = sum(1 for r in results if r['lead_changes_after_r7'] > 0)
    return {
        'n': n, 'winrate_A': round(wins_a / n, 4),
        'win_types': win_types,
        'rounds_median': med, 'rounds_mean': round(sum(rounds) / n, 2),
        'rounds_min': rounds[0], 'rounds_max': rounds[-1],
        'median_round_wagons_or_rout': wr_med,
        'wagons_or_rout_share': round(
            (win_types.get('wagons', 0) + win_types.get('rout', 0)) / n, 4),
        'golden_goal_share': round(win_types.get('golden-goal', 0) / n, 4),
        'ladder_share': round(win_types.get('ladder', 0) / n, 4),
        'r1_conversion': round(r1c / len(r1d), 4) if r1d else None,
        'lead_change_after_r7_rate': round(lead / n, 4),
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('-n', type=int, default=500)
    ap.add_argument('--terrain', choices=('off', 'on', 'both'), default='both')
    ap.add_argument('--seed0', type=int, default=1)
    ap.add_argument('--tseed0', type=int, default=1000)
    ap.add_argument('--overrides', default=None,
                    help='JSON string or path of CONSTANTS overrides')
    ap.add_argument('--pairs', default=None,
                    help='comma list A:B; default full matrix incl mirrors')
    ap.add_argument('--out', default=None)
    args = ap.parse_args()

    overrides = None
    if args.overrides:
        if os.path.exists(args.overrides):
            overrides = json.load(open(args.overrides))
        else:
            overrides = json.loads(args.overrides)

    if args.pairs:
        pairs = [tuple(p.split(':')) for p in args.pairs.split(',')]
    else:
        pairs = list(itertools.combinations_with_replacement(POLICIES, 2))

    terrains = {'off': [None], 'on': [args.tseed0],
                'both': [None, args.tseed0]}[args.terrain]

    t0 = time.time()
    out = {'config': {'n_per_pairing': args.n, 'seed0': args.seed0,
                      'tseed0': args.tseed0, 'overrides': overrides or {},
                      'pairs': ['%s:%s' % p for p in pairs]},
           'results': {}}
    pool = mp.Pool(initializer=_init, initargs=(overrides,))
    all_results = []
    for tbase in terrains:
        tkey = 'flat' if tbase is None else 'terrain'
        for (a, b) in pairs:
            jobs = [(a, b, args.seed0 + i,
                     None if tbase is None else tbase + i, i % 2 == 0)
                    for i in range(args.n)]
            res = pool.map(_one, jobs, chunksize=25)
            all_results.extend(res)
            out['results']['%s|%s_vs_%s' % (tkey, a, b)] = aggregate(res)
    pool.close()
    pool.join()
    out['pooled_all_matches'] = aggregate(all_results)
    out['elapsed_sec'] = round(time.time() - t0, 1)

    s = json.dumps(out, indent=1)
    if args.out:
        with open(args.out, 'w') as f:
            f.write(s + '\n')
        print('wrote %s (%.1fs)' % (args.out, out['elapsed_sec']))
    else:
        print(s)


if __name__ == '__main__':
    main()
