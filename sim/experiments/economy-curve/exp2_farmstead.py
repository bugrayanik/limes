"""EXP2: Does the farmstead bonus change placement decisions (i.e. is
adjacency-seeking placement actually worth it)?

CLUSTER (= HONEST default placement, adjacency-seeking) vs SCATTER
(adjacency-avoiding, otherwise identical), 300 seeds each, twice:
  (a) FARMSTEAD_BONUS = 2 (default)  -> cluster should win on income
  (b) FARMSTEAD_BONUS = 0 (control)  -> edge should vanish
"""

from collections import defaultdict

from econlib import run_battery, winrate

CLUSTER = 'HONEST'
SCATTER = {'base': 'HONEST', 'scatter_fields': True, 'label': 'SCATTER'}


def income_by_bot(results):
    inc = defaultdict(float)
    cnt = defaultdict(int)
    farm = defaultdict(float)
    for r in results:
        a_p = 0 if r['a_seat'] == 'P1' else 1
        for row in r['tel']:
            if not (5 <= row['round'] <= 10):
                continue
            bot = 'A' if row['player'] == a_p else 'B'
            inc[bot] += row['harvest_supply'] + row['harvest_crop']
            farm[bot] += (row['farmstead_supply_bonus']
                          + row['farmstead_crop_bonus'])
            cnt[bot] += 1
    return {b: (inc[b] / cnt[b], farm[b] / cnt[b]) for b in inc}


def main():
    for label, ov in (('FARMSTEAD_BONUS=2 (default)', None),
                      ('FARMSTEAD_BONUS=0 (control)', {'FARMSTEAD_BONUS': 0})):
        res = run_battery(CLUSTER, SCATTER, 300, seed0=1, overrides=ov)
        w, n, wr = winrate(res)
        ib = income_by_bot(res)
        print('%s: CLUSTER(A) vs SCATTER(B)  n=%d  cluster wins %d (%.1f%%)'
              % (label, n, w, 100 * wr))
        print('   mean r5-10 income/round: CLUSTER %.2f (farmstead %.2f)  '
              'SCATTER %.2f (farmstead %.2f)'
              % (ib['A'][0], ib['A'][1], ib['B'][0], ib['B'][1]))


if __name__ == '__main__':
    main()
