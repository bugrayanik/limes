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
  { text: `<b>Welcome to LIMES.</b> Your goal: smash the enemy's <b>3 Supply Wagons</b> (the ▣ on the top row) — or be ahead at the time limit. We'll play one turn together. Click <b>Next</b>.`, manual: true },
  { text: `Each round starts with <b>Muster</b> — you spend resources. Let's recruit a unit: click the <b>Spearman</b> button below.`, hi: '[data-act="rec:spear"]', done: c => c.musterModeKind === 'recruit' },
  { text: `The glowing tiles are your back rows, where new units deploy. <b>Click any glowing tile</b> to place your Spearman.`, board: true, done: c => c.stagedRecruitCount >= 1 },
  { text: `Nice — your Spearman is staged (gold outline). You could also <b>build fields</b> (economy) or <b>unlock</b> Cavalry/Archers. For now, click <b>End Muster ▶</b>.`, hi: '[data-act="muster-done"]', done: c => c.phaseKind === 'clash' },
  { text: `Now <b>Clash</b> — combat over two pulses. <b>Click one of your units</b> (your colour, bottom half) to select it.`, board: true, done: c => c.selectedUid !== null },
  { text: `<span class="g-c g-move">Green</span> tiles are where it can move; <span class="g-c g-melee">red</span> would be an attack. <b>Click a green tile</b> to advance toward the gold frontier line.`, board: true, done: c => c.orderCount >= 1 },
  { text: `An order badge appeared on the unit. Order more units the same way if you like — then click <b>Resolve pulse ▶</b>.`, hi: '[data-act="clash-done"]', done: c => c.bannerText.includes('pulse 2') || c.phaseKind !== 'clash' },
  { text: `That's the heartbeat of LIMES: <b>Muster → Clash (×2 pulses) → the Frontier resolves</b> automatically (stakes shift, wagons get breached). Keep playing this game! Tap <b>❓ Guide</b> any time for the full rules.`, manual: true },
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
