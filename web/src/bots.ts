// Policy bots — TS port of sim/bots.py.
// Phase 0 scope: setup() + the Muster decision methods (feedOrder / build /
// reinforce / standardBearer) and their tactical helpers. The opening and the
// muster decisions are reproduced byte-for-byte against the Python oracle via
// web/parity/check_parity.ts (post-setup + per-phase 'muster' hash).

import type { Game, Pos, Unit } from './engine';
import { manh, inBounds, neighbors, COUNTERS } from './engine';

// max()/min() with a key, returning the FIRST extremum (Python semantics).
function argmax<T>(arr: T[], fn: (t: T) => number): T {
  let best = arr[0], bs = fn(arr[0]);
  for (let i = 1; i < arr.length; i++) { const s = fn(arr[i]); if (s > bs) { bs = s; best = arr[i]; } }
  return best;
}
function argmin<T>(arr: T[], fn: (t: T) => number): T {
  let best = arr[0], bs = fn(arr[0]);
  for (let i = 1; i < arr.length; i++) { const s = fn(arr[i]); if (s < bs) { bs = s; best = arr[i]; } }
  return best;
}
function argminTuple<T>(arr: T[], fn: (t: T) => number[]): T {
  let best = arr[0], bk = fn(arr[0]);
  for (let i = 1; i < arr.length; i++) { const k = fn(arr[i]); if (cmpNum(k, bk) < 0) { bk = k; best = arr[i]; } }
  return best;
}
function cmpNum(a: number[], b: number[]): number {
  for (let i = 0; i < Math.max(a.length, b.length); i++) if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
  return 0;
}

const bkey = (p: Pos) => `${p[0]},${p[1]}`;

const CRC_TABLE: number[] = (() => {
  const t: number[] = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

// zlib.crc32 of a UTF-8 string -> unsigned 32-bit (matches Python's zlib.crc32).
export function crc32(s: string): number {
  const bytes = new TextEncoder().encode(s);
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

// Render a tb() part the way Python's str() does, so the hash matches: a
// position tuple (3, 1) stringifies as "(3, 1)" — NOT JS's "3,1".
function pyStr(x: string | number | Pos): string {
  return Array.isArray(x) ? '(' + x.map(pyStr).join(', ') + ')' : String(x);
}

// Lexicographic compare of Python-style key tuples (numbers, or nested pos).
type Key = (number | number[])[];
function tupleCmp(a: Key, b: Key): number {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const x = a[i], y = b[i];
    if (Array.isArray(x) && Array.isArray(y)) { const c = tupleCmp(x as Key, y as Key); if (c) return c; }
    else if ((x as number) !== (y as number)) return (x as number) < (y as number) ? -1 : 1;
  }
  return 0;
}

export interface UnitPlan { arch: string; pos: Pos; }
export interface SetupPlan { wagons: number[]; units: UnitPlan[]; }
export interface ReinforcePlan {
  unlocks: string[]; recruits: [string, Pos][]; repositions: [number, Pos][];
  rush: number[]; tribute_spend: number;
}
export type BuildAct = ['field', Pos, string] | ['palisade', number];

type Cfg = Record<string, any>;
const POLICY_NAMES = ['HONEST', 'AGGRO', 'TURTLE', 'PROBER', 'SANDBAGGER', 'RUNNER'];

function makeCfg(name: string): Cfg {
  const base: Cfg = {
    mode: 'auto', depth: 1, fields_target: 9, palisades: true,
    unlock_plan: ['archer'], unlock_round: 3,
    recruit_priority: ['sword', 'spear', 'archer', 'cav', 'siege'],
    army_overshoot: 0, attack_scope: 'any', brace_radius: 2, trample: 'annex',
    desperation_round: 11, sandbag_until: 0, wagon_hunt: false, avoid_lone: true,
    feed_forward_first: true, rush: true, rearguard: 0, push_margin: 1.0,
    convert_mult: 1.8, breach_round: 12, force_push_round: 12,
  };
  if (name === 'HONEST') Object.assign(base, { rearguard: 1 });
  else if (name === 'AGGRO') Object.assign(base, {
    mode: 'push', depth: 2, fields_target: 9, unlock_plan: ['cav'], unlock_round: 1,
    recruit_priority: ['cav', 'sword', 'spear', 'archer'], army_overshoot: 1,
    trample: 'raid', wagon_hunt: true, palisades: false, desperation_round: 1,
    brace_radius: 1, convert_mult: 1.4, breach_round: 10, force_push_round: 1,
  });
  else if (name === 'TURTLE') Object.assign(base, {
    mode: 'hold', fields_target: 14, unlock_plan: ['archer', 'siege'], unlock_round: 2,
    recruit_priority: ['spear', 'archer', 'sword', 'siege'], attack_scope: 'own_half',
    desperation_round: 12, feed_forward_first: false, brace_radius: 3,
    convert_mult: 2.0, force_push_round: 14, breach_round: 14,
  });
  else if (name === 'PROBER') Object.assign(base, {
    mode: 'hold', fields_target: 11, unlock_plan: ['archer'], unlock_round: 2,
    recruit_priority: ['spear', 'archer', 'sword', 'cav'], attack_scope: 'own_half_superior',
    desperation_round: 11, feed_forward_first: false, brace_radius: 3,
    convert_mult: 1.8, force_push_round: 13,
  });
  else if (name === 'SANDBAGGER') Object.assign(base, {
    mode: 'sandbag', depth: 2, fields_target: 9, unlock_plan: ['cav'], unlock_round: 5,
    recruit_priority: ['sword', 'cav', 'spear', 'archer'], trample: 'raid',
    sandbag_until: 5, desperation_round: 6, wagon_hunt: true, convert_mult: 1.5,
  });
  else if (name === 'RUNNER') Object.assign(base, {
    mode: 'runner', depth: 6, fields_target: 6, unlock_plan: ['cav'], unlock_round: 1,
    recruit_priority: ['cav', 'sword', 'spear'], trample: 'raid', avoid_lone: false,
    desperation_round: 99, palisades: false, convert_mult: 99, force_push_round: 99,
  });
  return base;
}

export class Policy {
  name: string;
  cfg: Cfg;
  seed = 0;
  me = 0;
  _convert = false;
  constructor(name: string) {
    if (!POLICY_NAMES.includes(name)) throw new Error('unknown bot: ' + name);
    this.name = name; this.cfg = makeCfg(name);
  }

  reset(seed: number, player: number) { this.seed = seed; this.me = player; this._convert = false; }

  // cfg round thresholds shift with the endgame clock (calibrated to GG=16)
  clock(g: Game, key: string): number { return this.cfg[key] + (g.C.GOLDEN_GOAL_ROUND - 16); }

  // deterministic tiebreak in [0,1) — mirrors bots.py tb()
  tb(...parts: (string | number | Pos)[]): number {
    const s = `${this.seed}|${this.name}|${this.me}|${parts.map(pyStr).join('|')}`;
    return crc32(s) / 4294967296.0;
  }

  // bots.py Policy.setup()
  setup(_g: unknown, me: number): SetupPlan {
    const front = me === 0 ? 1 : 6;
    const baseSets = [[1, 4, 6], [0, 3, 6], [2, 4, 7], [1, 3, 5]];
    const wag = baseSets[Math.floor(this.tb('wagons') * baseSets.length)].slice();
    const center = 3 + (this.tb('side') < 0.5 ? 0 : 1);
    const units: UnitPlan[] = [
      { arch: 'hero', pos: [center, front] },
      { arch: 'spear', pos: [center - 1, front] },
      { arch: 'sword', pos: [center + 1, front] },
      { arch: 'sword', pos: [center - 2, front] },
    ];
    return { wagons: wag, units };
  }

  // -- shared tactical analysis ----------------------------------------------

  threatenedCols(g: Game, me: number): number[] {
    const out: number[] = [];
    for (let c = 0; c < 8; c++) {
      const [p1c, p2c] = g.columnClaims(c);
      if ((me === 0 && p2c) || (me === 1 && p1c)) out.push(c);
    }
    return out;
  }

  dangerCols(g: Game, me: number): number[] {
    const score = new Array(8).fill(0);
    for (const u of g.onBoard(1 - me)) {
      const [c, r] = u.pos!, k = g.stakes[c];
      let inside: boolean, near: boolean;
      if (me === 0) { inside = r < k; near = k <= r && r <= k + 2; }
      else { inside = r >= k; near = k - 3 <= r && r < k; }
      if (inside) score[c] += 3; else if (near) score[c] += 1;
    }
    return score;
  }

  pickPushCenter(g: Game, me: number): number {
    let best: number | null = null, bestscore: number | null = null;
    const mine = g.onBoard(me);
    for (let c = 0; c < 8; c++) {
      let edef = 0, myw = 0;
      for (let cc = Math.max(0, c - 1); cc < Math.min(8, c + 2); cc++) {
        const w = cc === c ? 1.0 : 0.5;
        for (const u of g.onBoard(1 - me))
          if (u.pos![0] === cc && g.territoryOf(u.pos!) === 1 - me) edef += w;
        for (const u of mine) if (u.pos![0] === cc) myw += 0.4 * w;
      }
      const s = -edef + myw + 0.3 * this.tb('pushcol', c);
      if (bestscore === null || s > bestscore) { best = c; bestscore = s; }
    }
    return best!;
  }

  // -- Muster decisions ------------------------------------------------------

  feedOrder(g: Game, me: number): number[] {
    const mine = g.onBoard(me);
    const keyed = mine.map(u => {
      const engaged = neighbors(u.pos!).some(nb => {
        const uid = g.board.get(bkey(nb));
        return uid !== undefined && g.units.get(uid)!.owner !== me;
      });
      const fwd = g.beyondOwn(u);
      const fwdScore = this.cfg.feed_forward_first ? 0 : (fwd ? 1 : 0);
      const key: Key = [u.arch === 'hero' ? 0 : 1, engaged ? 0 : 1, fwdScore, -g.costs[u.arch], u.pos!];
      return { uid: u.uid, key };
    });
    keyed.sort((a, b) => tupleCmp(a.key, b.key));
    return keyed.map(k => k.uid);
  }

  _projCropIncome(g: Game, me: number): number { return g.computeHarvest(me, g.round + 1)[1]; }

  build(g: Game, me: number): BuildAct[] {
    const cfg = this.cfg, C = g.C;
    const acts: BuildAct[] = [];
    let supply = g.res[me].supply;
    let nfields = 0;
    for (const f of g.fields.values()) if (f.owner === me && f.annexed === null) nfields++;
    let army = 0;
    for (const u of g.units.values()) if (u.owner === me) army++;
    // palisade on the hottest threatened column
    if (cfg.palisades && supply >= C.PALISADE_COST + C.FIELD_COST) {
      const danger = this.dangerCols(g, me);
      const cand = [...Array(8).keys()]
        .filter(c => !g.palisades.has(c) && danger[c] >= 2)
        .sort((a, b) => tupleCmp([-danger[a], this.tb('pal', a)], [-danger[b], this.tb('pal', b)]));
      if (cand.length) { acts.push(['palisade', cand[0]]); supply -= C.PALISADE_COST; }
    }
    const planned: [Pos, string][] = [];
    while (acts.length < C.BUILD_ACTIONS && supply >= C.FIELD_COST && nfields < cfg.fields_target) {
      const cropInc = this._projCropIncome(g, me) + 2 * planned.filter(([, t]) => t === 'crop').length;
      const wantCrop = cropInc < army + 2 && g.round < C.EXHAUSTION_START_ROUND - 2;
      const ftype = wantCrop ? 'crop' : 'supply';
      const pos = this._fieldSpot(g, me, ftype, new Set(planned.map(([p]) => bkey(p))));
      if (pos === null) break;
      acts.push(['field', pos, ftype]); planned.push([pos, ftype]);
      supply -= C.FIELD_COST; nfields++;
    }
    // rich turtles wall up with the spare action
    if (cfg.palisades && acts.length < C.BUILD_ACTIONS && supply >= C.PALISADE_COST + 4) {
      const danger = this.dangerCols(g, me);
      const cand = [...Array(8).keys()]
        .filter(c => !g.palisades.has(c) && danger[c] >= 1)
        .sort((a, b) => tupleCmp([-danger[a], this.tb('pal2', a)], [-danger[b], this.tb('pal2', b)]));
      if (cand.length) acts.push(['palisade', cand[0]]);
    }
    return acts;
  }

  _fieldSpot(g: Game, me: number, ftype: string, exclude: Set<string>): Pos | null {
    let best: Pos | null = null, bests: number | null = null;
    for (let c = 0; c < 8; c++) {
      for (let r = 0; r < 8; r++) {
        const pos: Pos = [c, r];
        if (g.territoryOf(pos) !== me || g.fields.has(bkey(pos)) || g.wagon_at.has(bkey(pos)) || exclude.has(bkey(pos)))
          continue;
        let adjSame = 0;
        for (const nb of neighbors(pos)) {
          const f = g.fields.get(bkey(nb));
          if (f && f.type === ftype && f.owner === me && f.annexed === null) adjSame++;
        }
        const safe = g.heartlandRows(me).includes(r) ? 2 : 0;
        const s = 2 * adjSame + safe + this.tb('field', pos);
        if (bests === null || s > bests) { best = pos; bests = s; }
      }
    }
    return best;
  }

  reinforce(g: Game, me: number): ReinforcePlan {
    const cfg = this.cfg, C = g.C, res = g.res[me];
    const out: ReinforcePlan = { unlocks: [], recruits: [], repositions: [], rush: [], tribute_spend: 0 };
    let supply = res.supply;
    // late game / sandbag-flip: dump tribute into supply
    const trib = res.tribute;
    let spend = 0;
    if (cfg.mode === 'sandbag' && g.round > cfg.sandbag_until) spend = Math.max(0, trib - 2);
    else if (g.round >= this.clock(g, 'desperation_round') && trib > 2) spend = trib - 2;
    out.tribute_spend = spend; supply += spend;
    // rush wounded
    if (cfg.rush) {
      let crop = res.crop;
      for (const u of g.reserve(me))
        if (u.wounded_round === g.round - 1 && crop > g.onBoard(me).length) { out.rush.push(u.uid); crop--; }
    }
    // unlocks
    const unlocked = g.unlocked[me];
    const plan = cfg.unlock_plan.filter((a: string) => !unlocked.has(a));
    if (plan.length && g.round >= cfg.unlock_round) {
      const ncur = unlocked.size;
      const cost = ({ 2: C.UNLOCK_3RD, 3: C.UNLOCK_4TH, 4: C.UNLOCK_5TH } as Record<number, number>)[ncur] ?? 999;
      if (supply >= cost + 3) { out.unlocks.push(plan[0]); supply -= cost; }
    }
    // recruiting, bounded by feedable crop
    const cropInc = this._projCropIncome(g, me);
    let army = 0;
    for (const u of g.units.values()) if (u.owner === me) army++;
    const cap = C.DEPLOY_MAX + g.extra_deploy[me];
    const taken = new Set<string>();
    for (let i = 0; i < cap; i++) {
      const sustain = Math.max(4, cropInc + Math.floor(res.crop / 6) + cfg.army_overshoot);
      if (army + 1 > sustain) break;
      let arch: string | null = null;
      for (const a of cfg.recruit_priority) {
        if (!unlocked.has(a) && !out.unlocks.includes(a)) continue;
        if (g.copies[a] >= C.MUSTER_COPIES) continue;
        let price = g.costs[a] + C.COPY_SURCHARGE * g.copies[a];
        if (g.recruit_discount[me]) price = Math.max(1, price - g.recruit_discount[me]);
        if (supply >= price) { arch = a; supply -= price; break; }
      }
      if (arch === null) break;
      const pos = this._deploySpot(g, me, taken);
      if (pos === null) break;
      taken.add(bkey(pos)); out.recruits.push([arch, pos]); army++;
    }
    // repositions: cover live enemy carry claims with blockers
    const threats = this.threatenedCols(g, me);
    const used = new Set<number>();
    for (const c of threats.slice(0, C.REPOSITION_MAX)) {
      const u = this._spareBlocker(g, me, c, used);
      if (u === null) continue;
      const dest = this._blockTile(g, me, c);
      if (dest === null) continue;
      used.add(u.uid); out.repositions.push([u.uid, dest]);
    }
    // spare repositions mass idle rear units onto the push front
    if (out.repositions.length < C.REPOSITION_MAX
        && (cfg.mode === 'push' || cfg.mode === 'sandbag' || this._convert || g.round >= this.clock(g, 'force_push_round'))) {
      const center = this.pickPushCenter(g, me);
      for (const u of g.onBoard(me)) {
        if (out.repositions.length >= C.REPOSITION_MAX) break;
        if (used.has(u.uid) || g.beyondOwn(u) || u.arch === 'siege') continue;
        const engaged = neighbors(u.pos!).some(nb => {
          const uid = g.board.get(bkey(nb));
          return uid !== undefined && g.units.get(uid)!.owner !== me;
        });
        if (engaged || Math.abs(u.pos![0] - center) <= 1) continue;
        const farBack = me === 0 ? u.pos![1] <= 1 : u.pos![1] >= 6;
        if (!farBack) continue;
        for (const cc of [center, center - 1, center + 1]) {
          if (cc < 0 || cc >= 8) continue;
          const dest = this._blockTile(g, me, cc);
          if (dest !== null) { used.add(u.uid); out.repositions.push([u.uid, dest]); break; }
        }
      }
    }
    return out;
  }

  _deploySpot(g: Game, me: number, taken: Set<string>): Pos | null {
    const rows = g.heartlandRows(me);
    const front = me === 0 ? rows[1] : rows[0];
    let prefer: number | null = null;
    if (this.cfg.mode === 'push' || this.cfg.mode === 'runner' || this.cfg.mode === 'auto')
      prefer = this.pickPushCenter(g, me);
    const threats = this.threatenedCols(g, me);
    if (threats.length) prefer = threats[0];
    let best: Pos | null = null, bests: number | null = null;
    const rowOrder = [front, me === 0 ? rows[0] : rows[1]];
    for (let c = 0; c < 8; c++) {
      for (const r of rowOrder) {
        const pos: Pos = [c, r];
        if (g.occupied(pos) || taken.has(bkey(pos))) continue;
        const s = -Math.abs(c - (prefer !== null ? prefer : 3)) + (r === front ? 1 : 0) + this.tb('deploy', pos);
        if (bests === null || s > bests) { best = pos; bests = s; }
      }
    }
    return best;
  }

  _spareBlocker(g: Game, me: number, col: number, used: Set<number>): Unit | null {
    const cands: Unit[] = [];
    for (const u of g.onBoard(me)) {
      if (used.has(u.uid) || u.arch === 'hero' || g.beyondOwn(u)) continue;
      const engaged = neighbors(u.pos!).some(nb => {
        const uid = g.board.get(bkey(nb));
        return uid !== undefined && g.units.get(uid)!.owner !== me;
      });
      if (engaged) continue;
      const c = u.pos![0];
      let others = 0;
      for (const v of g.onBoard(me)) if (v.uid !== u.uid && v.pos![0] === c && !g.beyondOwn(v)) others++;
      const enemyHere = g.onBoard(1 - me).some(v => v.pos![0] === c);
      if (enemyHere && others === 0) continue;
      cands.push(u);
    }
    if (!cands.length) return null;
    cands.sort((a, b) => tupleCmp(
      [g.costs[a.arch], Math.abs(a.pos![0] - col), this.tb('blk', a.uid)],
      [g.costs[b.arch], Math.abs(b.pos![0] - col), this.tb('blk', b.uid)]));
    return cands[0];
  }

  _blockTile(g: Game, me: number, col: number): Pos | null {
    const k = g.stakes[col];
    const rows = me === 0 ? [...Array(k).keys()].reverse() : [...Array(8 - k).keys()].map(i => i + k);
    for (const r of rows) { const pos: Pos = [col, r]; if (!g.occupied(pos)) return pos; }
    return null;
  }

  standardBearer(_g: Game, _me: number): number | null { return null; }

  // -- orientation helpers ---------------------------------------------------
  dirn(me: number): number { return me === 0 ? 1 : -1; }
  ownFrontRow(g: Game, me: number, c: number): number { const k = g.stakes[c]; return me === 0 ? k - 1 : k; }
  firstBeyondRow(g: Game, me: number, c: number): number { const k = g.stakes[c]; return me === 0 ? k : k - 1; }
  stakeAtMax(g: Game, me: number, c: number): boolean {
    const k = g.stakes[c]; return me === 0 ? k === g.C.STAKE_MAX : k === g.C.STAKE_MIN;
  }
  behind(g: Game, me: number): boolean {
    const them = 1 - me;
    const a = g.wagonsAlive(me), b = g.wagonsAlive(them);
    if (a !== b) return a < b;
    const ha = g.wagonHp(me), hb = g.wagonHp(them);
    if (ha !== hb) return ha < hb;
    return g.ownedRows(me) < g.ownedRows(them);
  }
  pushCols(g: Game, me: number): number[] {
    const c = this.pickPushCenter(g, me);
    return [c - 1, c, c + 1].filter(cc => cc >= 0 && cc < 8);
  }

  plan(g: Game, me: number): any {
    const cfg = this.cfg;
    let mode = cfg.mode;
    let mine = 0, theirs = 0;
    for (const u of g.onBoard(me)) mine += g.costs[u.arch] + u.hp;
    for (const u of g.onBoard(1 - me)) theirs += g.costs[u.arch] + u.hp;
    const convert = mine >= cfg.convert_mult * Math.max(1, theirs);
    if (mode === 'sandbag' && g.round > cfg.sandbag_until) mode = 'push';
    if ((mode === 'auto' || mode === 'hold') && g.round >= this.clock(g, 'desperation_round') && this.behind(g, me)) mode = 'push';
    if ((mode === 'auto' || mode === 'hold') && g.round >= this.clock(g, 'force_push_round')) mode = 'push';
    if (convert && mode !== 'runner') mode = 'push';
    if (mode === 'auto') mode = mine >= cfg.push_margin * theirs ? 'push' : 'hold';
    this._convert = convert;
    const plan: any = { mode, convert, threats: this.threatenedCols(g, me) };
    if (mode === 'push' || mode === 'runner') {
      plan.push_cols = this.pushCols(g, me);
      const live = g.wagons[1 - me].filter(w => w.hp > 0);
      if (live.length) {
        const center = plan.push_cols[Math.floor(plan.push_cols.length / 2)];
        plan.wagon_target = argminTuple(live, w => [Math.abs(w.col - center), w.col]).col;
      }
    }
    return plan;
  }

  orders(g: Game, me: number, _pulse: number): Record<number, any> {
    const plan = this.plan(g, me);
    const out: Record<number, any> = {};
    const defenders = this._assignDefenders(g, me, plan);
    const load: Record<string, number> = {};
    for (const u of g.onBoard(me)) out[u.uid] = this._unitOrder(g, me, u, plan, defenders, load);
    return out;
  }

  _assignDefenders(g: Game, me: number, plan: any): Record<number, number> {
    const res: Record<number, number> = {};
    const used = new Set<number>();
    for (const c of plan.threats) {
      let best: Unit | null = null, bestd: number | null = null;
      for (const u of g.onBoard(me)) {
        if (used.has(u.uid) || g.beyondOwn(u)) continue;
        const d = Math.abs(u.pos![0] - c) + 0.1 * g.costs[u.arch];
        if (bestd === null || d < bestd) { best = u; bestd = d; }
      }
      if (best !== null && bestd !== null && bestd <= 3.5) { res[best.uid] = c; used.add(best.uid); }
    }
    if (this.cfg.rearguard && plan.mode === 'push') {
      let reserve = 0;
      for (const e of g.onBoard(1 - me)) if (g.territoryOf(e.pos!) === 1 - me) reserve++;
      const myWagons = [...new Set(g.wagons[me].filter(w => w.hp > 0).map(w => w.col))].sort((a, b) => a - b);
      let want = Math.min(this.cfg.rearguard, Math.floor(reserve / 2), myWagons.length);
      for (const c of myWagons) {
        if (want <= 0) break;
        if (Object.values(res).includes(c)) continue;
        let best: Unit | null = null, bestd: number | null = null;
        for (const u of g.onBoard(me)) {
          if (used.has(u.uid) || g.beyondOwn(u)) continue;
          const d = Math.abs(u.pos![0] - c) + 0.1 * g.costs[u.arch];
          if (bestd === null || d < bestd) { best = u; bestd = d; }
        }
        if (best !== null) { res[best.uid] = c; used.add(best.uid); want--; }
      }
    }
    return res;
  }

  _targetScore(g: Game, me: number, u: Unit, t: Unit, charge = false): number {
    const est = g.attackDamage(u, t, charge, !charge);
    const kill = est >= t.hp;
    return (kill ? 10 : 0) + 2 * (COUNTERS[u.arch] === t.arch ? 1 : 0) + (6 - t.hp) * 0.5 + est
      + (t.uid === (g.standard_bearer[1 - me] ?? -1) ? 3 : 0) + (t.arch === 'hero' ? 2 : 0)
      + this.tb('tgt', u.uid, t.uid);
  }

  _attackAllowed(g: Game, me: number, t: Unit): boolean {
    let scope = this.cfg.attack_scope;
    if (this._convert) scope = 'any';
    if (scope === 'any') return true;
    const inMine = g.territoryOf(t.pos!) === me;
    if (scope === 'own_half') return inMine;
    if (scope === 'own_half_superior') {
      if (!inMine) return false;
      let mine = 0, theirs = 0;
      for (const v of g.onBoard(me)) if (manh(v.pos!, t.pos!) <= 2) mine++;
      for (const v of g.onBoard(1 - me)) if (manh(v.pos!, t.pos!) <= 2) theirs++;
      return mine >= theirs + 1;
    }
    return true;
  }

  bfs(g: Game, u: Unit, maxSteps: number): Map<string, Pos[]> {
    if (maxSteps <= 0) return new Map([[bkey(u.pos!), []]]);
    const zoc = new Set<string>();
    for (const v of g.onBoard(1 - u.owner)) for (const nb of neighbors(v.pos!)) zoc.add(bkey(nb));
    const visited = new Map<string, Pos[]>([[bkey(u.pos!), []]]);
    let frontier: [Pos, Pos[]][] = [[u.pos!, []]];
    for (let i = 0; i < maxSteps; i++) {
      const nxt: [Pos, Pos[]][] = [];
      for (const [pos, path] of frontier) {
        if (bkey(pos) !== bkey(u.pos!) && zoc.has(bkey(pos))) continue;
        for (const nb of neighbors(pos)) {
          if (visited.has(bkey(nb)) || g.occupied(nb)) continue;
          const np = [...path, nb];
          visited.set(bkey(nb), np); nxt.push([nb, np]);
        }
      }
      frontier = nxt;
    }
    return visited;
  }

  _unitOrder(g: Game, me: number, u: Unit, plan: any, defenders: Record<number, number>, load: Record<string, number>): any {
    const cfg = this.cfg;
    const adjEnemies: Unit[] = [];
    for (const nb of neighbors(u.pos!)) {
      const uid = g.board.get(bkey(nb));
      if (uid !== undefined && g.units.get(uid)!.owner !== me) adjEnemies.push(g.units.get(uid)!);
    }
    if (u.arch === 'siege') return this._siegeOrder(g, me, u, plan);
    if (u.arch === 'archer') {
      const shots = g.onBoard(1 - me).filter(t => manh(u.pos!, t.pos!) === 2 && this._attackAllowed(g, me, t));
      if (shots.length) return ['SHOOT', ['U', argmax(shots, t => this._targetScore(g, me, u, t)).uid]];
      if (adjEnemies.length) {
        const t = argmax(adjEnemies, t => this._targetScore(g, me, u, t));
        if (this._attackAllowed(g, me, t)) return ['MELEE', t.uid, []];
      }
      return this._moveOrder(g, me, u, plan, defenders, load, 2);
    }
    if (u.arch === 'cav' && !u.exhausted) {
      const ch = this._findCharge(g, me, u);
      if (ch !== null) return ch;
    }
    if (adjEnemies.length) {
      const cands = adjEnemies.filter(t => this._attackAllowed(g, me, t));
      if (cands.length) return ['MELEE', argmax(cands, t => this._targetScore(g, me, u, t)).uid, []];
    }
    const reach = this.bfs(g, u, u.mv);
    let best: [number, Unit, Pos[]] | null = null;
    for (const t of g.onBoard(1 - me)) {
      if (!this._attackAllowed(g, me, t)) continue;
      for (const land of neighbors(t.pos!)) {
        if (bkey(land) === bkey(u.pos!)) continue;
        const path = reach.get(bkey(land));
        if (path !== undefined) {
          let s = this._targetScore(g, me, u, t) - 0.3 * path.length;
          if (t.arch === 'spear' && t.braced && u.arch === 'cav') s -= 6;
          if (best === null || s > best[0]) best = [s, t, path];
        }
      }
    }
    if (best !== null && best[0] > 1.5) return ['MELEE', best[1].uid, best[2]];
    if (u.arch === 'spear' && !u.exhausted) {
      const near = g.onBoard(1 - me).some(t => manh(u.pos!, t.pos!) <= cfg.brace_radius);
      const holding = plan.mode === 'hold' || !g.beyondOwn(u);
      if (near && holding && !(u.uid in defenders)) return ['BRACE'];
    }
    return this._moveOrder(g, me, u, plan, defenders, load, 0, reach);
  }

  _findCharge(g: Game, me: number, u: Unit): any {
    const reach = this.bfs(g, u, u.mv);
    let best: [number, Unit, Pos[]] | null = null;
    for (const t of g.onBoard(1 - me)) {
      if (!this._attackAllowed(g, me, t)) continue;
      if (t.arch === 'spear' && t.braced) continue;
      if (g.terrain_on && g.ttype.get(bkey(t.pos!)) === 'woods') continue;
      for (const land of neighbors(t.pos!)) {
        const path = reach.get(bkey(land));
        if (path === undefined || path.length < g.C.CHARGE_MOVE_MIN) continue;
        const s = this._targetScore(g, me, u, t, true) - 0.2 * path.length;
        if (best === null || s > best[0]) best = [s, t, path];
      }
    }
    if (best !== null && best[0] > 2) return ['CHARGE', best[1].uid, best[2]];
    return null;
  }

  _siegeOrder(g: Game, me: number, u: Unit, plan: any): any {
    const cfg = this.cfg;
    if (plan.mode === 'push') {
      for (const c of plan.push_cols ?? []) {
        if (g.palisades.get(c) === 1 - me) {
          const k = g.stakes[c];
          if (([[c, k - 1], [c, k]] as Pos[]).some(t => u.rmin <= manh(u.pos!, t) && manh(u.pos!, t) <= u.rmax))
            return ['SHOOT', ['P', c]];
        }
      }
    }
    if ((cfg.wagon_hunt || plan.convert) && g.capRemaining(me) > 0) {
      for (let i = 0; i < g.wagons[1 - me].length; i++) {
        const w = g.wagons[1 - me][i];
        if (w.hp <= 0) continue;
        const wpos: Pos = [w.col, g.backRow(1 - me)];
        if (u.rmin <= manh(u.pos!, wpos) && manh(u.pos!, wpos) <= u.rmax) return ['SHOOT', ['W', 1 - me, i]];
      }
    }
    const shots = g.onBoard(1 - me).filter(t =>
      u.rmin <= manh(u.pos!, t.pos!) && manh(u.pos!, t.pos!) <= u.rmax && this._attackAllowed(g, me, t));
    if (shots.length) return ['SHOOT', ['U', argmax(shots, t => this._targetScore(g, me, u, t)).uid]];
    return this._moveOrder(g, me, u, plan, {}, {}, 2);
  }

  _moveOrder(g: Game, me: number, u: Unit, plan: any, defenders: Record<number, number>, load: Record<string, number>, standoff = 0, reach?: Map<string, Pos[]>): any {
    const cfg = this.cfg;
    const goal = this._goalTile(g, me, u, plan, defenders, load);
    if (goal === null) return ['HOLD'];
    if (reach === undefined) reach = this.bfs(g, u, u.mv);
    const enemies = g.onBoard(1 - me);
    let best: [Pos, Pos[]] | null = null, bests: number | null = null;
    for (const [k, path] of reach) {
      const pos = k.split(',').map(Number) as Pos;
      const d = manh(pos, goal);
      let s = -d;
      if (standoff && enemies.length) {
        const nd = Math.min(...enemies.map(t => manh(pos, t.pos!)));
        if (nd < standoff) s -= (standoff - nd) * 2;
      }
      if (cfg.avoid_lone && g.territoryOf(pos) !== me) {
        const buddy = g.onBoard(me).some(v => v.uid !== u.uid && v.owner === me && manh(v.pos!, pos) <= g.C.LONE_RUNNER_RADIUS);
        if (!buddy) s -= 4;
      }
      s += 0.1 * this.tb('mv', u.uid, pos);
      if (bests === null || s > bests) { best = [pos, path]; bests = s; }
    }
    if (best === null || !best[1].length) return ['HOLD'];
    return ['MOVE', best[1]];
  }

  _goalTile(g: Game, me: number, u: Unit, plan: any, defenders: Record<number, number>, load: Record<string, number>): Pos | null {
    const cfg = this.cfg;
    if (u.uid in defenders) { const c = defenders[u.uid]; return [c, this.ownFrontRow(g, me, c)]; }
    const mode = plan.mode;
    if (mode === 'sandbag') {
      let keep = [...new Set(g.wagons[me].filter(w => w.hp > 0).map(w => w.col))].sort((a, b) => a - b);
      if (!keep.length) keep = [3];
      const c = argmin(keep, c => Math.abs(c - u.pos![0]));
      return [c, this.ownFrontRow(g, me, c)];
    }
    if (mode === 'runner' && u.arch === 'cav') {
      const c = argmin([...Array(8).keys()], c =>
        g.onBoard(1 - me).filter(v => v.pos![0] === c).length + 0.1 * this.tb('run', u.uid, c));
      return [c, g.backRow(1 - me)];
    }
    if (mode === 'push' || mode === 'runner') {
      const cols = (plan.push_cols && plan.push_cols.length) ? plan.push_cols : [3, 4];
      const c = argmin(cols, (c: number) => Math.abs(c - u.pos![0]) + 0.7 * (load[String(c)] ?? 0));
      load[String(c)] = (load[String(c)] ?? 0) + 1;
      if (plan.convert || g.round >= this.clock(g, 'breach_round') || this.stakeAtMax(g, me, c)) {
        const wc = plan.wagon_target;
        if (wc !== undefined && wc !== null) {
          const n = load['breach'] ?? 0;
          load['breach'] = n + 1;
          const offs = [0, 1, -1, 0, 1, -1, 2, -2][n % 8];
          const col = Math.max(0, Math.min(7, wc + offs));
          const r = g.backRow(1 - me) - this.dirn(me);
          return [col, r];
        }
        return [c, g.backRow(1 - me)];
      }
      const depth = cfg.depth;
      let r = this.firstBeyondRow(g, me, c) + (depth - 1) * this.dirn(me);
      r = Math.max(0, Math.min(7, r));
      return [c, r];
    }
    const danger = this.dangerCols(g, me);
    let hot = [...Array(8).keys()].filter(c => danger[c] > 0);
    if (!hot.length) hot = [u.pos![0]];
    const c = argmin(hot, (c: number) => Math.abs(c - u.pos![0]) + 0.7 * (load[String(c)] ?? 0));
    load[String(c)] = (load[String(c)] ?? 0) + 1;
    return [c, this.ownFrontRow(g, me, c)];
  }

  intervention(g: Game, me: number, wno: number): any {
    const C = g.C, trib = g.res[me].tribute;
    if (wno <= 2 && trib >= C.SHIELDBEARER_COST) {
      const s = g.standardUnit(me);
      if (s !== null && s.hp <= 4) {
        let adjE = 0;
        for (const nb of neighbors(s.pos!)) {
          const uid = g.board.get(bkey(nb));
          if (uid !== undefined && g.units.get(uid)!.owner !== me) adjE++;
        }
        const adjF = neighbors(s.pos!).some(nb => {
          const uid = g.board.get(bkey(nb));
          if (uid === undefined) return false;
          const v = g.units.get(uid)!;
          return v.owner === me && (v.arch === 'spear' || v.arch === 'sword');
        });
        if (adjE >= 2 && adjF && !g.wards.some(w => w.uid === s.uid && w.active)) return ['SHIELDBEARER', s.uid];
      }
    }
    if (wno === 3 && trib >= C.SURGE_COST) {
      for (const c of this.threatenedCols(g, me)) {
        for (const u of g.onBoard(me)) {
          if (!g.unbroken(u)) continue;
          for (const nb of neighbors(u.pos!)) {
            if (g.occupied(nb) || !inBounds(nb)) continue;
            if (nb[0] === c && g.territoryOf(nb) === me) return ['SURGE', u.uid, nb];
          }
        }
      }
      for (let c = 0; c < 8; c++) {
        const [p1c, p2c] = g.columnClaims(c);
        const myclaim = me === 0 ? p1c : p2c;
        if (myclaim) continue;
        let clear = true;
        for (const v of g.onBoard(1 - me))
          if (v.pos![0] === c && g.territoryOf(v.pos!) === 1 - me && g.unbroken(v)) { clear = false; break; }
        if (!clear) continue;
        for (const u of g.onBoard(me)) {
          if (u.exhausted || g.beyondOwn(u)) continue;
          for (const nb of neighbors(u.pos!)) {
            if (g.occupied(nb)) continue;
            if (nb[0] === c && g.territoryOf(nb) !== me) {
              const buddy = g.onBoard(me).some(v => v.uid !== u.uid && v.owner === me && manh(v.pos!, nb) <= g.C.LONE_RUNNER_RADIUS);
              if (buddy) return ['SURGE', u.uid, nb];
            }
          }
        }
      }
    }
    return null;
  }

  trampleChoice(g: Game, _me: number, _pos: Pos, field: any): string {
    if (this.cfg.trample === 'raid') return 'raid';
    if (this.cfg.trample === 'annex') {
      if (field.type === 'crop' && g.round >= g.C.EXHAUSTION_START_ROUND - 2) return 'raid';
      return 'annex';
    }
    return 'raid';
  }

  lastStand(g: Game, _me: number): number {
    if (g.reserve(_me).length >= 2) return 1;
    if (this.cfg.mode === 'hold') return 3;
    return 2;
  }

  entrenchCols(g: Game, me: number): number[] {
    const danger = this.dangerCols(g, me);
    return [...Array(8).keys()].filter(c => !g.palisades.has(c))
      .sort((a, b) => tupleCmp([-danger[a], this.tb('ent', a)], [-danger[b], this.tb('ent', b)]));
  }

  promoT2(_g: Game, _me: number, unit: Unit): string {
    return unit.arch === 'spear' || unit.arch === 'hero' ? 'guard' : 'atk';
  }

  breachTarget(_g: Game, _me: number, _u: Unit, tied: [number, any][]): number {
    return argminTuple(tied, iw => [iw[1].hp, iw[1].col])[0];
  }

  artifactPick(g: Game, me: number, options: number[]): number {
    const cropShort = this._projCropIncome(g, me) < g.onBoard(me).length;
    const m = this.cfg.mode;
    let pref: number[];
    if (m === 'push' || m === 'runner' || m === 'sandbag')
      pref = cropShort ? [2, 1, 4, 7, 6, 3, 8, 5] : [1, 4, 7, 3, 6, 2, 8, 5];
    else pref = cropShort ? [2, 8, 5, 1, 3, 6, 4, 7] : [8, 5, 1, 3, 2, 6, 4, 7];
    for (const aid of pref) if (options.includes(aid)) return aid;
    return options[0];
  }

  artifactWagon(g: Game, p: number, _aid: number): number {
    // A2: pick which living wagon to attach an artifact to.
    // Fewest artifacts wins; ties broken by lowest wagon index. -1 if none living.
    const live = g.wagons[p]
      .map((w, i) => ({ w, i }))
      .filter(x => x.w.hp > 0);
    if (!live.length) return -1;
    return argminTuple(live, x => [x.w.artifacts.length, x.i]).i;
  }

  routAllocate(g: Game, _me: number, victim: number, dmg: number): number[] {
    const hp = new Map<number, number>();
    g.wagons[victim].forEach((w, i) => { if (w.hp > 0) hp.set(i, w.hp); });
    const picks: number[] = [];
    for (let d = 0; d < dmg; d++) {
      if (!hp.size) break;
      const i = argminTuple([...hp.keys()], i => [hp.get(i)!, i]);
      picks.push(i); hp.set(i, hp.get(i)! - 1); if (hp.get(i)! <= 0) hp.delete(i);
    }
    return picks;
  }
}

export function makeBot(name: string): Policy { return new Policy(name); }
