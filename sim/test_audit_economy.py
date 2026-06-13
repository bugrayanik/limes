"""ECONOMY + ROUND-LOOP correctness audit for the LIMES v3 baseline engine.

Targeted, executable checks of design/v3-rules-spec.md CORE rules against
sim/engine.py. Each test drives the real engine (Game methods), not a copy
of the rules. Run:  python3 test_audit_economy.py

Covered claims (from the audit brief):
  1.  harvest only behind own limes (C-020)
  2.  farmstead adjacency +2 once per group (C-021)
  3.  upkeep 1 + supply strain +1 beyond own stake (C-023)
  4.  exhausted flip: -1 Atk, -1 Guard, cannot carry/contest; cleared on feed
      (C-046 / C-023 / C-053..C-056)
  5.  shared 6-copy muster supply, +1/copy pricing shared across BOTH players
      (C-025)
  6.  unlock ladder 6/10/15, locked archetypes unrecruitable (C-026)
  7.  2-deploy / 2-reposition inertia (C-027 / C-028)
  8.  tribute accrual 1/row lost, held line pays 0 (C-067/C-057);
      Surge spends 1, Shieldbearer spends 2 (C-050/C-051)
  9.  wounded-return rhythm: 1-Crop rush at N+1, free auto-return N+2 (C-030)
  10. wagon bounty +3 on kill, once (C-065); breach cap 2 (3 from r13) (C-064)
  11. land exhaustion P(11)=0 P(12)=1 P(13)=3 P(14)=5, crop only, floor 0
      (C-022 / D-40)
  12. caravan draft priority: fewer wagons picks 1st & 3rd, 4th discarded
      (C-078)
  13. Last Stand fires on FIRST own-wagon loss only (C-066)
Plus robustness probes (duplicate feed list; Shieldbearer vs displacement).
"""

import sys
import traceback
from collections import defaultdict

import engine


# ---------------------------------------------------------------------------
# Scripted bot
# ---------------------------------------------------------------------------

class ScriptBot:
    def __init__(self):
        self.feed = []
        self.builds = []
        self.reinf = {}
        self.iv = {}            # window no -> intervention tuple
        self.boon = 3
        self.trample = 'raid'
        self.calls = []

    def reset(self, seed, p):
        pass

    def setup(self, g, me):
        return {'wagons': [0, 3, 6], 'units': []}

    def feed_order(self, g, me):
        return list(self.feed)

    def build(self, g, me):
        b, self.builds = self.builds, []
        return b

    def reinforce(self, g, me):
        r, self.reinf = self.reinf, {}
        return r

    def orders(self, g, me, pulse):
        return {}

    def intervention(self, g, me, wno):
        return self.iv.pop(wno, None)

    def trample_choice(self, g, me, tile, f):
        self.calls.append(('trample', me, tile))
        return self.trample

    def artifact_pick(self, g, me, options):
        self.calls.append(('pick', me, list(options)))
        return options[0]

    def last_stand(self, g, me):
        self.calls.append(('laststand', me))
        return self.boon

    def entrench_cols(self, g, me):
        return []

    def promo_t2(self, g, me, u):
        return 'atk'

    def standard_bearer(self, g, me):
        return None


def new_game(**overrides):
    bots = [ScriptBot(), ScriptBot()]
    g = engine.Game(bots, seed=1, overrides=overrides or None)
    g.setup()
    return g, bots


def clear_board(g):
    for pos in list(g.board):
        uid = g.board.pop(pos)
        g.units[uid].pos = None


def put(g, owner, arch, pos):
    u = g.new_unit(owner, arch)
    g.place(u, pos)
    return u


# ---------------------------------------------------------------------------
# Test harness
# ---------------------------------------------------------------------------

RESULTS = []


def check(name, cond, detail=''):
    RESULTS.append((name, bool(cond), detail))
    print('%-4s %s%s' % ('PASS' if cond else 'FAIL', name,
                         ('  [' + detail + ']') if (detail and not cond) else ''))


def run(fn):
    try:
        fn()
    except Exception:
        RESULTS.append((fn.__name__, False, 'EXCEPTION'))
        print('FAIL %s raised:' % fn.__name__)
        traceback.print_exc()


# ---------------------------------------------------------------------------
# 1. Harvest only behind own limes (C-020)
# ---------------------------------------------------------------------------

def test_harvest_behind_limes():
    g, _ = new_game()
    clear_board(g)
    g.fields.clear()
    # stakes all at 4: P1 owns 0-indexed rows 0..3
    g.fields[(0, 2)] = {'type': 'crop', 'owner': 0, 'annexed': None}   # own side
    g.fields[(0, 5)] = {'type': 'crop', 'owner': 0, 'annexed': None}   # enemy side
    g.fields[(1, 2)] = {'type': 'supply', 'owner': 1, 'annexed': 0}    # annexed by P1
    g.fields[(2, 2)] = {'type': 'crop', 'owner': 0, 'annexed': 1}      # mine, enemy-annexed
    sup, crop = g.compute_harvest(0)
    check('1a own-side field yields 2', crop == 2, 'crop=%d' % crop)
    check('1b annexed-by-me enemy field yields ANNEX_YIELD=1 supply',
          sup == 1, 'sup=%d' % sup)
    sup1, crop1 = g.compute_harvest(1)
    # P2: field (0,5) is P1's beyond the stake -> dormant for both;
    # (2,2) annexed by P2 but sits in P1 territory -> nothing.
    check('1c enemy-side fields yield nothing to either player',
          sup1 == 0 and crop1 == 0, 'p2 sup=%d crop=%d' % (sup1, crop1))
    g.stakes[0] = 6                      # P1 now owns rows 0..5 in column a
    sup, crop = g.compute_harvest(0)
    check('1d field recovered behind own limes yields again',
          crop == 4, 'crop=%d' % crop)


# ---------------------------------------------------------------------------
# 2. Farmstead adjacency (C-021)
# ---------------------------------------------------------------------------

def test_farmstead():
    g, _ = new_game()
    clear_board(g)

    def fields(*specs):
        g.fields.clear()
        for pos, t, owner, annexed in specs:
            g.fields[pos] = {'type': t, 'owner': owner, 'annexed': annexed}

    fields(((1, 1), 'crop', 0, None), ((1, 2), 'crop', 0, None),
           ((2, 2), 'crop', 0, None))
    _, crop = g.compute_harvest(0)
    check('2a 3 adjacent same-type fields: 3*2 + 2 farmstead = 8', crop == 8,
          'crop=%d' % crop)
    fields(((1, 1), 'crop', 0, None), ((1, 2), 'crop', 0, None),
           ((2, 2), 'crop', 0, None), ((2, 1), 'crop', 0, None))
    _, crop = g.compute_harvest(0)
    check('2b 4-field group: bonus paid once per group (4*2+2=10)', crop == 10,
          'crop=%d' % crop)
    fields(((1, 1), 'crop', 0, None), ((1, 2), 'crop', 0, None),
           ((3, 1), 'crop', 0, None))   # (3,1) not adjacent
    _, crop = g.compute_harvest(0)
    check('2c non-adjacent 3rd field: no farmstead (=6)', crop == 6,
          'crop=%d' % crop)
    fields(((1, 1), 'crop', 0, None), ((1, 2), 'crop', 0, None),
           ((2, 2), 'supply', 0, None))
    sup, crop = g.compute_harvest(0)
    check('2d mixed types never form a farmstead', crop == 4 and sup == 2,
          'crop=%d sup=%d' % (crop, sup))
    fields(((1, 1), 'crop', 0, None), ((1, 2), 'crop', 0, None),
           ((1, 3), 'crop', 1, 0))      # 3rd is enemy field annexed by P1
    _, crop = g.compute_harvest(0)
    check('2e annexed fields never count toward farmsteads (2*2 + 1 = 5)',
          crop == 5, 'crop=%d' % crop)


# ---------------------------------------------------------------------------
# 3. Upkeep + supply strain (C-023)
# ---------------------------------------------------------------------------

def test_upkeep_strain():
    g, bots = new_game()
    clear_board(g)
    g.fields.clear()
    home = put(g, 0, 'sword', (0, 2))      # own territory (rows<4)
    fwd = put(g, 0, 'sword', (1, 5))       # beyond own stake line
    g.res[0]['crop'] = 10
    g.muster_player(0)
    check('3a upkeep 1 (home) + 2 (beyond stake) deducted: 10-3=7',
          g.res[0]['crop'] == 7, 'crop=%d' % g.res[0]['crop'])
    check('3b both units fed -> Ready', not home.exhausted and not fwd.exhausted)
    g.res[0]['crop'] = 2
    bots[0].feed = [fwd.uid, home.uid]     # try forward unit first
    g.muster_player(0)
    check('3c crop=2 feeds the 2-cost forward unit only; home unit flips '
          'Exhausted', fwd.exhausted is False and home.exhausted is True,
          'fwd=%s home=%s' % (fwd.exhausted, home.exhausted))
    check('3d remaining crop 0', g.res[0]['crop'] == 0,
          'crop=%d' % g.res[0]['crop'])


# ---------------------------------------------------------------------------
# 4. Exhausted effects + recovery (C-046, C-053..056)
# ---------------------------------------------------------------------------

def test_exhausted():
    g, _ = new_game()
    clear_board(g)
    a = put(g, 0, 'sword', (4, 3))
    t = put(g, 1, 'sword', (4, 5))
    base = g.attack_damage(a, t)
    a.exhausted = True
    check('4a Exhausted: -1 EffAtk', g.attack_damage(a, t) == base - 1,
          '%d vs %d' % (g.attack_damage(a, t), base))
    a.exhausted = False
    # guard: give target support (adjacent friend, own territory)
    f = put(g, 1, 'sword', (4, 6))
    g_with = g.eff_guard(t)
    t.exhausted = True
    check('4b Exhausted: -1 EffGuard', g.eff_guard(t) == g_with - 1,
          '%d vs %d' % (g.eff_guard(t), g_with))
    t.exhausted = False
    del f

    # carry/contest (column 0)
    clear_board(g)
    carrier = put(g, 0, 'sword', (0, 4))     # beyond stake (k=4)
    put(g, 0, 'sword', (0, 3))               # friend within 2 (not lone)
    p1, p2 = g.column_claims(0)
    check('4c healthy supported spearhead carries', p1 and not p2)
    carrier.exhausted = True
    p1, p2 = g.column_claims(0)
    check('4d Exhausted unit cannot carry', not p1)
    carrier.exhausted = False
    blocker = put(g, 1, 'sword', (0, 6))     # lone unbroken blocker, own half
    p1, _ = g.column_claims(0)
    check('4e lone unbroken blocker still contests (stake holds)', not p1)
    blocker.exhausted = True
    p1, _ = g.column_claims(0)
    check('4f Exhausted blocker does NOT contest', p1)
    # lone runner cannot carry
    clear_board(g)
    put(g, 0, 'sword', (0, 4))
    p1, _ = g.column_claims(0)
    check('4g lone runner (no friend within 2) cannot carry', not p1)
    # recovery on feed
    clear_board(g)
    u = put(g, 0, 'sword', (2, 2))
    u.exhausted = True
    g.res[0]['crop'] = 5
    g.fields.clear()
    g.muster_player(0)
    check('4h feeding at Upkeep clears Exhausted', not u.exhausted)


# ---------------------------------------------------------------------------
# 5. Shared muster supply (C-025)
# ---------------------------------------------------------------------------

def test_shared_supply():
    g, bots = new_game()
    clear_board(g)
    g.fields.clear()
    g.res[0].update(supply=20, crop=10)
    g.res[1].update(supply=20, crop=10)
    bots[0].reinf = {'recruits': [('spear', (1, 0)), ('spear', (2, 0))]}
    g.muster_player(0)
    check('5a P1 buys 2 Spears: 2 + 3 = 5 Supply (copy surcharge applies '
          'within one Muster)', g.res[0]['supply'] == 15,
          'supply=%d' % g.res[0]['supply'])
    check('5b shared copy counter = 2', g.copies['spear'] == 2)
    bots[1].reinf = {'recruits': [('spear', (1, 7))]}
    g.muster_player(1)
    check('5c P2 pays surcharge for P1\'s copies: 2+2=4',
          g.res[1]['supply'] == 16, 'supply=%d' % g.res[1]['supply'])
    g.copies['spear'] = g.C['MUSTER_COPIES']
    before = g.res[1]['supply']
    nunits = len(g.on_board(1))
    bots[1].reinf = {'recruits': [('spear', (2, 7))]}
    g.muster_player(1)
    check('5d 7th copy refused (6-copy shared bank exhausted)',
          g.res[1]['supply'] == before and len(g.on_board(1)) == nunits)


# ---------------------------------------------------------------------------
# 6. Unlock ladder (C-026)
# ---------------------------------------------------------------------------

def test_unlock_ladder():
    g, bots = new_game()
    clear_board(g)
    g.fields.clear()
    g.res[0].update(supply=50, crop=10)
    # locked archetype unrecruitable
    bots[0].reinf = {'recruits': [('archer', (1, 0))]}
    g.muster_player(0)
    check('6a locked archetype cannot be recruited',
          g.copies['archer'] == 0 and g.res[0]['supply'] == 50,
          'copies=%d supply=%d' % (g.copies['archer'], g.res[0]['supply']))
    bots[0].reinf = {'unlocks': ['archer']}
    g.muster_player(0)
    check('6b 3rd archetype unlock costs 6', g.res[0]['supply'] == 44
          and 'archer' in g.unlocked[0], 'supply=%d' % g.res[0]['supply'])
    bots[0].reinf = {'unlocks': ['cav']}
    g.muster_player(0)
    check('6c 4th archetype unlock costs 10', g.res[0]['supply'] == 34,
          'supply=%d' % g.res[0]['supply'])
    bots[0].reinf = {'unlocks': ['siege']}
    g.muster_player(0)
    check('6d 5th archetype unlock costs 15', g.res[0]['supply'] == 19,
          'supply=%d' % g.res[0]['supply'])


# ---------------------------------------------------------------------------
# 7. Deploy / reposition inertia (C-027 / C-028)
# ---------------------------------------------------------------------------

def test_inertia():
    g, bots = new_game()
    clear_board(g)
    g.fields.clear()
    g.res[0].update(supply=50, crop=20)
    bots[0].reinf = {'recruits': [('spear', (1, 0)), ('spear', (2, 0)),
                                  ('spear', (4, 0))]}
    g.muster_player(0)
    check('7a 3rd recruit refused (DEPLOY_MAX=2)',
          len(g.on_board(0)) == 2 and g.copies['spear'] == 2,
          'units=%d copies=%d' % (len(g.on_board(0)), g.copies['spear']))
    units = g.on_board(0)
    extra = put(g, 0, 'sword', (5, 1))
    bots[0].reinf = {'repositions': [(units[0].uid, (0, 2)),
                                     (units[1].uid, (1, 2)),
                                     (extra.uid, (2, 2))]}
    g.muster_player(0)
    moved = sum(1 for u in (units[0], units[1], extra)
                if u.pos in ((0, 2), (1, 2), (2, 2)))
    check('7b 3rd reposition refused (REPOSITION_MAX=2)', moved == 2,
          'moved=%d' % moved)
    # reposition destination must be own territory
    v = put(g, 0, 'sword', (6, 1))
    bots[0].reinf = {'repositions': [(v.uid, (6, 5))]}
    g.muster_player(0)
    check('7c reposition into enemy territory refused', v.pos == (6, 1),
          'pos=%s' % (v.pos,))
    # recruits only on heartland rows
    bots[0].reinf = {'recruits': [('sword', (7, 3))]}
    n = len(g.on_board(0))
    g.muster_player(0)
    check('7d recruit outside Heartland rows refused',
          len(g.on_board(0)) == n)


# ---------------------------------------------------------------------------
# 8. Tribute accrual + Surge / Shieldbearer spends (C-067, C-050, C-051)
# ---------------------------------------------------------------------------

def test_tribute_accrual_and_spends():
    # accrual: P1 carries one column -> P2 gains exactly 1 chip
    g, _ = new_game()
    clear_board(g)
    g.fields.clear()
    put(g, 0, 'sword', (0, 4))
    put(g, 0, 'sword', (0, 3))
    put(g, 1, 'sword', (7, 6))             # passive far-away P2 unit
    g.res[0].update(crop=10)
    g.res[1].update(crop=10)
    g.play_round()
    check('8a stake advanced and loser gained 1 Tribute/row',
          g.stakes[0] == 5 and g.res[1]['tribute'] == 1
          and g.res[0]['tribute'] == 0,
          'stake=%d t1=%d t0=%d' % (g.stakes[0], g.res[1]['tribute'],
                                    g.res[0]['tribute']))
    # held line pays nothing: contested column
    g2, _ = new_game()
    clear_board(g2)
    g2.fields.clear()
    put(g2, 0, 'sword', (0, 4))
    put(g2, 0, 'sword', (0, 3))
    put(g2, 1, 'sword', (0, 6))            # unbroken blocker in own half
    put(g2, 1, 'sword', (7, 6))
    g2.res[0].update(crop=10)
    g2.res[1].update(crop=10)
    g2.play_round()
    check('8b contested stake holds; losing at a held line pays 0 Tribute',
          g2.stakes[0] == 4 and g2.res[0]['tribute'] == 0
          and g2.res[1]['tribute'] == 0)
    # Surge spend
    g3, bots3 = new_game()
    clear_board(g3)
    u = put(g3, 0, 'sword', (3, 3))
    g3.res[0]['tribute'] = 3
    bots3[0].iv = {1: ('SURGE', u.uid, (3, 4))}
    g3.intervention_window(1)
    check('8c Surge costs 1 chip and moves the unit 1 tile',
          g3.res[0]['tribute'] == 2 and u.pos == (3, 4),
          't=%d pos=%s' % (g3.res[0]['tribute'], u.pos))
    # Surge refused without chips
    g3.res[0]['tribute'] = 0
    bots3[0].iv = {2: ('SURGE', u.uid, (3, 5))}
    g3.intervention_window(2)
    check('8d Surge refused with 0 chips', u.pos == (3, 4))
    # Shieldbearer spend
    g3.res[0]['tribute'] = 2
    bots3[0].iv = {3: ('SHIELDBEARER', u.uid)}
    g3.intervention_window(3)
    check('8e Shieldbearer costs 2 chips and places a ward',
          g3.res[0]['tribute'] == 0 and len(g3.wards) == 1
          and g3.wards[0]['uid'] == u.uid)


# ---------------------------------------------------------------------------
# 9. Wounded-return rhythm (C-030)
# ---------------------------------------------------------------------------

def test_wounded_return():
    g, bots = new_game()
    clear_board(g)
    g.fields.clear()
    g.round = 5
    u = put(g, 0, 'sword', (2, 1))
    w = put(g, 0, 'sword', (4, 1))
    u.hp = 0
    w.hp = 0
    g.remove_dead(defaultdict(int))
    check('9a units at HP<=0 go to reserve (wounded, not dead)',
          u.pos is None and w.pos is None and u.wounded_round == 5)
    # rush at N+1 for 1 Crop
    g.round = 6
    g.res[0].update(crop=5, supply=10)
    bots[0].reinf = {'rush': [u.uid]}
    g.muster_player(0)
    check('9b rush return at Muster N+1 costs 1 Crop, full HP',
          u.pos is not None and u.hp == u.max_hp and g.res[0]['crop'] == 4,
          'pos=%s crop=%d' % (u.pos, g.res[0]['crop']))
    check('9c un-rushed unit does NOT return at N+1', w.pos is None)
    # free at N+2
    g.round = 7
    g.res[0].update(crop=5)
    g.muster_player(0)
    # upkeep this Muster covers only u (w returns during Reinforce, after
    # Upkeep, and eats nothing in reserve): 5 - 1 = 4, no return fee.
    check('9d free automatic return at Muster N+2, full HP, no Crop charged'
          ' beyond upkeep', w.pos is not None and w.hp == w.max_hp
          and g.res[0]['crop'] == 4,
          'pos=%s crop=%d' % (w.pos, g.res[0]['crop']))


# ---------------------------------------------------------------------------
# 10. Wagon bounty + breach cap (C-064 / C-065)
# ---------------------------------------------------------------------------

def test_wagon_bounty_and_cap():
    g, _ = new_game()
    s0 = g.res[0]['supply']
    ok1 = g.damage_wagon(0, 1, 0, capped=True)
    ok2 = g.damage_wagon(0, 1, 0, capped=True)
    ok3 = g.damage_wagon(0, 1, 0, capped=True)
    check('10a breach cap 2/round: third capped hit refused',
          ok1 and ok2 and not ok3 and g.wagons[1][0]['hp'] == 1)
    check('10b no bounty before the kill', g.res[0]['supply'] == s0)
    g.round = 13
    ok4 = g.damage_wagon(0, 1, 0, capped=True)   # late cap 3, cap_dmg=2
    check('10c cap rises to 3 from round 13', ok4
          and g.wagons[1][0]['hp'] == 0)
    check('10d wagon kill pays +3 Supply bounty immediately',
          g.res[0]['supply'] == s0 + 3,
          'supply=%d vs %d' % (g.res[0]['supply'], s0 + 3))
    again = g.damage_wagon(0, 1, 0, capped=False)
    check('10e dead wagon cannot be re-hit / double-paid',
          not again and g.res[0]['supply'] == s0 + 3)


# ---------------------------------------------------------------------------
# 11. Land exhaustion (C-022 / D-40)
# ---------------------------------------------------------------------------

def test_land_exhaustion():
    g, _ = new_game()
    P = g.exhaustion_penalty
    check('11a P(11)=0, P(12)=1, P(13)=3, P(14)=5, P(15)=7',
          (P(11), P(12), P(13), P(14), P(15)) == (0, 1, 3, 5, 7),
          str((P(11), P(12), P(13), P(14), P(15))))
    clear_board(g)
    g.fields.clear()
    g.fields[(0, 1)] = {'type': 'crop', 'owner': 0, 'annexed': None}
    g.fields[(2, 1)] = {'type': 'supply', 'owner': 0, 'annexed': None}
    sup, crop = g.compute_harvest(0, rnd=12)
    check('11b r12: crop field 2-1=1; Supply income unaffected',
          crop == 1 and sup == 2, 'crop=%d sup=%d' % (crop, sup))
    sup, crop = g.compute_harvest(0, rnd=14)
    check('11c r14: crop floors at 0 per instance (never negative); '
          'supply still 2', crop == 0 and sup == 2,
          'crop=%d sup=%d' % (crop, sup))
    # farmstead bonus is its own income instance
    g.fields[(0, 2)] = {'type': 'crop', 'owner': 0, 'annexed': None}
    g.fields[(0, 3)] = {'type': 'crop', 'owner': 0, 'annexed': None}
    _, crop = g.compute_harvest(0, rnd=12)
    check('11d r12 farmstead: 3 fields (2-1)*3 + bonus (2-1) = 4', crop == 4,
          'crop=%d' % crop)


# ---------------------------------------------------------------------------
# 12. Caravan draft priority (C-078)
# ---------------------------------------------------------------------------

def test_caravan_priority():
    g, bots = new_game()
    g.wagons[1][0]['hp'] = 0          # P2 has fewer wagons -> trailing
    g.caravan(1)
    picks = [c for b in bots for c in b.calls if c[0] == 'pick']
    seq = []
    for b in (bots[0], bots[1]):
        for c in b.calls:
            if c[0] == 'pick':
                seq.append((c[1], len(c[2])))
    # reconstruct true order by option-count: 4 -> 3 -> 2
    order = sorted(seq, key=lambda x: -x[1])
    check('12a trailing player (fewer wagons) picks 1st and 3rd, leader 2nd',
          [p for p, _ in order] == [1, 0, 1], str(order))
    check('12b exactly 3 of 4 artifacts taken (1 discarded)',
          len(picks) == 3 and [n for _, n in order] == [4, 3, 2])
    # tie on wagons and rows -> komi-holder trails
    g2, bots2 = new_game()
    g2.komi = 0
    g2.caravan(1)
    seq2 = []
    for b in (bots2[0], bots2[1]):
        for c in b.calls:
            if c[0] == 'pick':
                seq2.append((c[1], len(c[2])))
    order2 = [p for p, _ in sorted(seq2, key=lambda x: -x[1])]
    check('12c full tie: komi-holder is the trailing picker',
          order2 == [0, 1, 0], str(order2))


# ---------------------------------------------------------------------------
# 13. Last Stand trigger (C-066)
# ---------------------------------------------------------------------------

def test_last_stand():
    g, bots = new_game()
    clear_board(g)
    bots[1].boon = 1                  # RALLY
    hurt = put(g, 1, 'sword', (2, 6))
    hurt.hp = 0
    g.remove_dead(defaultdict(int))
    # destroy P2's first wagon (uncapped to stay in one round)
    for _ in range(3):
        g.damage_wagon(0, 1, 0, capped=False)
    ls = [c for c in bots[1].calls if c[0] == 'laststand']
    check('13a Last Stand fires on first own-wagon loss', len(ls) == 1)
    check('13b RALLY: wounded unit returns now, free, full HP; +1 deploy',
          hurt.pos is not None and hurt.hp == hurt.max_hp
          and g.extra_deploy[1] == 1,
          'pos=%s extra=%s' % (hurt.pos, g.extra_deploy[1]))
    for _ in range(3):
        g.damage_wagon(0, 1, 1, capped=False)
    ls = [c for c in bots[1].calls if c[0] == 'laststand']
    check('13c Last Stand never fires twice for the same player',
          len(ls) == 1)
    check('13d killer collected both bounties (+6 total)',
          g.res[0]['supply'] == g.C['START_SUPPLY'] + 6,
          'supply=%d' % g.res[0]['supply'])


# ---------------------------------------------------------------------------
# 14. Frontier edge rules feeding the economy loop
# ---------------------------------------------------------------------------

def test_frontier_edges():
    # palisade absorption: stake holds, no row lost, no tribute
    g, _ = new_game()
    clear_board(g)
    g.fields.clear()
    put(g, 0, 'sword', (0, 4))
    put(g, 0, 'sword', (0, 3))
    g.palisades[0] = 1                # P2's palisade (the pushed player)
    g.frontier()
    check('14a palisade absorbs the step: stake holds, palisade destroyed, '
          'no row lost', g.stakes[0] == 4 and 0 not in g.palisades
          and g.rows_lost_round == [0, 0])
    # clamp: no step, no row lost (fresh game so no other column moves)
    gc, _ = new_game()
    clear_board(gc)
    gc.fields.clear()
    gc.stakes[1] = 6
    put(gc, 0, 'sword', (1, 6))
    put(gc, 0, 'sword', (1, 5))
    gc.frontier()
    check('14b stake clamped at heartland edge: no row lost beyond clamp',
          gc.stakes[1] == 6 and gc.rows_lost_round == [0, 0],
          'stake=%d lost=%s' % (gc.stakes[1], gc.rows_lost_round))
    # trample RAID pays 3 of the field type
    g2, bots2 = new_game()
    clear_board(g2)
    g2.fields.clear()
    put(g2, 0, 'sword', (0, 4))
    put(g2, 0, 'sword', (0, 3))
    g2.fields[(0, 4)] = {'type': 'crop', 'owner': 1, 'annexed': None}
    bots2[0].trample = 'raid'
    crop0 = g2.res[0]['crop']
    g2.frontier()
    check('14c RAID on trampled field: +3 of its type, field destroyed',
          g2.res[0]['crop'] == crop0 + 3 and (0, 4) not in g2.fields)
    # trample ANNEX -> yield 1 for the new owner
    g3, bots3 = new_game()
    clear_board(g3)
    g3.fields.clear()
    put(g3, 0, 'sword', (0, 4))
    put(g3, 0, 'sword', (0, 3))
    g3.fields[(0, 4)] = {'type': 'crop', 'owner': 1, 'annexed': None}
    bots3[0].trample = 'annex'
    g3.frontier()
    _, crop = g3.compute_harvest(0)
    check('14d ANNEX: field kept at yield 1 behind the new owner\'s limes',
          g3.fields[(0, 4)]['annexed'] == 0 and crop == 1, 'crop=%d' % crop)


# ---------------------------------------------------------------------------
# Robustness probes (expected-fail candidates)
# ---------------------------------------------------------------------------

def test_probe_duplicate_feed_list():
    g, bots = new_game()
    clear_board(g)
    g.fields.clear()
    u = put(g, 0, 'sword', (2, 2))
    g.res[0]['crop'] = 5
    bots[0].feed = [u.uid, u.uid]          # malformed bot input
    g.muster_player(0)
    check('P1 duplicate uid in feed list charges upkeep once (spec: 1 '
          'Crop per unit)', g.res[0]['crop'] == 4,
          'crop=%d (double-charged)' % g.res[0]['crop'])


def test_probe_ward_vs_displacement():
    g, _ = new_game()
    clear_board(g)
    ward = put(g, 1, 'sword', (4, 4))
    ward.hp = 1
    put(g, 1, 'sword', (4, 5))             # adjacent friendly Sword (bearer)
    pusher = put(g, 0, 'siege', (4, 6))
    put(g, 0, 'sword', (4, 3))             # blocks the push destination
    g.wards = [{'uid': ward.uid, 'owner': 1, 'active': True}]
    contrib = defaultdict(int)
    g.apply_pushes([{'uid': ward.uid, 'dir': (0, -1), 'pusher': pusher.uid,
                     'kind': 'siege', 'tgt_tile': ward.pos}], contrib)
    g.remove_dead(contrib)
    check('P2 Shieldbearer redirects the first lethal damage instance, '
          'including displacement damage (C-051)', ward.pos is not None,
          'warded unit died to a blocked push; ward bypassed')


# ---------------------------------------------------------------------------

def main():
    tests = [
        test_harvest_behind_limes, test_farmstead, test_upkeep_strain,
        test_exhausted, test_shared_supply, test_unlock_ladder,
        test_inertia, test_tribute_accrual_and_spends, test_wounded_return,
        test_wagon_bounty_and_cap, test_land_exhaustion,
        test_caravan_priority, test_last_stand, test_frontier_edges,
        test_probe_duplicate_feed_list, test_probe_ward_vs_displacement,
    ]
    for t in tests:
        run(t)
    fails = [(n, d) for n, ok, d in RESULTS if not ok]
    print('\n%d checks, %d failed' % (len(RESULTS), len(fails)))
    for n, d in fails:
        print('  FAIL: %s %s' % (n, ('[' + d + ']') if d else ''))
    return 1 if fails else 0


if __name__ == '__main__':
    sys.exit(main())
