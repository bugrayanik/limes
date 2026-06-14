# Artifacts on Wagons — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make drafted artifacts persistent buffs that sit on a chosen Supply Wagon — active every round while the wagon lives, lost when it dies — across BOTH engines, kept parity-identical, then rebalanced.

**Architecture:** LIMES has two engines kept in lock-step: Python `sim/engine.py` (the oracle) and TS `web/src/engine.ts` (the client), verified by hash parity (`web/parity/check_parity.ts` vs `web/parity/golden.json`). Every rules change must land in BOTH engines with an identical canonical `snapshot()`, then goldens are regenerated. We change the artifact model from instant (`apply_artifact`) to wagon-bound (`wagon.artifacts[]` + per-round application), add bot placement, then run a sim sweep to retune numbers. The web UI (placement click + 3D labels) is TS-only.

**Tech Stack:** Python 3 (sim), TypeScript + bun (web/engine + Three.js board), the existing MT19937/sha1 parity tooling.

**Spec:** `docs/superpowers/specs/2026-06-14-artifacts-on-wagons-design.md`

---

## Phase A — Canonical mechanic in both engines (parity-locked)

The two engines MUST stay byte-identical in `snapshot()`. Implement each task in Python AND TS together, then re-run parity before moving on.

### Task A1: Add `artifacts` to the wagon data + snapshot (both engines)

**Files:**
- Modify: `sim/engine.py` (wagon creation in `setup`/muster; `snapshot`)
- Modify: `web/src/engine.ts:278` (wagon push), `web/src/engine.ts:1202` (snapshot)
- Modify: `web/parity/dump_golden.py` if it has its own snapshot copy

- [ ] **Step 1:** In `sim/engine.py`, wherever a wagon dict is created (`{'col': c, 'row': back, 'hp': ...}`), add `'artifacts': []`. In `snapshot()`, include `'artifacts': list(w['artifacts'])` in each wagon's serialized dict.
- [ ] **Step 2:** In `web/src/engine.ts`, change the wagon type to `{ col: number; row: number; hp: number; artifacts: number[] }`; at line ~278 push `{ col: c, row: back, hp: C.WAGON_HP, artifacts: [] }`; in `snapshot()` (line ~1202) serialize `artifacts: [...w.artifacts]`.
- [ ] **Step 3:** Regenerate goldens and check parity:

```bash
cd ~/Desktop/limes/web && python3 parity/dump_golden.py --suite --out parity/golden.json && bun parity/check_parity.ts
```
Expected: 108/108 PASS (empty `artifacts: []` is identical on both sides, so hashes still match).
- [ ] **Step 4:** Commit (`feat: wagons carry an artifacts list (empty; parity holds)`).

### Task A2: Caravan attaches artifacts to a wagon instead of applying instantly

**Files:**
- Modify: `sim/engine.py` `caravan()` + `apply_artifact()`
- Modify: `web/src/engine.ts:1057 caravan()` + `applyArtifact()`
- Modify: `sim/bots.py` + `web/src/bots.ts` (new `artifact_wagon` / `artifactWagon` placement method)

- [ ] **Step 1:** Add a bot method `artifact_wagon(g, p, aid) -> int` (Python) / `artifactWagon(g, p, aid): number` (TS) returning a living wagon index for player `p`. Default policy: the **rearmost living wagon with the fewest artifacts** (safest, spreads load). Add to the base Policy and all bot classes (or a shared default).
- [ ] **Step 2:** In `caravan()`, replace `applyArtifact(p, pick)` with: choose `idx = bots[p].artifactWagon(g, p, pick)`; if a living wagon exists, `wagons[p][idx].artifacts.append(pick)`; else fall back to instant `applyArtifact` (no living wagon → can't hold it). Keep `last_artifacts` recording (add the chosen wagon idx).
- [ ] **Step 3:** Regenerate goldens + parity (this WILL change hashes — that's expected; the change is real). Confirm Python and TS produce the SAME new goldens (run `dump_golden.py` then `check_parity.ts` → must be 108/108).
- [ ] **Step 4:** Commit (`feat: caravan places artifacts on wagons (both engines, parity re-locked)`).

### Task A3: Apply wagon-bound buffs every round

**Files:**
- Modify: `sim/engine.py` (harvest/upkeep + combat guard) , `web/src/engine.ts` (`computeHarvest`, muster apply, Hero guard)

Per-round effects to apply for every artifact on a LIVING wagon (`hp > 0`) of player `p` (numbers are first-pass, tuned in Phase C):

| aid | effect each round |
|---|---|
| 1 Supply Cache | +2 Supply at Muster |
| 2 Granary | +2 Crop at Muster |
| 3 Hero's Aegis | +1 Hero Guard (combat) |
| 4 Veteran's Mark | +1 XP to strongest unit |
| 5 Bulwark | palisade on the wagon's column |
| 6 War Chest | +1 Tribute |
| 7 Levy | recruit cost −1 this Muster |
| 8 Homestead | +1 to the lower of Supply/Crop |

- [ ] **Step 1:** Add a helper `wagon_buffs(g, p)` returning the multiset of live aids for `p`. In the muster/harvest step, add the economy effects (1,2,6,7,8) to that player's resources/discount. In combat guard calc, add +1 for each aid 3 if the unit is the Hero. Apply 4 (XP) and 5 (Bulwark) at the right phase.
- [ ] **Step 2:** Mirror exactly in TS. Re-run parity → 108/108 (same goldens both sides).
- [ ] **Step 3:** Commit (`feat: wagon-bound artifact buffs apply each round`).

### Task A4: Lose artifacts when the wagon dies

**Files:** `sim/engine.py` + `web/src/engine.ts` (wherever wagon `hp` reaches ≤ 0 — the breach/wagon-hit code, ~`web/src/engine.ts:800,1014`)

- [ ] **Step 1:** When a wagon's hp drops to ≤ 0, set its `artifacts = []`. (Buffs naturally stop because the per-round apply checks `hp > 0`, but clearing keeps the snapshot clean and the UI correct.)
- [ ] **Step 2:** Mirror in TS, regenerate goldens, parity 108/108.
- [ ] **Step 3:** Commit (`feat: destroyed wagons drop their artifacts`).

---

## Phase B — Web UX (TS only)

### Task B1: Human places the artifact (Caravan placement step)

**Files:** Modify `web/src/controller.ts` (caravan handling), `web/src/human.ts` if the human policy needs an `artifactWagon` hook.

- [ ] **Step 1:** For a human player at a Caravan, after the artifact is drafted, enter a placement mode: highlight the player's 3 living wagons, prompt "Place <artifact> on a wagon", and route the next wagon click to set the placement. Feed that choice into the engine's `caravan()` (the human's `artifactWagon` returns the clicked index; block until clicked).
- [ ] **Step 2:** Manual verify: play to round 4, draft, click a wagon, see the artifact attach. Commit.

### Task B2: 3D labels already exist — bind to real wagon data

**Files:** `web/src/controller.ts` (`wagonArtifactItems`)

- [ ] **Step 1:** Replace the controller-side round-robin `wagon` assignment with the engine's real `g.wagons[p][idx].artifacts`. `wagonArtifactItems()` reads each living wagon's `artifacts` and emits icon+name lines. (The `setWagonArtifacts` board renderer already exists.)
- [ ] **Step 2:** Manual verify in the demo: labels match the engine's placement and vanish when a wagon dies. Commit.

---

## Phase C — Rebalance (empirical, iterative)

### Task C1: Baseline sweep

- [ ] **Step 1:** Run the existing sim sweep with the new mechanic:

```bash
cd ~/Desktop/limes/sim && python3 run.py   # or the experiments harness used for V3
```
- [ ] **Step 2:** Record win-type distribution, median game length, and whether the trailing-side double-pick + persistence makes comeback too strong. Save findings to `sim/experiments/`.

### Task C2: Tune and re-lock

- [ ] **Step 1:** Adjust the per-round magnitudes (the Phase A3 table) and possibly `CARAVAN_ARTIFACTS` / the draft order, in BOTH engines' constants. Re-run the sweep until balance targets (similar to V3: contested games, no dominant strategy) are met.
- [ ] **Step 2:** Final parity check (108/108) + commit the tuned constants. Update the spec's effect table to the locked numbers.

---

## Self-review notes
- Parity is the spine: every Phase-A task ends with `dump_golden.py` + `check_parity.ts` = 108/108. If they diverge, the Python and TS implementations differ — fix before proceeding.
- Phase C numbers are intentionally not pre-decided (rebalance is empirical); C1 produces the data, C2 sets the values.
- The web visual/placement (Phase B) already has its renderer (`setWagonArtifacts`) and strip shipped; B just wires them to real engine state and adds the human click.
