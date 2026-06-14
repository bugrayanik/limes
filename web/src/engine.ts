// LIMES v3 — rules engine (TypeScript port of sim/engine.py).
//
// The Python engine is the ORACLE. This port must reproduce, for the same
// (seed, config, bots), the per-round state hashes emitted by
// web/parity/dump_golden.py. Port one rule-block at a time and re-run parity.
//
// Status: Phase 0 — constants ported (faithful to sim/engine.py CONSTANTS).
// The Game state, geometry, and the five phases are the next blocks (see the
// PORT CHECKLIST at the bottom).

export type Constants = Record<string, number>;

export const CONSTANTS: Constants = {
  // Board & stakes
  BOARD_COLS: 8, BOARD_ROWS: 8, HEARTLAND_ROWS: 2,
  STAKE_START: 4, STAKE_MIN: 2, STAKE_MAX: 6, STAKE_STEP_MAX: 1,
  LONE_RUNNER_RADIUS: 2,
  // Wagons, breach, rout
  WAGON_COUNT: 3, WAGON_HP: 3, WAGON_BOUNTY: 3,
  BREACH_DMG: 1, BREACH_CAP: 2, BREACH_CAP_LATE: 3,
  BREACH_CAP_RISE_ROUND: 13, ROUT_WAGON_DMG: 2,
  // Economy
  START_SUPPLY: 8, START_CROP: 6,
  FIELD_COST: 2, FIELD_YIELD: 2, FARMSTEAD_SIZE: 3, FARMSTEAD_BONUS: 2,
  ANNEX_YIELD: 1, RAID_GAIN: 3, PALISADE_COST: 3, BUILD_ACTIONS: 2,
  UPKEEP_CROP: 1, SUPPLY_STRAIN_CROP: 1,
  EXHAUSTION_START_ROUND: 12, EXHAUSTION_INITIAL: 1,
  EXHAUSTION_ACCEL_ROUND: 13, EXHAUSTION_ACCEL: 2,
  // Muster
  MUSTER_COPIES: 6, COPY_SURCHARGE: 1,
  UNLOCK_3RD: 6, UNLOCK_4TH: 10, UNLOCK_5TH: 15,
  COST_SPEARMAN: 2, COST_SWORDSMAN: 3, COST_ARCHER: 3,
  COST_CAVALRY: 4, COST_SIEGE: 5,
  DEPLOY_MAX: 2, REPOSITION_MAX: 2,
  RUSH_RETURN_COST: 1, WOUND_RETURN_DELAY: 2,
  // Tribute
  TRIBUTE_PER_ROW: 1, TRIBUTE_SUPPLY_VALUE: 1,
  SURGE_COST: 1, SHIELDBEARER_COST: 2, INTERVENTIONS_PER_WINDOW: 1,
  // Combat
  PULSES_PER_CLASH: 2, ATK_BONUS_CAP: 2, GUARD_CAP: 2,
  MOD_FLANK: 1, MOD_SUPPORT: 1, MOD_BRACE_GUARD: 1, MOD_CHARGE: 1,
  MOD_COUNTER: 1, MOD_HILL: 1, MOD_RIVER: 1, MOD_ROAD: 1,
  FLANK_THRESHOLD: 2, FLANK_MIN_DMG: 1,
  EXHAUST_ATK_PENALTY: 1, EXHAUST_GUARD_PENALTY: 1,
  DISPLACE_DMG: 1, RIVER_PUSH_DMG: 2, TRAP_PUSH_DMG: 2,
  CHARGE_MOVE_MIN: 2, PUSH_BACK: 1, RANGED_RETALIATION: 1,
  // Unit stats
  SPEAR_ATK: 1, SPEAR_HP: 4, SPEAR_MV: 1, SPEAR_RNG: 1,
  SWORD_ATK: 2, SWORD_HP: 5, SWORD_MV: 1, SWORD_RNG: 1,
  CAV_ATK: 2, CAV_HP: 4, CAV_MV: 3, CAV_RNG: 1,
  ARCHER_ATK: 2, ARCHER_HP: 3, ARCHER_MV: 1, ARCHER_RNG_MAX: 2,
  SIEGE_ATK: 3, SIEGE_HP: 3, SIEGE_MV: 1,
  SIEGE_RNG_MIN: 2, SIEGE_RNG_MAX: 3,
  HERO_ATK: 3, HERO_HP: 7, HERO_MV: 2, HERO_RNG: 1,
  // XP & promotions
  XP_PER_WOUND: 1, XP_TIER1: 2, XP_TIER2: 4,
  PROMO_T1_HP: 1, PROMO_T2_STAT: 1,
  // Caravans & artifacts
  CARAVAN_ROUND_1: 4, CARAVAN_ROUND_2: 8,
  CARAVAN_ARTIFACTS: 4, CARAVAN_DISCARD: 1, ARTIFACT_POOL: 8,
  ARTIFACT_SUPPLY: 4, ARTIFACT_CROP: 4, ARTIFACT_XP: 2,
  ARTIFACT_TRIBUTE: 2, ARTIFACT_DISCOUNT: 2,
  // Endgame — mirror Python engine defaults exactly (validated 14/18 lives in V3_CONFIG)
  GOLDEN_GOAL_ROUND: 16, HARD_STOP_ROUND: 20,
  LASTSTAND_BOONS: 3, ENTRENCH_PALISADES: 2,
  ENTRENCH_HOLD: 0,        // C-058b, default OFF (sim-refuted)
  FIRST_BLOOD_SUPPLY: 0,   // round-1 reward, default OFF (sim-refuted)
  // Timers (display only)
  TIMER_MUSTER: 60, TIMER_COMMIT: 15,
  TIMER_MUSTER_CASUAL: 90, TIMER_COMMIT_CASUAL: 30,
  // Modules (terrain implemented; rest baseline-off)
  TACTICA_POOL: 9, TACTICA_RACK: 5, TACTICA_HELD: 2,
  TACTICA_HELD_CONTINGENCY: 3, DOCTRINE_DISPLAY: 8,
  DOCTRINE_BASE_PRICE: 4, DOCTRINE_AGING: 1, DOCTRINE_MIN_PRICE: 1,
  T2_POOL: 5, T2_UNLOCKABLE: 3, GAUL_TRAPS: 2, HUN_REPOSITIONS: 2,
  // Rule toggles (defaults reproduce original spec behaviour)
  ZOC_ENABLED: 1, SIEGE_PUSH_UNITS: 1, CHARGE_ADJ_OK: 1,
  EXHAUSTED_CARRY: 0, R1_REQUIRE_ENGAGE: 0,
};

// The current sim-validated config (= sim/experiments/final/v1_base overrides
// + the lead-metric fix). Apply over CONSTANTS for the shipping ruleset.
export const V3_CONFIG: Partial<Constants> = {
  SWORD_HP: 6, SIEGE_PUSH_UNITS: 0, CHARGE_ADJ_OK: 0, EXHAUSTED_CARRY: 1,
  R1_REQUIRE_ENGAGE: 1, EXHAUSTION_ACCEL: 0, WAGON_HP: 2, WAGON_BOUNTY: 5,
  GOLDEN_GOAL_ROUND: 14, HARD_STOP_ROUND: 18, BREACH_CAP_RISE_ROUND: 11,
  LONE_RUNNER_RADIUS: 3,
};

export function makeConstants(overrides?: Partial<Constants>): Constants {
  return { ...CONSTANTS, ...(overrides ?? {}) };
}

// ── PORT CHECKLIST (port + parity-test each block against the Python oracle) ──
// [x] CONSTANTS
// [x] Unit + archStats / baseCosts
// [x] Game state + setup()  → post-setup hash MATCHES oracle (4/4, check_parity.ts)
// [x] crc32 + bot setup (bots.ts)  → opening placement reproduced byte-for-byte
// [x] Geometry + query helpers (manh/neighbors/territoryOf/onBoard/reserve/…)
// [x] Per-phase parity harness — oracle emits phase_hashes_r1; check_parity.ts
//     reports the FIRST divergent phase. phaseHashesR1() lights it up.
// [x] Phase 1 MUSTER  → bot.feedOrder/build/reinforce (+cfg, dangerCols,
//     threatenedCols, pickPushCenter, _fieldSpot/_deploySpot/_spareBlocker/
//     _blockTile); harvest/upkeep/recruit/unlock/reposition. 6 policies × seeds,
//     muster hash MATCHES oracle (16/16, check_parity.ts).
// [x] Phase 2 REVEAL  (face_down = false)
// [x] Phase 3 CLASH   (validateOrder, 4 sub-phases, ZoC lockstep, combat math,
//     wards/displacement/rout/interventions + bot orders/bfs/plan/goal layer).
//     clash hash MATCHES oracle (16/16). Terrain branches kept but inert.
// [x] Phase 4 FRONTIER (stake-step, palisade absorption, trample/raid-annex,
//     komi-holder-first breach). frontier hash MATCHES oracle (16/16).
// [x] Phase 5 PASS & TRIBUTE (tribute accrual + komi update + caravans).
// [x] Round driver playRound() — golden-goal, hard-stop, metrics, updateEntrench.
// [x] caravan()/applyArtifact() + MT19937 (src/mt19937.ts) reproducing CPython
//     random.Random(seed).shuffle for artifact_order. TS engine is SELF-CONTAINED.
//
// ✅ ENGINE PORT COMPLETE. Full-match parity vs the Python oracle: 108/108
//    (36 post-setup + 36 round-1 per-phase + 36 whole-match) across every 6×6
//    policy pairing and all win types (golden-goal, ladder, rout, wagons).
//    Combat/breach/rout/intervention/caravan paths all exercised and identical.
//    Regenerate + check: python3 parity/dump_golden.py --suite --out
//    parity/golden.json && bun parity/check_parity.ts
//
// Roadmap Phase 0 (rules port + parity harness) is DONE. Next: Phase 1, the
// static board renderer (state → DOM in the styleguide skin).

// ──────────────────────────────────────────────────────────────────────────
// Phase 0 port: geometry, Unit, Game state + setup(), canonical snapshot.
// Faithful to sim/engine.py. Parity target: web/parity/dump_golden.py hashes.
// ──────────────────────────────────────────────────────────────────────────
import { sha1hex } from './sha1';
import { Policy } from './bots';
import { MT19937 } from './mt19937';

export const ARCHES = ['spear', 'sword', 'cav', 'archer', 'siege'] as const;
export const COUNTERS: Record<string, string> = { spear: 'cav', cav: 'archer', archer: 'spear' };

export function baseCosts(C: Constants): Record<string, number> {
  return { spear: C.COST_SPEARMAN, sword: C.COST_SWORDSMAN, archer: C.COST_ARCHER,
           cav: C.COST_CAVALRY, siege: C.COST_SIEGE, hero: 9 };
}

type Stat = [number, number, number, number, number]; // atk,hp,mv,rmin,rmax
export function archStats(C: Constants): Record<string, Stat> {
  return {
    spear: [C.SPEAR_ATK, C.SPEAR_HP, C.SPEAR_MV, 1, 1],
    sword: [C.SWORD_ATK, C.SWORD_HP, C.SWORD_MV, 1, 1],
    cav: [C.CAV_ATK, C.CAV_HP, C.CAV_MV, 1, 1],
    archer: [C.ARCHER_ATK, C.ARCHER_HP, C.ARCHER_MV, 2, C.ARCHER_RNG_MAX],
    siege: [C.SIEGE_ATK, C.SIEGE_HP, C.SIEGE_MV, C.SIEGE_RNG_MIN, C.SIEGE_RNG_MAX],
    hero: [C.HERO_ATK, C.HERO_HP, C.HERO_MV, 1, 1],
  };
}

export type Pos = [number, number];
const key = (p: Pos) => `${p[0]},${p[1]}`;
// Undirected terrain edge key (frozenset({a,b}) equivalent): order-independent.
const edgeKey = (a: Pos, b: Pos) => key(a) <= key(b) ? `${key(a)}|${key(b)}` : `${key(b)}|${key(a)}`;
// Nested numeric-tuple comparator (mirrors Python tuple ordering).
function ntc(a: any[], b: any[]): number {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const x = a[i], y = b[i];
    if (Array.isArray(x) && Array.isArray(y)) { const c = ntc(x, y); if (c) return c; }
    else if (x !== y) return x < y ? -1 : 1;
  }
  return 0;
}

export class GameOver extends Error { constructor(public winner: number, public wtype: string) { super('GameOver'); } }
export class ClashEnd extends Error { constructor() { super('ClashEnd'); } }

export class Unit {
  uid: number; owner: number; arch: string;
  base_atk: number; base_guard = 0; hp: number; max_hp: number;
  mv: number; rmin: number; rmax: number;
  pos: Pos | null = null;
  exhausted = false; braced = false; xp = 0;
  tier1 = false; tier2 = false; wounded_round: number | null = null; face_down = false;
  constructor(uid: number, owner: number, arch: string, stats: Stat) {
    this.uid = uid; this.owner = owner; this.arch = arch;
    this.base_atk = stats[0]; this.hp = stats[1]; this.max_hp = stats[1];
    this.mv = stats[2]; this.rmin = stats[3]; this.rmax = stats[4];
  }
}

export class Game {
  C: Constants;
  seed: number;
  bots: Policy[];
  stats: Record<string, Stat>;
  costs: Record<string, number>;
  units = new Map<number, Unit>();
  next_uid = 0;
  board = new Map<string, number>();
  stakes: number[];
  fields = new Map<string, any>();
  palisades = new Map<number, number>();
  entrench = new Map<string, number>();
  res: { supply: number; crop: number; tribute: number }[];
  wagons: { col: number; row: number; hp: number; artifacts: number[] }[][] = [[], []];
  wagon_at = new Map<string, [number, number]>();
  komi = 1;
  round = 1;
  // Muster state (parity with sim/engine.py __init__; not part of the hash,
  // but they gate recruits/pricing so they must track exactly).
  copies: Record<string, number> = { spear: 0, sword: 0, cav: 0, archer: 0, siege: 0 };
  unlocked: Set<string>[] = [new Set(['sword', 'spear']), new Set(['sword', 'spear'])];
  extra_deploy = [0, 0];
  recruit_discount = [0, 0];
  standard_bearer: (number | null)[] = [null, null];
  // Clash / combat state (parity with sim/engine.py). Round accumulators are
  // reset each round; none enter the state hash, but clash logic reads them.
  wards: { uid: number; owner: number; active: boolean }[] = [];
  last_stand_used = [false, false];
  last_wagon_kill_src: string | null = null;
  cap_dmg = [0, 0];
  wagon_dmg_round = [0, 0];
  rows_lost_round = [0, 0];
  rows_taken_round = [0, 0];
  unit_dmg_round = [0, 0];
  // Terrain is OFF for the deterministic parity suite (terrain_seed=None).
  // The terrain-conditional branches below are kept faithful but never fire.
  terrain_on = false;
  ttype = new Map<string, string>();
  rivers = new Set<string>();
  // Seeded artifact pool order (C-079); MT19937 reproduces random.Random(seed).
  artifact_order: number[] = [];
  lead_trace: (number | null)[] = [];
  r1_winner: number | null = null;
  r1_rows_winner: number | null = null;

  constructor(bots: Policy[], seed: number, overrides?: Partial<Constants>) {
    this.C = makeConstants(overrides);
    this.seed = seed;
    this.bots = bots;
    this.stats = archStats(this.C);
    this.costs = baseCosts(this.C);
    this.stakes = Array(8).fill(this.C.STAKE_START);
    this.res = [
      { supply: this.C.START_SUPPLY, crop: this.C.START_CROP, tribute: 0 },
      { supply: this.C.START_SUPPLY, crop: this.C.START_CROP, tribute: 0 },
    ];
    this.artifact_order = [...Array(this.C.ARTIFACT_POOL).keys()].map(i => i + 1);
    new MT19937(seed).shuffle(this.artifact_order);
  }

  heartlandRows(p: number): number[] { return p === 0 ? [0, 1] : [6, 7]; }
  backRow(p: number): number { return p === 0 ? 0 : 7; }
  occupied(p: Pos): boolean { return this.board.has(key(p)) || this.wagon_at.has(key(p)); }
  inBounds(p: Pos): boolean { return p[0] >= 0 && p[0] < 8 && p[1] >= 0 && p[1] < 8; }

  newUnit(owner: number, arch: string): Unit {
    const u = new Unit(this.next_uid, owner, arch, this.stats[arch]);
    this.next_uid++;
    this.units.set(u.uid, u);
    return u;
  }
  place(u: Unit, pos: Pos) { this.board.set(key(pos), u.uid); u.pos = pos; }

  freeHeartlandTile(p: number): Pos | null {
    for (let c = 0; c < 8; c++)
      for (const r of this.heartlandRows(p))
        if (!this.occupied([c, r])) return [c, r];
    return null;
  }

  setup() {
    const C = this.C;
    for (let p = 0; p < 2; p++) {
      const plan = this.bots[p].setup(this, p);
      const rows = this.heartlandRows(p);
      const back = this.backRow(p);
      const cols: number[] = [];
      for (const c of plan.wagons) if (c >= 0 && c < 8 && !cols.includes(c)) cols.push(c);
      for (let c = 0; c < 8 && cols.length < C.WAGON_COUNT; c++) if (!cols.includes(c)) cols.push(c);
      cols.length = Math.min(cols.length, C.WAGON_COUNT);
      cols.forEach((c, i) => {
        this.wagons[p].push({ col: c, row: back, hp: C.WAGON_HP, artifacts: [] });
        this.wagon_at.set(key([c, back]), [p, i]);
      });
      const want = ['hero', 'spear', 'sword', 'sword'];
      const placements = plan.units.slice();
      for (const arch of want) {
        let pos: Pos | null = null;
        for (let i = 0; i < placements.length; i++) {
          const pl = placements[i];
          if (pl.arch === arch && rows.includes(pl.pos[1]) && this.inBounds(pl.pos) && !this.occupied(pl.pos)) {
            pos = pl.pos; placements.splice(i, 1); break;
          }
        }
        if (pos === null) pos = this.freeHeartlandTile(p);
        this.place(this.newUnit(p, arch), pos!);
      }
    }
  }

  moveUnit(u: Unit, pos: Pos) {
    this.board.delete(key(u.pos!));
    this.board.set(key(pos), u.uid);
    u.pos = pos;
  }

  unbroken(u: Unit): boolean { return u.pos !== null && !u.exhausted; }

  loneRunner(u: Unit): boolean {
    const rad = this.C.LONE_RUNNER_RADIUS;
    for (const v of this.units.values())
      if (v.uid !== u.uid && v.owner === u.owner && v.pos !== null && manh(v.pos, u.pos!) <= rad)
        return false;
    return true;
  }

  carryEligible(u: Unit): boolean {
    if (u.pos === null || this.loneRunner(u)) return false;
    return !u.exhausted || !!this.C.EXHAUSTED_CARRY;
  }

  exhaustionPenalty(rnd?: number): number {
    const C = this.C, r = rnd ?? this.round;
    if (r < C.EXHAUSTION_START_ROUND) return 0;
    let p = C.EXHAUSTION_INITIAL;
    if (r >= C.EXHAUSTION_ACCEL_ROUND) p += C.EXHAUSTION_ACCEL * (r - C.EXHAUSTION_ACCEL_ROUND + 1);
    return p;
  }

  // (col,row) -> stake-territory owner. Mirrors territoryOf for an explicit pos.
  columnClaims(c: number): [boolean, boolean] {
    const k = this.stakes[c];
    let p1_carry = false, p2_carry = false;
    let p1_far = false, p2_far = false, p1_near = false, p2_near = false;
    for (let r = 0; r < 8; r++) {
      const uid = this.board.get(key([c, r]));
      if (uid === undefined) continue;
      const u = this.units.get(uid)!;
      const contests = this.unbroken(u), carries = this.carryEligible(u);
      if (!contests && !carries) continue;
      if (u.owner === 0) {
        if (r >= k) { if (contests) p1_far = true; if (carries) p1_carry = true; }
        else if (contests) p1_near = true;
      } else {
        if (r < k) { if (contests) p2_near = true; if (carries) p2_carry = true; }
        else if (contests) p2_far = true;
      }
    }
    return [p1_carry && !p2_far, p2_carry && !p1_near];
  }

  // C-019..C-022 harvest. Returns [supply, crop].
  computeHarvest(p: number, rnd?: number): [number, number] {
    const C = this.C, P = this.exhaustionPenalty(rnd);
    let sup = 0, crop = 0;
    const ownFields: [Pos, string][] = [];
    for (const [k, f] of this.fields.entries()) {
      const pos = k.split(',').map(Number) as Pos;
      const controller = f.annexed !== null ? f.annexed : f.owner;
      if (controller !== p || this.territoryOf(pos) !== p) continue;
      const y = f.annexed === p ? C.ANNEX_YIELD : C.FIELD_YIELD;
      if (f.type === 'crop') crop += Math.max(0, y - P); else sup += y;
      if (f.annexed === null && f.owner === p) ownFields.push([pos, f.type]);
    }
    // farmsteads: connected same-type groups of >= FARMSTEAD_SIZE (C-021)
    const seen = new Set<string>();
    const fmap = new Map<string, string>(ownFields.map(([pos, t]) => [key(pos), t]));
    for (const [pos, t] of ownFields) {
      if (seen.has(key(pos))) continue;
      let size = 0;
      const stack = [pos]; seen.add(key(pos));
      while (stack.length) {
        const cur = stack.pop()!; size++;
        for (const nb of neighbors(cur))
          if (!seen.has(key(nb)) && fmap.get(key(nb)) === t) { seen.add(key(nb)); stack.push(nb); }
      }
      if (size >= C.FARMSTEAD_SIZE) {
        if (t === 'crop') crop += Math.max(0, C.FARMSTEAD_BONUS - P); else sup += C.FARMSTEAD_BONUS;
      }
    }
    return [sup, crop];
  }

  musterPlayer(p: number) {
    const C = this.C, bot = this.bots[p], res = this.res[p];
    // (a) Harvest
    const [hs, hc] = this.computeHarvest(p);
    res.supply += hs; res.crop += hc;
    // (b) Upkeep — dedupe the bot's feed list; charge each unit once (C-023)
    const mine = this.onBoard(p);
    const order: number[] = [], fed = new Set<number>();
    for (const uid of bot.feedOrder(this, p)) {
      const u = this.units.get(uid);
      if (fed.has(uid) || !u || u.owner !== p || u.pos === null) continue;
      fed.add(uid); order.push(uid);
    }
    for (const u of mine) if (!fed.has(u.uid)) order.push(u.uid);
    let avail = res.crop;
    for (const uid of order) {
      const u = this.units.get(uid)!;
      const cost = C.UPKEEP_CROP + (this.beyondOwn(u) ? C.SUPPLY_STRAIN_CROP : 0);
      if (avail >= cost) { avail -= cost; u.exhausted = false; } else u.exhausted = true;
    }
    res.crop = avail;
    // (c) Build
    for (const act of bot.build(this, p).slice(0, C.BUILD_ACTIONS)) {
      if (!act) continue;
      if (act[0] === 'field') {
        const pos = act[1] as Pos, ftype = act[2] as string;
        if (inBounds(pos) && this.territoryOf(pos) === p && !this.fields.has(key(pos))
            && !this.wagon_at.has(key(pos)) && res.supply >= C.FIELD_COST
            && (ftype === 'supply' || ftype === 'crop')) {
          res.supply -= C.FIELD_COST;
          this.fields.set(key(pos), { type: ftype, owner: p, annexed: null });
        }
      } else if (act[0] === 'palisade') {
        const col = act[1] as number;
        if (col >= 0 && col < 8 && !this.palisades.has(col) && res.supply >= C.PALISADE_COST) {
          res.supply -= C.PALISADE_COST; this.palisades.set(col, p);
        }
      }
    }
    // (d) Reinforce
    const r = bot.reinforce(this, p);
    const n = Math.min(Math.trunc(r.tribute_spend ?? 0), res.tribute);
    if (n > 0) { res.tribute -= n; res.supply += n * C.TRIBUTE_SUPPLY_VALUE; }
    // automatic wounded returns (wounded round N -> free at Muster N+2)
    for (const u of this.reserve(p)) {
      if (u.wounded_round !== null && u.wounded_round <= this.round - C.WOUND_RETURN_DELAY) {
        const tile = this.freeHeartlandTile(p);
        if (tile === null) break;
        u.hp = u.max_hp; u.wounded_round = null; this.place(u, tile);
      }
    }
    // rush returns (1 Crop, wounded last round)
    for (const uid of r.rush ?? []) {
      const u = this.units.get(uid);
      if (u && u.owner === p && u.pos === null && u.wounded_round === this.round - 1
          && res.crop >= C.RUSH_RETURN_COST) {
        const tile = this.freeHeartlandTile(p);
        if (tile === null) break;
        res.crop -= C.RUSH_RETURN_COST; u.hp = u.max_hp; u.wounded_round = null; this.place(u, tile);
      }
    }
    // unlocks (paid, no build action; C-026)
    for (const arch of r.unlocks ?? []) {
      if (!ARCHES.includes(arch as any) || this.unlocked[p].has(arch)) continue;
      const ncur = this.unlocked[p].size;
      const cost = ({ 2: C.UNLOCK_3RD, 3: C.UNLOCK_4TH, 4: C.UNLOCK_5TH } as Record<number, number>)[ncur];
      if (cost !== undefined && res.supply >= cost) { res.supply -= cost; this.unlocked[p].add(arch); }
    }
    // recruits (shared finite copies, surcharge per copy; C-025)
    const deployCap = C.DEPLOY_MAX + this.extra_deploy[p];
    this.extra_deploy[p] = 0;
    let deployed = 0;
    const recruitedNow = new Set<number>();
    const rows = this.heartlandRows(p);
    for (const [arch, pos] of r.recruits ?? []) {
      if (deployed >= deployCap || !ARCHES.includes(arch as any)) continue;
      if (!this.unlocked[p].has(arch) || this.copies[arch] >= C.MUSTER_COPIES) continue;
      if (!inBounds(pos) || !rows.includes(pos[1]) || this.occupied(pos)) continue;
      let price = this.costs[arch] + C.COPY_SURCHARGE * this.copies[arch];
      if (this.recruit_discount[p]) price = Math.max(1, price - this.recruit_discount[p]);
      if (res.supply < price) continue;
      res.supply -= price;
      if (this.recruit_discount[p]) this.recruit_discount[p] = 0;
      this.copies[arch]++;
      const u = this.newUnit(p, arch); u.face_down = true; this.place(u, pos);
      recruitedNow.add(u.uid); deployed++;
    }
    // repositions (teleport within own territory; C-028, existing units only)
    let repos = 0;
    for (const [uid, pos] of r.repositions ?? []) {
      if (repos >= C.REPOSITION_MAX) break;
      const u = this.units.get(uid);
      if (!u || u.owner !== p || u.pos === null || recruitedNow.has(uid)
          || !inBounds(pos) || this.occupied(pos) || this.territoryOf(pos) !== p) continue;
      this.moveUnit(u, pos); u.braced = false; repos++;
    }
    // Standard-Bearer designation (C-031)
    let hero: Unit | undefined;
    for (const u of this.units.values()) if (u.owner === p && u.arch === 'hero') { hero = u; break; }
    if (!hero || hero.pos === null) {
      const pick = bot.standardBearer(this, p);
      let u = pick !== null ? this.units.get(pick) : undefined;
      if (!u || u.owner !== p || u.pos === null) {
        const cands = this.onBoard(p).sort((a, b) =>
          (this.costs[b.arch] - this.costs[a.arch]) || a.pos![0] - b.pos![0] || a.pos![1] - b.pos![1]);
        u = cands[0];
      }
      this.standard_bearer[p] = u ? u.uid : null;
    } else this.standard_bearer[p] = null;
  }

  // ── Phase 3: Clash ────────────────────────────────────────────────────────
  // Combat math (terrain branches kept faithful but inert: terrain_on=false).

  counter(aArch: string, tArch: string): number { return COUNTERS[aArch] === tArch ? this.C.MOD_COUNTER : 0; }

  flanked(t: Unit): boolean {
    let n = 0;
    for (const nb of neighbors(t.pos!)) {
      const uid = this.board.get(key(nb));
      if (uid !== undefined && this.units.get(uid)!.owner !== t.owner) n++;
    }
    return n >= this.C.FLANK_THRESHOLD;
  }

  hasAdjacentFriend(u: Unit): boolean {
    for (const nb of neighbors(u.pos!)) {
      const uid = this.board.get(key(nb));
      if (uid !== undefined && this.units.get(uid)!.owner === u.owner) return true;
    }
    return false;
  }

  effGuard(u: Unit, vsShoot = false): number {
    const C = this.C; let b = 0;
    if (!this.beyondOwn(u) && this.hasAdjacentFriend(u)) b += C.MOD_SUPPORT;
    if (u.braced) b += C.MOD_BRACE_GUARD;
    if (this.terrain_on) {
      const t = this.ttype.get(key(u.pos!));
      if (t === 'hills') b += C.MOD_HILL;
      if (t === 'woods' && vsShoot) b += 1;
    }
    let g = u.base_guard + Math.min(C.GUARD_CAP, b);
    if (u.exhausted) g -= C.EXHAUST_GUARD_PENALTY;
    return Math.max(0, g);
  }

  effAtk(a: Unit, t: Unit, charge = false, melee = false): number {
    const C = this.C; let b = this.counter(a.arch, t.arch);
    if (charge) b += C.MOD_CHARGE;
    if (this.flanked(t)) b += C.MOD_FLANK;
    let atk = a.base_atk + Math.min(C.ATK_BONUS_CAP, b);
    if (a.exhausted) atk -= C.EXHAUST_ATK_PENALTY;
    if (melee && this.terrain_on && this.rivers.has(edgeKey(a.pos!, t.pos!))) atk -= C.MOD_RIVER;
    return Math.max(0, atk);
  }

  attackDamage(a: Unit, t: Unit, charge = false, melee = false): number {
    const dmg = this.effAtk(a, t, charge, melee) - this.effGuard(t, !melee && !charge);
    const floor = this.flanked(t) ? this.C.FLANK_MIN_DMG : 0;
    return Math.max(floor, dmg);
  }

  applyDamage(instances: [number | null, number, number][], contrib: Map<string, number>) {
    const keyOf = (inst: [number | null, number, number]) => {
      const [src, tgt] = inst;
      const tu = this.units.get(tgt)!;
      const sp = src !== null ? (this.units.get(src)!.pos ?? [-1, -1]) : [-1, -1];
      return [tu.pos ?? [-1, -1], sp];
    };
    const sorted = instances.map((inst, i) => ({ inst, i }))
      .sort((a, b) => ntc(keyOf(a.inst), keyOf(b.inst)) || a.i - b.i);
    for (const { inst } of sorted) this.damageUnit(this.units.get(inst[1])!, inst[2], inst[0], contrib);
  }

  damageUnit(tu: Unit, dmg: number, src: number | null, contrib: Map<string, number>) {
    if (dmg <= 0 || tu.pos === null) return;
    const ward = this.wards.find(w => w.uid === tu.uid && w.active);
    if (ward && tu.hp - dmg <= 0) {
      ward.active = false;
      const bearer = this.wardBearer(tu);
      if (bearer) tu = bearer;
    }
    tu.hp -= dmg;
    const ck = `${src === null ? 'n' : src}_${tu.uid}`;
    contrib.set(ck, (contrib.get(ck) ?? 0) + dmg);
    if (src !== null) { const su = this.units.get(src)!; if (su.owner !== tu.owner) this.unit_dmg_round[su.owner] += dmg; }
  }

  wardBearer(tu: Unit): Unit | null {
    const cands: Unit[] = [];
    for (const nb of neighbors(tu.pos!)) {
      const uid = this.board.get(key(nb));
      if (uid === undefined) continue;
      const v = this.units.get(uid)!;
      if (v.owner === tu.owner && (v.arch === 'spear' || v.arch === 'sword')) cands.push(v);
    }
    if (!cands.length) return null;
    cands.sort((a, b) => (b.hp - a.hp) || ntc(a.pos!, b.pos!));
    return cands[0];
  }

  removeDead(contrib: Map<string, number>) {
    const removed: Unit[] = [];
    for (const u of [...this.onBoard()]) {
      if (u.hp <= 0) {
        this.board.delete(key(u.pos!)); u.pos = null; u.braced = false;
        u.exhausted = false; u.wounded_round = this.round; removed.push(u);
      }
    }
    for (const v of removed)
      for (const [ck, d] of contrib.entries()) {
        const [srcStr, tgtStr] = ck.split('_');
        if (Number(tgtStr) === v.uid && d >= 1 && srcStr !== 'n') {
          const a = this.units.get(Number(srcStr))!;
          if (a.owner !== v.owner) this.gainXp(a, this.C.XP_PER_WOUND);
        }
      }
  }

  gainXp(u: Unit, n: number) {
    const C = this.C; u.xp += n;
    if (!u.tier1 && u.xp >= C.XP_TIER1) this.grantTier(u);
    if (!u.tier2 && u.xp >= C.XP_TIER2) this.grantTier(u);
  }

  grantTier(u: Unit) {
    const C = this.C;
    if (!u.tier1) { u.tier1 = true; u.max_hp += C.PROMO_T1_HP; u.hp = Math.min(u.hp + 1, u.max_hp); }
    else if (!u.tier2) {
      u.tier2 = true;
      const choice = this.bots[u.owner].promoT2(this, u.owner, u);
      if (choice === 'guard') u.base_guard += C.PROMO_T2_STAT; else u.base_atk += C.PROMO_T2_STAT;
    }
  }

  applyPushes(pushes: any[], contrib: Map<string, number>) {
    const C = this.C;
    const keyOf = (p: any) => { const u = this.units.get(p.uid)!; return u.pos ?? p.tgt_tile ?? [9, 9]; };
    const sorted = pushes.map((p, i) => ({ p, i })).sort((a, b) => ntc(keyOf(a.p), keyOf(b.p)) || a.i - b.i);
    for (const { p } of sorted) {
      const u = this.units.get(p.uid)!;
      if (u.pos === null) {
        if (p.kind === 'charge' && p.charger != null) {
          const ch = this.units.get(p.charger)!;
          if (ch.pos !== null && p.tgt_tile && !this.occupied(p.tgt_tile)) this.moveUnit(ch, p.tgt_tile);
        }
        continue;
      }
      const [dc, dr] = p.dir;
      const dest: Pos = [u.pos[0] + dc, u.pos[1] + dr];
      const srcUid = p.pusher ?? null;
      if (!inBounds(dest) || this.occupied(dest)) {
        this.damageUnit(u, C.DISPLACE_DMG, srcUid, contrib);
        const buid = this.board.get(key(dest));
        if (buid !== undefined) this.damageUnit(this.units.get(buid)!, C.DISPLACE_DMG, srcUid, contrib);
        continue;
      }
      const old = u.pos;
      const crossedRiver = this.terrain_on && this.rivers.has(edgeKey(old, dest));
      this.moveUnit(u, dest); u.braced = false;
      if (crossedRiver) this.damageUnit(u, C.RIVER_PUSH_DMG, srcUid, contrib);
      if (p.kind === 'charge' && p.charger != null) {
        const ch = this.units.get(p.charger)!;
        if (ch.pos !== null && !this.occupied(old)) this.moveUnit(ch, old);
      }
    }
  }

  capRemaining(p: number): number {
    const C = this.C;
    const cap = this.round >= C.BREACH_CAP_RISE_ROUND ? C.BREACH_CAP_LATE : C.BREACH_CAP;
    return cap - this.cap_dmg[p];
  }

  damageWagon(attacker: number, owner: number, idx: number, capped = true): boolean {
    const w = this.wagons[owner][idx];
    if (w.hp <= 0) return false;
    if (capped) { if (this.capRemaining(attacker) <= 0) return false; this.cap_dmg[attacker]++; }
    this.wagon_dmg_round[attacker]++;
    w.hp--;
    if (w.hp <= 0) {
      this.wagon_at.delete(key([w.col, this.backRow(owner)]));
      this.res[attacker].supply += this.C.WAGON_BOUNTY;
      this.last_wagon_kill_src = 'normal';
      if (!this.last_stand_used[owner] && this.wagonsAlive(owner) > 0) {
        this.last_stand_used[owner] = true; this.resolveLastStand(owner);
      }
    }
    return true;
  }

  wagonWinCheck(wtype: string) {
    const a0 = this.wagonsAlive(0), a1 = this.wagonsAlive(1);
    if (a0 === 0 && a1 === 0) throw new GameOver(this.komi, wtype);
    if (a1 === 0) throw new GameOver(0, wtype);
    if (a0 === 0) throw new GameOver(1, wtype);
  }

  resolveLastStand(p: number) {
    const boon = this.bots[p].lastStand(this, p);
    if (boon === 1) {
      for (const u of this.reserve(p)) {
        const tile = this.freeHeartlandTile(p);
        if (tile === null) break;
        u.hp = u.max_hp; u.exhausted = false; u.braced = false; u.face_down = false;
        u.wounded_round = null; this.place(u, tile);
      }
      this.extra_deploy[p]++;
    } else if (boon === 2) {
      const cands = this.onBoard(p).filter(u => !u.tier2)
        .sort((a, b) => (b.xp - a.xp) || (this.costs[b.arch] - this.costs[a.arch]) || ntc(a.pos!, b.pos!));
      if (cands.length) this.grantTier(cands[0]);
    } else {
      const cols = this.bots[p].entrenchCols(this, p);
      let placed = 0;
      for (const c of cols) {
        if (placed >= this.C.ENTRENCH_PALISADES) break;
        if (c >= 0 && c < 8 && !this.palisades.has(c)) { this.palisades.set(c, p); placed++; }
      }
    }
  }

  standardUnit(p: number): Unit | null {
    let hero: Unit | undefined;
    for (const u of this.units.values()) if (u.owner === p && u.arch === 'hero') { hero = u; break; }
    if (hero && hero.pos !== null) return hero;
    const sb = this.standard_bearer[p];
    if (sb !== null) { const u = this.units.get(sb); if (u && u.pos !== null) return u; }
    return null;
  }

  validateOrder(u: Unit, order: any): any {
    const C = this.C, HOLD = ['HOLD'];
    if (!order || u.pos === null) return HOLD;
    const kind = order[0];
    if (kind === 'HOLD') return HOLD;
    if (kind === 'BRACE') return u.arch === 'spear' ? order : HOLD;
    const mv = u.braced ? 0 : u.mv;
    const okPath = (path: Pos[], baseMv: number): boolean => {
      let allowed = baseMv;
      if (this.terrain_on && baseMv > 0 && path.length === baseMv + 1
          && path.every(t => this.ttype.get(key(t)) === 'road')) allowed = baseMv + 1;
      if (path.length > allowed) return false;
      let cur = u.pos!;
      for (const step of path) { if (!inBounds(step) || manh(cur, step) !== 1) return false; cur = step; }
      return true;
    };
    if (kind === 'SHOOT') {
      if (u.arch !== 'archer' && u.arch !== 'siege') return HOLD;
      const tgt = order[1];
      if (tgt[0] === 'U') {
        const t = this.units.get(tgt[1]);
        if (!t || t.pos === null || t.owner === u.owner) return HOLD;
        if (!(u.rmin <= manh(u.pos, t.pos) && manh(u.pos, t.pos) <= u.rmax)) return HOLD;
      } else if (tgt[0] === 'W') { if (u.arch !== 'siege') return HOLD; }
      else if (tgt[0] === 'P') { if (u.arch !== 'siege') return HOLD; }
      else return HOLD;
      return order;
    }
    if (kind === 'MOVE') { const path = order[1]; return path && path.length && okPath(path, mv) ? order : HOLD; }
    if (kind === 'MELEE') {
      if (u.arch === 'siege') return HOLD;
      const tgt = order[1], path = order[2];
      const t = this.units.get(tgt);
      if (!t || t.owner === u.owner) return HOLD;
      if (path && path.length && !okPath(path, mv)) return HOLD;
      return ['MELEE', tgt, path && path.length ? [...path] : []];
    }
    if (kind === 'CHARGE') {
      if (u.arch !== 'cav' || u.braced) return HOLD;
      const tgt = order[1], path = order[2];
      const t = this.units.get(tgt);
      if (!t || t.owner === u.owner) return HOLD;
      if (!this.C.CHARGE_ADJ_OK && t.pos !== null && manh(u.pos, t.pos) === 1) return ['MELEE', tgt, []];
      if (!path || !path.length || !okPath(path, mv)) return HOLD;
      return ['CHARGE', tgt, [...path]];
    }
    return HOLD;
  }

  runPulse(pulse: number) {
    const o0 = this.bots[0].orders(this, 0, pulse), o1 = this.bots[1].orders(this, 1, pulse);
    const orders = new Map<number, any>();
    for (const u of this.onBoard()) orders.set(u.uid, this.validateOrder(u, (u.owner === 0 ? o0 : o1)[u.uid]));

    // Brace sub-phase (C-041)
    for (const u of this.onBoard()) {
      const k = orders.get(u.uid)[0];
      if (k === 'BRACE') u.braced = true; else if (u.braced && k !== 'MELEE') u.braced = false;
    }
    this.endSubphase(new Map(), []);

    // Ranged sub-phase (C-042)
    let contrib = new Map<string, number>();
    let instances: [number | null, number, number][] = [];
    let pushes: any[] = [];
    const wagonHits: [number, number, number][] = [];
    for (const u of this.onBoard()) {
      const o = orders.get(u.uid);
      if (!o || o[0] !== 'SHOOT') continue;
      const tgt = o[1];
      if (tgt[0] === 'U') {
        const t = this.units.get(tgt[1]);
        if (!t || t.pos === null || !(u.rmin <= manh(u.pos!, t.pos) && manh(u.pos!, t.pos) <= u.rmax)) continue;
        let dmg: number;
        if (this.terrain_on && this.ttype.get(key(t.pos)) === 'woods')
          dmg = Math.max(this.flanked(t) ? this.C.FLANK_MIN_DMG : 0, this.effAtk(u, t) - this.effGuard(t, true));
        else dmg = this.attackDamage(u, t);
        instances.push([u.uid, t.uid, dmg]);
        if (u.arch === 'siege' && this.C.SIEGE_PUSH_UNITS) {
          const dc = t.pos[0] - u.pos![0], dr = t.pos[1] - u.pos![1];
          const d: Pos = Math.abs(dc) > Math.abs(dr) ? [dc > 0 ? 1 : -1, 0] : [0, dr > 0 ? 1 : -1];
          pushes.push({ uid: t.uid, dir: d, pusher: u.uid, kind: 'siege', tgt_tile: t.pos });
        }
      } else if (tgt[0] === 'W') {
        const owner = tgt[1], idx = tgt[2];
        if (owner === u.owner || idx >= this.wagons[owner].length) continue;
        const w = this.wagons[owner][idx];
        const wpos: Pos = [w.col, this.backRow(owner)];
        if (w.hp > 0 && u.rmin <= manh(u.pos!, wpos) && manh(u.pos!, wpos) <= u.rmax) wagonHits.push([u.owner, owner, idx]);
      } else if (tgt[0] === 'P') {
        const col = tgt[1];
        if (this.palisades.has(col)) {
          const k = this.stakes[col];
          for (const tile of [[col, k - 1], [col, k]] as Pos[])
            if (u.rmin <= manh(u.pos!, tile) && manh(u.pos!, tile) <= u.rmax) { this.palisades.delete(col); break; }
        }
      }
    }
    for (const [atkP, owner, idx] of wagonHits) this.damageWagon(atkP, owner, idx, true);
    if (wagonHits.length) this.wagonWinCheck('wagons');
    this.applyDamage(instances, contrib);
    this.endSubphase(contrib, pushes);

    // Move/Charge sub-phase (C-043)
    contrib = new Map();
    const movers = new Map<number, { path: Pos[]; stopped: boolean; moved: number }>();
    for (const u of this.onBoard()) {
      const o = orders.get(u.uid);
      if (o && (o[0] === 'MOVE' || o[0] === 'MELEE' || o[0] === 'CHARGE')) {
        const path = o[0] === 'MOVE' ? o[1] : o[2];
        if (path && path.length) movers.set(u.uid, { path, stopped: false, moved: 0 });
      }
    }
    let maxlen = 0;
    for (const m of movers.values()) maxlen = Math.max(maxlen, m.path.length);
    for (let t = 0; t < maxlen; t++) {
      const proposals = new Map<string, number[]>();
      for (const uid of [...movers.keys()].sort((a, b) => a - b)) {
        const m = movers.get(uid)!, u = this.units.get(uid)!;
        if (m.stopped || t >= m.path.length || u.pos === null) continue;
        const dest = m.path[t];
        if (manh(u.pos, dest) !== 1) { m.stopped = true; continue; }
        if (this.occupied(dest)) { m.stopped = true; continue; }
        const dk = key(dest);
        if (!proposals.has(dk)) proposals.set(dk, []);
        proposals.get(dk)!.push(uid);
      }
      let movedNow: [number, Pos][] = [];
      const destKeys = [...proposals.keys()].sort((a, b) => ntc(a.split(',').map(Number), b.split(',').map(Number)));
      for (const dk of destKeys) {
        const uids = proposals.get(dk)!;
        if (uids.length >= 2) for (const uid of uids) movers.get(uid)!.stopped = true;
        else movedNow.push([uids[0], dk.split(',').map(Number) as Pos]);
      }
      for (const [uid, dest] of movedNow) { this.moveUnit(this.units.get(uid)!, dest); movers.get(uid)!.moved++; }
      if (!this.C.ZOC_ENABLED) movedNow = [];
      for (const [uid] of movedNow) {
        const u = this.units.get(uid)!;
        for (const nb of neighbors(u.pos!)) {
          const vid = this.board.get(key(nb));
          if (vid !== undefined && this.units.get(vid)!.owner !== u.owner) { movers.get(uid)!.stopped = true; break; }
        }
      }
    }
    // charge resolution (simultaneous)
    instances = []; pushes = [];
    for (const uid of [...movers.keys()].sort((a, b) => a - b)) {
      const o = orders.get(uid);
      if (!o || o[0] !== 'CHARGE') continue;
      const u = this.units.get(uid)!;
      if (u.pos === null) continue;
      const t = this.units.get(o[1]);
      if (!t || t.pos === null || movers.get(uid)!.moved < this.C.CHARGE_MOVE_MIN || manh(u.pos, t.pos) !== 1) continue;
      if (this.terrain_on && this.ttype.get(key(t.pos)) === 'woods') continue;
      if (t.arch === 'spear' && t.braced) {
        const ret = Math.max(0, t.base_atk + this.counter(t.arch, u.arch) - this.effGuard(u));
        instances.push([t.uid, u.uid, ret]);
        const d: Pos = [u.pos[0] - t.pos[0], u.pos[1] - t.pos[1]];
        pushes.push({ uid: u.uid, dir: d, pusher: t.uid, kind: 'brace', tgt_tile: u.pos });
      } else {
        const dmg = this.attackDamage(u, t, true, true);
        instances.push([u.uid, t.uid, dmg]);
        const d: Pos = [t.pos[0] - u.pos[0], t.pos[1] - u.pos[1]];
        pushes.push({ uid: t.uid, dir: d, pusher: u.uid, kind: 'charge', charger: u.uid, tgt_tile: t.pos });
      }
    }
    this.applyDamage(instances, contrib);
    this.endSubphase(contrib, pushes);

    // Melee sub-phase (C-044)
    contrib = new Map(); instances = []; pushes = [];
    const attacks: [Unit, Unit][] = [];
    for (const u of this.onBoard()) {
      const o = orders.get(u.uid);
      if (!o || o[0] !== 'MELEE') continue;
      const t = this.units.get(o[1]);
      if (!t || t.pos === null || u.pos === null || manh(u.pos, t.pos) !== 1) continue;
      attacks.push([u, t]);
    }
    for (const [u, t] of attacks) {
      instances.push([u.uid, t.uid, this.attackDamage(u, t, false, true)]);
      const ret = (t.arch === 'archer' || t.arch === 'siege') ? this.C.RANGED_RETALIATION
        : Math.max(0, t.base_atk + this.counter(t.arch, u.arch) - this.effGuard(u));
      instances.push([t.uid, u.uid, ret]);
    }
    this.applyDamage(instances, contrib);
    for (const [u, t] of attacks) {
      if (t.arch === 'spear' && t.braced && t.pos !== null && u.pos !== null && u.hp > 0 && manh(u.pos, t.pos) === 1) {
        const d: Pos = [u.pos[0] - t.pos[0], u.pos[1] - t.pos[1]];
        pushes.push({ uid: u.uid, dir: d, pusher: t.uid, kind: 'brace', tgt_tile: u.pos });
      }
    }
    this.endSubphase(contrib, pushes);
  }

  endSubphase(contrib: Map<string, number>, pushes: any[]) {
    this.removeDead(contrib);
    if (pushes.length) { this.applyPushes(pushes, contrib); this.removeDead(contrib); }
    this.routTest();
  }

  routTest() {
    const routed: number[] = [];
    for (let p = 0; p < 2; p++) {
      const s = this.standardUnit(p);
      if (s === null) continue;
      let enemyAdj = false, surrounded = true;
      for (const nb of neighbors(s.pos!)) {
        const uid = this.board.get(key(nb));
        if (uid !== undefined) {
          if (this.units.get(uid)!.owner !== p) enemyAdj = true;
          else { surrounded = false; break; }
        } else if (this.wagon_at.has(key(nb))) { /* impassable, counts as filled */ }
        else { surrounded = false; break; }
      }
      if (surrounded && enemyAdj) routed.push(p);
    }
    if (!routed.length) return;
    for (const p of routed) {
      const attacker = 1 - p, dmg = this.C.ROUT_WAGON_DMG;
      const fn = (this.bots[attacker] as any).routAllocate;
      const picks: number[] = fn ? [...fn.call(this.bots[attacker], this, attacker, p, dmg)] : [];
      for (let i = 0; i < dmg; i++) {
        const live = this.wagons[p].map((w, idx) => [idx, w] as [number, any]).filter(([, w]) => w.hp > 0);
        if (!live.length) break;
        let idx: number | null = null;
        while (picks.length) { const cand = picks.shift()!; if (live.some(([li]) => li === cand)) { idx = cand; break; } }
        if (idx === null) { live.sort((a, b) => (a[1].hp - b[1].hp) || (a[0] - b[0])); idx = live[0][0]; }
        this.damageWagon(attacker, p, idx, false);
      }
    }
    this.wagonWinCheck('rout');
    throw new ClashEnd();
  }

  interventionWindow(wno: number) {
    const C = this.C;
    for (const p of [this.komi, 1 - this.komi]) {
      const iv = this.bots[p].intervention(this, p, wno);
      if (!iv) continue;
      const res = this.res[p];
      if (iv[0] === 'SURGE' && res.tribute >= C.SURGE_COST) {
        const u = this.units.get(iv[1]), dest = iv[2];
        if (u && u.owner === p && u.pos !== null && inBounds(dest) && manh(u.pos, dest) === 1 && !this.occupied(dest)) {
          res.tribute -= C.SURGE_COST; this.moveUnit(u, dest);
        }
      } else if (iv[0] === 'SHIELDBEARER' && res.tribute >= C.SHIELDBEARER_COST) {
        const u = this.units.get(iv[1]);
        if (u && u.owner === p && u.pos !== null) { res.tribute -= C.SHIELDBEARER_COST; this.wards.push({ uid: u.uid, owner: p, active: true }); }
      }
    }
  }

  clash() {
    this.wards = [];
    try {
      this.interventionWindow(1); this.runPulse(1);
      this.interventionWindow(2); this.runPulse(2);
      this.interventionWindow(3);
    } catch (e) { if (!(e instanceof ClashEnd)) throw e; }
    this.wards = [];
  }

  // ── Phase 4: Frontier ─────────────────────────────────────────────────────
  frontier() {
    const C = this.C;
    const transfers: [number, Pos][] = [];
    for (let c = 0; c < 8; c++) {
      const k = this.stakes[c];
      const [p1, p2] = this.columnClaims(c);
      if (p1 === p2) continue;
      const mover = p1 ? 0 : 1;
      const newk = mover === 0 ? k + 1 : k - 1;
      if (!(C.STAKE_MIN <= newk && newk <= C.STAKE_MAX)) continue;
      const pushed = 1 - mover;
      if (this.palisades.get(c) === pushed) { this.palisades.delete(c); continue; }
      const taken: Pos = mover === 0 ? [c, k] : [c, k - 1];
      if (C.ENTRENCH_HOLD && (this.entrench.get(key(taken)) ?? 0) >= C.ENTRENCH_HOLD) {
        this.entrench.set(key(taken), 0); continue;
      }
      this.stakes[c] = newk;
      this.rows_lost_round[pushed]++; this.rows_taken_round[mover]++;
      transfers.push([mover, mover === 0 ? [c, k] : [c, k - 1]]);
    }
    // Trample (C-059..C-061)
    for (const [mover, tile] of transfers) {
      const f = this.fields.get(key(tile));
      if (!f) continue;
      if (f.owner === mover) { if (f.annexed !== null) f.annexed = null; continue; }
      const controller = f.annexed !== null ? f.annexed : f.owner;
      if (controller === mover) continue;
      const choice = this.bots[mover].trampleChoice(this, mover, tile, f);
      if (choice === 'annex') f.annexed = mover;
      else { (this.res[mover] as any)[f.type] += C.RAID_GAIN; this.fields.delete(key(tile)); }
    }
    // Breach (C-062..C-064), komi-holder's breachers first
    for (const p of [this.komi, 1 - this.komi]) {
      const enemy = 1 - p, rows = this.heartlandRows(enemy);
      const breachers = this.onBoard(p).filter(u => rows.includes(u.pos![1]));
      let hit = false;
      for (const u of breachers) {
        if (this.capRemaining(p) <= 0) break;
        const live = this.wagons[enemy].map((w, i) => [i, w] as [number, any]).filter(([, w]) => w.hp > 0);
        if (!live.length) break;
        const same = live.filter(([, w]) => w.col === u.pos![0]);
        let idx: number;
        if (same.length) idx = same[0][0];
        else {
          const bestD = Math.min(...live.map(([, w]) => Math.abs(w.col - u.pos![0])));
          const tied = live.filter(([, w]) => Math.abs(w.col - u.pos![0]) === bestD).sort((a, b) => a[1].col - b[1].col);
          idx = tied[0][0];
          if (tied.length > 1) {
            const pick = this.bots[p].breachTarget(this, p, u, tied);
            if (tied.some(([i]) => i === pick)) idx = pick;
          }
        }
        hit = this.damageWagon(p, enemy, idx, true) || hit;
      }
      if (hit) this.wagonWinCheck('wagons');
    }
  }

  leadHolder(): number | null {
    const score = (p: number) => [this.wagonsAlive(p), this.wagonHp(p), this.ownedRows(p)];
    const c = ntc(score(0), score(1));
    return c > 0 ? 0 : c < 0 ? 1 : null;
  }

  updateEntrench() {
    const C = this.C;
    if (!C.ENTRENCH_HOLD) return;
    const start = C.STAKE_START;
    const next = new Map<string, number>();
    for (let c = 0; c < 8; c++) {
      const k = this.stakes[c];
      let rows: number[];
      if (k > start) rows = [...Array(k - start).keys()].map(i => i + start);
      else if (k < start) rows = [...Array(start - k).keys()].map(i => i + k);
      else continue;
      for (const r of rows) next.set(key([c, r]), Math.min((this.entrench.get(key([c, r])) ?? 0) + 1, C.ENTRENCH_HOLD));
    }
    this.entrench = next;
  }

  // ── Phase 5: Pass & Tribute — caravans (C-078) ────────────────────────────
  last_artifacts: { p: number; aid: number }[] = [];   // for UI narration (not hashed)
  caravan(which: number) {
    const C = this.C, n = C.CARAVAN_ARTIFACTS;
    const start = which === 1 ? 0 : n;
    let options = this.artifact_order.slice(start, start + n);
    const rank = (p: number) => [this.wagonsAlive(p), this.ownedRows(p), p === this.komi ? 0 : 1];
    const trailing = ntc(rank(0), rank(1)) <= 0 ? 0 : 1;   // min((0,1),key=rank): first wins ties
    this.last_artifacts = [];
    for (const p of [trailing, 1 - trailing, trailing]) {
      if (!options.length) break;
      let pick = this.bots[p].artifactPick(this, p, options.slice());
      if (!options.includes(pick)) pick = options[0];
      options = options.filter(x => x !== pick);
      this.applyArtifact(p, pick);
      this.last_artifacts.push({ p, aid: pick });
    }
    // 4th discarded
  }

  applyArtifact(p: number, aid: number) {
    const C = this.C, res = this.res[p];
    if (aid === 1) res.supply += C.ARTIFACT_SUPPLY;
    else if (aid === 2) res.crop += C.ARTIFACT_CROP;
    else if (aid === 3) {
      let hero: Unit | undefined;
      for (const u of this.units.values()) if (u.owner === p && u.arch === 'hero') { hero = u; break; }
      if (hero) hero.base_guard += 1;
    } else if (aid === 4) {
      const cands = this.onBoard(p).sort((a, b) =>
        (b.xp - a.xp) || (this.costs[b.arch] - this.costs[a.arch]) || ntc(a.pos!, b.pos!));
      if (cands.length) this.gainXp(cands[0], C.ARTIFACT_XP);
    } else if (aid === 5) {
      for (const c of this.bots[p].entrenchCols(this, p))
        if (c >= 0 && c < 8 && !this.palisades.has(c)) { this.palisades.set(c, p); break; }
    } else if (aid === 6) res.tribute += C.ARTIFACT_TRIBUTE;
    else if (aid === 7) this.recruit_discount[p] = C.ARTIFACT_DISCOUNT;
    else if (aid === 8) {
      const [, crop] = this.computeHarvest(p);
      const ftype = crop < this.onBoard(p).length ? 'crop' : 'supply';
      for (let c = 0; c < 8; c++)
        for (const r of this.heartlandRows(p)) {
          const pos: Pos = [c, r];
          if (!this.fields.has(key(pos)) && !this.wagon_at.has(key(pos))) {
            this.fields.set(key(pos), { type: ftype, owner: p, annexed: null });
            return;
          }
        }
    }
  }

  // ── Round driver — full mirror of sim/engine.py play_round ────────────────
  playRound() {
    const C = this.C;
    this.cap_dmg = [0, 0]; this.wagon_dmg_round = [0, 0];
    this.rows_lost_round = [0, 0]; this.rows_taken_round = [0, 0]; this.unit_dmg_round = [0, 0];
    this.musterPlayer(this.komi); this.musterPlayer(1 - this.komi);
    for (const u of this.units.values()) u.face_down = false;
    this.clash();
    this.frontier();
    const [l0, l1] = this.rows_lost_round;
    if (l0 !== l1) this.komi = l0 > l1 ? 0 : 1;
    // golden goal (C-070)
    if (this.round >= C.GOLDEN_GOAL_ROUND) {
      const t0 = this.rows_taken_round[0] > 0 || this.wagon_dmg_round[0] > 0;
      const t1 = this.rows_taken_round[1] > 0 || this.wagon_dmg_round[1] > 0;
      if (t0 || t1) {
        let w: number;
        if (t0 && t1) {
          if (this.rows_taken_round[0] !== this.rows_taken_round[1]) w = this.rows_taken_round[0] > this.rows_taken_round[1] ? 0 : 1;
          else if (this.wagon_dmg_round[0] !== this.wagon_dmg_round[1]) w = this.wagon_dmg_round[0] > this.wagon_dmg_round[1] ? 0 : 1;
          else w = this.komi;
        } else w = t0 ? 0 : 1;
        throw new GameOver(w, 'golden-goal');
      }
    }
    // Pass & Tribute
    for (let p = 0; p < 2; p++) this.res[p].tribute += C.TRIBUTE_PER_ROW * this.rows_lost_round[p];
    if (this.round === C.CARAVAN_ROUND_1) this.caravan(1);
    else if (this.round === C.CARAVAN_ROUND_2) this.caravan(2);
    // metrics
    if (this.round === 1) {
      const [r0, r1] = this.rows_taken_round;
      if (r0 !== r1) { this.r1_winner = r0 > r1 ? 0 : 1; this.r1_rows_winner = this.r1_winner; }
      else if (this.unit_dmg_round[0] !== this.unit_dmg_round[1]
        && (!C.R1_REQUIRE_ENGAGE || Math.min(...this.unit_dmg_round) >= 1))
        this.r1_winner = this.unit_dmg_round[0] > this.unit_dmg_round[1] ? 0 : 1;
      if (C.FIRST_BLOOD_SUPPLY && this.r1_winner !== null) this.res[this.r1_winner].supply += C.FIRST_BLOOD_SUPPLY;
    }
    this.lead_trace.push(this.leadHolder());
    // hard stop (C-071)
    if (this.round >= C.HARD_STOP_ROUND) {
      const a0 = this.wagonsAlive(0), a1 = this.wagonsAlive(1);
      if (a0 !== a1) throw new GameOver(a0 > a1 ? 0 : 1, 'ladder');
      const r0 = this.ownedRows(0), r1 = this.ownedRows(1);
      if (r0 !== r1) throw new GameOver(r0 > r1 ? 0 : 1, 'ladder');
      throw new GameOver(this.komi, 'ladder');
    }
    this.updateEntrench();
    this.round++;
  }

  // Per-phase parity entry point (round 1). Replays the ported phases and
  // returns [[label, hash], …]; check_parity.ts compares against the oracle's
  // phase_hashes_r1 and reports the first divergence. Only ported phases appear.
  phaseHashesR1(): [string, string][] {
    const out: [string, string][] = [];
    // Phase 1: Muster (komi-holder first)
    this.musterPlayer(this.komi);
    this.musterPlayer(1 - this.komi);
    out.push(['muster', this.stateHash()]);
    // Phase 2: Reveal
    for (const u of this.units.values()) u.face_down = false;
    out.push(['reveal', this.stateHash()]);
    // Phase 3: Clash (round accumulators already [0,0] at round 1)
    this.clash();
    out.push(['clash', this.stateHash()]);
    // Phase 4: Frontier + komi update (C-005)
    this.frontier();
    const [l0, l1] = this.rows_lost_round;
    if (l0 !== l1) this.komi = l0 > l1 ? 0 : 1;
    out.push(['frontier', this.stateHash()]);
    // golden goal: round >= GOLDEN_GOAL_ROUND — inert at round 1
    // Phase 5: Pass & Tribute. Tribute accrues from rows lost; caravans fire
    // only at rounds CARAVAN_ROUND_1/2 (not round 1). Metrics (r1_winner,
    // lead_trace) don't enter the state hash. FIRST_BLOOD_SUPPLY is off.
    for (let p = 0; p < 2; p++) this.res[p].tribute += this.C.TRIBUTE_PER_ROW * this.rows_lost_round[p];
    out.push(['pass', this.stateHash()]);
    return out;
  }

  // canonical snapshot — keys/values must match parity/dump_golden.py::snapshot
  snapshot(): any {
    const units = [...this.units.values()]
      .map(u => ({
        uid: u.uid, owner: u.owner, arch: u.arch, base_atk: u.base_atk,
        base_guard: u.base_guard, hp: u.hp, max_hp: u.max_hp, mv: u.mv,
        rmin: u.rmin, rmax: u.rmax, pos: u.pos === null ? null : [u.pos[0], u.pos[1]],
        exhausted: u.exhausted, braced: u.braced, xp: u.xp, tier1: u.tier1,
        tier2: u.tier2, wounded_round: u.wounded_round, face_down: u.face_down,
      }))
      .sort((a, b) => a.uid - b.uid);
    return {
      round: this.round, komi: this.komi, stakes: [...this.stakes],
      res: this.res.map(r => ({ supply: r.supply, crop: r.crop, tribute: r.tribute })),
      units,
      wagons: this.wagons.map(side => side.map(w => ({ col: w.col, row: w.row, hp: w.hp, artifacts: [...w.artifacts] }))),
      fields: [...this.fields.entries()].map(([k, v]) => [k.split(',').map(Number), v]).sort(cmp),
      palisades: [...this.palisades.entries()].sort((a, b) => a[0] - b[0]),
      entrench: [...this.entrench.entries()].map(([k, v]) => [k.split(',').map(Number), v]).sort(cmp),
    };
  }

  stateHash(): string {
    return sha1hex(canonicalJSON(this.snapshot())).slice(0, 16);
  }
}

function cmp(a: any, b: any): number { return canonicalJSON(a) < canonicalJSON(b) ? -1 : 1; }

// json.dumps(sort_keys=True, separators=(',',':')) equivalent
export function canonicalJSON(v: any): string {
  if (v === null) return 'null';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'string') return JSON.stringify(v);
  if (Array.isArray(v)) return '[' + v.map(canonicalJSON).join(',') + ']';
  const keys = Object.keys(v).sort();
  return '{' + keys.map(k => JSON.stringify(k) + ':' + canonicalJSON(v[k])).join(',') + '}';
}

// ── Geometry + query helpers (faithful to sim/engine.py) ────────────────────
export function manh(a: Pos, b: Pos): number { return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]); }
export function inBounds(p: Pos): boolean { return p[0] >= 0 && p[0] < 8 && p[1] >= 0 && p[1] < 8; }
export function neighbors(p: Pos): Pos[] {
  const [c, r] = p; const out: Pos[] = [];
  if (c > 0) out.push([c - 1, r]);
  if (c < 7) out.push([c + 1, r]);
  if (r > 0) out.push([c, r - 1]);
  if (r < 7) out.push([c, r + 1]);
  return out;
}

export interface Game {
  territoryOf(p: Pos): number;
  beyondOwn(u: Unit): boolean;
  onBoard(owner?: number): Unit[];
  reserve(owner: number): Unit[];
  wagonsAlive(p: number): number;
  wagonHp(p: number): number;
  ownedRows(p: number): number;
}
Game.prototype.territoryOf = function (p: Pos): number { return p[1] < this.stakes[p[0]] ? 0 : 1; };
Game.prototype.beyondOwn = function (u: Unit): boolean { return this.territoryOf(u.pos!) !== u.owner; };
Game.prototype.onBoard = function (owner?: number): Unit[] {
  let out = [...this.board.values()].map(uid => this.units.get(uid)!);
  if (owner !== undefined) out = out.filter(u => u.owner === owner);
  // Python sorts by pos tuple (col, then row)
  return out.sort((a, b) => a.pos![0] - b.pos![0] || a.pos![1] - b.pos![1]);
};
Game.prototype.reserve = function (owner: number): Unit[] {
  return [...this.units.values()].filter(u => u.pos === null && u.owner === owner)
    .sort((a, b) => a.uid - b.uid);
};
Game.prototype.wagonsAlive = function (p: number): number { return this.wagons[p].filter(w => w.hp > 0).length; };
Game.prototype.wagonHp = function (p: number): number { return this.wagons[p].reduce((s, w) => s + Math.max(0, w.hp), 0); };
Game.prototype.ownedRows = function (p: number): number {
  return p === 0 ? this.stakes.reduce((s, k) => s + k, 0) : this.stakes.reduce((s, k) => s + (8 - k), 0);
};
