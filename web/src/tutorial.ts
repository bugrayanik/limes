// Interactive tutorial — teaches the WHOLE game from zero. Runs a real game on
// a hand-built "practice skirmish" scenario that places your troops already in
// contact, so every mechanic (recruit, economy, move, melee, charge, shoot,
// brace) is reachable and explained. The player really plays; the coach watches
// the controller and advances when each step is done.
import { Controller } from './controller';
import type { GameConfig } from './controller';
import type { Game } from './engine';
import { openGuide } from './guide';

interface Step {
  text: string;
  hi?: string;                       // selector to spotlight (pulsing)
  manual?: boolean;                  // show Next instead of auto-advancing
  done?: (c: Controller) => boolean;
  board?: boolean;                   // spotlight the whole board
}

// Place a forward practice force so attack/charge/shoot are all available turn 1.
function buildScenario(g: Game) {
  const mk = (owner: number, arch: string, pos: [number, number]) => { const u = g.newUnit(owner, arch); g.place(u, pos); };
  g.unlocked[0].add('archer'); g.unlocked[0].add('cav');   // so Muster shows more options
  mk(0, 'sword', [1, 3]); mk(1, 'archer', [1, 4]);          // melee: adjacent enemy
  mk(0, 'cav', [3, 2]); mk(1, 'archer', [3, 5]);            // charge: 2-tile run lands next to enemy
  mk(0, 'archer', [5, 3]); mk(1, 'spear', [5, 5]);          // shoot: enemy at range 2
}

const STEPS: Step[] = [
  // ── orientation ──
  { text: `<b>Welcome, commander.</b> I'll teach you everything — assume you know nothing. LIMES is a <b>dice-free</b> wargame: no luck, every result follows from the rules. Click <b>Next ▶</b>.`, manual: true },
  { text: `<b>The board is 8×8.</b> You command the <b>bottom</b> half; the enemy holds the top. The <span class="g-c g-move">gold line</span> across each column is the <b>frontier (stake line)</b> — below it is your land, above it theirs.`, board: true, manual: true },
  { text: `On each back row sit <b>Supply Wagons</b> (▣) — 3 per side. <b>Win</b> by destroying all 3 enemy wagons (top). If nobody does, the leader at the round-18 limit wins. So: <b>attack their wagons, defend yours.</b>`, board: true, manual: true },
  { text: `I've set up a <b>practice skirmish</b> — your troops are already near the enemy so you can try every action. <b>Tip: hover any unit</b> to see its stats.`, board: true, manual: true },
  // ── economy / muster ──
  { text: `Two resources run your war: 🛡 <b>Supply</b> (builds things) and 🌾 <b>Crop</b> (feeds your army — <b>1 per unit each round</b>; unfed units get <b>exhausted</b> and fight worse). Every round starts with <b>Muster</b>, where you spend them.`, manual: true },
  { text: `Let's recruit. Click the <b>Spearman</b> button below.`, hi: '[data-act="rec:spear"]', done: c => c.musterModeKind === 'recruit' },
  { text: `The glowing tiles are your back rows. <b>Click a glowing tile</b> to deploy your Spearman there.`, board: true, done: c => c.stagedRecruitCount >= 1 },
  { text: `Good. Now economy: more Crop = a bigger army you can feed. Click <b>Crop field</b>.`, hi: '[data-act="fld:crop"]', done: c => c.musterModeKind === 'field' },
  { text: `<b>Click a glowing tile in your territory</b> to build the field (it yields Crop every Muster).`, board: true, done: c => c.stagedFieldCount >= 1 },
  { text: `You can also <b>Unlock</b> new unit types (Cavalry, Archers, Siege), build <b>Palisades</b> (block a column), or convert <b>Tribute → Supply</b>. The key rule of who-beats-who: <b>Spear ▸ Cavalry ▸ Archer ▸ Spear</b>. Now click <b>End Muster ▶</b>.`, hi: '[data-act="muster-done"]', done: c => c.phaseKind === 'clash' },
  // ── clash ──
  { text: `<b>Clash</b> — combat, fought over <b>two pulses</b>. Both sides' orders resolve <b>at the same time</b> (no first-mover advantage). <b>Click one of your units</b> to select it.`, board: true, done: c => c.selectedUid !== null },
  { text: `Highlights show what it can do: <span class="g-c g-move">green</span> move · <span class="g-c g-melee">red</span> melee · <span class="g-c g-shoot">orange</span> shoot · <span class="g-c g-charge">purple</span> charge. Your forward units have enemies in range! <b>Select a unit with a coloured enemy and click that enemy to attack.</b>`, board: true, done: c => c.hasAttackOrder },
  { text: `Attack queued. <b>Damage = your Atk − their Guard.</b> Edges: <b>+1</b> if you counter their type, <b>+1</b> when flanking (2+ attackers), Cavalry <b>Charge</b> adds punch and shoves — but a <b>Braced Spearman</b> stops a charge cold and wrecks the rider. <b>Archers/Siege shoot</b> from range without retaliation.`, manual: true },
  { text: `You can also just <b>advance</b>: select a unit and click a <span class="g-c g-move">green</span> tile to move toward the enemy line. Order as many units as you like, then click <b>Resolve pulse ▶</b>.`, hi: '[data-act="clash-done"]', done: c => c.bannerText.includes('pulse 2') || c.phaseKind !== 'clash' },
  { text: `<b>Pulse 1 resolved!</b> Check the units — HP bars dropped, maybe one fell. Wounding enemies earns <b>XP</b> → <b>promotions</b> (★ tougher, ★★ upgraded). Now <b>pulse 2</b>: same again, then <b>Resolve pulse ▶</b> to end the round.`, hi: '[data-act="clash-done"]', done: c => c.round >= 2 },
  // ── resolution & deeper systems ──
  { text: `<b>Round over.</b> The <b>Frontier</b> just resolved automatically: in any column where one side has a unit past the line with a friend nearby (a <b>carry</b>) and the enemy doesn't contest it, the <b>stake steps</b> — you take a row. Units in the enemy's back rows <b>breach</b> a wagon. See the <b>log line</b> under the board.`, manual: true },
  { text: `When you <b>lose</b> a row you gain ◆ <b>Tribute</b> — spend it during Clash on a <b>Surge</b> (shove a unit a tile) or <b>Shieldbearer</b> (save your Hero from a death blow), or bank it and convert to Supply. Losing ground isn't all bad.`, manual: true },
  { text: `Two more things: your <b>Hero</b> is your standard — if it's ever fully surrounded by enemies you <b>rout</b> (your wagons take damage), so keep a friend beside it. And on <b>rounds 4 & 8</b> a <b>Caravan</b> lets both sides draft one-time <b>Artifacts</b> (the trailing side picks first).`, manual: true },
  { text: `<b>The clock:</b> from round 14 a single uncontested push can end it (golden goal); at round 18 the leader wins outright — so don't stall if you're behind. That's the <b>whole game</b>!`, manual: true },
  { text: `You know LIMES now: <b>feed your army, win the match-ups, push toward their wagons.</b> Keep playing this skirmish, and open <b>❓ Guide</b> anytime for stats & tips. Good luck, commander. ⚔`, manual: true },
];

export class Tutorial {
  private i = 0;
  private box!: HTMLElement;
  constructor(private c: Controller) {}

  start(cfg: GameConfig) {
    this.box = document.createElement('div');
    this.box.id = 'coach';
    document.body.appendChild(this.box);
    this.c.onChange = () => this.refresh();
    this.c.startScenario(cfg, buildScenario);
    this.render();
  }

  private refresh() {
    const step = STEPS[this.i];
    if (!step) return;
    if (!step.manual && step.done && step.done(this.c)) { this.advance(); return; }
    this.spotlight();
  }
  private advance() {
    this.i++;
    if (this.i >= STEPS.length) return this.finish();
    this.render();
  }
  private boardEl() { return document.querySelector('#board3d') || document.querySelector('.board-grid'); }
  private clearSpot() {
    document.querySelectorAll('.coachmark').forEach(e => e.classList.remove('coachmark'));
    this.boardEl()?.classList.remove('coach-board');
  }
  private spotlight() {
    this.clearSpot();
    const step = STEPS[this.i];
    if (step.hi) document.querySelector(step.hi)?.classList.add('coachmark');
    if (step.board) this.boardEl()?.classList.add('coach-board');
  }
  private render() {
    const step = STEPS[this.i];
    this.box.innerHTML = `
      <div class="coach-inner">
        <div class="coach-step">Tutorial · ${this.i + 1}/${STEPS.length}</div>
        <div class="coach-text">${step.text}</div>
        <div class="coach-btns">
          ${step.manual ? `<button class="pbtn confirm" id="coach-next">${this.i === STEPS.length - 1 ? 'Finish ✓' : 'Next ▶'}</button>` : `<span class="coach-hint">↳ do the highlighted action to continue</span>`}
          <button class="pbtn" id="coach-guide">❓ Guide</button>
          <button class="pbtn coach-skip" id="coach-skip">Skip</button>
        </div>
      </div>`;
    this.box.querySelector('#coach-next')?.addEventListener('click', () => this.i === STEPS.length - 1 ? this.finish() : this.advance());
    this.box.querySelector('#coach-guide')?.addEventListener('click', openGuide);
    this.box.querySelector('#coach-skip')?.addEventListener('click', () => this.finish());
    this.spotlight();
  }
  private finish() { this.c.onChange = null; this.clearSpot(); this.box.remove(); }
}
