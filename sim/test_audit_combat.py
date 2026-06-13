"""COMBAT + FRONTIER correctness audit for LIMES v3 baseline engine.

Targeted micro-scenario tests against design/v3-rules-spec.md.
Each test builds a hand-placed board, drives the engine internals directly,
and asserts the spec-mandated outcome.  Tests that FAIL demonstrate defects.

Run:  python3 /home/bugra/Desktop/limes/sim/test_audit_combat.py
"""

import sys
import traceback

sys.path.insert(0, '/home/bugra/Desktop/limes/sim')
from engine import Game, GameOver, ClashEnd  # noqa: E402


# ---------------------------------------------------------------------------
# Scriptable stub bot
# ---------------------------------------------------------------------------

class StubBot:
    def __init__(self):
        self.order_map = {1: {}, 2: {}}
        self.trample = 'raid'
        self.reinforce_fn = None

    def reset(self, seed, p):
        pass

    def setup(self, g, p):
        return {'wagons': [0, 3, 6], 'units': []}

    def feed_order(self, g, p):
        return []

    def build(self, g, p):
        return []

    def reinforce(self, g, p):
        if self.reinforce_fn:
            return self.reinforce_fn(g, p)
        return {}

    def orders(self, g, p, pulse):
        return self.order_map.get(pulse, {})

    def intervention(self, g, p, wno):
        return None

    def trample_choice(self, g, p, tile, f):
        return self.trample

    def artifact_pick(self, g, p, options):
        return options[0]

    def entrench_cols(self, g, p):
        return []

    def standard_bearer(self, g, p):
        return None

    def promo_t2(self, g, p, u):
        return 'atk'

    def last_stand(self, g, p):
        return 3


def new_game():
    b0, b1 = StubBot(), StubBot()
    g = Game([b0, b1], seed=1)
    return g, b0, b1


def add(g, p, arch, pos, hp=None, braced=False, exhausted=False):
    u = g.new_unit(p, arch)
    g.place(u, pos)
    if hp is not None:
        u.hp = hp
    u.braced = braced
    u.exhausted = exhausted
    return u


def add_wagons(g, p, cols=(0, 3, 6)):
    back = g.back_row(p)
    for i, c in enumerate(cols):
        g.wagons[p].append({'col': c, 'row': back, 'hp': g.C['WAGON_HP']})
        g.wagon_at[(c, back)] = (p, i)


def wagon_total(g, p):
    return sum(max(0, w['hp']) for w in g.wagons[p])


# ---------------------------------------------------------------------------
# Tests.  Coordinates are 0-indexed (col, row); P1=owner 0 rows<stake,
# P2=owner 1 rows>=stake; stakes start at 4 everywhere.
# ---------------------------------------------------------------------------

def test_braced_spear_vs_charging_cavalry():
    """C-041/C-043/C-045: BRACE resolves first; charge vs braced Spear does
    no damage; charger eats baseAtk+1 anti-cav retaliation and is pushed
    back 1 before the Melee sub-phase.  Spear wins the trade."""
    g, b0, b1 = new_game()
    spear = add(g, 0, 'spear', (3, 3))            # braces THIS pulse
    cav = add(g, 1, 'cav', (3, 6))
    b0.order_map[1] = {spear.uid: ('BRACE',)}
    b1.order_map[1] = {cav.uid: ('CHARGE', spear.uid, [(3, 5), (3, 4)])}
    g.run_pulse(1)
    assert spear.hp == 4, f"spear took damage from the charge: hp={spear.hp}"
    assert spear.braced, "spear lost Brace"
    assert cav.hp == 2, f"charger should take 1+1-0=2 retaliation, hp={cav.hp}"
    assert cav.pos == (3, 5), f"charger not pushed back 1: pos={cav.pos}"


def test_simultaneous_mutual_kill_ranged():
    """C-035: damage simultaneous within a sub-phase -- two archers at 2 HP
    shooting each other both die, both deal damage."""
    g, b0, b1 = new_game()
    a0 = add(g, 0, 'archer', (2, 2), hp=2)
    a1 = add(g, 1, 'archer', (2, 4), hp=2)
    b0.order_map[1] = {a0.uid: ('SHOOT', ('U', a1.uid))}
    b1.order_map[1] = {a1.uid: ('SHOOT', ('U', a0.uid))}
    g.run_pulse(1)
    assert a0.pos is None and a1.pos is None, \
        f"mutual kill failed: a0.hp={a0.hp} pos={a0.pos}, a1.hp={a1.hp} pos={a1.pos}"


def test_killed_unit_still_deals_melee_damage():
    """C-044: retaliation lands even if the defender dies; a melee attacker
    killed by retaliation still deals its damage."""
    g, b0, b1 = new_game()
    a = add(g, 0, 'sword', (3, 3), hp=2)
    b = add(g, 1, 'sword', (3, 4))               # hp 5
    b0.order_map[1] = {a.uid: ('MELEE', b.uid, [])}
    g.run_pulse(1)
    assert a.pos is None, f"attacker should die to retaliation 2: hp={a.hp}"
    assert b.hp == 3, f"dead attacker's 2 dmg must still land: b.hp={b.hp}"


def test_attack_bonus_cap_plus2():
    """C-038: counter(+1)+charge(+1)+flank(+1)=3 capped at +2 -> EffAtk 4."""
    g, _, _ = new_game()
    tgt = add(g, 1, 'archer', (4, 4))
    cav = add(g, 0, 'cav', (4, 3))
    add(g, 0, 'spear', (3, 4))                   # 2nd adjacent enemy: flanked
    ea = g.eff_atk(cav, tgt, charge=True)
    assert ea == 4, f"EffAtk should be 2+min(2,3)=4, got {ea}"


def test_guard_cap_plus2():
    """C-039: support(+1)+brace(+1)+hill(+1)=3 capped at +2 -> EffGuard 2."""
    g, _, _ = new_game()
    sp = add(g, 1, 'spear', (4, 5), braced=True)
    add(g, 1, 'sword', (4, 6))                   # support, own territory
    g.terrain_on = True
    g.ttype[(4, 5)] = 'hills'
    eg = g.eff_guard(sp)
    assert eg == 2, f"EffGuard should cap at 2, got {eg}"


def test_flanked_min_1():
    """C-037: flanked target always takes min 1 even when Guard zeroes it."""
    g, _, _ = new_game()
    tgt = add(g, 1, 'spear', (4, 5), braced=True)
    add(g, 1, 'sword', (4, 6))                   # support -> guard 2
    atk = add(g, 0, 'spear', (4, 4))
    add(g, 0, 'sword', (3, 5))                   # 2nd adjacent enemy: flanked
    dmg = g.attack_damage(atk, tgt)
    # EffAtk = 1+min(2,flank1)=2; EffGuard=2; raw 0 -> floor 1
    assert dmg == 1, f"flanked-min-1 violated: dmg={dmg}"


def test_displacement_blocked_push_chain_damage():
    """C-042/C-048: siege shot pushes target away; blocked push deals 1 to
    the pushed unit AND 1 to the blocking unit."""
    g, b0, _ = new_game()
    sg = add(g, 0, 'siege', (3, 1))
    u = add(g, 1, 'sword', (3, 3))               # beyond own line: no support
    v = add(g, 1, 'sword', (3, 4))               # blocks the push
    b0.order_map[1] = {sg.uid: ('SHOOT', ('U', u.uid))}
    g.run_pulse(1)
    assert u.pos == (3, 3), f"blocked push must not move the unit: {u.pos}"
    assert u.hp == 1, f"u: 3 shot + 1 blocked-push = 4 dmg, hp should be 1, got {u.hp}"
    assert v.hp == 4, f"blocker should take 1 chain damage, hp={v.hp}"


def test_archer_melee_retaliation_exactly_1():
    """C-044/D-08: Archer retaliates exactly 1 when meleed (not baseAtk-guard
    =2); and Archer SHOOT at distance 1 is illegal (degrades to HOLD)."""
    g, b0, b1 = new_game()
    sw = add(g, 0, 'sword', (3, 3))              # alone, guard 0
    ar = add(g, 1, 'archer', (3, 4))
    b0.order_map[1] = {sw.uid: ('MELEE', ar.uid, [])}
    b1.order_map[1] = {ar.uid: ('SHOOT', ('U', sw.uid))}   # dist 1: illegal
    g.run_pulse(1)
    assert ar.hp == 1, f"archer should take 2 melee, hp={ar.hp}"
    assert sw.hp == 4, \
        f"archer retaliation must be exactly 1 (full formula would be 2): sword hp={sw.hp}"


def test_standard_rout_adjacency():
    """C-074: Standard with all existing adjacent tiles enemy-occupied routs:
    clash ends, 2 Wagon damage exempt from breach cap; a friendly adjacent
    tile prevents it; board edge tiles are absent, not impassable."""
    # (a) full 4-side surround
    g, _, _ = new_game()
    add_wagons(g, 0)
    add_wagons(g, 1)
    add(g, 1, 'hero', (3, 3))
    for pos in ((2, 3), (4, 3), (3, 2), (3, 4)):
        add(g, 0, 'sword', pos)
    g.clash()
    assert wagon_total(g, 1) == 7, \
        f"rout should deal 2 wagon dmg: P2 wagons={wagon_total(g, 1)}"
    assert g.cap_dmg[0] == 0, f"rout dmg must be cap-exempt: cap_dmg={g.cap_dmg[0]}"
    # (b) friendly adjacent tile prevents rout
    g, _, _ = new_game()
    add_wagons(g, 0)
    add_wagons(g, 1)
    add(g, 1, 'hero', (3, 3))
    for pos in ((2, 3), (4, 3), (3, 2)):
        add(g, 0, 'sword', pos)
    add(g, 1, 'sword', (3, 4))                   # friend holds the gap
    g.clash()
    assert wagon_total(g, 1) == 9, "friendly-adjacent hero must not rout"
    # (c) corner Standard: only 2 existing neighbors, both enemy -> routs
    g, _, _ = new_game()
    add_wagons(g, 0, cols=(1, 3, 6))             # keep (0,0) free
    add_wagons(g, 1)
    add(g, 1, 'hero', (0, 0))
    add(g, 0, 'sword', (1, 0))
    add(g, 0, 'sword', (0, 1))
    g.clash()
    assert wagon_total(g, 1) == 7, \
        f"corner rout (D-24) failed: P2 wagons={wagon_total(g, 1)}"


def test_breach_cap_2_then_3():
    """C-064: total Wagon damage per player per round capped at 2; cap is 3
    from round 13."""
    g, _, _ = new_game()
    add_wagons(g, 0)
    add_wagons(g, 1)
    # three breachers on P2 heartland (row 6), plus mutual support
    for c in (0, 1, 2):
        add(g, 0, 'sword', (c, 6))
    g.frontier()
    assert wagon_total(g, 1) == 7, \
        f"round<13 breach must cap at 2: P2 wagons={wagon_total(g, 1)}"
    assert g.cap_dmg[0] == 2
    g.round = 13
    g.cap_dmg = [0, 0]
    g.frontier()
    assert wagon_total(g, 1) == 4, \
        f"round 13 cap must be 3: P2 wagons={wagon_total(g, 1)}"


def test_carry_contested_holds_and_lone_runner():
    """C-053..C-056: contested stake holds; a lone runner contests but cannot
    carry; exhausted units neither carry nor contest; clamp at STAKE_MAX."""
    g, _, _ = new_game()
    runner = add(g, 0, 'sword', (2, 5))          # beyond stake 4, no friends
    g.frontier()
    assert g.stakes[2] == 4, f"lone runner must not carry: stake={g.stakes[2]}"
    friend = add(g, 0, 'sword', (2, 3))          # Manhattan 2: body of troops
    g.frontier()
    assert g.stakes[2] == 5, f"escorted runner should carry: stake={g.stakes[2]}"
    blocker = add(g, 1, 'sword', (2, 6))         # unbroken enemy in its half
    g.frontier()
    assert g.stakes[2] == 5, f"contested stake must hold: stake={g.stakes[2]}"
    blocker.exhausted = True                     # broken: cannot contest
    g.frontier()
    assert g.stakes[2] == 6, f"exhausted blocker must not contest: {g.stakes[2]}"
    g.frontier()                                 # clamp at STAKE_MAX=6
    assert g.stakes[2] == 6, f"stake must clamp at 6: {g.stakes[2]}"
    assert friend is not None


def test_zoc_arrest():
    """C-043: moving adjacent to an enemy ends movement; the stopped runner
    (still a lone runner) claims nothing."""
    g, b0, _ = new_game()
    cav = add(g, 0, 'cav', (2, 2))
    add(g, 0, 'sword', (2, 1))                   # friend (far from final pos)
    add(g, 1, 'sword', (3, 4))                   # ZoC blocker, column 3
    b0.order_map[1] = {cav.uid: ('MOVE', [(2, 3), (2, 4), (2, 5)])}
    g.run_pulse(1)
    assert cav.pos == (2, 4), f"ZoC must stop the runner at (2,4): pos={cav.pos}"
    g.frontier()
    assert g.stakes[2] == 4, \
        f"arrested lone runner must not carry: stake={g.stakes[2]}"


def test_trample_raid_and_annex():
    """C-059..C-061: Raid pays 3 of the field type and destroys it; Annex
    yields 1; a push-back reverts the field to its owner at full yield."""
    # RAID
    g, b0, _ = new_game()
    b0.trample = 'raid'
    add(g, 0, 'sword', (2, 4))
    add(g, 0, 'sword', (2, 3))
    g.fields[(2, 4)] = {'type': 'crop', 'owner': 1, 'annexed': None}
    crop0 = g.res[0]['crop']
    g.frontier()
    assert g.stakes[2] == 5
    assert g.res[0]['crop'] == crop0 + 3, \
        f"raid must pay +3 crop: {g.res[0]['crop'] - crop0}"
    assert (2, 4) not in g.fields, "raided field must be destroyed"
    # ANNEX then reversion
    g, b0, _ = new_game()
    b0.trample = 'annex'
    u1 = add(g, 0, 'sword', (2, 4))
    u2 = add(g, 0, 'sword', (2, 3))
    g.fields[(2, 4)] = {'type': 'supply', 'owner': 1, 'annexed': None}
    g.frontier()
    f = g.fields[(2, 4)]
    assert f['annexed'] == 0, f"annex failed: {f}"
    sup, _ = g.compute_harvest(0)
    assert sup == 1, f"annexed field must yield 1, got {sup}"
    # push the stake back: P2 carries, field reverts at full yield
    for u in (u1, u2):
        del g.board[u.pos]
        u.pos = None
    add(g, 1, 'sword', (2, 4))
    add(g, 1, 'sword', (2, 5))
    g.frontier()
    assert g.stakes[2] == 4, f"P2 should push back: stake={g.stakes[2]}"
    assert g.fields[(2, 4)]['annexed'] is None, "reversion failed"
    sup2, _ = g.compute_harvest(1)
    assert sup2 == 2, f"reverted field must yield full 2 for owner, got {sup2}"


def test_golden_goal_trigger():
    """C-070: from round 16, a round in which a player takes a Stake-row ends
    the game immediately (golden goal); round 15 with the same board does not."""
    g, _, _ = new_game()
    add_wagons(g, 0)
    add_wagons(g, 1)
    add(g, 0, 'sword', (2, 5))                   # still beyond after k=5
    add(g, 0, 'sword', (2, 4))                   # escort within 2
    add(g, 1, 'sword', (5, 6))
    g.res[0]['crop'] = 20                        # keep the spearhead fed
    g.round = 15
    g.play_round()                               # row taken, but round 15: no end
    assert g.round == 16
    try:
        g.play_round()                           # row taken in round 16
        raise AssertionError("golden goal did not fire in round 16")
    except GameOver as e:
        assert e.winner == 0 and e.wtype == 'golden-goal', \
            f"wrong golden-goal result: winner={e.winner} type={e.wtype}"


# ---------------------------------------------------------------------------
# Defect-probe tests (assert the SPEC expectation; a FAIL = demonstrated defect)
# ---------------------------------------------------------------------------

def test_DEFECT_zoc_simultaneous_movement_order_dependent():
    """C-043: 'a unit's movement ends immediately after any step that leaves
    it adjacent to an enemy unit.'  Two units moving simultaneously become
    adjacent after step 1; BOTH must stop.  The engine checks ZoC right after
    each unit's own move in scan order of destination tile, so the unit
    processed first never sees the enemy that arrives later in the same
    lockstep step and keeps moving -- a scan-order first-actor asymmetry the
    spec bans (C-035 'no first-actor coin flip, ever')."""
    g, b0, b1 = new_game()
    a = add(g, 0, 'cav', (0, 0))
    b = add(g, 1, 'cav', (1, 2))
    b0.order_map[1] = {a.uid: ('MOVE', [(0, 1), (0, 2)])}
    b1.order_map[1] = {b.uid: ('MOVE', [(1, 1)])}
    g.run_pulse(1)
    # after step 1: a at (0,1), b at (1,1) -- adjacent.  Spec: a stops there.
    assert b.pos == (1, 1)
    assert a.pos == (0, 1), \
        (f"ZoC violated: A ended adjacent to enemy after step 1 but kept "
         f"moving to {a.pos}; mirrored scan order would have stopped it")


def test_DEFECT_shieldbearer_ignores_displacement_damage():
    """C-051: Shieldbearer redirects 'the first damage instance that would
    reduce the warded unit to HP<=0' -- with no carve-out for displacement
    damage.  A warded unit killed by a blocked brace push-back must have that
    instance redirected to the adjacent friendly Swordsman."""
    g, b0, b1 = new_game()
    spear = add(g, 0, 'spear', (3, 3))
    cav = add(g, 1, 'cav', (3, 4), hp=2)         # the warded unit
    bearer = add(g, 1, 'sword', (3, 5))          # blocks the push, eligible ward target
    g.wards.append({'uid': cav.uid, 'owner': 1, 'active': True})
    b0.order_map[1] = {spear.uid: ('BRACE',)}
    b1.order_map[1] = {cav.uid: ('MELEE', spear.uid, [])}
    g.run_pulse(1)
    # melee: cav takes ret 1 (spear 1+1 anti-cav - support 1) -> hp 1 (not lethal,
    # ward untouched); brace push into occupied (3,5) -> 1 dmg, lethal.
    assert cav.pos is not None, \
        (f"warded unit died to displacement damage without redirect "
         f"(hp={cav.hp}, bearer hp={bearer.hp}, ward active="
         f"{g.wards[0]['active']})")


def test_DEFECT_facedown_recruit_repositioned_out_of_heartland():
    """C-027/C-028: new recruits deploy face-down ON HEARTLAND ROWS; the 2
    repositions move EXISTING units.  The engine processes recruits before
    repositions in the same Muster and does not exclude just-recruited units,
    so a face-down recruit can be teleported to the stake line before the
    Reveal -- bypassing deploy inertia (anti-netdeck lock #3)."""
    g, b0, _ = new_game()

    def rf(gg, p):
        uid = gg.next_uid                        # uid the recruit will get
        return {'recruits': [('sword', (0, 1))],
                'repositions': [(uid, (0, 3))]}
    b0.reinforce_fn = rf
    g.muster_player(0)
    u = g.units[g.board[(0, 3)]] if (0, 3) in g.board else None
    assert u is None or not u.face_down, \
        (f"face-down recruit teleported out of Heartland in the same Muster: "
         f"pos={(0, 3)}, face_down={u.face_down}")


def test_charge_pushthrough():
    """C-043: charge push-through -- target pushed directly away, charger must
    advance into the vacated tile (sanity companion to the brace test)."""
    g, b0, _ = new_game()
    cav = add(g, 0, 'cav', (3, 1))
    sw = add(g, 1, 'sword', (3, 4))
    b0.order_map[1] = {cav.uid: ('CHARGE', sw.uid, [(3, 2), (3, 3)])}
    g.run_pulse(1)
    assert sw.hp == 2, f"charge dmg 2+1: sword hp={sw.hp}"
    assert sw.pos == (3, 5), f"target not pushed through: {sw.pos}"
    assert cav.pos == (3, 4), f"charger must advance into vacated tile: {cav.pos}"


TESTS = [
    test_braced_spear_vs_charging_cavalry,
    test_simultaneous_mutual_kill_ranged,
    test_killed_unit_still_deals_melee_damage,
    test_attack_bonus_cap_plus2,
    test_guard_cap_plus2,
    test_flanked_min_1,
    test_displacement_blocked_push_chain_damage,
    test_archer_melee_retaliation_exactly_1,
    test_standard_rout_adjacency,
    test_breach_cap_2_then_3,
    test_carry_contested_holds_and_lone_runner,
    test_zoc_arrest,
    test_trample_raid_and_annex,
    test_golden_goal_trigger,
    test_charge_pushthrough,
    test_DEFECT_zoc_simultaneous_movement_order_dependent,
    test_DEFECT_shieldbearer_ignores_displacement_damage,
    test_DEFECT_facedown_recruit_repositioned_out_of_heartland,
]


def main():
    passed = failed = 0
    for t in TESTS:
        try:
            t()
            print(f"PASS  {t.__name__}")
            passed += 1
        except AssertionError as e:
            print(f"FAIL  {t.__name__}: {e}")
            failed += 1
        except Exception:
            print(f"ERROR {t.__name__}:")
            traceback.print_exc()
            failed += 1
    print(f"\n{passed} passed, {failed} failed")
    return failed


if __name__ == '__main__':
    sys.exit(0 if main() == 0 else 1)
