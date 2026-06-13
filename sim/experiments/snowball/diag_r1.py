"""Diagnose what the round-1 clash-winner signal actually measures.

For a given pairing, runs N matches and records: r1 basis (rows vs damage),
the r1 damage split, which SEAT and which BOT won r1, and who won the match.
"""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                '..', '..'))
import engine
import bots

PAIR = (sys.argv[1].upper(), sys.argv[2].upper()) if len(sys.argv) > 2 \
    else ('HONEST', 'TURTLE')
N = int(sys.argv[3]) if len(sys.argv) > 3 else 200

basis_rows = basis_dmg = none_r1 = 0
conv = dec = 0
r1bot = {PAIR[0]: 0, PAIR[1]: 0}
winbot = {PAIR[0]: 0, PAIR[1]: 0}
r1_to_matchwin = {}
for i in range(N):
    a_is_p1 = (i % 2 == 0)
    na, nb = PAIR
    b1 = bots.make_bot(na if a_is_p1 else nb)
    b2 = bots.make_bot(nb if a_is_p1 else na)
    g = engine.Game([b1, b2], 1 + i, None, None)
    for p in (0, 1):
        [b1, b2][p].reset(1 + i, p)
    g.setup()
    r1_rows = r1_dmg = None
    winner = wtype = None
    try:
        while True:
            g.play_round()
            if g.round == 2 and r1_rows is None:
                r1_rows = tuple(g.rows_taken_round)
                r1_dmg = tuple(g.unit_dmg_round)
    except engine.GameOver as e:
        winner, wtype = e.winner, e.wtype
        if g.round == 1 and r1_rows is None:
            r1_rows = tuple(g.rows_taken_round)
            r1_dmg = tuple(g.unit_dmg_round)
    seat_of = {0: na if a_is_p1 else nb, 1: nb if a_is_p1 else na}
    winbot[seat_of[winner]] += 1
    if g.r1_winner is None:
        none_r1 += 1
        continue
    dec += 1
    if r1_rows[0] != r1_rows[1]:
        basis_rows += 1
    else:
        basis_dmg += 1
    r1bot[seat_of[g.r1_winner]] += 1
    if g.r1_winner == winner:
        conv += 1
    key = (seat_of[g.r1_winner], seat_of[winner])
    r1_to_matchwin[key] = r1_to_matchwin.get(key, 0) + 1

print('pairing %s-%s N=%d' % (PAIR[0], PAIR[1], N))
print('match wins:', winbot)
print('r1 decided: %d (rows-basis %d, dmg-basis %d), undecided %d'
      % (dec, basis_rows, basis_dmg, none_r1))
print('r1 winner bot:', r1bot)
print('conversion: %d/%d = %.3f' % (conv, dec, conv / dec if dec else -1))
print('crosstab (r1winnerbot -> matchwinnerbot):', r1_to_matchwin)
