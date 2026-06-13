"""EXP1: 1v1 scripted duels, every ordered archetype pairing (6x6), flat.

For each pairing: full policy matrix (modes of A x modes of B) x starting
distances {1,2,3,4,5} x lateral offsets {0,1} x both seats (mirror).

Reports per pairing:
  canon : result under canonical (intended-play) modes, aggregated
  maximinA / maximinB : best guaranteed mean margin for each side across its
          policy options (min over opponent's options), per config, averaged
  A_secure_win_rate : share of configs where A has a policy that wins
          against EVERY policy of B (strict counter evidence)
"""

import json
import sys
import time
from collections import defaultdict

sys.path.insert(0, '/home/bugra/Desktop/limes/sim/experiments/combat-micro')
from microlib import MODES, CANON, duel_one

ARCHES = ('spear', 'sword', 'cav', 'archer', 'siege', 'hero')
DISTS = (1, 2, 3, 4, 5)
OFFSETS = (0, 1)


def main():
    t0 = time.time()
    out = {}
    total_runs = 0
    for a in ARCHES:
        for b in ARCHES:
            cfg_stats = []
            canon_results = []
            for dist in DISTS:
                for off in OFFSETS:
                    # build full policy matrix for this config, averaged
                    # over both seats
                    mat = {}
                    for ma in MODES[a]:
                        for mb in MODES[b]:
                            runs = [duel_one(a, b, ma, mb, dist, off, mir)
                                    for mir in (False, True)]
                            total_runs += 2
                            mat[(ma, mb)] = sum(r['margin']
                                                for r in runs) / 2.0
                            if ma == CANON[a] and mb == CANON[b]:
                                canon_results.extend(runs)
                    maximin_a = max(min(mat[(ma, mb)] for mb in MODES[b])
                                    for ma in MODES[a])
                    maximin_b = max(min(-mat[(ma, mb)] for ma in MODES[a])
                                    for mb in MODES[b])
                    cfg_stats.append({'dist': dist, 'off': off,
                                      'maximin_a': maximin_a,
                                      'maximin_b': maximin_b})
            n_cfg = len(cfg_stats)
            cw = defaultdict(int)
            for r in canon_results:
                cw[r['winner']] += 1
            mean_canon_margin = sum(r['margin'] for r in canon_results) \
                / len(canon_results)
            out['%s_vs_%s' % (a, b)] = {
                'configs': n_cfg,
                'runs_canon': len(canon_results),
                'canon_wins': {'A': cw[0], 'B': cw[1], 'none': cw[None]},
                'canon_mean_margin': round(mean_canon_margin, 4),
                'A_secure_win_rate': round(
                    sum(1 for c in cfg_stats if c['maximin_a'] > 0) / n_cfg, 3),
                'B_secure_win_rate': round(
                    sum(1 for c in cfg_stats if c['maximin_b'] > 0) / n_cfg, 3),
                'mean_maximin_A': round(
                    sum(c['maximin_a'] for c in cfg_stats) / n_cfg, 4),
                'mean_maximin_B': round(
                    sum(c['maximin_b'] for c in cfg_stats) / n_cfg, 4),
            }
    elapsed = time.time() - t0
    print(json.dumps({'total_engine_runs': total_runs,
                      'elapsed_sec': round(elapsed, 1)}, indent=1))
    # compact table
    print('\n%-18s %6s %6s %6s | %7s %7s | %6s %6s' %
          ('pairing', 'A-win', 'B-win', 'none', 'mmaxA', 'mmaxB',
           'secA', 'secB'))
    for a in ARCHES:
        for b in ARCHES:
            k = '%s_vs_%s' % (a, b)
            d = out[k]
            print('%-18s %6d %6d %6d | %7.3f %7.3f | %6.2f %6.2f' %
                  (k, d['canon_wins']['A'], d['canon_wins']['B'],
                   d['canon_wins']['none'], d['mean_maximin_A'],
                   d['mean_maximin_B'], d['A_secure_win_rate'],
                   d['B_secure_win_rate']))
    with open('/home/bugra/Desktop/limes/sim/experiments/combat-micro/'
              'results_exp1_duels.json', 'w') as f:
        json.dump(out, f, indent=1)


if __name__ == '__main__':
    main()
