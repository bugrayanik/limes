// LIMES 3D board — Three.js immersive diorama. Renders a Game state as a lit,
// shadowed low-poly frontier: terrain tiles, your 48 unit arts as framed 3D
// standees, wagons, fields, palisades, and the stake frontier. The parity-
// verified engine stays the brain; this is pure presentation.
import * as THREE from 'three';
import type { Game, Unit, Pos } from '../engine';
import { ROSTER } from '../assets';

const TILE = 1;            // tile size in world units
const GAP = 0.06;
const STEP = TILE + GAP;
const HALF = (8 * STEP) / 2;

const TRIBE_HEX: Record<string, number> = {
  roman: 0xa32638, spartan: 0xc4622d, hun: 0xd9a418, gaul: 0x3e7a3a,
  egyptian: 0x2aa198, viking: 0x2b4f81, persian: 0x5b3a8e, teuton: 0x6e7378,
};

// world position of board tile (col,row); row 0 (P0) toward camera (+z)
function tileWorld(c: number, r: number): [number, number] {
  return [c * STEP - HALF + STEP / 2, (7 - r) * STEP - HALF + STEP / 2];
}

export interface Board3DOpts { p0tribe: string; p1tribe: string; }

export class Board3D {
  scene = new THREE.Scene();
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  private texLoader = new THREE.TextureLoader();
  private texCache = new Map<string, THREE.Texture>();
  private dynamic = new THREE.Group();   // units/wagons/fields cleared & rebuilt each update
  private sun: THREE.DirectionalLight;

  constructor(private container: HTMLElement, private opts: Board3DOpts) {
    const w = container.clientWidth || 640, h = container.clientHeight || 560;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    (this.renderer as any).outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(this.renderer.domElement);

    // atmosphere
    this.scene.background = new THREE.Color(0x1d1813);
    this.scene.fog = new THREE.Fog(0x1d1813, 14, 26);

    // camera: tilted down from the player's (P0) side
    this.camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    this.camera.position.set(0, 9.5, 9.2);
    this.camera.lookAt(0, 0, -0.5);

    // lights
    this.scene.add(new THREE.AmbientLight(0xb9a98a, 0.7));
    this.scene.add(new THREE.HemisphereLight(0xfff1d0, 0x2a2118, 0.5));
    const sun = new THREE.DirectionalLight(0xfff0d8, 1.5);
    sun.position.set(-6, 12, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const s = 8;
    Object.assign(sun.shadow.camera, { left: -s, right: s, top: s, bottom: -s, near: 1, far: 40 });
    this.sun = sun;
    this.scene.add(sun);

    this.buildGround();
    this.scene.add(this.dynamic);
    window.addEventListener('resize', () => this.onResize());
    this.animate();
  }

  private onResize() {
    const w = this.container.clientWidth, h = this.container.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
  }

  private tex(path: string): THREE.Texture {
    let t = this.texCache.get(path);
    if (!t) { t = this.texLoader.load(path); (t as any).colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; this.texCache.set(path, t); }
    return t;
  }

  // ground plane + the 8×8 terrain tiles (static)
  private buildGround() {
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshStandardMaterial({ color: 0x2a2118, roughness: 1 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -0.2; ground.receiveShadow = true;
    this.scene.add(ground);
  }

  // rebuild tiles each update so the stake frontier (terrain colour split) tracks the game
  private buildTiles(g: Game) {
    const tileGeo = new THREE.BoxGeometry(TILE, 0.25, TILE);
    for (let c = 0; c < 8; c++) for (let r = 0; r < 8; r++) {
      const terr = r < g.stakes[c] ? 0 : 1;
      const grass = terr === 0 ? 0x6f7d3a : 0x55633a;      // your land warmer, enemy cooler
      const m = new THREE.Mesh(tileGeo, new THREE.MeshStandardMaterial({ color: grass, roughness: 0.95 }));
      const [x, z] = tileWorld(c, r);
      m.position.set(x, 0, z); m.receiveShadow = true; m.castShadow = false;
      this.dynamic.add(m);
      // stake frontier: a gold edge on the P0-frontmost row of the column
      if (r === g.stakes[c] - 1) {
        const edge = new THREE.Mesh(new THREE.BoxGeometry(TILE, 0.04, 0.08),
          new THREE.MeshStandardMaterial({ color: 0xdbc06a, emissive: 0x3a2f10, roughness: 0.5 }));
        edge.position.set(x, 0.15, z - STEP / 2);
        this.dynamic.add(edge);
      }
    }
  }

  private tribeOf(p: number) { return p === 0 ? this.opts.p0tribe : this.opts.p1tribe; }

  // a framed board-game standee: the unit art on a card standing on a base
  private standee(u: Unit): THREE.Group {
    const tribe = this.tribeOf(u.owner);
    const path = ROSTER[`${tribe}_${u.arch}`];
    const g = new THREE.Group();
    const cardW = 0.74, cardH = 0.92;
    // card
    const card = new THREE.Mesh(new THREE.BoxGeometry(cardW, cardH, 0.05),
      [0, 1, 2, 3, 4, 5].map(i => new THREE.MeshStandardMaterial({
        color: i === 4 ? 0xffffff : TRIBE_HEX[tribe], roughness: 0.6,
        map: i === 4 && path ? this.tex(path) : null,
      })));
    card.position.y = cardH / 2 + 0.08;
    card.castShadow = true;
    g.add(card);
    // frame (slightly larger back plate in tribe colour)
    const frame = new THREE.Mesh(new THREE.BoxGeometry(cardW + 0.08, cardH + 0.08, 0.04),
      new THREE.MeshStandardMaterial({ color: TRIBE_HEX[tribe], roughness: 0.5, metalness: 0.2 }));
    frame.position.set(0, cardH / 2 + 0.08, -0.03); frame.castShadow = true;
    g.add(frame);
    // base
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.4, 0.12, 16),
      new THREE.MeshStandardMaterial({ color: TRIBE_HEX[tribe], roughness: 0.4, metalness: 0.3 }));
    base.position.y = 0.06; base.castShadow = true; base.receiveShadow = true;
    g.add(base);
    return g;
  }

  private wagon(p: number): THREE.Group {
    const g = new THREE.Group();
    const crate = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.4, 0.7),
      new THREE.MeshStandardMaterial({ color: 0x6b4a25, roughness: 0.9 }));
    crate.position.y = 0.3; crate.castShadow = true; g.add(crate);
    for (const sx of [-0.32, 0.32]) for (const sz of [-0.3, 0.3]) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.06, 14),
        new THREE.MeshStandardMaterial({ color: 0x2a1d10, roughness: 0.8 }));
      wheel.rotation.z = Math.PI / 2; wheel.position.set(sx, 0.16, sz); wheel.castShadow = true; g.add(wheel);
    }
    return g;
  }

  // full rebuild of dynamic content from a Game state
  update(g: Game) {
    this.dynamic.clear();
    this.buildTiles(g);
    // units
    for (const u of g.units.values()) {
      if (!u.pos) continue;
      const s = this.standee(u);
      const [x, z] = tileWorld(u.pos[0], u.pos[1]);
      s.position.set(x, 0.13, z);
      this.dynamic.add(s);
    }
    // wagons
    for (let p = 0; p < 2; p++) for (const w of g.wagons[p]) {
      if (w.hp <= 0) continue;
      const wg = this.wagon(p);
      const [x, z] = tileWorld(w.col, w.row);
      wg.position.set(x, 0.13, z);
      this.dynamic.add(wg);
    }
    // fields
    for (const [k, f] of g.fields.entries()) {
      const [c, r] = k.split(',').map(Number);
      const fld = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.06, 0.7),
        new THREE.MeshStandardMaterial({ color: f.type === 'crop' ? 0xc8a23a : 0x7d6b4a, roughness: 1 }));
      const [x, z] = tileWorld(c, r); fld.position.set(x, 0.15, z); fld.receiveShadow = true;
      this.dynamic.add(fld);
    }
    // palisades — a wall on the stake line of the column
    for (const [col, owner] of g.palisades.entries()) {
      const k = g.stakes[col];
      const wall = new THREE.Mesh(new THREE.BoxGeometry(TILE, 0.5, 0.12),
        new THREE.MeshStandardMaterial({ color: 0x5a4326, roughness: 0.9 }));
      const [x, z] = tileWorld(col, k - 1); wall.position.set(x, 0.32, z - STEP / 2); wall.castShadow = true;
      this.dynamic.add(wall);
    }
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };
}
