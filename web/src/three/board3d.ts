// LIMES 3D board — Three.js immersive diorama with animation & juice.
// Renders a Game state as a lit, shadowed low-poly frontier and ANIMATES the
// deltas between states: units glide (with a hop) to new tiles, bob at idle,
// flash + float a damage number when hurt, and fade/sink on death. Orbit +
// zoom camera. The parity-verified engine stays the brain.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Game, Unit, Pos } from '../engine';
import { ROSTER } from '../assets';

const TILE = 1, GAP = 0.06, STEP = TILE + GAP, HALF = (8 * STEP) / 2;
const UNIT_Y = 0.13;

const TRIBE_HEX: Record<string, number> = {
  roman: 0xa32638, spartan: 0xc4622d, hun: 0xd9a418, gaul: 0x3e7a3a,
  egyptian: 0x2aa198, viking: 0x2b4f81, persian: 0x5b3a8e, teuton: 0x6e7378,
};

function tileWorld(c: number, r: number): [number, number] {
  return [c * STEP - HALF + STEP / 2, (7 - r) * STEP - HALF + STEP / 2];
}

interface UnitView {
  group: THREE.Group;
  card: THREE.Mesh;            // for hit flash (emissive)
  hp: number; max: number;
  tile: Pos;
  bob: number;                 // idle phase
  bar?: THREE.Sprite;          // floating HP bar + badges
  barTex?: THREE.CanvasTexture;
  barCtx?: CanvasRenderingContext2D;
  barKey?: string;             // redraw only when stats change
  tween?: { fx: number; fz: number; tx: number; tz: number; t0: number; dur: number };
  dying?: { t0: number };
}

export interface Board3DOpts { p0tribe: string; p1tribe: string; }

export class Board3D {
  scene = new THREE.Scene();
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  private texLoader = new THREE.TextureLoader();
  private texCache = new Map<string, THREE.Texture>();
  private props = new THREE.Group();          // tiles/wagons/fields/palisades, rebuilt each update
  private hiGroup = new THREE.Group();         // interaction highlights
  private pulseTiles: THREE.Mesh[] = [];       // valid muster tiles → pulse/glow
  private unitG = new THREE.Group();           // persistent animated units
  private fxG = new THREE.Group();             // damage numbers etc.
  private units = new Map<number, UnitView>();
  private dmg: { spr: THREE.Sprite; t0: number }[] = [];
  private raycaster = new THREE.Raycaster();
  private pickPlane!: THREE.Mesh;
  private clickCb?: (pos: Pos) => void;
  private hoverCb?: (pos: Pos | null, ev: PointerEvent) => void;
  private clock = new THREE.Clock();
  private downXY = { x: 0, y: 0 };

  constructor(private container: HTMLElement, private opts: Board3DOpts) {
    const w = container.clientWidth || 640, h = container.clientHeight || 520;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    (this.renderer as any).outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(this.renderer.domElement);

    this.scene.background = new THREE.Color(0x1d1813);
    this.scene.fog = new THREE.Fog(0x1d1813, 16, 30);

    this.camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    this.camera.position.set(0, 9.5, 9.2);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, -0.3);
    this.controls.enableDamping = true; this.controls.dampingFactor = 0.08;
    this.controls.minDistance = 7; this.controls.maxDistance = 20;
    this.controls.maxPolarAngle = Math.PI * 0.46;   // don't dip under the board
    this.controls.enablePan = false;
    this.controls.update();

    this.scene.add(new THREE.AmbientLight(0xb9a98a, 0.7));
    this.scene.add(new THREE.HemisphereLight(0xfff1d0, 0x2a2118, 0.5));
    const sun = new THREE.DirectionalLight(0xfff0d8, 1.5);
    sun.position.set(-6, 12, 6); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const s = 8; Object.assign(sun.shadow.camera, { left: -s, right: s, top: s, bottom: -s, near: 1, far: 40 });
    this.scene.add(sun);

    // misty "sea" the diorama floats over
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(120, 120),
      new THREE.MeshStandardMaterial({ color: 0x24303a, roughness: 0.85, metalness: 0.1 }));
    sea.rotation.x = -Math.PI / 2; sea.position.y = -1.6; sea.receiveShadow = true;
    this.scene.add(sea);

    this.buildScenery();

    this.scene.add(this.props, this.unitG, this.hiGroup, this.fxG);

    this.pickPlane = new THREE.Mesh(new THREE.PlaneGeometry(8 * STEP, 8 * STEP),
      new THREE.MeshBasicMaterial({ visible: false }));
    this.pickPlane.rotation.x = -Math.PI / 2; this.pickPlane.position.y = 0.14;
    this.scene.add(this.pickPlane);

    // drag-aware click (so orbiting doesn't select)
    const el = this.renderer.domElement;
    el.addEventListener('pointerdown', e => { this.downXY = { x: e.clientX, y: e.clientY }; });
    el.addEventListener('pointerup', e => {
      if (Math.hypot(e.clientX - this.downXY.x, e.clientY - this.downXY.y) < 5) this.handleClick(e);
    });
    el.addEventListener('pointermove', e => this.handleHover(e));
    el.addEventListener('pointerleave', e => this.hoverCb?.(null, e));

    window.addEventListener('resize', () => this.onResize());
    this.animate();
  }

  onClick(cb: (pos: Pos) => void) { this.clickCb = cb; }
  onHover(cb: (pos: Pos | null, ev: PointerEvent) => void) { this.hoverCb = cb; }

  private pointerTile(e: PointerEvent): Pos | null {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.camera);
    const hit = this.raycaster.intersectObject(this.pickPlane)[0];
    if (!hit) return null;
    const c = Math.round((hit.point.x + HALF - STEP / 2) / STEP);
    const r = 7 - Math.round((hit.point.z + HALF - STEP / 2) / STEP);
    return (c >= 0 && c < 8 && r >= 0 && r < 8) ? [c, r] : null;
  }
  private handleHover(e: PointerEvent) { this.hoverCb?.(this.pointerTile(e), e); }

  private onResize() {
    const w = this.container.clientWidth, h = this.container.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h); this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
  }
  private tex(path: string): THREE.Texture {
    let t = this.texCache.get(path);
    if (!t) { t = this.texLoader.load(path); (t as any).colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; this.texCache.set(path, t); }
    return t;
  }
  private tribeOf(p: number) { return p === 0 ? this.opts.p0tribe : this.opts.p1tribe; }
  private handleClick(e: PointerEvent) {
    if (!this.clickCb) return;
    const t = this.pointerTile(e);
    if (t) this.clickCb(t);
  }

  // ── static scenery (built once): earth pedestal + landscaped apron ──
  private buildScenery() {
    const span = 8 * STEP, apron = 2.0;
    // grassy top lip the board + decoration sit on
    const lip = new THREE.Mesh(new THREE.BoxGeometry(span + apron, 0.16, span + apron),
      new THREE.MeshStandardMaterial({ color: 0x5f7a37, roughness: 1 }));
    lip.position.y = -0.09; lip.receiveShadow = true; this.scene.add(lip);
    // dirt body (the pedestal)
    const body = new THREE.Mesh(new THREE.BoxGeometry(span + apron - 0.3, 1.5, span + apron - 0.3),
      new THREE.MeshStandardMaterial({ color: 0x4a3522, roughness: 1 }));
    body.position.y = -0.92; body.castShadow = true; body.receiveShadow = true; this.scene.add(body);
    // a thin rocky stratum
    const strat = new THREE.Mesh(new THREE.BoxGeometry(span + apron - 0.15, 0.25, span + apron - 0.15),
      new THREE.MeshStandardMaterial({ color: 0x5b5048, roughness: 1, flatShading: true }));
    strat.position.y = -0.34; this.scene.add(strat);

    // scatter trees, rocks, grass in the apron ring (outside the play grid)
    const inApron = () => {
      // pick a point in the square ring between the grid edge and the lip edge
      const edge = span / 2, outer = (span + apron) / 2 - 0.25;
      const side = Math.floor(Math.random() * 4);
      const along = (Math.random() * 2 - 1) * outer;
      const off = edge + 0.1 + Math.random() * (outer - edge - 0.1);
      const p: [number, number] = side === 0 ? [along, off] : side === 1 ? [along, -off] : side === 2 ? [off, along] : [-off, along];
      return p;
    };
    for (let i = 0; i < 26; i++) { const t = this.makeTree(); const [x, z] = inApron(); t.position.set(x, -0.01, z); t.rotation.y = Math.random() * 6.28; const s = 0.8 + Math.random() * 0.6; t.scale.setScalar(s); this.scene.add(t); }
    for (let i = 0; i < 34; i++) { const r = this.makeRock(); const [x, z] = inApron(); r.position.set(x, 0, z); this.scene.add(r); }
    for (let i = 0; i < 40; i++) { const g = this.makeGrass(); const [x, z] = inApron(); g.position.set(x, 0, z); this.scene.add(g); }
  }
  private makeTree(): THREE.Group {
    const g = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 0.4, 6), new THREE.MeshStandardMaterial({ color: 0x5a3f25, roughness: 1 }));
    trunk.position.y = 0.2; trunk.castShadow = true; g.add(trunk);
    const c1 = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.5, 7), new THREE.MeshStandardMaterial({ color: 0x3e6b34, roughness: 1, flatShading: true }));
    c1.position.y = 0.58; c1.castShadow = true; g.add(c1);
    const c2 = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.42, 7), new THREE.MeshStandardMaterial({ color: 0x4a7a3a, roughness: 1, flatShading: true }));
    c2.position.y = 0.86; c2.castShadow = true; g.add(c2);
    return g;
  }
  private makeRock(): THREE.Mesh {
    const m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.14 + Math.random() * 0.14, 0),
      new THREE.MeshStandardMaterial({ color: 0x6b6660, roughness: 1, flatShading: true }));
    m.position.y = 0.06; m.castShadow = true; m.receiveShadow = true; m.rotation.set(Math.random(), Math.random(), Math.random()); return m;
  }
  private makeGrass(): THREE.Group {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: 0x6f9442, roughness: 1, side: THREE.DoubleSide });
    for (let i = 0; i < 4; i++) {
      const blade = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.22, 3), mat);
      blade.position.set((Math.random() - 0.5) * 0.18, 0.11, (Math.random() - 0.5) * 0.18);
      blade.rotation.z = (Math.random() - 0.5) * 0.5; g.add(blade);
    }
    return g;
  }

  // ── builders ──
  private standee(u: Unit): { group: THREE.Group; card: THREE.Mesh } {
    const tribe = this.tribeOf(u.owner), path = ROSTER[`${tribe}_${u.arch}`];
    const g = new THREE.Group();
    const cardW = 0.74, cardH = 0.92;
    const card = new THREE.Mesh(new THREE.BoxGeometry(cardW, cardH, 0.05),
      [0, 1, 2, 3, 4, 5].map(i => new THREE.MeshStandardMaterial({
        color: i === 4 ? 0xffffff : TRIBE_HEX[tribe], roughness: 0.6,
        map: i === 4 && path ? this.tex(path) : null,
      })));
    card.position.y = cardH / 2 + 0.08; card.castShadow = true; g.add(card);
    const frame = new THREE.Mesh(new THREE.BoxGeometry(cardW + 0.08, cardH + 0.08, 0.04),
      new THREE.MeshStandardMaterial({ color: TRIBE_HEX[tribe], roughness: 0.5, metalness: 0.2 }));
    frame.position.set(0, cardH / 2 + 0.08, -0.03); frame.castShadow = true; g.add(frame);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.4, 0.12, 16),
      new THREE.MeshStandardMaterial({ color: TRIBE_HEX[tribe], roughness: 0.4, metalness: 0.3 }));
    base.position.y = 0.06; base.castShadow = true; base.receiveShadow = true; g.add(base);
    return { group: g, card };
  }
  private wagon(): THREE.Group {
    const g = new THREE.Group();
    const crate = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.4, 0.7), new THREE.MeshStandardMaterial({ color: 0x6b4a25, roughness: 0.9 }));
    crate.position.y = 0.3; crate.castShadow = true; g.add(crate);
    for (const sx of [-0.32, 0.32]) for (const sz of [-0.3, 0.3]) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.06, 14), new THREE.MeshStandardMaterial({ color: 0x2a1d10, roughness: 0.8 }));
      wheel.rotation.z = Math.PI / 2; wheel.position.set(sx, 0.16, sz); wheel.castShadow = true; g.add(wheel);
    }
    return g;
  }

  private buildProps(g: Game) {
    this.props.clear();
    const tileGeo = new THREE.BoxGeometry(TILE, 0.25, TILE);
    for (let c = 0; c < 8; c++) for (let r = 0; r < 8; r++) {
      const terr = r < g.stakes[c] ? 0 : 1;
      const base = new THREE.Color(terr === 0 ? 0x6f7d3a : 0x55633a);
      const j = (((c * 7 + r * 13) % 6) - 2.5) * 0.012;   // deterministic jitter
      base.offsetHSL(j * 0.3, 0, j);
      const m = new THREE.Mesh(tileGeo, new THREE.MeshStandardMaterial({ color: base, roughness: 0.95 }));
      const [x, z] = tileWorld(c, r); m.position.set(x, 0, z); m.receiveShadow = true; this.props.add(m);
      if (r === g.stakes[c] - 1) {
        const edge = new THREE.Mesh(new THREE.BoxGeometry(TILE, 0.04, 0.08), new THREE.MeshStandardMaterial({ color: 0xdbc06a, emissive: 0x3a2f10, roughness: 0.5 }));
        edge.position.set(x, 0.15, z - STEP / 2); this.props.add(edge);
      }
    }
    for (let p = 0; p < 2; p++) for (const w of g.wagons[p]) {
      if (w.hp <= 0) continue; const wg = this.wagon(); const [x, z] = tileWorld(w.col, w.row); wg.position.set(x, UNIT_Y, z); this.props.add(wg);
    }
    for (const [k, f] of g.fields.entries()) {
      const [c, r] = k.split(',').map(Number);
      const fld = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.06, 0.7), new THREE.MeshStandardMaterial({ color: f.type === 'crop' ? 0xc8a23a : 0x7d6b4a, roughness: 1 }));
      const [x, z] = tileWorld(c, r); fld.position.set(x, 0.15, z); fld.receiveShadow = true; this.props.add(fld);
    }
    for (const [col] of g.palisades.entries()) {
      const k = g.stakes[col];
      const wall = new THREE.Mesh(new THREE.BoxGeometry(TILE, 0.5, 0.12), new THREE.MeshStandardMaterial({ color: 0x5a4326, roughness: 0.9 }));
      const [x, z] = tileWorld(col, k - 1); wall.position.set(x, 0.32, z - STEP / 2); wall.castShadow = true; this.props.add(wall);
    }
  }

  // ── floating HP bar + status badges (billboard above each unit) ──
  private makeBar(): { spr: THREE.Sprite; tex: THREE.CanvasTexture; ctx: CanvasRenderingContext2D } {
    const cv = document.createElement('canvas'); cv.width = 192; cv.height = 56;
    const ctx = cv.getContext('2d')!;
    const tex = new THREE.CanvasTexture(cv);
    const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false }));
    spr.scale.set(0.8, 0.235, 1); spr.renderOrder = 10;
    return { spr, tex, ctx };
  }
  private syncBar(v: UnitView, u: Unit) {
    if (!v.bar || !v.barCtx || !v.barTex) return;
    const badges = [u.tier2 ? '★★' : u.tier1 ? '★' : '', u.braced ? '⛨' : '', u.exhausted ? '∅' : ''].filter(Boolean).join(' ');
    const key = `${u.hp}/${u.max_hp}|${badges}`;
    if (key === v.barKey) return;            // redraw only when something changed
    v.barKey = key;
    const ctx = v.barCtx, w = 192, h = 56;
    ctx.clearRect(0, 0, w, h);
    if (badges) { ctx.font = 'bold 20px sans-serif'; ctx.fillStyle = '#ffd86a'; ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillText(badges, w / 2, 0); }
    const pct = Math.max(0, Math.min(1, u.hp / u.max_hp));
    const bx = 8, by = 27, bw = w - 16, bh = 22, rd = 7;
    const rr = (x: number, y: number, ww: number, hh: number, r: number) => {
      ctx.beginPath(); ctx.moveTo(x + r, y);
      ctx.arcTo(x + ww, y, x + ww, y + hh, r); ctx.arcTo(x + ww, y + hh, x, y + hh, r);
      ctx.arcTo(x, y + hh, x, y, r); ctx.arcTo(x, y, x + ww, y, r); ctx.closePath();
    };
    ctx.fillStyle = 'rgba(8,6,4,0.9)'; rr(bx, by, bw, bh, rd); ctx.fill();
    ctx.fillStyle = pct > 0.5 ? '#5fbf4a' : pct > 0.25 ? '#d8b53a' : '#c8463a';
    if (pct > 0) { rr(bx + 3, by + 3, Math.max(2, (bw - 6) * pct), bh - 6, rd - 3); ctx.fill(); }
    ctx.fillStyle = '#fff'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(`${u.hp}/${u.max_hp}`, w / 2, by + bh / 2 + 1);
    v.barTex.needsUpdate = true;
  }

  // ── diff the game state and animate the changes ──
  update(g: Game) {
    this.buildProps(g);
    const seen = new Set<number>();
    for (const u of g.units.values()) {
      if (!u.pos) continue;
      seen.add(u.uid);
      const [x, z] = tileWorld(u.pos[0], u.pos[1]);
      let v = this.units.get(u.uid);
      if (!v) {
        const { group, card } = this.standee(u);
        group.position.set(x, UNIT_Y, z);
        this.unitG.add(group);
        v = { group, card, hp: u.hp, max: u.max_hp, tile: [u.pos[0], u.pos[1]], bob: Math.random() * 6.28 };
        const b = this.makeBar(); b.spr.position.set(0, 1.22, 0); group.add(b.spr);
        v.bar = b.spr; v.barTex = b.tex; v.barCtx = b.ctx;
        this.units.set(u.uid, v);
      } else {
        if (v.tile[0] !== u.pos[0] || v.tile[1] !== u.pos[1]) {
          v.tween = { fx: v.group.position.x, fz: v.group.position.z, tx: x, tz: z, t0: this.clock.elapsedTime, dur: 0.34 };
          v.tile = [u.pos[0], u.pos[1]];
        }
        if (u.hp < v.hp) { this.spawnDamage(x, z, v.hp - u.hp); this.flash(v); }
        v.hp = u.hp;
      }
      this.syncBar(v, u);
    }
    // units gone from the board → death FX
    for (const [uid, v] of [...this.units]) {
      if (!seen.has(uid) && !v.dying) { v.dying = { t0: this.clock.elapsedTime }; }
    }
  }

  setHighlights(hl: { move?: Pos[]; melee?: Pos[]; shoot?: Pos[]; charge?: Pos[]; stage?: Pos[]; valid?: Pos[]; selected?: Pos | null }) {
    this.hiGroup.clear();
    this.pulseTiles = [];
    // valid muster tiles: a bright, breathing gold glow + border so "click a
    // glowing tile" actually reads (the flat 0.18 fill was invisible).
    const glow = (list: Pos[] | undefined, color: number) => {
      for (const p of list ?? []) {
        const [x, z] = tileWorld(p[0], p[1]);
        const fillM = new THREE.Mesh(new THREE.PlaneGeometry(TILE * 0.9, TILE * 0.9),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending }));
        fillM.rotation.x = -Math.PI / 2; fillM.position.set(x, 0.15, z);
        this.hiGroup.add(fillM); this.pulseTiles.push(fillM);
        const border = new THREE.Mesh(new THREE.RingGeometry(TILE * 0.4, TILE * 0.49, 4),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, depthWrite: false, side: THREE.DoubleSide }));
        border.rotation.x = -Math.PI / 2; border.rotation.z = Math.PI / 4; border.position.set(x, 0.155, z);
        this.hiGroup.add(border); this.pulseTiles.push(border);
      }
    };
    const fill = (list: Pos[] | undefined, color: number, op: number) => {
      for (const p of list ?? []) {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(TILE * 0.92, TILE * 0.92), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: op, depthWrite: false }));
        m.rotation.x = -Math.PI / 2; const [x, z] = tileWorld(p[0], p[1]); m.position.set(x, 0.145, z); this.hiGroup.add(m);
      }
    };
    const ring = (list: Pos[] | undefined, color: number, ri = 0.42, ro = 0.5) => {
      for (const p of list ?? []) {
        const m = new THREE.Mesh(new THREE.RingGeometry(TILE * ri, TILE * ro, 28), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95, depthWrite: false, side: THREE.DoubleSide }));
        m.rotation.x = -Math.PI / 2; const [x, z] = tileWorld(p[0], p[1]); m.position.set(x, 0.16, z); this.hiGroup.add(m);
      }
    };
    glow(hl.valid, 0xf2c649); fill(hl.move, 0x6f9f4a, 0.5); fill(hl.stage, 0xc9a227, 0.55);
    ring(hl.melee, 0xc0504a); ring(hl.shoot, 0xd98f3a); ring(hl.charge, 0x9a6cc0);
    if (hl.selected) ring([hl.selected], 0xdbc06a, 0.5, 0.6);
  }

  // ── FX ──
  private spawnDamage(x: number, z: number, amt: number) {
    const cv = document.createElement('canvas'); cv.width = 128; cv.height = 64;
    const ctx = cv.getContext('2d')!; ctx.font = 'bold 48px Cinzel, serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#1a1408'; ctx.fillText(`-${amt}`, 65, 34); ctx.fillStyle = '#ff5a4a'; ctx.fillText(`-${amt}`, 64, 32);
    const tex = new THREE.CanvasTexture(cv);
    const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
    spr.scale.set(0.8, 0.4, 1); spr.position.set(x, 1.2, z); this.fxG.add(spr);
    this.dmg.push({ spr, t0: this.clock.elapsedTime });
  }
  private flash(v: UnitView) {
    for (const m of (v.card.material as THREE.MeshStandardMaterial[])) { m.emissive = new THREE.Color(0xff3020); (m as any).__flash = 1; }
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    const dt = this.clock.getDelta(), t = this.clock.elapsedTime;
    this.controls.update();
    // units: tween, idle bob, flash decay, death
    for (const [uid, v] of [...this.units]) {
      if (v.dying) {
        const p = (t - v.dying.t0) / 0.5;
        v.group.position.y = UNIT_Y - p * 0.6;
        v.group.scale.setScalar(Math.max(0.01, 1 - p));
        v.group.traverse(o => { const mm = (o as any).material; if (mm) { mm.transparent = true; mm.opacity = Math.max(0, 1 - p); } });
        if (p >= 1) { this.unitG.remove(v.group); this.units.delete(uid); }
        continue;
      }
      let y = UNIT_Y;
      if (v.tween) {
        const p = Math.min(1, (t - v.tween.t0) / v.tween.dur);
        const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
        v.group.position.x = v.tween.fx + (v.tween.tx - v.tween.fx) * e;
        v.group.position.z = v.tween.fz + (v.tween.tz - v.tween.fz) * e;
        y += Math.sin(p * Math.PI) * 0.28;     // hop
        if (p >= 1) v.tween = undefined;
      }
      v.group.position.y = y + Math.sin(t * 2 + v.bob) * 0.02;   // idle bob
      for (const m of (v.card.material as any[])) {
        if (m.__flash > 0) { m.__flash = Math.max(0, m.__flash - dt * 3); m.emissive.setScalar(m.__flash * 0.6); m.emissive.r = m.__flash; m.emissive.g = m.__flash * 0.2; m.emissive.b = m.__flash * 0.12; }
      }
    }
    // valid muster tiles breathe so they read as "glowing"
    if (this.pulseTiles.length) {
      const pulse = 0.5 + 0.5 * Math.sin(t * 3.2);
      for (const m of this.pulseTiles) {
        (m.material as THREE.MeshBasicMaterial).opacity = 0.3 + pulse * 0.45;
        m.scale.setScalar(0.95 + pulse * 0.08);
      }
    }
    // damage numbers rise + fade
    for (const d of [...this.dmg]) {
      const p = (t - d.t0) / 1.0; d.spr.position.y = 1.2 + p * 0.8;
      (d.spr.material as THREE.SpriteMaterial).opacity = 1 - p;
      if (p >= 1) { this.fxG.remove(d.spr); this.dmg.splice(this.dmg.indexOf(d), 1); }
    }
    this.renderer.render(this.scene, this.camera);
  };
}
