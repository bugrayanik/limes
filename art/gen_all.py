#!/usr/bin/env python3
"""Queue the FULL LIMES art set to ComfyUI: 48 characters (parsed from the design doc),
7 terrain tiles, 8 tribe backdrops, 1 building (Palisade/wall), 2 field cards (Supply + Crop),
1 Supply Wagon, 5 stat icons, 6 role icons.
Style: v2 locked (premium painted miniature / detailed diorama), tribe colors locked June 10 2026.

Asset list reconciled to v3 (The Living Frontier) 2026-06-13:
  - v3-concept.md §9 KEEPS the full 48-character roster + tribe backdrops, so those stay.
  - v3 KILLED the v2 non-character economy assets: Smithy/Market/Granary/Town Hall/Academy
    buildings (v3 keeps only Palisade/wall), the 4-resource matrix (v3 = Supply + Crop only;
    no Iron/Clay/Lumber), and the iron/clay/wood Field cards (v3 Fields are Supply-type or
    Crop-type only). Those v2 assets were removed below.
  - v3 ADDS the Supply Wagon (the "Sack the Wagons" win-condition object, 3 per side) — added below.
"""
import json, re, copy, urllib.request, sys

COMFY = "http://127.0.0.1:8188"
# NOTE: DOC stays pointed at the v2-era LIMES-Design-Share.md ON PURPOSE. That doc is the ONLY
# file containing the "## Character prompts" + "### Tribe board backdrops" sections this script
# parses, and v3-concept.md §9 explicitly KEEPS the full 48-character roster + backdrops unchanged,
# so the parse below still yields the correct v3 character set. No v3 doc reproduces those prompt
# sections, so repointing here would break the `assert len(characters) == 48`. The v3 reconciliation
# is applied to the hand-specified NON-character lists further down (buildings/fields/wagon), not here.
DOC = "/home/bugra/Desktop/limes/LIMES-Design-Share.md"

CHAR_STYLE = ("highly detailed painted tabletop miniature, premium board game figurine, realistic human proportions, "
  "intricate armor engravings and fabric weave details, hand-painted artisan quality, subtle weathering and battle wear, "
  "standing on a round sculpted display base, three-quarter view, soft studio lighting, "
  "rich colors with warm pastel undertones, clean light neutral background, sharp focus, 8k detail")
ENV_STYLE = ("highly detailed painterly stylized game environment concept art, rich colors with warm pastel undertones, "
  "soft atmospheric lighting, intricate architectural details, 8k detail, no characters")
DIORAMA_STYLE = ("highly detailed isometric miniature diorama on a square tile base, premium board game quality, "
  "intricate hand-crafted details, rich colors with warm pastel undertones, soft studio lighting, clean light background")
ICON_STYLE = "detailed painterly fantasy game icon, soft inner shadow, clean edges, centered composition, plain light background, no text"

TRIBE_COLOR = {
  "Romans":    "dominant crimson red and polished gold color scheme",
  "Gauls":     "dominant forest green and aged bronze color scheme",
  "Teutons":   "dominant steel grey color scheme with dark wolf fur accents",
  "Huns":      "dominant amber yellow and black lacquered leather color scheme",
  "Egyptians": "dominant turquoise blue and polished gold color scheme",
  "Vikings":   "dominant deep ocean blue and tarnished silver color scheme",
  "Spartans":  "dominant terracotta burnt orange and polished bronze color scheme",
  "Persians":  "dominant royal purple and polished gold color scheme",
}

def slug(s):
    return re.sub(r"[^a-z0-9]+", "_", s.lower()).strip("_")

# ── parse 48 character prompts from the design doc ──
text = open(DOC).read()
section = text.split("## Character prompts")[1].split("## Environment")[0]
tribe = None
characters = []
for line in section.splitlines():
    m_tribe = re.match(r"### (\w+)", line)
    if m_tribe:
        tribe = m_tribe.group(1)
        continue
    m = re.match(r"\d+\.\s+\*\*(.+?)\*\*\s+—\s+`\[MASTER_STYLE\]\s*(.+)`", line)
    if m and tribe:
        name, body = m.group(1), m.group(2)
        if tribe == "Spartans":  # locked palette: terracotta replaces red
            body = re.sub(r"blood red|deep red|\bred\b", "terracotta", body)
        characters.append((f"roster_{len(characters)+1:02d}_{slug(name)}",
                           f"{TRIBE_COLOR[tribe]}, {body}, {CHAR_STYLE}", 832, 1024))
assert len(characters) == 48, f"expected 48 characters, parsed {len(characters)}"

# ── backdrops (8) parsed from doc ──
backdrops = []
bsec = text.split("### Tribe board backdrops")[1].split("---")[0]
for line in bsec.splitlines():
    m = re.match(r"\d+\.\s+\*\*(\w+)\*\*\s+—\s+`\[MASTER_STYLE\]\s*(.+)`", line)
    if m:
        backdrops.append((f"backdrop_{slug(m.group(1))}", f"{m.group(2)}, {ENV_STYLE}", 1216, 704))
assert len(backdrops) == 8, f"expected 8 backdrops, parsed {len(backdrops)}"

# ── hand-specified remaining assets ──
tiles = [(f"tile_{n}", f"single square terrain tile texture for a strategy game board, top-down view, {d}, "
         "slight depth and edge bevel, isolated on plain light grey background, no characters, highly detailed, warm pastel undertones", 832, 832)
  for n, d in [("grass","lush green grassland with small wildflowers and subtle path wear"),
               ("sand","desert sand with gentle dunes ripples and scattered pebbles"),
               ("stone","ancient paved stone road with worn roman flagstones and moss in cracks"),
               ("dirt","bare trampled earth with hoofprints scattered straw and small stones"),
               ("forest","dense forest floor with pine trees clustered on the tile, roots and fallen needles"),
               ("hill","rocky hill rising from the tile with layered stone outcrops and dry grass"),
               ("river","shallow river ford with clear water over smooth stones and reed edges")]]

# v3 Fields are Supply-type or Crop-type ONLY (v3-concept.md §5 / v3-rules-spec.md C-008, C-020).
# v2 iron/clay/wood Field cards are killed.
fields = [
 ("card_supply",   f"supply depot resource field, stacked wooden crates and barrels of grain and salted provisions, amphorae and tied sacks, hand-cart, {DIORAMA_STYLE}", 832, 1024),
 ("card_cropland", f"golden wheat cropland resource field, neat rows of tall ripe wheat with scythe and tied sheaves, small scarecrow, {DIORAMA_STYLE}", 832, 1024),
]
# v3 keeps only the Palisade/wall structure (v3-rules-spec.md C-024). Smithy/Academy/Granary/Market/
# Town Hall were KILLED in v3-concept.md §5 (CUT) / §9 (KILL).
buildings = [
 ("bld_wall",     f"defensive stone wall section with wooden palisade top, gate with iron-banded doors, torch sconces, {DIORAMA_STYLE}", 832, 1024),
]
# Supply Wagon — the "Sack the Wagons" win-condition object (3 per side, v3-rules-spec.md C-016/C-069).
# Style06-matched (watercolor + ink, classical antiquity) per generate.py STYLE/PREFIX/SUFFIX.
WAGON_STYLE = ("loose watercolor and ink, soft bleeding edges, parchment texture background, "
               "classical antiquity illustration")
wagons = [
 ("wagon_supply", "painterly stylized fantasy game object concept art, ox-drawn military supply wagon, "
  "sturdy wooden four-wheeled cart heaped with grain sacks barrels and amphorae lashed under canvas, "
  "yoked oxen, classical antiquity Roman baggage train, "
  f"side three-quarter view, game asset illustration, {WAGON_STYLE}", 832, 1024),
]
stat_icons = [
 ("stat_hp",    f"stylized red heart with a stone keep silhouette inside, {ICON_STYLE}", 832, 832),
 ("stat_atk",   f"crossed swords with ornate hilts, {ICON_STYLE}", 832, 832),
 ("stat_def",   f"kite shield with riveted iron rim, {ICON_STYLE}", 832, 832),
 ("stat_move",  f"weathered leather boot mid-stride, {ICON_STYLE}", 832, 832),
 ("stat_range", f"drawn bow with concentric range arc, {ICON_STYLE}", 832, 832),
]
role_icons = [
 ("role_spearman",  f"single upright spear crossed over a round shield emblem, {ICON_STYLE}", 832, 832),
 ("role_swordsman", f"single gladius sword upright emblem, {ICON_STYLE}", 832, 832),
 ("role_cavalry",   f"rearing horse head profile emblem, {ICON_STYLE}", 832, 832),
 ("role_archer",    f"nocked arrow on bowstring emblem, {ICON_STYLE}", 832, 832),
 ("role_siege",     f"catapult silhouette emblem, {ICON_STYLE}", 832, 832),
 ("role_hero",      f"laurel wreath crown emblem, {ICON_STYLE}", 832, 832),
]

ALL = characters + backdrops + tiles + fields + buildings + wagons + stat_icons + role_icons

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

if "--dry" in sys.argv:
    for name, prompt, w, h in ALL: print(name)
    print(f"\nTOTAL: {len(ALL)} renders (~{len(ALL)*25//60} min)")
    sys.exit(0)

for i, (name, prompt, w, h) in enumerate(ALL):
    wf = copy.deepcopy(WORKFLOW)
    wf["4"]["inputs"]["text"] = prompt
    wf["6"]["inputs"]["width"] = w
    wf["6"]["inputs"]["height"] = h
    wf["7"]["inputs"]["seed"] = 10000 + i
    wf["9"]["inputs"]["filename_prefix"] = f"limes_{name}"
    req = urllib.request.Request(f"{COMFY}/prompt", data=json.dumps({"prompt": wf}).encode(),
                                 headers={"Content-Type": "application/json"})
    r = json.load(urllib.request.urlopen(req))
    if r.get("node_errors"): print(name, "ERROR", r["node_errors"])
print(f"queued {len(ALL)} renders")
