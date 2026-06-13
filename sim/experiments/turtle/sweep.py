"""Turtle experiment -- knob sweep over land-exhaustion / breach caps /
golden-goal trigger. Runs the full 10-pairing policy matrix per config
(flat terrain for the scan; final candidates re-run with terrain in
matrix.py) and prints a compact contract scorecard per config.

Usage: python3 sweep.py [-n 500] [--terrain off|on|both] [--configs FILE.json]
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

from matrix import POLICIES, _init, _one, aggregate  # noqa: E402

# Sweep grid: prescribed knobs only (exhaustion start/rate, breach caps,
# golden-goal trigger + the hard stop that trails it).
CONFIGS = {
    'baseline': {},
    'exh10':    {'EXHAUSTION_START_ROUND': 10, 'EXHAUSTION_ACCEL_ROUND': 11},
    'exh9':     {'EXHAUSTION_START_ROUND': 9, 'EXHAUSTION_ACCEL_ROUND': 10},
    'breach3':  {'BREACH_CAP': 3, 'BREACH_CAP_LATE': 4,
                 'BREACH_CAP_RISE_ROUND': 11},
    'gg14':     {'GOLDEN_GOAL_ROUND': 14, 'HARD_STOP_ROUND': 17},
    'gg13':     {'GOLDEN_GOAL_ROUND': 13, 'HARD_STOP_ROUND': 16},
    'exh10_gg14': {'EXHAUSTION_START_ROUND': 10, 'EXHAUSTION_ACCEL_ROUND': 11,
                   'GOLDEN_GOAL_ROUND': 14, 'HARD_STOP_ROUND': 17},
    'exh10_breach3_gg14': {
        'EXHAUSTION_START_ROUND': 10, 'EXHAUSTION_ACCEL_ROUND': 11,
        'BREACH_CAP': 3, 'BREACH_CAP_LATE': 4, 'BREACH_CAP_RISE_ROUND': 11,
        'GOLDEN_GOAL_ROUND': 14, 'HARD_STOP_ROUND': 17},
    'exh9_breach3_gg13': {
        'EXHAUSTION_START_ROUND': 9, 'EXHAUSTION_ACCEL_ROUND': 10,
        'BREACH_CAP': 3, 'BREACH_CAP_LATE': 4, 'BREACH_CAP_RISE_ROUND': 10,
        'GOLDEN_GOAL_ROUND': 13, 'HARD_STOP_ROUND': 16},
}


def run_config(pool, overrides, n, seed0, tbases):
    pairs = list(itertools.combinations_with_replacement(POLICIES, 2))
    per = {}
    allr = []
    for tbase in tbases:
        tkey = 'flat' if tbase is None else 'terrain'
        for (a, b) in pairs:
            jobs = [(a, b, seed0 + i,
                     None if tbase is None else tbase + i, i % 2 == 0)
                    for i in range(n)]
            res = pool.map(_one, jobs, chunksize=25)
            allr.extend(res)
            per['%s|%s_vs_%s' % (tkey, a, b)] = aggregate(res)
    return per, aggregate(allr)


def scorecard(per, pooled):
    # contract C: every pairing of *distinct* policies within 45-55
    worst = max(((k, v['winrate_A']) for k, v in per.items()
                 if k.split('|')[1].split('_vs_')[0] !=
                 k.split('|')[1].split('_vs_')[1]),
                key=lambda kv: abs(kv[1] - 0.5))
    n_off = sum(1 for k, v in per.items()
                if k.split('|')[1].split('_vs_')[0] !=
                k.split('|')[1].split('_vs_')[1]
                and not 0.45 <= v['winrate_A'] <= 0.55)
    return {
        'C_worst_pairing': '%s=%.3f' % worst,
        'C_pairings_outside_45_55': n_off,
        'D_median_round_all': pooled['rounds_median'],
        'D_median_round_wagons_rout': pooled['median_round_wagons_or_rout'],
        'D_wagons_rout_share': pooled['wagons_or_rout_share'],
        'D_golden_goal_share': pooled['golden_goal_share'],
        'D_ladder_share': pooled['ladder_share'],
        'win_types': pooled['win_types'],
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('-n', type=int, default=500)
    ap.add_argument('--terrain', choices=('off', 'on', 'both'), default='off')
    ap.add_argument('--seed0', type=int, default=1)
    ap.add_argument('--tseed0', type=int, default=1000)
    ap.add_argument('--only', default=None, help='comma list of config names')
    ap.add_argument('--configs', default=None,
                    help='JSON file of {name: overrides} replacing built-ins')
    ap.add_argument('--out', default=None)
    args = ap.parse_args()

    tbases = {'off': [None], 'on': [args.tseed0],
              'both': [None, args.tseed0]}[args.terrain]
    configs = CONFIGS
    if args.configs:
        configs = json.load(open(args.configs))
    names = args.only.split(',') if args.only else list(configs)

    out = {}
    for name in names:
        ov = configs[name]
        t0 = time.time()
        pool = mp.Pool(initializer=_init, initargs=(ov or None,))
        per, pooled = run_config(pool, ov or None, args.n, args.seed0, tbases)
        pool.close()
        pool.join()
        sc = scorecard(per, pooled)
        out[name] = {'overrides': ov, 'scorecard': sc, 'per_pairing': per}
        print('== %s (%.0fs) %s' % (name, time.time() - t0, json.dumps(ov)))
        for k, v in sc.items():
            print('   %s: %s' % (k, v))
        sys.stdout.flush()
    if args.out:
        with open(args.out, 'w') as f:
            json.dump(out, f, indent=1)


if __name__ == '__main__':
    main()
