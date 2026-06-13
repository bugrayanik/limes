# Entrenchment (Anti-Sandbag) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the C-058b "Entrenchment" rule to the LIMES sim engine — forward ground held 2 rounds beyond the original Stake line hardens, costing a reclaimer one extra push — to neutralise the SANDBAGGER dominant strategy without re-introducing snowball.

**Architecture:** A per-tile `entrench` counter on `Game`, grown at round-end for currently-held forward tiles and consumed (crack-then-yield) when an entrenched tile would be reclaimed in `frontier()`. Gated by a new `ENTRENCH_HOLD` constant that defaults to **0 (OFF)** — so all existing results are bit-identical until a config opts in with `ENTRENCH_HOLD=2`.

**Tech Stack:** Python 3.14, deterministic sim (`sim/engine.py`), `pytest`, the existing `sim/experiments/final/battery.py` acceptance harness.

**Spec:** `design/v3-entrenchment-design.md`

**Key invariant that makes this safe:** rows are 0-indexed; the original line is `STAKE_START=4`. P1-forward tiles are rows ≥4, P2-forward tiles are rows <4 — **disjoint sets**. A tile that flips owner therefore can never be "forward" for both players, which eliminates any entrench-count inheritance across a flip.

---

### Task 0 (optional): Put the sim under version control

The project is not currently a git repo, so the commit steps below are written as **checkpoints = "run the full suite green"**. If you want real commits, do this once first; otherwise treat each "Checkpoint" as a suite run.

- [ ] **Step 1: Init (optional)**

```bash
cd /home/bugra/Desktop/limes && git init && printf "__pycache__/\n*.pyc\n" > .gitignore && git add -A && git commit -m "chore: snapshot before entrenchment work"
```

---

### Task 1: Add the `ENTRENCH_HOLD` constant (default OFF) and the `entrench` state

**Files:**
- Modify: `sim/engine.py` (CONSTANTS dict near line 92; `Game.__init__` near line 225)
- Test: `sim/test_entrench.py` (create)

- [ ] **Step 1: Write the failing test**

```python
# sim/test_entrench.py
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import engine, bots


def _game(**ov):
    b = bots.make_bot('HONEST')
    return engine.Game([b, b], seed=1, overrides=(ov or None))


def test_entrench_defaults_off_and_empty():
    g = _game()
    assert g.C['ENTRENCH_HOLD'] == 0      # disabled by default
    assert g.entrench == {}               # fresh board, nothing entrenched
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /home/bugra/Desktop/limes/sim && python3 -m pytest test_entrench.py::test_entrench_defaults_off_and_empty -v`
Expected: FAIL with `KeyError: 'ENTRENCH_HOLD'` (constant missing) or `AttributeError: 'Game' object has no attribute 'entrench'`.

- [ ] **Step 3: Add the constant**

In `sim/engine.py`, the CONSTANTS dict line 92 currently reads:

```python
    'LASTSTAND_BOONS': 3, 'ENTRENCH_PALISADES': 2,
```

Change it to:

```python
    'LASTSTAND_BOONS': 3, 'ENTRENCH_PALISADES': 2,
    'ENTRENCH_HOLD': 0,   # C-058b: rounds of holding to entrench forward ground; 0 = OFF
```

- [ ] **Step 4: Add the state field**

In `Game.__init__`, immediately after line 225 (`self.palisades = {}                 # col -> owner`), add:

```python
        self.entrench = {}                  # (col,row) -> hold-count for the tile's owner (C-058b)
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd /home/bugra/Desktop/limes/sim && python3 -m pytest test_entrench.py -v`
Expected: PASS

- [ ] **Step 6: Checkpoint**

Run: `cd /home/bugra/Desktop/limes/sim && python3 -m pytest -q` — full suite still green (existing audit tests unaffected; default OFF means no behaviour change).
(If using git: `git add -A && git commit -m "feat(sim): add ENTRENCH_HOLD constant + entrench state (default off)"`)

---

### Task 2: Round-end growth — `update_entrench()`

**Files:**
- Modify: `sim/engine.py` (add method to `Game`, e.g. just above `play_round` near line 1438)
- Test: `sim/test_entrench.py`

- [ ] **Step 1: Write the failing tests**

Append to `sim/test_entrench.py`:

```python
def test_growth_caps_at_hold_p1_side():
    g = _game(ENTRENCH_HOLD=2)
    g.stakes[0] = 6                       # P1 advanced col0 to k=6 -> forward rows 4,5
    g.update_entrench()                   # round-end 1
    assert g.entrench[(0, 4)] == 1 and g.entrench[(0, 5)] == 1
    g.update_entrench()                   # round-end 2 -> entrenched
    assert g.entrench[(0, 4)] == 2 and g.entrench[(0, 5)] == 2
    g.update_entrench()                   # capped, never exceeds HOLD
    assert g.entrench[(0, 4)] == 2


def test_growth_p2_side_and_no_home_entrench():
    g = _game(ENTRENCH_HOLD=2)
    g.stakes[0] = 2                       # P2 advanced col0 to k=2 -> P2 forward rows 2,3
    g.update_entrench()
    assert g.entrench[(0, 2)] == 1 and g.entrench[(0, 3)] == 1
    # nothing at or behind the original line (rows <2 are P1 home, not forward)
    assert (0, 1) not in g.entrench and (0, 0) not in g.entrench


def test_growth_disabled_when_off():
    g = _game()                           # ENTRENCH_HOLD=0
    g.stakes[0] = 6
    g.update_entrench()
    assert g.entrench == {}


def test_no_count_inheritance_on_flip():
    # P1 holds col0 row5 entrenched; stake retreats so row5 is no longer P1-forward
    g = _game(ENTRENCH_HOLD=2)
    g.entrench[(0, 5)] = 2
    g.stakes[0] = 4                       # back to original line: no forward tiles either side
    g.update_entrench()
    assert (0, 5) not in g.entrench       # dropped, not carried to a new owner
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /home/bugra/Desktop/limes/sim && python3 -m pytest test_entrench.py -k growth -v`
Expected: FAIL with `AttributeError: 'Game' object has no attribute 'update_entrench'`.

- [ ] **Step 3: Implement the method**

In `sim/engine.py`, add this method to `Game` directly above `def play_round(self):` (line 1438):

```python
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /home/bugra/Desktop/limes/sim && python3 -m pytest test_entrench.py -k growth -v`
Expected: PASS (all four growth tests)

- [ ] **Step 5: Checkpoint**

Run: `cd /home/bugra/Desktop/limes/sim && python3 -m pytest -q` — green.
(If using git: `git add -A && git commit -m "feat(sim): entrenchment round-end growth"`)

---

### Task 3: Reclaim friction — entrenched tiles absorb one push in `frontier()`

**Files:**
- Modify: `sim/engine.py` (`Game.frontier`, after the Palisade absorb at line 1298, before `self.stakes[c] = newk` at line 1300)
- Test: `sim/test_entrench.py`

- [ ] **Step 1: Write the failing tests**

Append to `sim/test_entrench.py`:

```python
def test_entrenched_tile_absorbs_one_reclaim():
    g = _game(ENTRENCH_HOLD=2)
    g.stakes[0] = 6                       # P1 holds col0 at k=6
    g.entrench[(0, 5)] = 2                # row5 entrenched for P1
    # Stub claims: P2 (mover=1) has the only valid claim, on col0
    g.column_claims = lambda c: (False, True) if c == 0 else (False, False)
    g.frontier()
    assert g.stakes[0] == 6               # held: the push was absorbed
    assert g.entrench[(0, 5)] == 0        # entrenchment cracked (spent)
    assert g.rows_lost_round[0] == 0      # no row counted lost -> no Tribute/komi


def test_unentrenched_tile_steps_normally():
    g = _game(ENTRENCH_HOLD=2)
    g.stakes[0] = 6
    g.entrench[(0, 5)] = 1                # below the cap -> not entrenched
    g.column_claims = lambda c: (False, True) if c == 0 else (False, False)
    g.frontier()
    assert g.stakes[0] == 5               # stepped normally
    assert g.rows_lost_round[0] == 1


def test_off_means_no_absorb():
    g = _game()                           # ENTRENCH_HOLD=0
    g.stakes[0] = 6
    g.entrench[(0, 5)] = 9                # stale value must be ignored when OFF
    g.column_claims = lambda c: (False, True) if c == 0 else (False, False)
    g.frontier()
    assert g.stakes[0] == 5               # stepped: entrenchment disabled
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /home/bugra/Desktop/limes/sim && python3 -m pytest test_entrench.py -k "absorb or steps_normally or off_means" -v`
Expected: FAIL — `test_entrenched_tile_absorbs_one_reclaim` fails because the stake steps to 5 (no absorb logic yet).

- [ ] **Step 3: Implement the absorb**

In `sim/engine.py` `frontier()`, the current block (lines 1296–1301) reads:

```python
            pushed = 1 - mover
            if self.palisades.get(c) == pushed:
                del self.palisades[c]          # absorption (C-058)
                continue
            self.stakes[c] = newk
            self.rows_lost_round[pushed] += 1
```

Insert the entrenchment absorb between the Palisade `continue` and `self.stakes[c] = newk`:

```python
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /home/bugra/Desktop/limes/sim && python3 -m pytest test_entrench.py -v`
Expected: PASS (all tests)

- [ ] **Step 5: Checkpoint**

Run: `cd /home/bugra/Desktop/limes/sim && python3 -m pytest -q` — green.
(If using git: `git add -A && git commit -m "feat(sim): entrenchment reclaim friction in frontier"`)

---

### Task 4: Wire growth into the round cycle

**Files:**
- Modify: `sim/engine.py` (`Game.play_round`, just before `self.round += 1` at line 1507)
- Test: `sim/test_entrench.py`

- [ ] **Step 1: Write the failing test (integration)**

Append to `sim/test_entrench.py`:

```python
def test_full_match_runs_with_entrench_on():
    # End-to-end determinism + no crash with the rule enabled.
    from engine import play_match
    b0, b1 = bots.make_bot('SANDBAGGER'), bots.make_bot('HONEST')
    r1 = play_match([b0, b1], seed=7, overrides={'ENTRENCH_HOLD': 2})
    b0, b1 = bots.make_bot('SANDBAGGER'), bots.make_bot('HONEST')
    r2 = play_match([b0, b1], seed=7, overrides={'ENTRENCH_HOLD': 2})
    assert r1['winner'] == r2['winner']           # deterministic
    assert r1['rounds'] == r2['rounds']


def test_entrench_actually_forms_in_a_match():
    # After a match with the rule on, at least some tile reached the cap at some
    # point — verified by running rounds manually and inspecting state.
    from engine import Game, GameOver
    b0, b1 = bots.make_bot('HONEST'), bots.make_bot('AGGRO')
    g = Game([b0, b1], seed=3, overrides={'ENTRENCH_HOLD': 2})
    for p in (0, 1):
        [b0, b1][p].reset(3, p)
    g.setup()
    seen_entrenched = False
    try:
        for _ in range(30):
            g.play_round()
            if any(v >= 2 for v in g.entrench.values()):
                seen_entrenched = True
    except GameOver:
        pass
    assert seen_entrenched
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /home/bugra/Desktop/limes/sim && python3 -m pytest test_entrench.py -k "full_match or actually_forms" -v`
Expected: `test_entrench_actually_forms_in_a_match` FAILS (entrench never grows because `update_entrench` is not called inside `play_round` yet). `test_full_match_runs_with_entrench_on` may already pass.

- [ ] **Step 3: Wire the call**

In `sim/engine.py` `play_round`, line 1507 currently reads:

```python
        self.round += 1
```

Change it to:

```python
        self.update_entrench()      # C-058b: harden forward ground held this round
        self.round += 1
```

Note: this sits after the hard-stop check (line 1499–1506). If the game ended this round it already raised `GameOver`, so the growth call is reached only for rounds that actually continue — exactly the "round-end" timing the spec wants.

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /home/bugra/Desktop/limes/sim && python3 -m pytest test_entrench.py -v`
Expected: PASS (all)

- [ ] **Step 5: Checkpoint**

Run: `cd /home/bugra/Desktop/limes/sim && python3 -m pytest -q` — green. Default-OFF means the existing audit suites are still bit-identical.
(If using git: `git add -A && git commit -m "feat(sim): call update_entrench at round end"`)

---

### Task 5: Acceptance run — does it land Contract E without regressing B/C/D?

**Files:**
- Create: `sim/experiments/final/v13_entrench.json` (battery output)

This is the gate that decides whether the rule ships. It runs the existing five-contract battery with the current best-candidate config (`v1_base`) plus `ENTRENCH_HOLD=2`.

- [ ] **Step 1: Run the battery with entrenchment on**

```bash
cd /home/bugra/Desktop/limes/sim/experiments/final && python3 battery.py \
  --config '{"SWORD_HP":6,"SIEGE_PUSH_UNITS":0,"CHARGE_ADJ_OK":0,"EXHAUSTED_CARRY":1,"R1_REQUIRE_ENGAGE":1,"EXHAUSTION_ACCEL":0,"WAGON_HP":2,"WAGON_BOUNTY":5,"GOLDEN_GOAL_ROUND":14,"HARD_STOP_ROUND":18,"BREACH_CAP_RISE_ROUND":11,"LONE_RUNNER_RADIUS":3,"ENTRENCH_HOLD":2}' \
  -n 120 --ne 300 --seed0 30001 --tseed0 40001 --out v13_entrench.json
```

Expected: completes in ~15–20s, writes `v13_entrench.json`.

- [ ] **Step 2: Print the scorecard and check the gates**

```bash
cd /home/bugra/Desktop/limes/sim/experiments/final && python3 -c "
import json
s = json.load(open('v13_entrench.json'))['summary']
base = json.load(open('v1_base.json'))['summary']
def line(k): print(f'{k:38} base={base.get(k)!s:>8}  entrench={s.get(k)!s:>8}')
for k in ['E_sandbag_vs_honest(<0.50)','E_sandbag_vs_twin(<=0.50)',
          'B_lead_change_rate(0.25-0.35)','D_ladder_share(<0.02)',
          'D_median_round(11-14)']:
    line(k)
print('C terrain winrates:', json.dumps(s.get('C_terrain_winrates(0.45-0.55)'), indent=0))
"
```

- [ ] **Step 3: Evaluate against the design's acceptance gate**

Record PASS/FAIL against `design/v3-entrenchment-design.md` §4:

- **FIX (required):** `E_sandbag_vs_honest` in **0.45–0.55** (was 0.72), AND `E_sandbag_vs_twin` **≤ 0.50**.
- **NO REGRESSION (required):** `B_lead_change_rate` in **0.25–0.35**; `D_ladder_share` **< 0.02**; `D_median_round` in **11–14**; every `C_terrain_winrates` entry in **0.45–0.55**.

If all gates pass → the rule is verified; update the design doc status to "Verified" and proceed to fold C-058b into `design/v3-rules-spec.md`.

If E is fixed but a guardrail regresses (most likely B, comebacks too slow) → go to Step 4 sweep before concluding.

- [ ] **Step 4: If needed, sweep `ENTRENCH_HOLD` 1 / 3**

```bash
cd /home/bugra/Desktop/limes/sim/experiments/final && for H in 1 3; do python3 battery.py \
  --config "{\"SWORD_HP\":6,\"SIEGE_PUSH_UNITS\":0,\"CHARGE_ADJ_OK\":0,\"EXHAUSTED_CARRY\":1,\"R1_REQUIRE_ENGAGE\":1,\"EXHAUSTION_ACCEL\":0,\"WAGON_HP\":2,\"WAGON_BOUNTY\":5,\"GOLDEN_GOAL_ROUND\":14,\"HARD_STOP_ROUND\":18,\"BREACH_CAP_RISE_ROUND\":11,\"LONE_RUNNER_RADIUS\":3,\"ENTRENCH_HOLD\":$H}" \
  -n 120 --ne 300 --seed0 30001 --tseed0 40001 --out v13_entrench_h$H.json; done
```

Pick the `ENTRENCH_HOLD` that lands E within band with the least damage to B (per design §6: `=3` if `=2` over-slows comebacks; `=1` if `=2` under-fixes E). Re-run Step 2/3 on the winner.

- [ ] **Step 5: Record the verdict**

Write a one-paragraph result block (winning `ENTRENCH_HOLD`, final scorecard, PASS/FAIL per contract) into `design/v3-entrenchment-design.md` under a new "## 7. Sim verification result" heading. This closes the loop opened by the design.

---

## Self-Review notes (author)

- **Spec coverage:** C-058b rule (Tasks 1–4), `ENTRENCH_HOLD` knob + default-off (Task 1), crack-then-yield absorb (Task 3), round-end growth/"only beyond line"/"2 rounds to form" guards (Task 2), acceptance gate incl. re-scoped Contract E and B/C/D tripwires (Task 5), the 1/2/3 sweep (Task 5 Step 4). Contract A is explicitly out of scope per design §5 — no task, intended.
- **Type/name consistency:** `self.entrench` (dict, keyed `(col,row)` → int), `update_entrench()`, `ENTRENCH_HOLD` used identically across Tasks 1–5.
- **No placeholders:** every code/command step is concrete and runnable.
