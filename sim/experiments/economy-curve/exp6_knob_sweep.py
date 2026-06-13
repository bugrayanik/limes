"""EXP6: knob sweeps on the degeneracies EXP1 exposed.

HONEST mirror, n=200 per cell (seeds 1..200), flat terrain.
 (a) FIELD_YIELD 1 / 2(base) / 3
 (b) land exhaustion: off (start r99) / gentle (accel 1) / base
 (c) supply-glut probe: FIELD_YIELD=1 + exhaustion gentle combo

Reports: win types, median round, army plateau (mean on-board r9-12),
supply bank at r12 and r16, exhausted share r14, ladder share.
"""

from collections import defaultdict

from econlib import run_battery, median


def cell(label, overrides, n=200):
    res = run_battery('HONEST', 'HONEST', n, seed0=1, overrides=overrides)
    wt = defaultdict(int)
    for r in res:
        wt[r['win_type']] += 1
    rounds = [r['rounds'] for r in res]
    army = []
    sup12 = []
    sup16 = []
    exh14 = []
    for r in res:
        for row in r['tel']:
            if 9 <= row['round'] <= 12:
                army.append(row['army_onboard'])
            if row['round'] == 12:
                sup12.append(row['supply_post'])
            if row['round'] == 16:
                sup16.append(row['supply_post'])
            if row['round'] == 14 and row['army_onboard']:
                exh14.append(row['exhausted'] / row['army_onboard'])
    print('%-34s n=%d  wt=%s  med_rounds=%s  army(r9-12)=%.1f  '
          'supply@r12=%.0f  supply@r16=%s  exh%%@r14=%s'
          % (label, n, dict(wt), median(rounds),
             sum(army) / len(army) if army else -1,
             sum(sup12) / len(sup12) if sup12 else -1,
             '%.0f' % (sum(sup16) / len(sup16)) if sup16 else 'n/a',
             '%.2f' % (sum(exh14) / len(exh14)) if exh14 else 'n/a'))


def main():
    cell('BASE', None)
    cell('FIELD_YIELD=1', {'FIELD_YIELD': 1})
    cell('FIELD_YIELD=3', {'FIELD_YIELD': 3})
    cell('EXHAUSTION off (start r99)', {'EXHAUSTION_START_ROUND': 99,
                                        'EXHAUSTION_ACCEL_ROUND': 99})
    cell('EXHAUSTION gentle (accel=1)', {'EXHAUSTION_ACCEL': 1})
    cell('YIELD=1 + gentle exhaustion', {'FIELD_YIELD': 1,
                                         'EXHAUSTION_ACCEL': 1})


if __name__ == '__main__':
    main()
