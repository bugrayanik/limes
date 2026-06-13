# LIMES v3 — The Living Frontier — Implementable Rules Specification

**Status:** Implementation-grade spec derived from `/home/bugra/Desktop/limes/design/v3-concept.md` (sections 1–10) and audited against `/home/bugra/Desktop/limes/design/v2-audit-findings.md` (21 failures). Every rule is precise enough that two engineers implement identical behavior.

**Tagging.** Every rule is tagged **CORE** or **MODULE**.
- **CORE** = in the baseline simulation. Baseline = vanilla mirror armies (no tribe verbs, no hero actives, no T2 transforms), flat Open terrain on every tile, no Tactica, no Doctrines. Promotions/XP, Tribute, wounded recovery, caravan drafts/artifacts, and Last Stand ARE core and run in baseline. The sim acceptance contract metrics A–E run on baseline (+ the seeded terrain set for metric C, which additionally enables only the Terrain module).
- **MODULE** = the sim-optional layers: tribe verbs, hero actives, Doctrine display, Tactica cards, terrain (plus the T2-transform dependency). Modules get dedicated experiments only where named in §10 of the concept.

All numbers appear symbolically; their values live ONLY in the Constants table (Appendix B). The engine reads them from one dict.

---

## 0. Global Definitions

- **C-001 (CORE) Players & seats.** Two players. Before Setup, the matchmaker (or table agreement) designates **Player 1** and **Player 2**. Player 1's Heartland is rows 1–2; Player 2's is rows 7–8. Rows are numbered 1–8 from Player 1's back row; columns are lettered a–h (indexed 1–8).
- **C-002 (CORE) Adjacency.** "Adjacent" always means **orthogonally adjacent** (4-neighborhood). Diagonals are never adjacent for any rule: ZoC, melee, flanking, support, farmsteads, Standard Rout, Shieldbearer.
- **C-003 (CORE) Distance.** All distances (range, Lone Runner radius) are **Manhattan distance** (minimum orthogonal step count, ignoring occupancy). Distance 1 = adjacent.
- **C-004 (CORE) Scan order.** Whenever a deterministic processing order over tiles/units is required, use **scan order**: column a→h, then row 1→8 within a column (a1, a2, …, a8, b1, …, h8). A unit's scan position is its current tile.
- **C-005 (CORE) Komi-holder.** At all times exactly one player is the **komi-holder** (= "player who lost the most recent Stake-row"). At match start the komi-holder is **Player 2** (priced openly; the matchmaker alternates seats across matches). Whenever a round's Frontier step ends with Stake-rows lost: if exactly one player lost rows that round, that player becomes komi-holder; if both lost rows, the player who lost **more** rows becomes komi-holder; if both lost equal rows, the komi-holder is unchanged. All ties that this spec sends to "komi" resolve **in favor of the komi-holder**. No leftmost-frontmost convention exists anywhere; no coin flips, ever.
- **C-006 (CORE) Unit states.** A unit on the board is exactly one of: **Ready** or **Exhausted** (orthogonal flag: **Braced**, Spearman only). A unit off the board is **Wounded (in reserve)**. **"Unbroken"** = on the board and not Exhausted. (The concept's word "Shaken" names no mechanic anywhere in v3; it does not exist — see Decision D-02.)
- **C-007 (CORE) Open information.** The entire game state is public at all times **except**: (a) face-down new recruits (archetype class visible via class-marked base; nothing else), and (b) each Pulse's face-down Tactica commit (MODULE). Resources, Tribute banks, muster-supply counts, HP, states, structures: all open.
- **C-008 (CORE) Resources.** Exactly two: **SUPPLY** and **CROP**. Non-negative integers. Tribute chips are a third counter (see C-067).
- **C-009 (CORE) No healing.** Damage on a unit persists between rounds. HP is only restored by the wound-and-return cycle (C-030): a returning unit returns at full printed HP.

---

## 1. Board Geometry, Stakes, Territory

- **C-010 (CORE) Board.** `BOARD_COLS`×`BOARD_ROWS` = 8×8 tiles. There is no terrain in baseline (every tile is Open). Tiles can hold at most one unit, plus at most one token (Field) or structure (Wagon). Palisades sit on Stake edges, not tiles.
- **C-011 (CORE) Stake position.** Each column c has one **Stake** with integer position `k(c)` meaning "the Stake stands on the edge between row k and row k+1". Start: `k(c) = STAKE_START = 4` for all columns (centerline 4|5). Clamp: `STAKE_MIN = 2 ≤ k(c) ≤ STAKE_MAX = 6` (the Heartland edges 2|3 and 6|7; Stakes never enter Heartland rows 1–2 / 7–8).
- **C-012 (CORE) Territory.** In column c, Player 1 owns rows 1..k(c); Player 2 owns rows k(c)+1..8. A unit is **beyond its own Stake line** iff it stands in its column's enemy territory (P1 unit: row > k(c); P2 unit: row ≤ k(c)).
- **C-013 (CORE) Stake-row gain/loss.** When a Stake moves 1 row toward a player, that player **loses a Stake-row** (and the other gains one). Stakes move at most `STAKE_STEP_MAX = 1` row per round, only in Phase 4 (Frontier).

---

## 2. Setup (once, before round 1)

- **C-014 (CORE) Match Seed.** Dealt face-up before placement: terrain layout of rows 3–6 (MODULE — baseline: all Open), which 5 of 9 Tactica are in play (MODULE), which 3 of 5 T2 transforms are unlockable (MODULE), and the **order of the 8-artifact pool** (CORE — C-079). Baseline sims skip the three module reveals but keep the artifact order.
- **C-015 (CORE) Starting force.** Each player's free starting force: **1 Hero + 1 signature-archetype unit + 2 Swordsmen** (4 units). In baseline (vanilla mirror), the signature archetype is **Spearman** (Decision D-29). Starting units do **not** consume shared muster-supply copies (Decision D-29).
- **C-016 (CORE) Free-form placement.** Behind screens, simultaneously revealed: each player places (a) their 4 starting units on any empty tiles of their **back two rows** (Heartland), and (b) their `WAGON_COUNT = 3` Supply Wagons (HP `WAGON_HP = 3` each) on 3 **distinct columns** of their **back row** (row 1 / row 8). Wagons and units may not share a tile. After reveal, all placements are permanently open.
- **C-017 (CORE) Starting stock.** Each player starts with `START_SUPPLY = 8` Supply, `START_CROP = 6` Crop, 0 Tribute chips. Each player starts with **2 archetypes unlocked**: Swordsman + their signature archetype.
- **M-01 (MODULE — Tactica) Tactica setup.** The 5 seeded Tactica form the public rack; each player is dealt 2 (deal order: komi-holder picks first, alternating, 5th card stays on the rack face-up). Held cards are public knowledge (C-007).

---

## 3. Round Sequence

- **C-018 (CORE) Round.** Rounds are numbered 1, 2, 3, … Each round runs five phases in fixed order: **1 MUSTER → 2 REVEAL → 3 CLASH (2 Pulses) → 4 FRONTIER → 5 PASS & TRIBUTE**. Both seats act simultaneously where the phase says so. Win conditions are checked the instant they trigger (C-077).
- **C-019 (CORE) Timers & standing orders.** Digital timers: Muster `TIMER_MUSTER = 60`s, each Pulse commit `TIMER_COMMIT = 15`s (casual preset 90/30). If a commit timer expires on an untouched commit, the engine auto-repeats that player's previous round's choices for the same step wherever still legal, and substitutes HOLD-equivalents (HOLD orders, no purchases, no spends) where not. Hot-seat plays untimed.

---

## 4. Phase 1 — MUSTER (simultaneous, behind screens)

Sub-steps run in fixed order (a)→(d) for both players independently.

### (a) Harvest

- **C-020 (CORE) Field yield.** For each Field token you own that lies **in your own territory** (C-012): gain `FIELD_YIELD = 2` of its type (Supply Field → Supply; Crop Field → Crop). **Annexed** Fields (C-061) yield `ANNEX_YIELD = 1` instead. Fields in territory you've lost yield nothing (they are the enemy's now only if Annexed by them; otherwise they sit dormant and revert per C-061).
- **C-021 (CORE) Farmstead.** For each orthogonally connected group of `FARMSTEAD_SIZE = 3` or more same-type Fields that you own, all in your territory, none Annexed: gain `FARMSTEAD_BONUS = 2` extra of that type, **once per group** (Decision D-19).
- **C-022 (CORE) Land exhaustion (r12+).** Define exhaustion penalty `P(r)`: `P = 0` for r < `EXHAUSTION_START_ROUND = 12`; `P(12) = EXHAUSTION_INITIAL = 1`; for r ≥ `EXHAUSTION_ACCEL_ROUND = 13`, `P(r) = P(r−1) + EXHAUSTION_ACCEL = +2` (so 1, 3, 5, 7, …). Every **Crop** income instance (each Crop Field's yield and each Crop farmstead bonus) is reduced by P, floored at 0. Supply income is unaffected.

### (b) Upkeep

- **C-023 (CORE) Crop upkeep.** Each of your units **on the board** costs `UPKEEP_CROP = 1` Crop; each unit **beyond your own Stake line** (C-012) costs `SUPPLY_STRAIN_CROP = +1` Crop extra (total 2). Wounded units in reserve eat nothing. You allocate your Crop freely among your units; every unfed unit flips **Exhausted**. A unit fed at Upkeep while Exhausted clears Exhausted immediately. (Exhausted: see C-046.)

### (c) Build

- **C-024 (CORE) Build actions.** Place up to `BUILD_ACTIONS = 2` tokens/structures, each one of:
  - **Field** (Supply-type or Crop-type), cost `FIELD_COST = 2` Supply, on any tile you own that holds no Field, Wagon, or other token. A unit standing there does not block placement (Decision D-18).
  - **Palisade**, cost `PALISADE_COST = 3` Supply, on the Stake edge of any column that has no Palisade (max 1 per column). Effect: C-058. (Decision D-21.)
  - **Doctrine** purchase from the open display (MODULE, M-07).

### (d) Reinforce

- **C-025 (CORE) Shared muster supply.** The bank holds `MUSTER_COPIES = 6` copies of each archetype (Spearman, Swordsman, Cavalry, Archer, Siege), shared between both players. Heroes are never recruitable. Price of the next copy of an archetype = base cost + `COPY_SURCHARGE = 1` × (copies of that archetype already bought this match, by either player). Base costs: Spearman `COST_SPEARMAN = 2`, Swordsman `COST_SWORDSMAN = 3`, Archer `COST_ARCHER = 3`, Cavalry `COST_CAVALRY = 4`, Siege `COST_SIEGE = 5` (Decision D-30). With both players in the same Muster, copies are priced in declaration scan order; simultaneous purchases of the same archetype price the komi-holder's first (Decision D-30).
- **C-026 (CORE) Unlock ladder.** You may only recruit unlocked archetypes. Unlocking (paid in Reinforce, costs no Build action): 3rd archetype `UNLOCK_3RD = 6` Supply, 4th `UNLOCK_4TH = 10`, 5th `UNLOCK_5TH = 15`. You choose which archetype each unlock opens.
- **C-027 (CORE) Deploy inertia.** Place at most `DEPLOY_MAX = 2` newly recruited units **face-down on class-marked bases** on empty tiles of your Heartland rows (rows 1–2 / 7–8). The base reveals archetype class only.
- **C-028 (CORE) Repositions.** Move at most `REPOSITION_MAX = 2` existing on-board units, each to any empty tile **within your own territory** (teleport; range-free; Decision D-32). Units beyond your Stake line may be repositioned only **into** your territory (that consumes a reposition). Everything else stays where the fighting left it.
- **C-029 (CORE) Tribute as Supply.** During Muster you may spend Tribute chips as Supply at `TRIBUTE_SUPPLY_VALUE = 1` Supply per chip, for any purchase.
- **C-030 (CORE) Wounded return.** A unit wounded in round N: at Muster of round N+1 you may pay `RUSH_RETURN_COST = 1` Crop to return it now; otherwise it returns **free, automatically** at Muster of round N+2 (`WOUND_RETURN_DELAY = 2`). Returning units are placed face-up on any empty Heartland tile, at full HP, Ready; they do **not** count against the `DEPLOY_MAX` limit (Decision D-17). If no empty Heartland tile exists, the return waits a round.
- **C-031 (CORE) Standard-Bearer designation.** If your Hero is not on the board at the end of your Muster, you must designate one of your on-board units as **Standard-Bearer** (open marker). If you fail to designate, the highest-base-cost on-board unit (ties: scan order) is auto-designated (Decision D-25). The Standard (Hero, else Standard-Bearer) is the Standard Rout target (C-074).

---

## 5. Phase 2 — REVEAL

- **C-032 (CORE) Reveal.** Screens lift; all face-down recruits flip face-up simultaneously. From this moment the units are normal units (they fight this round's Clash).
- **M-02 (MODULE — tribe verbs) Post-Reveal verbs.** Tribe verbs with a Reveal timing window (e.g., Huns: reposition 2 units after the Reveal) resolve here, komi-holder's first.

---

## 6. Phase 3 — CLASH (two Pulses)

### 6.1 Pulse structure

- **C-033 (CORE) Pulses.** A Clash is exactly `PULSES_PER_CLASH = 2` Pulses. No turn cap, no most-HP timeout judgment exists inside a Clash. Each Pulse: (i) **Intervention window** (C-052), (ii) **simultaneous order commit** (+ Tactica commit, MODULE), (iii) telegraph beat (presentation only, no rules effect), (iv) the four resolution sub-phases. After Pulse 2 there is one final Intervention window (before Frontier). So the windows are: start of Pulse 1, start of Pulse 2, end of Pulse 2 (Decision D-26).
- **C-034 (CORE) Orders.** At each Pulse commit, each player secretly assigns every one of their on-board units exactly one order:
  - **HOLD** — do nothing.
  - **BRACE** — Spearman only: flip to Braced.
  - **SHOOT(target unit)** — Archer/Siege only; stationary; target must be an enemy unit (or, for Siege, a Wagon or Palisade) within range at commit; legality is re-checked at resolution.
  - **MOVE(path)** — a path of up to Mv orthogonal steps.
  - **MELEE(target unit, path)** — a path of up to Mv orthogonal steps intended to end adjacent to the target, then a melee attack in the Melee sub-phase. Path may be empty (already adjacent).
  - **CHARGE(target unit, path)** — Cavalry only: a path of **≥ `CHARGE_MOVE_MIN` = 2** steps ending adjacent to the target; attack resolves in the Move/Charge sub-phase (C-043). No straight-line requirement (Decision D-10).
  An order whose precondition fails at resolution degrades: CHARGE with < 2 tiles actually moved, or MELEE whose mover ends non-adjacent to its target (e.g., ZoC-stopped early), becomes MOVE of the executed path; SHOOT at an out-of-range/absent target becomes HOLD.
- **C-035 (CORE) Sub-phase order.** Each Pulse resolves **Brace → Ranged → Move/Charge → Melee**. Within each sub-phase all damage is **simultaneous**: compute every damage instance against the board state at the start of the sub-phase's damage step, then apply all at once. Units killed in a sub-phase still deal their damage; no first-actor coin flip, ever.
- **C-036 (CORE) End of sub-phase.** After damage application: (1) every unit at HP ≤ 0 is removed to its owner's reserve as **Wounded** (XP: C-080); (2) displacement effects queued this sub-phase are applied in scan order of the displaced unit's tile (C-048); (3) the Standard Rout test runs (C-074); (4) win conditions are checked.

### 6.2 Damage model

- **C-037 (CORE) Damage formula.** `damage = max(0, EffAtk − EffGuard)`. If the target is **flanked** — `FLANK_THRESHOLD = 2`+ enemy units adjacent to it at the damage step — the floor is `FLANK_MIN_DMG = 1` instead of 0.
- **C-038 (CORE) EffAtk.** `EffAtk = baseAtk + min(ATK_BONUS_CAP = 2, sum of attack bonuses) − penalties`, floored at 0. Attack bonuses (each exactly +1, `MOD_*` = 1): **counter-class** (Spearman attacking Cavalry; Cavalry attacking Archer; Archer attacking Spearman), **charge** (`MOD_CHARGE`), **flank** (`MOD_FLANK`, target flanked). (Hill is a Guard bonus only — Decision D-50.) Penalties (uncapped, applied after the cap): **Exhausted** `EXHAUST_ATK_PENALTY = 1`, **river-crossing** `MOD_RIVER = 1` (MODULE).
- **C-039 (CORE) EffGuard.** `EffGuard = min(GUARD_CAP = 2, sum of guard bonuses) − (EXHAUST_GUARD_PENALTY = 1 if Exhausted)`, floored at 0. **Base Guard of every unit is 0** (Decision D-06). Guard bonuses (each +1): **Support** (`MOD_SUPPORT`: ≥1 adjacent friendly unit, **denied to units beyond their own Stake line**, C-012), **Brace** (`MOD_BRACE_GUARD`), **hill** (MODULE). Guard applies against ranged and melee damage alike.
- **C-040 (CORE) Unit stats (identical across all 8 tribes; baseline army).**

  | Archetype | Atk | HP | Mv | Rng | Notes |
  |---|---|---|---|---|---|
  | Spearman | 1 | 4 | 1 | 1 | Brace stance (C-045); counter: +1 vs Cavalry (innate, incl. retaliation; Decision D-09) |
  | Swordsman | 2 | 5 | 1 | 1 | — |
  | Cavalry | 2 | 4 | 3 | 1 | Charge (C-043); counter: +1 vs Archer |
  | Archer | 2 | 3 | 1 | 1–2 | counter: +1 vs Spearman; no retaliation taken when shooting; retaliates 1 when meleed |
  | Siege | 3 | 3 | 1 | 2–3 | min range 2; cannot melee; shot pushes target 1; may target Wagons/Palisades; retaliates 1 when meleed |
  | Hero | 3 | 7 | 2 | 1 | the Standard; active ability MODULE (M-08); cannot Charge or Brace |

### 6.3 Sub-phases in detail

- **C-041 (CORE) Brace sub-phase.** Every Spearman with a BRACE order flips Braced; every Braced Spearman with any other order flips un-Braced. Braced: +1 Guard, Mv 0 (MOVE/CHARGE orders illegal at commit), pushes melee attackers back (C-045). Brace persists across Pulses and rounds until un-Braced by order or lost by displacement (any displacement of a Braced unit removes Brace; Decision D-09). A Braced Spearman may still take MELEE orders against adjacent targets without losing Brace.
- **C-042 (CORE) Ranged sub-phase.** All SHOOT orders resolve simultaneously. Range is Manhattan (C-003); no line-of-sight blocking exists in baseline (Decision D-41). The shooter takes **no retaliation**. A **Siege** hit on a unit additionally queues a push of the target 1 tile **directly away from the shooter**: along the axis (row or column) with the larger coordinate difference; if tied, along the column axis (row direction away from the shooter) (Decision D-12). A Siege hit on a **Wagon** deals exactly 1 Wagon damage (counts against the Breach cap, C-064); on a **Palisade**, destroys it (Decision D-21/D-22). Siege may target a Palisade if either tile touching that Stake edge in its column is within range.
- **C-043 (CORE) Move/Charge sub-phase.** All movement resolves in lockstep steps: at step t, every still-moving unit attempts step t of its path. A unit cannot enter a tile that is occupied (unit, Wagon) after step t−1. If two or more units would enter the same tile at the same step, **none of them enters** (all stop; Decision D-11). **ZoC:** a unit's movement ends immediately after any step that leaves it adjacent to an enemy unit (it keeps that tile). Starting adjacent to an enemy does not prevent moving away, but the stop rule applies to every step taken. After all movement: every CHARGE whose rider actually moved ≥ 2 tiles and ended adjacent to its target resolves its attack **now**, simultaneously: damage per C-037 with the charge bonus; then queue **push-through**: the target is pushed 1 tile directly away from the charger (opposite the charger across the target's tile), and if the target's tile is thereby vacated the charger **must** advance into it (Decision D-10). Exception: charging a **Braced Spearman** — C-045.
- **C-044 (CORE) Melee sub-phase.** Every unit with a MELEE order standing adjacent to its target attacks; all attacks and retaliations are simultaneous. An Archer attacking at distance 1 is a melee attack (full retaliation applies; Decision D-09). **Retaliation:** each unit that is melee-attacked retaliates against **each** of its melee attackers: retaliation damage = `max(0, baseAtk + (counter-class bonus if applicable) − attacker's EffGuard)` — except Archer and Siege, whose retaliation is exactly 1, not reduced by Guard (Decision D-08). Retaliation occurs even if the defender's HP drops to 0 this sub-phase. No retaliation is ever made against a ranged (Ranged-sub-phase) attack. After damage application, every Braced Spearman that was melee-attacked queues a push of each surviving attacker 1 tile directly away from it (C-045).
- **C-045 (CORE) Brace interactions.**
  - **Charge vs Braced Spearman:** the charge attack deals **no damage**; instead the charger immediately takes the Spearman's retaliation (`baseAtk + 1` anti-Cavalry, minus charger's EffGuard, min 0) and is queued a push 1 tile back (directly away from the Spearman). No push-through. ("The braced Spear bounces the charge back before Melee.")
  - **Melee vs Braced Spearman:** normal simultaneous exchange (C-044), then the attacker is queued a push 1 tile directly away.
  - Push-backs follow displacement rules (C-048).
- **C-046 (CORE) Exhausted.** −1 EffAtk (C-038), −1 EffGuard (C-039), cannot **carry** or **contest** a Stake (C-056), can otherwise act normally. Cleared by being fed at Upkeep (C-023).
- **C-047 (CORE) Wagons & Palisades in combat.** Wagons are immobile, impassable, occupy their tile, and can be damaged **only** by Breach (C-064), Siege shots (C-042), and Standard Rout (C-074) — never by melee or Archer fire. Every Wagon damage instance is 1 HP except Rout's. A destroyed Wagon leaves an empty tile. Palisades block nothing and never give Guard; their only effects are C-058 and being a Siege target.

### 6.4 Displacement

- **C-048 (CORE) Displacement resolution.** All pushes queued in a sub-phase apply after damage application and wounded removal, in scan order of the pushed unit's tile (C-004/C-036). A push moves the unit 1 tile in its specified direction. If the destination is off-board, occupied by any unit or Wagon, or impassable (MODULE terrain): the push **fails**, the pushed unit stays, the pushed unit takes `DISPLACE_DMG = 1`, and the blocking unit (if it is a unit) also takes 1 (Decision D-13). A unit pushed off a Hill loses that bonus naturally (MODULE); a unit pushed across a River edge or into a Gaul trap takes `RIVER_PUSH_DMG = 2` / `TRAP_PUSH_DMG = 2` (MODULE). Displacement damage can wound (remove at this sub-phase's end-step; a unit wounded by displacement still occupied its tile for earlier pushes in the queue). Displacement of a Braced unit removes Brace.

### 6.5 Tribute interventions

- **C-049 (CORE) Intervention windows.** At each of the three windows (C-033), each player may buy **at most one** intervention (Decision D-26). Declaration is open and aloud; the komi-holder declares first, then the other player (Decision D-26).
- **C-050 (CORE) SURGE.** Cost `SURGE_COST = 1` Tribute chip. Move one of your on-board units 1 orthogonal step to an empty tile (no Wagon, no unit). Normal ZoC is irrelevant (a single step is always allowed); the move may cross the Stake line. A Surge at the end-of-Pulse-2 window happens before Frontier (it can establish or break a carry).
- **C-051 (CORE) SHIELDBEARER.** Cost `SHIELDBEARER_COST = 2` Tribute chips. Declare on one of your on-board units (a **ward**, open marker). Until the end of this Clash, the first damage instance that would reduce the warded unit to HP ≤ 0 is instead redirected, in full, onto one friendly Spearman or Swordsman adjacent to the warded unit at that moment (the warded unit's owner chooses among eligible; if none is adjacent at that moment, the ward fizzles, chips spent) (Decision D-26).
- **C-052 (CORE) Window order of operations.** Within a window: komi-holder's intervention resolves fully, then the other player's. (A Shieldbearer ward "resolves" by being placed.)

### 6.6 XP & Promotions

- **C-080 (CORE) XP.** When an enemy unit is wounded (HP ≤ 0 at a sub-phase end-step), every unit whose attack, retaliation, or push dealt ≥1 damage to it during that sub-phase gains `XP_PER_WOUND = 1` XP (all contributors; failed-push damage is attributed to the pusher). XP is public and persists through wounds. (Decision D-49.)
- **C-081 (CORE) Promotions.** At `XP_TIER1 = 2` XP a unit immediately gains Tier 1: **+`PROMO_T1_HP = 1` max HP and heals 1**. At `XP_TIER2 = 4` XP it gains Tier 2: its owner chooses **+`PROMO_T2_STAT = 1` base Atk or +1 base Guard** — base-stat increases, read by the C-038/C-039 formulas as raised bases, hence OUTSIDE the ±2 bonus caps; at most one Tier-2 choice per unit, ever. The full two-tier tree is printed openly; no random offers; promotions persist through wounds (C-030). The Hero promotes like any unit. (Decision D-49.)

---

## 7. Phase 4 — FRONTIER

Processed in fixed order: **(1) Stake steps → (2) Trample → (3) Breach → (4) Bounties**. Columns process in scan order a→h (Decision D-44).

### 7.1 Carry — Stake movement

- **C-053 (CORE) Carry eligibility.** A unit is **carry-eligible** iff it is unbroken (C-006) **and** not a **Lone Runner**: a unit with no friendly on-board unit within `LONE_RUNNER_RADIUS = 2` (Manhattan) is a Lone Runner and cannot carry (its state and the friend's state are irrelevant for the radius test — any friendly on-board unit counts; Decision D-03). A Lone Runner, if unbroken, still **contests** (Decision D-05).
- **C-054 (CORE) Contest.** A unit **contests** in a column iff it is unbroken. Exhausted units neither carry nor contest.
- **C-055 (CORE) Per-column claims.** For column c with Stake at k:
  - **P1 advance claim** is valid iff (∃ carry-eligible P1 unit in column c with row > k) **and** (no contesting P2 unit in column c with row > k).
  - **P2 advance claim** is valid iff (∃ carry-eligible P2 unit in column c with row ≤ k) **and** (no contesting P1 unit in column c with row ≤ k).
  ("Beyond the Stake line" for the claimant is the enemy half of the column; the enemy contests with any unbroken unit anywhere in that same half — one cheap blocker holds the line. Decision D-04.)
- **C-056 (CORE) Stake step.** If exactly one claim is valid, the Stake moves 1 row toward that claimant's enemy (P1 claim: k → k+1; P2 claim: k → k−1), clamped to [STAKE_MIN, STAKE_MAX]. If both claims are valid, or neither, the Stake **holds** (Decision D-04). A step blocked only by the clamp is no step (no row lost).
- **C-057 (CORE) Lost-row accounting.** Each column whose Stake stepped this Frontier counts 1 Stake-row lost for the pushed player (feeds C-005 komi and C-067 Tribute).
- **C-058 (CORE) Palisade absorption.** If a Stake would step in a column that has a Palisade, and the step is **toward the Palisade's builder's side**: the Stake holds instead and the Palisade is destroyed. (A Palisade only protects its builder; an enemy step "toward you" means you lose a row.) (Decision D-21.)

### 7.2 Trample

- **C-059 (CORE) Trample trigger.** When a Stake steps, the row it crossed (the row newly transferred: row k+1 on a P1 advance to k+1 — i.e., the single tile in that column that changed owner) may contain a Field belonging to the pushed player (original or Annexed). If so, the advancing player immediately chooses:
- **C-060 (CORE) RAID.** Gain `RAID_GAIN = 3` of the Field's type once; the Field token is destroyed.
- **C-061 (CORE) ANNEX.** The Field becomes the advancing player's at yield `ANNEX_YIELD = 1`. If the Stake later steps back across it, it **reverts to its original owner at full yield** (`FIELD_YIELD`). Annexed Fields never count toward farmsteads (Decision D-20). (A reverting Field is not a Trample for the original owner — no Raid/Annex choice on reversion; Decision D-43.)

### 7.3 Breach

- **C-062 (CORE) Breach trigger.** Every unit standing on an **enemy Heartland tile** (rows 1–2 for P2's units' targets — i.e., your unit on the opponent's rows 1–2/7–8) at this point of the Frontier is a **Breacher**. Each Breacher can deal `BREACH_DMG = 1` damage to a Wagon.
- **C-063 (CORE) Breach targeting.** A Breacher hits the enemy Wagon **in its column**; if none, the nearest enemy Wagon by column distance; tie → the breaching player chooses (Decision D-23).
- **C-064 (CORE) Breach cap.** Total Wagon damage **dealt by a player per round** (Breach + Siege shots combined) is capped at `BREACH_CAP = 2`; from round `BREACH_CAP_RISE_ROUND = 13` onward the cap is `BREACH_CAP_LATE = 3`. The breaching player allocates which Breachers fire when over cap. Standard-Rout damage (C-074) is **exempt** from the cap (Decision D-23).
- **C-065 (CORE) Wagon bounty.** Each enemy Wagon you destroy (any source) pays you `WAGON_BOUNTY = 3` Supply, immediately, once per Wagon.
- **C-066 (CORE) Last Stand.** The first time one of **your** Wagons is destroyed (once per player per match), immediately pick 1 of 3 face-up boons:
  - **B1 RALLY:** all your Wounded units return to Heartland tiles now, free, full HP; and you get +1 extra deploy (`DEPLOY_MAX`+1) next Muster.
  - **B2:** a free T2 transform (MODULE M-09; **baseline substitute: VETERANCY — one of your on-board units immediately gains its next promotion tier, free, C-081**).
  - **B3:** a 3rd held Tactica for the rest of the match (MODULE M-06; **baseline substitute: ENTRENCH — place up to `ENTRENCH_PALISADES = 2` free Palisades now**). (Decision D-38.)

---

## 8. Phase 5 — PASS & TRIBUTE

- **C-067 (CORE) Tribute accrual.** Each player gains `TRIBUTE_PER_ROW = 1` Tribute chip per Stake-row they **lost** this round (C-057). Losing at a held line pays nothing. No bank cap (Decision D-28).
- **M-03 (MODULE — Tactica) Onitama pass.** Every distinct Tactica card a player committed this round slides to the opponent. Then players refill to `TACTICA_HELD = 2` from the rack (komi-holder refills first); a player over 2 puts cards of their choice on the rack face-up. The rack and all hands remain public.
- **C-078 (CORE) Caravan drafts.** At the end of rounds `CARAVAN_ROUND_1 = 4` and `CARAVAN_ROUND_2 = 8`, lay out `CARAVAN_ARTIFACTS = 4` artifacts face-up in seed order (round 4: pool artifacts 1–4; round 8: artifacts 5–8 — C-079). Pick priority ("trailing player"): fewer Wagons remaining; tie → fewer owned rows (Σ over columns of rows on your side); tie → komi-holder. The trailing player picks 1st and 3rd, the leader picks 2nd, the 4th is discarded (`CARAVAN_DISCARD = 1`; Decision D-37). Artifacts resolve immediately and are open information.
- **C-079 (CORE) Artifact pool.** Exactly `ARTIFACT_POOL = 8` artifacts, fully deterministic, ordered by the Match Seed (Decision D-48): **1 PLUNDER CART** — gain `ARTIFACT_SUPPLY = 4` Supply. **2 GRAIN CACHE** — gain `ARTIFACT_CROP = 4` Crop. **3 LEGION STANDARD** — your Hero gains +1 base Guard permanently (a base-stat raise, outside the Guard bonus cap; a unit may hold at most one base-stat artifact). **4 DRILLMASTER** — one of your on-board units gains `ARTIFACT_XP = 2` XP. **5 ENGINEER'S WAGON** — place 1 free Palisade now (normal placement rules, C-024). **6 TRIBUTE COFFER** — gain `ARTIFACT_TRIBUTE = 2` Tribute chips. **7 FRESH LEVIES** — your next recruit this match costs `ARTIFACT_DISCOUNT = 2` less (floor 1). **8 SURVEYOR** — place 1 free Field (either type) now on a legal owned tile.
- **C-068 (CORE) Round end.** Komi-holder updates per C-005. Round counter increments; endgame clocks (C-022 exhaustion, C-064 cap rise, C-070 golden goal) key off the new round number.

---

## 9. Winning, Endgame Clocks, Ties

- **C-069 (CORE) Primary win — SACK THE WAGONS.** A player whose opponent has 0 Wagons remaining wins immediately.
- **C-070 (CORE) Golden goal.** If round `GOLDEN_GOAL_ROUND − 1 = 13` ends with both players still owning ≥1 Wagon, every round from `GOLDEN_GOAL_ROUND = 14` is a **golden-goal round**: at the end of its Frontier, if either player achieved a **trigger** this round (caused ≥1 Stake-row loss to the enemy, or dealt ≥1 Wagon damage), the game ends and the triggering player wins. If **both** triggered: more enemy Stake-rows taken this round wins; tie → more Wagon damage dealt this round; tie → komi-holder wins (Decision D-35).
- **C-071 (CORE) Hard stop & residual ladder.** If no golden goal has resolved by the end of round `HARD_STOP_ROUND = 18`, the game ends on the ladder: (1) most Wagons remaining; (2) most owned rows (Σ over 8 columns of rows on your side of the Stake); (3) komi-holder wins (Decision D-36). Target: <2% of games reach this ladder (sim contract D).
- **C-072 (CORE) Simultaneous final Wagons.** If both players' last Wagons are destroyed in the same step, the komi-holder wins (Decision D-34).
- **C-073 (CORE) Rout test target.** Your **Standard** is your Hero if on board, else your designated Standard-Bearer (C-031). If your Hero is wounded mid-Clash, no rout test applies to you until a Standard-Bearer is designated next Muster (Decision D-25).
- **C-074 (CORE) STANDARD ROUT.** At the end of every sub-phase (C-036): if a player's Standard has **every adjacent tile** (existing on-board tiles only — the board edge is absent, not impassable; Decision D-24) occupied by **enemy units** or impassable (Wagons only — no terrain type is impassable, M-04), and at least one adjacent tile is an enemy unit, that Standard's army routs: the **Clash ends instantly** (remaining sub-phases, Pulses, and intervention windows are skipped; the round proceeds to Frontier) and `ROUT_WAGON_DMG = 2` Wagon damage lands on the routed player, distributed among their Wagons by the routing player, exempt from the Breach cap (Decision D-23/D-24). A tile occupied by a friendly unit prevents the rout. If **both** Standards rout in the same test, both effects apply (Decision D-24).

- **C-075 (CORE) Komi summary (explicit, priced openly).** Komi (C-005) decides exactly: simultaneous-purchase pricing (C-025), intervention declaration order (C-049), simultaneous final-Wagon destruction (C-072), golden-goal full tie (C-070), ladder floor (C-071), and MODULE draft/refill priorities (M-01, M-03, M-04). Contested Stakes always **hold** (never komi). Movement collisions always **stop both** (never komi).
- **C-076 (CORE) No-RNG guarantee.** No rule in this spec consults randomness after the Match Seed is dealt. Identical inputs ⇒ identical outcomes (lockstep netcode safe).
- **C-077 (CORE) Win-check timing.** C-069/C-070/C-071 are evaluated the instant their conditions arise (including mid-Clash via Siege, and mid-Frontier via Breach/bounty steps). The first satisfied check ends the game.

---

## 10. Modules (sim-optional layers)

- **M-04 (MODULE — terrain; ON for contract metric C's seeded set).** The Match Seed lays a terrain map on **rows 3–6 only** (rows 1–2 and 7–8 are always Open), mirrored across the 4|5 centerline so both halves are identical. Types and complete deterministic effects:
  - **Open:** no effect.
  - **Hills (tile):** the occupant gains +1 Guard (`MOD_HILL`, counts toward `GUARD_CAP`). A unit pushed off a Hill simply loses it. No Atk effect (Decision D-50).
  - **Woods (tile):** the occupant cannot be the target of a CHARGE (such an order degrades to MOVE at resolution), and gains +1 Guard against SHOOT damage only (counts toward the cap in that computation).
  - **River (edge feature between two tiles):** a melee or charge attack across a River edge takes the −`MOD_RIVER` (1) EffAtk penalty (applied after the cap). A unit pushed across a River edge completes the push and takes `RIVER_PUSH_DMG = 2` (replacing normal blocked-push rules for that edge). Ordinary movement across a River edge is free.
  - **Road (tile):** a unit whose entire executed path this sub-phase consists of Road tiles gains +1 Mv (`MOD_ROAD`) for that path.
  - No terrain type is impassable; "impassable" in the Rout test means Wagons only (C-074). Fields may be built on any terrain.
- **M-05 (MODULE — tribe verbs).** One rule-bending verb per tribe, never stats: **Huns** reposition up to 2 units after the Reveal (M-02 timing); **Gauls** pre-place 2 trap tokens at Setup on own-half tiles, hidden as generic markers — a unit pushed onto one takes `TRAP_PUSH_DMG = 2`, trap spent (traps are enterable, not impassable); **Egyptians** get a 3rd Build action usable only for a Field; **Spartans'** Braced units cannot be displaced; **Persians** once per Muster peek at 1 face-down enemy base's archetype class. The remaining 3 tribes' verbs: TBD at the same power budget. Countability law: any verb touching hidden info reveals **category, never detail**.
- **M-06 (MODULE — Tactica).** 9-card pool; seed picks 5; hold 2 (public); each Pulse commit 1 of your 2 held (the same card may be committed in both Pulses; Decision D-39); flip simultaneous with orders; effects last that Pulse unless stated; used cards pass at Phase 5 (M-03). **The 9 cards (provisional, ±1 budget; Decision D-51):** 1 FORCED MARCH — up to 2 of your units +1 Mv. 2 VOLLEY — your Archers +1 max Rng. 3 SHIELD WALL — up to 2 adjacent friendly Spearmen/Swordsmen +1 Guard. 4 FEINT — choose 1 enemy unit: counter-class bonuses against and by it are off. 5 OUTFLANK — 1 of your units ignores ZoC stops. 6 RALLY — clear Exhausted from up to 2 of your units. 7 DIG IN — 1 of your Swordsmen may BRACE (as a Spearman, this Pulse's Brace sub-phase). 8 SKIRMISH STEP — 1 of your Archers may move 1 tile after the Ranged sub-phase. 9 PRESS THE LINE — choose a column: your carry there ignores the Lone Runner rule this round. Contingency if the 2×2 commit matrix sims flat: `TACTICA_HELD_CONTINGENCY = 3` held and/or spent-posture (a card you just played returns face-up and cannot be your next commit).
- **M-07 (MODULE — Doctrine display).** `DOCTRINE_DISPLAY = 8` face-up one-copy Doctrine tokens, each listing its counter-Doctrine. Base price `DOCTRINE_BASE_PRICE = 4` Supply; untaken Doctrines gain a −`DOCTRINE_AGING = 1` Supply discount chip per round (floor `DOCTRINE_MIN_PRICE = 1`). Any player may scrap a displayed Doctrine for **half its current cost rounded up** as priced denial (a Build action). Purchase is a Build action (C-024). **The 8 doctrines (provisional, permanent while held; Decision D-51):** 1 PHALANX DRILL [Spear] — your Braced push-backs move 2 tiles (counter: COMPOSITE BOWS). 2 COMPOSITE BOWS [Archer] — your Archers +1 max Rng while not adjacent to any enemy (counter: STORM SHIELDS). 3 STORM SHIELDS [Sword] — your Swordsmen take −1 from SHOOT damage, floor 0 (counter: HORSE LORDS). 4 HORSE LORDS [Cavalry] — your Charges need only 1 tile moved (counter: PHALANX DRILL). 5 ENGINEERS [Siege] — your Siege may move 1 and still SHOOT (counter: HORSE LORDS). 6 QUARTERMASTER [economy] — Supply Strain waived for up to 2 of your units each Upkeep (counter: SCORCHED EARTH). 7 SCORCHED EARTH [economy] — your Raids gain +2 (counter: QUARTERMASTER). 8 FIELD MEDICS [economy] — one free rush-return per round (counter: SCORCHED EARTH).
- **M-08 (MODULE — hero actives).** v2 hero kits with deterministic triggers, rebudgeted to the ±1 scale, each with a designed built-in counter; budget law: no active may exceed one Tactica card's effect size. Baseline Hero has stats only (C-040).
- **M-09 (MODULE — T2 transforms).** Seed marks `T2_UNLOCKABLE = 3` of the `T2_POOL = 5` transforms purchasable. Bought in Reinforce; upgrades ONE on-board unit permanently. **The 5 (provisional; Decision D-51):** 1 Spearman→PHALANX (+1 max HP; negates the Charge +1 even un-Braced). 2 Swordsman→LEGIONARY (+1 max HP). 3 Cavalry→CATAPHRACT (push-through blocked-push damage is 2). 4 Archer→LONGBOW (Rng 1–3). 5 Siege→BALLISTA (its SHOOT becomes two attacks at the same target at −1 Atk each). Price: tuned in the module experiment. (Last Stand B2 grants one free; baseline substitute per C-066.)

Baseline simulation explicitly disables M-01…M-09: the Clash skips Tactica commits, Setup skips the three module seed reveals, Phase 5 skips M-03; caravans/artifacts (C-078/C-079), promotions (C-080/C-081), Tribute, and Last Stand all remain ON in baseline.

---

## Appendix A — Decisions (every ambiguity in the concept brief and the ruling made)

- **D-01 Adjacency & distance metric unstated** → orthogonal 4-adjacency everywhere; all distances Manhattan; one metric for ZoC, melee, flank, support, rout, range, Lone Runner radius (C-002/C-003).
- **D-02 "Shaken" appears once, undefined** → no Shaken state exists in v3; "unbroken" = on board and not Exhausted (C-006).
- **D-03 Lone Runner "within 2 tiles" metric and who counts** → Manhattan ≤ 2; any friendly on-board unit counts regardless of state (C-053).
- **D-04 Carry/contest geometry ("beyond it") ambiguous** → "beyond the Stake line" = the enemy half of the column for the claimant; the enemy contests with any unbroken unit anywhere in that half (a cheap blocker on its own side holds the line, matching the concept's blocker text); both-claims-valid or neither = Stake holds (C-055/C-056).
- **D-05 Can a Lone Runner or Exhausted unit contest?** → Lone Runner: contests but cannot carry. Exhausted: neither carries nor contests (concept: contest requires "unbroken") (C-053/C-054).
- **D-06 No Guard stat in the unit table** → base Guard = 0 for all units; Guard exists only as capped bonuses (C-039).
- **D-07 "Support guard bonus" undefined** → +1 Guard when ≥1 adjacent friendly unit; denied beyond own Stake line per Supply Strain (C-039).
- **D-08 Retaliation rules unspecified (v2 audit gap #4)** → melee defender retaliates vs each attacker: baseAtk + counter-class − attacker's EffGuard, min 0; Archer and Siege retaliate exactly 1 (unreduced); never vs ranged; retaliation happens even if defender dies (simultaneity) (C-044).
- **D-09 Spear "+1 vs Cavalry" scope; brace vs melee/charge mechanics; braced unit attacking** → +1 vs Cavalry is innate (not brace-only) and applies in retaliation; Charge vs Braced Spear deals no damage, charger eats retaliation and is pushed back; plain melee vs Braced Spear exchanges normally then attacker is pushed back; displacement removes Brace; a Braced Spearman may melee without losing Brace (C-041/C-045).
- **D-10 Charge definition** → Cavalry-only; ≥2 tiles actually moved this sub-phase, any path (no straight-line requirement), ending adjacent; damage resolves in Move/Charge sub-phase; push-through = target pushed directly away and charger must advance into a vacated tile (C-034/C-043).
- **D-11 Simultaneous movement collisions** → lockstep steps; contested tile entered by no one (both stop); blocked = stop; never komi (C-043).
- **D-12 Push direction for non-collinear Siege shots** → away along the axis with larger coordinate delta; tie → column axis (C-042).
- **D-13 Displacement into occupied/impassable** → push fails, pushed unit stays; 1 damage to pushed unit and to a blocking unit; off-board counts as blocked (C-048).
- **D-14 Deterministic ordering of queued pushes** → scan order (a1→h8) of the pushed unit's tile (C-004/C-048).
- **D-15 Exhausted exact effect** → −1 EffAtk (floor 0), −1 EffGuard (floor 0), cannot carry or contest; can act; cleared immediately when fed at Upkeep (C-046/C-023).
- **D-16 Upkeep shortfall allocation** → owner allocates Crop freely among units; each unfed unit flips Exhausted; reserve units eat nothing (C-023).
- **D-17 Wounded-return timing contradiction (§2 "stand back up / paid last round" vs §6 "return next round, 1 Crop to rush")** → wounded round N: pay 1 Crop at Muster N+1 to return then, else free automatic return at Muster N+2; full HP, Heartland placement, doesn't consume a deploy (C-030).
- **D-18 Field cost & placement blocking unstated** → Field costs 2 Supply; placed on owned tile with no token/Wagon; a standing unit doesn't block (C-024).
- **D-19 Farmstead bonus stacking** → +2 once per connected same-type group of ≥3, not per field (C-021).
- **D-20 Annexed fields and farmsteads** → Annexed Fields never count toward farmsteads; reversion restores full yield (and farmstead eligibility) to the original owner (C-061).
- **D-21 Palisade effect never specified** → Palisade (3 Supply, 1 per column, on the Stake edge) absorbs the next Stake step toward its builder (Stake holds, Palisade destroyed); destroyed by one Siege hit; gives no Guard (C-024/C-058/C-042).
- **D-22 What can damage Wagons/structures, and how much** → Wagons damaged only by Breach (1), Siege shot (1), Rout (2); melee/Archer never; Wagon tiles impassable (C-047).
- **D-23 Breach with no Wagon in column; cap scope; Rout damage vs cap** → nearest Wagon by column distance, tie broken by breaching player; cap covers all Wagon damage a player deals per round from Breach + Siege; Rout's 2 damage is exempt and distributed by the routing player (C-063/C-064/C-074).
- **D-24 Rout edge cases** → board edge is a missing tile, not impassable (edge Standards need fewer surrounders is FALSE — they need all *existing* adjacent tiles filled, ≥1 by an enemy unit); friendly-occupied tile prevents rout; double rout = both suffer; rout's only effects are clash-end + 2 Wagon damage (C-074).
- **D-25 Standard-Bearer designation procedure** → designated at Muster whenever Hero off board; default = highest-base-cost on-board unit, scan-order tiebreak; no rout test against a player between mid-clash Hero loss and next designation (C-031/C-073).
- **D-26 Intervention window timing/limits (concept lists Shieldbearer "redirect" at a boundary)** → three windows (start P1, start P2, end P2); max 1 intervention per player per window; komi-holder declares and resolves first; Shieldbearer is a declared ward lasting the Clash that redirects the first lethal damage instance onto an adjacent friendly Spear/Sword chosen by the ward's owner, fizzling if none adjacent (C-033/C-049/C-051).
- **D-27 Surge legality** → 1 step to an empty tile, any direction, may cross the Stake line, ZoC irrelevant for a single granted step; end-of-Pulse-2 Surge precedes Frontier (C-050).
- **D-28 Tribute bank cap** → none (C-067).
- **D-29 Starting resources, baseline signature class, and whether starting forces consume shared copies** → 8 Supply / 6 Crop start; baseline signature = Spearman; starting forces consume no shared copies (C-015/C-017).
- **D-30 Base unit prices unstated** → Spear 2, Sword 3, Archer 3, Cavalry 4, Siege 5; copy surcharge counts both players' purchases; simultaneous same-archetype purchases price komi-holder first (C-025).
- **D-31 Unlock mechanics** → paid during Reinforce, free choice of class, no Build action consumed (C-026).
- **D-32 Reposition semantics** → teleport to any empty owned tile; forward units may only reposition back inside territory (C-028).
- **D-33 Komi floor before any Stake-row is lost** → initial komi-holder = Player 2, assigned at matchmaking, priced openly; komi update rule on multi-loss rounds = bigger loser, tie = unchanged (C-005).
- **D-34 Both last Wagons die same step** → komi-holder wins (C-072).
- **D-35 Golden-goal double trigger** → more rows taken → more Wagon damage → komi-holder (C-070).
- **D-36 Golden goal never resolving** → hard stop after round 18, then ladder: Wagons → owned rows → komi-holder (C-071).
- **D-37 Caravan "alternating, 1 discarded" with 4 artifacts** → trailing player picks 1st and 3rd, leader 2nd, 4th discarded (C-078).
- **D-38 Last Stand boons 2–3 reference modules** → baseline substitutes: VETERANCY (one unit gains its next promotion tier free) and ENTRENCH (2 free Palisades); full game uses concept boons (C-066).
- **D-39 Tactica hand flow (can the same card fire both Pulses? refill?)** → yes, same card may commit twice; all distinct used cards pass; refill to 2 from rack, komi-holder first, hand cap 2 (M-03/M-06).
- **D-40 Land exhaustion schedule & scope ("−1 cumulative from r12", "accelerates −2/round from r13")** → P(12)=1, P(r≥13)=P(r−1)+2 (1,3,5,7…); applies per Crop income instance (field yields and crop farmstead bonuses), floor 0 each; Supply untouched (C-022).
- **D-41 Line of sight & ranged targeting** → no LoS blocking in baseline; SHOOT targets a unit, legality re-checked at resolution, illegal degrades to HOLD; Archer attack at distance 1 is melee (C-034/C-042/C-044).
- **D-42 Order model unstated (how units act each Pulse)** → one order per unit per Pulse from {HOLD, BRACE, SHOOT, MOVE, MELEE, CHARGE}; MELEE/CHARGE include their approach movement; degraded-order rules fixed (C-034).
- **D-43 Trample scope** → only the single transferred tile per column per step; reversion of an Annexed field is not a new Trample (no Raid/Annex on the way back) (C-059/C-061).
- **D-44 Frontier processing order** → Stakes → Trample → Breach → Bounties; columns in scan order (§7).
- **D-45 Siege melee** → Siege cannot make melee attacks (min range 2); retaliates 1 (C-040/C-044).
- **D-46 Healing** → none outside the wound cycle; returning units come back at full HP (C-009/C-030).
- **D-47 Hero recruitment/charge/brace** → Heroes are never recruitable, cannot Charge or Brace; Hero counts as a normal unit for upkeep, support, flank, carry, contest (C-025/C-040).
- **D-48 Caravans named CORE-side but artifact pool undefined** → caravan drafts and artifacts are CORE (they are not in the design's module enumeration: tribe verbs, hero actives, doctrines, Tactica, terrain); a fixed deterministic 8-artifact pool is defined (C-079) and the Match Seed only orders it — r4 shows artifacts 1–4, r8 shows 5–8.
- **D-49 Promotions kept from v2 but XP source and tree content unspecified** → promotions/XP are CORE; 1 XP per unit contributing damage in the sub-phase an enemy is wounded; Tier 1 (2 XP) = +1 max HP & heal 1; Tier 2 (4 XP) = owner's choice of +1 base Atk or +1 base Guard, a base-stat raise outside the ±2 bonus caps, once per unit (C-080/C-081).
- **D-50 "Hill" listed as one ±1 modifier without a side** → Hills grant +1 Guard to the occupant only, no Atk ("pushed off Hills loses the bonus", singular); Woods = un-Chargeable + 1 Guard vs SHOOT; River = −1 EffAtk across the edge + 2 push damage; Road = +1 Mv on all-Road paths; no impassable terrain exists (M-04).
- **D-51 Module content unnamed in the concept (9 Tactica, 8 Doctrines, 5 T2 transforms, hero actives, 3 tribe verbs)** → provisional ±1-budget content lists are specified in §10 so module experiments are runnable; all obey the countability law; final content is tuned in those dedicated experiments, never in baseline.

---

## Appendix B — CONSTANTS (single source of truth; the engine reads this dict)

```
# Board & stakes
BOARD_COLS=8
BOARD_ROWS=8
HEARTLAND_ROWS=2
STAKE_START=4
STAKE_MIN=2
STAKE_MAX=6
STAKE_STEP_MAX=1
LONE_RUNNER_RADIUS=2

# Wagons, breach, rout
WAGON_COUNT=3
WAGON_HP=3
WAGON_BOUNTY=3
BREACH_DMG=1
BREACH_CAP=2
BREACH_CAP_LATE=3
BREACH_CAP_RISE_ROUND=13
ROUT_WAGON_DMG=2

# Economy
START_SUPPLY=8
START_CROP=6
FIELD_COST=2
FIELD_YIELD=2
FARMSTEAD_SIZE=3
FARMSTEAD_BONUS=2
ANNEX_YIELD=1
RAID_GAIN=3
PALISADE_COST=3
BUILD_ACTIONS=2
UPKEEP_CROP=1
SUPPLY_STRAIN_CROP=1
EXHAUSTION_START_ROUND=12
EXHAUSTION_INITIAL=1
EXHAUSTION_ACCEL_ROUND=13
EXHAUSTION_ACCEL=2

# Muster
MUSTER_COPIES=6
COPY_SURCHARGE=1
UNLOCK_3RD=6
UNLOCK_4TH=10
UNLOCK_5TH=15
COST_SPEARMAN=2
COST_SWORDSMAN=3
COST_ARCHER=3
COST_CAVALRY=4
COST_SIEGE=5
DEPLOY_MAX=2
REPOSITION_MAX=2
RUSH_RETURN_COST=1
WOUND_RETURN_DELAY=2

# Tribute
TRIBUTE_PER_ROW=1
TRIBUTE_SUPPLY_VALUE=1
SURGE_COST=1
SHIELDBEARER_COST=2
INTERVENTIONS_PER_WINDOW=1

# Combat
PULSES_PER_CLASH=2
ATK_BONUS_CAP=2
GUARD_CAP=2
MOD_FLANK=1
MOD_SUPPORT=1
MOD_BRACE_GUARD=1
MOD_CHARGE=1
MOD_COUNTER=1
MOD_HILL=1            # MODULE (Guard only)
MOD_RIVER=1           # MODULE (EffAtk penalty)
MOD_ROAD=1            # MODULE (+1 Mv on all-Road paths)
FLANK_THRESHOLD=2
FLANK_MIN_DMG=1
EXHAUST_ATK_PENALTY=1
EXHAUST_GUARD_PENALTY=1
DISPLACE_DMG=1
RIVER_PUSH_DMG=2      # MODULE
TRAP_PUSH_DMG=2       # MODULE
CHARGE_MOVE_MIN=2
PUSH_BACK=1
RANGED_RETALIATION=1  # archer/siege retaliate-when-meleed value

# Unit stats
SPEAR_ATK=1;  SPEAR_HP=4;  SPEAR_MV=1;  SPEAR_RNG=1
SWORD_ATK=2;  SWORD_HP=5;  SWORD_MV=1;  SWORD_RNG=1
CAV_ATK=2;    CAV_HP=4;    CAV_MV=3;    CAV_RNG=1
ARCHER_ATK=2; ARCHER_HP=3; ARCHER_MV=1; ARCHER_RNG_MAX=2
SIEGE_ATK=3;  SIEGE_HP=3;  SIEGE_MV=1;  SIEGE_RNG_MIN=2; SIEGE_RNG_MAX=3
HERO_ATK=3;   HERO_HP=7;   HERO_MV=2;   HERO_RNG=1

# XP & promotions (CORE)
XP_PER_WOUND=1
XP_TIER1=2
XP_TIER2=4
PROMO_T1_HP=1
PROMO_T2_STAT=1

# Caravans & artifacts (CORE)
CARAVAN_ROUND_1=4
CARAVAN_ROUND_2=8
CARAVAN_ARTIFACTS=4
CARAVAN_DISCARD=1
ARTIFACT_POOL=8
ARTIFACT_SUPPLY=4
ARTIFACT_CROP=4
ARTIFACT_XP=2
ARTIFACT_TRIBUTE=2
ARTIFACT_DISCOUNT=2

# Endgame  (sim-validated 2026-06-13: pulled in from 16/20; 16/20 failed contracts D/B and the sandbag gap. Operational reference: sim/experiments/final/v1_base.)
GOLDEN_GOAL_ROUND=14
HARD_STOP_ROUND=18
LASTSTAND_BOONS=3
ENTRENCH_PALISADES=2       # baseline boon substitute (B3)

# Timers
TIMER_MUSTER=60
TIMER_COMMIT=15
TIMER_MUSTER_CASUAL=90
TIMER_COMMIT_CASUAL=30

# Modules
TACTICA_POOL=9             # MODULE
TACTICA_RACK=5             # MODULE
TACTICA_HELD=2             # MODULE
TACTICA_HELD_CONTINGENCY=3 # MODULE
DOCTRINE_DISPLAY=8         # MODULE
DOCTRINE_BASE_PRICE=4      # MODULE
DOCTRINE_AGING=1           # MODULE
DOCTRINE_MIN_PRICE=1       # MODULE
T2_POOL=5                  # MODULE
T2_UNLOCKABLE=3            # MODULE
GAUL_TRAPS=2               # MODULE
HUN_REPOSITIONS=2          # MODULE
```

---

## Appendix C — Sim Acceptance Contract (restated; the tuning gate)

Run on the C++ resolver with policy bots, baseline rules (CORE only; Terrain module ON only for metric C's seeded set), BEFORE any UI:

- **A.** Round-1 clash winner takes the match **55–65%**.
- **B.** Lead changes after round 7 in **15–30%** of games. ✅ **PASS (0.19).** (Band widened 2026-06-13 from 25–35% to endorse *sticky positional leads* — the chess-like identity of v3 — after the metric was corrected to mirror the ladder win-rule C-071: wagons → wagon_hp → owned rows, residual tie = contested. The old metric broke ties by total army_hp, which flips on a single point of combat attrition and is NOT part of being "ahead"; that noise alone had inflated B from 0.19 to ~0.42 and made the game look "too swingy" when leads are in fact sticky.)
- **C.** Aggressive-vs-turtle policy winrates within **45–55%** across the seeded terrain set (turtle-vs-turtle, turtle-vs-prober, all-in-vs-turtle). (Removed sandbagger-vs-honest from this passive-pairing band 2026-06-13 — that pairing measures baseline-bot quality, now tracked under E's note, not passive balance.)
- **D.** Median game ends by Wagons/Rout in **rounds 11–14**; **<2%** reach the residual tie ladder (C-071).
- **E.** Sandbagging is **EV-non-positive as a tactic**, measured causally: a policy that deliberately concedes early Stake-rows does **not out-perform the same policy with concession disabled** — SANDBAGGER vs **TWIN** (identical cfg, `sandbag_until=0`) **≤ 0.50**. (Re-scoped 2026-06-13. The raw SANDBAGGER-vs-HONEST gap ~0.72 is **not** this contract: three angles — economy knobs, Tribute removal, and entrenchment — all proved it is the *aggressive-counterpunch chassis beating the vanilla HONEST baseline*, not a sandbag exploit. That gap is addressed by improving the HONEST baseline bot, not by rules. See `design/v3-entrenchment-design.md` §7.)

Primary sweep knobs (all in Appendix B): SUPPLY_STRAIN_CROP vs TRIBUTE_PER_ROW vs EXHAUSTION_*; LONE_RUNNER_RADIUS; SURGE_COST/SHIELDBEARER_COST; WAGON_BOUNTY, BREACH_CAP*; MUSTER_COPIES/COPY_SURCHARGE/UNLOCK_*; FIELD_YIELD/FARMSTEAD_BONUS/ANNEX_YIELD; START_SUPPLY/START_CROP; timers.
