#!/usr/bin/env python3
"""Re-roll the 8 siege units: v1 prompts (crowds, towers, crew scenes) produced incoherent
machinery unusable as billboards or image-to-3D input. v2: ONE machine + ONE crewman,
clean background, 3 seeds per tribe -> pick best, overwrite roster_NN files."""
import json, copy, urllib.request, sys

COMFY = "http://127.0.0.1:8188"

CHAR_STYLE = ("highly detailed painted tabletop miniature, premium board game figurine, "
  "intricate wood grain and iron fittings, hand-painted artisan quality, subtle weathering, "
  "standing on a round sculpted display base, three-quarter view, soft studio lighting, "
  "rich colors with warm pastel undertones, clean light neutral background, sharp focus, 8k detail, "
  "single object centered, no other people, no background scenery, no text")

TRIBE_COLOR = {
  "roman":    "dominant crimson red and polished gold color scheme",
  "gaul":     "dominant forest green and aged bronze color scheme",
  "teuton":   "dominant steel grey color scheme with dark wood accents",
  "hun":      "dominant amber yellow and black lacquered leather color scheme",
  "egyptian": "dominant turquoise blue and polished gold color scheme",
  "viking":   "dominant deep ocean blue and tarnished silver color scheme",
  "spartan":  "dominant terracotta burnt orange and polished bronze color scheme",
  "persian":  "dominant royal purple and polished gold color scheme",
}

ENGINE = {
  "roman":    "a single Roman torsion ballista, giant wooden crossbow engine on a sturdy timber frame, iron-tipped bolt loaded, small gold eagle emblem, one kneeling crewman in lorica segmentata winding the winch",
  "gaul":     "a single Gaulish onager catapult, one throwing arm with leather sling, rough-hewn timber with bronze celtic spiral fittings, one kneeling warrior in green tunic loading a stone",
  "teuton":   "a single Teutonic battering ram, heavy iron-capped log slung under a simple peaked wooden roof frame on four wheels, one warrior in chainmail pushing it",
  "hun":      "a single Hun traction trebuchet, light wooden throwing-arm catapult on two wheels decorated with black horse-tail tassels and one amber banner, one crouched archer-crewman pulling the rope",
  "egyptian": "a single Egyptian battering ram, gilded wooden log with a polished bronze ram-head cap slung in a turquoise-painted timber frame, one shaven-headed crewman in white linen kilt steadying it",
  "viking":   "a single Viking battering ram, carved dragon-prow log slung in a plain wooden frame on wheels with two round painted shields mounted on the side, one bearded warrior in furs gripping it",
  "spartan":  "a single Spartan oxybeles bolt-thrower, large bronze-fitted wooden crossbow engine on a heavy tripod base, one crested hoplite kneeling beside it loading a bolt",
  "persian":  "a single Persian wheeled siege ram, polished cedar frame with ornate gold trim and one small purple canopy, one robed soldier pushing the frame",
}

WORKFLOW = {
  "1": {"class_type": "UnetLoaderGGUF", "inputs": {"unet_name": "flux1-schnell-Q4_K_S.gguf"}},
  "2": {"class_type": "DualCLIPLoaderGGUF", "inputs": {"clip_name1": "t5-v1_1-xxl-encoder-Q5_K_M.gguf", "clip_name2": "clip_l.safetensors", "type": "flux"}},
  "3": {"class_type": "VAELoader", "inputs": {"vae_name": "ae.safetensors"}},
  "4": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["2", 0], "text": ""}},
  "5": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["2", 0], "text": ""}},
  "6": {"class_type": "EmptySD3LatentImage", "inputs": {"width": 832, "height": 1024, "batch_size": 1}},
  "7": {"class_type": "KSampler", "inputs": {"model": ["1", 0], "positive": ["4", 0], "negative": ["5", 0], "latent_image": ["6", 0],
        "seed": 0, "steps": 4, "cfg": 1.0, "sampler_name": "euler", "scheduler": "simple", "denoise": 1.0}},
  "8": {"class_type": "VAEDecode", "inputs": {"samples": ["7", 0], "vae": ["3", 0]}},
  "9": {"class_type": "SaveImage", "inputs": {"images": ["8", 0], "filename_prefix": ""}},
}

n = 0
for tribe in ENGINE:
    prompt = f"{TRIBE_COLOR[tribe]}, {ENGINE[tribe]}, {CHAR_STYLE}"
    for v in range(3):
        wf = copy.deepcopy(WORKFLOW)
        wf["4"]["inputs"]["text"] = prompt
        wf["7"]["inputs"]["seed"] = 31000 + n
        wf["9"]["inputs"]["filename_prefix"] = f"limes_siege2_{tribe}_v{v+1}"
        req = urllib.request.Request(f"{COMFY}/prompt", data=json.dumps({"prompt": wf}).encode(),
                                     headers={"Content-Type": "application/json"})
        r = json.load(urllib.request.urlopen(req))
        if r.get("node_errors"): print(tribe, v, "ERROR", r["node_errors"], file=sys.stderr)
        n += 1
print(f"queued {n} siege re-rolls")
