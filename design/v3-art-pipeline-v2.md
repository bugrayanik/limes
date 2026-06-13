# LIMES Art Pipeline v2 — research-driven, best-quality + modular

**Date:** 2026-06-13
**Supersedes:** the quick flux-schnell text→image path (now demoted to "drafts/fun" tier).
**Source:** deep-research run wf_884aa7aa-383 (105 agents; full report in the task output). Builds on `LIMES-Art-Pipeline-Research.md` (Jun 10).
**Hardware:** single RTX 4060, 8GB VRAM. **Style is now a variable** (locked watercolor is off the table; cartoon/cyberpunk/colorful under consideration) — this pipeline is **style-agnostic**: the chosen style is captured once in a LoRA and reused everywhere.

---

## The core decision: a HYBRID pipeline (2D for flat art, 3D for modular units)

Monolithic FLUX text→image **cannot** give true separable body+weapon+mount layers. The research is decisive: do the modular units via a **3D route**, and the flat art (tiles/cards/UI/menus) via a **2D LoRA route**.

### Track A — Modular character units (the AAA "weapons/body separate" ask)
1. **Concept** the unit as a 2D image (FLUX, drafts fine on schnell).
2. **Image→3D mesh:** **Hunyuan3D-2** (+ `ComfyUI-Hunyuan3DWrapper` with a compiled `custom_rasterizer` for *textured* meshes — native ComfyUI Hunyuan3D outputs untextured geometry only).
3. **Decompose into parts:** **Hunyuan3D-Part** (P3-SAM + X-Part), exposed in ComfyUI as **"3D Parts Decomposition"** — splits the mesh into semantic parts (body / armor / weapon / mount / wheels). *This is the true modular separation.*
4. **Auto-rig:** **UniRig** (SIGGRAPH 2025) — predicts skeleton + skin weights; **inference is documented-feasible at 8GB** (the 4060's floor — tight, no headroom).
5. **Render to 2D billboards:** headless **Blender** batch-render (e.g. `blender-sprite-render`) at fixed scale/camera → consistent cutout sprites. Swap weapon/mount parts → variations for free.

### Track B — Flat art (tiles, card frames/backs, UI panels, menus, icons, wagon)
- **FLUX.1-dev** + a **trained style LoRA** + white-background trigger convention → isolated, cutout-ready, on-style assets. schnell only for fast drafts.

---

## Style consistency (the other hard part)
1. **Train a style LoRA** on ~20–30 references of the chosen locked style. This is *the* documented production pattern (e.g. `Flux-Game-Assets-LoRA-v2`). **Built on FLUX.1-dev, not schnell.**
2. **FLUX.1 Kontext** for *character identity* preservation across the 48 units / multiple assets (in-context editing; keep guidance 2–4, fixed seeds; identity drifts after ~5 iterative edits).
3. **Trigger word + "white background"** prompt convention → enforces isolated assets ready for alpha cutout.

---

## ⚠️ The one hardware catch on the 4060
**FLUX LoRA training at 8GB is NOT officially supported** — FluxGym lists 12/16/20GB. So the *one* step that can't run locally is **training the style LoRA**. Options:
- **Cloud-train the LoRA once** (rented GPU / fal / Replicate, ~a few $ one-time), then run all inference locally for free. ← recommended.
- Or skip a trained LoRA and lean on **FLUX.1 Kontext + IP-Adapter style reference + fixed conventions** for consistency (weaker, but 100% local + free).

Everything else (FLUX-dev inference via GGUF quant, Hunyuan3D, Hunyuan3D-Part, UniRig inference, Blender, LayerDiffuse) runs locally on the 4060 — tight, quantized, slower than schnell, but feasible.

## Transparency / true alpha
Not native to FLUX. Either **LayerDiffuse-Flux** (transparent VAE+LoRA; needs dev) for real alpha, or pragmatically **white-bg + matting** (rembg / BiRefNet) cutouts. Start with matting; adopt LayerDiffuse if edges aren't clean enough.

## Model split (when to use what)
| Need | Model |
|---|---|
| Fast drafts / ideation | flux-schnell (4-step) — what the pilots used |
| Final quality, LoRA, Kontext, transparency | **flux-dev** (GGUF quant for 8GB) |
| Throughput on low VRAM (newest trend) | consider **Nunchaku / SVDQuant** 4-bit FLUX — large speedups on 8GB *(my addition, not in the report — verify)* |

---

## What setting this up actually requires (honest)
This is a real build-out, not a switch:
1. Install **FLUX.1-dev** (GGUF) in ComfyUI.
2. Install ComfyUI custom nodes: **Hunyuan3DWrapper** (+ compile `custom_rasterizer`), **Hunyuan3D-Part / "3D Parts Decomposition"**, **UniRig**, **LayerDiffuse**, a matting node.
3. Set up **headless Blender** batch-render.
4. **Lock the style** (pick the direction), gather ~20–30 refs, **cloud-train the style LoRA**.
5. Build the per-asset ComfyUI graphs; wire into the existing `comfy_render.py` collect-into-index loop.

Then production: Track A for the 48 modular units, Track B for everything flat, all unified by the one style LoRA.

---

## Recommended sequencing
1. **Lock the art style first** (can't train the LoRA or judge consistency without it) — keep doing cheap schnell style pilots until you point at one.
2. **Stand up Track B** (flux-dev + cloud-trained LoRA) → regenerate all flat art consistently. Faster payoff.
3. **Stand up Track A** (the 3D modular stack) → the 48 modular units. Bigger lift; the genuine "AAA weapons/body separate."
