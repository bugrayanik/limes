// Parity runner: assert the TS engine reproduces the Python oracle.
// Phase 0 scope: post-setup state hash (round_hashes[0]).
// Run:  bun web/parity/check_parity.ts        (regenerate golden.json first)
import { Game } from '../src/engine';
import { makeBot } from '../src/bots';
import golden from './golden.json';

let pass = 0, fail = 0;
for (const m of golden as any[]) {
  const bots = [makeBot(m.p1), makeBot(m.p2)];
  bots.forEach((b, p) => b.reset(m.seed, p));
  const g = new Game(bots, m.seed, m.config && Object.keys(m.config).length ? m.config : undefined);
  g.setup();
  const got = g.stateHash();
  const want = m.round_hashes[0];
  const ok = got === want;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${m.p1} vs ${m.p2} (seed ${m.seed})  setup: ${got}${ok ? '' : ' != ' + want}`);
  ok ? pass++ : fail++;
}
console.log(`\npost-setup parity: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
