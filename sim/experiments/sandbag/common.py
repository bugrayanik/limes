"""Shared instrumented battery runner for the sandbag (contract E) experiment.

Wraps engine.play_match-equivalent driving with extra per-match telemetry:
rows conceded per player, tribute accrued from rows, interventions fired
(surge/shieldbearer), tribute spent as supply, final banks.

Bot specs are either a policy name ('SANDBAGGER', ...) or a (name, cfg_patch)
tuple; cfg_patch is merged into the Policy's cfg after construction (used for
the TWIN control: SANDBAGGER with sandbag_until=0 -- identical code path,
identical tiebreak stream, zero deliberate concession).
"""

import sys

sys.path.insert(0, '/home/bugra/Desktop/limes/sim')

import engine  # noqa: E402
import bots    # noqa: E402


def make_bot(spec):
    if isinstance(spec, tuple):
        name, patch = spec
        b = bots.make_bot(name)
        b.cfg.update(patch)
        return b
    return bots.make_bot(spec)


def spec_label(spec):
    if isinstance(spec, tuple):
        return spec[0] + '*' + ','.join('%s=%s' % kv for kv in spec[1].items())
    return spec


def play_instrumented(spec_p1, spec_p2, seed, overrides=None):
    bot_p1, bot_p2 = make_bot(spec_p1), make_bot(spec_p2)
    g = engine.Game([bot_p1, bot_p2], seed, overrides, None)
    counts = [{'surge': 0, 'shield': 0, 'trib_spent_supply': 0}
              for _ in range(2)]
    for p, b in enumerate((bot_p1, bot_p2)):
        b.reset(seed, p)
        orig_iv = b.intervention

        def wrap_iv(orig, me_counts):
            def f(g_, me, wno):
                r = orig(g_, me, wno)
                if r is not None:
                    me_counts['surge' if r[0] == 'SURGE' else 'shield'] += 1
                return r
            return f
        b.intervention = wrap_iv(orig_iv, counts[p])

        orig_rf = b.reinforce

        def wrap_rf(orig, me_counts):
            def f(g_, me):
                out = orig(g_, me)
                me_counts['trib_spent_supply'] += min(
                    int(out.get('tribute_spend', 0)),
                    g_.res[me]['tribute'])
                return out
            return f
        b.reinforce = wrap_rf(orig_rf, counts[p])

    g.setup()
    rows_lost = [0, 0]
    winner = wtype = None
    try:
        while True:
            g.play_round()
            for p in (0, 1):
                rows_lost[p] += g.rows_lost_round[p]
    except engine.GameOver as e:
        winner, wtype = e.winner, e.wtype
        for p in (0, 1):
            rows_lost[p] += g.rows_lost_round[p]

    return {
        'seed': seed,
        'winner': winner,
        'win_type': wtype,
        'rounds': g.round,
        'rows_lost': rows_lost,
        'interventions': counts,
        'final_tribute': [g.res[0]['tribute'], g.res[1]['tribute']],
        'final_wagons': [g.wagons_alive(0), g.wagons_alive(1)],
    }


def battery(spec_a, spec_b, n=1000, seed0=1, overrides=None):
    """Seat-alternating battery: even match index -> A sits P1."""
    res = []
    for i in range(n):
        a_is_p1 = (i % 2 == 0)
        s1, s2 = (spec_a, spec_b) if a_is_p1 else (spec_b, spec_a)
        r = play_instrumented(s1, s2, seed0 + i, overrides)
        ai, bi = (0, 1) if a_is_p1 else (1, 0)
        r['a_won'] = (r['winner'] == ai)
        r['a_idx'], r['b_idx'] = ai, bi
        res.append(r)
    return res


def summarize(res):
    n = len(res)
    wins_a = sum(1 for r in res if r['a_won'])
    wt = {}
    for r in res:
        wt[r['win_type']] = wt.get(r['win_type'], 0) + 1
    rounds = sorted(r['rounds'] for r in res)
    med = rounds[n // 2] if n % 2 else (rounds[n // 2 - 1] + rounds[n // 2]) / 2

    def mean(f):
        return round(sum(f(r) for r in res) / n, 2)
    return {
        'n': n,
        'wins_A': wins_a,
        'winrate_A': round(wins_a / n, 4),
        'win_types': wt,
        'rounds_median': med,
        'A_rows_conceded_mean': mean(lambda r: r['rows_lost'][r['a_idx']]),
        'B_rows_conceded_mean': mean(lambda r: r['rows_lost'][r['b_idx']]),
        'A_surge_mean': mean(lambda r: r['interventions'][r['a_idx']]['surge']),
        'A_shield_mean': mean(
            lambda r: r['interventions'][r['a_idx']]['shield']),
        'A_trib_as_supply_mean': mean(
            lambda r: r['interventions'][r['a_idx']]['trib_spent_supply']),
        'B_surge_mean': mean(lambda r: r['interventions'][r['b_idx']]['surge']),
        'B_shield_mean': mean(
            lambda r: r['interventions'][r['b_idx']]['shield']),
        'B_trib_as_supply_mean': mean(
            lambda r: r['interventions'][r['b_idx']]['trib_spent_supply']),
    }


# 95% CI half-width for a proportion
def ci95(p, n):
    return round(1.96 * (p * (1 - p) / n) ** 0.5, 4)
