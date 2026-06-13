# LIMES Art Pipeline — Deep Research Report (June 10, 2026)

> Research question: best free/local AI art pipeline for the 48-character LIMES roster (40 troops + 8 heroes, painterly ancient-tribes fantasy), Godot 4.3, PC + mobile, RTX 4060 8GB on Linux, $0/month budget.
> Method: 5 search angles → 25 sources fetched → 121 claims extracted → 25 adversarially verified (3-vote) → **19 confirmed, 6 killed/unresolved**. 107 agents, ~1.57M tokens.

---

## Recommended pipeline (TL;DR)

**Stage 1 — 2D billboards (do this first):**
ComfyUI + **FLUX.1-schnell** (GGUF Q4/Q5 quantized to fit 8GB) for commercial-safe generation, with a **style LoRA** for roster-wide consistency. SDXL + LoRA stack is the fallback with the most mature consistency tooling (IP-Adapter, mature LoRA training).

**Stage 2 — 3D conversion (later):**
2D character art (clean T-pose render) → **Stable Fast 3D** (~6GB VRAM, GLB + UVs + materials, remeshing) or **Hunyuan3D-2 mini** (5GB, shape only) → rig humanoids with **Mixamo** (free, commercial-OK) → retarget shared animations in Godot via **SkeletonProfileHumanoid** → one animation set covers all 48 characters.

**Sequencing: 2D-billboards-first remains the right call** — Stage 1 is fully solved on your hardware at $0; Stage 2 works but has texture and rigging gaps (below) that are improving release by release.

---

## Stage 1 — 2D generation (verified findings)

| Finding | Confidence |
|---|---|
| **FLUX.1-schnell is Apache 2.0** — full commercial use of model *and* outputs at $0. | 3-0 ✅ |
| Schnell generates in **1–4 steps** — fast enough to batch a 48-character roster. | 3-0 ✅ |
| Schnell is **12B params** — on 8GB VRAM you need **GGUF/FP8 quantization or CPU offload**. | 3-0 ✅ |
| FLUX.1-dev licensing for game assets: **unresolved**. Verification of both "outputs are commercial-OK under v2.0" and "outputs restricted" claims failed (0-0 votes — verifiers couldn't confirm either way from the license page). | ⚠️ unresolved |

**Practical read:** schnell is the legally clean local option. Dev gives noticeably better quality and has the bigger LoRA ecosystem, but its Non-Commercial License v2.0 is ambiguous enough that the adversarial verifiers deadlocked on it — if you ever want dev, read the current bfl.ai license yourself or get the cheap commercial tier. SDXL remains the safe, boring, well-tooled alternative for style-consistent rosters.

## Stage 2 — Image-to-3D (verified findings)

| Finding | Confidence |
|---|---|
| **Hunyuan3D-2 mini: 5GB** / standard: 6GB for *shape* — fits your 4060. Full shape+**texture needs 12GB** — does NOT fit. | 2-1 ✅ |
| ComfyUI native Hunyuan3D-2mv support **excludes texture/material generation** — textures must come from elsewhere. | 3-0 ✅ |
| ComfyUI Hunyuan3D workflows output **.glb directly** (to `ComfyUI/output/mesh`) — Godot-native format. | 3-0 ✅ |
| **Stable Fast 3D: ~6GB VRAM** for single-image input — fits the 4060. | 3-0 ✅ |
| SF3D outputs **game-ready GLB: UV unwrapping, material prediction, triangle/quad remeshing**. | 3-0 ✅ |
| SF3D is feedforward and **TripoSR-fast** (sub-second class), not optimization-slow. | 3-0 ✅ |
| SF3D license: **Stability Community License — free commercial use under $1M/yr revenue**, enterprise above. | 3-0 ✅ |
| Hunyuan3D-2.1 (adds local PBR texturing in ComfyUI) — license claim (free under 1M MAU) **unverified** (0-0). | ⚠️ unresolved |

**Practical read:** SF3D for speed + game-ready output; Hunyuan3D-2 mini for better shape quality when you can spare the time, with texturing done by projecting your Stage-1 2D art or via Hunyuan3D-2.1's PBR nodes (check its license first).

## Rigging & animation (verified findings)

| Finding | Confidence |
|---|---|
| **Mixamo is free** (Adobe ID, no CC subscription) and **royalty-free for commercial games**. | 2-0 ✅ |
| Mixamo auto-rigger is **bipedal humanoids only** — no quadrupeds/creatures. | 3-0 ✅ |
| **UniRig (MIT license)**: predicts skeleton + skinning weights for humans, animals, objects; .glb in/out → Godot-compatible, commercial-OK. | 3-0 ✅ |
| UniRig inference: **minimum 8GB VRAM** — exactly your card. ⚠️ Session notes from the research run flagged that the *skinning-weight* stage reportedly wants far more VRAM (~60GB on default settings) — expect skeleton prediction to work locally but plan to do skinning in Blender if it OOMs. | 3-0 ✅ (caveat unverified) |
| **Godot 4 retargeting (SkeletonProfileHumanoid)**: one animation set shared across all humanoid models — huge for a 48-character roster. | 3-0 ✅ |
| **Godot4-OpenAnimationLibraries** (catprisbrey): free ready-made animation libraries + bone maps for Godot 4.x. (Licensing metadata in repo is thin — verify before shipping.) | 3-0 ✅ |
| **Tripo auto-rigging** markets quadrupeds/stylized/mechanical creatures. But its rigged-**GLB export claim was refuted** (FBX is the documented skeleton path), and product docs vs marketing conflict on whether non-humanoid auto-rig is actually deployed. | mixed ⚠️ |

**Practical read:** humanoid troops → Mixamo (or UniRig skeleton + Blender skinning). Non-humanoid units (cavalry mounts, siege beasts?) → UniRig locally, Tripo free tier as fallback (export FBX, convert to GLB in Blender). Animations: Mixamo library + Godot4-OpenAnimationLibraries, retargeted once via SkeletonProfileHumanoid.

## Killed / unresolved claims (don't rely on these)

- Tripo rigged-GLB export "ready for engines" — **refuted** (FBX is the skeleton path).
- Tripo "no manual weight painting needed" — **refuted** (1 refute, 0 confirms).
- All three FLUX.1-dev license-interpretation claims — **deadlocked**, treat dev as legally unclear.
- Hunyuan3D-2.1 free-commercial-under-1M-MAU — **unverified**.

## Concrete next steps

1. **Stage 1 setup:** install ComfyUI; get FLUX.1-schnell GGUF (Q4_K_S or Q5) + t5 GGUF; confirm gen on the 4060.
2. **Style lock:** generate ~20 candidates of one hero, pick the style, train a style LoRA (or use IP-Adapter referencing) and batch the 48-roster as billboards.
3. **Ship billboards in-game** (Sprite3D/billboard quads in Godot), keep playing the design loop.
4. **Stage 2 pilot (later):** take 1 troop's 2D art → SF3D → Mixamo → Godot retarget. Measure tri-count/quality before committing the whole roster.

### Sources (25, top-quality subset)
- huggingface.co/black-forest-labs/FLUX.1-schnell (primary)
- docs.comfy.org/tutorials/3d/hunyuan3D-2 (primary)
- github.com/Stability-AI/stable-fast-3d (primary)
- github.com/VAST-AI-Research/UniRig (primary)
- godotengine.org/article/animation-retargeting-in-godot-4-0 (primary)
- helpx.adobe.com/creative-cloud/faq/mixamo-faq.html (primary)
- github.com/catprisbrey/Godot4-OpenAnimationLibraries (primary)
- www.tripo3d.ai/features/ai-auto-rigging (primary)
- bfl.ai/legal/non-commercial-license-terms (primary)
- github.com/Tencent-Hunyuan/Hunyuan3D-2.1 LICENSE (primary)
- help.meshy.ai commercial-use article (primary)
- + 14 blog/forum sources (apatero.com, willitrunai.com, kijai wrapper issues, etc.)
