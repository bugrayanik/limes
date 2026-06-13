"""Exp 1 -- baseline (TRIBUTE_PER_ROW=1, stock constants), seeds 1..1000.

Matchups:
  SANDBAGGER vs HONEST     -- the contract-E headline number
  SANDBAGGER vs PROBER     -- contract-E second opponent
  TWIN vs HONEST/PROBER    -- TWIN = SANDBAGGER cfg with sandbag_until=0
                              (never concedes; isolates the concession verb)
  SANDBAGGER vs TWIN       -- head-to-head EV of the concession itself
  AGGRO vs HONEST/PROBER   -- generic-aggression control
  SANDBAGGER vs AGGRO      -- conceding against a round-1 attacker
"""

import json

from common import battery, summarize, ci95, spec_label

TWIN = ('SANDBAGGER', {'sandbag_until': 0})

MATCHUPS = [
    ('SANDBAGGER', 'HONEST', 1000),
    ('SANDBAGGER', 'PROBER', 1000),
    (TWIN, 'HONEST', 1000),
    (TWIN, 'PROBER', 1000),
    ('SANDBAGGER', TWIN, 1000),
    ('AGGRO', 'HONEST', 1000),
    ('AGGRO', 'PROBER', 1000),
    ('SANDBAGGER', 'AGGRO', 1000),
]

if __name__ == '__main__':
    out = {}
    for a, b, n in MATCHUPS:
        key = '%s vs %s' % (spec_label(a), spec_label(b))
        s = summarize(battery(a, b, n=n, seed0=1))
        s['ci95'] = ci95(s['winrate_A'], s['n'])
        out[key] = s
        print(json.dumps({key: s}), flush=True)
    with open('/home/bugra/Desktop/limes/sim/experiments/sandbag/'
              'exp1_baseline.json', 'w') as f:
        json.dump(out, f, indent=1)
