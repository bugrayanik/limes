"""EXP3: targeted combat-micro probes.

A. Repeat-charge anatomy: cav vs sword 1v1, cav policy in {charge(orbit),
   noorbit, aggro} x sword in {aggro, hold} -- isolates whether the
   out-and-back / pivot re-charge cycle is what beats the sword.
B. Cost-normalized army duels (~12 supply at base prices), canonical play.
C. Mixed-comp realism: spear-wall+archer cores vs cav/sword strike comps.
D. Unkillable-formation worst case: max-guard braced spear (support+brace
   capped +2, T2 +1 base Guard, corner / hill) vs best attack stacks,
   damage-per-pulse audit.
E. Hero: strong-but-killable (vs 2 swords, vs 3 spears+archer) and the
   surround-rout net (4 attackers).
F. Mutual-kill simultaneity: mirror melee lines must wipe both sides the
   same pulse.
"""

import json
import sys

sys.path.insert(0, '/home/bugra/Desktop/limes/sim/experiments/combat-micro')
from microlib import (new_game, make_policy, run_skirmish, duel_one,
                      line, SBot)
import engine

OUT = {}


def show(tag, res):
    OUT.setdefault(tag, []).append(res)
    print('%-58s winner=%s n=%d-%d hp=%d-%d pulses=%d%s' %
          (tag, res['winner'], res['n0'], res['n1'], res['hp0'], res['hp1'],
           res['pulses'], ' ROUT' if res['rout'] else ''))


def army_duel(tag, comp0, comp1, modes0=None, modes1=None, dist=3,
              terrain=None, max_pulses=40):
    """comp: list of (arch, (col,row)). Runs both seats (geometry mirrored)."""
    for mir in (False, True):
        p0, p1 = comp0, comp1
        t = terrain
        if mir:
            p0 = [(a, (c, 7 - r)) for a, (c, r) in comp0]
            p1 = [(a, (c, 7 - r)) for a, (c, r) in comp1]
            p0, p1 = p1, p0
            if t:
                t = {'ttype': {(c, 7 - r): v
                               for (c, r), v in t.get('ttype', {}).items()},
                     'rivers': {frozenset({(c, 7 - r) for c, r in e})
                                for e in t.get('rivers', set())}}
        g, b0, b1 = new_game(p0, p1, terrain=t)
        polA = make_policy(modes0 or {})
        polB = make_policy(modes1 or {})
        if mir:
            res = run_skirmish(g, b0, b1, polB, polA, max_pulses)
            res = dict(res)
            res['winner'] = {0: 1, 1: 0, None: None}[res['winner']]
            res['n0'], res['n1'] = res['n1'], res['n0']
            res['hp0'], res['hp1'] = res['hp1'], res['hp0']
            res['margin'] = -res['margin']
        else:
            res = run_skirmish(g, b0, b1, polA, polB, max_pulses)
        show(tag + (' [mir]' if mir else ' [std]'), res)


print('=== A. repeat-charge anatomy: 1v1 cav vs sword, dist grid 1-5 ===')
for cmode in ('charge', 'noorbit', 'aggro'):
    for smode in ('aggro', 'hold'):
        wins = {0: 0, 1: 0, None: 0}
        for dist in (1, 2, 3, 4, 5):
            for off in (0, 1):
                for mir in (False, True):
                    r = duel_one('cav', 'sword', cmode, smode, dist, off, mir)
                    wins[r['winner']] += 1
        print('cav=%-8s sword=%-6s  cav-wins=%2d sword-wins=%2d none=%2d'
              % (cmode, smode, wins[0], wins[1], wins[None]))
        OUT.setdefault('A_charge_anatomy', []).append(
            {'cav': cmode, 'sword': smode, 'cav_w': wins[0],
             'sword_w': wins[1], 'none': wins[None]})

print('\n=== B. cost-normalized duels (~12 supply base prices) ===')
# 12 supply: 6 spear | 4 sword | 4 archer | 3 cav | 2 siege + 1 spear
# written for the low side (rows 1-2); flip() puts the enemy at rows 5-6
# => starting separation 3 (formations get to form before contact)
COMPS = {
    'spear6':  [('spear', p) for p in line(5, 2, 2)] + [('spear', (4, 1))],
    'sword4':  [('sword', p) for p in line(4, 2, 2)],
    'archer4': [('archer', p) for p in line(4, 2, 2)],
    'cav3':    [('cav', p) for p in line(3, 2, 2)],
    'siege2s': [('siege', (3, 1)), ('siege', (4, 1)), ('spear', (4, 2))],
}


def flip(comp):  # comp written for the low side; mirror rows for high side
    return [(a, (c, 7 - r)) for a, (c, r) in comp]


names = list(COMPS)
for i, ca in enumerate(names):
    for cb in names[i + 1:]:
        army_duel('B %s vs %s' % (ca, cb), COMPS[ca], flip(COMPS[cb]))

print('\n=== C. mixed comps ===')
core_def = [('spear', (3, 2)), ('spear', (4, 2)), ('spear', (5, 2)),
            ('archer', (4, 1)), ('archer', (5, 1))]          # 12 supply
strike_cav = [('cav', (3, 2)), ('cav', (4, 2)), ('sword', (5, 2)),
              ('spear', (5, 1))]                              # 13 supply
strike_sw = [('sword', (3, 2)), ('sword', (4, 2)), ('sword', (5, 2)),
             ('archer', (4, 1))]                              # 12 supply
army_duel('C wall+archers vs cav-strike', core_def, flip(strike_cav))
army_duel('C wall+archers vs sword-strike', core_def, flip(strike_sw))
army_duel('C cav-strike vs sword-strike', strike_cav, flip(strike_sw))

print('\n=== D. unkillable-formation worst case ===')


def fortress_probe(tag, def_guard_t2, atk_t2, attackers, spear_pos,
                   hill=False, friend_pos=None, pulses=8):
    """One braced spear at spear_pos (optionally T2-guard, on a hill, with a
    supporting friend); attackers placed adjacent/in range with given archs
    (optionally T2-atk).  Reports damage per pulse to the spear."""
    p0 = [('spear', spear_pos)]
    if friend_pos:
        p0.append(('spear', friend_pos))
    p1 = attackers
    terrain = {'ttype': {spear_pos: 'hills'}} if hill else None
    g, b0, b1 = new_game(p0, p1, terrain=terrain)
    sp = g.on_board(0)[0]
    sp.braced = True
    if def_guard_t2:
        sp.base_guard += 1
        sp.tier1 = sp.tier2 = True
    if friend_pos:
        fr = [u for u in g.on_board(0) if u.pos == friend_pos][0]
        fr.braced = True
        if def_guard_t2:
            fr.base_guard += 1
            fr.tier1 = fr.tier2 = True
    for u in g.on_board(1):
        if atk_t2:
            u.base_atk += 1
            u.tier1 = u.tier2 = True
    polA = make_policy({'spear': 'hold'})
    polB = make_policy({})
    hp0 = sp.hp
    res = run_skirmish(g, b0, b1, polA, polB, max_pulses=pulses)
    dead = res['n0'] == 0 or (friend_pos and res['n0'] < 2 and sp.pos is None)
    print('%-64s spear_dead=%-5s hp %d->%d in %d pulses' %
          (tag, sp.pos is None, hp0, max(0, sp.hp), res['pulses']))
    OUT.setdefault('D_fortress', []).append(
        {'tag': tag, 'dead': sp.pos is None, 'hp_left': max(0, sp.hp),
         'pulses': res['pulses'], 'dead_any': bool(dead)})


# center spear, support friend, flanked by two T2-atk swords + archer
fortress_probe('D1 ctr spear T2g+brace+support vs 2xT2-atk sword flank+archer',
               True, True,
               [('sword', (4, 5)), ('sword', (3, 4)), ('archer', (6, 4))],
               (4, 4), friend_pos=(5, 4))
fortress_probe('D2 same but attackers NOT T2',
               True, False,
               [('sword', (4, 5)), ('sword', (3, 4)), ('archer', (6, 4))],
               (4, 4), friend_pos=(5, 4))
fortress_probe('D3 corner spear T2g braced, friend, archer+siege only',
               True, False,
               [('archer', (5, 7)), ('siege', (7, 5)), ('siege', (6, 4))],
               (7, 7), friend_pos=(6, 7), pulses=10)
fortress_probe('D4 corner spear T2g braced vs T2-atk archer+siege',
               True, True,
               [('archer', (5, 7)), ('siege', (7, 5)), ('siege', (6, 4))],
               (7, 7), friend_pos=(6, 7), pulses=10)
fortress_probe('D5 hill spear T2g+brace+support vs 2xT2 sword+T2 archer',
               True, True,
               [('sword', (4, 5)), ('sword', (3, 4)), ('archer', (6, 4))],
               (4, 4), hill=True, friend_pos=(5, 4))

print('\n=== E. hero ===')
army_duel('E hero vs 2 swords', [('hero', (4, 3))],
          [('sword', (4, 5)), ('sword', (5, 5))])
army_duel('E hero vs 1 sword', [('hero', (4, 3))], [('sword', (4, 5))])
army_duel('E hero+sword vs 2 swords',
          [('hero', (4, 3)), ('sword', (3, 3))],
          [('sword', (4, 5)), ('sword', (5, 5))])
army_duel('E hero vs 3 spears (rout net?)', [('hero', (4, 3))],
          [('spear', (3, 5)), ('spear', (4, 5)), ('spear', (5, 5))])

# explicit surround-rout: hero boxed by 4 spears
g, b0, b1 = new_game(
    [('hero', (4, 4))],
    [('spear', (3, 4)), ('spear', (5, 4)), ('spear', (4, 3)),
     ('spear', (4, 5))])
res = run_skirmish(g, b0, b1, make_policy({}), make_policy({'spear': 'aggro'}),
                   max_pulses=6)
show('E hero pre-surrounded by 4 spears', res)

print('\n=== F. mutual-kill simultaneity ===')
for arch in ('sword', 'cav', 'spear'):
    army_duel('F mirror 3x%s aggro' % arch,
              [(arch, p) for p in line(3, 3)],
              [(arch, p) for p in line(3, 4)],
              modes0={arch: 'aggro'}, modes1={arch: 'aggro'})

with open('/home/bugra/Desktop/limes/sim/experiments/combat-micro/'
          'results_exp3_special.json', 'w') as f:
    json.dump(OUT, f, indent=1, default=str)
