"""LIMES v3 baseline policy bots.

All bots are deterministic heuristics built on one shared `Policy` machine
parameterised by a config dict. Equal-scored choices are broken by a
seed-derived deterministic hash (`tb`) so seeded matchups vary between seeds
but every (seed, matchup) replays identically.

POLICIES
--------
HONEST     Balanced value play. Builds economy to sustain its army, picks the
           locally weakest 3-column front and pushes it only while it holds a
           material edge there, defends threatened columns with repositioned
           blockers, annexes trampled fields, escalates from round 11 if
           behind on the ladder.
AGGRO      Pushes stakes hard. Unlocks Cavalry early, recruits to a larger
           army on a thinner economy, drives 2 rows beyond the stake line on a
           concentrated front, hunts Wagons with breachers and Siege, raids
           every trampled field, always in desperation mode.
TURTLE     Holds the line and maximises economy/palisade posture. Never
           crosses its own stake line, braces Spearmen at the front, shoots
           from behind them, builds the biggest field economy and palisades
           threatened columns; only attacks enemies inside its own half. Stays
           passive until round 14 even when behind.
PROBER     A turtle that punishes overextension: identical defensive posture,
           but any enemy unit beyond ITS OWN stake line (supply-strained, no
           Support) gets swarmed when PROBER has local superiority (more of
           its units than enemy units within 2 tiles of the target).
SANDBAGGER Concedes Stake-rows early to bank Tribute: until round 5 it
           evacuates every column except its three Wagon columns and lets the
           stakes walk in (1 chip/row), then flips to an all-out AGGRO-style
           counterattack fuelled by the banked chips (spent as Supply and on
           Surge/Shieldbearer interventions). Exists to test contract E.
RUNNER     Stake-carry cheese probe: rushes Cavalry, sprints them solo down
           the emptiest enemy columns at maximum depth while everything else
           sits home, and deliberately ignores the buddy-radius. Exists to
           verify the Lone Runner / ZoC / contest rules stop carry cheese.
"""

import zlib

from engine import ARCHES, COUNTERS, manh, in_bounds, neighbors

POLICY_NAMES = ('HONEST', 'AGGRO', 'TURTLE', 'PROBER', 'SANDBAGGER', 'RUNNER')


def _cfg(name):
    base = {
        'mode': 'auto',            # 'auto' | 'push' | 'hold' | 'sandbag' | 'runner'
        'depth': 1,                # rows beyond the stake line a push aims for
        'fields_target': 9,        # stop building fields at this many
        'palisades': True,
        'unlock_plan': ['archer'],
        'unlock_round': 3,
        'recruit_priority': ['sword', 'spear', 'archer', 'cav', 'siege'],
        'army_overshoot': 0,       # tolerated units above feedable income
        'attack_scope': 'any',     # 'any' | 'own_half' | 'own_half_superior'
        'brace_radius': 2,
        'trample': 'annex',
        'desperation_round': 11,
        'sandbag_until': 0,
        'wagon_hunt': False,
        'avoid_lone': True,
        'feed_forward_first': True,
        'rush': True,
        'rearguard': 0,            # keep up to N home defenders vs a massed enemy reserve (anti-overextension)
        'push_margin': 1.0,        # auto-mode pushes only when mine >= margin*theirs (>1 = more patient)
        'convert_mult': 1.8,       # push + full scope when this far ahead
        'breach_round': 12,        # pushers march on the Wagons from here
        'force_push_round': 12,    # hold/auto flips to push from this round
    }
    if name == 'HONEST':
        base.update(rearguard=1)   # keep 1 home defender vs a massed reserve (anti-overextension; -6.6pp vs SANDBAGGER)
    elif name == 'AGGRO':
        base.update(mode='push', depth=2, fields_target=9,
                    unlock_plan=['cav'], unlock_round=1,
                    recruit_priority=['cav', 'sword', 'spear', 'archer'],
                    army_overshoot=1, trample='raid', wagon_hunt=True,
                    palisades=False, desperation_round=1, brace_radius=1,
                    convert_mult=1.4, breach_round=10, force_push_round=1)
    elif name == 'TURTLE':
        base.update(mode='hold', fields_target=14,
                    unlock_plan=['archer', 'siege'], unlock_round=2,
                    recruit_priority=['spear', 'archer', 'sword', 'siege'],
                    attack_scope='own_half', desperation_round=12,
                    feed_forward_first=False, brace_radius=3,
                    convert_mult=2.0, force_push_round=14, breach_round=14)
    elif name == 'PROBER':
        base.update(mode='hold', fields_target=11,
                    unlock_plan=['archer'], unlock_round=2,
                    recruit_priority=['spear', 'archer', 'sword', 'cav'],
                    attack_scope='own_half_superior', desperation_round=11,
                    feed_forward_first=False, brace_radius=3,
                    convert_mult=1.8, force_push_round=13)
    elif name == 'SANDBAGGER':
        base.update(mode='sandbag', depth=2, fields_target=9,
                    unlock_plan=['cav'], unlock_round=5,
                    recruit_priority=['sword', 'cav', 'spear', 'archer'],
                    trample='raid', sandbag_until=5, desperation_round=6,
                    wagon_hunt=True, convert_mult=1.5)
    elif name == 'RUNNER':
        base.update(mode='runner', depth=6, fields_target=6,
                    unlock_plan=['cav'], unlock_round=1,
                    recruit_priority=['cav', 'sword', 'spear'],
                    trample='raid', avoid_lone=False, desperation_round=99,
                    palisades=False, convert_mult=99, force_push_round=99)
    return base


class Policy:
    def __init__(self, name):
        if name not in POLICY_NAMES:
            raise ValueError('unknown bot: %s' % name)
        self.name = name
        self.cfg = _cfg(name)
        self.seed = 0
        self.me = 0

    # engine calls this once per match
    def reset(self, seed, player):
        self.seed = seed
        self.me = player
        self._convert = False

    # clock-aware round thresholds: the cfg's push/desperation/breach rounds
    # were calibrated to GOLDEN_GOAL_ROUND=16; shift them with the clock so
    # endgame-knob sweeps aren't confounded by stale hardcoded rounds.
    def clock(self, g, key):
        return self.cfg[key] + (g.C['GOLDEN_GOAL_ROUND'] - 16)

    # deterministic tiebreak in [0,1)
    def tb(self, *parts):
        s = '%s|%s|%s|%s' % (self.seed, self.name, self.me,
                             '|'.join(str(x) for x in parts))
        return zlib.crc32(s.encode()) / 4294967296.0

    # -- orientation helpers --------------------------------------------------

    def dirn(self, me):
        return 1 if me == 0 else -1

    def own_front_row(self, g, me, c):
        k = g.stakes[c]
        return k - 1 if me == 0 else k

    def first_beyond_row(self, g, me, c):
        k = g.stakes[c]
        return k if me == 0 else k - 1

    def in_my_half(self, g, me, pos):
        return g.territory_of(pos) == me

    def stake_at_max(self, g, me, c):
        k = g.stakes[c]
        return k == g.C['STAKE_MAX'] if me == 0 else k == g.C['STAKE_MIN']

    def behind(self, g, me):
        them = 1 - me
        a, b = g.wagons_alive(me), g.wagons_alive(them)
        if a != b:
            return a < b
        ha, hb = g.wagon_hp(me), g.wagon_hp(them)
        if ha != hb:
            return ha < hb
        return g.owned_rows(me) < g.owned_rows(them)

    # -- shared tactical analysis ----------------------------------------------

    def threatened_cols(self, g, me):
        """My columns with an unbroken enemy in my half and no unbroken
        friendly contester there (an enemy carry claim is live)."""
        out = []
        for c in range(8):
            p1c, p2c = g.column_claims(c)
            if (me == 0 and p2c) or (me == 1 and p1c):
                out.append(c)
        return out

    def danger_cols(self, g, me):
        """Columns scored by enemy pressure (enemy units in or near my half)."""
        score = [0.0] * 8
        for u in g.on_board(1 - me):
            c, r = u.pos
            k = g.stakes[c]
            dist_to_line = (k - 1 - r) * -1 if me == 0 else r - k
            # dist_to_line <= 0 means inside my half already
            if me == 0:
                inside = r < k
                near = k <= r <= k + 2
            else:
                inside = r >= k
                near = k - 3 <= r < k
            if inside:
                score[c] += 3
            elif near:
                score[c] += 1
        return score

    def pick_push_center(self, g, me):
        """Weakest enemy 3-column window, weighted toward my own mass.
        Sticky per match via seed hash."""
        best, bestscore = None, None
        mine = g.on_board(me)
        for c in range(8):
            edef = 0.0
            myw = 0.0
            for cc in range(max(0, c - 1), min(8, c + 2)):
                w = 1.0 if cc == c else 0.5
                for u in g.on_board(1 - me):
                    uc, ur = u.pos
                    if uc != cc:
                        continue
                    if g.territory_of(u.pos) == (1 - me):
                        edef += w          # contests my advance there
                for u in mine:
                    if u.pos[0] == cc:
                        myw += 0.4 * w
            s = -edef + myw + 0.3 * self.tb('pushcol', c)
            if bestscore is None or s > bestscore:
                best, bestscore = c, s
        return best

    def push_cols(self, g, me):
        c = self.pick_push_center(g, me)
        return [cc for cc in (c - 1, c, c + 1) if 0 <= cc < 8]

    def plan(self, g, me):
        cfg = self.cfg
        mode = cfg['mode']
        mine = sum(g.costs[u.arch] + u.hp for u in g.on_board(me))
        theirs = sum(g.costs[u.arch] + u.hp for u in g.on_board(1 - me))
        # convert rule: a crushing material lead is cashed in by every policy
        convert = mine >= cfg['convert_mult'] * max(1, theirs)
        if mode == 'sandbag' and g.round > cfg['sandbag_until']:
            mode = 'push'
        if mode in ('auto', 'hold') and g.round >= self.clock(g, 'desperation_round') \
                and self.behind(g, me):
            mode = 'push'
        if mode in ('auto', 'hold') and g.round >= self.clock(g, 'force_push_round'):
            mode = 'push'          # the exhaustion clock: somebody must push
        if convert and mode != 'runner':
            mode = 'push'
        if mode == 'auto':
            # push only with a real material margin; when even (e.g. an enemy
            # conceding ground while massing), hold and stay compact rather than
            # chasing into an overextension.
            mode = 'push' if mine >= cfg['push_margin'] * theirs else 'hold'
        self._convert = convert
        plan = {'mode': mode, 'convert': convert}
        if mode in ('push', 'runner'):
            plan['push_cols'] = self.push_cols(g, me)
            live = [w for w in g.wagons[1 - me] if w['hp'] > 0]
            if live:
                center = plan['push_cols'][len(plan['push_cols']) // 2]
                plan['wagon_target'] = min(
                    live, key=lambda w: (abs(w['col'] - center), w['col']))['col']
        plan['threats'] = self.threatened_cols(g, me)
        return plan

    # ------------------------------------------------------------------
    # Setup
    # ------------------------------------------------------------------

    def setup(self, g, me):
        back = g.back_row(me)
        front = 1 if me == 0 else 6
        # wagons spread, seed-varied
        base_sets = [(1, 4, 6), (0, 3, 6), (2, 4, 7), (1, 3, 5)]
        wag = list(base_sets[int(self.tb('wagons') * len(base_sets))])
        center = 3 + (0 if self.tb('side') < 0.5 else 1)
        units = [('hero', (center, front)),
                 ('spear', (center - 1, front)),
                 ('sword', (center + 1, front)),
                 ('sword', (center - 2, front))]
        return {'wagons': wag, 'units': units}

    # ------------------------------------------------------------------
    # Muster decisions
    # ------------------------------------------------------------------

    def feed_order(self, g, me):
        mine = g.on_board(me)

        def prio(u):
            engaged = any(g.board.get(nb) is not None and
                          g.units[g.board[nb]].owner != me
                          for nb in neighbors(u.pos))
            fwd = g.beyond_own(u)
            fwd_score = 0 if self.cfg['feed_forward_first'] else (1 if fwd else 0)
            return (0 if u.arch == 'hero' else 1,
                    0 if engaged else 1,
                    fwd_score,
                    -g.costs[u.arch],
                    u.pos)
        return [u.uid for u in sorted(mine, key=prio)]

    def _proj_crop_income(self, g, me):
        _, crop = g.compute_harvest(me, g.round + 1)
        return crop

    def build(self, g, me):
        cfg = self.cfg
        C = g.C
        acts = []
        supply = g.res[me]['supply']
        nfields = sum(1 for f in g.fields.values()
                      if f['owner'] == me and f['annexed'] is None)
        army = len([u for u in g.units.values() if u.owner == me])
        # palisade on the hottest threatened column
        if cfg['palisades'] and supply >= C['PALISADE_COST'] + C['FIELD_COST']:
            danger = self.danger_cols(g, me)
            cand = sorted((c for c in range(8)
                           if c not in g.palisades and danger[c] >= 2),
                          key=lambda c: (-danger[c], self.tb('pal', c)))
            if cand:
                acts.append(('palisade', cand[0]))
                supply -= C['PALISADE_COST']
        planned = []
        while len(acts) < C['BUILD_ACTIONS'] and supply >= C['FIELD_COST'] \
                and nfields < cfg['fields_target']:
            crop_inc = self._proj_crop_income(g, me) + 2 * sum(
                1 for (_, t) in planned if t == 'crop')
            # feed the army first, then fund it; crop fields are dead weight
            # once land exhaustion bites (banked crop carries the late game)
            want_crop = crop_inc < army + 2 and \
                g.round < C['EXHAUSTION_START_ROUND'] - 2
            ftype = 'crop' if want_crop else 'supply'
            pos = self._field_spot(g, me, ftype, {p for (p, _) in planned})
            if pos is None:
                break
            acts.append(('field', pos, ftype))
            planned.append((pos, ftype))
            supply -= C['FIELD_COST']
            nfields += 1
        # rich turtles wall up with the spare action
        if cfg['palisades'] and len(acts) < C['BUILD_ACTIONS'] \
                and supply >= C['PALISADE_COST'] + 4:
            danger = self.danger_cols(g, me)
            cand = sorted((c for c in range(8)
                           if c not in g.palisades and danger[c] >= 1),
                          key=lambda c: (-danger[c], self.tb('pal2', c)))
            if cand:
                acts.append(('palisade', cand[0]))
        return acts

    def _field_spot(self, g, me, ftype, exclude=frozenset()):
        best, bests = None, None
        rows = list(range(8))
        for c in range(8):
            for r in rows:
                pos = (c, r)
                if g.territory_of(pos) != me or pos in g.fields \
                        or pos in g.wagon_at or pos in exclude:
                    continue
                adj_same = sum(1 for nb in neighbors(pos)
                               if nb in g.fields
                               and g.fields[nb]['type'] == ftype
                               and g.fields[nb]['owner'] == me
                               and g.fields[nb]['annexed'] is None)
                safe = 2 if r in g.heartland_rows(me) else 0
                s = 2 * adj_same + safe + self.tb('field', pos)
                if bests is None or s > bests:
                    best, bests = pos, s
        return best

    def reinforce(self, g, me):
        cfg = self.cfg
        C = g.C
        res = g.res[me]
        out = {'unlocks': [], 'recruits': [], 'repositions': [], 'rush': []}
        supply = res['supply']
        # late game / sandbag-flip: dump tribute into supply
        trib = res['tribute']
        spend = 0
        if cfg['mode'] == 'sandbag' and g.round > cfg['sandbag_until']:
            spend = max(0, trib - 2)           # keep 2 for interventions
        elif g.round >= self.clock(g, 'desperation_round') and trib > 2:
            spend = trib - 2
        out['tribute_spend'] = spend
        supply += spend
        # rush wounded
        if cfg['rush']:
            crop = res['crop']
            for u in g.reserve(me):
                if u.wounded_round == g.round - 1 and crop > len(g.on_board(me)):
                    out['rush'].append(u.uid)
                    crop -= 1
        # unlocks
        unlocked = g.unlocked[me]
        plan = [a for a in cfg['unlock_plan'] if a not in unlocked]
        if plan and g.round >= cfg['unlock_round']:
            ncur = len(unlocked)
            cost = {2: C['UNLOCK_3RD'], 3: C['UNLOCK_4TH'],
                    4: C['UNLOCK_5TH']}.get(ncur, 999)
            if supply >= cost + 3:             # keep enough for a unit
                out['unlocks'].append(plan[0])
                supply -= cost
        # recruiting, bounded by feedable crop (income + a slice of the bank)
        crop_inc = self._proj_crop_income(g, me)
        army = len([u for u in g.units.values() if u.owner == me])
        cap = C['DEPLOY_MAX'] + g.extra_deploy[me]
        taken = set()
        for _ in range(cap):
            sustain = max(4, crop_inc + res['crop'] // 6
                          + cfg['army_overshoot'])
            if army + 1 > sustain:
                break
            arch = None
            for a in cfg['recruit_priority']:
                if a not in unlocked and a not in out['unlocks']:
                    continue
                if g.copies[a] >= C['MUSTER_COPIES']:
                    continue
                price = g.costs[a] + C['COPY_SURCHARGE'] * g.copies[a]
                if g.recruit_discount[me]:
                    price = max(1, price - g.recruit_discount[me])
                if supply >= price:
                    arch = a
                    supply -= price
                    break
            if arch is None:
                break
            pos = self._deploy_spot(g, me, taken)
            if pos is None:
                break
            taken.add(pos)
            out['recruits'].append((arch, pos))
            army += 1
        # repositions: cover live enemy carry claims with blockers
        threats = self.threatened_cols(g, me)
        used = set()
        for c in threats[:C['REPOSITION_MAX']]:
            u = self._spare_blocker(g, me, c, used)
            if u is None:
                continue
            dest = self._block_tile(g, me, c)
            if dest is None:
                continue
            used.add(u.uid)
            out['repositions'].append((u.uid, dest))
        # spare repositions mass idle rear units onto the push front
        if len(out['repositions']) < C['REPOSITION_MAX'] and \
                (cfg['mode'] in ('push', 'sandbag') or self._convert
                 or g.round >= self.clock(g, 'force_push_round')):
            center = self.pick_push_center(g, me)
            for u in g.on_board(me):
                if len(out['repositions']) >= C['REPOSITION_MAX']:
                    break
                if u.uid in used or g.beyond_own(u) or u.arch == 'siege':
                    continue
                engaged = any(g.board.get(nb) is not None and
                              g.units[g.board[nb]].owner != me
                              for nb in neighbors(u.pos))
                if engaged or abs(u.pos[0] - center) <= 1:
                    continue
                far_back = (u.pos[1] <= 1) if me == 0 else (u.pos[1] >= 6)
                if not far_back:
                    continue
                for cc in (center, center - 1, center + 1):
                    if not 0 <= cc < 8:
                        continue
                    dest = self._block_tile(g, me, cc)
                    if dest is not None:
                        used.add(u.uid)
                        out['repositions'].append((u.uid, dest))
                        break
        return out

    def _deploy_spot(self, g, me, taken):
        rows = g.heartland_rows(me)
        front = rows[1] if me == 0 else rows[0]
        prefer = None
        if self.cfg['mode'] in ('push', 'runner') or self.cfg['mode'] == 'auto':
            prefer = self.pick_push_center(g, me)
        threats = self.threatened_cols(g, me)
        if threats:
            prefer = threats[0]
        best, bests = None, None
        for c in range(8):
            for r in (front, rows[0] if me == 0 else rows[1]):
                pos = (c, r)
                if g.occupied(pos) or pos in taken:
                    continue
                s = -abs(c - (prefer if prefer is not None else 3)) \
                    + (1 if r == front else 0) + self.tb('deploy', pos)
                if bests is None or s > bests:
                    best, bests = pos, s
        return best

    def _spare_blocker(self, g, me, col, used):
        cands = []
        for u in g.on_board(me):
            if u.uid in used or u.arch == 'hero' or g.beyond_own(u):
                continue
            engaged = any(g.board.get(nb) is not None and
                          g.units[g.board[nb]].owner != me
                          for nb in neighbors(u.pos))
            if engaged:
                continue
            # don't strip a column that itself needs a contester
            c = u.pos[0]
            others = sum(1 for v in g.on_board(me)
                         if v.uid != u.uid and v.pos[0] == c
                         and not g.beyond_own(v))
            enemy_here = any(v.pos[0] == c for v in g.on_board(1 - me))
            if enemy_here and others == 0:
                continue
            cands.append(u)
        if not cands:
            return None
        cands.sort(key=lambda u: (g.costs[u.arch], abs(u.pos[0] - col),
                                  self.tb('blk', u.uid)))
        return cands[0]

    def _block_tile(self, g, me, col):
        k = g.stakes[col]
        rows = range(k - 1, -1, -1) if me == 0 else range(k, 8)
        for r in rows:
            pos = (col, r)
            if not g.occupied(pos):
                return pos
        return None

    def standard_bearer(self, g, me):
        return None                            # engine auto-picks

    # ------------------------------------------------------------------
    # Orders
    # ------------------------------------------------------------------

    def bfs(self, g, u, max_steps):
        """Reachable tiles -> path, with ZoC-terminal expansion (a tile adjacent
        to an enemy can be entered but not left this sub-phase)."""
        if max_steps <= 0:
            return {u.pos: []}
        enemy_tiles = [v.pos for v in g.on_board(1 - u.owner)]
        zoc = set()
        for ep in enemy_tiles:
            for nb in neighbors(ep):
                zoc.add(nb)
        visited = {u.pos: []}
        frontier = [(u.pos, [])]
        for _ in range(max_steps):
            nxt = []
            for pos, path in frontier:
                if pos != u.pos and pos in zoc:
                    continue
                for nb in neighbors(pos):
                    if nb in visited or g.occupied(nb):
                        continue
                    np = path + [nb]
                    visited[nb] = np
                    nxt.append((nb, np))
            frontier = nxt
        return visited

    def _target_score(self, g, me, u, t, charge=False):
        est = g.attack_damage(u, t, charge=charge, melee=not charge)
        kill = est >= t.hp
        return (10 if kill else 0) + 2 * (COUNTERS.get(u.arch) == t.arch) \
            + (6 - t.hp) * 0.5 + est \
            + (3 if t.uid == (g.standard_bearer[1 - me] or -1) else 0) \
            + (2 if t.arch == 'hero' else 0) + self.tb('tgt', u.uid, t.uid)

    def _attack_allowed(self, g, me, t):
        scope = self.cfg['attack_scope']
        if getattr(self, '_convert', False):
            scope = 'any'                      # cash in a crushing lead
        if scope == 'any':
            return True
        in_mine = g.territory_of(t.pos) == me
        if scope == 'own_half':
            return in_mine
        if scope == 'own_half_superior':
            if not in_mine:
                return False
            mine = sum(1 for v in g.on_board(me) if manh(v.pos, t.pos) <= 2)
            theirs = sum(1 for v in g.on_board(1 - me)
                         if manh(v.pos, t.pos) <= 2)
            return mine >= theirs + 1
        return True

    def orders(self, g, me, pulse):
        plan = self.plan(g, me)
        out = {}
        defenders = self._assign_defenders(g, me, plan)
        load = {}
        for u in g.on_board(me):
            out[u.uid] = self._unit_order(g, me, u, plan, defenders, load)
        return out

    def _assign_defenders(self, g, me, plan):
        """uid -> column for live enemy-claim threats (cheap blockers walk in)."""
        res = {}
        used = set()
        for c in plan['threats']:
            best, bestd = None, None
            for u in g.on_board(me):
                if u.uid in used or g.beyond_own(u):
                    continue
                d = abs(u.pos[0] - c) + 0.1 * g.costs[u.arch]
                if bestd is None or d < bestd:
                    best, bestd = u, d
            if best is not None and bestd is not None and bestd <= 3.5:
                res[best.uid] = c
                used.add(best.uid)
        # rearguard (anti-overextension): when pushing against an enemy that is
        # holding a large uncommitted reserve in its own half (the sandbag
        # counterpunch pattern), keep a few defenders home on live wagon columns
        # instead of stripping the heartland bare.
        if self.cfg.get('rearguard') and plan['mode'] == 'push':
            reserve = sum(1 for e in g.on_board(1 - me)
                          if g.territory_of(e.pos) == (1 - me))
            my_wagons = sorted({w['col'] for w in g.wagons[me] if w['hp'] > 0})
            want = min(self.cfg['rearguard'], reserve // 2, len(my_wagons))
            for c in my_wagons:
                if want <= 0:
                    break
                if c in res.values():
                    continue
                best, bestd = None, None
                for u in g.on_board(me):
                    if u.uid in used or g.beyond_own(u):
                        continue
                    d = abs(u.pos[0] - c) + 0.1 * g.costs[u.arch]
                    if bestd is None or d < bestd:
                        best, bestd = u, d
                if best is not None:
                    res[best.uid] = c
                    used.add(best.uid)
                    want -= 1
        return res

    def _unit_order(self, g, me, u, plan, defenders, load):
        cfg = self.cfg
        adj_enemies = []
        for nb in neighbors(u.pos):
            uid = g.board.get(nb)
            if uid is not None and g.units[uid].owner != me:
                adj_enemies.append(g.units[uid])
        # --- Siege ---
        if u.arch == 'siege':
            return self._siege_order(g, me, u, plan)
        # --- Archer ---
        if u.arch == 'archer':
            shots = [t for t in g.on_board(1 - me)
                     if manh(u.pos, t.pos) == 2 and self._attack_allowed(g, me, t)]
            if shots:
                t = max(shots, key=lambda t: self._target_score(g, me, u, t))
                return ('SHOOT', ('U', t.uid))
            if adj_enemies:
                t = max(adj_enemies, key=lambda t: self._target_score(g, me, u, t))
                if self._attack_allowed(g, me, t):
                    return ('MELEE', t.uid, [])
            return self._move_order(g, me, u, plan, defenders, load,
                                    standoff=2)
        # --- Cavalry: charge hunt ---
        if u.arch == 'cav' and not u.exhausted:
            ch = self._find_charge(g, me, u)
            if ch is not None:
                return ch
        # --- melee units (and cav fallback / hero) ---
        if adj_enemies:
            cands = [t for t in adj_enemies if self._attack_allowed(g, me, t)]
            if cands:
                t = max(cands, key=lambda t: self._target_score(g, me, u, t))
                return ('MELEE', t.uid, [])
        # approach-melee within Mv
        reach = self.bfs(g, u, u.mv)
        best = None
        for t in g.on_board(1 - me):
            if not self._attack_allowed(g, me, t):
                continue
            for land in neighbors(t.pos):
                if land == u.pos:
                    continue
                if land in reach:
                    s = self._target_score(g, me, u, t) - 0.3 * len(reach[land])
                    if t.arch == 'spear' and t.braced and u.arch == 'cav':
                        s -= 6
                    if best is None or s > best[0]:
                        best = (s, t, reach[land])
        if best is not None and best[0] > 1.5:
            return ('MELEE', best[1].uid, best[2])
        # spear brace posture
        if u.arch == 'spear' and not u.exhausted:
            near = any(manh(u.pos, t.pos) <= cfg['brace_radius']
                       for t in g.on_board(1 - me))
            holding = plan['mode'] == 'hold' or not g.beyond_own(u)
            if near and holding and u.uid not in defenders:
                return ('BRACE',)
        return self._move_order(g, me, u, plan, defenders, load, reach=reach)

    def _find_charge(self, g, me, u):
        reach = self.bfs(g, u, u.mv)
        best = None
        for t in g.on_board(1 - me):
            if not self._attack_allowed(g, me, t):
                continue
            if t.arch == 'spear' and t.braced:
                continue
            if g.terrain_on and g.ttype.get(t.pos) == 'woods':
                continue
            for land in neighbors(t.pos):
                path = reach.get(land)
                if path is None or len(path) < g.C['CHARGE_MOVE_MIN']:
                    continue
                s = self._target_score(g, me, u, t, charge=True) \
                    - 0.2 * len(path)
                if best is None or s > best[0]:
                    best = (s, t, path)
        if best is not None and best[0] > 2:
            return ('CHARGE', best[1].uid, best[2])
        return None

    def _siege_order(self, g, me, u, plan):
        cfg = self.cfg
        # shoot enemy palisade blocking my push
        if plan['mode'] == 'push':
            for c in plan.get('push_cols', []):
                if g.palisades.get(c) == 1 - me:
                    k = g.stakes[c]
                    if any(u.rmin <= manh(u.pos, t) <= u.rmax
                           for t in ((c, k - 1), (c, k))):
                        return ('SHOOT', ('P', c))
        # wagon hunt
        if (cfg['wagon_hunt'] or plan.get('convert')) and g.cap_remaining(me) > 0:
            for i, w in enumerate(g.wagons[1 - me]):
                if w['hp'] <= 0:
                    continue
                wpos = (w['col'], g.back_row(1 - me))
                if u.rmin <= manh(u.pos, wpos) <= u.rmax:
                    return ('SHOOT', ('W', 1 - me, i))
        shots = [t for t in g.on_board(1 - me)
                 if u.rmin <= manh(u.pos, t.pos) <= u.rmax
                 and self._attack_allowed(g, me, t)]
        if shots:
            t = max(shots, key=lambda t: self._target_score(g, me, u, t))
            return ('SHOOT', ('U', t.uid))
        return self._move_order(g, me, u, plan, {}, {}, standoff=2)

    def _move_order(self, g, me, u, plan, defenders, load, standoff=0,
                    reach=None):
        cfg = self.cfg
        goal = self._goal_tile(g, me, u, plan, defenders, load)
        if goal is None:
            return ('HOLD',)
        if reach is None:
            reach = self.bfs(g, u, u.mv)
        enemies = g.on_board(1 - me)
        best, bests = None, None
        for pos, path in reach.items():
            d = manh(pos, goal)
            s = -d
            if standoff and enemies:
                nd = min(manh(pos, t.pos) for t in enemies)
                if nd < standoff:
                    s -= (standoff - nd) * 2
            if cfg['avoid_lone'] and g.territory_of(pos) != me:
                buddy = any(v.uid != u.uid and v.owner == me
                            and manh(v.pos, pos) <= g.C['LONE_RUNNER_RADIUS']
                            for v in g.on_board(me))
                if not buddy:
                    s -= 4
            s += 0.1 * self.tb('mv', u.uid, pos)
            if bests is None or s > bests:
                best, bests = (pos, path), s
        if best is None or not best[1]:
            return ('HOLD',)
        return ('MOVE', best[1])

    def _goal_tile(self, g, me, u, plan, defenders, load):
        cfg = self.cfg
        if u.uid in defenders:
            c = defenders[u.uid]
            return (c, self.own_front_row(g, me, c))
        mode = plan['mode']
        if mode == 'sandbag':
            keep = sorted({w['col'] for w in g.wagons[me] if w['hp'] > 0})
            if not keep:
                keep = [3]
            c = min(keep, key=lambda c: abs(c - u.pos[0]))
            return (c, self.own_front_row(g, me, c))
        if mode == 'runner' and u.arch == 'cav':
            # emptiest enemy column, max depth
            def emptiness(c):
                return sum(1 for v in g.on_board(1 - me) if v.pos[0] == c) \
                    + 0.1 * self.tb('run', u.uid, c)
            c = min(range(8), key=emptiness)
            r = g.back_row(1 - me)
            return (c, r)
        if mode in ('push', 'runner'):
            cols = plan.get('push_cols') or [3, 4]
            c = min(cols, key=lambda c: abs(c - u.pos[0])
                    + 0.7 * load.get(c, 0))
            load[c] = load.get(c, 0) + 1
            # breach-march: head for the enemy Wagons when converting a big
            # lead, when the stake is maxed, or once the exhaustion clock runs
            if plan.get('convert') or g.round >= self.clock(g, 'breach_round') \
                    or self.stake_at_max(g, me, c):
                wc = plan.get('wagon_target')
                if wc is not None:
                    # mass on the target wagon, fanning over adjacent columns
                    n = load.get('breach', 0)
                    load['breach'] = n + 1
                    offs = (0, 1, -1, 0, 1, -1, 2, -2)[n % 8]
                    col = max(0, min(7, wc + offs))
                    r = g.back_row(1 - me) - self.dirn(me)  # heartland row
                    return (col, r)
                return (c, g.back_row(1 - me))
            depth = cfg['depth']
            r = self.first_beyond_row(g, me, c) + (depth - 1) * self.dirn(me)
            r = max(0, min(7, r))
            return (c, r)
        # hold: distribute over dangerous columns
        danger = self.danger_cols(g, me)
        hot = [c for c in range(8) if danger[c] > 0]
        if not hot:
            hot = [u.pos[0]]
        c = min(hot, key=lambda c: abs(c - u.pos[0]) + 0.7 * load.get(c, 0))
        load[c] = load.get(c, 0) + 1
        return (c, self.own_front_row(g, me, c))

    # ------------------------------------------------------------------
    # Interventions & misc decisions
    # ------------------------------------------------------------------

    def intervention(self, g, me, wno):
        C = g.C
        trib = g.res[me]['tribute']
        # Shieldbearer: protect a cornered Standard (windows 1-2)
        if wno <= 2 and trib >= C['SHIELDBEARER_COST']:
            s = g.standard_unit(me)
            if s is not None and s.hp <= 4:
                adj_e = sum(1 for nb in neighbors(s.pos)
                            if g.board.get(nb) is not None
                            and g.units[g.board[nb]].owner != me)
                adj_f = any(g.board.get(nb) is not None
                            and g.units[g.board[nb]].owner == me
                            and g.units[g.board[nb]].arch in ('spear', 'sword')
                            for nb in neighbors(s.pos))
                if adj_e >= 2 and adj_f and not any(
                        w['uid'] == s.uid and w['active'] for w in g.wards):
                    return ('SHIELDBEARER', s.uid)
        # Surge at the pre-Frontier window: break enemy carries / make mine
        if wno == 3 and trib >= C['SURGE_COST']:
            # break: step an unbroken unit into a column-half under enemy claim
            for c in self.threatened_cols(g, me):
                for u in g.on_board(me):
                    if not g.unbroken(u):
                        continue
                    for nb in neighbors(u.pos):
                        if g.occupied(nb) or not in_bounds(nb):
                            continue
                        if nb[0] == c and g.territory_of(nb) == me:
                            return ('SURGE', u.uid, nb)
            # make: step a buddy-covered unit across the line where uncontested
            for c in range(8):
                k = g.stakes[c]
                p1c, p2c = g.column_claims(c)
                myclaim = p1c if me == 0 else p2c
                if myclaim:
                    continue
                # is the enemy half of this column free of unbroken enemies?
                clear = True
                for v in g.on_board(1 - me):
                    if v.pos[0] == c and g.territory_of(v.pos) == (1 - me) \
                            and g.unbroken(v):
                        clear = False
                        break
                if not clear:
                    continue
                for u in g.on_board(me):
                    if u.exhausted or g.beyond_own(u):
                        continue
                    for nb in neighbors(u.pos):
                        if g.occupied(nb):
                            continue
                        if nb[0] == c and g.territory_of(nb) != me:
                            buddy = any(v.uid != u.uid and v.owner == me
                                        and manh(v.pos, nb) <=
                                        g.C['LONE_RUNNER_RADIUS']
                                        for v in g.on_board(me))
                            if buddy:
                                return ('SURGE', u.uid, nb)
        return None

    def trample_choice(self, g, me, pos, field):
        if self.cfg['trample'] == 'raid':
            return 'raid'
        if self.cfg['trample'] == 'annex':
            # crop fields are worthless under late exhaustion: loot them
            if field['type'] == 'crop' and \
                    g.round >= g.C['EXHAUSTION_START_ROUND'] - 2:
                return 'raid'
            return 'annex'
        return 'raid'

    def last_stand(self, g, me):
        if len(g.reserve(me)) >= 2:
            return 1                            # RALLY
        if self.cfg['mode'] == 'hold':
            return 3                            # ENTRENCH
        return 2                                # VETERANCY

    def entrench_cols(self, g, me):
        danger = self.danger_cols(g, me)
        return sorted((c for c in range(8) if c not in g.palisades),
                      key=lambda c: (-danger[c], self.tb('ent', c)))

    def artifact_pick(self, g, me, options):
        crop_short = self._proj_crop_income(g, me) < len(g.on_board(me))
        if self.cfg['mode'] in ('push', 'runner') or self.cfg['mode'] == 'sandbag':
            pref = [2, 1, 4, 7, 6, 3, 8, 5] if crop_short else \
                   [1, 4, 7, 3, 6, 2, 8, 5]
        else:
            pref = [2, 8, 5, 1, 3, 6, 4, 7] if crop_short else \
                   [8, 5, 1, 3, 2, 6, 4, 7]
        for aid in pref:
            if aid in options:
                return aid
        return options[0]

    def artifact_wagon(self, g, p, aid):
        """A2: pick which living wagon to attach an artifact to.
        Fewest artifacts wins; ties broken by lowest wagon index.
        Returns -1 if no living wagon exists."""
        best = -1
        best_key = None
        for i, w in enumerate(g.wagons[p]):
            if w['hp'] <= 0:
                continue
            key = (len(w['artifacts']), i)
            if best_key is None or key < best_key:
                best_key = key
                best = i
        return best

    def promo_t2(self, g, me, unit):
        return 'guard' if unit.arch in ('spear', 'hero') else 'atk'

    def breach_target(self, g, me, u, tied):
        """C-063/D-23: column-distance tie broken by the breaching player.
        tied: list of (idx, wagon). Finish the lowest-HP wagon (bounty)."""
        return min(tied, key=lambda iw: (iw[1]['hp'], iw[1]['col']))[0]

    def rout_allocate(self, g, me, victim, dmg):
        """C-074/D-23: the routing player distributes Rout's wagon damage.
        Stack damage on the lowest-HP wagons first to maximise kills."""
        hp = {i: w['hp'] for i, w in enumerate(g.wagons[victim])
              if w['hp'] > 0}
        picks = []
        for _ in range(dmg):
            if not hp:
                break
            i = min(hp, key=lambda i: (hp[i], i))
            picks.append(i)
            hp[i] -= 1
            if hp[i] <= 0:
                del hp[i]
        return picks


def make_bot(name):
    return Policy(name.upper())
