"""Exp 4 -- robustness: extreme sandbag variants. Does conceding LONGER /
harder ever pay, at stock or elevated tribute prices?

SB8  = SANDBAGGER conceding until round 8 (flip at 9).
Each variant vs its own no-concession TWIN (sandbag_until=0) and vs
HONEST/AGGRO, at TRIBUTE_PER_ROW 1 and 3. n=600, seeds 1..600.
"""

import json

from common import battery, summarize, ci95, spec_label

SB8 = ('SANDBAGGER', {'sandbag_until': 8, 'desperation_round': 9})
TWIN = ('SANDBAGGER', {'sandbag_until': 0})

RUNS = [
    (SB8, TWIN, {'TRIBUTE_PER_ROW': 1}),
    (SB8, TWIN, {'TRIBUTE_PER_ROW': 3}),
    (SB8, TWIN, {'TRIBUTE_PER_ROW': 6}),
    (SB8, 'HONEST', {'TRIBUTE_PER_ROW': 1}),
    (SB8, 'AGGRO', {'TRIBUTE_PER_ROW': 1}),
    (SB8, 'AGGRO', {'TRIBUTE_PER_ROW': 3}),
]

if __name__ == '__main__':
    out = {}
    for a, b, ov in RUNS:
        key = '%s vs %s [TPR=%d]' % (spec_label(a), spec_label(b),
                                     ov['TRIBUTE_PER_ROW'])
        s = summarize(battery(a, b, n=600, seed0=1, overrides=ov))
        s['ci95'] = ci95(s['winrate_A'], s['n'])
        out[key] = s
        print(json.dumps({key: s}), flush=True)
    with open('/home/bugra/Desktop/limes/sim/experiments/sandbag/'
              'exp4_extreme.json', 'w') as f:
        json.dump(out, f, indent=1)
