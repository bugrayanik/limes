"""EXP4: Last Stand boon balance.

Last Stand fires when a player loses their first Wagon -- never happens in
HONEST mirrors, so exercise it with AGGRO as the wagon-killer. Three HONEST
variants, each FORCED to pick boon 1 (RALLY) / 2 (VETERANCY) / 3 (ENTRENCH),
each vs AGGRO on the same 300 seeds. Similar winrates => no dominant boon.
Also counts how often Last Stand actually fires.
"""

from econlib import run_battery, winrate

BOON_NAMES = {1: 'RALLY', 2: 'VETERANCY', 3: 'ENTRENCH'}


def main():
    for boon in (1, 2, 3):
        spec = {'base': 'HONEST', 'force_boon': boon,
                'label': 'HONEST-B%d' % boon}
        res = run_battery(spec, 'AGGRO', 300, seed0=1)
        w, n, wr = winrate(res)
        fired = sum(1 for r in res if r['events']['boons'])
        a_fired = 0
        for r in res:
            a_p = 0 if r['a_seat'] == 'P1' else 1
            a_fired += sum(1 for e in r['events']['boons']
                           if e['player'] == a_p)
        print('HONEST-forced-%s vs AGGRO  n=%d  honest wins %d (%.1f%%)  '
              'last-stands fired (any) %d, by honest %d'
              % (BOON_NAMES[boon], n, w, 100 * wr, fired, a_fired))


if __name__ == '__main__':
    main()
