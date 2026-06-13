# LIMES v3 — The Living Frontier (Final Core Concept)

> **The border is the battle.** A tug-of-war chessboard where every tile you hold is farmland, fortress, and victory track at once. Deterministic 1v1 duel, 15–20 minutes, Godot 4.3 + C++, offline-first.
>
> Synthesis basis: panel winner **The Living Frontier** (90/108 total, highest of six), with every judge-endorsed graft from the losing concepts (PALUS carry rules, FUROR sim contract + Tribute interventions, SIGNA countability discipline + telegraph beat, VEXILLUM shared supply + komi discipline + free setup, MUSTER LINE aging prices + scrap-for-half) and concrete fixes for every criticism the three judges raised against the winner.

---

## 1. Identity & Signature Invention

### THE LIMES — a per-column frontier that is the win track, the economy map, and the catch-up engine at once

**Components.** One board, **8 columns × 8 rows**. Rows 1–2 are your Heartland (3 **Supply Wagons**, HP 3 each, on row 1); rows 7–8 are the enemy's. Eight **Stake tokens** — one per column — start on the centerline between rows 4|5. Painted stakes, physically dragged: anyone can read who is winning from three meters away.

**Territory.** Every tile on your side of that column's Stake is yours. During Build you place **Field tokens** (Supply or Crop — two resources only, see §5) on empty owned tiles; each Field yields 2/round; 3 same-type orthogonally adjacent Fields yield +2 (**farmstead**). You only harvest Fields currently behind your Limes.

**Stake movement (end of each clash, per column) — the carry rule, hardened.**
The judges' #1 criticism of the winner was depth-runner cheese ("a 3 HP archer outranks a phalanx for territory; Mv3 cavalry runs empty flanks"). Fixed with three stacked conditions, all grafted from PALUS and all checkable at a glance:

1. **CARRY:** your Stake in a column advances 1 row toward the enemy only if you have an **unbroken** unit (healthy, not Exhausted, not Shaken) strictly beyond the current Stake line in that column **AND** the enemy has **no** unbroken unit beyond it in that column. Equal/contested = the Stake holds.
2. **LONE RUNNER RULE:** a unit with no friendly unit within 2 tiles **cannot carry** a Stake. Spearheads need a body of troops behind them; a solo cavalry sprint claims nothing.
3. **ZONE OF CONTROL:** moving adjacent to an enemy unit ends movement. One cheap blocker can physically arrest a runner — and is itself a contesting unit under rule 1.

Stakes move max 1 row/round and stop at the Heartland edge (rows 2|3 and 6|7).

**TRAMPLE.** When your Stake advances over an enemy Field, choose **RAID** (gain 3 of that resource once, Field destroyed — Travian raiding made physical) or **ANNEX** (Field becomes yours at yield 1; if the Stake is later pushed back across it, it reverts to its owner at full yield).

**SUPPLY STRAIN — the structural rubber band.** At Upkeep, every unit standing beyond your own Stake line costs **+1 Crop** and cannot receive the Support guard bonus. Pushing the border thins you; the player pushed back fights compact, supported, and cheap. Overextension is taxed by geometry, not by a designer's handout.

**BREACH.** A unit standing on an enemy Heartland tile at clash end deals 1 damage to a Wagon in its column during the Frontier step — hard cap **2 Wagon damage per round** total (overkill cap). Destroy all 3 enemy Wagons to win. **Wagon bounty (graft):** each Wagon you destroy pays you a one-time **3 Supply** plunder.

**Why it is ours.** No shipped game makes the front line itself walk, eat farms, and pay the loser — and it is literally the game's name (the Roman *Limes*). The invention is simultaneously the win condition, the snowball brake, the upkeep throttle's teeth, and the drama curve.

---

## 2. The Round, Step by Step

One round ≈ **70–90 seconds**, 12–15 rounds per match. Both seats act **simultaneously** behind small table screens (hot-seat: pass-the-screen; digital: hard timers with a casual preset — VEXILLUM's pacing discipline, not its chess clock).

**SETUP (once, ~60s).** The **Match Seed** is dealt face-up: terrain layout of the middle ranks (Open/Hills/Woods/River/Road, mirrored), which **5 of 9 Tactica** are in play, which **3 of 5 T2 transforms** are unlockable, and the artifact pool. Then **free-form opening setup** (VEXILLUM/Arimaa graft): both players place their starting force (Hero + signature-archetype unit + 2 Swordsmen) **anywhere on their back two rows**, behind the screen, revealed simultaneously — no fixed start, no opening book.

**PHASE 1 — MUSTER (60s, simultaneous).**
- (a) **Harvest** every Field behind your Limes.
- (b) **Upkeep:** 1 Crop per unit, +1 per unit beyond your Stakes. Unfed units flip **Exhausted** (−1 Atk, −1 Guard, cannot carry a Stake) until fed.
- (c) **Build:** place up to 2 tokens — Fields on owned tiles, or a structure (Palisade on a Stake; a Doctrine from the open display, see §7).
- (d) **Reinforce:** recruit freely from the **shared finite muster supply** (VEXILLUM graft: 6 copies of each archetype per match shared between players, price +1 Supply per copy already bought; archetype unlocks gate the roster, see §7). Place at most **2 NEW units face-down** on class-marked bases on your Heartland rows, and reposition at most **2** existing units within your territory. Everything else stays where the fighting left it — the army has inertia; the war is continuous. Wounded units in reserve stand back up (or paid 1 Crop last round to return early).

**PHASE 2 — REVEAL.** Screens lift; both players' face-down recruits flip at once. One beat of "so *that's* where the cavalry went."

**PHASE 3 — CLASH (two Pulses).** Each Pulse:
- (a) Both players secretly commit **1 of their 2 held Tactica** (from the shared 5-card seeded rack), flip simultaneously.
- (b) **Telegraph beat** (SIGNA/ItB graft): every unit's resolved action shows as arrows/target tiles for 2 seconds. The digital client gold-highlights the first beat where execution diverges from your planning-phase rehearsal (Frozen Synapse) — you watch *for* the moment your read broke.
- (c) The deterministic resolver runs four sub-phases — **Brace → Ranged → Move/Charge → Melee** — with damage simultaneous *within* each sub-phase (units killed in a phase still deal their damage; no first-actor coin flip, ever).
- (d) **Pulse boundary — Tribute interventions** (FUROR graft, see §6): either player may spend banked Tribute chips on **Surge** (1 chip: move one of your units 1 tile before the next phase) or **Shieldbearer** (2 chips: redirect one incoming lethal hit onto an adjacent friendly Spearman/Swordsman). Declared aloud, fully visible.
- Pause beat between Pulses shows per-column control.

**PHASE 4 — FRONTIER.** Per column: Stakes step (carry rules §1); trampled Fields are Raided or Annexed; Breaching units burn Wagon HP (cap 2); Wagon bounties pay out. A surrounded Standard routs instantly (§8).

**PHASE 5 — PASS & TRIBUTE.** The Tactica each player used **slide across the table to the opponent** (Onitama pass — your doctrine becomes theirs). Each player gains **1 Tribute chip per Stake-row lost this round** (see §6). At fixed rounds **4 and 8**, a Natar caravan lays out 4 artifacts face-up; the player with fewer Wagons (then less territory) picks first, alternating, 1 discarded. From **round 12, land exhaustion**: every Crop Field yields −1 cumulative per round — turtling becomes starvation; somebody must push.

**Standing orders** (FUROR graft): under clock pressure, an untouched commit auto-repeats last round's legal choices (or HOLD-equivalents). Protects casuals from paralysis and gives the AI a graceful fallback. The campaign teaches one commitment layer per mission.

---

## 3. Information Model

**Near-total open information, chess-style**, with exactly **two** sanctioned hidden beats — both physical, face-down, simultaneously revealed (the tabletop-native form the owner sanctioned; no fog-of-war anywhere):

1. **The ≤2 new units** recruited each round sit face-down on your Heartland until the Reveal — on **class-marked bases** (the opponent sees "a cavalry-class base appeared in column 3"; Slay-the-Spire intent: category, never detail).
2. **Each Pulse's Tactica commit** is face-down until the flip — and because the 5-card rack is public and used cards pass to the opponent, both players always know **exactly which 2 cards** the other holds. The only uncertainty is which one fires this Pulse.

Everything else — the persistent board, all Fields, Stakes, Doctrines bought, promotions, resources (spent-pile chips), Tribute banks, the muster supply counts — is permanently open. A human at the table can verify every rule by eye.

**Countability rule for tribe verbs** (SIGNA AUGURY graft, adopted as design law): any tribe power touching hidden information must reveal **category, never full detail** (e.g., the Persian peek shows a base's archetype class only). Keeps the yomi human-sized and the hot-seat version physically playable.

**Why full visibility doesn't create the counter-adjust standoff** (audit spec-gap #2): your counter is always one Reveal late (2-deploy inertia), your formation is a multi-round commitment, and the doctrine you used rotates away. **Why the thin hidden layer is not blind RPS:** hidden state is 2 class-marked standees and 1-of-2 publicly known cards — countable, readable, pure yomi. **Contingency** (judge 1's flatness worry, sim-gated): if the 2×2 Tactica commit matrix sims too flat, expand held cards to 3 and/or add SIGNA's spent-posture rule (a card you just played returns face-up and cannot be the next commit) as an advanced module — zero new components either way.

---

## 4. Combat Changes

Total rescale to chess-countable integers. The exponential formula `10×2^((A−D)/12)` is dead, class initiative is dead, the 15-turn cap is dead.

**Damage** = Atk + bonuses − Guard, **min 0**; a flanked unit (2+ adjacent enemies) always takes min 1. Computable in your head, like counting attackers on a square.

**Stats (identical across all 8 tribes — the evergreen rule kept):**

| Archetype | Atk | HP | Mv | Rng | Special |
|---|---|---|---|---|---|
| Spearman | 1 | 4 | 1 | 1 | Brace stance (Duke flip-tile): +1 Guard, Mv 0, pushes any melee attacker back 1; +1 vs Cavalry |
| Swordsman | 2 | 5 | 1 | 1 | all-rounder |
| Cavalry | 2 | 4 | 3 | 1 | Charge after moving 2+: +1 dmg, push-through; +1 vs Archer |
| Archer | 2 | 3 | 1 | 2 | +1 vs Spearman; no retaliation when shooting; retaliates 1 when meleed |
| Siege | 3 | 3 | 1 | 2–3 (min 2) | shot pushes target 1; can hit Wagons/Palisades |
| Hero | 3 | 7 | 2 | 1 | the Standard; v2 deterministic-trigger active, rebudgeted to ±1 scale |

**Modifiers:** every positional modifier is exactly **±1** (flank, hill, brace, support, charge, river-crossing −1); counter-class is **+1**; Guard cap **+2**, attack-bonus cap **+2**. Audit #10's 32× blowout and #8's effDef-64 wall cannot be built.

**Resolution:** Atlas-Reactor fixed phase order — **Brace → Ranged → Move/Charge → Melee** — with damage simultaneous within each phase. Audit #7's hidden first-actor coin flip is gone at the root; alpha-strikes always eat return fire (#9); the counter triangle finally works (#6): a braced Spear bounces the charge back before Melee and out-trades Cavalry on flat math.

**Displacement is the spectacle verb** (Arimaa/ItB): pushes into occupied tiles deal 1 to both; pushed off Hills loses the bonus; pushed across River edges or into Gaul traps takes 2. The board visibly churns every beat.

**No turn cap:** clashes are a fixed **2 Pulses** (~40 seconds); no most-HP timeout judgment exists inside a clash.

**Defender agency:** the free Intercept is replaced by the **priced, Tribute-funded Shieldbearer** (§6) — loser-funded, leader-visible, never charity.

**Promotions:** v2 trees kept, rescaled to ±1, earned at 2/4 XP (full tree shown, no random offers), persisting through wounds — veterans carry the match's story.

**Tie-break komi, made explicit** (VEXILLUM graft): every asymmetry is priced openly. All in-clash ties favor the player who lost the most recent Stake-row; contested-Stake ties hold; no leftmost-frontmost convention exists anywhere.

---

## 5. Economy Changes — What We Cherry-Pick from Travian

**KEPT (earning its place):**
- **Crop-upkeep-as-master-throttle** — the owner's liked mechanic — sharpened by Supply Strain (+1 Crop per unit beyond the Limes). Starvation is legible and stated once: unfed unit flips **Exhausted**, −1 Atk and −1 Guard and cannot carry — no formula contradiction (#3), no starved-archer exploit (#15, it hits attack too), no carry-cheese by starving runners.
- **Raiding** — physical: Stakes trampling Fields (Raid/Annex), plus Wagon bounties.
- **The four-limiter skeleton**: afford (Supply) / feed (Crop) / fit (owned tiles + 2-deploy inertia) / hold (the wounded-recovery rhythm).
- **Field development** — as token placement with farmstead adjacency (positional economy depth for free).

**CHANGED — the one design error the judges flagged in the winner, fixed:** the 4-resource matrix is **collapsed to two: SUPPLY + CROP**. The audit proved Lumber/Clay/Iron bought bookkeeping, not decisions (#14, #16). Field tokens are Supply-type or Crop-type only; all costs and unlocks are denominated in Supply; tribe resource-affinity flavor moves into verbs and unlock pricing.

**CUT, with reasons:** the separate 3×3 Village board (the battlefield IS the village — Fields live where they can be defended, farmed, and burned); Market (existed to fix the 4-resource problem); Granary (audit-proven trap — wounded-not-dead replaces its only use); Town Hall (deploy inertia replaces slots); global Smithy (#13 mandatory — replaced by the one-copy public Doctrine display, §7); private 1-of-3 artifact drops (replaced by the trailing-picks-first caravan at r4/r8); all winner-pays tribe passives (#12, #14 — replaced by Root-style verbs); field upgrade levels (#16 — you just place Fields).

---

## 6. Catch-Up & Drama Curve

All structural, zero charity dice:

1. **The Elastic Frontier** — the invention is itself the rubber band: being pushed back compresses you into supported, Palisaded, cheap-to-feed positions beside your Wagons, while the leader's spearhead pays +1 Crop per unit and loses Support. Geometry taxes the leader; no burden stack (FUROR's five-layer mistake explicitly **not** grafted — this is the sole structural rubber band, plus the levers below).
2. **TRIBUTE CHIPS** (resolves the LF/FUROR contradiction): you gain **1 Tribute chip per Stake-row lost per round**. Each chip is dual-use — spend in Muster as 1 Supply, **or** at Pulse boundaries on **Surge** (1: move a unit 1 tile before the next phase) or **Shieldbearer** (2: redirect a lethal hit onto adjacent infantry). FUROR's best drama beat — the leader watching the trailing player's banked counterattack — without the dial, the bookkeeping, or the sandbag equilibrium: Tribute only accrues from *actually lost ground*, and losing at a held line pays nothing.
3. **Wounded, not dead** — units killed in a clash lie in reserve and return next round (1 Crop to rush). The audit's ~40% rebuy-tax death spiral (#11) is deleted; only Wagons are permanent.
4. **Caravan drafts** at r4/r8 — fewer Wagons picks first (TFT carousel).
5. **LAST STAND** — when your first Wagon falls, immediately pick 1 of 3 face-up boons (all wounded return free + 1 extra deploy / free T2 transform / a 3rd held Tactica for the match). A guaranteed, opponent-visible second act.
6. **Overkill caps** — Breach damage ≤2 Wagon HP/round; a crushing win cannot double-pay; a breached match stays mathematically alive ~5 rounds.

**Drama curve:** the table tells the story — stakes creep, farms burn or change flags, a bulge in columns f–g is a visible siege, a Stake one row from the Wagons is a visible match point. Per round: Reveal beat → Pulse-1 flip → ~15s of churning displacement resolution → column scoreboard pause → Pulse-2 flip → the Frontier step where stakes audibly advance. Scheduled spikes: caravans r4/r8, land exhaustion from r12, Last Stand on the first Wagon kill, and the Hive-style Standard Rout net visibly tightening. Dead spectacle (audit #20) is structurally impossible: clashes are 40 seconds of countable hits with player interventions inside them.

---

## 7. Anti-Netdeck

Six interlocking locks, no resolution RNG:

1. **Onitama-rotation Tactica:** any doctrine you play passes to your opponent at clash end — the "solved line" changes hands mid-match; the seed deals which 5 of 9 are in play at all.
2. **Prismata-seeded setup**, face-up before round 1: terrain, the 5 Tactica, which 3 of 5 T2 transforms are unlockable, the artifact pool. A build guide can't survive Tuesday's seed; **daily-seed mode falls out for free**.
3. **Mechabellum inertia:** max 2 new units + 2 repositions per round on a persistent board — comps are grown under the opponent's eyes, never teleported in; counters arrive one Reveal late, forever. Plus Arimaa free setup: no opening book.
4. **Shared finite muster supply + unlock ladder:** 6 copies per archetype per match, +1 Supply per copy bought (the solved comp taxes itself); each tribe starts with Swordsman + its signature class, 3rd class 6 Supply, 4th 10, 5th 15 — dominant comps are expensive and telegraphed piece by piece.
5. **One-copy Doctrine display with aging prices** (MUSTER LINE graft): ~8 face-up, type-scoped Doctrine tokens, exactly one copy each, every one listing its counter-Doctrine. **Untaken Doctrines gain a −1 Supply discount chip per round (min 1)**, and any Doctrine may be **scrapped for half cost** as priced denial. The market nerfs the community's "always buy X first" line every round by rule — the patch-light promise as a mechanic.
6. **Root-style tribe verbs** (one rule-bending verb each, never stats — e.g., Huns reposition 2 *after* the Reveal; Gauls pre-place 2 traps; Egyptians place a 3rd Field; Spartans' braced units can't be pushed; Persians peek 1 base's *class*): 64 asymmetric matchups instead of one mirror, all obeying the §3 countability rule.

The build-placement layer (where Fields, Palisades, and Doctrines go on a seeded map) multiplies the search space far past the audit's 6,062 enumerable comps; the Tactica commit sits on top as a true yomi layer.

---

## 8. Win Condition

**Primary — SACK THE WAGONS:** destroy all 3 enemy Supply Wagons (HP 3, back row) via Breach (cap 2/round) or Siege range. Each kill pays the 3-Supply bounty.

**Sudden — STANDARD ROUT (the mate):** if the enemy Hero (or designated Standard-Bearer in heroless armies) ends any sub-phase with every adjacent tile occupied by your units or impassable, their forward army routs: the clash ends instantly and 2 Wagon damage lands. Hive's surround-mate as LIMES's checkmate — visible forming two rounds out.

**The forcing clock (judge 2's "timeout-judgment chain" criticism, fixed):** the game is engineered so judgment endings are vanishingly rare rather than "rare by hope": land exhaustion from r12 starves turtles; from **round 13 the Breach cap rises to 3** and exhaustion accelerates (−2/round). If round 15 still ends with Wagons on both sides: **golden-goal rounds** — the first Stake-row movement (or Wagon damage) wins outright; with exhausted farms and Supply Strain, somebody breaks within a round or two by construction. The residual ladder (most Wagons → deepest total Stakes → most recent Stake-row loser) exists only as the formal floor and is priced openly as komi — no coin flips, ever.

Typical match: 12–14 rounds, 15–19 minutes. Offline vs AI and hot-seat use identical rules; the AI is the cheapest of any concept considered (small action space; the 2×2 Tactica matrix is near-minimaxable with the deterministic resolver).

---

## 9. What We Keep & Kill from v2

**KEEP:**
- The full **48-character roster** (8 tribes × 5 archetypes + hero) and all art-silhouette roles — only the stat sheet shrinks; Duke flip-tiles reuse existing card art on both stance sides; Part 2 board/backdrop assets survive (the 3×3 village card frames do not).
- **Deterministic resolution** and the lockstep exchange-inputs netcode model (per round: 2 deploys, 2 repositions, build tokens, 2 Tactica commits, Tribute spends — tiny).
- **Crop upkeep as the master army throttle** (sharpened, spatialized).
- The **counter triangle** Spear>Cav>Archer>Spear (rescaled to +1 + brace-push so it actually works).
- **Terrain set** (Open/Hills/Woods/River/Road) as flat ±1 deterministic modifiers.
- **Hero kits** with deterministic triggers and designed built-in counters (rebudgeted to ±1).
- **Tribe identity OUT of base unit stats** (audit-endorsed patch-light rule), upgraded to Root-style verbs.
- **Promotion trees** at 2/4 XP, full tree shown, persisting through wounds.
- **Damage-scales-to-margin shape** (as Tribute and Stake-depth rules); the **deploy-inertia discipline** standing in for the audit-liked slot curve.
- **Offline-first evergreen**: campaigns, hot-seat, endless, daily seed — no accounts, no servers, no microtransactions.

**KILL:**
- The separate 3×3 Village economy board (the battlefield is the village).
- The 4-resource matrix → **Supply + Crop** (the judges' unanimous correction to the winning concept).
- The exponential damage formula and the 4–40 damage mush (#10, #20).
- Class-based initiative and leftmost-then-frontmost (#7's hidden coin flip) → phase-simultaneous resolution.
- The 15-turn cap and most-HP-wins stall rewards (#5, #8) → fixed 2-Pulse clashes + the exhaustion/golden-goal clock.
- Global Smithy (#13) → one-copy, aging-priced, counter-listed Doctrine display.
- Permanent unit death and the rebuy tax (#11) → wounded-not-dead.
- Egyptian +7/rd, Teuton unbounded scaler, all winner-pays passives (#12, #14) → power-budgeted verbs.
- Starvation as a −6 CS contradiction and the starving-archer exploit (#3, #15) → the Exhausted flip.
- Private 1-of-3 Natar drops and PvP creep rounds → r4/r8 open caravan drafts (Natars remain the offline campaign foe).
- Free full-board redeployment every round → persistent army + 2+2 inertia.
- The 13-trait synergy/banner tables → formation geometry (farmsteads, brace lines, flanks) and tribe verbs.

---

## 10. Open Numbers to Simulate

**The sim acceptance contract** (FUROR graft, adopted verbatim as the tuning gate — run on the C++ resolver with policy bots BEFORE any UI exists):

1. **Round-1 clash winner takes the match 55–65%** — not v2's 100%, not under 50%.
2. **Lead changes after round 7 in 25–35%** of games.
3. **Aggressive-vs-turtle policy winrates within 45–55%** across the seeded terrain set (turtle-vs-turtle, turtle-vs-prober, all-in-vs-turtle, sandbagger-vs-honest battery).
4. **Median game ends by Wagons/Rout in rounds 11–14**, never by the residual tie ladder (target: <2% of games reach it).
5. **Sandbagging is EV-negative:** deliberately conceding Stake-rows for Tribute chips must lose to honest play (tune chip yield vs. ground value).

**Specific knobs with starting values to sweep:**
- Supply Strain cost (+1 Crop/forward unit) vs. Tribute rate (1 chip/row) vs. exhaustion start (r12) and acceleration (r13) — the turtle-EV inequality.
- **Lone Runner radius (2 tiles)** and ZoC — verify runner-spam stake-carry rate ≈ 0 while legitimate spearheads still carry 1–2 columns/round against passive defense.
- Tactica commit matrix flatness — no card above ~60% pick rate in any common position; if flat, trigger the 3-held-cards / spent-posture contingency (§3).
- Surge (1 chip) / Shieldbearer (2 chips) pricing — interventions should fire ~1–2×/clash for a trailing player, ~0 for a leader.
- Wagon bounty (3 Supply), Breach caps (2→3 at r13), Last Stand boon strengths.
- Muster supply (6 copies, +1/copy) and unlock ladder (6/10/15) vs. the 60s Muster timer.
- Field yields (2, farmstead +2, annex 1) and starting force composition under free setup.
- Timer presets: 60s Muster / 15s commit default; casual preset 90/30.

**Build order:** C++ resolver + carry/Stake logic → policy-bot battery vs. the acceptance contract → Tactica matrix solver → only then UI. The action space per round is small enough that the offline AI — the evergreen pillar's load-bearing component — is the easiest of any concept evaluated.
