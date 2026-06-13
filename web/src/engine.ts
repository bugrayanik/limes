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
// [~] Geometry helpers (inBounds done; manh/neighbors/territory_of pending for combat)
// [ ] Phase 4 FRONTIER (carry/contest/stake-step/trample/breach/entrench)
// [ ] Phase 5 PASS & TRIBUTE + komi + caravans + golden-goal/hard-stop
// [ ] Phase 1 MUSTER (recruit/deploy/reposition/unlock/build)
// [ ] Phase 3 CLASH (pulses, ZoC, combat resolution, rout, interventions)
// [ ] Bots (HONEST first) — reuse the same parity harness

// ──────────────────────────────────────────────────────────────────────────
// Phase 0 port: geometry, Unit, Game state + setup(), canonical snapshot.
// Faithful to sim/engine.py. Parity target: web/parity/dump_golden.py hashes.
// ──────────────────────────────────────────────────────────────────────────
import { createHash } from 'node:crypto';
import { Policy } from './bots';

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
  wagons: { col: number; row: number; hp: number }[][] = [[], []];
  wagon_at = new Map<string, [number, number]>();
  komi = 1;
  round = 1;

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
        this.wagons[p].push({ col: c, row: back, hp: C.WAGON_HP });
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
      wagons: this.wagons.map(side => side.map(w => ({ col: w.col, row: w.row, hp: w.hp }))),
      fields: [...this.fields.entries()].map(([k, v]) => [k.split(',').map(Number), v]).sort(cmp),
      palisades: [...this.palisades.entries()].sort((a, b) => a[0] - b[0]),
      entrench: [...this.entrench.entries()].map(([k, v]) => [k.split(',').map(Number), v]).sort(cmp),
    };
  }

  stateHash(): string {
    return createHash('sha1').update(canonicalJSON(this.snapshot())).digest('hex').slice(0, 16);
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
