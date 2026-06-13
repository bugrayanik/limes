"""Combat-micro skirmish harness for LIMES v3 baseline engine.

Builds hand-placed boards (no Muster/Frontier), drives engine.run_pulse()
directly with deterministic per-archetype micro-policies, and scores the
skirmish.  All CORE combat rules (4 sub-phases, simultaneity, ZoC, brace,
charge, displacement, XP/promotion, rout) run exactly as in full matches.

Stakes sit at the default centerline (k=4): P1 owns rows 0-3, P2 rows 4-7,
so Support (+1 Guard, denied beyond own Stake line) behaves as in-game.

Micro-policy modes per archetype (all deterministic, no randomness):
  spear : 'brace' (advance, brace when enemy within 3, melee adjacent while
          braced), 'aggro' (never brace, melee), 'hold' (brace in place)
  sword : 'aggro', 'hold'
  cav   : 'charge' (charge whenever a legal >=2-step path ending adjacent
          exists, incl. out-and-back "orbit" from melee range),
          'noorbit' (charge only on non-revisiting paths), 'aggro' (melee),
          'hold'
  archer: 'kite' (shoot at range 2, step away from adjacent enemies),
          'static' (advance to range and shoot; melee if adjacent), 'hold'
  siege : 'kite', 'static', 'hold'
  hero  : 'aggro', 'hold'
"""

import sys
from collections import deque

sys.path.insert(0, '/home/bugra/Desktop/limes/sim')
import engine
from engine import manh, neighbors, in_bounds, ClashEnd, GameOver

DIRS = ((0, 1), (0, -1), (1, 0), (-1, 0))

MODES = {
    'spear': ('brace', 'aggro', 'hold'),
    'sword': ('aggro', 'hold'),
    'cav': ('charge', 'noorbit', 'aggro', 'hold'),
    'archer': ('kite', 'static', 'hold'),
    'siege': ('kite', 'static', 'hold'),
    'hero': ('aggro', 'hold'),
}
CANON = {'spear': 'brace', 'sword': 'aggro', 'cav': 'charge',
         'archer': 'kite', 'siege': 'kite', 'hero': 'aggro'}


class SBot:
    """Minimal bot: orders come from an attached policy function."""

    def __init__(self):
        self.policy = None

    def orders(self, g, me, pulse):
        return self.policy(g, me, pulse)

    def intervention(self, g, me, wno):
        return None

    def promo_t2(self, g, me, unit):
        return 'atk'

    def last_stand(self, g, me):
        return 2

    def entrench_cols(self, g, me):
        return []

    def rout_allocate(self, g, me, victim, dmg):
        return []


def new_game(placements0, placements1, overrides=None, terrain=None):
    """placements: list of (arch, (col,row)). terrain: optional dict with
    'ttype': {pos: 'hills'|'woods'|'road'}, 'rivers': set of frozenset edges."""
    b0, b1 = SBot(), SBot()
    g = engine.Game([b0, b1], seed=1, overrides=overrides)
    for p in (0, 1):
        back = g.back_row(p)
        for i, c in enumerate((0, 1, 2)):
            g.wagons[p].append({'col': c, 'row': back, 'hp': g.C['WAGON_HP']})
            g.wagon_at[(c, back)] = (p, i)
    for arch, pos in placements0:
        assert not g.occupied(pos), pos
        g.place(g.new_unit(0, arch), pos)
    for arch, pos in placements1:
        assert not g.occupied(pos), pos
        g.place(g.new_unit(1, arch), pos)
    if terrain:
        g.terrain_on = True
        g.ttype.update(terrain.get('ttype', {}))
        g.rivers.update(terrain.get('rivers', set()))
    return g, b0, b1


# ---------------------------------------------------------------------------
# policy primitives
# ---------------------------------------------------------------------------

def nearest(u, enemies):
    return min(enemies, key=lambda e: (manh(u.pos, e.pos), e.hp, e.pos))


def predicted_pos(g, t, vs_owner):
    """Where t will likely be at the Melee sub-phase: kiters (archer/siege)
    adjacent to a hunter retreat 1; everything else assumed stationary."""
    if t.arch in ('archer', 'siege'):
        hunters = g.on_board(vs_owner)
        if hunters and any(manh(t.pos, m.pos) == 1 for m in hunters):
            r = retreat_step(g, t, hunters)
            if r:
                return r
    return t.pos


def bfs_adj_path(g, u, goal_tile, avoid_zoc=False):
    """Shortest path through unoccupied tiles to any tile adjacent to
    goal_tile.  With avoid_zoc, intermediate tiles must not be adjacent to
    any enemy (so the engine's ZoC stop cannot truncate the path); the
    final tile may be.  Returns list of step tiles or None."""
    start = u.pos
    if manh(start, goal_tile) == 1:
        return []
    if avoid_zoc:
        epos = [e.pos for e in g.on_board(1 - u.owner)]

        def zoc(p):
            return any(manh(p, q) == 1 for q in epos)
    else:
        def zoc(p):
            return False
    prev = {start: None}
    dq = deque([start])
    while dq:
        cur = dq.popleft()
        for d in DIRS:
            nxt = (cur[0] + d[0], cur[1] + d[1])
            if nxt in prev or not in_bounds(nxt) or g.occupied(nxt):
                continue
            prev[nxt] = cur
            if manh(nxt, goal_tile) == 1:
                path = [nxt]
                while prev[path[-1]] != start:
                    path.append(prev[path[-1]])
                path.reverse()
                return path
            if not zoc(nxt):
                dq.append(nxt)
    return None


def greedy_step(g, u, t):
    """One unoccupied step reducing distance to t, or None."""
    best = None
    for d in DIRS:
        nxt = (u.pos[0] + d[0], u.pos[1] + d[1])
        if not in_bounds(nxt) or g.occupied(nxt):
            continue
        dd = manh(nxt, t.pos)
        if dd < manh(u.pos, t.pos) and (best is None or dd < best[0]
                                        or (dd == best[0] and nxt < best[1])):
            best = (dd, nxt)
    return best[1] if best else None


def melee_order(g, u, t):
    tp = predicted_pos(g, t, u.owner)
    path = bfs_adj_path(g, u, tp, avoid_zoc=True)
    if path is None:
        path = bfs_adj_path(g, u, tp, avoid_zoc=False)
    if path is None:
        step = greedy_step(g, u, t)
        return ('MELEE', t.uid, [step]) if step else ('HOLD',)
    return ('MELEE', t.uid, path[:u.mv])


def retreat_step(g, u, enemies):
    """Unoccupied step maximizing distance to nearest enemy; None if no gain."""
    cur = min(manh(u.pos, e.pos) for e in enemies)
    best = None
    for d in DIRS:
        nxt = (u.pos[0] + d[0], u.pos[1] + d[1])
        if not in_bounds(nxt) or g.occupied(nxt):
            continue
        dd = min(manh(nxt, e.pos) for e in enemies)
        if dd > cur and (best is None or dd > best[0]
                         or (dd == best[0] and nxt < best[1])):
            best = (dd, nxt)
    return best[1] if best else None


def find_charge(g, u, enemies, allow_orbit=True):
    """Search dir-sequences (len 2..Mv) for a legal charge: intermediate
    tiles unoccupied (start tile revisit allowed if orbit), never adjacent
    to an enemy before the final step, final tile adjacent to target.
    Returns (target, path) or None.  Prefers the lowest-HP reachable target.
    Charge adjacency is tested against each enemy's PREDICTED position
    (kiters retreat); ZoC stops are tested against current positions."""
    epos = [e.pos for e in enemies]
    ppos = {e.uid: predicted_pos(g, e, u.owner) for e in enemies}

    def adj_enemy(p):
        return any(manh(p, q) == 1 for q in epos)

    results = {}

    def note(cur, path):
        if len(path) >= 2:
            for e in enemies:
                if manh(cur, ppos[e.uid]) == 1:
                    key = e.uid
                    if key not in results or len(path) < len(results[key][1]):
                        results[key] = (e, list(path))

    def rec(cur, path):
        note(cur, path)
        if len(path) >= u.mv:
            return
        for d in DIRS:
            nxt = (cur[0] + d[0], cur[1] + d[1])
            if not in_bounds(nxt):
                continue
            if nxt in path:
                continue
            if nxt == u.pos and not allow_orbit:
                continue
            if nxt != u.pos and g.occupied(nxt):
                continue
            # a non-final landing adjacent to any enemy triggers ZoC stop;
            # allow it only as a final (charge-resolving) tile
            path.append(nxt)
            if not adj_enemy(nxt):
                rec(nxt, path)
            else:
                note(nxt, path)
            path.pop()

    rec(u.pos, [])
    if not results:
        return None
    e, path = min(results.values(), key=lambda r: (r[0].hp, r[0].pos))
    return e, path


def shoot_targets(g, u, enemies):
    return [e for e in enemies if u.rmin <= manh(u.pos, e.pos) <= u.rmax]


# ---------------------------------------------------------------------------
# per-unit order
# ---------------------------------------------------------------------------

def unit_order(g, me, u, mode):
    enemies = g.on_board(1 - me)
    if not enemies:
        return ('HOLD',)
    t = nearest(u, enemies)
    dmin = manh(u.pos, t.pos)
    adj = [e for e in enemies if manh(u.pos, e.pos) == 1]

    if u.arch == 'spear':
        if mode == 'aggro':
            return melee_order(g, u, t)
        # brace / hold.  Brace radius covers the cavalry charge threat
        # (Mv 3 ending adjacent = distance 4); 3 vs everything else.
        cav_near = any(e.arch == 'cav' and manh(u.pos, e.pos) <= 4
                       for e in enemies)
        if adj:
            # brace first (keeps Brace on later MELEE orders, C-041);
            # an unbraced spear melee-ing a supported target deals 0 anyway
            if not u.braced:
                return ('BRACE',)
            return ('MELEE', nearest(u, adj).uid, [])
        if cav_near or dmin <= 3:
            return ('BRACE',)
        if mode == 'hold':
            return ('HOLD',)
        return melee_order(g, u, t)

    if u.arch in ('sword', 'hero'):
        if mode == 'hold':
            return ('MELEE', nearest(u, adj).uid, []) if adj else ('HOLD',)
        return melee_order(g, u, t)

    if u.arch == 'cav':
        if mode == 'hold':
            return ('MELEE', nearest(u, adj).uid, []) if adj else ('HOLD',)
        if mode in ('charge', 'noorbit'):
            ch = find_charge(g, u, enemies, allow_orbit=(mode == 'charge'))
            if ch:
                e, path = ch
                # never charge a braced spear (it bounces); melee instead
                if not (e.arch == 'spear' and e.braced):
                    return ('CHARGE', e.uid, path)
            return melee_order(g, u, t)
        return melee_order(g, u, t)

    if u.arch in ('archer', 'siege'):
        st = shoot_targets(g, u, enemies)
        if st:
            tgt = min(st, key=lambda e: (e.hp, manh(u.pos, e.pos), e.pos))
            return ('SHOOT', ('U', tgt.uid))
        if mode == 'hold':
            if adj and u.arch == 'archer':
                return ('MELEE', nearest(u, adj).uid, [])
            return ('HOLD',)
        if adj:
            if mode == 'kite':
                step = retreat_step(g, u, enemies)
                if step:
                    return ('MOVE', [step])
                if u.arch == 'archer':
                    return ('MELEE', nearest(u, adj).uid, [])
                return ('HOLD',)
            if u.arch == 'archer':
                return ('MELEE', nearest(u, adj).uid, [])
            step = retreat_step(g, u, enemies)
            return ('MOVE', [step]) if step else ('HOLD',)
        # approach to max range
        want = u.rmax
        if dmin > want:
            step = greedy_step(g, u, t)
            return ('MOVE', [step]) if step else ('HOLD',)
        # dmin < rmin (e.g. siege at 1 handled by adj; archer at 1 handled)
        step = retreat_step(g, u, enemies)
        return ('MOVE', [step]) if step else ('HOLD',)

    return ('HOLD',)


def make_policy(mode_map):
    """mode_map: arch -> mode (missing arch -> canonical)."""
    def fn(g, me, pulse):
        out = {}
        for u in g.on_board(me):
            out[u.uid] = unit_order(g, me, u, mode_map.get(u.arch,
                                                           CANON[u.arch]))
        return out
    return fn


# ---------------------------------------------------------------------------
# runner
# ---------------------------------------------------------------------------

def run_skirmish(g, b0, b1, pol0, pol1, max_pulses=30):
    b0.policy, b1.policy = pol0, pol1
    start_hp = [sum(u.max_hp for u in g.on_board(p)) for p in (0, 1)]
    rout = False
    gameover = False
    pulses = 0
    for i in range(max_pulses):
        pulses = i + 1
        try:
            g.run_pulse(1 if i % 2 == 0 else 2)
        except ClashEnd:
            rout = True
            break
        except GameOver:
            gameover = True
            break
        if not g.on_board(0) or not g.on_board(1):
            break
    a, b = g.on_board(0), g.on_board(1)
    hp0, hp1 = sum(u.hp for u in a), sum(u.hp for u in b)
    if a and not b:
        winner = 0
    elif b and not a:
        winner = 1
    else:
        winner = None  # mutual kill or no decision at cap
    margin = hp0 / start_hp[0] - hp1 / start_hp[1]
    return {'winner': winner, 'n0': len(a), 'n1': len(b),
            'hp0': hp0, 'hp1': hp1, 'margin': round(margin, 4),
            'pulses': pulses, 'rout': rout, 'gameover': gameover,
            'decided': winner is not None or (not a and not b)}


def line(n, row, c0=2):
    return [(c0 + i, row) for i in range(n)]


def duel_one(arch0, arch1, mode0, mode1, dist, offset, mirror,
             overrides=None, terrain=None, max_pulses=30):
    """1v1 at vertical distance `dist` around the centerline, lateral offset
    on side1.  mirror=True flips the board vertically (seat swap)."""
    r0 = 4 - (dist + 1) // 2
    r1 = r0 + dist
    p0 = [(arch0, (4, r0))]
    p1 = [(arch1, (min(7, 4 + offset), r1))]
    if mirror:
        p0 = [(a, (c, 7 - r)) for a, (c, r) in p0]
        p1 = [(a, (c, 7 - r)) for a, (c, r) in p1]
        p0, p1 = p1, p0
    g, b0, b1 = new_game(p0, p1, overrides=overrides, terrain=terrain)
    polA = make_policy({arch0: mode0})
    polB = make_policy({arch1: mode1})
    if mirror:
        res = run_skirmish(g, b0, b1, polB, polA, max_pulses)
        # report from A's perspective
        res = dict(res)
        res['winner'] = {0: 1, 1: 0, None: None}[res['winner']]
        res['n0'], res['n1'] = res['n1'], res['n0']
        res['hp0'], res['hp1'] = res['hp1'], res['hp0']
        res['margin'] = -res['margin']
        return res
    return run_skirmish(g, b0, b1, polA, polB, max_pulses)


def skirmish_one(arch0, arch1, n, mode0, mode1, dist, mirror,
                 overrides=None, terrain=None, max_pulses=30):
    """NvN lines around the centerline at vertical separation `dist`."""
    r0 = 4 - (dist + 1) // 2
    r1 = r0 + dist
    p0 = [(arch0, pos) for pos in line(n, r0)]
    p1 = [(arch1, pos) for pos in line(n, r1)]
    if mirror:
        p0 = [(a, (c, 7 - r)) for a, (c, r) in p0]
        p1 = [(a, (c, 7 - r)) for a, (c, r) in p1]
        p0, p1 = p1, p0
    g, b0, b1 = new_game(p0, p1, overrides=overrides, terrain=terrain)
    polA = make_policy({arch0: mode0})
    polB = make_policy({arch1: mode1})
    if mirror:
        res = run_skirmish(g, b0, b1, polB, polA, max_pulses)
        res = dict(res)
        res['winner'] = {0: 1, 1: 0, None: None}[res['winner']]
        res['n0'], res['n1'] = res['n1'], res['n0']
        res['hp0'], res['hp1'] = res['hp1'], res['hp0']
        res['margin'] = -res['margin']
        return res
    return run_skirmish(g, b0, b1, polA, polB, max_pulses)
