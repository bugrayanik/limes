// Always-available rules reference. Opens as a body-level overlay so it works
// over the setup screen or mid-game. Content reflects the shipping V3 config.

const GUIDE_HTML = `
<h2>How to play LIMES</h2>
<p class="g-lede">A deterministic, dice-free frontier wargame for 2. No luck — every
outcome follows from the rules. Hold your line, push the enemy's back, and smash
their supply.</p>

<h3>① Your goal — how you win</h3>
<ul>
  <li><b>Wagons (knockout):</b> destroy all <b>3 enemy Supply Wagons</b> (the ▣ on their back row). Instant win.</li>
  <li><b>Golden goal (from round 14):</b> in a late round, the only side to take ground / hit a wagon wins immediately.</li>
  <li><b>Ladder (round 18 time limit):</b> if no knockout, the leader wins — compared by wagons alive → wagon HP → rows of land owned.</li>
</ul>

<h3>② The board</h3>
<p>An 8×8 grid. <b>You (P1)</b> sit at the bottom, the enemy (P2) at the top — or swap seats at setup.
Each column has a <b>stake line</b> (the gold frontier): tiles below it are your land, above it the enemy's.
Push a column's stake forward to <b>take a row</b>; lose one and the enemy gains it.
Your 3 <b>Wagons</b> sit on your back row — guard them.</p>

<h3>③ A round has 5 phases</h3>
<ol>
  <li><b>Muster</b> — spend resources: <i>recruit</i> units (placed in your back rows), <i>unlock</i> new
    types, <i>build</i> Supply/Crop fields & Palisades, <i>reposition</i>, or convert <i>Tribute→Supply</i>.</li>
  <li><b>Reveal</b> — recruits flip face-up (automatic).</li>
  <li><b>Clash</b> — combat, over <b>2 pulses</b>. Each of your units may Move, Attack (melee),
    Shoot (Archer/Siege), Charge (Cavalry), Brace (Spearman), or Hold.</li>
  <li><b>Frontier</b> — stakes step where one side carries a column uncontested; trampled fields are
    raided or annexed; units in the enemy's back rows <b>breach</b> wagons (automatic).</li>
  <li><b>Pass & Tribute</b> — you gain Tribute for rows you lost; caravans bring artifacts on rounds 4 & 8 (automatic).</li>
</ol>

<h3>④ The units</h3>
<table class="g-table">
  <tr><th>Unit</th><th>Atk</th><th>HP</th><th>Move</th><th>Range</th><th>Note</th></tr>
  <tr><td>Spearman</td><td>1</td><td>4</td><td>1</td><td>1</td><td>Beats Cavalry; <b>Brace</b> to stop charges</td></tr>
  <tr><td>Swordsman</td><td>2</td><td>6</td><td>1</td><td>1</td><td>Sturdy frontline</td></tr>
  <tr><td>Cavalry</td><td>2</td><td>4</td><td>3</td><td>1</td><td>Fast; <b>Charge</b> for bonus dmg; beats Archers</td></tr>
  <tr><td>Archer</td><td>2</td><td>3</td><td>1</td><td>2</td><td>Shoots at range; beats Spearmen</td></tr>
  <tr><td>Siege</td><td>3</td><td>3</td><td>1</td><td>2–3</td><td>Hits Wagons & Palisades from afar</td></tr>
  <tr><td>Hero</td><td>3</td><td>7</td><td>2</td><td>1</td><td>Your standard — if surrounded, you <b>rout</b></td></tr>
</table>
<p><b>Triangle:</b> Spear → beats → Cavalry → beats → Archer → beats → Spear. Attack into the matchup you win.</p>

<h3>⑤ Combat edges</h3>
<ul>
  <li><b>Counter +1</b> attacking the type you beat. <b>Flank +1</b> with 2+ attackers around a target.</li>
  <li><b>Support +1 guard</b> for a unit on home soil next to a friend. <b>Brace +1 guard</b> (Spearman) and it halts a charge.</li>
  <li><b>Charge</b> (Cavalry, 2+ tiles run) adds punch and shoves the target back — but a Braced Spearman wrecks the charger.</li>
  <li><b>Beyond your line</b> a unit pays extra Crop (supply strain) and gets no Support — overextend carefully.</li>
  <li><b>Exhausted</b> (unfed) units fight worse. Keep Crop income above your army size.</li>
</ul>

<h3>⑥ Tribute & interventions</h3>
<p>Lose rows → gain <b>Tribute (◆)</b>. Spend it during Clash on <b>Surge</b> (shove a unit 1 tile) or
<b>Shieldbearer</b> (ward your Hero from a killing blow), or convert it to Supply in Muster.</p>

<h3>⑦ Controls</h3>
<ul>
  <li><b>Muster:</b> click an action button, then click a glowing board tile to place it. <b>Undo</b> reverts; <b>End Muster</b> confirms.</li>
  <li><b>Clash:</b> click your unit → <span class="g-c g-move">green</span> = move,
    <span class="g-c g-melee">red</span> = attack, <span class="g-c g-shoot">orange</span> = shoot,
    <span class="g-c g-charge">purple</span> = charge. Click a target/tile to order it; <b>Resolve pulse</b> when ready.</li>
</ul>

<h3>⑧ Reading the board</h3>
<ul>
  <li><b>Gold line</b> across a column = that column's stake (the frontier). Below it is yours, above it the enemy's. A <b>double</b> gold line means a Palisade sits there.</li>
  <li><b>Green bar</b> under a unit = its current HP. The label shows e.g. <i>SWORDSMAN 4/6</i> (4 of 6 HP left).</li>
  <li><b>★ / ★★</b> = promoted (tougher / upgraded). Units earn this by wounding enemies.</li>
  <li><b>∅</b> exhausted (under-fed, weaker) · <b>⛨</b> braced (Spearman, anti-charge) · <b>?</b> face-down (a fresh recruit, flips up at Reveal).</li>
  <li><b>⚖</b> next to a player = the <b>komi holder</b> — they act first and win exact ties.</li>
  <li>Top HUD per side: 🛡 Supply · 🌾 Crop · ◆ Tribute · ▦ rows of land owned · ▣ wagons alive.</li>
</ul>

<h3>⑨ Combat — a worked example</h3>
<p>Damage = <b>attacker Atk − defender Guard</b> (minimum 0, or 1 if the defender is flanked).</p>
<p>Your <b>Cavalry</b> (Atk 2) charges an enemy <b>Archer</b> (HP 3) in the open:</p>
<ul>
  <li>Base Atk 2, <b>+1 counter</b> (Cav beats Archer), <b>+1 charge</b> → Atk 4.</li>
  <li>Archer Guard 0 (no Brace, no friendly support) → <b>4 damage</b>. The Archer (3 HP) dies, and the charge shoves anything behind it.</li>
</ul>
<p>But charge a <b>Braced Spearman</b> instead and it's reversed: no damage to the Spearman, and its anti-cavalry counter wrecks your Cavalry. <b>Match-ups matter more than raw stats.</b></p>

<h3>⑩ Strategy tips</h3>
<ul>
  <li><b>Feed your army.</b> Each unit eats 1 Crop/round (2 if past your line). Build Crop fields or stay lean — exhausted troops lose fights.</li>
  <li><b>Concentrate.</b> Pushing one column with a small wall beats spreading thin everywhere. Take rows where you outnumber.</li>
  <li><b>Respect the triangle.</b> Don't send Cavalry into Spears, or Archers into Cavalry. Lead with the type that counters what's in front.</li>
  <li><b>Support & brace on defense.</b> Keep defenders adjacent (for +Guard) and brace Spearmen when Cavalry threatens.</li>
  <li><b>Guard your Hero.</b> If it's ever fully surrounded by enemies you <b>rout</b> — instant wagon damage. Keep a friend beside it.</li>
  <li><b>Banking Tribute</b> (from lost rows) is real value — convert it to Supply for a big Muster, or hold it for clutch interventions.</li>
  <li><b>The clock.</b> From round 14 a single uncontested push can end it (golden goal); at round 18 the leader wins. Don't stall if you're behind.</li>
</ul>

<h3>⑪ Artifacts — the Caravan (rounds 4 &amp; 8)</h3>
<p>Twice a match a <b>Caravan</b> arrives and each side <b>drafts one Artifact</b> — a free, one-time boost. The side that's <b>behind picks first</b>, so losing ground has a silver lining. The 8 in the pool:</p>
<table class="g-table">
  <tr><th>Artifact</th><th>Effect</th><th>Take it when…</th></tr>
  <tr><td>🛡 Supply Cache</td><td>+4 Supply now</td><td>You want a big build/recruit this Muster</td></tr>
  <tr><td>🌾 Granary</td><td>+4 Crop now</td><td>Your army is outgrowing its food</td></tr>
  <tr><td>🛡 Hero's Aegis</td><td>+1 Guard to your Hero (permanent)</td><td>Your Hero leads the push / rout risk</td></tr>
  <tr><td>⭐ Veteran's Mark</td><td>+2 XP to your strongest unit</td><td>A unit is one step from ★ or ★★</td></tr>
  <tr><td>🪵 Palisade</td><td>Free wall on a key column</td><td>Sealing a flank you can't hold</td></tr>
  <tr><td>◆ War Chest</td><td>+2 Tribute</td><td>You want clutch Surge / Shieldbearer plays</td></tr>
  <tr><td>🏷 Levy</td><td>Next recruits cost less</td><td>You're about to mass units</td></tr>
  <tr><td>🌱 Homestead</td><td>Auto-builds a crop/supply field</td><td>Safe, always-useful economy pick</td></tr>
</table>
<p><b>Drafting tips:</b></p>
<ul>
  <li><b>Pick to your plan, not the flashiest.</b> Attacking next round? Take Supply or Levy for more troops. Grinding it out? Granary or Homestead compounds every round after.</li>
  <li><b>Veteran's Mark snowballs</b> — a unit at XP 1 (→★ at 2) or XP 3 (→★★ at 4) promotes <i>instantly</i>. Best on an Archer/Siege that wounds from range without taking hits.</li>
  <li><b>Hero's Aegis</b> if your Hero spearheads — +1 Guard softens every hit it takes and lowers rout risk.</li>
  <li><b>Behind on the board? You choose first</b> — grab the single best piece before the leader can.</li>
  <li><b>Round 8 &gt; round 4 for tempo</b> — the match is later, so favour immediate impact (Supply / XP / Aegis) over slow economy.</li>
</ul>

<h3>⑫ Glossary</h3>
<ul>
  <li><b>Stake / frontier:</b> a column's border row. Carry a column uncontested to step it toward the enemy.</li>
  <li><b>Carry vs contest:</b> a unit past the line with a nearby friend "carries" (pushes); an enemy unit there "contests" (cancels the push).</li>
  <li><b>Breach:</b> a unit reaching the enemy's back rows damages a Supply Wagon in the Frontier phase.</li>
  <li><b>Rout:</b> your standard (Hero) surrounded → automatic wagon damage to you.</li>
  <li><b>Komi:</b> the first-move / tie-break token; it flips to whoever lost more ground that round.</li>
  <li><b>Caravan:</b> on rounds 4 & 8, both sides draft Artifacts (one-time boosts); the trailing side picks first.</li>
</ul>`;

export function openGuide() {
  if (document.getElementById('guide-ov')) return;
  const ov = document.createElement('div');
  ov.id = 'guide-ov';
  ov.className = 'overlay';
  ov.innerHTML = `<div class="modal guide"><button class="modal-x" id="guide-x">✕</button>${GUIDE_HTML}</div>`;
  document.body.appendChild(ov);
  ov.addEventListener('click', e => { if (e.target === ov) closeGuide(); });
  document.getElementById('guide-x')!.addEventListener('click', closeGuide);
}
export function closeGuide() { document.getElementById('guide-ov')?.remove(); }

// A small persistent "Guide" button the controller/setup can mount.
export function guideButtonHTML() { return `<button class="pbtn guide-btn" id="open-guide">❓ Guide</button>`; }
export function wireGuideButton(root: ParentNode = document) {
  root.querySelector('#open-guide')?.addEventListener('click', openGuide);
}
