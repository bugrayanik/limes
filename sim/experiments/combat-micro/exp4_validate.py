"""EXP4: validate candidate stat overrides at micro scale.

O1 = SIEGE_ATK 3->2   (field nerf; Wagon/Palisade damage is rule-fixed 1/hit)
O2 = SWORD_HP 5->6    (sword survives one charge cycle -> trades with cav)
O3 = both

Re-runs the decisive micro checks under each override set:
  * 1v1 canonical + secure-win rates for the affected pairings
  * 3v3 canonical for all 25 archetype pairs
  * the ~12-supply cost-normalized comp round-robin
"""

import json
import sys
from collections import defaultdict

sys.path.insert(0, '/home/bugra/Desktop/limes/sim/experiments/combat-micro')
from microlib import (MODES, CANON, duel_one, skirmish_one, new_game,
                      make_policy, run_skirmish, line)

OSETS = {
    'BASE': None,
    'O1_siegeAtk2': {'SIEGE_ATK': 2},
    'O2_swordHp6': {'SWORD_HP': 6},
    'O3_both': {'SIEGE_ATK': 2, 'SWORD_HP': 6},
}
ARCHES = ('spear', 'sword', 'cav', 'archer', 'siege')
KEY_PAIRS = (('spear', 'cav'), ('cav', 'archer'), ('archer', 'spear'),
             ('cav', 'sword'), ('sword', 'archer'), ('cav', 'siege'),
             ('siege', 'spear'), ('siege', 'sword'), ('siege', 'archer'),
             ('hero', 'siege'), ('sword', 'spear'), ('hero', 'sword'))


def duel_summary(a, b, ov):
    cw = defaultdict(int)
    sec_a = sec_b = ncfg = 0
    for dist in (1, 2, 3, 4, 5):
        for off in (0, 1):
            mat = {}
            for ma in MODES[a]:
                for mb in MODES[b]:
                    runs = [duel_one(a, b, ma, mb, dist, off, mir,
                                     overrides=ov) for mir in (False, True)]
                    mat[(ma, mb)] = sum(r['margin'] for r in runs) / 2
                    if ma == CANON[a] and mb == CANON[b]:
                        for r in runs:
                            cw[r['winner']] += 1
            ncfg += 1
            if max(min(mat[(ma, mb)] for mb in MODES[b])
                   for ma in MODES[a]) > 0:
                sec_a += 1
            if max(min(-mat[(ma, mb)] for ma in MODES[a])
                   for mb in MODES[b]) > 0:
                sec_b += 1
    return {'canon': (cw[0], cw[1], cw[None]),
            'secA': round(sec_a / ncfg, 2), 'secB': round(sec_b / ncfg, 2)}


OUT = {}
for oname, ov in OSETS.items():
    print('\n================ %s ================' % oname)
    res = {}
    print('-- 1v1 key pairs (canon W/L/N over 20 runs; secure-win rates) --')
    for a, b in KEY_PAIRS:
        d = duel_summary(a, b, ov)
        res['1v1_%s_vs_%s' % (a, b)] = d
        print('  %-16s %2d/%2d/%2d  secA=%.2f secB=%.2f' %
              ('%s vs %s' % (a, b), *d['canon'], d['secA'], d['secB']))
    print('-- 3v3 canonical all pairs (W/L/N over 4 runs) --')
    for a in ARCHES:
        row = '  %-7s' % a
        for b in ARCHES:
            cw = defaultdict(int)
            for dist in (2, 3):
                for mir in (False, True):
                    r = skirmish_one(a, b, 3, CANON[a], CANON[b], dist, mir,
                                     overrides=ov)
                    cw[r['winner']] += 1
            res['3v3_%s_vs_%s' % (a, b)] = (cw[0], cw[1], cw[None])
            row += ' |%s %d/%d/%d' % (b[:4], cw[0], cw[1], cw[None])
        print(row)
    print('-- cost-normalized comps (~12 supply) --')
    COMPS = {
        'spear6': [('spear', p) for p in line(5, 2, 2)] + [('spear', (4, 1))],
        'sword4': [('sword', p) for p in line(4, 2, 2)],
        'archer4': [('archer', p) for p in line(4, 2, 2)],
        'cav3': [('cav', p) for p in line(3, 2, 2)],
        'siege2s': [('siege', (3, 1)), ('siege', (4, 1)), ('spear', (4, 2))],
    }

    def flip(comp):
        return [(x, (c, 7 - r)) for x, (c, r) in comp]

    names = list(COMPS)
    wins = defaultdict(int)
    for i, ca in enumerate(names):
        for cb in names[i + 1:]:
            outcome = []
            for mir in (False, True):
                p0, p1 = COMPS[ca], flip(COMPS[cb])
                if mir:
                    p0 = [(x, (c, 7 - r)) for x, (c, r) in COMPS[ca]]
                    p1 = [(x, (c, 7 - r)) for x, (c, r) in flip(COMPS[cb])]
                    p0, p1 = p1, p0
                g, b0, b1 = new_game(p0, p1, overrides=ov)
                pa, pb = make_policy({}), make_policy({})
                r = run_skirmish(g, b0, b1, pb if mir else pa,
                                 pa if mir else pb, max_pulses=40)
                w = r['winner']
                if mir and w is not None:
                    w = 1 - w
                outcome.append('AB N'[0 if w == 0 else (1 if w == 1 else 2)]
                               if w is not None else 'N')
                if w == 0:
                    wins[ca] += 1
                elif w == 1:
                    wins[cb] += 1
            res['cost_%s_vs_%s' % (ca, cb)] = outcome
            print('  %-10s vs %-10s -> %s' % (ca, cb, outcome))
    print('  total comp wins: %s' % dict(wins))
    res['comp_wins'] = dict(wins)
    OUT[oname] = res

with open('/home/bugra/Desktop/limes/sim/experiments/combat-micro/'
          'results_exp4_validate.json', 'w') as f:
    json.dump(OUT, f, indent=1)
