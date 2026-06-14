// Entry — setup screen → interactive game (Controller). Real engine throughout.
import { Controller } from './controller';
import type { GameConfig } from './controller';
import { TRIBES } from './assets';
import { cap } from './render';
import { openGuide } from './guide';
import { Tutorial } from './tutorial';

const BOTS = ['HONEST', 'AGGRO', 'TURTLE', 'PROBER', 'SANDBAGGER', 'RUNNER'];
const BOT_DESC: Record<string, string> = {
  HONEST: 'Balanced value play', AGGRO: 'Relentless stake-pusher', TURTLE: 'Economy & walls',
  PROBER: 'Punishes overextension', SANDBAGGER: 'Banks tribute, then strikes', RUNNER: 'Cavalry cheese',
};

const root = document.getElementById('app')!;

const state: GameConfig = {
  mode: 'bot', humanSeat: 0, botName: 'HONEST',
  p0tribe: 'roman', p1tribe: 'viking', seed: 12345,
};

function tribeOptions(sel: string) {
  return TRIBES.map(t => `<option value="${t}"${t === sel ? ' selected' : ''}>${cap(t)}</option>`).join('');
}

function setupScreen() {
  root.innerHTML = `
    <div class="setup">
      <h1>LIMES</h1>
      <p class="sub">A deterministic, dice-free frontier wargame. Hold the line; carry the stakes.</p>

      <div class="srow"><span class="slabel">Opponent</span>
        <div class="seg">
          <button class="segbtn${state.mode === 'bot' ? ' on' : ''}" data-mode="bot">vs Bot</button>
          <button class="segbtn${state.mode === 'hotseat' ? ' on' : ''}" data-mode="hotseat">Hotseat (2P)</button>
        </div></div>

      <div id="botrow" class="srow"${state.mode === 'bot' ? '' : ' hidden'}>
        <span class="slabel">Bot</span>
        <select id="bot">${BOTS.map(b => `<option value="${b}"${b === state.botName ? ' selected' : ''}>${b} — ${BOT_DESC[b]}</option>`).join('')}</select>
      </div>

      <div id="seatrow" class="srow"${state.mode === 'bot' ? '' : ' hidden'}>
        <span class="slabel">Your seat</span>
        <div class="seg">
          <button class="segbtn${state.humanSeat === 0 ? ' on' : ''}" data-seat="0">P1 · bottom</button>
          <button class="segbtn${state.humanSeat === 1 ? ' on' : ''}" data-seat="1">P2 · top</button>
        </div></div>

      <div class="srow"><span class="slabel">P1 tribe</span>
        <select id="p0t">${tribeOptions(state.p0tribe)}</select></div>
      <div class="srow"><span class="slabel">P2 tribe</span>
        <select id="p1t">${tribeOptions(state.p1tribe)}</select></div>

      <div class="srow"><span class="slabel">Seed</span>
        <input id="seed" type="number" value="${state.seed}">
        <button class="pbtn" id="rnd">⟳</button></div>

      <button class="pbtn confirm big" id="start">Begin campaign ▶</button>
      <div class="setup-links">
        <button class="pbtn" id="tut">🎓 Tutorial — learn by playing</button>
        <button class="pbtn" id="demo">🤖 Watch a demo (AI vs AI)</button>
        <button class="pbtn" id="guide">📖 Read the rules</button>
      </div>
      <p class="hint">New here? Start with the <b>Tutorial</b>. Pick an action, then click the board.
        Two pulses of Clash per round; first to wipe the enemy Supply Wagons — or lead at the time limit — wins.</p>
    </div>`;

  root.querySelectorAll<HTMLElement>('[data-mode]').forEach(b => b.onclick = () => { state.mode = b.dataset.mode as any; setupScreen(); });
  root.querySelectorAll<HTMLElement>('[data-seat]').forEach(b => b.onclick = () => { state.humanSeat = Number(b.dataset.seat); setupScreen(); });
  (root.querySelector('#bot') as HTMLSelectElement).onchange = e => state.botName = (e.target as HTMLSelectElement).value;
  (root.querySelector('#p0t') as HTMLSelectElement).onchange = e => state.p0tribe = (e.target as HTMLSelectElement).value;
  (root.querySelector('#p1t') as HTMLSelectElement).onchange = e => state.p1tribe = (e.target as HTMLSelectElement).value;
  (root.querySelector('#seed') as HTMLInputElement).onchange = e => state.seed = Number((e.target as HTMLInputElement).value) | 0;
  (root.querySelector('#rnd') as HTMLElement).onclick = () => { state.seed = Math.floor(Math.random() * 1e6); setupScreen(); };
  (root.querySelector('#start') as HTMLElement).onclick = () => {
    if (state.p0tribe === state.p1tribe) state.p1tribe = TRIBES.find(t => t !== state.p0tribe)!;
    new Controller(root).start({ ...state });
  };
  (root.querySelector('#demo') as HTMLElement).onclick = () => {
    // each demo: two random distinct tribes + a fresh seed, so every watch differs
    const a = TRIBES[Math.floor(Math.random() * TRIBES.length)];
    let b = TRIBES[Math.floor(Math.random() * TRIBES.length)];
    while (b === a) b = TRIBES[Math.floor(Math.random() * TRIBES.length)];
    new Controller(root).start({ ...state, p0tribe: a, p1tribe: b, seed: Math.floor(Math.random() * 1e6), demo: true });
  };
  (root.querySelector('#guide') as HTMLElement).onclick = openGuide;
  (root.querySelector('#tut') as HTMLElement).onclick = () => {
    // a gentle, guided first game vs TURTLE on a fixed seed
    new Tutorial(new Controller(root)).start({
      mode: 'bot', humanSeat: 0, botName: 'TURTLE', p0tribe: state.p0tribe,
      p1tribe: state.p1tribe === state.p0tribe ? TRIBES.find(t => t !== state.p0tribe)! : state.p1tribe, seed: 4242,
    });
  };
}

setupScreen();
