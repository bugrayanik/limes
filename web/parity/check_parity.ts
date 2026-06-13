// Parity runner: assert the TS engine reproduces the Python oracle.
//
// Two levels of granularity, both sourced from web/parity/golden.json
// (regenerate it first:  python3 parity/dump_golden.py --suite --out parity/golden.json):
//
//   1. post-setup  — stateHash() after setup() must equal round_hashes[0].   [DONE]
//   2. per-phase    — once the TS engine ports play_round with checkpoints,
//                     each round-1 phase (muster/reveal/clash/frontier/pass)
//                     must equal phase_hashes_r1[i]. The FIRST mismatch is the
//                     exact rule-block to port next. Until play_round exists in
//                     TS, these are listed as PENDING targets.
//
// Run:  bun web/parity/check_parity.ts
import { Game, GameOver } from '../src/engine';
import { makeBot } from '../src/bots';
import golden from './golden.json';

type Match = {
  p1: string; p2: string; seed: number; config?: Record<string, number>;
  round_hashes: string[];
  phase_hashes_r1: [string, string][];
  result: { winner: number | null; win_type: string | null; rounds: number };
};

let pass = 0, fail = 0;

console.log('── post-setup parity ──');
for (const m of golden as Match[]) {
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

// Per-phase parity for round 1. Capability-detect: the TS Game grows a
// phaseHashesR1() (replaying muster→reveal→clash→frontier→pass, hashing after
// each) as the phases land. Report the first divergent phase, else the targets.
console.log('\n── per-phase parity (round 1) ──');
const sample = (golden as Match[])[0];
const hasPhasePort = typeof (Game.prototype as any).phaseHashesR1 === 'function';
if (!hasPhasePort) {
  const labels = sample.phase_hashes_r1.map(([l]) => l).join(' → ');
  console.log(`PENDING  play_round not yet ported. Next targets, in order: ${labels}`);
  console.log('         (port Phase 1 Muster first — see PORT CHECKLIST in src/engine.ts)');
} else {
  // The TS engine returns only the phases ported so far (in oracle order). A
  // produced phase that mismatches is a real FAIL; phases not yet produced are
  // PENDING, and the next one is the porting target.
  for (const m of golden as Match[]) {
    const bots = [makeBot(m.p1), makeBot(m.p2)];
    bots.forEach((b, p) => b.reset(m.seed, p));
    const g = new Game(bots, m.seed, m.config && Object.keys(m.config).length ? m.config : undefined);
    g.setup();
    const got: [string, string][] = (g as any).phaseHashesR1();
    let firstBad = -1;
    for (let i = 0; i < got.length; i++) {
      if (got[i][1] !== m.phase_hashes_r1[i][1]) { firstBad = i; break; }
    }
    if (firstBad !== -1) {
      console.log(`FAIL  ${m.p1} vs ${m.p2} (seed ${m.seed})  phase '${m.phase_hashes_r1[firstBad][0]}' diverges`);
      fail++;
    } else {
      const done = got.map(([l]) => l).join(',');
      const next = m.phase_hashes_r1[got.length]?.[0];
      console.log(`PASS  ${m.p1} vs ${m.p2} (seed ${m.seed})  [${done}]${next ? `  next: ${next}` : '  (round complete)'}`);
      pass++;
    }
  }
}

// Full-match parity: replay every round through playRound() and assert the
// per-round state hashes AND the final result (winner/win_type/rounds) match.
// This is what exercises the combat/wagon/rout/intervention/caravan paths that
// round 1 never reaches.
console.log('\n── full-match parity (all rounds) ──');
for (const m of golden as Match[]) {
  const bots = [makeBot(m.p1), makeBot(m.p2)];
  bots.forEach((b, p) => b.reset(m.seed, p));
  const g = new Game(bots, m.seed, m.config && Object.keys(m.config).length ? m.config : undefined);
  g.setup();
  const hashes = [g.stateHash()];
  let winner: number | null = null, wtype: string | null = null;
  try { for (;;) { g.playRound(); hashes.push(g.stateHash()); } }
  catch (e) { if (e instanceof GameOver) { winner = e.winner; wtype = e.wtype; } else throw e; }
  let bad = -1;
  for (let i = 0; i < Math.min(hashes.length, m.round_hashes.length); i++)
    if (hashes[i] !== m.round_hashes[i]) { bad = i; break; }
  const lenOk = hashes.length === m.round_hashes.length;
  const rOk = winner === m.result.winner && wtype === m.result.win_type && g.round === m.result.rounds;
  if (bad === -1 && lenOk && rOk) {
    console.log(`PASS  ${m.p1} vs ${m.p2} (seed ${m.seed})  ${g.round} rounds → ${wtype} (P${winner})`);
    pass++;
  } else {
    const why = bad !== -1 ? `round ${bad} hash` : !lenOk ? `length ${hashes.length}≠${m.round_hashes.length}`
      : `result ${winner}/${wtype}/${g.round}≠${m.result.winner}/${m.result.win_type}/${m.result.rounds}`;
    console.log(`FAIL  ${m.p1} vs ${m.p2} (seed ${m.seed})  ${why}`);
    fail++;
  }
}

console.log(`\nparity: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
