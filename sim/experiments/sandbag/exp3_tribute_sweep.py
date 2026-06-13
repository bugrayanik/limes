"""Exp 3 -- TRIBUTE_PER_ROW price sweep: where does conceding ground pay?

For each TRIBUTE_PER_ROW in {0,1,2,3,4,6}:
  SANDBAGGER vs TWIN   -- pure EV of the concession verb (identical policy
                          otherwise); >50% = feeding rows is profitable.
  SANDBAGGER vs AGGRO  -- conceding against a pusher who takes the rows
                          (max realistic tribute income).
  TWIN vs AGGRO        -- control pair for the above.
  SANDBAGGER vs HONEST -- the literal contract-E number at that price.
n=600 per cell, seeds 1..600.
"""

import json

from common import battery, summarize, ci95, spec_label

TWIN = ('SANDBAGGER', {'sandbag_until': 0})
PRICES = [0, 1, 2, 3, 4, 6]
PAIRS = [
    ('SANDBAGGER', TWIN),
    ('SANDBAGGER', 'AGGRO'),
    (TWIN, 'AGGRO'),
    ('SANDBAGGER', 'HONEST'),
]

if __name__ == '__main__':
    out = {}
    for price in PRICES:
        ov = {'TRIBUTE_PER_ROW': price}
        for a, b in PAIRS:
            key = '%s vs %s [TPR=%d]' % (spec_label(a), spec_label(b), price)
            s = summarize(battery(a, b, n=600, seed0=1, overrides=ov))
            s['ci95'] = ci95(s['winrate_A'], s['n'])
            out[key] = s
            print(json.dumps({key: {
                'winrate_A': s['winrate_A'], 'ci95': s['ci95'],
                'A_rows_conceded_mean': s['A_rows_conceded_mean'],
                'A_surge_mean': s['A_surge_mean'],
                'A_trib_as_supply_mean': s['A_trib_as_supply_mean'],
            }}), flush=True)
    with open('/home/bugra/Desktop/limes/sim/experiments/sandbag/'
              'exp3_tribute_sweep.json', 'w') as f:
        json.dump(out, f, indent=1)
