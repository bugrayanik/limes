// Policy bots — TS port of sim/bots.py.
// Phase 0 scope: setup() + the Muster decision methods (feedOrder / build /
// reinforce / standardBearer) and their tactical helpers. The opening and the
// muster decisions are reproduced byte-for-byte against the Python oracle via
// web/parity/check_parity.ts (post-setup + per-phase 'muster' hash).

import type { Game, Pos, Unit } from './engine';
import { manh, inBounds, neighbors } from './engine';

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
}

export function makeBot(name: string): Policy { return new Policy(name); }
