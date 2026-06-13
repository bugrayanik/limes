"""Pooled battery with r1-winner basis split: do rows-basis r1 winners
convert better than chip-damage-basis r1 winners?  Also reports metric B.
Usage: python3 diag_basis.py [n_per_pairing] [overrides.json]
"""
import itertools
import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                '..', '..'))
import engine
import bots

PAIRINGS = [tuple(p) for p in itertools.combinations_with_replacement(
    ('HONEST', 'AGGRO', 'TURTLE', 'PROBER'), 2)]
N = int(sys.argv[1]) if len(sys.argv) > 1 else 120
OV = json.load(open(sys.argv[2])) if len(sys.argv) > 2 else None

tot = {'rows': [0, 0], 'dmg': [0, 0]}   # basis -> [converted, decided]
n_all = lead = 0
wt = {}
rounds_all = []
for j, (na, nb) in enumerate(PAIRINGS):
    for i in range(N):
        a_is_p1 = (i % 2 == 0)
        b1 = bots.make_bot(na if a_is_p1 else nb)
        b2 = bots.make_bot(nb if a_is_p1 else na)
        g = engine.Game([b1, b2], 1 + j * 10000 + i, OV, None)
        for p in (0, 1):
            [b1, b2][p].reset(1 + j * 10000 + i, p)
        g.setup()
        r1_rows = None
        winner = None
        try:
            while True:
                g.play_round()
                if g.round == 2 and r1_rows is None:
                    r1_rows = tuple(g.rows_taken_round)
        except engine.GameOver as e:
            winner = e.winner
            wtype = e.wtype
            if r1_rows is None:
                r1_rows = tuple(g.rows_taken_round)
        n_all += 1
        wt[wtype] = wt.get(wtype, 0) + 1
        rounds_all.append(g.round)
        changes, last = [], None
        for k, l in enumerate(g.lead_trace):
            if l is None:
                continue
            if last is not None and l != last:
                changes.append(k + 1)
            last = l
        if any(r >= 8 for r in changes):
            lead += 1
        if g.r1_winner is not None:
            basis = 'rows' if r1_rows[0] != r1_rows[1] else 'dmg'
            tot[basis][1] += 1
            if g.r1_winner == winner:
                tot[basis][0] += 1

rounds_all.sort()
med = rounds_all[n_all // 2]
dec = tot['rows'][1] + tot['dmg'][1]
conv = tot['rows'][0] + tot['dmg'][0]
print('n=%d overrides=%s' % (n_all, OV))
print('A pooled: %d/%d = %.4f' % (conv, dec, conv / dec))
print('  rows-basis: %d/%d = %s' % (tot['rows'][0], tot['rows'][1],
      round(tot['rows'][0] / tot['rows'][1], 4) if tot['rows'][1] else None))
print('  dmg-basis : %d/%d = %s' % (tot['dmg'][0], tot['dmg'][1],
      round(tot['dmg'][0] / tot['dmg'][1], 4) if tot['dmg'][1] else None))
print('B: %d/%d = %.4f' % (lead, n_all, lead / n_all))
print('win types: %s  median rounds: %s' % (wt, med))
