// Policy bots — TS port of sim/bots.py (Phase 0: setup() only so far).
// The opening placement depends on tb(), which uses zlib-compatible CRC-32,
// so the port reproduces the Python oracle's initial board exactly.

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
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export interface UnitPlan { arch: string; pos: [number, number]; }
export interface SetupPlan { wagons: number[]; units: UnitPlan[]; }

export class Policy {
  name: string;
  seed = 0;
  me = 0;
  constructor(name: string) { this.name = name; }

  reset(seed: number, player: number) { this.seed = seed; this.me = player; }

  // deterministic tiebreak in [0,1) — mirrors bots.py tb()
  tb(...parts: (string | number)[]): number {
    const s = `${this.seed}|${this.name}|${this.me}|${parts.map(String).join('|')}`;
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
}

export function makeBot(name: string): Policy { return new Policy(name); }
