"""EXP2: NvN line skirmishes (2v2..5v5), every ordered archetype pairing.

Flat: full policy matrix x dists {2,3} x both seats.
Terrain (3v3 only): hills / woods under B's line, river between the lines,
canonical policies, both seats, dists {2,3}.

Support (+1 Guard next to a friend, denied beyond own Stake line) is live:
lines start inside their own halves around the centerline.
"""

import json
import sys
import time
from collections import defaultdict

sys.path.insert(0, '/home/bugra/Desktop/limes/sim/experiments/combat-micro')
from microlib import MODES, CANON, skirmish_one, line

ARCHES = ('spear', 'sword', 'cav', 'archer', 'siege')
SIZES = (2, 3, 4, 5)
DISTS = (2, 3)


def terrain_for(kind, n, dist):
    """Terrain dict for the un-mirrored geometry (B's line is the high row)."""
    r0 = 4 - (dist + 1) // 2
    r1 = r0 + dist
    if kind == 'hills_B':
        return {'ttype': {pos: 'hills' for pos in line(n, r1)}}
    if kind == 'woods_B':
        return {'ttype': {pos: 'woods' for pos in line(n, r1)}}
    if kind == 'river_mid':
        rr = r0 + dist // 2
        return {'rivers': {frozenset({(c, rr), (c, rr + 1)})
                           for c in range(8)}}
    return None


def mirror_terrain(t):
    if t is None:
        return None
    out = {}
    if 'ttype' in t:
        out['ttype'] = {(c, 7 - r): v for (c, r), v in t['ttype'].items()}
    if 'rivers' in t:
        out['rivers'] = {frozenset({(c, 7 - r) for (c, r) in e})
                         for e in t['rivers']}
    return out


def main():
    t0 = time.time()
    flat = {}
    total = 0
    for a in ARCHES:
        for b in ARCHES:
            per_size = {}
            for n in SIZES:
                canon_runs = []
                cfgs = []
                for dist in DISTS:
                    mat = {}
                    for ma in MODES[a]:
                        for mb in MODES[b]:
                            runs = [skirmish_one(a, b, n, ma, mb, dist, mir)
                                    for mir in (False, True)]
                            total += 2
                            mat[(ma, mb)] = sum(r['margin']
                                                for r in runs) / 2.0
                            if ma == CANON[a] and mb == CANON[b]:
                                canon_runs.extend(runs)
                    cfgs.append({
                        'maximin_a': max(min(mat[(ma, mb)] for mb in MODES[b])
                                         for ma in MODES[a]),
                        'maximin_b': max(min(-mat[(ma, mb)] for ma in MODES[a])
                                         for mb in MODES[b])})
                cw = defaultdict(int)
                for r in canon_runs:
                    cw[r['winner']] += 1
                per_size[n] = {
                    'canon_wins': {'A': cw[0], 'B': cw[1], 'none': cw[None]},
                    'canon_mean_margin': round(
                        sum(r['margin'] for r in canon_runs)
                        / len(canon_runs), 4),
                    'mean_maximin_A': round(
                        sum(c['maximin_a'] for c in cfgs) / len(cfgs), 4),
                    'mean_maximin_B': round(
                        sum(c['maximin_b'] for c in cfgs) / len(cfgs), 4),
                }
            flat['%s_vs_%s' % (a, b)] = per_size

    # terrain battery, 3v3 canonical
    terr = {}
    for kind in ('hills_B', 'woods_B', 'river_mid'):
        tstats = {}
        for a in ARCHES:
            for b in ARCHES:
                runs = []
                for dist in DISTS:
                    t = terrain_for(kind, 3, dist)
                    for mir in (False, True):
                        tt = mirror_terrain(t) if mir else t
                        runs.append(skirmish_one(
                            a, b, 3, CANON[a], CANON[b], dist, mir,
                            terrain=tt))
                        total += 1
                cw = defaultdict(int)
                for r in runs:
                    cw[r['winner']] += 1
                tstats['%s_vs_%s' % (a, b)] = {
                    'wins': {'A': cw[0], 'B': cw[1], 'none': cw[None]},
                    'mean_margin': round(
                        sum(r['margin'] for r in runs) / len(runs), 4)}
        terr[kind] = tstats

    elapsed = time.time() - t0
    print(json.dumps({'total_engine_runs': total,
                      'elapsed_sec': round(elapsed, 1)}, indent=1))
    print('\nFLAT NvN canonical (A-wins/B-wins/none per 4 runs) '
          'and mean maximin margins')
    hdr = '%-18s' % 'pairing'
    for n in SIZES:
        hdr += ' | %dv%d  W/L/N  mmA    mmB  ' % (n, n)
    print(hdr)
    for a in ARCHES:
        for b in ARCHES:
            k = '%s_vs_%s' % (a, b)
            row = '%-18s' % k
            for n in SIZES:
                d = flat[k][n]
                row += ' | %d/%d/%d %6.2f %6.2f' % (
                    d['canon_wins']['A'], d['canon_wins']['B'],
                    d['canon_wins']['none'],
                    d['mean_maximin_A'], d['mean_maximin_B'])
            print(row)
    for kind in terr:
        print('\nTERRAIN %s (3v3 canonical, 4 runs each, B on terrain side)'
              % kind)
        for a in ARCHES:
            row = '%-8s' % a
            for b in ARCHES:
                d = terr[kind]['%s_vs_%s' % (a, b)]
                row += ' | vs %-6s %d/%d/%d m%+0.2f' % (
                    b, d['wins']['A'], d['wins']['B'], d['wins']['none'],
                    d['mean_margin'])
            print(row)
    with open('/home/bugra/Desktop/limes/sim/experiments/combat-micro/'
              'results_exp2_skirmish.json', 'w') as f:
        json.dump({'flat': flat, 'terrain': terr}, f, indent=1)


if __name__ == '__main__':
    main()
