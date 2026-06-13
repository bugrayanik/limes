"""EXP1 -- Carry-cheese battery (baseline constants, flat terrain).

  * RUNNER vs each other policy, 150 matches each (750 total)
  * Legit-spearhead baselines vs passive defense: HONEST/AGGRO vs TURTLE, 300 each
  * Archer-spam probe: ARCHSPAM vs TURTLE and vs HONEST, 300 each
"""

import json
import time

from common import run_battery

BATTERIES = [
    # carry-cheese battery: RUNNER vs all others
    ('RUNNER', 'HONEST', 150, 1000),
    ('RUNNER', 'AGGRO', 150, 1200),
    ('RUNNER', 'TURTLE', 150, 1400),
    ('RUNNER', 'PROBER', 150, 1600),
    ('RUNNER', 'SANDBAGGER', 150, 1800),
    # legitimate spearheads vs passive defense
    ('HONEST', 'TURTLE', 300, 3000),
    ('AGGRO', 'TURTLE', 300, 3400),
    # archer-spam probe
    ('ARCHSPAM', 'TURTLE', 300, 5000),
    ('ARCHSPAM', 'HONEST', 300, 5400),
]


def main():
    out = []
    for a, b, n, s0 in BATTERIES:
        t0 = time.time()
        agg = run_battery(a, b, n, s0)
        agg['elapsed_sec'] = round(time.time() - t0, 1)
        out.append(agg)
        print(json.dumps(agg, indent=1), flush=True)
    with open('exp1_results.json', 'w') as f:
        json.dump(out, f, indent=1)


if __name__ == '__main__':
    main()
