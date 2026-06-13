"""Contract B diagnostic: is the high lead-change rate (0.42) real momentum
swings, or noise from a razor-thin lead metric flipping on +/-1 row?

Re-plays the policy matrix, and for each round recomputes the leader under a
DEADBAND: wagons decide as usual, but if wagons are level the row lead only
counts as 'definite' when |owned_rows margin| >= MARGIN; otherwise the round is
'contested' (None). Compares the post-r7 lead-change rate at several deadbands.
"""
import os, sys, itertools
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
import engine, bots

CFG = {"SWORD_HP":6,"SIEGE_PUSH_UNITS":0,"CHARGE_ADJ_OK":0,"EXHAUSTED_CARRY":1,
       "R1_REQUIRE_ENGAGE":1,"EXHAUSTION_ACCEL":0,"WAGON_HP":2,"WAGON_BOUNTY":5,
       "GOLDEN_GOAL_ROUND":14,"HARD_STOP_ROUND":18,"BREACH_CAP_RISE_ROUND":11,
       "LONE_RUNNER_RADIUS":3}
POLICIES = ('HONEST','AGGRO','TURTLE','PROBER')
N = 60          # per pairing per seat
MARGINS = [-1, 0, 2, 3]   # -1 = engine lead_holder (incl army_hp); 0+ = meaningful lead


def army_hp(g, p):
    return sum(u.hp for u in g.units.values() if u.owner == p and u.pos is not None)


def leader(g, margin):
    wa0, wa1 = g.wagons_alive(0), g.wagons_alive(1)
    if wa0 != wa1:
        return 0 if wa0 > wa1 else 1
    wh0, wh1 = g.wagon_hp(0), g.wagon_hp(1)
    if wh0 != wh1:
        return 0 if wh0 > wh1 else 1
    r0, r1 = g.owned_rows(0), g.owned_rows(1)
    if margin < 0:                      # margin -1 == replicate engine lead_holder
        if r0 != r1:
            return 0 if r0 > r1 else 1
        a0, a1 = army_hp(g, 0), army_hp(g, 1)
        return None if a0 == a1 else (0 if a0 > a1 else 1)
    if abs(r0 - r1) >= max(1, margin):
        return 0 if r0 > r1 else 1
    return None      # contested: row lead within the deadband (army_hp ignored)


def changes_after_r7(trace):
    last, n = None, 0
    for i, l in enumerate(trace):       # i is 0-based; round = i+1
        if l is None:
            continue
        if last is not None and l != last and (i + 1) > 7:
            n += 1
        last = l
    return n


def play(spec_a, spec_b, seed):
    b0, b1 = bots.make_bot(spec_a), bots.make_bot(spec_b)
    g = engine.Game([b0, b1], seed, overrides=CFG)
    for p in (0, 1):
        [b0, b1][p].reset(seed, p)
    g.setup()
    traces = {m: [] for m in MARGINS}
    try:
        for _ in range(40):
            g.play_round()
            for m in MARGINS:
                traces[m].append(leader(g, m))
    except engine.GameOver:
        pass
    return {m: 1 if changes_after_r7(traces[m]) > 0 else 0 for m in MARGINS}


def main():
    tally = {m: 0 for m in MARGINS}
    games = 0
    seed = 50000
    for a, b in itertools.product(POLICIES, POLICIES):
        for s in range(N):
            for a_is_p1 in (True, False):
                sa, sb = (a, b) if a_is_p1 else (b, a)
                res = play(sa, sb, seed); seed += 1
                for m in MARGINS:
                    tally[m] += res[m]
                games += 1
    print(f"games={games}")
    print(f"{'deadband':>10}{'B (lead-change rate after r7)':>34}")
    for m in MARGINS:
        label = 'engine(+army)' if m==-1 else ('rows-exact' if m==0 else f'>= {m} rows')
        print(f"{label:>10}{tally[m]/games:>34.3f}")


if __name__ == '__main__':
    main()
