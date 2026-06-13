"""EXP3 -- Deterministic hand-probes against the engine (no bots' choices):

  A. Carry geometry: archer-mass carry, single-blocker contest, solo-runner
     block + radius sensitivity (1/2/3), via column_claims AND full frontier().
  B. Exhausted units: cannot carry, cannot contest; feeding restores carry.
  C. ZoC micro-probe through run_pulse: arrest with ZOC_ENABLED=1,
     free run with ZOC_ENABLED=0.
  D. Stake oscillation economics: scripted 12-round flip-flop of one column;
     tribute farmed vs honest field income; trample raid/annex cycling.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from common import SIM_DIR  # noqa: F401  (sets sys.path for engine/bots)
import engine

CHECKS = []


def check(name, cond, detail=''):
    CHECKS.append((name, bool(cond)))
    print('%s  %s%s' % ('PASS' if cond else 'FAIL', name,
                        ('  [' + detail + ']') if detail else ''))


class Stub:
    """Scripted bot: fixed orders dict, fixed trample choice."""

    def __init__(self, trample='raid'):
        self.trample = trample
        self.orders_map = {}
        self.trample_calls = 0

    def reset(self, seed, player):
        pass

    def orders(self, g, me, pulse):
        return dict(self.orders_map)

    def trample_choice(self, g, me, pos, field):
        self.trample_calls += 1
        return self.trample

    def breach_target(self, g, me, u, tied):
        return tied[0][0]

    def rout_allocate(self, g, me, victim, dmg):
        return []


def fresh(overrides=None):
    return engine.Game([Stub(), Stub()], 1, overrides)


def put(g, owner, arch, pos, exhausted=False):
    u = g.new_unit(owner, arch)
    g.place(u, pos)
    u.exhausted = exhausted
    return u


# ---------------------------------------------------------------------------
print('--- A. carry geometry ---')

# A1: massed archers beyond the line, uncontested column -> they DO carry
g = fresh()
put(g, 0, 'archer', (3, 4))
put(g, 0, 'archer', (3, 5))
put(g, 0, 'archer', (2, 4))
c1, c2 = g.column_claims(3)
check('A1 massed archers beyond line carry (claim valid)', (c1, c2) == (True, False),
      'claims=%s' % str((c1, c2)))
g.frontier()
check('A1 frontier moves the stake', g.stakes[3] == 5, 'stake=%d' % g.stakes[3])

# A2: one cheap enemy blocker anywhere in its own half holds the line
g = fresh()
put(g, 0, 'archer', (3, 4))
put(g, 0, 'archer', (3, 5))
put(g, 0, 'archer', (2, 4))
put(g, 1, 'spear', (3, 7))           # blocker deep in its own half
c1, c2 = g.column_claims(3)
check('A2 single blocker contests archer mass', (c1, c2) == (False, False),
      'claims=%s' % str((c1, c2)))
g.frontier()
check('A2 stake holds', g.stakes[3] == 4, 'stake=%d' % g.stakes[3])

# A3: solo runner beyond line, nearest friend far away -> cannot carry
g = fresh()
ru = put(g, 0, 'cav', (0, 5))
put(g, 0, 'sword', (4, 0))           # manh 9 away
check('A3 solo deep cav is a Lone Runner', g.lone_runner(ru))
c1, c2 = g.column_claims(0)
check('A3 lone runner cannot carry', (c1, c2) == (False, False),
      'claims=%s' % str((c1, c2)))
g.frontier()
check('A3 stake holds', g.stakes[0] == 4, 'stake=%d' % g.stakes[0])

# A3b: ...but it still contests the enemy's claim in ITS half
g = fresh()
put(g, 0, 'cav', (0, 5))             # lone P1 runner in P2 half
put(g, 1, 'sword', (0, 6))           # P2 carry pair in P2 half? no -- P2 must
put(g, 1, 'sword', (0, 7))           # be in P1 half to claim; here they hold
c1, c2 = g.column_claims(0)
check('A3b lone runner contests: P2 cannot carry past it (and P1 cannot carry)',
      (c1, c2) == (False, False), 'claims=%s' % str((c1, c2)))

# A4: radius sensitivity: buddy at manh 1 / 2 / 3 under radius 2
for d, expect in ((1, True), (2, True), (3, False)):
    g = fresh()
    put(g, 0, 'cav', (0, 4))
    put(g, 0, 'sword', (0 + d, 4) if d < 4 else (0, 4 - d))
    c1, _ = g.column_claims(0)
    check('A4 buddy at manh %d, radius 2 -> carry=%s' % (d, expect),
          c1 == expect, 'claim=%s' % c1)

# A4b: radius override changes the same shape
for rad, expect in ((1, False), (2, True), (3, True)):
    g = fresh({'LONE_RUNNER_RADIUS': rad})
    put(g, 0, 'cav', (0, 4))
    put(g, 0, 'sword', (2, 4))       # buddy at manh 2
    c1, _ = g.column_claims(0)
    check('A4b buddy at manh 2, radius %d -> carry=%s' % (rad, expect),
          c1 == expect, 'claim=%s' % c1)

# ---------------------------------------------------------------------------
print('--- B. exhausted units ---')

# B1: exhausted spearhead cannot carry; feeding it restores the carry
g = fresh()
u1 = put(g, 0, 'sword', (0, 4), exhausted=True)
put(g, 0, 'sword', (0, 3))
c1, c2 = g.column_claims(0)
check('B1 exhausted unit cannot carry', (c1, c2) == (False, False),
      'claims=%s' % str((c1, c2)))
u1.exhausted = False
c1, c2 = g.column_claims(0)
check('B1 fed unit carries again', (c1, c2) == (True, False))

# B2: exhausted defender does not contest -- the stake walks through it
g = fresh()
put(g, 0, 'sword', (0, 4))
put(g, 0, 'sword', (0, 3))
put(g, 1, 'sword', (0, 6), exhausted=True)
c1, c2 = g.column_claims(0)
check('B2 exhausted defender does not contest', (c1, c2) == (True, False),
      'claims=%s' % str((c1, c2)))
g.frontier()
check('B2 stake advances past starved defender', g.stakes[0] == 5)

# B3: exhausted runner ALSO cannot carry (starve-runner cheese dead);
# buddy sits in OWN half so only the exhausted cav is beyond the line
g = fresh()
put(g, 0, 'cav', (0, 5), exhausted=True)
put(g, 0, 'sword', (0, 3))
c1, c2 = g.column_claims(0)
check('B3 exhausted deep cav cannot carry even with buddy', not c1,
      'claims=%s' % str((c1, c2)))

# ---------------------------------------------------------------------------
print('--- C. ZoC micro-probe (run_pulse) ---')

for zoc, expect_pos in ((1, (0, 4)), (0, (0, 6))):
    g = fresh({'ZOC_ENABLED': zoc})
    cav = put(g, 0, 'cav', (0, 3))
    put(g, 1, 'sword', (1, 4))       # ZoC source adjacent to (0,4)
    g.bots[0].orders_map = {cav.uid: ('MOVE', [(0, 4), (0, 5), (0, 6)])}
    g.run_pulse(1)
    check('C1 ZOC_ENABLED=%d: cav ends at %s' % (zoc, expect_pos),
          cav.pos == expect_pos, 'pos=%s' % str(cav.pos))

# ---------------------------------------------------------------------------
print('--- D. oscillation economics (scripted 12-round flip-flop, column 0) ---')

g = fresh(); g.bots[0].trample, g.bots[1].trample = 'raid', 'raid'
u1 = put(g, 0, 'sword', (0, 3)); u2 = put(g, 0, 'sword', (1, 3))
v1 = put(g, 1, 'sword', (0, 6)); v2 = put(g, 1, 'sword', (1, 6))
g.fields[(0, 4)] = {'type': 'supply', 'owner': 1, 'annexed': None}
supply0 = [g.res[0]['supply'], g.res[1]['supply']]
trample_events = 0
for rnd in range(1, 13):
    g.round = rnd
    g.rows_lost_round = [0, 0]
    g.rows_taken_round = [0, 0]
    k = g.stakes[0]
    if rnd % 2 == 1:                  # P2 evacuates the column, P1 steps beyond
        g.move_unit(v1, (3, 6)); g.move_unit(v2, (3, 7))
        g.move_unit(u1, (0, k)); g.move_unit(u2, (0, k - 1))
    else:                             # P1 evacuates, P2 steps beyond
        g.move_unit(u1, (3, 0)); g.move_unit(u2, (3, 1))
        g.move_unit(v1, (0, k - 1)); g.move_unit(v2, (0, k))
    before = g.bots[0].trample_calls + g.bots[1].trample_calls
    g.frontier()
    trample_events += (g.bots[0].trample_calls + g.bots[1].trample_calls) - before
    for p in (0, 1):                  # Phase-5 tribute accrual (C-067)
        g.res[p]['tribute'] += g.C['TRIBUTE_PER_ROW'] * g.rows_lost_round[p]
trib = [g.res[0]['tribute'], g.res[1]['tribute']]
raid_gain = g.res[0]['supply'] - supply0[0]
print('  stakes col0 after 12 rounds: %d; tribute P1=%d P2=%d; '
      'P1 raid gain=%d supply; trample events=%d; field alive=%s'
      % (g.stakes[0], trib[0], trib[1], raid_gain, trample_events,
         (0, 4) in g.fields))
check('D1 flip-flop farms only ~0.5 chips/round each',
      trib[0] == 6 and trib[1] == 6, 'trib=%s' % str(trib))
check('D1 raid fires once, then the field is gone (no repeat-raid farm)',
      raid_gain == g.C['RAID_GAIN'] and trample_events == 1
      and (0, 4) not in g.fields,
      'raid_gain=%d events=%d' % (raid_gain, trample_events))
yield_per_round = g.C['FIELD_YIELD']
print('  EV: oscillation = %.2f supply-equiv/round/player (chips@1) vs one '
      'held Field = %d/round; conceding also exposed the row Field to a '
      '%d-supply Raid' % (trib[0] / 12.0, yield_per_round, g.C['RAID_GAIN']))

# D2: annex -> revert -> annex cycle conserves the field (no resource pump)
g = fresh(); g.bots[0].trample, g.bots[1].trample = 'annex', 'annex'
u1 = put(g, 0, 'sword', (0, 3)); u2 = put(g, 0, 'sword', (1, 3))
v1 = put(g, 1, 'sword', (0, 6)); v2 = put(g, 1, 'sword', (1, 6))
g.fields[(0, 4)] = {'type': 'supply', 'owner': 1, 'annexed': None}
states = []
for rnd in range(1, 5):
    g.round = rnd
    g.rows_lost_round = [0, 0]; g.rows_taken_round = [0, 0]
    k = g.stakes[0]
    if rnd % 2 == 1:
        g.move_unit(v1, (3, 6)); g.move_unit(v2, (3, 7))
        g.move_unit(u1, (0, k)); g.move_unit(u2, (0, k - 1))
    else:
        g.move_unit(u1, (3, 0)); g.move_unit(u2, (3, 1))
        g.move_unit(v1, (0, k - 1)); g.move_unit(v2, (0, k))
    g.frontier()
    f = g.fields.get((0, 4))
    states.append((g.stakes[0], None if f is None else (f['owner'], f['annexed'])))
print('  D2 (stake, field(owner,annexed)) per round:', states)
check('D2 annex/revert cycle: field returns to owner at full yield, '
      'no resources created',
      states == [(5, (1, 0)), (4, (1, None)), (5, (1, 0)), (4, (1, None))]
      and g.res[0]['supply'] == g.C['START_SUPPLY']
      and g.res[1]['supply'] == g.C['START_SUPPLY'])

# ---------------------------------------------------------------------------
n_fail = sum(1 for _, ok in CHECKS if not ok)
print('\n%d checks, %d failed' % (len(CHECKS), n_fail))
sys.exit(1 if n_fail else 0)
