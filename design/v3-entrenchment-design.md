# LIMES v3 — Entrenchment Design (Anti-Sandbag Fix)

**Date:** 2026-06-13
**Status:** ❌ REFUTED by sim (2026-06-13) — does not fix Contract E; see §7. Rule kept in engine behind default-OFF flag.
**Targets:** Acceptance Contract E (and the dominant-strategy problem behind it)
**Author note:** Supersedes the economic-knob approach (v10–v12) for the sandbag problem.

---

## 1. Problem (corrected diagnosis)

The v3 sim found that the **SANDBAGGER** probe policy beats **HONEST** 72–84% and beats PROBER/AGGRO 64–65% — broad dominance, losing only to its own mirror (TWIN ≈ 48%). The acceptance spec frames the failing contract as:

> **C-E:** *Sandbagging (deliberately conceding Stake-rows for Tribute) is EV-negative vs honest play.*

Sim work proved that framing wrong on two counts:

1. **Tribute is not the lever.** At `TRIBUTE_PER_ROW=0` (no chips for conceding at all), SANDBAGGER still beats HONEST **84%**. Sweeping the tribute price 0→6 moves the matchup ~1 point. A scoring/Tribute spec change *cannot* fix this — it was tested to null.
2. **The literal sandbag tactic is already EV-neutral.** SANDBAGGER vs TWIN (identical bot, early-evacuation *off*) is ~48% — the concession itself is slightly negative.

**Real cause:** the dominant pattern is *evacuate cheap early ground → keep a compact full-strength army in a wagon-shell → aggressive wagon-hunting counterpunch*. The early concession is **free** because conceded ground is cheaply reclaimable by endgame — the frontier is fully fluid, so "owned rows" (which decide golden-goal C-070 and ladder C-071) can be retaken at 1 row/round during the counterpunch. This is the same structural root cause #4 the contract testing already named: *Tribute-per-row-lost cannot repay slowly-lost ground, and lost ground carries no durable cost.*

The fix must make **consolidated forward ground durable** so that conceding it early is a genuine, lasting liability — without re-introducing the runaway-lead snowball that prior structural work (Contracts B & D) fought to eliminate.

---

## 2. Rule: Entrenchment (new C-058b, CORE)

Built on two existing engine primitives: the Stake step (C-056, one row per valid push, symmetric in/out) and Palisade absorption (C-058, a one-shot speed-bump that holds a step then breaks). Entrenchment is "Palisade absorption, but **earned by holding consolidated ground**."

- **Entrench counter.** Every board tile carries a public per-owner **entrench counter** (open information, C-007). When a Stake step (C-056) transfers a tile to the advancing player, the tile is **Fresh** (counter 0).
- **Growth.** At Round end (C-068), each owned tile that lies **beyond that player's original round-1 Stake line** *and* whose column's Stake did **not** step back across it this round increments its counter, capped at `ENTRENCH_HOLD = 2`. A tile at the cap is **Entrenched**.
- **Reclaim friction (modifies C-056).** When a valid enemy advance claim (C-055) would step the Stake back, the **tile that would change owner** (the single tile in that column the retreating Stake crosses — the same tile C-059 identifies for Trample) is checked. If it is **Entrenched**, the Stake **holds** for that Frontier and that tile's counter resets to 0 — the entrenchment is **spent** (crack-then-yield, one-shot). That column counts **no Stake-row lost** this round (no Tribute C-067, no komi C-005, no golden-goal trigger C-070 from that column). The next valid claim against the now-Fresh tile steps normally.

**Net effect:** an Entrenched row costs the reclaimer exactly **one extra successful push** — identical in spirit to cracking a Palisade (C-058). Deeply consolidated ground is durable but never permanent.

### Processing order
Entrench growth happens at Round end (C-068, Phase 5), after all Frontier resolution. The reclaim-friction check happens inside Frontier step resolution (C-056), before lost-row accounting (C-057) — so an absorbed step produces no lost-row side effects downstream.

---

## 3. Snowball-guards (the knife-edge)

Prior structural work killed runaway leads to land Contracts B and D. Entrenchment must not bring them back. Three guards are built into the rule:

1. **Only beyond your original line.** Tiles in your own heartland never entrench. There is zero reward for passive turtling — only for *consolidating conquered* ground. (Directly denies a turtle/sandbag defensive bonus.)
2. **One-shot absorb, then it yields.** A committed counterattack still breaks through; entrenchment is a speed-bump, not a wall. Comebacks survive — they cost real tempo instead of being instant/free.
3. **Two rounds to form.** With `ENTRENCH_HOLD=2`, ground held <2 rounds never hardens. Fluid midfield trading stays fluid; only deliberately held lines harden.

---

## 4. Sim acceptance check (verification gate)

Run on the existing `sim/experiments/final` battery. This rule ships only if **all** of the following hold:

**Must fix (Contract E, re-scoped to clean measures):**
- SANDBAGGER vs HONEST falls into **45–55%** (currently 72–84%).
- Pure-concession control SANDBAGGER vs TWIN stays **≤50%**.

**Must NOT regress (snowball tripwires):**
- Contract B lead-change-after-r7 rate stays **0.25–0.35**.
- Contract D ladder share **<2%** and median round **11–14**.
- Contract C passive mirrors (TURTLE_vs_TURTLE, TURTLE_vs_PROBER, AGGRO_vs_TURTLE) stay **45–55%**.

**Watch (report, not gate):** SANDBAGGER vs PROBER and vs AGGRO should also compress toward parity if the diagnosis is right; if they don't move, the dominance has a second source to chase.

### New tuning knobs (Appendix B)
- `ENTRENCH_HOLD` — rounds of holding to entrench. Default **2**; sweep **1 / 2 / 3**.
- Absorb mechanic — **crack-then-yield (chosen)** vs. requires-2-net-pushes. A/B both; chosen default is crack-then-yield (preserves comebacks).

---

## 5. Scope / out of scope

- **In scope:** the new C-058b rule, its two Appendix-B knobs, the engine toggle to enable it, and the re-scoping of Contract E's definition to the clean SANDBAGGER-vs-TWIN + 45–55% band.
- **Out of scope (separate problem):** Contract A (round-1 conversion ~0.47 vs 0.55–0.65 target) is a distinct issue, not addressed here.
- **Untouched:** all economy constants (Tribute, yields, supply/crop) — the TPR=0 result proved they are not the lever.

---

## 6. Open question (settled by data, not now)

`ENTRENCH_HOLD=2` is the default but is a sim-swept knob; the 1/2/3 sweep settles it. If `=2` lands Contract E but regresses B (comebacks too slow), `=3` is the fallback; if `=2` under-fixes E, `=1` is the fallback (with closer watch on B).

---

## 7. Sim verification result — REFUTED (2026-06-13)

Ran the five-contract battery on the `v1_base` config + `ENTRENCH_HOLD` ∈ {1,2,3} (n=120 matrix, n=300 contract-E, both terrains). Verdict: **Approach A does not work and mildly regresses.**

| config | E sandbag-vs-HONEST | E sandbag-vs-TWIN | B lead-change | D ladder |
|---|---|---|---|---|
| OFF (baseline) | 0.723 | 0.493 | 0.418 | 0.023 |
| HOLD=1 | 0.763 | 0.447 | 0.400 | 0.052 |
| HOLD=2 | 0.743 | 0.457 | 0.408 | 0.038 |
| HOLD=3 | 0.730 | 0.450 | 0.414 | 0.036 |

- **E (the target) did NOT move** toward the 0.45–0.55 band at any hold value — flat-to-slightly-worse (0.72→0.73–0.76).
- **D ladder got WORSE** (0.023→0.036–0.052), pushing further past the <0.02 guard.

**Why it failed (the design flaw):** entrenchment is **seat-symmetric** — it rewards whoever consolidates ground *last and deepest*. SANDBAGGER's entire plan is to concede early, then consolidate the *final, deepest* ground with its r6+ counterpunch. So entrenchment protects the counterpuncher's late gains at least as much as the honest player's early gains, netting out neutral-to-harmful. It also freezes more frontiers (the absorb holds steps), which is why ladder share rose.

**Decision:** do **not** ship. The `ENTRENCH_HOLD` flag stays in `engine.py` defaulted to 0 (OFF, fully tested, zero effect on existing results) in case a future *asymmetric* variant wants the machinery.

**What this re-surfaces:** the clean Contract-E measure (SANDBAGGER vs **TWIN**) sits at **0.45–0.49 across every config — i.e. already PASSING.** The stubborn 0.72 is SANDBAGGER-vs-HONEST = "aggressive counterpunch chassis beats the vanilla HONEST chassis," which may be *legitimate* matchup depth (HONEST is simply a weaker policy) rather than an exploit to engineer away. Any fix must be **asymmetric** (penalise the *early concession* specifically, or the *flip* — old Approach B), OR the right move is to re-scope Contract E to the clean TWIN measure and improve the HONEST baseline bot instead of changing rules.
