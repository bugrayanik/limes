#!/usr/bin/env python3
"""LIMES character generator — queues renders to a running ComfyUI (127.0.0.1:8188).

Usage:
  python3 generate.py "<name>" "<character description>" [seed]
  python3 generate.py --batch batch.json        # [{"name":..., "desc":..., "seed":...}, ...]

Locked style: style06 (watercolor + ink, classical antiquity) — chosen June 10, 2026.
"""
import json, sys, copy, urllib.request

COMFY = "http://127.0.0.1:8188"

STYLE = ("loose watercolor and ink, soft bleeding edges, parchment texture background, "
         "classical antiquity illustration")
PREFIX = "painterly stylized fantasy game character concept art"
SUFFIX = "standing pose facing viewer, full body, game asset illustration"

WORKFLOW = {
  "1": {"class_type": "UnetLoaderGGUF", "inputs": {"unet_name": "flux1-schnell-Q4_K_S.gguf"}},
  "2": {"class_type": "DualCLIPLoaderGGUF", "inputs": {
        "clip_name1": "t5-v1_1-xxl-encoder-Q5_K_M.gguf", "clip_name2": "clip_l.safetensors", "type": "flux"}},
  "3": {"class_type": "VAELoader", "inputs": {"vae_name": "ae.safetensors"}},
  "4": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["2", 0], "text": ""}},
  "5": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["2", 0], "text": ""}},
  "6": {"class_type": "EmptySD3LatentImage", "inputs": {"width": 768, "height": 1024, "batch_size": 1}},
  "7": {"class_type": "KSampler", "inputs": {
        "model": ["1", 0], "positive": ["4", 0], "negative": ["5", 0], "latent_image": ["6", 0],
        "seed": 0, "steps": 4, "cfg": 1.0, "sampler_name": "euler", "scheduler": "simple", "denoise": 1.0}},
  "8": {"class_type": "VAEDecode", "inputs": {"samples": ["7", 0], "vae": ["3", 0]}},
  "9": {"class_type": "SaveImage", "inputs": {"images": ["8", 0], "filename_prefix": ""}},
}

def queue(name, desc, seed=42):
    wf = copy.deepcopy(WORKFLOW)
    wf["4"]["inputs"]["text"] = f"{PREFIX}, {desc}, {SUFFIX}, {STYLE}"
    wf["7"]["inputs"]["seed"] = seed
    wf["9"]["inputs"]["filename_prefix"] = f"limes_{name}"
    req = urllib.request.Request(f"{COMFY}/prompt",
        data=json.dumps({"prompt": wf}).encode(), headers={"Content-Type": "application/json"})
    r = json.load(urllib.request.urlopen(req))
    err = r.get("node_errors") or "ok"
    print(f"queued {name} (seed {seed}): {err}")

if __name__ == "__main__":
    if sys.argv[1] == "--batch":
        for item in json.load(open(sys.argv[2])):
            queue(item["name"], item["desc"], item.get("seed", 42))
    else:
        queue(sys.argv[1], sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 42)
