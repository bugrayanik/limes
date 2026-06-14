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
