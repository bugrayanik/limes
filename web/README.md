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

## Build & run
```bash
./build.sh                       # bundle src → dist/main.js (needs bun)
python3 -m http.server 8000      # from the REPO ROOT (so /art/renders resolves)
# open http://localhost:8000/web/index.html
```
`dist/main.js` is committed so GitHub Pages serves it with no build step.
Module scripts need HTTP — `file://` is blocked by browsers.

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
2. Interactive hotseat turn loop (next).
3. Solo vs bot (the policies are already ported).
4. Polish (animations, Wagon art, tribe theming).

## Ruleset note
`engine.ts` ships `V3_CONFIG` — the sim-validated config (v1_base overrides +
lead-metric fix). The two refuted toggles (`ENTRENCH_HOLD`, `FIRST_BLOOD_SUPPLY`)
stay at 0 (OFF).
