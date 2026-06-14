# Artifacts on Wagons — design

**Status:** approved direction; NOT yet implemented. Ship gated on a balance pass
(new sims + buff/nerf). Canonical game change (both the TS web engine AND the
Python golden oracle), not web-cosmetic.

## Problem / intent

Today artifacts (drafted at the Caravans on rounds 4 & 8) are **instant one-time
effects** — applied and gone. The player wanted artifacts to be **persistent
items held on Supply Wagons**, giving an ongoing buff and creating a new
risk/reward layer (a loaded wagon is powerful but a juicy target).

## Core mechanic

- At a Caravan you draft an artifact, then **place it on one of your 3 Supply
  Wagons** (player chooses). **Wagons hold unlimited artifacts** — stack as many
  as you like on any wagon (so a 4th over two Caravans just stacks).
- While the wagon **lives**, every artifact on it provides its buff **every
  round**.
- **Wagon destroyed → all artifacts on it are lost** (their buffs end). This is
  the risk/reward: concentrate buffs (fewer, fatter targets) vs spread them.
- **Bots auto-place** (load their safest / rearmost wagon). Needed for the
  opponent and for the AI-vs-AI demo.

## Effects — converted from instant to per-round (while the wagon lives)

First-pass numbers; ALL subject to the balance pass.

| Artifact | Old (instant) | New (ongoing, while wagon lives) |
|---|---|---|
| 🛡 Supply Cache | +4 Supply once | +2 Supply each Muster |
| 🌾 Granary | +4 Crop once | +2 Crop each Muster |
| ⚜ Hero's Aegis | +1 Hero Guard (perm) | +1 Guard to your Hero |
| ⭐ Veteran's Mark | +2 XP once | +1 XP/round to your strongest unit |
| ◆ War Chest | +2 Tribute once | +1 Tribute each round |
| 🏷 Levy | recruit discount (1 muster) | recruit discount every Muster |
| 🌱 Homestead | build a field | +1 to whichever of Supply/Crop you're shorter on, each Muster |
| 🪵 Bulwark (was Palisade) | build a wall | the wagon's column is walled while it lives |

## Scope / trade-offs (acknowledged)

- **Canonical, both engines.** TS engine (`web/src/engine.ts`) and the Python
  oracle (`sim/`) both change; otherwise the 108/108 parity suite breaks. Keep
  parity by porting the same rules to both, then regenerate golden hashes.
- **Re-balance required.** Ongoing economy from a wagon-held artifact is much
  stronger than a one-shot, and the destroy-to-remove rule changes wagon-rush
  incentives. Run new sims, then buff/nerf numbers + maybe Caravan draft counts.
  Do NOT ship to players until this passes.

## Build outline (when greenlit)

1. **State:** each wagon gets `artifacts: number[]` (aids). Add to Game state +
   canonical snapshot (so parity covers it).
2. **Caravan:** after a pick, a **placement step** — human clicks a wagon; bot
   auto-places. Replace `applyArtifact` (instant) with attach-to-wagon.
3. **Per-round effects:** during Muster harvest/upkeep (and combat for Aegis),
   apply the buffs from every living wagon's artifacts.
4. **On wagon death:** clear that wagon's `artifacts` (buffs end).
5. **UI:** render artifacts sitting on wagons in the 3D board; keep the
   persistent artifact strip + draft card (already shipped); add the placement
   prompt for human Caravans.
6. **Parity:** port identical logic to Python `sim/`, regenerate
   `web/parity/golden.json`, re-run `bun parity/check_parity.ts`.
7. **Balance:** new sim sweep → tune effect numbers / draft counts → lock.

## Open questions for the balance pass

- Effect magnitudes (the table above is a guess).
- Should Bulwark/Veteran's Mark stay, or be replaced with cleaner per-round buffs?
- Does the trailing-side double-pick still fit, or does persistence make it too
  strong for the side that's behind?
