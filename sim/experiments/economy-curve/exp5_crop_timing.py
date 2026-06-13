"""EXP5: Does crop matter from ~round 3 (v3 target) instead of r9 (v2)?

NOCROP (HONEST that builds only supply fields, otherwise identical) vs
HONEST, 300 seeds. If crop bites early, NOCROP starts flipping Exhausted
within the first few rounds and loses badly.
"""

from collections import defaultdict

from econlib import run_battery, winrate, median

NOCROP = {'base': 'HONEST', 'no_crop_fields': True, 'label': 'NOCROP'}


def main():
    res = run_battery(NOCROP, 'HONEST', 300, seed0=1)
    w, n, wr = winrate(res)
    first_exh = []
    exh_byround = defaultdict(float)
    cnt = defaultdict(int)
    army = defaultdict(float)
    for r in res:
        a_p = 0 if r['a_seat'] == 'P1' else 1
        rows = [row for row in r['tel'] if row['player'] == a_p]
        e = next((row['round'] for row in rows if row['exhausted'] > 0), None)
        if e is not None:
            first_exh.append(e)
        for row in rows:
            if row['round'] <= 12:
                exh_byround[row['round']] += row['exhausted']
                army[row['round']] += row['army_onboard']
                cnt[row['round']] += 1
    print('NOCROP vs HONEST  n=%d  NOCROP wins %d (%.1f%%)' % (n, w, 100 * wr))
    print('NOCROP first-exhaustion round: median %s  (fires in %d/%d games)'
          % (median(first_exh), len(first_exh), n))
    print('NOCROP mean exhausted units (and army) by round:')
    for k in sorted(exh_byround):
        print('  r%-2d  exhausted %.2f / army %.2f'
              % (k, exh_byround[k] / cnt[k], army[k] / cnt[k]))


if __name__ == '__main__':
    main()
