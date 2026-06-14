// Interactive tutorial coach. Runs a REAL game (vs a gentle bot) and walks the
// player through one full turn, step by step. It observes the controller via
// its onChange hook and read-only getters, advancing when the player does the
// thing each step asks. No scripting of the engine — the player really plays.
import { Controller } from './controller';
import type { GameConfig } from './controller';
import { openGuide } from './guide';

interface Step {
  text: string;
  hi?: string;                       // selector to spotlight
  manual?: boolean;                  // show a Next button instead of auto-advancing
  done?: (c: Controller) => boolean; // auto-advance predicate
  board?: boolean;                   // spotlight the whole board
}

const STEPS: Step[] = [
  // — orientation —
  { text: `<b>Welcome to LIMES</b> — a dice-free wargame of frontier lines. No luck: every result follows from the rules. We'll play one full round together, step by step. Click <b>Next ▶</b>.`, manual: true },
  { text: `<b>The board is 8×8.</b> You command the <b>bottom</b> half; the enemy holds the top. The <span class="g-c g-move">gold line</span> across each column is the <b>frontier</b> — below it is your land, above it theirs.`, board: true, manual: true },
  { text: `Those dashed squares on the <b>back rows</b> are <b>Supply Wagons</b> (▣) — 3 each. Destroy all <b>3 enemy wagons</b> (top) to win. If nobody does, whoever leads at the round-18 time limit wins. <b>Protect yours.</b>`, board: true, manual: true },
  // — muster —
  { text: `Every round opens with <b>Muster</b>: you spend resources. 🛡 <b>Supply</b> builds your army; 🌾 <b>Crop</b> feeds it each round. Let's recruit — click the <b>Spearman</b> button.`, hi: '[data-act="rec:spear"]', done: c => c.musterModeKind === 'recruit' },
  { text: `The glowing tiles are your back rows — where new units deploy. <b>Click a glowing tile</b> to place your Spearman.`, board: true, done: c => c.stagedRecruitCount >= 1 },
  { text: `Staged (gold outline). You can deploy a couple per turn. You could also <b>Build</b> a Crop field for more income, or <b>Unlock</b> Cavalry & Archers. Remember the triangle: <b>Spear ▸ Cavalry ▸ Archer ▸ Spear</b>.`, manual: true },
  { text: `When you're happy with your Muster, click <b>End Muster ▶</b> to lock it in.`, hi: '[data-act="muster-done"]', done: c => c.phaseKind === 'clash' },
  // — clash —
  { text: `Now <b>Clash</b> — the combat phase, fought over <b>two pulses</b>. Your units move and fight. <b>Click one of your units</b> (bottom half) to select it.`, board: true, done: c => c.selectedUid !== null },
  { text: `Highlights show its options: <span class="g-c g-move">green</span> = move, <span class="g-c g-melee">red</span> = attack, <span class="g-c g-shoot">orange</span> = shoot, <span class="g-c g-charge">purple</span> = charge. <b>Click a green tile</b> to advance toward the enemy line.`, board: true, done: c => c.orderCount >= 1 },
  { text: `A badge marks the queued order. Early on the enemy is far away, so there are no red attack tiles yet — your job now is to <b>advance and form a line</b>. Order a few more units if you like.`, manual: true },
  { text: `Reaching past the enemy's stake line (with a friend nearby) <b>carries</b> the column — that's how you push the frontier. When ready, click <b>Resolve pulse ▶</b>.`, hi: '[data-act="clash-done"]', done: c => c.bannerText.includes('pulse 2') || c.phaseKind !== 'clash' },
  { text: `That was <b>pulse 1</b> — orders resolved simultaneously (no first-mover advantage). Now <b>pulse 2</b>: same again. Move up, then <b>Resolve pulse ▶</b> to finish the round.`, hi: '[data-act="clash-done"]', done: c => c.round >= 2 },
  // — wrap-up —
  { text: `<b>Round complete!</b> The <b>Frontier</b> resolved automatically — stakes shift where a side carried a column, and units in enemy back rows breach wagons. Check the <b>log line</b> under the board to see what changed.`, manual: true },
  { text: `You're back at <b>Muster</b> for round 2 — the loop repeats: <b>Muster → Clash ×2 → Frontier → Pass</b>. That's the whole game. Build economy, win the match-ups, and march on their wagons.`, manual: true },
  { text: `You've got it! Keep playing this match. Open <b>❓ Guide</b> any time for unit stats, combat math, and strategy tips. <b>Good luck, commander.</b>`, manual: true },
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
    this.c.start(cfg);
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
    if (this.i >= STEPS.length) { this.finish(); return; }
    this.render();
  }

  private clearSpot() {
    document.querySelectorAll('.coachmark').forEach(e => e.classList.remove('coachmark'));
    document.querySelector('.board-grid')?.classList.remove('coach-board');
  }
  private spotlight() {
    this.clearSpot();
    const step = STEPS[this.i];
    if (step.hi) document.querySelector(step.hi)?.classList.add('coachmark');
    if (step.board) document.querySelector('.board-grid')?.classList.add('coach-board');
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
          <button class="pbtn coach-skip" id="coach-skip">Skip tutorial</button>
        </div>
      </div>`;
    this.box.querySelector('#coach-next')?.addEventListener('click', () => {
      if (this.i === STEPS.length - 1) this.finish(); else this.advance();
    });
    this.box.querySelector('#coach-guide')?.addEventListener('click', openGuide);
    this.box.querySelector('#coach-skip')?.addEventListener('click', () => this.finish());
    this.spotlight();
  }

  private finish() {
    this.c.onChange = null;
    this.clearSpot();
    this.box.remove();
  }
}
