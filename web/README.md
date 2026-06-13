# LIMES v3 — Web prototype

Playable browser build of the validated v3 ruleset. See `design/v3-build-roadmap.md`.

## Structure
- `src/engine.ts` — rules engine, ported from `sim/engine.py` (the oracle). Phase 0.
- `parity/dump_golden.py` — golden oracle: emits per-round state hashes from the
  Python engine for the TS port to match.
- `index.html` — game shell (inherits the locked art-direction skin from
  `art/styleguide/index.html`). Phase 1+.

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
0. **Rules port + parity** (current) — port `engine.py` block-by-block, parity-tested.
1. Static board renderer (state → DOM, styleguide skin).
2. Interactive hotseat turn loop.
3. Solo vs bot (port `sim/bots.py` policies).
4. Polish (animations, Wagon art, tribe theming).

## Ruleset note
`engine.ts` ships `V3_CONFIG` — the sim-validated config (v1_base overrides +
lead-metric fix). The two refuted toggles (`ENTRENCH_HOLD`, `FIRST_BLOOD_SUPPLY`)
stay at 0 (OFF).
