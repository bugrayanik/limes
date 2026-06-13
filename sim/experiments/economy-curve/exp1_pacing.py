"""EXP1: HONEST vs HONEST economy pacing curves.

300 flat matches (seeds 1..300) + 300 terrain matches (seeds 1..300,
terrain seeds 1000..1299). Prints per-round means and headline checks:
army plateau, crop-binding round, exhaustion rates, strain payments,
trample mix, win-type split.
"""

import json
from collections import defaultdict

from econlib import run_battery, median


def per_round(results):
    agg = defaultdict(lambda: defaultdict(float))
    cnt = defaultdict(int)
    for r in results:
        for row in r['tel']:
            k = row['round']
            cnt[k] += 1
            for f in ('harvest_supply', 'harvest_crop', 'upkeep_paid',
                      'strain_exposed', 'strain_paid', 'exhausted',
                      'army_onboard', 'reserve', 'fields_supply',
                      'fields_crop', 'fields_annexed_held', 'farmsteads',
                      'farmstead_supply_bonus', 'farmstead_crop_bonus',
                      'supply_post', 'crop_post', 'tribute_post', 'rushed'):
                agg[k][f] += row[f]
            agg[k]['recruit_n'] += sum(row['recruits'].values())
            agg[k]['any_exhausted'] += 1 if row['exhausted'] > 0 else 0
    return agg, cnt


def summarize(results, label):
    n = len(results)
    wt = defaultdict(int)
    for r in results:
        wt[r['win_type']] += 1
    rounds = [r['rounds'] for r in results]
    print('\n=== %s  (n=%d) ===' % (label, n))
    print('win types:', dict(wt), ' median rounds:', median(rounds),
          ' min/max:', min(rounds), max(rounds))

    agg, cnt = per_round(results)
    hdr = ('rd  n(pl)  army  resv  recr  exh  exh%any  strainX  strain$  '
           'upkeep  h.sup  h.crop  f.sup  f.crop  annx  farms  fbon  '
           'supply  crop  trib')
    print(hdr)
    for k in sorted(agg):
        a, c = agg[k], cnt[k]
        print('%2d  %5d  %4.1f  %4.1f  %4.2f  %4.2f  %6.2f  %7.2f  %7.2f  '
              '%6.2f  %5.2f  %6.2f  %5.2f  %6.2f  %4.2f  %5.2f  %4.2f  '
              '%6.1f  %4.1f  %4.1f' % (
                  k, c, a['army_onboard'] / c, a['reserve'] / c,
                  a['recruit_n'] / c, a['exhausted'] / c,
                  a['any_exhausted'] / c,
                  a['strain_exposed'] / c, a['strain_paid'] / c,
                  a['upkeep_paid'] / c, a['harvest_supply'] / c,
                  a['harvest_crop'] / c, a['fields_supply'] / c,
                  a['fields_crop'] / c, a['fields_annexed_held'] / c,
                  a['farmsteads'] / c,
                  (a['farmstead_supply_bonus'] + a['farmstead_crop_bonus']) / c,
                  a['supply_post'] / c, a['crop_post'] / c,
                  a['tribute_post'] / c))

    # crop-binding: first round where harvest_crop alone < upkeep_paid would
    # have left bank negative without crop fields -> approximate via first
    # round (per player-match) where upkeep_paid > harvest_crop and
    # crop_post < upkeep_paid (bank no longer covers a missed harvest)
    bind = []
    first_exh = []
    for r in results:
        per_pl = defaultdict(list)
        for row in r['tel']:
            per_pl[row['player']].append(row)
        for p, rows in per_pl.items():
            b = next((row['round'] for row in rows
                      if row['upkeep_paid'] > 0
                      and row['crop_post'] < row['upkeep_paid']), None)
            if b is not None:
                bind.append(b)
            e = next((row['round'] for row in rows if row['exhausted'] > 0),
                     None)
            if e is not None:
                first_exh.append(e)
    print('crop-binding round (bank < next upkeep): median %s  (%d/%d '
          'player-games ever bind)' % (median(bind), len(bind), 2 * n))
    print('first exhausted-unit round: median %s  (%d/%d player-games ever '
          'exhaust)' % (median(first_exh), len(first_exh), 2 * n))

    # trample mix
    tr = defaultdict(int)
    for r in results:
        for e in r['events']['trample']:
            tr[(e['choice'], e['ftype'])] += 1
    print('trample picks:', dict(tr))
    boons = defaultdict(int)
    for r in results:
        for e in r['events']['boons']:
            boons[e['boon']] += 1
    print('last-stand boons fired:', dict(boons))

    # muster comp mix
    mono = 0
    distinct = []
    arch_tot = defaultdict(int)
    for r in results:
        for p in (0, 1):
            d = r['arch_counts'][p]
            tot = sum(d.values())
            for a2, v in d.items():
                arch_tot[a2] += v
            if tot:
                distinct.append(len(d))
                if max(d.values()) / tot >= 0.7:
                    mono += 1
    print('archetype totals (both players, all matches):', dict(arch_tot))
    print('mono-comp player-games (one arch >=70%%): %d/%d   mean distinct '
          'arch/player: %.2f' % (mono, 2 * n, sum(distinct) / len(distinct)))
    return agg, cnt


def main():
    flat = run_battery('HONEST', 'HONEST', 300, seed0=1)
    summarize(flat, 'HONEST vs HONEST, flat terrain, seeds 1-300')
    terr = run_battery('HONEST', 'HONEST', 300, seed0=1, terrain_seed0=1000)
    summarize(terr, 'HONEST vs HONEST, terrain seeds 1000-1299')

    slim = {'flat_wintypes': {}, 'terr_wintypes': {}}
    for r in flat:
        slim['flat_wintypes'][r['win_type']] = \
            slim['flat_wintypes'].get(r['win_type'], 0) + 1
    for r in terr:
        slim['terr_wintypes'][r['win_type']] = \
            slim['terr_wintypes'].get(r['win_type'], 0) + 1
    with open('exp1_wintypes.json', 'w') as f:
        json.dump(slim, f, indent=1)


if __name__ == '__main__':
    main()
