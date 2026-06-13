"""Shared harness for the carry-cheese battery (experiments/cheese).

Adds instrumentation on top of engine.play_match:
  * rows taken per round per seat (the stake-carry rate)
  * per-frontier counterfactual: columns where a Stake step would have
    happened if the Lone Runner rule did not exist (lone-blocked carries)
  * stake oscillation: per-column direction reversals across rounds
  * tribute chips accrued (== opponent rows taken)

Also defines the two probe policies:
  * NoZocPolicy  -- identical to bots.Policy, but when the constants override
    ZOC_ENABLED=0 is active its pathing BFS ignores ZoC stops (so the bot
    actually exploits the removed rule instead of self-restricting).
  * ArcherSpamPolicy -- AGGRO chassis that unlocks and recruits ONLY Archers
    (depth-1 push), the archer-spam carry probe.
"""

import os
import sys

SIM_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
if SIM_DIR not in sys.path:
    sys.path.insert(0, SIM_DIR)

import engine
import bots
from engine import neighbors


# ---------------------------------------------------------------------------
# Counterfactual claims: column_claims with the Lone Runner rule deleted
# (carry-eligible := unbroken).  Mirrors engine.Game.column_claims (C-055).
# ---------------------------------------------------------------------------

def claims_nolone(g, c):
    k = g.stakes[c]
    p1_carry = p2_carry = False
    p1_near = p2_far = False
    for r in range(8):
        uid = g.board.get((c, r))
        if uid is None:
            continue
        u = g.units[uid]
        if not g.unbroken(u):
            continue
        if u.owner == 0:
            if r >= k:
                p1_carry = True
            else:
                p1_near = True
        else:
            if r < k:
                p2_carry = True
            else:
                p2_far = True
    return (p1_carry and not p2_far, p2_carry and not p1_near)


class XGame(engine.Game):
    """engine.Game + carry instrumentation."""

    def __init__(self, *a, **kw):
        super().__init__(*a, **kw)
        self.x_lone_blocked = [0, 0]   # would-be Stake steps killed ONLY by Lone Runner
        self.x_rows_by_round = []      # per round: (rows_taken_p0, rows_taken_p1)
        self.x_stake_trace = [list(self.stakes)]

    def frontier(self):
        C = self.C
        for c in range(8):
            k = self.stakes[c]
            a1, a2 = self.column_claims(c)
            n1, n2 = claims_nolone(self, c)
            ma = None if a1 == a2 else (0 if a1 else 1)
            mn = None if n1 == n2 else (0 if n1 else 1)
            if mn is not None and ma is None:
                newk = k + 1 if mn == 0 else k - 1
                if C['STAKE_MIN'] <= newk <= C['STAKE_MAX'] \
                        and self.palisades.get(c) != (1 - mn):
                    self.x_lone_blocked[mn] += 1
        super().frontier()


def play_match_instr(bot_p1, bot_p2, seed, overrides=None, terrain_seed=None):
    """Replicates engine.play_match but on XGame, returning extra metrics."""
    g = XGame([bot_p1, bot_p2], seed, overrides, terrain_seed)
    for p in (0, 1):
        g.bots[p].reset(seed, p)
    g.setup()
    winner = wtype = None
    try:
        while True:
            try:
                g.play_round()
            finally:
                g.x_rows_by_round.append(tuple(g.rows_taken_round))
                g.x_stake_trace.append(list(g.stakes))
    except engine.GameOver as e:
        winner, wtype = e.winner, e.wtype
    # oscillation: per-column count of stake-direction reversals
    reversals = 0
    for c in range(8):
        last_dir = 0
        for i in range(1, len(g.x_stake_trace)):
            d = g.x_stake_trace[i][c] - g.x_stake_trace[i - 1][c]
            if d == 0:
                continue
            if last_dir and d * last_dir < 0:
                reversals += 1
            last_dir = d
    rows_total = [sum(r[0] for r in g.x_rows_by_round),
                  sum(r[1] for r in g.x_rows_by_round)]
    # rounds in which player p advanced >=1 / ==2 / >=3 columns
    adv_hist = []
    for p in (0, 1):
        h = {1: 0, 2: 0, 3: 0}
        for r in g.x_rows_by_round:
            if r[p] >= 3:
                h[3] += 1
            elif r[p] > 0:
                h[r[p]] += 1
        adv_hist.append(h)
    return {
        'seed': seed,
        'winner': winner,
        'win_type': wtype,
        'rounds': g.round,
        'n_rounds_played': len(g.x_rows_by_round),
        'rows_taken': rows_total,
        'adv_hist': adv_hist,
        'lone_blocked': list(g.x_lone_blocked),
        'reversals': reversals,
        'final_wagons': [g.wagons_alive(0), g.wagons_alive(1)],
    }


# ---------------------------------------------------------------------------
# Probe policies
# ---------------------------------------------------------------------------

class NoZocPolicy(bots.Policy):
    """Standard policy, but exploits ZOC_ENABLED=0 in its pathing."""

    def bfs(self, g, u, max_steps):
        if g.C.get('ZOC_ENABLED', 1):
            return super().bfs(g, u, max_steps)
        if max_steps <= 0:
            return {u.pos: []}
        visited = {u.pos: []}
        frontier = [(u.pos, [])]
        for _ in range(max_steps):
            nxt = []
            for pos, path in frontier:
                for nb in neighbors(pos):
                    if nb in visited or g.occupied(nb):
                        continue
                    np = path + [nb]
                    visited[nb] = np
                    nxt.append((nb, np))
            frontier = nxt
        return visited


class ArcherSpamPolicy(bots.Policy):
    """AGGRO chassis, Archers only: the archer-spam carry probe."""

    def __init__(self, name='AGGRO'):
        super().__init__('AGGRO')
        self.name = 'ARCHSPAM'
        self.cfg.update(unlock_plan=['archer'], unlock_round=1,
                        recruit_priority=['archer'], depth=1,
                        wagon_hunt=False)


def make_bot(name):
    if name == 'ARCHSPAM':
        return ArcherSpamPolicy()
    if name.startswith('NZ-'):
        return NoZocPolicy(name[3:])
    return bots.make_bot(name)


# ---------------------------------------------------------------------------
# Battery runner + aggregation
# ---------------------------------------------------------------------------

def run_battery(name_a, name_b, n, seed0, overrides=None):
    results = []
    for i in range(n):
        seed = seed0 + i
        a_is_p1 = (i % 2 == 0)
        b1 = make_bot(name_a if a_is_p1 else name_b)
        b2 = make_bot(name_b if a_is_p1 else name_a)
        r = play_match_instr(b1, b2, seed, overrides=overrides)
        ia = 0 if a_is_p1 else 1
        r['a_seat_idx'] = ia
        r['bot_winner'] = 'A' if r['winner'] == ia else 'B'
        results.append(r)
    return aggregate(results, name_a, name_b, seed0, overrides)


def aggregate(results, name_a, name_b, seed0, overrides):
    n = len(results)
    total_rounds = sum(r['n_rounds_played'] for r in results)
    wins_a = sum(1 for r in results if r['bot_winner'] == 'A')
    win_types = {}
    for r in results:
        win_types[r['win_type']] = win_types.get(r['win_type'], 0) + 1
    rounds = sorted(r['rounds'] for r in results)
    med = rounds[n // 2] if n % 2 else (rounds[n // 2 - 1] + rounds[n // 2]) / 2

    def side_stats(side):
        rows = lone = 0
        ever = 0
        hist = {1: 0, 2: 0, 3: 0}
        for r in results:
            idx = r['a_seat_idx'] if side == 'A' else 1 - r['a_seat_idx']
            rows += r['rows_taken'][idx]
            lone += r['lone_blocked'][idx]
            if r['rows_taken'][idx] > 0:
                ever += 1
            for k in hist:
                hist[k] += r['adv_hist'][idx][k]
        adv_rounds = sum(hist.values())
        return {
            'rows_total': rows,
            'rows_per_round': round(rows / total_rounds, 4),
            'rows_per_match': round(rows / n, 2),
            'pct_matches_with_any_carry': round(ever / n, 4),
            'advancing_rounds': adv_rounds,
            'adv_round_share_of_rounds': round(adv_rounds / total_rounds, 4),
            'cols_per_advancing_round_hist': {'1': hist[1], '2': hist[2],
                                              '3+': hist[3]},
            'lone_blocked_total': lone,
            'lone_blocked_per_match': round(lone / n, 3),
        }

    return {
        'matchup': '%s vs %s' % (name_a, name_b),
        'n': n,
        'seed0': seed0,
        'overrides': overrides or {},
        'winrate_A': round(wins_a / n, 4),
        'wins': {name_a: wins_a, name_b: n - wins_a},
        'win_types': win_types,
        'rounds_median': med,
        'total_rounds_played': total_rounds,
        'A': side_stats('A'),
        'B': side_stats('B'),
        'oscillation': {
            'reversals_per_match_mean': round(
                sum(r['reversals'] for r in results) / n, 3),
            'reversals_max': max(r['reversals'] for r in results),
            'pct_matches_with_2plus_reversals': round(
                sum(1 for r in results if r['reversals'] >= 2) / n, 4),
        },
    }
