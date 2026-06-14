// Interactive turn-loop controller. Drives the REAL engine phase-by-phase,
// pausing for human input. It does not reimplement any rule — it calls the same
// musterPlayer / interventionWindow / runPulse / frontier / caravan the engine
// uses (so play is identical to the parity-verified sim), staging each human
// decision into a HumanPolicy just before the engine reads it.
import { Game, GameOver, ClashEnd, V3_CONFIG } from './engine';
import type { Pos, Unit } from './engine';
import { makeBot } from './bots';
import type { Policy, ReinforcePlan, BuildAct } from './bots';
import { HumanPolicy, legalActions } from './human';
import type { Order } from './human';
import { renderBoard, ARCH_LABEL, TRIBE_COLOR } from './render';
import { guideButtonHTML, wireGuideButton } from './guide';
import { Board3D } from './three/board3d';

export interface GameConfig {
  mode: 'bot' | 'hotseat';
  humanSeat: number;        // which seat the human takes in 'bot' mode
  botName: string;          // opponent policy in 'bot' mode
  p0tribe: string; p1tribe: string;
  seed: number;
  view?: '2d' | '3d';       // board renderer (default 3d)
  demo?: boolean;           // AI-vs-AI auto-play (watch mode)
}

const bkey = (p: Pos) => `${p[0]},${p[1]}`;
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
class DemoRewind extends Error {}   // control-flow signal to rewind the demo

// The 8 Caravan artifacts (matches engine applyArtifact aids + the Guide gallery).
const ARTIFACTS: Record<number, { icon: string; name: string; desc: string }> = {
  1: { icon: '🛡', name: 'Supply Cache', desc: '+4 Supply now' },
  2: { icon: '🌾', name: 'Granary', desc: '+4 Crop now' },
  3: { icon: '⚜', name: "Hero's Aegis", desc: '+1 Guard to your Hero (permanent)' },
  4: { icon: '⭐', name: "Veteran's Mark", desc: '+2 XP to your strongest unit' },
  5: { icon: '🪵', name: 'Palisade', desc: 'Free wall on a key column' },
  6: { icon: '◆', name: 'War Chest', desc: '+2 Tribute' },
  7: { icon: '🏷', name: 'Levy', desc: 'Next recruits cost less' },
  8: { icon: '🌱', name: 'Homestead', desc: 'Auto-builds a crop/supply field' },
};
const UNLOCK_COST = (n: number, C: any) => ({ 2: C.UNLOCK_3RD, 3: C.UNLOCK_4TH, 4: C.UNLOCK_5TH } as any)[n];

export class Controller {
  g!: Game;
  policies!: Policy[];
  cfg!: GameConfig;
  banner = '';
  log: string[] = [];
  // transient muster staging
  private mBuild: BuildAct[] = [];
  private mPlan!: ReinforcePlan;
  private mMode: { kind: 'recruit' | 'field' | 'palisade' | 'reposition' | null; arch?: string; ftype?: string; uid?: number } = { kind: null };
  // transient clash staging
  private cOrders = new Map<number, Order>();
  private cSel: number | null = null;

  onChange: (() => void) | null = null;   // tutorial coach hook, fired after each render

  // 3D board view (default) — a persistent canvas the controller drives
  private board3d?: Board3D;
  private shell?: { banner: HTMLElement; phasebar: HTMLElement; hud: HTMLElement; hint: HTMLElement; panel: HTMLElement; log: HTMLElement };
  private get use3d() { return this.cfg.view !== '2d'; }

  constructor(private root: HTMLElement) {}

  // — read-only state for the tutorial coach —
  get phaseKind(): 'muster' | 'clash' | 'iv' | 'other' {
    if (this.banner.includes('Muster')) return 'muster';
    if (this.banner.includes('Clash')) return 'clash';
    if (this.banner.includes('Intervention')) return 'iv';
    return 'other';
  }
  get round() { return this.g.round; }
  get bannerText() { return this.banner; }
  get musterModeKind() { return this.mMode.kind; }
  get stagedRecruitCount() { return this.mPlan?.recruits.length ?? 0; }
  get stagedBuildCount() { return this.mBuild?.length ?? 0; }
  get selectedUid() { return this.cSel; }
  get orderCount() { return this.cOrders.size; }

  isHuman(p: number): boolean {
    if (this.cfg.demo) return false;          // watch mode: both seats are bots
    return this.cfg.mode === 'hotseat' || p === this.cfg.humanSeat;
  }
  private demoSpeed = 1;
  private demoPaused = false;
  private demoSeek: number | null = null;     // target round for back/restart
  private async demoStep(weight = 1) {
    if (!this.cfg.demo) return;
    this.render();
    let waited = 0; const total = (1500 * weight) / this.demoSpeed;   // 1× is a slow, watchable pace
    do {
      if (this.demoSeek !== null) throw new DemoRewind();   // back/restart requested
      await this.pause(90); waited += 90;
    } while (this.demoPaused || waited < total);
  }
  // Deterministic seek: rebuild a fresh game from the seed and fast-forward to
  // any round. Returns a GameOver if the target is past the game's end.
  private demoGoTo(target: number): GameOver | null {
    const pol = [0, 1].map(p => makeBot(this.cfg.botName));
    pol.forEach((b, p) => b.reset(this.cfg.seed, p));
    const g = new Game(pol, this.cfg.seed, V3_CONFIG);
    g.setup();
    const draft: { p: number; aid: number; round: number }[] = [];
    let over: GameOver | null = null;
    try {
      while (g.round < target) {
        const r = g.round;
        g.playRound();
        if (r === g.C.CARAVAN_ROUND_1 || r === g.C.CARAVAN_ROUND_2)
          for (const x of g.last_artifacts) {
            const n = draft.filter(a => a.p === x.p).length;
            draft.push({ ...x, round: r, wagon: n % 3 });
          }
      }
    } catch (e) { if (e instanceof GameOver) over = e; else throw e; }
    this.policies = pol; this.g = g; this.caravanCard = ''; this.artifactDraft = draft;
    this.log = [`Round ${g.round} — ${cap(this.tribe(0))} vs ${cap(this.tribe(1))}.`];
    return over;
  }
  private async demoLoop() {
    for (;;) {
      try {
        await this.playRoundInteractive();
      } catch (e) {
        if (e instanceof GameOver) { this.winScreen(e.winner, e.wtype); return; }
        if (e instanceof DemoRewind) {
          const t = this.demoSeek ?? 1; this.demoSeek = null;
          const over = this.demoGoTo(Math.max(1, t));
          if (over) { this.winScreen(over.winner, over.wtype); return; }
          this.demoPaused = true; this.render(); continue;
        }
        throw e;
      }
    }
  }
  private onDemo(cmd: string) {
    if (cmd === 'exit') { location.reload(); return; }
    if (cmd === 'restart') { this.demoSeek = 1; return; }
    if (cmd === 'back') { this.demoSeek = Math.max(1, this.g.round - 1); return; }
    if (cmd === 'fwd') { this.demoSeek = this.g.round + 1; return; }
    if (cmd === 'pause') { this.demoPaused = !this.demoPaused; this.render(); return; }
    const n = Number(cmd); if (n) { this.demoSpeed = n; this.render(); }
  }
  private demoPanel(): string {
    const sp = (s: number, lbl: string) => `<button class="pbtn${this.demoSpeed === s ? ' on' : ''}" data-act="demo:${s}">${lbl}</button>`;
    return `<div class="prow"><span class="plabel">🤖 Watch AI</span>
      <button class="pbtn" data-act="demo:restart" title="Back to round 1">⏮</button>
      <button class="pbtn" data-act="demo:back" title="Back one round">◀ Round</button>
      <button class="pbtn confirm" data-act="demo:pause">${this.demoPaused ? '▶ Play' : '⏸ Pause'}</button>
      <button class="pbtn" data-act="demo:fwd" title="Forward one round">Round ▶</button>
      ${sp(0.5, '½×')}${sp(1, '1×')}${sp(2, '2×')}${sp(4, '4×')}
      <button class="pbtn" data-act="demo:exit" title="Exit to menu">⨯ Menu</button></div>
      <div class="prow demolog">${this.log.slice(-4).map(l => `<div>${l}</div>`).join('') || '…'}</div>`;
  }

  // ── Caravan artifact card (shown when artifacts are drafted) ──
  private caravanCard = '';
  private caravanOv?: HTMLElement;
  private artifactDraft: { p: number; aid: number; round: number; wagon: number }[] = [];
  // labels to float over each living wagon, from the drafted artifacts
  private wagonArtifactItems() {
    const g = this.g;
    const groups = new Map<string, { col: number; row: number; lines: string[] }>();
    for (const a of this.artifactDraft) {
      const w = g.wagons[a.p]?.[a.wagon];
      if (!w || w.hp <= 0) continue;
      const k = `${a.p},${a.wagon}`;
      if (!groups.has(k)) groups.set(k, { col: w.col, row: w.row, lines: [] });
      const art = ARTIFACTS[a.aid];
      if (art) groups.get(k)!.lines.push(`${art.icon} ${art.name}`);
    }
    return [...groups.values()];
  }
  private artifactStrip(): string {
    if (!this.artifactDraft.length) return '';
    const side = (p: number) => {
      const mine = this.artifactDraft.filter(x => x.p === p);
      if (!mine.length) return '';
      return `<span class="art-side" style="--c:${TRIBE_COLOR[this.tribe(p)] || '#c9a227'}"><b>${cap(this.tribe(p))}</b>${mine.map(x => {
        const a = ARTIFACTS[x.aid]; return a ? `<span class="art-chip" title="${a.name} — ${a.desc} (round ${x.round})">${a.icon} ${a.name} <i>${a.desc}</i></span>` : '';
      }).join('')}</span>`;
    };
    return `<div class="artbar"><span class="art-lbl">◆ Artifacts</span>${side(0)}${side(1)}</div>`;
  }
  private renderCaravan(picks: { p: number; aid: number }[], round: number): string {
    const side = (p: number) => {
      const mine = picks.filter(x => x.p === p);
      if (!mine.length) return '';
      return `<div class="cv-side" style="--c:${TRIBE_COLOR[this.tribe(p)] || '#c9a227'}">
        <div class="cv-who">${cap(this.tribe(p))}</div>
        ${mine.map(x => { const a = ARTIFACTS[x.aid]; return a ? `<div class="cv-art" title="${a.name} — ${a.desc}">
          <span class="cv-ic">${a.icon}</span><span class="cv-nm">${a.name}</span><span class="cv-ds">${a.desc}</span></div>` : ''; }).join('')}
      </div>`;
    };
    return `<div class="cv-card"><div class="cv-title">◆ Caravan — Round ${round}</div>
      <div class="cv-sides">${side(0)}${side(1)}</div>
      <div class="cv-foot">Artifacts drafted (trailing side picks first) · hover for the effect</div></div>`;
  }
  private syncCaravan() {
    if (!this.caravanOv) {
      this.caravanOv = document.createElement('div');
      this.caravanOv.className = 'caravan-ov';
      document.body.appendChild(this.caravanOv);
    }
    this.caravanOv.innerHTML = this.caravanCard;
    this.caravanOv.style.display = this.caravanCard ? 'flex' : 'none';
  }
  tribe(p: number): string { return p === 0 ? this.cfg.p0tribe : this.cfg.p1tribe; }
  human(p: number): HumanPolicy { return this.policies[p] as HumanPolicy; }

  start(cfg: GameConfig) { this.init(cfg); this.g.setup(); this.begin(); }

  // Start from a custom board (tutorial scenarios). `build` runs after setup().
  startScenario(cfg: GameConfig, build: (g: Game) => void) {
    this.init(cfg); this.g.setup(); build(this.g); this.begin();
  }

  private init(cfg: GameConfig) {
    this.cfg = cfg;
    this.policies = [0, 1].map(p =>
      this.isHuman(p) ? new HumanPolicy(cfg.mode === 'hotseat' ? `Player ${p + 1}` : 'You')
        : makeBot(cfg.botName));
    this.policies.forEach((b, p) => b.reset(cfg.seed, p));
    this.g = new Game(this.policies, cfg.seed, V3_CONFIG);   // shipping = validated V3 balance (18 rounds / golden goal 14)
  }

  private begin() {
    this.log = [`Round 1 — ${cap(this.tribe(0))} vs ${cap(this.tribe(1))}.`];
    this.mountTooltip();
    this.loop();
  }

  // — read-only extras for the tutorial coach —
  get stagedFieldCount() { return this.mBuild?.filter(a => a[0] === 'field').length ?? 0; }
  get hasAttackOrder() {
    for (const o of this.cOrders.values()) if (o[0] === 'MELEE' || o[0] === 'CHARGE' || o[0] === 'SHOOT') return true;
    return false;
  }

  // — hover tooltip showing unit stats —
  private tip?: HTMLElement;
  private mountTooltip() {
    if (this.tip) return;
    this.tip = document.createElement('div');
    this.tip.className = 'utip'; this.tip.style.display = 'none';
    document.body.appendChild(this.tip);
    // 2D board: tooltip driven by hovering the .cell DOM nodes. In 3D those
    // don't exist — the board3d onHover callback drives this.tip instead, so
    // skip this handler there (it would hide the tip on every mouse move).
    if (this.use3d) return;
    this.root.addEventListener('mousemove', e => {
      const cell = (e.target as HTMLElement).closest?.('.cell[data-uid]') as HTMLElement | null;
      if (!cell) { this.tip!.style.display = 'none'; return; }
      const u = this.g.units.get(Number(cell.dataset.uid));
      if (!u) { this.tip!.style.display = 'none'; return; }
      this.tip!.innerHTML = this.unitTooltip(u);
      this.tip!.style.display = 'block';
      this.tip!.style.left = Math.min(e.clientX + 14, window.innerWidth - 210) + 'px';
      this.tip!.style.top = (e.clientY + 14) + 'px';
    });
    this.root.addEventListener('mouseleave', () => { if (this.tip) this.tip.style.display = 'none'; });
  }
  private unitTooltip(u: Unit): string {
    const C = this.g.C;
    const beats = ({ spear: 'Cavalry', cav: 'Archers', archer: 'Spearmen' } as Record<string, string>)[u.arch];
    const rng = u.rmin === u.rmax ? `${u.rmax}` : `${u.rmin}–${u.rmax}`;
    const rank = u.tier2 ? ' <span class="utr">★★</span>' : u.tier1 ? ' <span class="utr">★</span>' : '';
    const states = [u.exhausted ? '∅ exhausted — fights weaker' : '', u.braced ? '⛨ braced — stops a charge' : ''].filter(Boolean).join(' · ');
    const next = u.tier2 ? '★★ max rank'
      : `XP ${u.xp}/${u.tier1 ? C.XP_TIER2 : C.XP_TIER1} → ${u.tier1 ? '★★' : '★'} (wound enemies to rank up)`;
    return `<b>${ARCH_LABEL[u.arch]}</b>${rank}
      <div class="utstats">
        <span class="utstat atk">⚔ Atk <b>${u.base_atk}</b></span>
        <span class="utstat">🛡 Guard <b>${u.base_guard}</b></span>
        <span class="utstat">❤️ HP <b>${u.hp}/${u.max_hp}</b></span>
        <span class="utstat">👟 Move <b>${u.mv}</b></span>
        <span class="utstat">🎯 Range <b>${rng}</b></span>
      </div>
      ${beats ? `<span class="utb">Beats ${beats} — +1 dmg into them</span>` : ''}
      <span class="utg">${next}</span>
      ${states ? `<span class="uts">${states}</span>` : ''}`;
  }

  // ── main loop ──────────────────────────────────────────────────────────
  private async loop() {
    if (this.cfg.demo) return this.demoLoop();
    try {
      for (;;) await this.playRoundInteractive();
    } catch (e) {
      if (e instanceof GameOver) this.winScreen(e.winner, e.wtype);
      else throw e;
    }
  }

  // mirror of engine.playRound(), pausing for human phases
  private async playRoundInteractive() {
    const g = this.g, C = g.C;
    g.cap_dmg = [0, 0]; g.wagon_dmg_round = [0, 0];
    g.rows_lost_round = [0, 0]; g.rows_taken_round = [0, 0]; g.unit_dmg_round = [0, 0];

    // Phase 1 — Muster (komi holder first)
    if (this.cfg.demo) { this.banner = '🤖 Demo — Muster'; await this.demoStep(0.8); }
    for (const p of [g.komi, 1 - g.komi]) {
      if (this.isHuman(p)) await this.humanMuster(p);
      g.musterPlayer(p);
    }
    if (this.cfg.demo) {
      // narrate each side's picks (recruits are face-down until Reveal)
      const sum = (p: number) => {
        const by: Record<string, number> = {};
        for (const u of g.units.values()) if (u.owner === p && u.face_down) by[u.arch] = (by[u.arch] || 0) + 1;
        const parts = Object.entries(by).map(([a, n]) => `${n}×${ARCH_LABEL[a]}`);
        return parts.length ? parts.join(' ') : 'held';
      };
      this.log.push(`⚒ Muster — ${cap(this.tribe(0))}: ${sum(0)} · ${cap(this.tribe(1))}: ${sum(1)}`);
      this.banner = '🤖 Demo — Muster';
      await this.demoStep(1.3);   // show what both sides mustered
    }
    // Phase 2 — Reveal
    for (const u of g.units.values()) u.face_down = false;
    // Phase 3 — Clash
    g.wards = [];
    try {
      if (this.cfg.demo) this.banner = '🤖 Demo — Clash, pulse 1';
      await this.doWindow(1); await this.doPulse(1);
      if (this.cfg.demo) this.banner = '🤖 Demo — Clash, pulse 2';
      await this.doWindow(2); await this.doPulse(2);
      await this.doWindow(3);
    } catch (e) { if (!(e instanceof ClashEnd)) throw e; }
    g.wards = [];
    // Phase 4 — Frontier
    g.frontier();
    const [l0, l1] = g.rows_lost_round;
    if (l0 !== l1) g.komi = l0 > l1 ? 0 : 1;
    // narrate what the frontier did, from the viewer's seat
    const me = this.cfg.mode === 'bot' ? this.cfg.humanSeat : 0;
    const them = 1 - me, parts: string[] = [];
    if (g.rows_taken_round[me]) parts.push(`you pushed ${g.rows_taken_round[me]} row(s) forward`);
    if (g.rows_lost_round[me]) parts.push(`you lost ${g.rows_lost_round[me]} row(s)`);
    if (g.wagon_dmg_round[me]) parts.push(`💥 you breached an enemy wagon!`);
    if (g.wagon_dmg_round[them]) parts.push(`⚠ the enemy breached your wagon!`);
    this.log.push(`Round ${g.round} frontier: ${parts.length ? parts.join(', ') : 'the lines held — no ground changed.'}`);
    if (this.cfg.demo) { this.banner = '🤖 Demo — Frontier'; await this.demoStep(1.2); }
    // golden goal
    if (g.round >= C.GOLDEN_GOAL_ROUND) {
      const t0 = g.rows_taken_round[0] > 0 || g.wagon_dmg_round[0] > 0;
      const t1 = g.rows_taken_round[1] > 0 || g.wagon_dmg_round[1] > 0;
      if (t0 || t1) {
        let w: number;
        if (t0 && t1) {
          if (g.rows_taken_round[0] !== g.rows_taken_round[1]) w = g.rows_taken_round[0] > g.rows_taken_round[1] ? 0 : 1;
          else if (g.wagon_dmg_round[0] !== g.wagon_dmg_round[1]) w = g.wagon_dmg_round[0] > g.wagon_dmg_round[1] ? 0 : 1;
          else w = g.komi;
        } else w = t0 ? 0 : 1;
        throw new GameOver(w, 'golden-goal');
      }
    }
    // Phase 5 — Pass & Tribute
    for (let p = 0; p < 2; p++) g.res[p].tribute += C.TRIBUTE_PER_ROW * g.rows_lost_round[p];
    if (g.round === C.CARAVAN_ROUND_1 || g.round === C.CARAVAN_ROUND_2) {
      g.caravan(g.round === C.CARAVAN_ROUND_1 ? 1 : 2);
      // remember them persistently + show prominently (with effects).
      // place each on a wagon (round-robin across this side's 3 wagons).
      for (const x of g.last_artifacts) {
        const n = this.artifactDraft.filter(a => a.p === x.p).length;
        this.artifactDraft.push({ ...x, round: g.round, wagon: n % 3 });
      }
      this.caravanCard = this.renderCaravan(g.last_artifacts, g.round);
      const names = (p: number) => g.last_artifacts.filter(x => x.p === p).map(x => ARTIFACTS[x.aid]?.name).join(', ') || '—';
      this.log.push(`◆ Caravan! ${cap(this.tribe(0))}: ${names(0)} · ${cap(this.tribe(1))}: ${names(1)}.`);
      if (this.cfg.demo) { this.banner = '🤖 Demo — ◆ Caravan'; await this.demoStep(3.0); }
      else { this.render(); await this.pause(3200); }
      this.caravanCard = ''; this.render();
    }
    if (g.round === 1) {
      const [r0, r1] = g.rows_taken_round;
      if (r0 !== r1) g.r1_winner = r0 > r1 ? 0 : 1;
      else if (g.unit_dmg_round[0] !== g.unit_dmg_round[1] && (!C.R1_REQUIRE_ENGAGE || Math.min(...g.unit_dmg_round) >= 1))
        g.r1_winner = g.unit_dmg_round[0] > g.unit_dmg_round[1] ? 0 : 1;
    }
    g.lead_trace.push(g.leadHolder());
    // hard stop
    if (g.round >= C.HARD_STOP_ROUND) {
      const a0 = g.wagonsAlive(0), a1 = g.wagonsAlive(1);
      if (a0 !== a1) throw new GameOver(a0 > a1 ? 0 : 1, 'ladder');
      const r0 = g.ownedRows(0), r1 = g.ownedRows(1);
      if (r0 !== r1) throw new GameOver(r0 > r1 ? 0 : 1, 'ladder');
      throw new GameOver(g.komi, 'ladder');
    }
    g.updateEntrench();
    g.round++;
    this.policies.forEach(b => (b as any).clearPhase?.());
  }

  // ── interventions (real Surge / Shieldbearer, or skip) ───────────────────
  private async doWindow(wno: number) {
    for (const p of [this.g.komi, 1 - this.g.komi]) {
      if (this.isHuman(p)) await this.humanIntervention(p, wno);
    }
    this.g.interventionWindow(wno);
    this.policies.forEach(b => { const h = b as HumanPolicy; if (h.pendingIntervention) h.pendingIntervention = {}; });
  }

  private async doPulse(pulse: number) {
    for (const p of [0, 1]) if (this.isHuman(p)) await this.humanClash(p, pulse);
    this.g.runPulse(pulse);
    const dead = [...this.g.units.values()].filter(u => u.pos === null && u.wounded_round === this.g.round);
    if (dead.length) this.log.push(`Pulse ${pulse}: ${dead.length} unit(s) fell.`);
    if (this.cfg.demo) { await this.demoStep(0.8); return; }
    this.render();
    await this.pause(550);
  }

  private pause(ms: number) { return new Promise<void>(r => setTimeout(r, ms)); }

  // ── HUMAN: Muster ────────────────────────────────────────────────────────
  private humanMuster(p: number): Promise<void> {
    this.banner = `${this.seatName(p)} — Muster`;
    this.mBuild = []; this.mPlan = { unlocks: [], recruits: [], repositions: [], rush: [], tribute_spend: 0 };
    this.mMode = { kind: null };
    return new Promise(resolve => {
      const done = () => {
        this.human(p).pendingBuild = this.mBuild;
        this.human(p).pendingReinforce = this.mPlan;
        resolve();
      };
      this.musterDone = done; this.musterPlayer = p;
      this.render();
    });
  }
  private musterDone: (() => void) | null = null;
  private musterPlayer = 0;

  // projected post-harvest budget (uses the engine's real formulas, display only)
  private musterBudget(p: number) {
    const g = this.g, C = g.C;
    const [hs, hc] = g.computeHarvest(p);
    let upkeep = 0;
    for (const u of g.onBoard(p)) upkeep += C.UPKEEP_CROP + (g.beyondOwn(u) ? C.SUPPLY_STRAIN_CROP : 0);
    let supply = g.res[p].supply + hs - this.spentSupply(p);
    let crop = g.res[p].crop + hc - upkeep;
    return { supply, crop };
  }
  private spentSupply(p: number) {
    const g = this.g, C = g.C; let s = 0;
    for (const a of this.mBuild) s += a[0] === 'field' ? C.FIELD_COST : C.PALISADE_COST;
    for (const u of this.mPlan.unlocks) { const n = g.unlocked[p].size + this.mPlan.unlocks.indexOf(u); s += UNLOCK_COST(n, C) ?? 0; }
    let ci = 0;
    for (const [arch] of this.mPlan.recruits) s += g.costs[arch] + C.COPY_SURCHARGE * (g.copies[arch] + ci++);
    return s - this.mPlan.tribute_spend;
  }

  private onCell(pos: Pos, uid?: number) {
    const g = this.g, p = this.banner.includes('Muster') ? this.musterPlayer : -1;
    if (p >= 0) return this.musterCell(p, pos, uid);
    // clash
    return this.clashCell(pos, uid);
  }

  private musterCell(p: number, pos: Pos, uid?: number) {
    const g = this.g, C = g.C, m = this.mMode;
    if (m.kind === 'palisade') { this.musterPalisade(pos[0]); return; }
    if (m.kind === 'recruit' && m.arch) {
      const rows = g.heartlandRows(p);
      if (rows.includes(pos[1]) && !g.occupied(pos) && !this.staged(pos)
        && this.mPlan.recruits.length < C.DEPLOY_MAX + g.extra_deploy[p]) {
        this.mPlan.recruits.push([m.arch, pos]);
      }
    } else if (m.kind === 'field' && m.ftype) {
      if (g.territoryOf(pos) === p && !g.fields.has(bkey(pos)) && !g.wagon_at.has(bkey(pos)) && !this.staged(pos)
        && this.mBuild.filter(a => a[0] === 'field' || a[0] === 'palisade').length < C.BUILD_ACTIONS) {
        this.mBuild.push(['field', pos, m.ftype]);
      }
    } else if (m.kind === 'reposition') {
      if (m.uid === undefined) { if (uid !== undefined && g.units.get(uid)!.owner === p && g.units.get(uid)!.pos) m.uid = uid; }
      else { if (g.territoryOf(pos) === p && !g.occupied(pos) && !this.staged(pos)
        && this.mPlan.repositions.length < C.REPOSITION_MAX) { this.mPlan.repositions.push([m.uid, pos]); m.uid = undefined; } }
    }
    this.render();
  }

  private staged(pos: Pos): boolean {
    return this.mBuild.some(a => a[0] === 'field' && bkey(a[1] as Pos) === bkey(pos))
      || this.mPlan.recruits.some(r => bkey(r[1]) === bkey(pos))
      || this.mPlan.repositions.some(r => bkey(r[1]) === bkey(pos));
  }

  // ── HUMAN: Clash ──────────────────────────────────────────────────────────
  private humanClash(p: number, pulse: number): Promise<void> {
    this.banner = `${this.seatName(p)} — Clash, pulse ${pulse}`;
    this.cOrders = new Map(); this.cSel = null; this.clashPlayer = p;
    return new Promise(resolve => {
      this.clashDone = () => {
        const dict: Record<number, Order> = {};
        for (const [uid, o] of this.cOrders) dict[uid] = o;
        this.human(p).pendingOrders[pulse] = dict;
        resolve();
      };
      this.render();
    });
  }
  private clashDone: (() => void) | null = null;
  private clashPlayer = 0;

  private clashCell(pos: Pos, uid?: number) {
    const g = this.g, p = this.clashPlayer;
    if (this.cSel === null) {
      if (uid !== undefined && g.units.get(uid)!.owner === p) this.cSel = uid;
    } else {
      const u = g.units.get(this.cSel)!;
      const la = legalActions(g, u);
      // clicking an enemy → attack; clicking a highlighted move tile → move; clicking self → brace toggle/deselect
      if (uid !== undefined && g.units.get(uid)!.owner !== p) {
        const ch = la.chargeTargets.find(t => t.uid === uid);
        const sh = la.shootTargets.includes(uid);
        const me = la.meleeTargets.find(t => t.uid === uid);
        if (sh) this.cOrders.set(u.uid, ['SHOOT', ['U', uid]]);
        else if (ch) this.cOrders.set(u.uid, ['CHARGE', uid, ch.path]);
        else if (me) this.cOrders.set(u.uid, ['MELEE', uid, me.path]);
        this.cSel = null;
      } else if (uid === this.cSel) { this.cSel = null; }
      else if (la.moves.has(bkey(pos))) { this.cOrders.set(u.uid, ['MOVE', la.moves.get(bkey(pos))!]); this.cSel = null; }
      else if (uid !== undefined && g.units.get(uid)!.owner === p) { this.cSel = uid; }
    }
    this.render();
  }

  // ── HUMAN: Interventions ──────────────────────────────────────────────────
  private humanIntervention(p: number, wno: number): Promise<void> {
    const g = this.g, C = g.C, trib = g.res[p].tribute;
    const canSurge = wno === 3 && trib >= C.SURGE_COST;
    const canShield = wno <= 2 && trib >= C.SHIELDBEARER_COST;
    if (!canSurge && !canShield) return Promise.resolve();
    this.banner = `${this.seatName(p)} — Intervention window ${wno}`;
    return new Promise(resolve => {
      this.ivResolve = resolve; this.ivPlayer = p; this.ivWno = wno;
      this.ivSel = null;
      this.render();
    });
  }
  private ivResolve: (() => void) | null = null;
  private ivPlayer = 0; private ivWno = 0; private ivSel: { kind: string; uid?: number } | null = null;

  // ── rendering ──────────────────────────────────────────────────────────
  render() {
    this.syncCaravan();
    if (this.use3d) return this.render3d();
    const g = this.g;
    this.root.innerHTML = `
      <div class="topbar"><div class="phase-banner">${this.banner}</div>${guideButtonHTML()}</div>
      <div class="phasebar">${this.phaseStepper()}</div>
      <div class="phase-hint">${this.phaseHint()}</div>
      ${renderBoard(g, { p0tribe: this.cfg.p0tribe, p1tribe: this.cfg.p1tribe })}
      <div class="panel">${this.panelHTML()}</div>
      <div class="gamelog">${this.log.slice(-4).map(l => `<div>${l}</div>`).join('')}</div>`;
    this.wireCells();
    this.wirePanel();
    wireGuideButton(this.root);
    this.paintOverlays();
    this.onChange?.();
  }

  // ── 3D render path: persistent canvas + DOM panels updated in place ──
  private mountShell() {
    this.root.innerHTML = `
      <div class="topbar"><div class="phase-banner"></div>${guideButtonHTML()}</div>
      <div class="phasebar"></div>
      <div class="reshud"></div>
      <div class="phase-hint"></div>
      <div id="board3d" class="board3d-wrap"></div>
      <div class="panel"></div>
      <div class="gamelog"></div>`;
    this.shell = {
      banner: this.root.querySelector('.phase-banner')!,
      phasebar: this.root.querySelector('.phasebar')!,
      hud: this.root.querySelector('.reshud')!,
      hint: this.root.querySelector('.phase-hint')!,
      panel: this.root.querySelector('.panel')!,
      log: this.root.querySelector('.gamelog')!,
    };
    this.board3d = new Board3D(this.root.querySelector('#board3d')!,
      { p0tribe: this.cfg.p0tribe, p1tribe: this.cfg.p1tribe });
    this.board3d.onClick(pos => this.onBoardClick(pos));
    this.board3d.onHover((pos, ev) => {
      const uid = pos ? this.g.board.get(bkey(pos)) : undefined;
      const u = uid !== undefined ? this.g.units.get(uid) : undefined;
      if (!u || !this.tip) { if (this.tip) this.tip.style.display = 'none'; return; }
      this.tip.innerHTML = this.unitTooltip(u);
      this.tip.style.display = 'block';
      this.tip.style.left = Math.min(ev.clientX + 14, window.innerWidth - 210) + 'px';
      this.tip.style.top = (ev.clientY + 14) + 'px';
    });
    wireGuideButton(this.root);
  }

  private render3d() {
    if (!this.board3d) this.mountShell();
    const s = this.shell!;
    s.banner.innerHTML = this.banner;
    s.phasebar.innerHTML = this.phaseStepper();
    s.hud.innerHTML = this.resourceHUD();
    s.hint.innerHTML = this.phaseHint();
    s.panel.innerHTML = this.panelHTML();
    s.log.innerHTML = this.log.slice(-4).map(l => `<div>${l}</div>`).join('');
    this.wirePanel();
    this.board3d!.update(this.g);
    this.board3d!.setWagonArtifacts(this.wagonArtifactItems());
    this.board3d!.setHighlights(this.computeHighlights());
    this.onChange?.();
  }

  private onBoardClick(pos: Pos) {
    if (this.cfg.demo) return;                  // watch mode: board isn't interactive
    const uid = this.g.board.get(bkey(pos));
    if (this.banner.includes('Intervention')) this.ivCell(pos, uid);
    else this.onCell(pos, uid);
  }

  // same highlight logic as paintOverlays, but as data for the 3D board
  private computeHighlights() {
    const g = this.g, hl: any = {};
    if (this.cfg.demo) return hl;                 // watch mode: no interaction highlights
    if (this.banner.includes('Clash') && this.cSel !== null) {
      const u = g.units.get(this.cSel)!;
      hl.selected = u.pos;
      const la = legalActions(g, u);
      hl.move = [...la.moves.keys()].map(k => k.split(',').map(Number) as Pos);
      hl.melee = la.meleeTargets.map(t => g.units.get(t.uid)!.pos as Pos);
      hl.shoot = la.shootTargets.map(uid => g.units.get(uid)!.pos as Pos);
      hl.charge = la.chargeTargets.map(t => g.units.get(t.uid)!.pos as Pos);
    }
    if (this.banner.includes('Muster')) {
      const p = this.musterPlayer;
      hl.stage = [...this.mPlan.recruits.map(r => r[1]),
        ...this.mBuild.filter(a => a[0] === 'field').map(a => a[1] as Pos),
        ...this.mPlan.repositions.map(r => r[1])];
      const m = this.mMode, valid: Pos[] = [];
      if (m.kind === 'recruit') for (let c = 0; c < 8; c++) for (const r of g.heartlandRows(p)) { const pos: Pos = [c, r]; if (!g.occupied(pos) && !this.staged(pos)) valid.push(pos); }
      if (m.kind === 'field') for (let c = 0; c < 8; c++) for (let r = 0; r < 8; r++) { const pos: Pos = [c, r]; if (g.territoryOf(pos) === p && !g.fields.has(bkey(pos)) && !g.wagon_at.has(bkey(pos)) && !this.staged(pos)) valid.push(pos); }
      hl.valid = valid;
    }
    return hl;
  }

  private seatName(p: number) {
    return this.cfg.mode === 'hotseat' ? `Player ${p + 1} (${cap(this.tribe(p))})` : `You (${cap(this.tribe(p))})`;
  }

  // plain-language explainer for the current phase, shown every game
  // Top progression: a TFT-style round track (where you are in the match) +
  // the 5-phase "you are here" stepper (where you are in this round).
  private phaseStepper(): string {
    return `<div class="rtrack">${this.roundTrack()}</div><div class="psteps">${this.phaseChips()}</div>`;
  }
  private roundTrack(): string {
    const C = this.g.C, cur = this.round, max = C.HARD_STOP_ROUND;
    const cara = [C.CARAVAN_ROUND_1, C.CARAVAN_ROUND_2];
    let dots = '';
    for (let r = 1; r <= max; r++) {
      const isCara = cara.includes(r), isGold = r === C.GOLDEN_GOAL_ROUND, isStop = r === max;
      const state = r === cur ? 'cur' : r < cur ? 'past' : 'future';
      const icon = isCara ? '◆' : isStop ? '🏁' : isGold ? '⚡' : String(r);
      const tip = isCara ? `Round ${r}: Caravan — draft an Artifact (free boost)`
        : isStop ? `Round ${r}: final round — the leader wins`
        : isGold ? `Round ${r}+: golden goal — one uncontested push can win outright`
        : `Round ${r}`;
      dots += `<span class="rdot ${state}${isCara ? ' cara' : ''}${isGold ? ' gold' : ''}${isStop ? ' stop' : ''}" title="${tip}">${icon}</span>`;
    }
    const next = cara.find(r => r >= cur);
    const note = next ? (next === cur ? `<span class="rnote">◆ Caravan now — draft an Artifact!</span>`
      : `<span class="rnote">◆ next Artifact in ${next - cur} round${next - cur > 1 ? 's' : ''}</span>`) : '';
    return `<span class="rlbl">Round ${cur}/${max}</span>${dots}${note}`;
  }
  private phaseChips(): string {
    const b = this.banner;
    let cur = 0, pulse = 0;
    if (b.includes('Muster')) cur = 0;
    else if (b.includes('Clash') || b.includes('Intervention')) {
      cur = 2; const m = b.match(/pulse (\d)/); pulse = m ? +m[1] : 0;
    }
    else if (b.includes('Frontier')) cur = 3;
    else if (b.includes('Caravan') || b.includes('Tribute')) cur = 4;
    const phases = [
      { k: 'Muster', i: '🏰', auto: false }, { k: 'Reveal', i: '👁', auto: true },
      { k: 'Clash', i: '⚔', auto: false }, { k: 'Frontier', i: '🚩', auto: true },
      { k: 'Tribute', i: '◆', auto: true },
    ];
    return phases.map((ph, idx) => {
      const state = idx === cur ? 'active' : idx < cur ? 'done' : 'soon';
      const pulseTag = idx === 2 && pulse ? ` <i>${pulse}/2</i>` : '';
      return `<span class="pchip ${state}${ph.auto ? ' auto' : ''}"><b>${ph.i}</b> ${ph.k}${pulseTag}</span>`;
    }).join('<span class="parr">›</span>');
  }

  private phaseHint(): string {
    if (this.banner.includes('Muster'))
      return `Spend 🛡 <b>Supply</b> to recruit units (deploy in your back rows), unlock new types, or build fields & palisades. 🌾 <b>Crop</b> feeds your army each round — keep it above your unit count or they get exhausted and fight worse.`;
    if (this.banner.includes('Clash'))
      return `Click a unit, then a 🟢 tile to <b>move</b> or a 🔴 enemy to <b>attack</b>. Get units past the enemy's gold stake line and hold there to push it back next phase. Two pulses per round.`;
    if (this.banner.includes('Intervention'))
      return `Optional: spend ◆ <b>Tribute</b> on a <b>Surge</b> (move one of <i>your</i> units one tile to an empty square) or <b>Shieldbearer</b> (shield your Hero from a killing blow) — or just Skip.`;
    if (this.banner.includes('Caravan'))
      return `◆ <b>Caravan!</b> Both sides draft a free <b>Artifact</b>. The side that's behind picks first. See what each grabbed below.`;
    if (this.banner.includes('Frontier'))
      return `🚩 <b>Frontier resolves:</b> stake lines step where a side carries a column uncontested, trampled fields are raided/annexed, and units in enemy back rows breach a wagon.`;
    return `🤖 <b>Watching the AI play.</b> Use the controls below to pause, rewind, or change speed.`;
  }

  // Persistent resource HUD for the 3D view (the 2D board draws its own).
  private resourceHUD(): string {
    const g = this.g;
    const meSeat = this.cfg.mode === 'bot' && !this.cfg.demo ? this.cfg.humanSeat : -1;
    const side = (p: number) => {
      const r = g.res[p];
      const army = [...g.units.values()].filter(u => u.owner === p && u.pos).length;
      const hungry = r.crop < army;
      const who = p === meSeat ? 'You' : cap(this.tribe(p));
      return `<div class="hud-side${p === meSeat ? ' me' : ''}" style="--c:${TRIBE_COLOR[this.tribe(p)] || '#c9a227'}">
        <span class="hud-who">${who}</span>
        <span class="hud-stat" title="Supply — builds & recruits">🛡 ${r.supply}</span>
        <span class="hud-stat${hungry ? ' low' : ''}" title="Crop ${r.crop} vs ${army} units to feed${hungry ? ' — SHORT! some units will be exhausted (∅) and fight weaker' : ' — fed'}">🌾 ${r.crop}/${army}</span>
        <span class="hud-stat" title="Tribute — Surge / Shieldbearer / convert to Supply">◆ ${r.tribute}</span>
        <span class="hud-stat" title="Rows of land owned">▦ ${g.ownedRows(p)}</span>
        <span class="hud-stat" title="Supply Wagons still standing">▣ ${g.wagonsAlive(p)}</span>
      </div>`;
    };
    return `<div class="hud-row">${side(0)}<span class="hud-vs">vs</span>${side(1)}</div>` + this.artifactStrip();
  }

  private panelHTML(): string {
    if (this.cfg.demo) return this.demoPanel();
    if (this.banner.includes('Muster')) return this.musterPanel();
    if (this.banner.includes('Clash')) return this.clashPanel();
    if (this.banner.includes('Intervention')) return this.ivPanel();
    return '';
  }

  private musterPanel(): string {
    const g = this.g, C = g.C, p = this.musterPlayer, b = this.musterBudget(p), m = this.mMode;
    const unlocked = [...g.unlocked[p]];
    const recruitable = ['spear', 'sword', 'archer', 'cav', 'siege'].filter(a => unlocked.includes(a));
    const lockable = ['archer', 'cav', 'siege'].filter(a => !unlocked.includes(a));
    const tips: Record<string, string> = {
      'fld:supply': 'Build a Supply field on your land — yields 🛡 Supply every Muster. Economy for building & recruiting.',
      'fld:crop': 'Build a Crop field on your land — yields 🌾 Crop every Muster. Crop feeds your army (1 per unit); under-fed units get exhausted.',
      'pal': 'Palisade — a wooden wall on one of your columns. Blocks enemy movement & charges through that column; Siege can smash it. Good for sealing a flank.',
      'rep': 'Reposition — move one unit you already have to another tile in your territory before the clash. Rearrange your line; no Supply cost.',
    };
    const recTip = (a: string) => `Recruit a ${ARCH_LABEL[a]} — deploys face-down in your back rows, flips up next Reveal. Costs 🛡 Supply.`;
    const unlTip = (a: string) => `Unlock ${ARCH_LABEL[a]} so you can recruit them now and in future Musters (one-time 🛡 cost).`;
    const tipFor = (id: string) => tips[id] || (id.startsWith('rec:') ? recTip(id.slice(4)) : id.startsWith('unl:') ? unlTip(id.slice(4)) : '');
    const btn = (on: boolean, id: string, txt: string) => `<button class="pbtn${on ? ' on' : ''}" data-act="${id}" title="${tipFor(id)}">${txt}</button>`;
    return `
      <div class="budget">Budget after harvest — 🛡 <b>${b.supply}</b> supply · 🌾 <b>${b.crop}</b> crop ·
        deploy ${this.mPlan.recruits.length}/${C.DEPLOY_MAX + g.extra_deploy[p]} · build ${this.mBuild.length}/${C.BUILD_ACTIONS}</div>
      <div class="prow"><span class="plabel">Recruit:</span>
        ${recruitable.map(a => btn(m.kind === 'recruit' && m.arch === a, `rec:${a}`,
          `${ARCH_LABEL[a]} <i>${g.costs[a] + C.COPY_SURCHARGE * g.copies[a]}🛡</i>`)).join('')}</div>
      ${lockable.length ? `<div class="prow"><span class="plabel">Unlock:</span>
        ${lockable.map(a => btn(this.mPlan.unlocks.includes(a), `unl:${a}`, `${ARCH_LABEL[a]} <i>${UNLOCK_COST(g.unlocked[p].size + this.mPlan.unlocks.indexOf(a) + (this.mPlan.unlocks.includes(a) ? 0 : this.mPlan.unlocks.length - this.mPlan.unlocks.indexOf(a)), C) ?? UNLOCK_COST(g.unlocked[p].size, C)}🛡</i>`)).join('')}</div>` : ''}
      <div class="prow"><span class="plabel">Build:</span>
        ${btn(m.kind === 'field' && m.ftype === 'supply', 'fld:supply', `Supply field <i>${C.FIELD_COST}🛡</i>`)}
        ${btn(m.kind === 'field' && m.ftype === 'crop', 'fld:crop', `Crop field <i>${C.FIELD_COST}🛡</i>`)}
        ${btn(m.kind === 'palisade', 'pal', `Palisade <i>${C.PALISADE_COST}🛡</i>`)}
        ${btn(m.kind === 'reposition', 'rep', `Reposition`)}</div>
      ${g.res[p].tribute > 0 ? `<div class="prow"><span class="plabel">Tribute→Supply:</span>
        <button class="pbtn" data-act="trib-">−</button> <b>${this.mPlan.tribute_spend}</b>/${g.res[p].tribute}
        <button class="pbtn" data-act="trib+">+</button></div>` : ''}
      <div class="prow staged">Staged: ${this.stagedSummary()}</div>
      <div class="prow"><button class="pbtn undo" data-act="undo">Undo last</button>
        <button class="pbtn confirm" data-act="muster-done">End Muster ▶</button></div>`;
  }

  private stagedSummary(): string {
    const parts: string[] = [];
    for (const [a] of this.mPlan.recruits) parts.push(ARCH_LABEL[a]);
    for (const u of this.mPlan.unlocks) parts.push(`unlock ${ARCH_LABEL[u]}`);
    for (const a of this.mBuild) parts.push(a[0] === 'field' ? `${a[2]} field` : 'palisade');
    for (const _ of this.mPlan.repositions) parts.push('reposition');
    if (this.mPlan.tribute_spend) parts.push(`+${this.mPlan.tribute_spend} supply`);
    return parts.length ? parts.join(', ') : '<i>nothing yet — pick an action, then click the board</i>';
  }

  private clashPanel(): string {
    const g = this.g, p = this.clashPlayer;
    const mine = g.onBoard(p);
    const ordered = [...this.cOrders.keys()];
    let selInfo = '<i>Click one of your units to give it an order.</i>';
    if (this.cSel !== null) {
      const u = g.units.get(this.cSel)!;
      const la = legalActions(g, u);
      const opts: string[] = [];
      if (la.moves.size) opts.push('🟢 move (green)');
      if (la.meleeTargets.length) opts.push('🔴 attack (red)');
      if (la.shootTargets.length) opts.push('🟠 shoot (orange)');
      if (la.chargeTargets.length) opts.push('🟣 charge (purple)');
      selInfo = `<b>${ARCH_LABEL[u.arch]}</b> selected — ${opts.join(' · ') || 'no targets in range'} ·
        ${la.canBrace ? '<button class="pbtn" data-act="brace">⛨ Brace</button>' : ''}
        <button class="pbtn" data-act="hold">Hold</button>`;
    }
    return `<div class="prow">${selInfo}</div>
      <div class="prow staged">Orders: <b>${ordered.length}/${mine.length}</b> units ·
        ${ordered.map(uid => `${ARCH_LABEL[g.units.get(uid)!.arch]}:${this.cOrders.get(uid)![0]}`).join(', ') || '<i>none</i>'}</div>
      <div class="prow"><button class="pbtn undo" data-act="clash-clear">Clear</button>
        <button class="pbtn confirm" data-act="clash-done">Resolve pulse ▶</button></div>`;
  }

  private ivPanel(): string {
    const g = this.g, p = this.ivPlayer, w = this.ivWno;
    const opts: string[] = [];
    if (w === 3 && g.res[p].tribute >= g.C.SURGE_COST) opts.push(`<button class="pbtn" data-act="iv:surge">⚡ Surge <i>${g.C.SURGE_COST}◆</i></button>`);
    if (w <= 2 && g.res[p].tribute >= g.C.SHIELDBEARER_COST) opts.push(`<button class="pbtn" data-act="iv:shield">⛨ Shieldbearer <i>${g.C.SHIELDBEARER_COST}◆</i></button>`);
    const sel = this.ivSel ? `<div class="prow staged">${this.ivSel.kind === 'surge'
      ? 'Surge: click your unit, then an adjacent empty tile.' : 'Shieldbearer: click the unit to ward.'}</div>` : '';
    return `<div class="prow">Tribute ◆${g.res[p].tribute}. Optional intervention:</div>
      <div class="prow">${opts.join(' ')} <button class="pbtn confirm" data-act="iv-skip">Skip ▶</button></div>${sel}`;
  }

  // ── wiring ──────────────────────────────────────────────────────────────
  private wireCells() {
    this.root.querySelectorAll<HTMLElement>('.cell').forEach(cell => {
      cell.addEventListener('click', () => {
        const pos = cell.dataset.pos!.split(',').map(Number) as Pos;
        const uid = cell.dataset.uid !== undefined ? Number(cell.dataset.uid) : undefined;
        if (this.banner.includes('Intervention')) this.ivCell(pos, uid);
        else this.onCell(pos, uid);
      });
    });
  }

  private wirePanel() {
    this.root.querySelectorAll<HTMLElement>('.pbtn').forEach(btn => {
      btn.addEventListener('click', () => this.onAct(btn.dataset.act!));
    });
  }

  private onAct(act: string) {
    const g = this.g, C = g.C;
    if (act.startsWith('demo:')) { this.onDemo(act.slice(5)); return; }
    if (act === 'muster-done') { this.mMode = { kind: null }; this.musterDone?.(); return; }
    if (act === 'clash-done') { this.clashDone?.(); return; }
    if (act === 'clash-clear') { this.cOrders.clear(); this.cSel = null; this.render(); return; }
    if (act === 'iv-skip') { this.ivResolve?.(); return; }
    if (act === 'undo') {
      if (this.mPlan.repositions.length) this.mPlan.repositions.pop();
      else if (this.mPlan.recruits.length) this.mPlan.recruits.pop();
      else if (this.mBuild.length) this.mBuild.pop();
      else if (this.mPlan.unlocks.length) this.mPlan.unlocks.pop();
      this.render(); return;
    }
    if (act === 'brace' && this.cSel !== null) { this.cOrders.set(this.cSel, ['BRACE']); this.cSel = null; this.render(); return; }
    if (act === 'hold' && this.cSel !== null) { this.cOrders.delete(this.cSel); this.cSel = null; this.render(); return; }
    if (act.startsWith('rec:')) { this.mMode = { kind: 'recruit', arch: act.slice(4) }; this.render(); return; }
    if (act.startsWith('fld:')) { this.mMode = { kind: 'field', ftype: act.slice(4) }; this.render(); return; }
    if (act === 'pal') { this.mMode = { kind: 'palisade' }; this.render(); return; }
    if (act === 'rep') { this.mMode = { kind: 'reposition' }; this.render(); return; }
    if (act.startsWith('unl:')) { const a = act.slice(4); if (!this.mPlan.unlocks.includes(a)) this.mPlan.unlocks.push(a); this.render(); return; }
    if (act === 'trib+') { this.mPlan.tribute_spend = Math.min(this.mPlan.tribute_spend + 1, g.res[this.musterPlayer].tribute); this.render(); return; }
    if (act === 'trib-') { this.mPlan.tribute_spend = Math.max(0, this.mPlan.tribute_spend - 1); this.render(); return; }
    if (act === 'iv:surge') { this.ivSel = { kind: 'surge' }; this.render(); return; }
    if (act === 'iv:shield') { this.ivSel = { kind: 'shield' }; this.render(); return; }
  }

  // palisade is placed by clicking a column header band — handle via cell click on stakeline row
  private musterPalisade(col: number) {
    const C = this.g.C;
    if (!this.g.palisades.has(col) && !this.mBuild.some(a => a[0] === 'palisade' && a[1] === col)
      && this.mBuild.length < C.BUILD_ACTIONS) this.mBuild.push(['palisade', col]);
    this.render();
  }

  private ivCell(pos: Pos, uid?: number) {
    const g = this.g, p = this.ivPlayer, h = this.human(p);
    if (!this.ivSel) return;
    if (this.ivSel.kind === 'shield') {
      if (uid !== undefined && g.units.get(uid)!.owner === p) { h.pendingIntervention[this.ivWno] = ['SHIELDBEARER', uid]; this.ivResolve?.(); }
    } else { // surge
      if (this.ivSel.uid === undefined) { if (uid !== undefined && g.units.get(uid)!.owner === p) { this.ivSel.uid = uid; this.render(); } }
      else { const u = g.units.get(this.ivSel.uid)!; if (Math.abs(u.pos![0] - pos[0]) + Math.abs(u.pos![1] - pos[1]) === 1 && !g.occupied(pos)) { h.pendingIntervention[this.ivWno] = ['SURGE', this.ivSel.uid, pos]; this.ivResolve?.(); } }
    }
  }

  // ── highlight overlays ───────────────────────────────────────────────────
  private paintOverlays() {
    const mark = (pos: Pos, cls: string) => {
      const el = this.root.querySelector<HTMLElement>(`.cell[data-pos="${bkey(pos)}"]`);
      if (el) el.classList.add(cls);
    };
    if (this.banner.includes('Clash') && this.cSel !== null) {
      const u = this.g.units.get(this.cSel)!;
      const el = this.root.querySelector<HTMLElement>(`.cell[data-pos="${bkey(u.pos!)}"]`);
      el?.classList.add('sel');
      const la = legalActions(this.g, u);
      for (const k of la.moves.keys()) mark(k.split(',').map(Number) as Pos, 'hl-move');
      for (const t of la.meleeTargets) mark(this.g.units.get(t.uid)!.pos!, 'hl-melee');
      for (const uid of la.shootTargets) mark(this.g.units.get(uid)!.pos!, 'hl-shoot');
      for (const t of la.chargeTargets) mark(this.g.units.get(t.uid)!.pos!, 'hl-charge');
    }
    // staged clash orders → badges
    if (this.banner.includes('Clash')) {
      for (const [uid, o] of this.cOrders) {
        const el = this.root.querySelector<HTMLElement>(`.cell[data-uid="${uid}"] .unit`);
        if (el) el.insertAdjacentHTML('beforeend', `<span class="orderbadge">${o[0][0]}</span>`);
      }
    }
    // muster staged placements
    if (this.banner.includes('Muster')) {
      for (const r of this.mPlan.recruits) mark(r[1], 'hl-stage');
      for (const a of this.mBuild) if (a[0] === 'field') mark(a[1] as Pos, 'hl-stage');
      for (const r of this.mPlan.repositions) mark(r[1], 'hl-stage');
      // valid target tint for current mode
      const m = this.mMode, p = this.musterPlayer, g = this.g;
      if (m.kind === 'recruit') for (let c = 0; c < 8; c++) for (const r of g.heartlandRows(p)) { const pos: Pos = [c, r]; if (!g.occupied(pos) && !this.staged(pos)) mark(pos, 'hl-valid'); }
      if (m.kind === 'field') for (let c = 0; c < 8; c++) for (let r = 0; r < 8; r++) { const pos: Pos = [c, r]; if (g.territoryOf(pos) === p && !g.fields.has(bkey(pos)) && !g.wagon_at.has(bkey(pos)) && !this.staged(pos)) mark(pos, 'hl-valid'); }
    }
  }

  private winScreen(winner: number, wtype: string) {
    const me = this.cfg.mode === 'bot' ? this.cfg.humanSeat : null;
    const head = me === null ? `Player ${winner + 1} wins` : (winner === me ? 'Victory' : 'Defeat');
    const panel = `<div class="winscreen">
        <h2>${head}</h2>
        <p>${cap(this.tribe(winner))} (P${winner + 1}) — <b>${wtype}</b> after ${this.g.round} rounds.</p>
        <button class="pbtn confirm" onclick="location.reload()">New game</button>
      </div>`;
    if (this.use3d && this.board3d) {
      this.board3d.update(this.g); this.board3d.setHighlights({});
      const ov = document.createElement('div'); ov.className = 'overlay'; ov.innerHTML = `<div class="modal">${panel}</div>`;
      document.body.appendChild(ov);
    } else {
      this.root.innerHTML = renderBoard(this.g, { p0tribe: this.cfg.p0tribe, p1tribe: this.cfg.p1tribe }) + panel;
    }
  }
}
