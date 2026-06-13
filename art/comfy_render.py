#!/usr/bin/env python3
"""Render LIMES assets on a running ComfyUI (RTX 4060) and collect the outputs
into art/renders/. Unlike generate.py (fire-and-forget queue), this waits for
each render via /history polling, then copies the PNG into the project so it
shows up in the styleguide index.

Usage:
  python3 comfy_render.py pilot          # render the v3 asset-style pilot set
  python3 comfy_render.py --batch f.json # [{name,prompt,w,h,seed}, ...]
"""
import json, sys, os, time, copy, shutil, urllib.request

COMFY = "http://127.0.0.1:8188"
OUT = os.path.expanduser("~/dev/ComfyUI/output")
DEST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "renders")

STYLE = ("loose watercolor and ink, soft bleeding edges, parchment texture, "
         "classical antiquity illustration, muted earthy palette, gold accents")

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


def _post(path, payload):
    req = urllib.request.Request(COMFY + path,
        data=json.dumps(payload).encode(), headers={"Content-Type": "application/json"})
    return json.load(urllib.request.urlopen(req))


def render(name, prompt, w=768, h=1024, seed=42, timeout=180):
    wf = copy.deepcopy(WORKFLOW)
    wf["4"]["inputs"]["text"] = f"{prompt}, {STYLE}"
    wf["6"]["inputs"]["width"] = w
    wf["6"]["inputs"]["height"] = h
    wf["7"]["inputs"]["seed"] = seed
    wf["9"]["inputs"]["filename_prefix"] = f"limes_{name}"
    pid = _post("/prompt", {"prompt": wf})["prompt_id"]
    t0 = time.time()
    while time.time() - t0 < timeout:
        hist = json.load(urllib.request.urlopen(f"{COMFY}/history/{pid}"))
        if pid in hist:
            imgs = hist[pid]["outputs"]["9"]["images"]
            fn = imgs[0]["filename"]
            src = os.path.join(OUT, imgs[0].get("subfolder", ""), fn)
            dest = os.path.join(DEST, f"limes_{name}_00001_.png")
            shutil.copyfile(src, dest)
            print(f"  ok  {name}  ({w}x{h}, seed {seed})  -> {os.path.basename(dest)}  [{time.time()-t0:.0f}s]")
            return dest
        time.sleep(1.5)
    print(f"  TIMEOUT  {name}")
    return None


PILOT = [
  ("wagon_supply", "ox-drawn Roman military supply wagon, sturdy wooden four-wheeled cart heaped with grain sacks barrels and amphorae lashed under canvas, yoked oxen, side three-quarter view, single game object on plain background", 832, 1024, 7),
  ("tile_open_v3", "top-down isometric square game board tile, open grassy battlefield field with faint plowed furrows, clean tileable edges, single terrain tile", 1024, 1024, 7),
  ("card_back_v3", "ornate trading card back design, centered Roman legionary eagle aquila standard emblem, symmetrical carved border, deep crimson and aged gold, vertical card", 768, 1024, 7),
  ("card_frame_unit_v3", "blank ornate unit card frame template, empty parchment art window in the center, carved stone border with small stat plaques at the bottom corners, vertical game card, no text", 768, 1024, 7),
  ("ui_panel_v3", "horizontal game UI banner panel, carved stone and weathered parchment with gold trim, empty center, ornate classical antiquity interface element", 1280, 512, 7),
  ("menu_bg_v3", "main menu splash background, sweeping classical antiquity Roman frontier battlefield at dawn, distant palisades and standards, atmospheric depth, cinematic wide", 1280, 720, 7),
]


def main():
    os.makedirs(DEST, exist_ok=True)
    if sys.argv[1] == "pilot":
        print(f"rendering {len(PILOT)} pilot assets...")
        for name, prompt, w, h, seed in PILOT:
            render(name, prompt, w, h, seed)
    elif sys.argv[1] == "--batch":
        for it in json.load(open(sys.argv[2])):
            render(it["name"], it["prompt"], it.get("w", 768), it.get("h", 1024), it.get("seed", 42))


if __name__ == "__main__":
    main()
