"""EXP3: Is RAID vs ANNEX a real choice -- and does it ever even fire?

(1) Trample frequency across matchups (HONEST mirror showed ZERO tramples:
    all HONEST fields sit on heartland rows that stakes can never cross).
(2) EV test: AGGRO-RAID vs TURTLE and AGGRO-ANNEX vs TURTLE on identical
    seeds; also vs MIDFARM (an HONEST that over-builds into contested rows,
    fields_target=16) to create tramplable fields.
"""

from collections import defaultdict

from econlib import run_battery, winrate

AGGRO_RAID = {'base': 'AGGRO', 'label': 'AGGRO-RAID'}
AGGRO_ANNEX = {'base': 'AGGRO', 'cfg_updates': {'trample': 'annex'},
               'label': 'AGGRO-ANNEX'}
MIDFARM = {'base': 'HONEST', 'cfg_updates': {'fields_target': 16},
           'label': 'MIDFARM'}


def trample_stats(results):
    tr = defaultdict(int)
    games_with = 0
    for r in results:
        if r['events']['trample']:
            games_with += 1
        for e in r['events']['trample']:
            tr[(e['choice'], e['ftype'])] += 1
    return dict(tr), games_with


def battery(name, a, b, n=300, seed0=1):
    res = run_battery(a, b, n, seed0=seed0)
    w, nn, wr = winrate(res)
    tr, gw = trample_stats(res)
    print('%s  n=%d  A-wins %d (%.1f%%)  tramples %s  games-with-trample %d'
          % (name, nn, w, 100 * wr, tr, gw))
    return res


def main():
    battery('AGGRO-RAID  vs TURTLE ', AGGRO_RAID, 'TURTLE')
    battery('AGGRO-ANNEX vs TURTLE ', AGGRO_ANNEX, 'TURTLE')
    battery('AGGRO-RAID  vs MIDFARM', AGGRO_RAID, MIDFARM)
    battery('AGGRO-ANNEX vs MIDFARM', AGGRO_ANNEX, MIDFARM)
    battery('MIDFARM vs HONEST     ', MIDFARM, 'HONEST')


if __name__ == '__main__':
    main()
