"""Final consolidation battery: all five contract metrics under one config.

Usage:
  python3 battery.py --config '{"K":V,...}' [-n 120] [--seed0 30001]
                     [--tseed0 40001] [--ne 200] [--out FILE.json]
                     [--honest-patch '{"k":v}']

Runs:
  * full HONEST/AGGRO/TURTLE/PROBER matrix (10 pairings) x {flat, terrain}
    -> metrics A (pooled r1-clash conversion), B (pooled post-r7 lead-change
       rate), D (pooled median end round, wagons/rout share, ladder share)
  * contract C named battery: TURTLE:TURTLE, TURTLE:PROBER, AGGRO:TURTLE,
    SANDBAGGER:HONEST on the seeded terrain set (and flat, reported)
  * contract E: SANDBAGGER vs HONEST and SANDBAGGER vs TWIN (identical
    SANDBAGGER cfg with sandbag_until=0), winrates (EV-negative => <= 0.50)

Seats alternate every match; terrain seeds tseed0+i vary per match.
"""

import argparse
import itertools
import json
import multiprocessing as mp
import os
import sys
import time

SIM = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, SIM)

import engine   # noqa: E402
import bots     # noqa: E402

POLICIES = ('HONEST', 'AGGRO', 'TURTLE', 'PROBER')
C_PAIRS = (('TURTLE', 'TURTLE'), ('TURTLE', 'PROBER'),
           ('AGGRO', 'TURTLE'), ('SANDBAGGER', 'HONEST'))

_G = {}


def _init(overrides, honest_patch):
    _G['overrides'] = overrides
    _G['honest_patch'] = honest_patch


def _mk(spec):
    if isinstance(spec, tuple):
        name, patch = spec
        b = bots.make_bot(name)
        b.cfg.update(patch)
        return b
    b = bots.make_bot(spec)
    if spec == 'HONEST' and _G.get('honest_patch'):
        b.cfg.update(_G['honest_patch'])
    return b


def _one(job):
    spec_a, spec_b, seed, tseed, a_is_p1 = job
    bot_p1 = _mk(spec_a if a_is_p1 else spec_b)
    bot_p2 = _mk(spec_b if a_is_p1 else spec_a)
    r = engine.play_match([bot_p1, bot_p2], seed,
                          overrides=_G['overrides'], terrain_seed=tseed)
    r['bot_winner'] = 'A' if (r['winner'] == 0) == a_is_p1 else 'B'
    return {k: r.get(k) for k in
            ('bot_winner', 'winner', 'win_type', 'rounds', 'r1_winner',
             'r1_rows_winner', 'lead_changes', 'lead_changes_after_r7')}


def agg(results):
    n = len(results)
    wins_a = sum(1 for r in results if r['bot_winner'] == 'A')
    wt = {}
    for r in results:
        wt[r['win_type']] = wt.get(r['win_type'], 0) + 1
    rounds = sorted(r['rounds'] for r in results)
    med = rounds[n // 2] if n % 2 else (rounds[n // 2 - 1] + rounds[n // 2]) / 2
    wr = sorted(r['rounds'] for r in results
                if r['win_type'] in ('wagons', 'rout'))
    wr_med = (wr[len(wr) // 2] if len(wr) % 2 else
              (wr[len(wr) // 2 - 1] + wr[len(wr) // 2]) / 2) if wr else None
    r1d = [r for r in results if r['r1_winner'] is not None]
    r1c = sum(1 for r in r1d if r['r1_winner'] == r['winner'])
    lead = sum(1 for r in results if r['lead_changes_after_r7'] > 0)
    return {
        'n': n, 'winrate_A': round(wins_a / n, 4),
        'win_types': wt,
        'rounds_median': med, 'rounds_mean': round(sum(rounds) / n, 2),
        'median_round_wagons_or_rout': wr_med,
        'wagons_or_rout_share': round(
            (wt.get('wagons', 0) + wt.get('rout', 0)) / n, 4),
        'golden_goal_share': round(wt.get('golden-goal', 0) / n, 4),
        'ladder_share': round(wt.get('ladder', 0) / n, 4),
        'r1_decided': len(r1d),
        'r1_conversion': round(r1c / len(r1d), 4) if r1d else None,
        'r1_rows_decided': len([r for r in results
                                if r.get('r1_rows_winner') is not None]),
        'r1_rows_conversion': (lambda rd: round(
            sum(1 for r in rd if r['r1_rows_winner'] == r['winner']) / len(rd),
            4) if rd else None)(
            [r for r in results if r.get('r1_rows_winner') is not None]),
        'lead_change_after_r7_rate': round(lead / n, 4),
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--config', default='{}')
    ap.add_argument('-n', type=int, default=120, help='matches per matrix cell')
    ap.add_argument('--ne', type=int, default=200, help='matches per E battery')
    ap.add_argument('--seed0', type=int, default=30001)
    ap.add_argument('--tseed0', type=int, default=40001)
    ap.add_argument('--honest-patch', default=None)
    ap.add_argument('--out', default=None)
    args = ap.parse_args()

    overrides = json.loads(args.config) if not os.path.exists(args.config) \
        else json.load(open(args.config))
    hp = json.loads(args.honest_patch) if args.honest_patch else None

    t0 = time.time()
    pool = mp.Pool(initializer=_init, initargs=(overrides, hp))
    out = {'config': {'overrides': overrides, 'honest_patch': hp,
                      'n_matrix': args.n, 'n_e': args.ne,
                      'seed0': args.seed0, 'tseed0': args.tseed0},
           'matrix': {}, 'contract_C': {}, 'contract_E': {}}

    pairs = list(itertools.combinations_with_replacement(POLICIES, 2))
    pooled = {'flat': [], 'terrain': []}
    for tkey, tbase in (('flat', None), ('terrain', args.tseed0)):
        for (a, b) in pairs:
            jobs = [(a, b, args.seed0 + i,
                     None if tbase is None else tbase + i, i % 2 == 0)
                    for i in range(args.n)]
            res = pool.map(_one, jobs, chunksize=25)
            pooled[tkey].extend(res)
            out['matrix']['%s|%s_vs_%s' % (tkey, a, b)] = agg(res)
    out['matrix_pooled_flat'] = agg(pooled['flat'])
    out['matrix_pooled_terrain'] = agg(pooled['terrain'])
    out['matrix_pooled_all'] = agg(pooled['flat'] + pooled['terrain'])

    # contract C named battery (terrain primary, flat informational)
    for tkey, tbase in (('terrain', args.tseed0 + 50000), ('flat', None)):
        for (a, b) in C_PAIRS:
            jobs = [(a, b, args.seed0 + 50000 + i,
                     None if tbase is None else tbase + i, i % 2 == 0)
                    for i in range(args.n)]
            res = pool.map(_one, jobs, chunksize=25)
            out['contract_C']['%s|%s_vs_%s' % (tkey, a, b)] = agg(res)

    # contract E: sandbagger vs honest + twin knockout (flat, spec baseline)
    twin = ('SANDBAGGER', {'sandbag_until': 0})
    for label, sa, sb in (('SANDBAGGER_vs_HONEST', 'SANDBAGGER', 'HONEST'),
                          ('SANDBAGGER_vs_TWIN', 'SANDBAGGER', twin),
                          ('TWIN_vs_HONEST', twin, 'HONEST')):
        jobs = [(sa, sb, args.seed0 + 90000 + i, None, i % 2 == 0)
                for i in range(args.ne)]
        res = pool.map(_one, jobs, chunksize=25)
        out['contract_E'][label] = agg(res)

    pool.close()
    pool.join()
    out['elapsed_sec'] = round(time.time() - t0, 1)

    # contract summary
    A = out['matrix_pooled_all']['r1_conversion']
    B = out['matrix_pooled_all']['lead_change_after_r7_rate']
    Cvals = {k: v['winrate_A'] for k, v in out['contract_C'].items()
             if k.startswith('terrain')}
    D_med = out['matrix_pooled_all']['rounds_median']
    D_lad = out['matrix_pooled_all']['ladder_share']
    D_wr = out['matrix_pooled_all']['wagons_or_rout_share']
    E1 = out['contract_E']['SANDBAGGER_vs_HONEST']['winrate_A']
    E2 = out['contract_E']['SANDBAGGER_vs_TWIN']['winrate_A']
    out['summary'] = {
        'A_r1_conversion(0.55-0.65)': A,
        'A_rows_basis': out['matrix_pooled_all']['r1_rows_conversion'],
        'A_rows_decided': out['matrix_pooled_all']['r1_rows_decided'],
        'A_flat': out['matrix_pooled_flat']['r1_conversion'],
        'A_terrain': out['matrix_pooled_terrain']['r1_conversion'],
        'B_lead_change_rate(0.25-0.35)': B,
        'C_terrain_winrates(0.45-0.55)': Cvals,
        'D_median_round(11-14)': D_med,
        'D_wagons_rout_median': out['matrix_pooled_all']['median_round_wagons_or_rout'],
        'D_wagons_rout_share': D_wr,
        'D_ladder_share(<0.02)': D_lad,
        'D_golden_goal_share': out['matrix_pooled_all']['golden_goal_share'],
        'E_sandbag_vs_honest(<0.50)': E1,
        'E_sandbag_vs_twin(<=0.50)': E2,
    }
    s = json.dumps(out, indent=1)
    if args.out:
        with open(args.out, 'w') as f:
            f.write(s + '\n')
        print(json.dumps(out['summary'], indent=1))
        print('wrote %s (%.1fs)' % (args.out, out['elapsed_sec']))
    else:
        print(s)


if __name__ == '__main__':
    main()
