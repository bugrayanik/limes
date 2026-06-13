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
  // Endgame (sim-validated 14/18; see v3-rules-spec C-070/C-071)
  GOLDEN_GOAL_ROUND: 14, HARD_STOP_ROUND: 18,
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
// [ ] Geometry helpers (manh, in_bounds, neighbors, territory_of)
// [ ] Unit (slots) + arch_stats / base_costs
// [ ] Game state + setup()  → first golden hash (post-setup) must match
// [ ] Phase 4 FRONTIER (carry/contest/stake-step/trample/breach/entrench)
// [ ] Phase 5 PASS & TRIBUTE + komi + caravans + golden-goal/hard-stop
// [ ] Phase 1 MUSTER (recruit/deploy/reposition/unlock/build)
// [ ] Phase 3 CLASH (pulses, ZoC, combat resolution, rout, interventions)
// [ ] Bots (HONEST first) — reuse the same parity harness
