# LIMES v3 — Web prototype

Playable browser build of the validated v3 ruleset. See `design/v3-build-roadmap.md`.

## Structure
- `src/engine.ts` — rules engine, a complete port of `sim/engine.py` (the oracle).
- `src/bots.ts` — the 6 policy bots (port of `sim/bots.py`).
- `src/mt19937.ts` — MT19937 reproducing CPython `random.Random(seed).shuffle`
  (caravan artifact order), so the engine is self-contained.
- `src/sha1.ts` — pure-JS sha1 (keeps the engine free of `node:crypto` → browser-native).
- `src/render.ts` — Phase 1 board renderer (engine state → HTML in the skin).
- `src/assets.ts` — auto-generated tribe+arch → roster image map.
- `src/main.ts` — entry: builds a mid-game state and mounts the board.
- `parity/dump_golden.py` — golden oracle: per-phase + per-round state hashes.
- `parity/check_parity.ts` — replays both and asserts identical (run with `bun`).
- `index.html` — game shell, locked art-direction skin from `art/styleguide/index.html`.

## Play
**Just open `web/index.html` in a browser** (double-click it). The bundle is a
classic IIFE script, so it runs straight from `file://` — no server needed.

Rebuild after changing `src/` (needs bun):
```bash
./build.sh                       # bundle src → dist/main.js (IIFE)
```
`dist/main.js` is committed, so the game also serves as-is from GitHub Pages.

## Parity workflow (how the port stays correct)
The game is deterministic and dice-free, so the TS port must reproduce the Python
engine exactly. For any `(seed, config, bots)`:

```bash
# 1. Generate the golden trace from the Python oracle
cd web/parity && python3 dump_golden.py --suite --out golden.json

# 2. (once the TS engine runs) replay the same inputs and assert every
#    round_hash matches. First mismatch localises the divergent round.
```

`dump_golden.py` hashes a canonical snapshot (round, stakes, komi, resources,
units, wagons, fields, palisades, entrench) after setup and after every round.
Verified deterministic: same seed → identical sha1.

## Phases
0. ✅ **Rules port + parity** — full engine + bots ported; **108/108** parity
   (36 6×6 pairings × post-setup/per-phase/whole-match) byte-identical to the oracle.
1. ✅ **Static board renderer** — engine state → DOM in the styleguide skin
   (8×8 grid, stake frontier, unit billboards, wagons, fields, palisades, HUD).
2. ✅ **Interactive turn loop** — full 5-phase play: Muster (recruit/unlock/
   build/reposition/tribute), Clash (click units → legal move/melee/shoot/charge
   highlighting, 2 pulses), interventions (Surge/Shieldbearer), auto Frontier/
   Pass, win screen. `controller.ts` drives the REAL engine sub-methods phase-by-
   phase; `human.ts` (HumanPolicy) stages each decision into the engine's bot
   interface, so play is identical to the parity-verified sim.
3. ✅ **Solo vs bot** — pick any of the 6 ported policies as opponent (also
   2-player **hotseat** on one screen). Setup screen selects mode/seat/tribes/seed.
4. Polish (animations, Wagon art, interactive caravan pick, tribe theming).

## Ruleset note
`engine.ts` ships `V3_CONFIG` — the sim-validated config (v1_base overrides +
lead-metric fix). The two refuted toggles (`ENTRENCH_HOLD`, `FIRST_BLOOD_SUPPLY`)
stay at 0 (OFF).
