"""Screening sweep of rubber-band knobs against contract metrics A and B.

Sweeps SUPPLY_STRAIN_CROP x TRIBUTE_PER_ROW x WAGON_BOUNTY x
ENTRENCH_PALISADES, running the same 10-pairing battery as battery.py at
n matches per pairing per combo. Prints one line per combo sorted by
distance from the (A in 55-65, B in 25-35) target box.

Usage: python3 sweep.py [-n 40] [--seed0 1] [--tbase 500000] [--out FILE]
       [--grid FILE.json]   # optional explicit grid: list of override dicts
"""
import argparse
import itertools
import json
import multiprocessing as mp
import os
import sys
import time

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                '..', '..'))
from battery import run_battery, metrics  # noqa: E402


def default_grid():
    grid = []
    for ss, tr, wb, ep in itertools.product((0, 1, 2), (0, 1, 2),
                                            (3, 5), (1, 2)):
        grid.append({'SUPPLY_STRAIN_CROP': ss, 'TRIBUTE_PER_ROW': tr,
                     'WAGON_BOUNTY': wb, 'ENTRENCH_PALISADES': ep})
    return grid


def score(m):
    """Distance from the target box (0 if inside both bands)."""
    a, b = m['A_conversion'], m['B_rate']
    da = max(0, 0.55 - a, a - 0.65) if a is not None else 1.0
    db = max(0, 0.25 - b, b - 0.35)
    return da + db


def run_one(job):
    ov, n, seed0, tbase = job
    results, _ = run_battery(n, seed0, tbase, ov)
    m = metrics(results)
    return {'overrides': ov, 'pooled': m, 'score': round(score(m), 4)}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('-n', type=int, default=40)
    ap.add_argument('--seed0', type=int, default=1)
    ap.add_argument('--tbase', type=int, default=500000)
    ap.add_argument('--out', default=None)
    ap.add_argument('--grid', default=None)
    args = ap.parse_args()

    if args.grid:
        with open(args.grid) as f:
            grid = json.load(f)
    else:
        grid = default_grid()

    jobs = [(ov, args.n, args.seed0, args.tbase) for ov in grid]
    t0 = time.time()
    with mp.Pool() as pool:
        rows = pool.map(run_one, jobs)
    rows.sort(key=lambda r: r['score'])
    for r in rows:
        m = r['pooled']
        print('score=%.4f A=%.3f (%d/%d) B=%.3f  %s' % (
            r['score'], m['A_conversion'] if m['A_conversion'] is not None
            else -1, m['A_converted'], m['A_decided_r1'], m['B_rate'],
            json.dumps(r['overrides'], sort_keys=True)))
    print('elapsed %.1fs, %d combos x %d matches' % (
        time.time() - t0, len(grid), len(grid) and rows[0]['pooled']['n']),
        file=sys.stderr)
    if args.out:
        with open(args.out, 'w') as f:
            json.dump(rows, f, indent=1)


if __name__ == '__main__':
    main()
