#!/usr/bin/env python3
"""Re-roll the 10 renders broken by tribe-color bleed (gen_all.py prepended
'dominant <color> color scheme' at prompt start -> FLUX painted horses/skin in tribe colors).
Fix: color clause moved to END and scoped to armor/cloth/equipment; explicit natural
horse coats and skin tones. 3 seeds per subject -> pick best, overwrite roster_NN files."""
import json, copy, urllib.request

COMFY = "http://127.0.0.1:8188"

CHAR_STYLE = ("highly detailed painted tabletop miniature, premium board game figurine, realistic human proportions, "
  "intricate armor engravings and fabric weave details, hand-painted artisan quality, subtle weathering and battle wear, "
  "standing on a round sculpted display base, three-quarter view, soft studio lighting, "
  "rich colors with warm pastel undertones, clean light neutral background, sharp focus, 8k detail")

FIXES = {
 "roster_03_roman_cavalry": (
   "Roman equite officer riding a natural dark brown warhorse, rider seated firmly astride the saddle, "
   "ornate muscled cuirass with gold filigree, contus lance lowered forward, crested cavalry helm with cheek-guards, "
   "draped crimson cloak, crimson red caparison cloth on the horse, horse mid-trot, "
   "armor and cloth in dominant crimson red and polished gold color scheme, natural brown horse coat, natural human skin tone"),
 "roster_06_roman_hero_legatus_marcus": (
   "Roman general Legatus Marcus gripping a gladius short sword firmly in his right hand and a wooden command baton "
   "in his left hand, ornate gold-trimmed muscled cuirass with eagle relief, crimson paludamentum cloak flowing, "
   "Attic helmet with tall red horsehair crest, decorated greaves, heroic confident stance, "
   "armor and cloth in dominant crimson red and polished gold color scheme, natural human skin tone, well-formed hands"),
 "roster_09_gaul_cavalry": (
   "Gaulish noble cavalry riding a natural dappled light grey horse, mail hauberk over green tunic, "
   "bronze helm with raised wings on sides, long iron sword drawn, oval shield strapped to back, bronze torc, "
   "plaid forest green caparison cloth on the horse, "
   "attire in dominant forest green and aged bronze color scheme, natural grey horse coat, natural human skin tone"),
 "roster_15_teuton_cavalry": (
   "Teutonic heavy knight riding a massive natural black warhorse, full mail hauberk and steel grey surcoat, "
   "two-handed flanged mace held high, great helm with horsehair plume, wolf-fur cloak, dark cloth barding, "
   "attire in dominant steel grey color scheme with dark fur accents, natural black horse coat, natural human skin tone"),
 "roster_18_teuton_hero_warlord_drengr": (
   "Teutonic Warlord Drengr, massive horned iron crown-helm, scarred bare chest with dark rune tattoos, "
   "mail half-cloak, two-handed Dane axe slung across back, bear-fur cloak, iron arm rings, fierce battle-roar expression, "
   "armor and cloth in dominant steel grey color scheme, natural pale human skin tone on chest and face"),
 "roster_21_hun_cavalry": (
   "Hun horse archer riding a natural chestnut brown steppe pony mid-gallop, composite recurve bow drawn with arrow nocked, "
   "lamellar armor with fur-trimmed helm and horse-tail tassel, iconic Parthian shot stance, no shield, "
   "armor in dominant amber yellow and black lacquered leather color scheme, natural brown horse coat, natural human skin tone"),
 "roster_24_hun_hero_khan_bayan": (
   "Khan Bayan standing on foot on the display base, no horse, ornate gold-and-amber lamellar armor with black lacquer trim, "
   "tall central-spiked crown-helm with horse-hair plume, curved sabre at hip and recurve bow on back, "
   "fur-trimmed shoulder mantle, golden arm bracers, commanding stance, sharp eagle-eyed gaze, scar across cheek, "
   "armor in dominant amber yellow and black lacquered leather color scheme, natural human skin tone"),
 "roster_27_egyptian_cavalry": (
   "Egyptian light war chariot drawn by two natural bay brown horses, driver holding reins and archer drawing bow "
   "standing in the chariot car, bronze-rimmed wheels, chariot body painted turquoise with polished gold trim, "
   "crew in white linen kilts and gold pectorals, dynamic mid-charge composition, "
   "turquoise and gold colors on the chariot body and clothing only, natural brown horse coats, natural human skin tone"),
 "roster_45_persian_cavalry": (
   "Persian cataphract heavy cavalry, fully armored rider on a warhorse wearing scale barding over its body, "
   "the horse's face and lower legs showing natural dark bay brown coat, long kontos lance lowered for charge, "
   "conical helm with face-veil, intimidating armored mass, "
   "barding and armor in dominant royal purple and polished gold color scheme, natural horse coat where visible, natural human skin tone"),
 "roster_48_persian_hero_satrap_darius": (
   "Satrap Darius Persian noble general, ornate gold scale armor with royal purple silk underlayer, "
   "gold lion-emblem chest piece, tall golden ceremonial crown with purple cloth wraps, akinakes sword and gold-handled mace, "
   "long oiled curled dark beard, intricate gold rings and bracers, regal commanding stance, "
   "armor and cloth in dominant royal purple and polished gold color scheme, natural olive human skin tone on face and hands"),
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
for name, desc in FIXES.items():
    for v, seed in enumerate((20260, 20261, 20262), 1):
        wf = copy.deepcopy(WORKFLOW)
        wf["4"]["inputs"]["text"] = f"{desc}, {CHAR_STYLE}"
        wf["7"]["inputs"]["seed"] = seed + hash(name) % 1000
        wf["9"]["inputs"]["filename_prefix"] = f"limes_fix3_{name}_v{v}"
        req = urllib.request.Request(f"{COMFY}/prompt", data=json.dumps({"prompt": wf}).encode(),
                                     headers={"Content-Type": "application/json"})
        r = json.load(urllib.request.urlopen(req))
        if r.get("node_errors"): print(name, v, "ERROR", r["node_errors"])
        n += 1
print(f"queued {n} re-rolls")
