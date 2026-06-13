# 🏛️ LIMES — Game Design + Art Pipeline

> A deterministic auto-battler: Travian economy + auto-battler loop + Civ6 combat. 1v1 duel, ~15–20 min/match. Godot 4.3 + C++.
> _Single shareable doc — combines the full design spec and the art pipeline._

---

# LIMES — Full Design (v2, detailed)

> **Our own game.** A merge of three engines, all deterministic, balanced structurally so it never needs patches:
> - **Travian** → economy: resource Fields, 4 resources, Crop upkeep, 8 tribes, Natars
> - **Auto-battler** → loop: open recruit → deploy → auto-resolve, last village standing
> - **Civ6** → combat: Combat Strength differential, terrain, flanking/support, Zone of Control, promotions
>
> Working title **LIMES**. **1v1 duel** (vs AI or hot-seat). ~15–20 min/match. Godot 4.3 + C++ GDExtension.

---

## 0. Pillars (the non-negotiables)

1. **Deterministic combat.** No crit/dodge/miss. Same board → same result. (Shop draw is *not* random either — recruitment is open.)
2. **Patch-light, not no-patch.** Structural balance + flat effects + tiny synergy space → far fewer patches than TFT. (Online PvP means we can't promise *zero* patches; offline modes stay evergreen with no servers.)
3. **Self-balancing limiters.** Army size bounded by four real things, not a fake shop: **afford / feed / hold / fit.**
4. **Not TFT.** No random shop, no reroll, no forced slots.

---

## 1. The two boards

| Board | Size | Holds | Notes |
|---|---|---|---|
| **Village** (econ) | 3×3, expandable to 4×4 | Field + Building cards | Safe — never attacked |
| **Front** (battle) | **8 columns × 6 rows** (you own bottom 3 rows) | Units | Has terrain tiles; deterministic combat |

**A live online 1v1 PvP duel: you vs one other player (different tribe).** Matchmaking pairs you with a real opponent in real time. Each round, both players get a **timed planning phase** (economy → recruit → arrange Front) at the same time, then the two armies **auto-resolve** against each other (deterministic) while both watch. Loser of a clash loses **Village HP = round# + surviving enemy units**. **First village to 0 HP loses.** Escalating tug-of-war, ~10–15 rounds.

**Netcode note:** because combat is deterministic, the two clients only exchange their final **board layouts** each round and both simulate the identical fight locally (lockstep) — cheap and cheat-resistant.

**Offline modes (the evergreen layer):** vs-AI skirmish, hot-seat 1v1, and the 8 tribe campaigns all run with no servers, so the game still plays after online sunsets.

---

## 2. Resources (Travian's 4)

| Resource | Buys | Role |
|---|---|---|
| **Lumber** | Archers, ranged, scouts | cheap |
| **Clay** | Spearmen, Swordsmen, Walls, buildings | defensive |
| **Iron** | Cavalry, Siege, weapon upgrades | premium |
| **Crop** | **Upkeep** — paid every round per unit held + fielded | the throttle |

**Crop upkeep is the master limiter.** Recruit freely, but every unit eats Crop each round. Can't pay → **starvation: −6 CS to all units that round.** This replaces TFT's shop slots.

### Starting economy
- Start: **5 of each resource**, Village 3×3 with 3 fields placed (1 Lumber, 1 Clay, 1 Crop).
- Field output per level: **Lv1 = 4 / Lv2 = 7 / Lv3 = 11** per round (Crop fields: 6 / 8 / 10).
- **Deploy slots** (units you may field): start **5**, +1 every 2 rounds (and via Town Hall), cap **12**.
- **Hold cap** (reserve/Granary): start **8**, +4 per Granary level.

---

## 3. Card families

| Family | Cards | Effect |
|---|---|---|
| **Field** | Woodcutter, Clay Pit, Iron Mine, Cropland | produce resources/round |
| **Field-upgrade** | Field Lv2, Lv3 | raise that field's output |
| **Building** | Smithy, Academy, Granary, Wall, Market, Town Hall | infrastructure (see §8) |
| **Unit** | 5 troop archetypes × 8 tribes (40) | the army |
| **Era/Tech** | advanced unit forms | transform a unit (needs Academy) |
| **Artifact** | run-buffs | dropped by Natars, pick 1 of 3 (see §10) |
| **Hero** | 1 per tribe (8) | unique centerpiece (see §6) |

> **Character count:** 40 troops + 8 heroes = **48 total characters**. (The roster in §6 lists 6 archetypes — Spearman/Swordsman/Cavalry/Archer/Siege are the 5 troops; Hero is the 6th, recruited separately.)

---

## 4. The round loop

| # | Phase | Detail |
|---|---|---|
| 1 | **Production** | Field cards pay out |
| 2 | **Recruit** | Open pool — buy any units you can afford. No slots, no reroll. |
| 3 | **Build** | Play Field / upgrade / Building cards |
| 4 | **Deploy** | Place units from reserve onto the Front (≤ deploy slots) |
| 5 | **Battle** | Deterministic combat vs paired player or Natar wave |
| 6 | **Upkeep** | Pay Crop. Shortfall → starvation penalty |

---

## 5. Combat — Civ6, fully deterministic

Each unit has **two Combat Strengths** (Travian-style): **Attack CS** and **Defense CS** — plus **HP**, **Movement**, **Range**. No separate armor stat (defense = Defensive CS). No dice.

### Damage formula
```
effAtk = Attack CS  + flanking + counter-triangle + tribe/class buffs
effDef = Defense CS + terrain  + support + fortify  + tribe/class buffs − starvation

damage = round( 10 × 2^((effAtk − effDef) / 12) )   // min 1
```
Equal strength → 10 damage. +12 advantage → 20 (double). −12 → 5. Pure function of board state.

### Retaliation (Civ6)
After a **melee** hit, if the defender survives and the attacker is adjacent, defender retaliates using *its* effAtk vs attacker's effDef. **Ranged attacks take no retaliation.**

### Positional modifiers (all flat, deterministic)
| Modifier | Effect |
|---|---|
| **Flanking** | +3 effAtk per friendly unit adjacent to the *target* |
| **Support** | +2 effDef per friendly unit adjacent to *you* |
| **Fortify** | didn't move this turn → +4 effDef |
| **Terrain** | see §5b |
| **Zone of Control** | moving adjacent to an enemy ends movement |
| **Counter-triangle** | Spear +8 vs Cavalry; Cavalry +6 vs Archer; Archer +6 vs Spear |
| **Starvation** | −6 to all your units this round |

### Initiative
Fixed order, fastest first: **Cavalry → Archer → Swordsman/Hero → Spearman/Siege.** Within a class, leftmost-then-frontmost. Each unit moves (respecting ZoC) toward the nearest valid target, then attacks if in range. Combat ends on a wipe or **15-turn cap** (then most-remaining-HP side wins).

### 5b. Terrain set (fixed per map → deterministic)
| Tile | Effect |
|---|---|
| **Open** | neutral, move cost 1 |
| **Hills** | +4 effDef to occupant; move cost 2 |
| **Woods** | +3 effDef; blocks ranged line-of-sight beyond it; move cost 2 |
| **River edge** | attacking *across* it: −6 effAtk |
| **Road** | +1 movement when moving along it |

A handful of preset Front layouts ship; both players see the same terrain (mirrored).

---

## 6. Unit roster — 6 archetypes

Stats are **identical across tribes** for the same archetype (the evergreen rule). Tribe identity = passive + hero + art only.

| Archetype | Atk | Def | HP | Move | Range | Cost | Crop | Special | Chess-ish |
|---|---|---|---|---|---|---|---|---|---|
| **Spearman** | 10 | 16 | 60 | 1 | 1 | Clay 2 | 1 | +8 vs Cavalry | wall |
| **Swordsman** | 16 | 14 | 70 | 2 | 1 | Clay 3 | 1 | all-rounder | bruiser |
| **Cavalry** | 20 | 12 | 65 | 4 | 1 | Iron 4 | 2 | +6 vs Archer, charge | striker |
| **Archer** | 18 | 8 | 45 | 2 | 2 | Lumber 3 | 1 | +6 vs Spear, ranged | DPS |
| **Siege** | 22 | 6 | 55 | 1 | 2 | Iron 5 | 2 | splash, anti-clump | artillery |
| **Hero** | 24 | 18 | 120 | 3 | 1 | special | 3 | unique active | queen |

**Counter triangle** (geometry + the +CS bonuses): Spear > Cavalry > Archer > Spear. Swordsman = stable mid. Siege > clumps, dies to lone fast units. Hero = wildcard.

### Era/Tech upgrades (Academy)
Each archetype has a Tier-2 form. Pay Iron + have an Academy; transforms the unit in place.

| T1 → T2 | Stat change |
|---|---|
| Spearman → **Pikeman** | Def 16→22, +10 vs Cavalry |
| Swordsman → **Legionnaire** | Atk 16→22, HP +10 |
| Cavalry → **Cataphract** | Atk 20→26, HP 65→90 |
| Archer → **Crossbowman** | Atk 18→24, Range 2→3 |
| Siege → **Catapult** | Atk 22→28, splash 3×3 |
| Hero → **(tribe legend)** | ability upgrades (see §6 heroes) |

---

## 6b. Promotions (Civ6) — earned in combat

A unit that **survives** a combat round earns 1 XP. At **2 XP and 4 XP** it picks one promotion from its class tree (deterministic, no random offering — full tree shown).

**Spearman:** Bulwark (+4 Def when fortified) · Pike Wall (+4 anti-cav) · Tenacity (heal 8 if it didn't move) · Phalanx (+2 Def per adjacent Spearman)
**Swordsman:** Veteran (+3 Atk) · Cleave (also hit a 2nd adjacent enemy) · Second Wind (heal 10 on kill) · Charge (+4 Atk on first attack)
**Cavalry:** Outrider (+2 move) · Skirmisher (ignore ZoC) · Lancer (+6 Atk after moving 3+) · Relentless (take no retaliation)
**Archer:** Marksman (+1 range) · Volley (+4 Atk vs units that didn't move) · Mobile (move *and* shoot) · Piercing (also hit tile behind target)
**Siege:** Demolition (+6 vs fortified/clumped) · Wide Barrage (splash 3×3) · Crew (+2 Def per adjacent friendly) · Bombard (range 3)
**Hero:** levels its active (range/duration/power up).

---

## 7. Synergies — 13 traits total, all flat & deterministic

Two axes, small thresholds, each tier worth a fixed power budget so they're comparable by construction.

### Class traits (5 counting classes; thresholds 2 / 4 / 6)
| Class | (2) | (4) | (6) |
|---|---|---|---|
| **Spearman** | +3 Def CS | Taunt (enemies target nearest Spearman first) | reflect 6 dmg + extra anti-cav |
| **Swordsman** | +6 HP | shield 15 at combat start | on kill, adjacent Swordsmen heal 12 |
| **Cavalry** | +1 move | +4 Atk CS | first attack each combat deals +50% |
| **Archer** | +1 range | +3 Atk CS if it didn't move | shots pierce the line behind target |
| **Siege** | 1-tile splash | +6 Atk vs clumped | splash → 3×3 |

### Origin traits (8 tribes) — passive (always on) + banner (3 / 5 / 7 same tribe)

| Tribe | Passive (always on) | Banner 3+ / 5+ / 7+ |
|---|---|---|
| **Romans** *(Eternal Legion)* | Smithy upgrades −1 resource; may play **2 building cards/round** | +2 Def / also +2 Atk / free Smithy level each round |
| **Gauls** *(Forest Defenders)* | All Gaul units +1 move; Wall cards +50% Def | +3 Def / place 2 **traps** (immobilize first enemy 3 turns) / traps also deal 20 dmg |
| **Teutons** *(The Horde)* | Teuton units −1 resource cost; win combat → +2 random resources | +3 Atk / +1 Atk each round (snowball) / **Brewery**: +6 Atk next combat if you skipped recruiting |
| **Huns** *(Steppe)* | Cavalry −1 Iron; Huns ignore terrain move penalties | cav +1 move / cav ignore ZoC / cav +8 Atk on charge (moved 3+) |
| **Egyptians** *(Nile)* | +3 Crop/round; Field cards +1 output | upkeep −1 per Egyptian / +1 deploy slot / Egyptian units cost **no upkeep** |
| **Vikings** *(North)* | +1 random resource per Viking kill | +3 Atk when outnumbered / killing blows splash 10 / first Viking death respawns at 50% HP |
| **Spartans** *(The 300)* | Cost +1 but +10 HP and **heal full between rounds** | +3 Atk & Def / can't be moved, ignore flanking / revive once per combat at 50% |
| **Persians** *(Immortals)* | Hero cheaper + respawns once/match; units adjacent to Hero +2 CS | adjacency bonus → +3 / Hero casts 1 turn earlier / Hero ability fires twice |

---

## 6c. Heroes (8) — deterministic kits

One per army (max 1; Persians/"Twin Heroes" artifact can raise to 2). Base stats from §6. Each has a **once-per-combat active** on a **deterministic trigger** (fixed turn / HP threshold / ally death) — never a random chance. Every kit has a built-in counter, which is *why* it needs no patch.

| Tribe | Hero | Trigger | Active | Built-in counter |
|---|---|---|---|---|
| **Romans** | **Legatus Marcus** | turn 3 | *Issue Order* — the 2 allies in front act again immediately | melee-range; kited by Archers, dies to focus |
| **Gauls** | **Druidess Eponia** | turn 2 | *Mistveil* — hero + adjacent allies +6 Def, untargetable by ranged 2 turns | Siege splash hits tiles; melee walks in |
| **Teutons** | **Warlord Drengr** | self < 50% HP | *Berserk* — can't be healed; +12 Atk (+2/turn), −6 Def | glassy; focus or kite him |
| **Huns** | **Khan Bayan** | turn 1 | *Steppe Rush* — all Cavalry leap to backline, +6 Atk 3 turns | Spearman taunt + anti-cav punishes the dive |
| **Egyptians** | **High Priest Sebek** | turn 2 | *Sandstorm* — densest 3×3 enemy cluster: −6 CS + act last, 3 turns | spread out (don't clump); cavalry dives under |
| **Vikings** | **Jarl Sigrid** | first ally death | *Raven Banner* — that ally respawns by hero at 50% HP | Siege AoE re-kills it; kill the Jarl first |
| **Spartans** | **King Leonis** | turn 1 (aura) | *Hold the Line* — adjacent allies unmovable, +4 Def, front never breaks | ranged/siege over the wall; isolate units |
| **Persians** | **Satrap Darius** | turn 3 | *Immortals* — summon 1 Spearman per adjacent friendly Spearman | AoE the summoned clump; low individual CS |

---

## 8. Buildings (Village cards)

| Building | Effect |
|---|---|
| **Smithy** | unlocks unit upgrades: +2 Atk *or* Def per level to a unit-type, max +6 (global) |
| **Academy** | unlocks Era/Tech transforms (§6 T2 forms) |
| **Granary** | +4 hold cap per level |
| **Wall** | deploys a wall segment on your front row (Def structure, blocks movement) |
| **Market** | convert resources 3:1 |
| **Town Hall** | +1 deploy slot |

---

## 9. Natars — the PvE faction (not the main opponent)

Not playable. In **online PvP**, Natars appear as **PvE creep rounds** interspersed between player clashes (like TFT creeps / Bazaar monster days) — both players fight the same wave; drops fund your build. In the **offline campaign**, Natars are the escalating story foe you fight round to round, up to the Natarian Emperor boss.

| ~Round | Natar wave | Drop |
|---|---|---|
| 1 (intro) | 3× **Pikeman** | 5 of each resource |
| 4 | 4× **Guardsman** + 2× **Birds of Prey** (fast) | item components |
| 7 (elite) | **Natarian Knights** + **Axeriders** | choose 1 **Artifact** of 3 |
| 10 (elite) | **War Elephant** (huge HP) + **Ballista** (siege) | strong Artifact |
| 13 (BOSS) | **Natarian Emperor** (hero-tier) | a **Hero** card or legendary |

---

## 10. Artifacts (augments) — pick 1 of 3 from Natar drops

All deterministic, run-defining:

- **Iron Legion** — all units +2 Def CS
- **Bloodlust Banner** — all units +3 Atk CS, −5 HP
- **Granary of Plenty** — +50% Crop, +2 hold cap
- **Forced March** — all units +1 move
- **Siege Engineers** — all Siege gain 3×3 splash
- **Oasis Bounty** — +3 of each resource per round
- **Twin Heroes** — field 2 Heroes
- **Phalanx Doctrine** — Spearman Taunt at threshold 2 instead of 4

---

## 11. Content (evergreen plan)

| Mode | Content |
|---|---|
| **Tribe campaigns** | 8 × 8 missions = 64 hand-designed scenarios |
| **Endless** | escalating bots + leaderboard |
| **Daily seed** | shared seed, score-based |
| **Local PvP** | 1v1 hot-seat (same screen) or LAN |
| **Custom skirmish** | pick tribes, bot difficulty, rules |

No accounts, no servers, no microtransactions.

---

## 12. Tech stack

- **Engine:** Godot 4.3 + GDExtension C++20 (reuse godot-cpp bindings already in repo)
- **Logic (C++):** combat resolver, AI, economy
- **UI:** GDScript
- **Data:** JSON for tribe/unit/hero/card defs (data-driven, even though we don't plan to patch)
- **Saves:** local JSON
- **Networking (online 1v1 PvP):** matchmaking server + lightweight authoritative backend. **Lockstep** model — clients exchange final board layouts each round and both run the deterministic sim locally (cheap, cheat-resistant). Offline modes need no server.

---

## 13. Still open (numbers to playtest, not structure)

1. Combat constants BASE=10, D=12 — confirm via sim
2. Exact field outputs / costs / deploy-slot curve
3. Front terrain layouts (how many presets)
4. Whether Hero is a 6th counting class or stays unique (currently unique)
5. **Game name** — LIMES is the working title. Other candidates: CASTRUM, FORUM, AGGER, IMPERIUM, VEXILLUM.

**Next build step:** prototype the C++ combat resolver and run the counter-triangle through it to verify Spear>Cav>Archer holds with these numbers.


---

# Part 2 — Art Pipeline

# Art Assets — Auto-Battler (2D-first, 3D-later pipeline)

> **Two-stage workflow:**
> 1. **Stage 1 — Ship 2D first.** Generate all 48 character illustrations via Flux/Midjourney. Use these directly in-game as 2D billboards on a 3D board (à la Wargroove). Game playable end-to-end with 2D art only.
> 2. **Stage 2 — Convert to 3D when ready.** Feed the same 2D images into Meshy AI v5 (image-to-3D supports dynamic poses now, no T-pose required). Cleanup in Blender → Mixamo rig → Mixamo animations. Swap 2D billboards for 3D models without touching game logic.
>
> Stage 1 = ~1–2 weeks part-time. Stage 2 = +3–4 months when you want the polish jump. You can ship/playtest with Stage 1 art and never feel blocked on Stage 2.

---

## Pipeline (per character)

1. **Reference image** — generate from prompts below. Iterate until silhouette is clean and readable.
2. **Image-to-3D** — feed reference into Meshy AI v5 / Rodin Gen-3 / Hunyuan3D 2.5 / Tripo. Pick whichever gives best topology for your subject. Recommendation: Rodin Gen-3 for organic characters, Meshy for hard-surface (siege machines).
3. **Mesh cleanup** — Blender. Target 5k–15k tris per unit (mobile-friendly headroom). Retopo if needed.
4. **Texture** — 1024×1024 albedo + normal + roughness, PBR. Many AI tools output these directly.
5. **Rig** — Mixamo auto-rig for humanoid; Meshy auto-rig as fallback. Hand-rig siege machines (5 bones max).
6. **Animations** — Mixamo library: Idle, Walk, Attack, Hit-React, Death. Retarget to your rig. 5 anims × 56 chars = 280 clips.
7. **Import to Godot 4.3** — `.glb` format. Use AnimationPlayer per character scene.

---

## Master style guide (apply to every reference image)

Bake these into **every** character prompt for visual consistency:

```
[MASTER_STYLE] stylized fantasy game character, painterly textures with clean
readable silhouette, low-poly-friendly forms, exaggerated heroic proportions
(7 heads tall), full body visible head to feet, front-facing or slight 3/4
angle, neutral mid-grey gradient background, soft even diffuse studio lighting,
faint contact shadow only, isolated subject, no props floating off-body,
8k detail, single character only --ar 2:3 --v 6
```

> **Workflow note:** Action poses are fine and preferred for 2D in-game art (more dynamic, more expressive). Meshy v5 image-to-3D handles non-T-pose inputs well. If a specific unit gives bad 3D geometry later, regenerate that one unit in T-pose using same prompt with `"T-pose arms outstretched, neutral standing pose"` swapped in.

> Always append `[MASTER_STYLE]` to every character prompt. Substitute literally when generating.

### Tribe accent palettes (use as second-anchor color in each unit)

| Tribe | Primary | Accent | Material cues |
|---|---|---|---|
| Romans | Crimson red | Polished gold | Lorica segmentata, eagle motifs, leather pteruges |
| Gauls | Forest green | Aged bronze | Plaid wool, woad-blue tattoos, oval shield |
| Teutons | Steel grey | Dark fur (wolf/bear) | Mail hauberk, two-handed weapons, antler/horn |
| Huns | Amber yellow | Black lacquered leather | Lamellar plates, recurve bow, horse-hair tassels |
| Egyptians | Turquoise blue | Polished gold | Linen kilt, kohl eyes, jackal/falcon iconography |
| Vikings | Deep ocean blue | Tarnished silver | Mail + fur cloak, runic engravings, raven motifs |
| Spartans | Blood red | Polished bronze | Corinthian helm with horsehair crest, hoplite shield |
| Persians | Royal purple | Polished gold | Scale armor, Phrygian cap, lion motifs |

### Archetype silhouette rules (must read at thumbnail size)

| Archetype | Silhouette anchor | Pose cue |
|---|---|---|
| Spearman | Long vertical spear + large shield | Planted, defensive |
| Swordsman | Sword raised + medium shield | Mid-swing, alert |
| Cavalry | Mounted on horse, lance forward | Charging, mid-stride |
| Archer | Drawn bow at shoulder OR quiver visible | Aiming or scanning |
| Siege | Operating large wooden machine (taller than operator) | Crouched, loading |
| Hero | Ornate armor, signature weapon, taller frame | Heroic stance, contrapposto |

---

## Character prompts (40 troops + 8 heroes = 48 total)

> Format: each prompt = `[MASTER_STYLE]` + tribe palette + archetype silhouette + unique flavor. Copy literally into Flux/Midjourney. Add `--ar 1:1` for Midjourney.

### Romans (crimson + gold)

1. **Roman Spearman** — `[MASTER_STYLE] Roman legionary auxiliary, lorica hamata mail, large rectangular scutum shield with red field and gold eagle emblem, long pilum spear planted vertically, segmented leather pteruges skirt, galea helmet with horizontal red crest, sandal-boots, defensive planted stance`
2. **Roman Swordsman** — `[MASTER_STYLE] Roman legionary, lorica segmentata polished steel plates, gladius short sword raised mid-swing, oval scutum with gold thunderbolt motif, crimson tunic underneath, galea helmet, focused alert expression`
3. **Roman Cavalry** — `[MASTER_STYLE] Roman equite officer mounted on dark brown warhorse with red caparison, ornate muscled cuirass with gold filigree, contus lance lowered forward, crested cavalry helm with cheek-guards, draped crimson cloak, horse mid-trot`
4. **Roman Archer** — `[MASTER_STYLE] Roman sagittarius auxiliary, leather scale armor, composite recurve bow drawn at shoulder, quiver of red-fletched arrows, conical helm, lighter tunic, focused aiming pose, no shield`
5. **Roman Siege** — `[MASTER_STYLE] Roman ballista crew engineer crouched beside large wooden torsion ballista, iron-tipped bolt loaded, ropes and winches visible, soldier in lorica hamata operating winch, gold eagle emblem on machine, oversized siege weapon dominates the frame`
6. **Roman Hero — Legatus Marcus** — `[MASTER_STYLE] Roman general Legatus Marcus, ornate gold-trimmed muscled cuirass with eagle relief, crimson paludamentum cloak flowing, gladius in one hand command baton in other, Attic helmet with tall red horsehair crest, decorated greaves, heroic contrapposto stance, charismatic confident expression`

### Gauls (forest green + bronze)

7. **Gaul Spearman** — `[MASTER_STYLE] Gaulish phalangite, bronze-trimmed oval shield in forest green with bronze swirl spirals, long ash spear planted, plaid green wool tunic, leather and mail vest, bronze conical helm, simple stance feet apart`
8. **Gaul Swordsman** — `[MASTER_STYLE] Gaulish warrior, long iron Celtic longsword mid-swing, smaller round shield with bronze boss, bare-chested with blue woad tattoos across shoulders, plaid green trousers, lime-washed spiked hair, bronze torc at neck, fierce alert pose`
9. **Gaul Cavalry** — `[MASTER_STYLE] Gaulish noble cavalry on dappled grey horse, mail hauberk over green tunic, bronze helm with raised wings on sides, long iron sword drawn, oval shield strapped to back, bronze torc visible, horse caparisoned in plaid green`
10. **Gaul Archer** — `[MASTER_STYLE] Gaulish forest scout, hooded green cloak, long yew longbow drawn, quiver of fletched arrows on hip, leather jerkin, woad tattoos on visible arms, soft leather boots, alert ranger pose, no shield`
11. **Gaul Siege** — `[MASTER_STYLE] Gaulish onager catapult crew, large rough-hewn wooden onager catapult with bronze fittings and Celtic spiral carvings, crouched warrior in green tunic loading stone, oversized siege machine dominates`
12. **Gaul Hero — Druidess Eponia** — `[MASTER_STYLE] Druidess Eponia, flowing forest-green druidic robes with bronze leaf-clasps, antlered headpiece, ornate bronze staff topped with crystal, golden torc, deep blue woad spirals on forearms, long auburn braided hair, mystical confident pose, soft glow on staff tip`

### Teutons (steel grey + dark fur)

13. **Teuton Spearman** — `[MASTER_STYLE] Teutonic militia spearman, mail hauberk over wolf-fur cloak, kite-shaped wooden shield with iron rivets and grey wolf emblem, long ash spear planted, conical iron helm with nasal bar, fur-trimmed boots, planted defensive stance`
14. **Teuton Swordsman** — `[MASTER_STYLE] Teutonic warrior, two-handed iron broadsword raised overhead mid-swing, mail hauberk with dark bear-fur mantle on shoulders, iron horned helm, leather wrist-wraps, grim determined expression, powerful stance`
15. **Teuton Cavalry** — `[MASTER_STYLE] Teutonic heavy knight on massive black warhorse, full mail hauberk and surcoat in steel grey, two-handed flanged mace held high, great helm with horsehair plume, wolf-fur cloak, horse barded in dark cloth`
16. **Teuton Archer** — `[MASTER_STYLE] Teutonic crossbowman, heavy steel crossbow shouldered and aimed, mail vest over leather, dark hood, leather pauldrons, bolt-quiver at hip, focused aim, steel-grey palette`
17. **Teuton Siege** — `[MASTER_STYLE] Teutonic battering ram crew, large iron-tipped wooden ram with wolf-head carving, dark wooden roof structure overhead, warrior in mail pushing ram, oversized siege weapon, steel and dark wood palette`
18. **Teuton Hero — Warlord Drengr** — `[MASTER_STYLE] Teutonic Warlord Drengr, massive horned iron crown-helm, scarred bare chest with mail half-cloak, two-handed Dane axe slung across back, bear-fur cloak, iron arm rings, fierce battle-roar expression, tattooed runes on chest, intimidating heroic stance`

### Huns (amber + black leather)

19. **Hun Spearman** — `[MASTER_STYLE] Hun foot warrior, lamellar leather armor in amber and black, small round wicker shield with horse-tail tassel, short javelin held forward, conical fur-trimmed helm, horse-hide cloak, planted alert stance`
20. **Hun Swordsman** — `[MASTER_STYLE] Hun warrior, curved sabre raised mid-swing, lacquered black lamellar over amber-yellow tunic, fur-lined conical helm with central spike, leather boots with curled toes, fierce nomadic expression, dynamic combat pose`
21. **Hun Cavalry** — `[MASTER_STYLE] Hun horse archer on small steppe pony, mid-gallop, composite recurve bow drawn with arrow nocked, lamellar armor amber-yellow with black trim, fur-trimmed helm with horse-tail tassel, no shield, expressing the iconic Parthian shot stance, horse muscles taut`
22. **Hun Archer** — `[MASTER_STYLE] Hun foot archer scout, composite recurve bow drawn at full pull, quiver across back, leather lamellar amber and black, fur-trimmed conical cap, sharp focused eyes, lean wiry build, no horse`
23. **Hun Siege** — `[MASTER_STYLE] Hun captured siege tower crew, mobile wooden siege tower on wheels with amber banners and black horse-tail tassels, Hun warriors climbing inside, oversized siege weapon dominates frame`
24. **Hun Hero — Khan Bayan** — `[MASTER_STYLE] Khan Bayan, ornate gold-and-amber lamellar armor with black lacquer trim, tall central-spiked crown-helm with horse-hair plume, curved sabre at hip and bow on back, fur-trimmed shoulder mantle, golden arm bracers, commanding mounted-ready stance, sharp eagle-eyed gaze, scar across cheek`

### Egyptians (turquoise + gold)

25. **Egyptian Spearman** — `[MASTER_STYLE] Egyptian medjay spearman, linen kilt with turquoise sash, gold pectoral collar, bronze-tipped spear planted, large hide shield with painted Eye of Horus in turquoise and gold, kohl-lined eyes, leather sandals, planted stance`
26. **Egyptian Swordsman** — `[MASTER_STYLE] Egyptian khopesh warrior, bronze khopesh sickle-sword raised mid-swing, scaled leather corselet with turquoise inlay, gold collar pectoral, striped nemes headdress, linen kilt, kohl eye makeup, defiant pose`
27. **Egyptian Cavalry** — `[MASTER_STYLE] Egyptian chariot driver and archer pair on two-horse light chariot, bronze-rimmed wheels, turquoise and gold trim, driver holding reins archer drawing bow, white linen and gold pectoral, dynamic mid-charge composition (treat as cavalry slot)`
28. **Egyptian Archer** — `[MASTER_STYLE] Egyptian Nubian archer auxiliary, long bow drawn full pull, leopard-skin sash across bare chest, gold armbands, linen kilt with turquoise belt, kohl-lined eyes, focused aim, no shield`
29. **Egyptian Siege** — `[MASTER_STYLE] Egyptian massive siege ram crew, large wooden battering ram with bronze ram-head carved as Apis bull, turquoise banners, soldiers in linen kilts and bronze scale pushing ram, oversized siege weapon dominates frame`
30. **Egyptian Hero — High Priest Sebek** — `[MASTER_STYLE] High Priest Sebek, ornate gold pectoral with turquoise lapis inlays, crocodile-head ceremonial mask pushed up onto forehead revealing kohl-lined face, white linen robes with turquoise sash, gold ankh staff radiating soft sand-colored aura, ceremonial dagger at belt, mystical priestly stance, gold bracers and rings`

### Vikings (deep blue + silver)

31. **Viking Spearman** — `[MASTER_STYLE] Viking spearman, round wooden shield painted deep blue with silver runes, long ash spear planted, mail byrnie over blue wool tunic, iron spectacle-helm, fur cloak, braided beard, planted stance`
32. **Viking Swordsman** — `[MASTER_STYLE] Viking hirdman, single-handed Ulfberht sword raised mid-swing, round wooden shield with silver raven design, mail byrnie, fur shoulder mantle, braided red beard, horned-style iron helm (no actual horns, historical accuracy: just iron cap), determined battle stance`
33. **Viking Cavalry** — `[MASTER_STYLE] Viking mounted huscarl on shaggy Nordic horse, mail byrnie, long Dane axe held overhead, round shield slung at back with raven motif, fur cloak, braided blond beard, deep blue cloth caparison on horse with silver trim`
34. **Viking Archer** — `[MASTER_STYLE] Viking skirmisher, yew longbow drawn full pull, lighter leather armor with fur trim, quiver across back, hooded fur cap, braided beard, focused eyes, no shield, lean hunter build`
35. **Viking Siege** — `[MASTER_STYLE] Viking dragon-prowed siege ladder team, huge wooden assault ladder with carved dragon-head top, Viking warriors in mail climbing, deep blue banners with silver ravens, oversized siege element dominates`
36. **Viking Hero — Jarl Sigrid** — `[MASTER_STYLE] Jarl Sigrid female Viking warleader, mail byrnie over deep blue dress, silver brooches at shoulders, ornate sword at hip and round shield with silver raven banner, long blonde braids with silver beads, fur cloak with raven feathers at collar, commanding fierce expression, heroic stance`

### Spartans (blood red + bronze)

37. **Spartan Spearman** — `[MASTER_STYLE] Spartan hoplite, deep red exomis tunic, bronze muscled cuirass, large round hoplon shield in bronze with red lambda, long dory spear planted, Corinthian helmet with red horsehair transverse crest, bronze greaves, classic hoplite phalanx pose`
38. **Spartan Swordsman** — `[MASTER_STYLE] Spartan warrior with xiphos short sword raised mid-swing, hoplon shield with bronze face and red lambda, bronze muscled cuirass, Corinthian helm raised showing fierce eyes, red tunic, bronze greaves, dynamic combat stance`
39. **Spartan Cavalry** — `[MASTER_STYLE] Spartan mounted hippeis on white horse, bronze muscled cuirass with red cloak flowing, long lance forward, smaller round shield at side with lambda, no helmet visible (held under arm or off), commanding cavalry pose`
40. **Spartan Archer** — `[MASTER_STYLE] Spartan Cretan archer auxiliary, composite bow drawn full pull, lighter linothorax linen armor, simple bronze cap-helm, red tunic, leather quiver, focused aim, leaner build than hoplite, no large shield`
41. **Spartan Siege** — `[MASTER_STYLE] Spartan siege ballista crew, large bronze-fitted wooden ballista with red banner bearing lambda, hoplite operator in bronze cuirass loading bolt, oversized siege weapon dominates, bronze and blood red palette`
42. **Spartan Hero — King Leonis** — `[MASTER_STYLE] King Leonis Spartan king, ornate gold-trimmed bronze muscled cuirass over blood red tunic, full Corinthian helm with tall transverse red horsehair crest, hoplon shield with golden lambda, long dory spear and xiphos at hip, flowing red cape, commanding heroic stance, scarred determined face, bronze greaves`

### Persians (royal purple + gold)

43. **Persian Spearman** — `[MASTER_STYLE] Persian Sparabara shield-bearer, large wicker spara shield purple and gold, long thrusting spear planted, scale armor over purple tunic, soft Phrygian-style cap, kohl-lined eyes, leather boots, planted defensive stance`
44. **Persian Swordsman** — `[MASTER_STYLE] Persian Immortal warrior, akinakes short sword in one hand spear butt in other, ornate scale armor in royal purple and gold, distinctive cloth-wrapped tiara headdress covering nose and mouth, long curled beard visible at chin, gold armbands, alert pose`
45. **Persian Cavalry** — `[MASTER_STYLE] Persian cataphract heavy cavalry, fully armored rider on fully barded warhorse, purple and gold scale covering rider and horse completely, long kontos lance lowered for charge, conical helm with face-veil, intimidating armored mass`
46. **Persian Archer** — `[MASTER_STYLE] Persian foot archer Takabara, composite recurve bow drawn full pull, light scale vest over purple tunic, Phrygian cap, gold armband, leather quiver, focused steady aim, no large shield`
47. **Persian Siege** — `[MASTER_STYLE] Persian siege tower crew, mobile wooden siege tower with purple banners and gold lion emblems, Persian warriors in scale climbing inside, oversized siege machine dominates frame`
48. **Persian Hero — Satrap Darius** — `[MASTER_STYLE] Satrap Darius Persian noble general, ornate gold scale armor with royal purple silk underlayer, gold lion-emblem chest piece, tall golden ceremonial crown with purple cloth wraps, akinakes sword and gold-handled mace, long oiled curled beard, intricate gold rings and bracers, regal commanding stance, fierce ancestral pride`

---

## Environment / board 3D assets

Combat board = **8 columns × 6 rows** (each player owns their bottom 3 rows), with elevated player halves. Front tiles also carry deterministic terrain — Open / Hills / Woods / River edge / Road (see Design §5b). Each tribe gets a themed board background visible behind their half during combat.

### Board tiles (modular)
- `tile_grass.glb` — green grassland (Gauls, Vikings)
- `tile_sand.glb` — desert sand (Egyptians, Persians)
- `tile_stone.glb` — paved stone (Romans, Spartans)
- `tile_dirt.glb` — bare earth (Huns, Teutons)
- `tile_highlight.glb` — glowing edge tile for selection
- Generation prompt: `[MASTER_STYLE] single hexagonal terrain tile, 1m square, top-down 3/4 view, [SURFACE TYPE], slight depth and edge bevel, isolated on neutral grey, no character`

### Tribe board backdrops (8 large set pieces visible behind player half during combat)
1. **Romans** — `[MASTER_STYLE] Roman forum backdrop, marble columns, eagle standards, red banners, classical architecture, painterly stylized 3D environment, no characters`
2. **Gauls** — `[MASTER_STYLE] Gaulish sacred oak grove backdrop, ancient standing stones, mistletoe, druidic carvings, painterly stylized 3D environment, no characters`
3. **Teutons** — `[MASTER_STYLE] Teutonic dark forest hall backdrop, log palisade, wolf banners, smoking torches, painterly stylized 3D environment, no characters`
4. **Huns** — `[MASTER_STYLE] Hun steppe encampment backdrop, round yurts, horse-hair standards, open grassland horizon, painterly stylized 3D environment, no characters`
5. **Egyptians** — `[MASTER_STYLE] Egyptian temple courtyard backdrop, sandstone columns with hieroglyphs, palm trees, obelisks, sphinx statues, painterly stylized 3D environment, no characters`
6. **Vikings** — `[MASTER_STYLE] Viking longhouse fjord backdrop, carved dragon-prow longship, runic stones, snow-touched fjord cliffs, painterly stylized 3D environment, no characters`
7. **Spartans** — `[MASTER_STYLE] Spartan agora backdrop, bronze statues of warriors, marble steps, red banners with lambda, mountainous Peloponnese horizon, painterly stylized 3D environment, no characters`
8. **Persians** — `[MASTER_STYLE] Persepolis royal courtyard backdrop, towering gold-leaf columns, bull-headed capitals, purple banners, lapis-tiled walls, painterly stylized 3D environment, no characters`

---

## 2D UI assets (keep 2D, not 3D)

These are flat UI — generate as 2D illustrations:

### Resource icons (4, ~256×256 PNG transparent)
1. **Lumber** — `painterly fantasy game icon, bundle of fresh-cut logs tied with rope, warm wood tones, centered on transparent background, soft inner shadow, no text`
2. **Clay** — `painterly fantasy game icon, terracotta clay pot half-formed on wheel, orange-brown tones, centered transparent background, no text`
3. **Iron** — `painterly fantasy game icon, raw iron ingot with hammer marks, cold metallic grey, centered transparent background, no text`
4. **Crop** — `painterly fantasy game icon, bundle of golden wheat sheaves tied with twine, warm gold tones, centered transparent background, no text`

### Stat icons (5 — match v2's stat block: Attack CS, Defense CS, HP, Move, Range)
- **HP / Village Hearts** — `painterly fantasy game icon, stylized red heart with stone keep silhouette inside, transparent background`
- **Attack CS / Sword** — `painterly fantasy game icon, crossed swords ornate hilts, transparent background`
- **Defense CS / Shield** — `painterly fantasy game icon, kite shield with iron rim, transparent background`
- **Movement / Boot** — `painterly fantasy game icon, weathered leather boot mid-stride, transparent background`
- **Range / Bow** — `painterly fantasy game icon, drawn bow with concentric range arc, transparent background`

### Archetype role icons (6, for unit cards)
- **Spearman** — crossed spears + shield, painterly icon, transparent
- **Swordsman** — sword crossed over round shield, painterly icon, transparent
- **Cavalry** — horse silhouette with lance, painterly icon, transparent
- **Archer** — drawn bow with arrow, painterly icon, transparent
- **Siege** — ballista silhouette, painterly icon, transparent
- **Hero** — crown over crossed sword and staff, painterly icon, transparent

### Tribe banners (8, ~512×768 PNG, hung-banner shape)
- Each = a hanging cloth banner in tribe's primary+accent colors with tribe's signature emblem (Roman eagle, Gaul triskele, Teuton wolf head, Hun horse-tail, Egyptian Eye of Horus, Viking raven, Spartan lambda, Persian lion)
- Prompt template: `painterly fantasy hanging cloth banner, [PRIMARY COLOR] field with [ACCENT COLOR] [EMBLEM], tattered cloth edges, hung from horizontal wooden pole with tassels, isolated on transparent background, no text`

### UI frames (~6 frame assets)
- Shop slot frame (purchase card frame, ornate)
- Unit card frame (in-game card frame, scroll-edge)
- Hero card frame (premium, gold-trim, ornate)
- Resource panel frame (top HUD bar)
- Health bar frame (per-unit, slim)
- Modal dialog frame (settings, pause)

Prompt template: `painterly fantasy UI frame, ornate carved-wood and gold-filigree border, [SIZE] ratio, hollow center transparent, isolated on transparent background, no text`

### VFX cards (2D billboarded sprites or particle textures)
- `vfx_hit.png` — impact flash, painterly burst of sparks
- `vfx_blood.png` — stylized red splash droplets
- `vfx_dust.png` — soft brown dust cloud puff
- `vfx_arrow_trail.png` — soft white streak
- `vfx_magic.png` — soft glowing rune circle (for hero abilities)
- `vfx_death.png` — soft grey smoke wisps

Prompt template: `painterly fantasy game VFX sprite, [EFFECT], dynamic frozen moment, isolated on pure black background, alpha-friendly bright colors, no text`

---

## Animation list (per humanoid character — 40 humanoids: 32 humanoid troops + 8 heroes)

Use Mixamo library, retarget to character rig:

| Anim | Mixamo source | Frames | Notes |
|---|---|---|---|
| Idle | "Sword And Shield Idle" or similar | ~60 | Loops |
| Walk | "Walking" | ~30 | Loops |
| Attack | Archetype-specific (Bow Aim/Spear Thrust/Sword Slash/Cavalry Charge) | ~24 | One-shot |
| Hit React | "Hit Reaction" | ~20 | One-shot |
| Death | "Dying" or "Death From Front" | ~40 | One-shot |

Siege units = non-humanoid, hand-rig 4-bone (frame, arm, base, projectile-mount) and animate in Blender: Idle (slight sway), Fire (arm swings), Reload (arm resets), Destroyed (collapse).

---

## Asset count summary

| Type | Count | Est. solo time |
|---|---|---|
| Character 3D (humanoid) | 32 humanoid troops + 8 heroes = 40 | 2–4 hr each → 80–160 hr |
| Animations (humanoid) | 40 × 5 = 200 clips | mostly retarget → 25–45 hr |
| Siege machines (hand-rigged) | 8 (1 per tribe) | 3–5 hr each → 25–40 hr |
| Board tiles | 5 | 1 hr each → 5 hr |
| Tribe backdrops | 8 | 4–6 hr each → 30–50 hr |
| 2D icons (resource 4, stat 5, archetype 6) | 15 | 30 min each → 8 hr |
| 2D banners | 8 | 1 hr each → 8 hr |
| 2D UI frames | 6 | 2 hr each → 12 hr |
| 2D VFX cards | 6 | 1 hr each → 6 hr |
| **Total estimate** | **~300 assets** | **~200–340 hours** |

At 20 hr/week part-time: **~2.5–4 months of solo art work.** Don't underestimate this. If you want to ship in 2026, consider:
- Cut 8th tribe → −6 chars (5 troops + 1 hero)
- Cut Siege archetype → −8 siege machines (the 8 siege chars)
- Share generic mounts/horses across cavalry → reuse rigs
