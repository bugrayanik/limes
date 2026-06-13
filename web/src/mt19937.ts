// MT19937 + CPython's random.Random(int).shuffle — exact port.
// LIMES needs deterministic caravan artifact ordering identical to the Python
// oracle (sim/engine.py uses random.Random(seed).shuffle). Reproduces CPython's
// init_by_array seeding, genrand_uint32, getrandbits, _randbelow, and shuffle.
// 32-bit multiplies use Math.imul (exact low-32-bit product).

const N = 624, M = 397;
const MATRIX_A = 0x9908b0df, UPPER = 0x80000000, LOWER = 0x7fffffff;

export class MT19937 {
  private mt = new Uint32Array(N);
  private mti = N + 1;

  // Seed exactly as CPython does for an integer seed: init_by_array with the
  // seed split into little-endian 32-bit words (our seeds fit in one word).
  constructor(seed: number) {
    const key: number[] = [];
    let s = seed >>> 0, hi = Math.floor(seed / 0x100000000);
    key.push(s);
    while (hi > 0) { key.push(hi >>> 0); hi = Math.floor(hi / 0x100000000); }
    this.initByArray(key.length ? key : [0]);
  }

  private initGenrand(s: number) {
    this.mt[0] = s >>> 0;
    for (let i = 1; i < N; i++) {
      const prev = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
      this.mt[i] = (Math.imul(1812433253, prev) + i) >>> 0;
    }
    this.mti = N;
  }

  private initByArray(key: number[]) {
    this.initGenrand(19650218);
    let i = 1, j = 0;
    let k = Math.max(N, key.length);
    for (; k; k--) {
      const prev = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
      this.mt[i] = ((this.mt[i] ^ Math.imul(prev, 1664525)) + key[j] + j) >>> 0;
      i++; j++;
      if (i >= N) { this.mt[0] = this.mt[N - 1]; i = 1; }
      if (j >= key.length) j = 0;
    }
    for (k = N - 1; k; k--) {
      const prev = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
      this.mt[i] = ((this.mt[i] ^ Math.imul(prev, 1566083941)) - i) >>> 0;
      i++;
      if (i >= N) { this.mt[0] = this.mt[N - 1]; i = 1; }
    }
    this.mt[0] = 0x80000000;
  }

  private genrandUint32(): number {
    let y: number;
    if (this.mti >= N) {
      let kk = 0;
      for (; kk < N - M; kk++) {
        y = (this.mt[kk] & UPPER) | (this.mt[kk + 1] & LOWER);
        this.mt[kk] = this.mt[kk + M] ^ (y >>> 1) ^ ((y & 1) ? MATRIX_A : 0);
      }
      for (; kk < N - 1; kk++) {
        y = (this.mt[kk] & UPPER) | (this.mt[kk + 1] & LOWER);
        this.mt[kk] = this.mt[kk + (M - N)] ^ (y >>> 1) ^ ((y & 1) ? MATRIX_A : 0);
      }
      y = (this.mt[N - 1] & UPPER) | (this.mt[0] & LOWER);
      this.mt[N - 1] = this.mt[M - 1] ^ (y >>> 1) ^ ((y & 1) ? MATRIX_A : 0);
      this.mti = 0;
    }
    y = this.mt[this.mti++];
    y ^= y >>> 11;
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= y >>> 18;
    return y >>> 0;
  }

  // CPython getrandbits for 1..32 bits.
  getrandbits(k: number): number { return this.genrandUint32() >>> (32 - k); }

  private randbelow(n: number): number {
    if (!n) return 0;
    const k = 32 - Math.clz32(n); // n.bit_length()
    let r = this.getrandbits(k);
    while (r >= n) r = this.getrandbits(k);
    return r;
  }

  // In-place Fisher-Yates matching CPython's random.shuffle.
  shuffle<T>(x: T[]): void {
    for (let i = x.length - 1; i >= 1; i--) {
      const j = this.randbelow(i + 1);
      const t = x[i]; x[i] = x[j]; x[j] = t;
    }
  }
}
