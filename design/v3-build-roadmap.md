# LIMES v3 — Build Roadmap (validated ruleset → playable prototype)

**Date:** 2026-06-13
**Status:** Proposed. Follows balance-complete v3 (see `v3-rules-spec.md`, `sim/`).
**Goal:** Get from a sim-validated ruleset to a playable, shareable v3 prototype.

---

## What already exists (the build is ~⅓ done before it starts)

1. **Rules core — done, validated.** `sim/engine.py` is a complete, deterministic, no-dice reference implementation of the v3 rules, exercised by 130k+ contract matches. It is the **oracle**: anything we build must reproduce its outcomes.
2. **AI opponents — done.** `sim/bots.py` has 6 policies (HONEST/AGGRO/TURTLE/PROBER/SANDBAGGER/RUNNER) — ready to power a solo mode.
3. **Art — 48/48 characters + backdrops + icons rendered**, style locked (styleguide). Only the Supply Wagon render is pending (needs ComfyUI).
4. **Visual language — locked.** `art/styleguide/index.html` is a full art-direction bible: fonts (Cinzel/Alegreya), palette (stone/parchment/gold), the 8 tribe colors, component styling. The game UI inherits this directly.

What's missing is only the **interactive layer**: a UI that renders game state and drives turns.

---

## Architecture decisions (recommended)

**1. Port the rules to TypeScript — don't wrap Python.**
Re-implement the engine in TS so the prototype is a single-stack, offline, browser-native, statically-deployable artifact (GitHub Pages). The Python engine stays as the **golden oracle**: a parity harness runs the same Match Seed through both and asserts identical outcomes, so the port is provably correct. (Rejected: a Python backend + JS frontend — adds a server, hosting, and latency for a deterministic local game that needs none.)

**2. Browser, hotseat-first.**
Two players, one screen, pass-and-play. The design is fully open-information and deterministic, so there's no hidden state to hide and no netcode needed. Online/matchmaking is a much later concern. Solo-vs-bot comes free once the policies are ported.

**3. Reuse the styleguide skin verbatim.**
Lift the CSS variables and component styles from `art/styleguide/index.html`. The board is a CSS grid (8 columns × 8 rows); stake lines, terrain tiles, unit billboards, wagons, and palisades are positioned DOM nodes. No game-engine framework needed for a turn-based board game — vanilla TS + DOM, or a thin lib (Lit/Preact) if state-binding gets heavy.

---

## Phases (each independently shippable)

**Phase 0 — Rules port + parity harness.** *(foundation, largest)*
Port `engine.py` → `web/src/engine.ts`, preserving the C-0xx rule structure. Build a golden-parity test: for N seeds, run both engines headless and assert identical (winner, win_type, round, per-round state hashes). Port complete when parity is 100%.

**Phase 1 — Static board renderer.** State → DOM in the styleguide skin: board grid, stake line, terrain, unit billboards (the rendered roster), wagons, palisades, resource/Tribute counters. No interaction yet — feed it a mid-game state from the engine and verify it reads correctly.

**Phase 2 — Interactive turn loop.** Drive the five phases (Muster → Reveal → Clash → Frontier → Pass&Tribute) with clickable orders, legal-move highlighting, and the open-information panels (HP, XP, states, banks). Hotseat: alternate seats. This is the playable game.

**Phase 3 — Solo vs bot.** Port one policy (start with the improved HONEST) to TS; let a human play a seat against it. Reuse the parity harness to confirm the ported bot plays identically to the Python one.

**Phase 4 — Polish.** Clash/Frontier animations, the Supply Wagon art, per-tribe theming from the locked palette, Last Stand / golden-goal moments, a seed-share button.

---

## Risks / notes

- **Port fidelity is the whole ballgame.** Determinism makes this tractable (the oracle catches any divergence), but the engine has subtle ordering rules (ZoC decoupling, scan-order frontier, simultaneous resolution). Port rule-block by rule-block, parity-testing continuously — don't port in one pass.
- **Scope discipline:** Phases 0–2 = a real playable game. 3–4 are enhancements. Ship 0–2 first.
- **Art dependency:** only Phase 4 needs the pending Wagon render; Phases 0–2 are unblocked by ComfyUI.

---

## Recommended first step
Begin **Phase 0**: scaffold `web/`, port the engine's constants + board/state + the Muster and Frontier rules first (the deterministic spine), and stand up the parity harness against the Python oracle so every subsequent rule-block is verified as it lands.
