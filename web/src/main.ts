// Phase 1 entry — build a deterministic mid-game state from the engine and
// render it statically. No interaction yet (that's Phase 2).
import { Game, GameOver } from './engine';
import { makeBot } from './bots';
import { renderBoard } from './render';

function midGame(seed: number, p1: string, p2: string, rounds: number): Game {
  const bots = [makeBot(p1), makeBot(p2)];
  bots.forEach((b, p) => b.reset(seed, p));
  const g = new Game(bots, seed);
  g.setup();
  try { for (let i = 0; i < rounds; i++) g.playRound(); }
  catch (e) { if (!(e instanceof GameOver)) throw e; }
  return g;
}

const g = midGame(70012, 'HONEST', 'AGGRO', 6);
const el = document.getElementById('board');
if (el) el.innerHTML = renderBoard(g, { p0tribe: 'roman', p1tribe: 'viking' });
