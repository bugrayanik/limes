"""Snowball battery: contract metrics A and B across bot pairings + terrains.

Metric A: round-1 clash winner takes the match (target 55-65%), measured over
matches where round 1 produced a definite clash winner (engine r1_winner).
Metric B: share of games with >=1 lead change after round 7 (target 25-35%).

Usage:
    python3 battery.py [-n PER_PAIRING] [--seed0 K] [--tbase T]
                       [--constants FILE.json] [--label NAME]

Pairings: 10 combinations of HONEST/AGGRO/TURTLE/PROBER (mirrors + crosses).
Match i of pairing j uses match seed seed0 + j*10000 + i and terrain seed
tbase + j*10000 + i, seats alternating. Output: JSON, pooled + per-pairing.
"""
import argparse
import itertools
import json
import os
import sys
import time

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                '..', '..'))
import engine   # noqa: E402
import bots     # noqa: E402

PAIRINGS = [tuple(p) for p in
            itertools.combinations_with_replacement(
                ('HONEST', 'AGGRO', 'TURTLE', 'PROBER'), 2)]


def run_battery(n_per, seed0, tbase, overrides):
    all_results = []
    per_pairing = {}
    for j, (na, nb) in enumerate(PAIRINGS):
        block = []
        for i in range(n_per):
            seed = seed0 + j * 10000 + i
            tseed = (tbase + j * 10000 + i) if tbase is not None else None
            a_is_p1 = (i % 2 == 0)
            b1 = bots.make_bot(na if a_is_p1 else nb)
            b2 = bots.make_bot(nb if a_is_p1 else na)
            r = engine.play_match([b1, b2], seed, overrides=overrides,
                                  terrain_seed=tseed)
            r['pairing'] = '%s-%s' % (na, nb)
            block.append(r)
        all_results.extend(block)
        per_pairing['%s-%s' % (na, nb)] = metrics(block)
    return all_results, per_pairing


def metrics(results):
    n = len(results)
    r1d = [r for r in results if r['r1_winner'] is not None]
    conv = sum(1 for r in r1d if r['r1_winner'] == r['winner'])
    lead = sum(1 for r in results if r['lead_changes_after_r7'] > 0)
    wt = {}
    for r in results:
        wt[r['win_type']] = wt.get(r['win_type'], 0) + 1
    rounds = sorted(r['rounds'] for r in results)
    med = rounds[n // 2] if n % 2 else (rounds[n // 2 - 1] + rounds[n // 2]) / 2
    return {
        'n': n,
        'A_decided_r1': len(r1d),
        'A_converted': conv,
        'A_conversion': round(conv / len(r1d), 4) if r1d else None,
        'B_games_with_change_after_r7': lead,
        'B_rate': round(lead / n, 4),
        'win_types': wt,
        'median_rounds': med,
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('-n', type=int, default=120, help='matches per pairing')
    ap.add_argument('--seed0', type=int, default=1)
    ap.add_argument('--tbase', type=int, default=500000)
    ap.add_argument('--constants', default=None)
    ap.add_argument('--label', default='baseline')
    args = ap.parse_args()

    overrides = None
    if args.constants:
        with open(args.constants) as f:
            overrides = json.load(f)

    t0 = time.time()
    results, per_pairing = run_battery(args.n, args.seed0, args.tbase,
                                       overrides)
    out = {
        'label': args.label,
        'config': {'n_per_pairing': args.n, 'pairings': len(PAIRINGS),
                   'total': len(results), 'seed0': args.seed0,
                   'terrain_base': args.tbase,
                   'overrides': overrides or {}},
        'pooled': metrics(results),
        'per_pairing': per_pairing,
        'elapsed_sec': round(time.time() - t0, 1),
    }
    json.dump(out, sys.stdout, indent=1)
    print()


if __name__ == '__main__':
    main()
