"""LIMES v3 baseline simulator -- CLI match runner.

Usage:
    python3 run.py BOT_A BOT_B [-n N] [--constants FILE.json] [--terrain-seed S]
                   [--seed0 K] [--per-match]

Bots: HONEST, AGGRO, TURTLE, PROBER, SANDBAGGER, RUNNER (see bots.py).

Runs N matches (default 100). Seats alternate every match (even match index:
BOT_A sits Player 1, odd: BOT_B sits Player 1) so the Player-2 initial-komi
asymmetry (C-005) averages out. Match i uses match seed seed0+i; if
--terrain-seed is given, match i uses terrain seed S+i (module M-04),
otherwise every tile is flat Open (baseline).

--constants FILE.json merges overrides into the CONSTANTS dict for every
match (keys as in engine.CONSTANTS / spec Appendix B).

Output: a single JSON object on stdout with per-matchup aggregate stats
(winner split, win types, round counts, round-1-clash-winner conversion,
lead changes after round 7, ladder rate) and, with --per-match, the
individual match records.
"""

import argparse
import json
import sys
import time

import engine
import bots


def aggregate(results, name_a, name_b):
    n = len(results)
    wins_a = sum(1 for r in results if r['bot_winner'] == 'A')
    win_types = {}
    for r in results:
        win_types[r['win_type']] = win_types.get(r['win_type'], 0) + 1
    rounds = sorted(r['rounds'] for r in results)
    med = rounds[n // 2] if n % 2 else (rounds[n // 2 - 1] + rounds[n // 2]) / 2
    wr_rounds = sorted(r['rounds'] for r in results
                       if r['win_type'] in ('wagons', 'rout'))
    if wr_rounds:
        m = len(wr_rounds)
        wr_med = wr_rounds[m // 2] if m % 2 else \
            (wr_rounds[m // 2 - 1] + wr_rounds[m // 2]) / 2
    else:
        wr_med = None
    r1_decided = [r for r in results if r['r1_winner'] is not None]
    r1_conv = sum(1 for r in r1_decided if r['r1_winner'] == r['winner'])
    lead_after = sum(1 for r in results if r['lead_changes_after_r7'] > 0)
    return {
        'n': n,
        'wins': {name_a + ' (A)': wins_a, name_b + ' (B)': n - wins_a},
        'winrate_A': round(wins_a / n, 4) if n else None,
        'win_types': win_types,
        'rounds': {'median': med, 'min': rounds[0], 'max': rounds[-1],
                   'mean': round(sum(rounds) / n, 2)},
        'contract_A_r1_clash': {
            'decided_r1': len(r1_decided),
            'r1_winner_took_match': r1_conv,
            'conversion_rate': round(r1_conv / len(r1_decided), 4)
            if r1_decided else None,
        },
        'contract_B_lead_changes': {
            'games_with_change_after_r7': lead_after,
            'rate': round(lead_after / n, 4) if n else None,
            'mean_total_changes': round(
                sum(r['lead_changes'] for r in results) / n, 2) if n else None,
        },
        'contract_D_endings': {
            'median_round_wagons_or_rout': wr_med,
            'wagons_or_rout_share': round(
                (win_types.get('wagons', 0) + win_types.get('rout', 0)) / n, 4)
            if n else None,
            'golden_goal_share': round(win_types.get('golden-goal', 0) / n, 4)
            if n else None,
            'ladder_share': round(win_types.get('ladder', 0) / n, 4)
            if n else None,
        },
    }


def main(argv=None):
    ap = argparse.ArgumentParser(description='LIMES v3 baseline sim runner')
    ap.add_argument('bot_a', help='|'.join(bots.POLICY_NAMES))
    ap.add_argument('bot_b')
    ap.add_argument('-n', '--matches', type=int, default=100)
    ap.add_argument('--constants', help='JSON file of CONSTANTS overrides')
    ap.add_argument('--terrain-seed', type=int, default=None,
                    help='enable terrain module; match i uses S+i')
    ap.add_argument('--seed0', type=int, default=1, help='first match seed')
    ap.add_argument('--per-match', action='store_true',
                    help='include individual match records')
    args = ap.parse_args(argv)

    overrides = None
    if args.constants:
        with open(args.constants) as f:
            overrides = json.load(f)

    name_a, name_b = args.bot_a.upper(), args.bot_b.upper()
    t0 = time.time()
    results = []
    for i in range(args.matches):
        seed = args.seed0 + i
        a_is_p1 = (i % 2 == 0)
        bot_p1 = bots.make_bot(name_a if a_is_p1 else name_b)
        bot_p2 = bots.make_bot(name_b if a_is_p1 else name_a)
        tseed = args.terrain_seed + i if args.terrain_seed is not None else None
        r = engine.play_match([bot_p1, bot_p2], seed,
                              overrides=overrides, terrain_seed=tseed)
        r['a_seat'] = 'P1' if a_is_p1 else 'P2'
        r['bot_winner'] = 'A' if (r['winner'] == 0) == a_is_p1 else 'B'
        results.append(r)
    elapsed = time.time() - t0

    out = {
        'config': {
            'bot_a': name_a, 'bot_b': name_b, 'n': args.matches,
            'seed0': args.seed0,
            'terrain': 'seeded(%d+i)' % args.terrain_seed
            if args.terrain_seed is not None else 'flat',
            'constants_overrides': overrides or {},
        },
        'aggregate': aggregate(results, name_a, name_b),
        'elapsed_sec': round(elapsed, 2),
    }
    if args.per_match:
        out['matches'] = results
    json.dump(out, sys.stdout, indent=1)
    print()


if __name__ == '__main__':
    main()
