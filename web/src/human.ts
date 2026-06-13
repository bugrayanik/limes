// HumanPolicy — bridges UI-collected decisions into the engine's Policy
// interface. The engine calls these synchronously inside playRound() sub-steps;
// the interactive controller (controller.ts) stages each decision BEFORE the
// corresponding engine call, then the engine reads it here. Deep/rare choices
// (trample/lastStand/promo/rout/breach/artifact) fall back to a base policy so
// the game always resolves; the main per-turn play (economy, combat,
// interventions) is fully human-driven.
import { Policy } from './bots';
import type { ReinforcePlan, BuildAct } from './bots';
import type { Game, Pos, Unit } from './engine';

export type Order =
  | ['HOLD'] | ['BRACE']
  | ['MOVE', Pos[]]
  | ['MELEE', number, Pos[]]
  | ['CHARGE', number, Pos[]]
  | ['SHOOT', ['U', number] | ['W', number, number] | ['P', number]];

const EMPTY_REINFORCE: ReinforcePlan = { unlocks: [], recruits: [], repositions: [], rush: [], tribute_spend: 0 };

export class HumanPolicy extends Policy {
  // staged per-phase decisions (set by the controller, cleared after use)
  pendingFeed: number[] | null = null;
  pendingBuild: BuildAct[] | null = null;
  pendingReinforce: ReinforcePlan | null = null;
  pendingSB: number | null = null;
  pendingOrders: Record<number, Record<number, Order>> = {};
  pendingIntervention: Record<number, any> = {};
  // strategy preferences for interleaved mid-resolution choices
  tramplePref: 'annex' | 'raid' = 'annex';

  constructor(public label = 'You') { super('HONEST'); }

  // — Muster —
  feedOrder(g: Game, me: number): number[] { return this.pendingFeed ?? super.feedOrder(g, me); }
  build(_g: Game, _me: number): BuildAct[] { return this.pendingBuild ?? []; }
  reinforce(_g: Game, _me: number): ReinforcePlan { return this.pendingReinforce ?? { ...EMPTY_REINFORCE }; }
  standardBearer(_g: Game, _me: number): number | null { return this.pendingSB; }

  // — Clash —
  orders(_g: Game, _me: number, pulse: number): Record<number, any> { return this.pendingOrders[pulse] ?? {}; }
  intervention(_g: Game, _me: number, wno: number): any { return this.pendingIntervention[wno] ?? null; }

  // — interleaved: human strategy preference, no pause needed —
  trampleChoice(g: Game, _me: number, _pos: Pos, field: any): string {
    if (this.tramplePref === 'raid') return 'raid';
    if (field.type === 'crop' && g.round >= g.C.EXHAUSTION_START_ROUND - 2) return 'raid';
    return 'annex';
  }

  clearPhase() {
    this.pendingFeed = null; this.pendingBuild = null; this.pendingReinforce = null;
    this.pendingSB = null; this.pendingOrders = {}; this.pendingIntervention = {};
  }
}

// ── Legal-action helpers for the UI (mirror the engine's own validation) ──
import { manh, neighbors, inBounds } from './engine';

const bkey = (p: Pos) => `${p[0]},${p[1]}`;

// Reachable tiles → path, ZoC-terminal (same shape as Policy.bfs). Used for
// move/melee/charge highlighting.
export function reachable(g: Game, u: Unit, maxSteps: number): Map<string, Pos[]> {
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

// The set of orders a unit can legally issue right now, for building the UI.
export interface LegalActions {
  moves: Map<string, Pos[]>;          // dest key → path (MOVE)
  meleeTargets: { uid: number; path: Pos[] }[];  // adjacent-after-move enemies
  shootTargets: number[];             // enemy uids in range (archer/siege)
  chargeTargets: { uid: number; path: Pos[] }[];
  canBrace: boolean;
}

export function legalActions(g: Game, u: Unit): LegalActions {
  const mv = u.braced ? 0 : u.mv;
  const reach = reachable(g, u, mv);
  const moves = new Map<string, Pos[]>();
  for (const [k, path] of reach) if (path.length) moves.set(k, path);

  const meleeTargets: { uid: number; path: Pos[] }[] = [];
  const chargeTargets: { uid: number; path: Pos[] }[] = [];
  const shootTargets: number[] = [];

  if (u.arch === 'archer' || u.arch === 'siege') {
    for (const t of g.onBoard(1 - u.owner))
      if (u.rmin <= manh(u.pos!, t.pos!) && manh(u.pos!, t.pos!) <= u.rmax) shootTargets.push(t.uid);
  }
  if (u.arch !== 'siege') {
    for (const t of g.onBoard(1 - u.owner)) {
      // adjacent now → melee in place; else reach a tile adjacent to target
      if (manh(u.pos!, t.pos!) === 1) { meleeTargets.push({ uid: t.uid, path: [] }); continue; }
      let best: Pos[] | null = null;
      for (const land of neighbors(t.pos!)) {
        const path = reach.get(bkey(land));
        if (path && (best === null || path.length < best.length)) best = path;
      }
      if (best) meleeTargets.push({ uid: t.uid, path: best });
    }
  }
  if (u.arch === 'cav' && !u.exhausted) {
    for (const t of g.onBoard(1 - u.owner)) {
      if (t.arch === 'spear' && t.braced) continue;
      let best: Pos[] | null = null;
      for (const land of neighbors(t.pos!)) {
        const path = reach.get(bkey(land));
        if (path && path.length >= g.C.CHARGE_MOVE_MIN && (best === null || path.length < best.length)) best = path;
      }
      if (best) chargeTargets.push({ uid: t.uid, path: best });
    }
  }
  return { moves, meleeTargets, shootTargets, chargeTargets, canBrace: u.arch === 'spear' && !u.braced };
}

export { bkey, inBounds };
