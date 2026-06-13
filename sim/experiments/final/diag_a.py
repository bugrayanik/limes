"""Contract A diagnostic: does the round-1 winner predict the match?
The spec says round-1 *clash* winner (the combat). The engine's r1 label is
rows-first (who grabbed a row), which may mislabel an early-row grab (often an
overextension trap) as 'winning'. Compare conversion under three labels:
  rows   : who took more Stake-rows in r1 (engine r1_rows_winner)
  clash  : who dealt more unit damage in r1 (the combat outcome)
  engine : current metric (rows, then damage fallback) = r1_winner
"""
import os, sys, itertools
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
import engine, bots

CFG = {"SWORD_HP":6,"SIEGE_PUSH_UNITS":0,"CHARGE_ADJ_OK":0,"EXHAUSTED_CARRY":1,
       "R1_REQUIRE_ENGAGE":1,"EXHAUSTION_ACCEL":0,"WAGON_HP":2,"WAGON_BOUNTY":5,
       "GOLDEN_GOAL_ROUND":14,"HARD_STOP_ROUND":18,"BREACH_CAP_RISE_ROUND":11,
       "LONE_RUNNER_RADIUS":3}
POLICIES = ('HONEST','AGGRO','TURTLE','PROBER')
N = 80


def play(spec_a, spec_b, seed):
    b0, b1 = bots.make_bot(spec_a), bots.make_bot(spec_b)
    g = engine.Game([b0, b1], seed, overrides=CFG)
    for p in (0, 1):
        [b0, b1][p].reset(seed, p)
    g.setup()
    winner = None
    try:
        g.play_round()                      # round 1
        d0, d1 = g.unit_dmg_round           # r1 clash damage (still set pre-round-2)
        rows = g.r1_rows_winner
        clash = None if d0 == d1 else (0 if d0 > d1 else 1)
        eng = g.r1_winner
        for _ in range(40):
            g.play_round()
    except engine.GameOver as e:
        winner = e.winner
    return rows, clash, eng, winner


def main():
    labels = ('rows', 'clash', 'engine')
    hit = {l: 0 for l in labels}
    dec = {l: 0 for l in labels}
    seed = 60000
    for a, b in itertools.product(POLICIES, POLICIES):
        for s in range(N):
            for a_is_p1 in (True, False):
                sa, sb = (a, b) if a_is_p1 else (b, a)
                rows, clash, eng, winner = play(sa, sb, seed); seed += 1
                if winner is None:
                    continue
                for l, r1 in zip(labels, (rows, clash, eng)):
                    if r1 is None:
                        continue
                    dec[l] += 1
                    if r1 == winner:
                        hit[l] += 1
    print(f"target A: r1 winner -> match winner in 55-65%")
    for l in labels:
        conv = hit[l] / dec[l] if dec[l] else 0
        print(f"  {l:7} conversion={conv:.3f}  (decided {dec[l]})")


if __name__ == '__main__':
    main()
