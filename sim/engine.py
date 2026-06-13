"""LIMES v3 "The Living Frontier" -- baseline deterministic simulator engine.

Implements the CORE rules of design/v3-rules-spec.md (C-001..C-081):
  * full round loop: MUSTER -> REVEAL -> CLASH (2 pulses) -> FRONTIER -> PASS & TRIBUTE
  * 4-sub-phase combat (Brace -> Ranged -> Move/Charge -> Melee), damage simultaneous
    within each sub-phase, displacement queue, ZoC, lockstep movement
  * stakes / carry / lone-runner / contest, trample (raid/annex), palisade absorption
  * economy: fields, farmsteads, harvest-behind-limes, upkeep + supply strain,
    Exhausted flip, land exhaustion (r12+), shared muster supply + unlock ladder
  * tribute chips + interventions (Surge / Shieldbearer), komi-holder discipline
  * wounded-not-dead recovery cycle, XP / promotions, caravans + artifact pool
  * breach (capped), wagon bounties, Last Stand boons, Standard Rout,
    golden goal (r16+), hard stop ladder (r20)
Terrain (module M-04: hills/woods/river/road) is implemented; default is flat.

Coordinates: tiles are (col, row), both 0-indexed, col 0..7 ('a'..'h'),
row 0..7 (spec rows 1..8). Player 0 ("P1") heartland = rows 0-1, back row 0;
Player 1 ("P2") heartland = rows 6-7, back row 7. stakes[c] = k = number of
rows P1 owns in column c (spec's k); P1 owns rows < k, P2 owns rows >= k.

Determinism: no randomness after the match seed (the seed only orders the
artifact pool / terrain and feeds the bots' deterministic tiebreak hashes).
Identical inputs => identical outcomes.

Engine-vs-spec approximations (documented deviations, none affect determinism):
  * Muster is resolved sequentially, komi-holder first (spec: simultaneous with
    komi-first pricing of shared muster copies, D-30). The komi-holder therefore
    also prices first here.
  * Face-down recruits are flagged but bots may read the full state (the
    baseline bots are open-information heuristics; the hidden-recruit yomi
    layer is a human/Tactica concern, not exercised by these policies).
"""

from collections import defaultdict

# ---------------------------------------------------------------------------
# Constants -- Appendix B verbatim; single source of truth, overridable per match
# ---------------------------------------------------------------------------

CONSTANTS = {
    # Board & stakes
    'BOARD_COLS': 8, 'BOARD_ROWS': 8, 'HEARTLAND_ROWS': 2,
    'STAKE_START': 4, 'STAKE_MIN': 2, 'STAKE_MAX': 6, 'STAKE_STEP_MAX': 1,
    'LONE_RUNNER_RADIUS': 2,
    # Wagons, breach, rout
    'WAGON_COUNT': 3, 'WAGON_HP': 3, 'WAGON_BOUNTY': 3,
    'BREACH_DMG': 1, 'BREACH_CAP': 2, 'BREACH_CAP_LATE': 3,
    'BREACH_CAP_RISE_ROUND': 13, 'ROUT_WAGON_DMG': 2,
    # Economy
    'START_SUPPLY': 8, 'START_CROP': 6,
    'FIELD_COST': 2, 'FIELD_YIELD': 2, 'FARMSTEAD_SIZE': 3, 'FARMSTEAD_BONUS': 2,
    'ANNEX_YIELD': 1, 'RAID_GAIN': 3, 'PALISADE_COST': 3, 'BUILD_ACTIONS': 2,
    'UPKEEP_CROP': 1, 'SUPPLY_STRAIN_CROP': 1,
    'EXHAUSTION_START_ROUND': 12, 'EXHAUSTION_INITIAL': 1,
    'EXHAUSTION_ACCEL_ROUND': 13, 'EXHAUSTION_ACCEL': 2,
    # Muster
    'MUSTER_COPIES': 6, 'COPY_SURCHARGE': 1,
    'UNLOCK_3RD': 6, 'UNLOCK_4TH': 10, 'UNLOCK_5TH': 15,
    'COST_SPEARMAN': 2, 'COST_SWORDSMAN': 3, 'COST_ARCHER': 3,
    'COST_CAVALRY': 4, 'COST_SIEGE': 5,
    'DEPLOY_MAX': 2, 'REPOSITION_MAX': 2,
    'RUSH_RETURN_COST': 1, 'WOUND_RETURN_DELAY': 2,
    # Tribute
    'TRIBUTE_PER_ROW': 1, 'TRIBUTE_SUPPLY_VALUE': 1,
    'SURGE_COST': 1, 'SHIELDBEARER_COST': 2, 'INTERVENTIONS_PER_WINDOW': 1,
    # Combat
    'PULSES_PER_CLASH': 2, 'ATK_BONUS_CAP': 2, 'GUARD_CAP': 2,
    'MOD_FLANK': 1, 'MOD_SUPPORT': 1, 'MOD_BRACE_GUARD': 1, 'MOD_CHARGE': 1,
    'MOD_COUNTER': 1, 'MOD_HILL': 1, 'MOD_RIVER': 1, 'MOD_ROAD': 1,
    'FLANK_THRESHOLD': 2, 'FLANK_MIN_DMG': 1,
    'EXHAUST_ATK_PENALTY': 1, 'EXHAUST_GUARD_PENALTY': 1,
    'DISPLACE_DMG': 1, 'RIVER_PUSH_DMG': 2, 'TRAP_PUSH_DMG': 2,
    'CHARGE_MOVE_MIN': 2, 'PUSH_BACK': 1, 'RANGED_RETALIATION': 1,
    # Unit stats
    'SPEAR_ATK': 1, 'SPEAR_HP': 4, 'SPEAR_MV': 1, 'SPEAR_RNG': 1,
    'SWORD_ATK': 2, 'SWORD_HP': 5, 'SWORD_MV': 1, 'SWORD_RNG': 1,
    'CAV_ATK': 2, 'CAV_HP': 4, 'CAV_MV': 3, 'CAV_RNG': 1,
    'ARCHER_ATK': 2, 'ARCHER_HP': 3, 'ARCHER_MV': 1, 'ARCHER_RNG_MAX': 2,
    'SIEGE_ATK': 3, 'SIEGE_HP': 3, 'SIEGE_MV': 1,
    'SIEGE_RNG_MIN': 2, 'SIEGE_RNG_MAX': 3,
    'HERO_ATK': 3, 'HERO_HP': 7, 'HERO_MV': 2, 'HERO_RNG': 1,
    # XP & promotions (CORE)
    'XP_PER_WOUND': 1, 'XP_TIER1': 2, 'XP_TIER2': 4,
    'PROMO_T1_HP': 1, 'PROMO_T2_STAT': 1,
    # Caravans & artifacts (CORE)
    'CARAVAN_ROUND_1': 4, 'CARAVAN_ROUND_2': 8,
    'CARAVAN_ARTIFACTS': 4, 'CARAVAN_DISCARD': 1, 'ARTIFACT_POOL': 8,
    'ARTIFACT_SUPPLY': 4, 'ARTIFACT_CROP': 4, 'ARTIFACT_XP': 2,
    'ARTIFACT_TRIBUTE': 2, 'ARTIFACT_DISCOUNT': 2,
    # Endgame
    'GOLDEN_GOAL_ROUND': 16, 'HARD_STOP_ROUND': 20,
    'LASTSTAND_BOONS': 3, 'ENTRENCH_PALISADES': 2,
    'ENTRENCH_HOLD': 0,   # C-058b: rounds of holding to entrench forward ground; 0 = OFF
    'FIRST_BLOOD_SUPPLY': 0,  # one-time Supply to the round-1 winner (first-mover edge); 0 = OFF
    # Timers (not consulted by the sim; kept so the dict mirrors the spec)
    'TIMER_MUSTER': 60, 'TIMER_COMMIT': 15,
    'TIMER_MUSTER_CASUAL': 90, 'TIMER_COMMIT_CASUAL': 30,
    # Modules (terrain implemented; rest unused in baseline, kept for parity)
    'TACTICA_POOL': 9, 'TACTICA_RACK': 5, 'TACTICA_HELD': 2,
    'TACTICA_HELD_CONTINGENCY': 3, 'DOCTRINE_DISPLAY': 8,
    'DOCTRINE_BASE_PRICE': 4, 'DOCTRINE_AGING': 1, 'DOCTRINE_MIN_PRICE': 1,
    'T2_POOL': 5, 'T2_UNLOCKABLE': 3, 'GAUL_TRAPS': 2, 'HUN_REPOSITIONS': 2,
    # Rule toggles (tuning levers found by the experiment teams; defaults
    # preserve the original spec behavior so historical runs reproduce)
    'ZOC_ENABLED': 1,        # C-043 ZoC movement arrest (ablation toggle)
    'SIEGE_PUSH_UNITS': 1,   # C-042: 0 = siege shots push structures only,
                             # never units (fixes the perma-kite engine)
    'CHARGE_ADJ_OK': 1,      # D-10/C-043: 0 = a CHARGE against a target the
                             # charger starts the Pulse adjacent to degrades
                             # to MELEE (kills the zero-risk re-charge loop)
    'EXHAUSTED_CARRY': 0,    # C-046: 1 = Exhausted units may still CARRY a
                             # Stake (they still never CONTEST), so a fully
                             # starved endgame cannot freeze the frontier
    'R1_REQUIRE_ENGAGE': 0,  # metric A: 1 = the round-1 damage-basis
                             # fallback counts only if BOTH sides dealt >=1
                             # unit damage (a passive chip is not a "win")
}

ARCHES = ('spear', 'sword', 'cav', 'archer', 'siege')
# counter triangle: attacker arch -> countered arch (C-038)
COUNTERS = {'spear': 'cav', 'cav': 'archer', 'archer': 'spear'}


def base_costs(C):
    return {'spear': C['COST_SPEARMAN'], 'sword': C['COST_SWORDSMAN'],
            'archer': C['COST_ARCHER'], 'cav': C['COST_CAVALRY'],
            'siege': C['COST_SIEGE'], 'hero': 9}


def arch_stats(C):
    """arch -> (atk, hp, mv, rng_min, rng_max).  Archer shoots at exactly
    distance 2 (a distance-1 archer attack is melee, D-41)."""
    return {
        'spear': (C['SPEAR_ATK'], C['SPEAR_HP'], C['SPEAR_MV'], 1, 1),
        'sword': (C['SWORD_ATK'], C['SWORD_HP'], C['SWORD_MV'], 1, 1),
        'cav': (C['CAV_ATK'], C['CAV_HP'], C['CAV_MV'], 1, 1),
        'archer': (C['ARCHER_ATK'], C['ARCHER_HP'], C['ARCHER_MV'],
                   2, C['ARCHER_RNG_MAX']),
        'siege': (C['SIEGE_ATK'], C['SIEGE_HP'], C['SIEGE_MV'],
                  C['SIEGE_RNG_MIN'], C['SIEGE_RNG_MAX']),
        'hero': (C['HERO_ATK'], C['HERO_HP'], C['HERO_MV'], 1, 1),
    }


class GameOver(Exception):
    def __init__(self, winner, wtype):
        self.winner = winner
        self.wtype = wtype


class ClashEnd(Exception):
    pass


class Unit:
    __slots__ = ('uid', 'owner', 'arch', 'base_atk', 'base_guard', 'hp',
                 'max_hp', 'mv', 'rmin', 'rmax', 'pos', 'exhausted', 'braced',
                 'xp', 'tier1', 'tier2', 'wounded_round', 'face_down')

    def __init__(self, uid, owner, arch, stats):
        atk, hp, mv, rmin, rmax = stats
        self.uid = uid
        self.owner = owner
        self.arch = arch
        self.base_atk = atk
        self.base_guard = 0
        self.hp = hp
        self.max_hp = hp
        self.mv = mv
        self.rmin = rmin
        self.rmax = rmax
        self.pos = None
        self.exhausted = False
        self.braced = False
        self.xp = 0
        self.tier1 = False
        self.tier2 = False
        self.wounded_round = None
        self.face_down = False


# ---------------------------------------------------------------------------
# Geometry helpers
# ---------------------------------------------------------------------------

def manh(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])


def in_bounds(pos):
    return 0 <= pos[0] < 8 and 0 <= pos[1] < 8


def neighbors(pos):
    c, r = pos
    out = []
    if c > 0:
        out.append((c - 1, r))
    if c < 7:
        out.append((c + 1, r))
    if r > 0:
        out.append((c, r - 1))
    if r < 7:
        out.append((c, r + 1))
    return out


# ---------------------------------------------------------------------------
# Game state
# ---------------------------------------------------------------------------

class Game:
    def __init__(self, bots, seed, overrides=None, terrain_seed=None):
        C = dict(CONSTANTS)
        if overrides:
            C.update(overrides)
        self.C = C
        self.seed = seed
        self.bots = bots                    # [bot_for_player0, bot_for_player1]
        self.stats = arch_stats(C)
        self.costs = base_costs(C)
        self.units = {}
        self.next_uid = 0
        self.board = {}                     # pos -> uid
        self.stakes = [C['STAKE_START']] * 8
        self.fields = {}                    # pos -> {'type','owner','annexed'}
        self.palisades = {}                 # col -> owner
        self.entrench = {}                  # (col,row) -> hold-count for the tile's owner (C-058b)
        self.res = [{'supply': C['START_SUPPLY'], 'crop': C['START_CROP'],
                     'tribute': 0} for _ in range(2)]
        self.copies = {a: 0 for a in ARCHES}
        self.unlocked = [{'sword', 'spear'}, {'sword', 'spear'}]  # D-29 baseline
        self.wagons = [[], []]              # per player: {'col','row','hp'}
        self.wagon_at = {}                  # pos -> (player, idx)
        self.komi = 1                       # Player 2 starts as komi-holder (C-005)
        self.round = 1
        self.standard_bearer = [None, None]
        self.last_stand_used = [False, False]
        self.extra_deploy = [0, 0]
        self.recruit_discount = [0, 0]
        self.wards = []
        # terrain (module M-04; default flat)
        self.terrain_on = terrain_seed is not None
        self.ttype = {}                     # pos -> 'hills'|'woods'|'road' (open omitted)
        self.rivers = set()                 # frozenset({posA,posB}) edges
        if self.terrain_on:
            self._gen_terrain(terrain_seed)
        # artifact pool order, seeded (C-079 / D-48)
        import random as _r
        rng = _r.Random(seed)
        self.artifact_order = list(range(1, C['ARTIFACT_POOL'] + 1))
        rng.shuffle(self.artifact_order)
        # per-round trackers
        self.cap_dmg = [0, 0]               # wagon dmg counted vs breach cap
        self.wagon_dmg_round = [0, 0]       # all wagon dmg dealt (golden goal)
        self.rows_lost_round = [0, 0]
        self.rows_taken_round = [0, 0]
        self.unit_dmg_round = [0, 0]
        # metrics
        self.lead_trace = []                # per round: 0 / 1 / None
        self.r1_winner = None
        self.r1_rows_winner = None          # rows-basis-only reading (metric A)
        self.last_wagon_kill_src = None

    # -- terrain ------------------------------------------------------------

    def _gen_terrain(self, tseed):
        import random as _r
        rng = _r.Random(tseed)
        for c in range(8):
            for r in (2, 3):                # P1-side middle rows; mirror to 5,4
                roll = rng.random()
                if roll < 0.18:
                    t = 'hills'
                elif roll < 0.34:
                    t = 'woods'
                elif roll < 0.44:
                    t = 'road'
                else:
                    t = None
                if t:
                    self.ttype[(c, r)] = t
                    self.ttype[(c, 7 - r)] = t
        for c in range(8):                  # mirrored river edge pairs
            if rng.random() < 0.15:
                self.rivers.add(frozenset({(c, 2), (c, 3)}))
                self.rivers.add(frozenset({(c, 4), (c, 5)}))

    # -- basic queries --------------------------------------------------------

    def new_unit(self, owner, arch):
        u = Unit(self.next_uid, owner, arch, self.stats[arch])
        self.next_uid += 1
        self.units[u.uid] = u
        return u

    def place(self, u, pos):
        self.board[pos] = u.uid
        u.pos = pos

    def move_unit(self, u, pos):
        del self.board[u.pos]
        self.board[pos] = u.uid
        u.pos = pos

    def occupied(self, pos):
        return pos in self.board or pos in self.wagon_at

    def on_board(self, owner=None):
        out = [self.units[uid] for uid in self.board.values()]
        if owner is not None:
            out = [u for u in out if u.owner == owner]
        out.sort(key=lambda u: u.pos)
        return out

    def reserve(self, owner):
        return sorted((u for u in self.units.values()
                       if u.pos is None and u.owner == owner),
                      key=lambda u: u.uid)

    def territory_of(self, pos):
        return 0 if pos[1] < self.stakes[pos[0]] else 1

    def beyond_own(self, u):
        return self.territory_of(u.pos) != u.owner

    def heartland_rows(self, p):
        return (0, 1) if p == 0 else (6, 7)

    def back_row(self, p):
        return 0 if p == 0 else 7

    def wagons_alive(self, p):
        return sum(1 for w in self.wagons[p] if w['hp'] > 0)

    def wagon_hp(self, p):
        return sum(max(0, w['hp']) for w in self.wagons[p])

    def owned_rows(self, p):
        return sum(self.stakes) if p == 0 else sum(8 - k for k in self.stakes)

    def standard_unit(self, p):
        hero = next((u for u in self.units.values()
                     if u.owner == p and u.arch == 'hero'), None)
        if hero is not None and hero.pos is not None:
            return hero
        sb = self.standard_bearer[p]
        if sb is not None:
            u = self.units.get(sb)
            if u is not None and u.pos is not None:
                return u
        return None

    def unbroken(self, u):
        return u.pos is not None and not u.exhausted

    def lone_runner(self, u):
        rad = self.C['LONE_RUNNER_RADIUS']
        for v in self.units.values():
            if v.uid != u.uid and v.owner == u.owner and v.pos is not None \
                    and manh(v.pos, u.pos) <= rad:
                return False
        return True

    def carry_eligible(self, u):
        if u.pos is None or self.lone_runner(u):
            return False
        # EXHAUSTED_CARRY toggle (C-046 amendment): Exhausted units may still
        # carry (they never contest), so total starvation can't freeze stakes
        return (not u.exhausted) or bool(self.C.get('EXHAUSTED_CARRY', 0))

    def exhaustion_penalty(self, rnd=None):
        C = self.C
        r = self.round if rnd is None else rnd
        if r < C['EXHAUSTION_START_ROUND']:
            return 0
        p = C['EXHAUSTION_INITIAL']
        if r >= C['EXHAUSTION_ACCEL_ROUND']:
            p += C['EXHAUSTION_ACCEL'] * (r - C['EXHAUSTION_ACCEL_ROUND'] + 1)
        return p

    # -- combat math ----------------------------------------------------------

    def counter(self, a_arch, t_arch):
        return self.C['MOD_COUNTER'] if COUNTERS.get(a_arch) == t_arch else 0

    def flanked(self, t):
        n = 0
        for nb in neighbors(t.pos):
            uid = self.board.get(nb)
            if uid is not None and self.units[uid].owner != t.owner:
                n += 1
        return n >= self.C['FLANK_THRESHOLD']

    def has_adjacent_friend(self, u):
        for nb in neighbors(u.pos):
            uid = self.board.get(nb)
            if uid is not None and self.units[uid].owner == u.owner:
                return True
        return False

    def eff_guard(self, u, vs_shoot=False):
        C = self.C
        b = 0
        if not self.beyond_own(u) and self.has_adjacent_friend(u):
            b += C['MOD_SUPPORT']
        if u.braced:
            b += C['MOD_BRACE_GUARD']
        if self.terrain_on:
            t = self.ttype.get(u.pos)
            if t == 'hills':
                b += C['MOD_HILL']
            if t == 'woods' and vs_shoot:
                b += 1
        g = u.base_guard + min(C['GUARD_CAP'], b)
        if u.exhausted:
            g -= C['EXHAUST_GUARD_PENALTY']
        return max(0, g)

    def eff_atk(self, a, t, charge=False, melee=False):
        C = self.C
        b = self.counter(a.arch, t.arch)
        if charge:
            b += C['MOD_CHARGE']
        if self.flanked(t):
            b += C['MOD_FLANK']
        atk = a.base_atk + min(C['ATK_BONUS_CAP'], b)
        if a.exhausted:
            atk -= C['EXHAUST_ATK_PENALTY']
        if melee and self.terrain_on and \
                frozenset({a.pos, t.pos}) in self.rivers:
            atk -= C['MOD_RIVER']
        return max(0, atk)

    def attack_damage(self, a, t, charge=False, melee=False):
        dmg = self.eff_atk(a, t, charge, melee) - \
            self.eff_guard(t, vs_shoot=not melee and not charge)
        floor = self.C['FLANK_MIN_DMG'] if self.flanked(t) else 0
        return max(floor, dmg)

    # -- damage application ----------------------------------------------------

    def apply_damage(self, instances, contrib):
        """instances: list of (src_uid_or_None, tgt_uid, dmg). Computed against
        the start-of-sub-phase state by the caller; applied 'at once' here.
        Sequential application in deterministic order only matters for
        Shieldbearer wards (first lethal instance, C-051)."""
        def key(inst):
            src, tgt, _ = inst
            tu = self.units[tgt]
            sp = self.units[src].pos if src is not None else (-1, -1)
            return (tu.pos, sp if sp is not None else (-1, -1))
        for src, tgt, dmg in sorted(instances, key=key):
            tu = self.units[tgt]
            self._damage_unit(tu, dmg, src, contrib)

    def _damage_unit(self, tu, dmg, src, contrib):
        """Apply ONE damage instance to a unit, consulting Shieldbearer wards
        (C-051: the first instance that would reduce the warded unit to
        HP <= 0 -- attack, retaliation, OR displacement damage -- is
        redirected in full onto an adjacent friendly Spear/Sword)."""
        if dmg <= 0 or tu.pos is None:
            return
        ward = next((w for w in self.wards
                     if w['uid'] == tu.uid and w['active']), None)
        if ward and tu.hp - dmg <= 0:
            ward['active'] = False
            bearer = self._ward_bearer(tu)
            if bearer is not None:
                tu = bearer                # full redirect
        tu.hp -= dmg
        contrib[(src, tu.uid)] += dmg
        if src is not None:
            su = self.units[src]
            if su.owner != tu.owner:
                self.unit_dmg_round[su.owner] += dmg

    def _ward_bearer(self, tu):
        cands = []
        for nb in neighbors(tu.pos):
            uid = self.board.get(nb)
            if uid is None:
                continue
            v = self.units[uid]
            if v.owner == tu.owner and v.arch in ('spear', 'sword'):
                cands.append(v)
        if not cands:
            return None
        cands.sort(key=lambda v: (-v.hp, v.pos))
        return cands[0]

    def remove_dead(self, contrib):
        removed = []
        for u in list(self.on_board()):
            if u.hp <= 0:
                del self.board[u.pos]
                u.pos = None
                u.braced = False
                u.exhausted = False
                u.wounded_round = self.round
                removed.append(u)
        for v in removed:
            for (src, tgt), d in contrib.items():
                if tgt == v.uid and d >= 1 and src is not None:
                    a = self.units[src]
                    if a.owner != v.owner:
                        self.gain_xp(a, self.C['XP_PER_WOUND'])

    def gain_xp(self, u, n):
        C = self.C
        u.xp += n
        if not u.tier1 and u.xp >= C['XP_TIER1']:
            self.grant_tier(u)
        if not u.tier2 and u.xp >= C['XP_TIER2']:
            self.grant_tier(u)

    def grant_tier(self, u):
        C = self.C
        if not u.tier1:
            u.tier1 = True
            u.max_hp += C['PROMO_T1_HP']
            u.hp = min(u.hp + 1, u.max_hp)
        elif not u.tier2:
            u.tier2 = True
            choice = self.bots[u.owner].promo_t2(self, u.owner, u)
            if choice == 'guard':
                u.base_guard += C['PROMO_T2_STAT']
            else:
                u.base_atk += C['PROMO_T2_STAT']

    # -- displacement -----------------------------------------------------------

    def apply_pushes(self, pushes, contrib):
        """pushes: list of {'uid','dir','pusher','kind','charger','tgt_tile'}.
        Applied after damage + removal, in scan order of pushed unit's tile."""
        C = self.C
        def key(p):
            u = self.units[p['uid']]
            return u.pos if u.pos is not None else p.get('tgt_tile', (9, 9))
        for p in sorted(pushes, key=key):
            u = self.units[p['uid']]
            if u.pos is None:
                # charge target died before displacement: charger still punches
                # through into the vacated tile if free (push-through intent)
                if p['kind'] == 'charge' and p.get('charger') is not None:
                    ch = self.units[p['charger']]
                    tile = p.get('tgt_tile')
                    if ch.pos is not None and tile and not self.occupied(tile):
                        self.move_unit(ch, tile)
                continue
            dc, dr = p['dir']
            dest = (u.pos[0] + dc, u.pos[1] + dr)
            src_uid = p.get('pusher')
            if not in_bounds(dest) or self.occupied(dest):
                # displacement damage is a damage instance: ward-eligible (C-051)
                self._damage_unit(u, C['DISPLACE_DMG'], src_uid, contrib)
                buid = self.board.get(dest)
                if buid is not None:
                    bu = self.units[buid]
                    self._damage_unit(bu, C['DISPLACE_DMG'], src_uid, contrib)
                continue
            old = u.pos
            crossed_river = self.terrain_on and \
                frozenset({old, dest}) in self.rivers
            self.move_unit(u, dest)
            u.braced = False
            if crossed_river:
                self._damage_unit(u, C['RIVER_PUSH_DMG'], src_uid, contrib)
            if p['kind'] == 'charge' and p.get('charger') is not None:
                ch = self.units[p['charger']]
                if ch.pos is not None and not self.occupied(old):
                    self.move_unit(ch, old)

    # -- wagons ------------------------------------------------------------------

    def cap_remaining(self, p):
        C = self.C
        cap = C['BREACH_CAP_LATE'] if self.round >= C['BREACH_CAP_RISE_ROUND'] \
            else C['BREACH_CAP']
        return cap - self.cap_dmg[p]

    def damage_wagon(self, attacker, owner, idx, capped=True):
        """1 point of wagon damage. Returns True if it landed."""
        w = self.wagons[owner][idx]
        if w['hp'] <= 0:
            return False
        if capped:
            if self.cap_remaining(attacker) <= 0:
                return False
            self.cap_dmg[attacker] += 1
        self.wagon_dmg_round[attacker] += 1
        w['hp'] -= 1
        if w['hp'] <= 0:
            pos = (w['col'], self.back_row(owner))
            self.wagon_at.pop(pos, None)
            self.res[attacker]['supply'] += self.C['WAGON_BOUNTY']
            self.last_wagon_kill_src = 'normal'
            if not self.last_stand_used[owner] and self.wagons_alive(owner) > 0:
                self.last_stand_used[owner] = True
                self.resolve_last_stand(owner)
        return True

    def wagon_win_check(self, wtype):
        a0, a1 = self.wagons_alive(0), self.wagons_alive(1)
        if a0 == 0 and a1 == 0:
            raise GameOver(self.komi, wtype)      # C-072
        if a1 == 0:
            raise GameOver(0, wtype)
        if a0 == 0:
            raise GameOver(1, wtype)

    def resolve_last_stand(self, p):
        boon = self.bots[p].last_stand(self, p)
        if boon == 1:                              # RALLY
            for u in self.reserve(p):
                tile = self._free_heartland_tile(p)
                if tile is None:
                    break
                u.hp = u.max_hp
                u.exhausted = False
                u.braced = False
                u.face_down = False
                u.wounded_round = None
                self.place(u, tile)
            self.extra_deploy[p] += 1
        elif boon == 2:                            # VETERANCY (baseline B2)
            cands = [u for u in self.on_board(p) if not u.tier2]
            if cands:
                cands.sort(key=lambda u: (-u.xp, -self.costs[u.arch], u.pos))
                self.grant_tier(cands[0])
        else:                                      # ENTRENCH (baseline B3)
            cols = self.bots[p].entrench_cols(self, p)
            placed = 0
            for c in cols:
                if placed >= self.C['ENTRENCH_PALISADES']:
                    break
                if 0 <= c < 8 and c not in self.palisades:
                    self.palisades[c] = p
                    placed += 1

    def _free_heartland_tile(self, p):
        for c in range(8):
            for r in self.heartland_rows(p):
                if not self.occupied((c, r)):
                    return (c, r)
        return None

    # -----------------------------------------------------------------------
    # Setup
    # -----------------------------------------------------------------------

    def setup(self):
        C = self.C
        for p in (0, 1):
            plan = self.bots[p].setup(self, p)
            rows = self.heartland_rows(p)
            back = self.back_row(p)
            # wagons: 3 distinct columns on the back row
            cols = []
            for c in plan.get('wagons', []):
                if 0 <= c < 8 and c not in cols:
                    cols.append(c)
            for c in range(8):
                if len(cols) >= C['WAGON_COUNT']:
                    break
                if c not in cols:
                    cols.append(c)
            cols = cols[:C['WAGON_COUNT']]
            for i, c in enumerate(cols):
                self.wagons[p].append({'col': c, 'row': back, 'hp': C['WAGON_HP']})
                self.wagon_at[(c, back)] = (p, i)
            # starting force: Hero + signature (Spearman, D-29) + 2 Swordsmen
            want = ['hero', 'spear', 'sword', 'sword']
            placements = list(plan.get('units', []))
            for arch in want:
                pos = None
                for (a, ppos) in placements:
                    if a == arch and ppos[1] in rows and in_bounds(ppos) \
                            and not self.occupied(ppos):
                        pos = ppos
                        placements.remove((a, ppos))
                        break
                if pos is None:
                    pos = self._free_heartland_tile(p)
                u = self.new_unit(p, arch)
                self.place(u, pos)

    # -----------------------------------------------------------------------
    # Phase 1: Muster
    # -----------------------------------------------------------------------

    def compute_harvest(self, p, rnd=None):
        C = self.C
        P = self.exhaustion_penalty(rnd)
        sup = crop = 0
        own_fields = []
        for pos, f in self.fields.items():
            controller = f['annexed'] if f['annexed'] is not None else f['owner']
            if controller != p or self.territory_of(pos) != p:
                continue
            y = C['ANNEX_YIELD'] if f['annexed'] == p else C['FIELD_YIELD']
            if f['type'] == 'crop':
                crop += max(0, y - P)
            else:
                sup += y
            if f['annexed'] is None and f['owner'] == p:
                own_fields.append((pos, f['type']))
        # farmsteads: connected same-type groups of >=3 (C-021)
        seen = set()
        fmap = dict(own_fields)
        for pos, t in own_fields:
            if pos in seen:
                continue
            comp = [pos]
            seen.add(pos)
            stack = [pos]
            while stack:
                cur = stack.pop()
                for nb in neighbors(cur):
                    if nb not in seen and fmap.get(nb) == t:
                        seen.add(nb)
                        comp.append(nb)
                        stack.append(nb)
            if len(comp) >= C['FARMSTEAD_SIZE']:
                if t == 'crop':
                    crop += max(0, C['FARMSTEAD_BONUS'] - P)
                else:
                    sup += C['FARMSTEAD_BONUS']
        return sup, crop

    def muster_player(self, p):
        C = self.C
        bot = self.bots[p]
        res = self.res[p]
        # (a) Harvest
        sup, crop = self.compute_harvest(p)
        res['supply'] += sup
        res['crop'] += crop
        # (b) Upkeep
        mine = self.on_board(p)
        # validate + dedupe the bot's feed list: each unit is charged upkeep
        # exactly once (C-023), regardless of malformed duplicate uids
        order = []
        seen = set()
        for uid in bot.feed_order(self, p):
            if (uid in seen or uid not in self.units
                    or self.units[uid].owner != p
                    or self.units[uid].pos is None):
                continue
            seen.add(uid)
            order.append(uid)
        for u in mine:
            if u.uid not in seen:
                order.append(u.uid)
        avail = res['crop']
        for uid in order:
            u = self.units[uid]
            cost = C['UPKEEP_CROP'] + \
                (C['SUPPLY_STRAIN_CROP'] if self.beyond_own(u) else 0)
            if avail >= cost:
                avail -= cost
                u.exhausted = False
            else:
                u.exhausted = True
        res['crop'] = avail
        # (c) Build
        acts = bot.build(self, p)[:C['BUILD_ACTIONS']]
        for act in acts:
            if not act:
                continue
            if act[0] == 'field':
                _, pos, ftype = act
                if (in_bounds(pos) and self.territory_of(pos) == p
                        and pos not in self.fields and pos not in self.wagon_at
                        and res['supply'] >= C['FIELD_COST']
                        and ftype in ('supply', 'crop')):
                    res['supply'] -= C['FIELD_COST']
                    self.fields[pos] = {'type': ftype, 'owner': p, 'annexed': None}
            elif act[0] == 'palisade':
                col = act[1]
                if 0 <= col < 8 and col not in self.palisades \
                        and res['supply'] >= C['PALISADE_COST']:
                    res['supply'] -= C['PALISADE_COST']
                    self.palisades[col] = p
        # (d) Reinforce
        r = bot.reinforce(self, p)
        # tribute -> supply
        n = min(int(r.get('tribute_spend', 0)), res['tribute'])
        if n > 0:
            res['tribute'] -= n
            res['supply'] += n * C['TRIBUTE_SUPPLY_VALUE']
        # automatic wounded returns (wounded round N -> free at Muster N+2)
        for u in self.reserve(p):
            if u.wounded_round is not None and \
                    u.wounded_round <= self.round - C['WOUND_RETURN_DELAY']:
                tile = self._free_heartland_tile(p)
                if tile is None:
                    break
                u.hp = u.max_hp
                u.wounded_round = None
                self.place(u, tile)
        # rush returns (1 Crop, wounded last round)
        for uid in r.get('rush', []):
            u = self.units.get(uid)
            if (u is not None and u.owner == p and u.pos is None
                    and u.wounded_round == self.round - 1
                    and res['crop'] >= C['RUSH_RETURN_COST']):
                tile = self._free_heartland_tile(p)
                if tile is None:
                    break
                res['crop'] -= C['RUSH_RETURN_COST']
                u.hp = u.max_hp
                u.wounded_round = None
                self.place(u, tile)
        # unlocks (paid, no build action; C-026)
        for arch in r.get('unlocks', []):
            if arch not in ARCHES or arch in self.unlocked[p]:
                continue
            ncur = len(self.unlocked[p])
            cost = {2: C['UNLOCK_3RD'], 3: C['UNLOCK_4TH'],
                    4: C['UNLOCK_5TH']}.get(ncur)
            if cost is not None and res['supply'] >= cost:
                res['supply'] -= cost
                self.unlocked[p].add(arch)
        # recruits (shared finite copies, surcharge per copy bought; C-025)
        deploy_cap = C['DEPLOY_MAX'] + self.extra_deploy[p]
        self.extra_deploy[p] = 0
        deployed = 0
        recruited_now = set()
        rows = self.heartland_rows(p)
        for arch, pos in r.get('recruits', []):
            if deployed >= deploy_cap or arch not in ARCHES:
                continue
            if arch not in self.unlocked[p] or \
                    self.copies[arch] >= C['MUSTER_COPIES']:
                continue
            if not in_bounds(pos) or pos[1] not in rows or self.occupied(pos):
                continue
            price = self.costs[arch] + C['COPY_SURCHARGE'] * self.copies[arch]
            if self.recruit_discount[p]:
                price = max(1, price - self.recruit_discount[p])
            if res['supply'] < price:
                continue
            res['supply'] -= price
            if self.recruit_discount[p]:
                self.recruit_discount[p] = 0
            self.copies[arch] += 1
            u = self.new_unit(p, arch)
            u.face_down = True
            self.place(u, pos)
            recruited_now.add(u.uid)
            deployed += 1
        # repositions (teleport within own territory; C-028: EXISTING units
        # only -- recruits placed this same Muster sit face-down on the
        # Heartland until the Reveal and can never be repositioned)
        repos = 0
        for uid, pos in r.get('repositions', []):
            if repos >= C['REPOSITION_MAX']:
                break
            u = self.units.get(uid)
            if (u is None or u.owner != p or u.pos is None
                    or uid in recruited_now
                    or not in_bounds(pos) or self.occupied(pos)
                    or self.territory_of(pos) != p):
                continue
            self.move_unit(u, pos)
            u.braced = False
            repos += 1
        # Standard-Bearer designation (C-031)
        hero = next((u for u in self.units.values()
                     if u.owner == p and u.arch == 'hero'), None)
        if hero is None or hero.pos is None:
            pick = bot.standard_bearer(self, p)
            u = self.units.get(pick) if pick is not None else None
            if u is None or u.owner != p or u.pos is None:
                cands = self.on_board(p)
                if cands:
                    cands.sort(key=lambda x: (-self.costs[x.arch], x.pos))
                    u = cands[0]
            self.standard_bearer[p] = u.uid if u is not None else None
        else:
            self.standard_bearer[p] = None

    # -----------------------------------------------------------------------
    # Phase 3: Clash
    # -----------------------------------------------------------------------

    def validate_order(self, u, order):
        C = self.C
        HOLD = ('HOLD',)
        if not order or u.pos is None:
            return HOLD
        kind = order[0]
        if kind == 'HOLD':
            return HOLD
        if kind == 'BRACE':
            return order if u.arch == 'spear' else HOLD
        mv = 0 if u.braced else u.mv

        def ok_path(path, base_mv):
            allowed = base_mv
            if self.terrain_on and base_mv > 0 and len(path) == base_mv + 1 \
                    and all(self.ttype.get(t) == 'road' for t in path):
                allowed = base_mv + 1          # Road: +1 Mv on all-Road paths
            if len(path) > allowed:
                return False
            cur = u.pos
            for step in path:
                if not in_bounds(step) or manh(cur, step) != 1:
                    return False
                cur = step
            return True

        if kind == 'SHOOT':
            if u.arch not in ('archer', 'siege'):
                return HOLD
            tgt = order[1]
            if tgt[0] == 'U':
                t = self.units.get(tgt[1])
                if t is None or t.pos is None or t.owner == u.owner:
                    return HOLD
                if not (u.rmin <= manh(u.pos, t.pos) <= u.rmax):
                    return HOLD
            elif tgt[0] == 'W':
                if u.arch != 'siege':
                    return HOLD
            elif tgt[0] == 'P':
                if u.arch != 'siege':
                    return HOLD
            else:
                return HOLD
            return order
        if kind == 'MOVE':
            path = order[1]
            return order if path and ok_path(path, mv) else HOLD
        if kind == 'MELEE':
            if u.arch == 'siege':
                return HOLD
            tgt, path = order[1], order[2]
            t = self.units.get(tgt)
            if t is None or t.owner == u.owner:
                return HOLD
            if path and not ok_path(path, mv):
                return HOLD
            return ('MELEE', tgt, list(path) if path else [])
        if kind == 'CHARGE':
            if u.arch != 'cav' or u.braced:
                return HOLD
            tgt, path = order[1], order[2]
            t = self.units.get(tgt)
            if t is None or t.owner == u.owner:
                return HOLD
            if not self.C.get('CHARGE_ADJ_OK', 1) and t.pos is not None \
                    and manh(u.pos, t.pos) == 1:
                # rule toggle: cannot charge a target you start the Pulse
                # adjacent to -- the order degrades to a plain MELEE attack
                # (normal retaliation applies)
                return ('MELEE', tgt, [])
            if not path or not ok_path(path, mv):
                return HOLD
            return ('CHARGE', tgt, list(path))
        return HOLD

    def run_pulse(self, pulse):
        o0 = self.bots[0].orders(self, 0, pulse)
        o1 = self.bots[1].orders(self, 1, pulse)
        orders = {}
        for u in self.on_board():
            raw = (o0 if u.owner == 0 else o1).get(u.uid)
            orders[u.uid] = self.validate_order(u, raw)

        # --- Brace sub-phase (C-041) ---
        for u in self.on_board():
            k = orders[u.uid][0]
            if k == 'BRACE':
                u.braced = True
            elif u.braced and k != 'MELEE':
                u.braced = False
        self.end_subphase(defaultdict(int), [])

        # --- Ranged sub-phase (C-042) ---
        contrib = defaultdict(int)
        instances = []
        pushes = []
        wagon_hits = []
        for u in self.on_board():
            o = orders.get(u.uid)
            if not o or o[0] != 'SHOOT':
                continue
            tgt = o[1]
            if tgt[0] == 'U':
                t = self.units.get(tgt[1])
                if t is None or t.pos is None or \
                        not (u.rmin <= manh(u.pos, t.pos) <= u.rmax):
                    continue
                if self.terrain_on and self.ttype.get(t.pos) == 'woods':
                    dmg = max(self.C['FLANK_MIN_DMG'] if self.flanked(t) else 0,
                              self.eff_atk(u, t) - self.eff_guard(t, vs_shoot=True))
                else:
                    dmg = self.attack_damage(u, t)
                instances.append((u.uid, t.uid, dmg))
                if u.arch == 'siege' and self.C.get('SIEGE_PUSH_UNITS', 1):
                    dc, dr = t.pos[0] - u.pos[0], t.pos[1] - u.pos[1]
                    if abs(dc) > abs(dr):
                        d = (1 if dc > 0 else -1, 0)
                    else:
                        d = (0, 1 if dr > 0 else -1)
                    pushes.append({'uid': t.uid, 'dir': d, 'pusher': u.uid,
                                   'kind': 'siege', 'tgt_tile': t.pos})
            elif tgt[0] == 'W':
                owner, idx = tgt[1], tgt[2]
                if owner == u.owner or idx >= len(self.wagons[owner]):
                    continue
                w = self.wagons[owner][idx]
                wpos = (w['col'], self.back_row(owner))
                if w['hp'] > 0 and u.rmin <= manh(u.pos, wpos) <= u.rmax:
                    wagon_hits.append((u.owner, owner, idx))
            elif tgt[0] == 'P':
                col = tgt[1]
                if col in self.palisades:
                    k = self.stakes[col]
                    for tile in ((col, k - 1), (col, k)):
                        if u.rmin <= manh(u.pos, tile) <= u.rmax:
                            del self.palisades[col]
                            break
        for atk_p, owner, idx in wagon_hits:
            self.damage_wagon(atk_p, owner, idx, capped=True)
        if wagon_hits:
            self.wagon_win_check('wagons')
        self.apply_damage(instances, contrib)
        self.end_subphase(contrib, pushes)

        # --- Move/Charge sub-phase (C-043) ---
        contrib = defaultdict(int)
        movers = {}
        for u in self.on_board():
            o = orders.get(u.uid)
            if o and o[0] in ('MOVE', 'MELEE', 'CHARGE'):
                path = o[1] if o[0] == 'MOVE' else o[2]
                if path:
                    movers[u.uid] = {'path': path, 'stopped': False, 'moved': 0}
        maxlen = max((len(m['path']) for m in movers.values()), default=0)
        for t in range(maxlen):
            proposals = {}
            for uid in sorted(movers):
                m = movers[uid]
                u = self.units[uid]
                if m['stopped'] or t >= len(m['path']) or u.pos is None:
                    continue
                dest = m['path'][t]
                if manh(u.pos, dest) != 1:
                    m['stopped'] = True
                    continue
                if self.occupied(dest):
                    m['stopped'] = True
                    continue
                proposals.setdefault(dest, []).append(uid)
            moved_now = []
            for dest in sorted(proposals):
                uids = proposals[dest]
                if len(uids) >= 2:
                    for uid in uids:
                        movers[uid]['stopped'] = True
                else:
                    moved_now.append((uids[0], dest))
            for uid, dest in moved_now:
                u = self.units[uid]
                self.move_unit(u, dest)
                movers[uid]['moved'] += 1
            # ZoC evaluated simultaneously for all units AFTER the whole
            # lockstep step resolves (C-043), so identical shapes resolve
            # identically regardless of tile scan order (C-035: no
            # first-actor asymmetry, ever).
            # ZOC_ENABLED (default 1) is an experiment-only ablation toggle
            # (constants override); baseline behavior is unchanged.
            if not self.C.get('ZOC_ENABLED', 1):
                moved_now = []
            for uid, dest in moved_now:
                u = self.units[uid]
                for nb in neighbors(u.pos):
                    vid = self.board.get(nb)
                    if vid is not None and self.units[vid].owner != u.owner:
                        movers[uid]['stopped'] = True
                        break
        # charge resolution (simultaneous)
        instances = []
        pushes = []
        for uid in sorted(movers):
            o = orders.get(uid)
            if not o or o[0] != 'CHARGE':
                continue
            u = self.units[uid]
            if u.pos is None:
                continue
            t = self.units.get(o[1])
            if (t is None or t.pos is None
                    or movers[uid]['moved'] < self.C['CHARGE_MOVE_MIN']
                    or manh(u.pos, t.pos) != 1):
                continue                       # degrades to MOVE (already moved)
            if self.terrain_on and self.ttype.get(t.pos) == 'woods':
                continue                       # un-chargeable (M-04)
            if t.arch == 'spear' and t.braced:
                # C-045: no damage; charger eats anti-cav retaliation + push-back
                ret = max(0, t.base_atk + self.counter(t.arch, u.arch)
                          - self.eff_guard(u))
                instances.append((t.uid, u.uid, ret))
                d = (u.pos[0] - t.pos[0], u.pos[1] - t.pos[1])
                pushes.append({'uid': u.uid, 'dir': d, 'pusher': t.uid,
                               'kind': 'brace', 'tgt_tile': u.pos})
            else:
                dmg = self.attack_damage(u, t, charge=True, melee=True)
                instances.append((u.uid, t.uid, dmg))
                d = (t.pos[0] - u.pos[0], t.pos[1] - u.pos[1])
                pushes.append({'uid': t.uid, 'dir': d, 'pusher': u.uid,
                               'kind': 'charge', 'charger': u.uid,
                               'tgt_tile': t.pos})
        self.apply_damage(instances, contrib)
        self.end_subphase(contrib, pushes)

        # --- Melee sub-phase (C-044) ---
        contrib = defaultdict(int)
        instances = []
        pushes = []
        attacks = []
        for u in self.on_board():
            o = orders.get(u.uid)
            if not o or o[0] != 'MELEE':
                continue
            t = self.units.get(o[1])
            if t is None or t.pos is None or u.pos is None or \
                    manh(u.pos, t.pos) != 1:
                continue
            attacks.append((u, t))
        for u, t in attacks:
            instances.append((u.uid, t.uid, self.attack_damage(u, t, melee=True)))
            # retaliation (C-044 / D-08), even if the defender dies
            if t.arch in ('archer', 'siege'):
                ret = self.C['RANGED_RETALIATION']
            else:
                ret = max(0, t.base_atk + self.counter(t.arch, u.arch)
                          - self.eff_guard(u))
            instances.append((t.uid, u.uid, ret))
        self.apply_damage(instances, contrib)
        for u, t in attacks:
            if t.arch == 'spear' and t.braced and t.pos is not None \
                    and u.pos is not None and u.hp > 0 and \
                    manh(u.pos, t.pos) == 1:
                d = (u.pos[0] - t.pos[0], u.pos[1] - t.pos[1])
                pushes.append({'uid': u.uid, 'dir': d, 'pusher': t.uid,
                               'kind': 'brace', 'tgt_tile': u.pos})
        self.end_subphase(contrib, pushes)

    def end_subphase(self, contrib, pushes):
        """C-036: removal -> displacement -> removal -> rout test -> win check."""
        self.remove_dead(contrib)
        if pushes:
            self.apply_pushes(pushes, contrib)
            self.remove_dead(contrib)
        self.rout_test()

    def rout_test(self):
        routed = []
        for p in (0, 1):
            s = self.standard_unit(p)
            if s is None:
                continue
            enemy_adj = False
            surrounded = True
            for nb in neighbors(s.pos):
                uid = self.board.get(nb)
                if uid is not None:
                    if self.units[uid].owner != p:
                        enemy_adj = True
                    else:
                        surrounded = False
                        break
                elif nb in self.wagon_at:
                    pass                      # impassable, counts as filled
                else:
                    surrounded = False
                    break
            if surrounded and enemy_adj:
                routed.append(p)
        if not routed:
            return
        for p in routed:
            attacker = 1 - p
            dmg = self.C['ROUT_WAGON_DMG']
            # C-074 / D-23: Rout damage is distributed among the routed
            # player's Wagons BY THE ROUTING PLAYER (bot hook, with a
            # deterministic lowest-HP fallback for bots without the hook
            # or with invalid picks).
            fn = getattr(self.bots[attacker], 'rout_allocate', None)
            picks = list(fn(self, attacker, p, dmg)) if fn is not None else []
            for _ in range(dmg):
                live = [(i, w) for i, w in enumerate(self.wagons[p])
                        if w['hp'] > 0]
                if not live:
                    break
                idx = None
                while picks:
                    cand = picks.pop(0)
                    if any(i == cand for i, _ in live):
                        idx = cand
                        break
                if idx is None:
                    live.sort(key=lambda iw: (iw[1]['hp'], iw[0]))
                    idx = live[0][0]
                self.damage_wagon(attacker, p, idx, capped=False)
        self.wagon_win_check('rout')
        raise ClashEnd()

    # -- interventions -----------------------------------------------------------

    def intervention_window(self, wno):
        C = self.C
        for p in (self.komi, 1 - self.komi):
            iv = self.bots[p].intervention(self, p, wno)
            if not iv:
                continue
            res = self.res[p]
            if iv[0] == 'SURGE' and res['tribute'] >= C['SURGE_COST']:
                u = self.units.get(iv[1])
                dest = iv[2]
                if (u is not None and u.owner == p and u.pos is not None
                        and in_bounds(dest) and manh(u.pos, dest) == 1
                        and not self.occupied(dest)):
                    res['tribute'] -= C['SURGE_COST']
                    self.move_unit(u, dest)
            elif iv[0] == 'SHIELDBEARER' and res['tribute'] >= C['SHIELDBEARER_COST']:
                u = self.units.get(iv[1])
                if u is not None and u.owner == p and u.pos is not None:
                    res['tribute'] -= C['SHIELDBEARER_COST']
                    self.wards.append({'uid': u.uid, 'owner': p, 'active': True})

    def clash(self):
        self.wards = []
        try:
            self.intervention_window(1)
            self.run_pulse(1)
            self.intervention_window(2)
            self.run_pulse(2)
            self.intervention_window(3)
        except ClashEnd:
            pass
        self.wards = []

    # -----------------------------------------------------------------------
    # Phase 4: Frontier
    # -----------------------------------------------------------------------

    def column_claims(self, c):
        """Returns (p1_claim, p2_claim) for column c (C-055)."""
        k = self.stakes[c]
        p1_carry = p2_carry = False
        p1_contest_far = p2_contest_far = False   # in enemy half (rows >= k)
        p1_contest_near = p2_contest_near = False  # in P1 half (rows < k)
        for r in range(8):
            uid = self.board.get((c, r))
            if uid is None:
                continue
            u = self.units[uid]
            contests = self.unbroken(u)
            carries = self.carry_eligible(u)
            if not contests and not carries:
                continue
            if u.owner == 0:
                if r >= k:
                    if contests:
                        p1_contest_far = True
                    if carries:
                        p1_carry = True
                elif contests:
                    p1_contest_near = True
            else:
                if r < k:
                    if contests:
                        p2_contest_near = True
                    if carries:
                        p2_carry = True
                elif contests:
                    p2_contest_far = True
        p1_claim = p1_carry and not p2_contest_far
        p2_claim = p2_carry and not p1_contest_near
        return p1_claim, p2_claim

    def frontier(self):
        C = self.C
        transfers = []
        for c in range(8):
            k = self.stakes[c]
            p1_claim, p2_claim = self.column_claims(c)
            if p1_claim == p2_claim:
                continue                       # both or neither: stake holds
            mover = 0 if p1_claim else 1
            newk = k + 1 if mover == 0 else k - 1
            if not (C['STAKE_MIN'] <= newk <= C['STAKE_MAX']):
                continue                       # clamped: no step, no row lost
            pushed = 1 - mover
            if self.palisades.get(c) == pushed:
                del self.palisades[c]          # absorption (C-058)
                continue
            taken = (c, k) if mover == 0 else (c, k - 1)   # tile the pushed player loses
            if C['ENTRENCH_HOLD'] and self.entrench.get(taken, 0) >= C['ENTRENCH_HOLD']:
                self.entrench[taken] = 0       # crack-then-yield, one-shot (C-058b)
                continue                       # stake holds, no row lost this column
            self.stakes[c] = newk
            self.rows_lost_round[pushed] += 1
            self.rows_taken_round[mover] += 1
            tile = (c, k) if mover == 0 else (c, k - 1)
            transfers.append((mover, tile))
        # Trample (C-059..C-061)
        for mover, tile in transfers:
            f = self.fields.get(tile)
            if not f:
                continue
            if f['owner'] == mover:
                if f['annexed'] is not None:
                    f['annexed'] = None        # reversion, not a trample (D-43)
                continue
            controller = f['annexed'] if f['annexed'] is not None else f['owner']
            if controller == mover:
                continue
            choice = self.bots[mover].trample_choice(self, mover, tile, f)
            if choice == 'annex':
                f['annexed'] = mover
            else:
                self.res[mover][f['type']] += C['RAID_GAIN']
                del self.fields[tile]
        # Breach (C-062..C-064), komi-holder's breachers first, win checks instant
        for p in (self.komi, 1 - self.komi):
            enemy = 1 - p
            rows = self.heartland_rows(enemy)
            breachers = [u for u in self.on_board(p) if u.pos[1] in rows]
            hit = False
            for u in breachers:
                if self.cap_remaining(p) <= 0:
                    break
                live = [(i, w) for i, w in enumerate(self.wagons[enemy])
                        if w['hp'] > 0]
                if not live:
                    break
                same = [iw for iw in live if iw[1]['col'] == u.pos[0]]
                if same:
                    idx = same[0][0]
                else:
                    # nearest Wagon by column distance; distance ties broken
                    # by the BREACHING PLAYER's choice (C-063 / D-23), with a
                    # deterministic lowest-column fallback
                    best_d = min(abs(iw[1]['col'] - u.pos[0]) for iw in live)
                    tied = sorted((iw for iw in live
                                   if abs(iw[1]['col'] - u.pos[0]) == best_d),
                                  key=lambda iw: iw[1]['col'])
                    idx = tied[0][0]
                    if len(tied) > 1:
                        fn = getattr(self.bots[p], 'breach_target', None)
                        if fn is not None:
                            pick = fn(self, p, u, list(tied))
                            if any(i == pick for i, _ in tied):
                                idx = pick
                hit |= self.damage_wagon(p, enemy, idx, capped=True)
            if hit:
                self.wagon_win_check('wagons')

    # -----------------------------------------------------------------------
    # Phase 5: Pass & Tribute (+ caravans)
    # -----------------------------------------------------------------------

    def caravan(self, which):
        C = self.C
        n = C['CARAVAN_ARTIFACTS']
        start = 0 if which == 1 else n
        options = list(self.artifact_order[start:start + n])
        # trailing: fewer wagons -> fewer owned rows -> komi-holder (C-078)
        def rank(p):
            return (self.wagons_alive(p), self.owned_rows(p),
                    0 if p == self.komi else 1)
        trailing = min((0, 1), key=rank)
        order = [trailing, 1 - trailing, trailing]
        for p in order:
            if not options:
                break
            pick = self.bots[p].artifact_pick(self, p, list(options))
            if pick not in options:
                pick = options[0]
            options.remove(pick)
            self.apply_artifact(p, pick)
        # 4th discarded

    def apply_artifact(self, p, aid):
        C = self.C
        res = self.res[p]
        if aid == 1:
            res['supply'] += C['ARTIFACT_SUPPLY']
        elif aid == 2:
            res['crop'] += C['ARTIFACT_CROP']
        elif aid == 3:
            hero = next((u for u in self.units.values()
                         if u.owner == p and u.arch == 'hero'), None)
            if hero is not None:
                hero.base_guard += 1
        elif aid == 4:
            cands = self.on_board(p)
            if cands:
                cands.sort(key=lambda u: (-u.xp, -self.costs[u.arch], u.pos))
                self.gain_xp(cands[0], C['ARTIFACT_XP'])
        elif aid == 5:
            cols = self.bots[p].entrench_cols(self, p)
            for c in cols:
                if 0 <= c < 8 and c not in self.palisades:
                    self.palisades[c] = p
                    break
        elif aid == 6:
            res['tribute'] += C['ARTIFACT_TRIBUTE']
        elif aid == 7:
            self.recruit_discount[p] = C['ARTIFACT_DISCOUNT']
        elif aid == 8:
            sup, crop = self.compute_harvest(p)
            ftype = 'crop' if crop < len(self.on_board(p)) else 'supply'
            for c in range(8):
                for r in self.heartland_rows(p):
                    pos = (c, r)
                    if pos not in self.fields and pos not in self.wagon_at:
                        self.fields[pos] = {'type': ftype, 'owner': p,
                                            'annexed': None}
                        return

    # -----------------------------------------------------------------------
    # Round driver
    # -----------------------------------------------------------------------

    def lead_holder(self):
        # Mirror the ladder win-rule (C-071): wagons -> wagon_hp -> owned rows.
        # NB: total army_hp is deliberately NOT a tiebreaker -- it flips on a
        # single point of combat attrition and is not part of how the game
        # decides who is ahead, so including it turned contract B into noise.
        # A residual tie is 'contested' (None), not a lead for either side.
        def score(p):
            return (self.wagons_alive(p), self.wagon_hp(p), self.owned_rows(p))
        s0, s1 = score(0), score(1)
        if s0 > s1:
            return 0
        if s1 > s0:
            return 1
        return None

    def update_entrench(self):
        """C-058b growth: forward ground still held at round-end hardens, capped
        at ENTRENCH_HOLD. Rebuilt from current stakes each round so a tile that
        left its owner's forward zone (retreat or flip) drops to nothing. Forward
        zones are disjoint (P1: row >= STAKE_START, P2: row < STAKE_START), so a
        flipped tile is never re-counted for the new owner."""
        C = self.C
        if not C['ENTRENCH_HOLD']:
            return
        start = C['STAKE_START']
        new = {}
        for c in range(8):
            k = self.stakes[c]
            if k > start:                 # P1 forward tiles: rows start..k-1
                rows = range(start, k)
            elif k < start:               # P2 forward tiles: rows k..start-1
                rows = range(k, start)
            else:
                continue                  # at the line: no forward ground
            for r in rows:
                new[(c, r)] = min(self.entrench.get((c, r), 0) + 1, C['ENTRENCH_HOLD'])
        self.entrench = new

    def _checkpoint(self, label):
        """Per-phase parity hook (no-op unless self._phase_cb is attached).
        The golden oracle (parity/dump_golden.py) installs a callback to record
        a canonical state hash after each phase, so the TypeScript port can be
        parity-tested phase-by-phase, not just per-round. Pure observation —
        never mutates state, so the default (no callback) path is identical."""
        cb = getattr(self, '_phase_cb', None)
        if cb:
            cb(label, self)

    def play_round(self):
        C = self.C
        self.cap_dmg = [0, 0]
        self.wagon_dmg_round = [0, 0]
        self.rows_lost_round = [0, 0]
        self.rows_taken_round = [0, 0]
        self.unit_dmg_round = [0, 0]
        # Phase 1: Muster (komi-holder first; see header note)
        self.muster_player(self.komi)
        self.muster_player(1 - self.komi)
        self._checkpoint('muster')
        # Phase 2: Reveal
        for u in self.units.values():
            u.face_down = False
        self._checkpoint('reveal')
        # Phase 3: Clash
        self.clash()
        self._checkpoint('clash')
        # Phase 4: Frontier
        self.frontier()
        # komi update (C-005: at the end of the Frontier step)
        l0, l1 = self.rows_lost_round
        if l0 != l1:
            self.komi = 0 if l0 > l1 else 1
        self._checkpoint('frontier')
        # golden goal (C-070)
        if self.round >= C['GOLDEN_GOAL_ROUND']:
            t0 = self.rows_taken_round[0] > 0 or self.wagon_dmg_round[0] > 0
            t1 = self.rows_taken_round[1] > 0 or self.wagon_dmg_round[1] > 0
            if t0 or t1:
                if t0 and t1:
                    if self.rows_taken_round[0] != self.rows_taken_round[1]:
                        w = 0 if self.rows_taken_round[0] > \
                            self.rows_taken_round[1] else 1
                    elif self.wagon_dmg_round[0] != self.wagon_dmg_round[1]:
                        w = 0 if self.wagon_dmg_round[0] > \
                            self.wagon_dmg_round[1] else 1
                    else:
                        w = self.komi
                else:
                    w = 0 if t0 else 1
                raise GameOver(w, 'golden-goal')
        # Phase 5: Pass & Tribute
        for p in (0, 1):
            self.res[p]['tribute'] += C['TRIBUTE_PER_ROW'] * \
                self.rows_lost_round[p]
        if self.round == C['CARAVAN_ROUND_1']:
            self.caravan(1)
        elif self.round == C['CARAVAN_ROUND_2']:
            self.caravan(2)
        # metrics
        if self.round == 1:
            r0, r1 = self.rows_taken_round
            if r0 != r1:
                self.r1_winner = 0 if r0 > r1 else 1
                self.r1_rows_winner = self.r1_winner
            elif self.unit_dmg_round[0] != self.unit_dmg_round[1] and (
                    not C.get('R1_REQUIRE_ENGAGE', 0)
                    or min(self.unit_dmg_round) >= 1):
                # damage-basis fallback; with R1_REQUIRE_ENGAGE a one-sided
                # chip against a probe is "no clash", not a round-1 win
                self.r1_winner = 0 if self.unit_dmg_round[0] > \
                    self.unit_dmg_round[1] else 1
            # First Blood: a one-time Supply edge to the round-1 winner, so the
            # opening confers a real (non-decisive) advantage (sim contract A).
            if C.get('FIRST_BLOOD_SUPPLY') and self.r1_winner is not None:
                self.res[self.r1_winner]['supply'] += C['FIRST_BLOOD_SUPPLY']
        self.lead_trace.append(self.lead_holder())
        self._checkpoint('pass')
        # hard stop (C-071)
        if self.round >= C['HARD_STOP_ROUND']:
            a0, a1 = self.wagons_alive(0), self.wagons_alive(1)
            if a0 != a1:
                raise GameOver(0 if a0 > a1 else 1, 'ladder')
            r0, r1 = self.owned_rows(0), self.owned_rows(1)
            if r0 != r1:
                raise GameOver(0 if r0 > r1 else 1, 'ladder')
            raise GameOver(self.komi, 'ladder')
        self.update_entrench()      # C-058b: harden forward ground held this round
        self.round += 1


# ---------------------------------------------------------------------------
# Match driver
# ---------------------------------------------------------------------------

def play_match(bots, seed, overrides=None, terrain_seed=None):
    """Run one full match. bots = [bot_for_P1, bot_for_P2]. Returns a result
    dict: winner (0/1), win_type, rounds, r1_winner (0/1/None), lead-change
    counts."""
    g = Game(bots, seed, overrides, terrain_seed)
    for p in (0, 1):
        bots[p].reset(seed, p)
    g.setup()
    winner = wtype = None
    try:
        while True:
            g.play_round()
    except GameOver as e:
        winner, wtype = e.winner, e.wtype
    # lead changes (between definite leaders); rounds are 1-indexed
    changes = []
    last = None
    for i, l in enumerate(g.lead_trace):
        if l is None:
            continue
        if last is not None and l != last:
            changes.append(i + 1)              # round in which the flip landed
        last = l
    return {
        'seed': seed,
        'winner': winner,
        'win_type': wtype,
        'rounds': g.round,
        'r1_winner': g.r1_winner,
        'r1_rows_winner': g.r1_rows_winner,
        'lead_changes': len(changes),
        'lead_changes_after_r7': sum(1 for r in changes if r >= 8),
        'final_wagons': [g.wagons_alive(0), g.wagons_alive(1)],
        'final_rows': [g.owned_rows(0), g.owned_rows(1)],
    }
