"""EXP2 -- Rule ablations: LONE_RUNNER_RADIUS sweep (1/2/3, plus 99 = rule
disabled) and ZoC removal (ZOC_ENABLED=0, bots upgraded to exploit it),
plus both-rules-off. 200 matches per cell.

Matchups per cell: RUNNER vs HONEST, RUNNER vs TURTLE (cheese pressure),
HONEST vs TURTLE (legit-spearhead control).
"""

import json
import time

from common import run_battery

MATCHUPS = [('RUNNER', 'HONEST'), ('RUNNER', 'TURTLE'), ('HONEST', 'TURTLE')]
N = 200


def cell(tag, name_a, name_b, seed0, overrides):
    t0 = time.time()
    agg = run_battery(name_a, name_b, N, seed0, overrides=overrides)
    agg['cell'] = tag
    agg['elapsed_sec'] = round(time.time() - t0, 1)
    print(json.dumps(agg, indent=1), flush=True)
    return agg


def main():
    out = []
    seed = 10000
    # radius sweep (ZoC on)
    for rad in (1, 2, 3, 99):
        for a, b in MATCHUPS:
            out.append(cell('radius=%d' % rad, a, b, seed,
                            {'LONE_RUNNER_RADIUS': rad}))
            seed += 250
    # ZoC off (lone runner at default 2); NZ- bots exploit removed ZoC
    for a, b in MATCHUPS:
        out.append(cell('zoc=off', 'NZ-' + a, 'NZ-' + b, seed,
                        {'ZOC_ENABLED': 0}))
        seed += 250
    # both rules off
    for a, b in MATCHUPS:
        out.append(cell('zoc=off+radius=99', 'NZ-' + a, 'NZ-' + b, seed,
                        {'ZOC_ENABLED': 0, 'LONE_RUNNER_RADIUS': 99}))
        seed += 250
    with open('exp2_results.json', 'w') as f:
        json.dump(out, f, indent=1)


if __name__ == '__main__':
    main()
