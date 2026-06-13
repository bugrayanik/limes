"""Exp 2 -- tribute knockout (TRIBUTE_PER_ROW=0) + missing AGGRO controls.

If SANDBAGGER's winrates are unchanged with tribute removed, the baseline
83-84% cannot be a tribute-for-ground exploit. Also runs TWIN vs AGGRO at
stock constants (control pair for SANDBAGGER vs AGGRO = does conceding help
against an actual round-1 pusher who takes the offered rows?).
"""

import json

from common import battery, summarize, ci95, spec_label

TWIN = ('SANDBAGGER', {'sandbag_until': 0})
KO = {'TRIBUTE_PER_ROW': 0}

RUNS = [
    # (a, b, n, overrides, tag)
    ('SANDBAGGER', 'HONEST', 1000, KO, 'TPR=0'),
    ('SANDBAGGER', 'PROBER', 1000, KO, 'TPR=0'),
    ('SANDBAGGER', TWIN, 1000, KO, 'TPR=0'),
    ('SANDBAGGER', 'AGGRO', 1000, KO, 'TPR=0'),
    (TWIN, 'AGGRO', 1000, None, 'stock'),
    (TWIN, 'AGGRO', 1000, KO, 'TPR=0'),
]

if __name__ == '__main__':
    out = {}
    for a, b, n, ov, tag in RUNS:
        key = '%s vs %s [%s]' % (spec_label(a), spec_label(b), tag)
        s = summarize(battery(a, b, n=n, seed0=1, overrides=ov))
        s['ci95'] = ci95(s['winrate_A'], s['n'])
        out[key] = s
        print(json.dumps({key: s}), flush=True)
    with open('/home/bugra/Desktop/limes/sim/experiments/sandbag/'
              'exp2_knockout.json', 'w') as f:
        json.dump(out, f, indent=1)
