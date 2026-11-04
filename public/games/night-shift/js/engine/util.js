'use strict';
// Numbers, noise, colours and the sprite format every other file uses.
const VW = 256, VH = 160;
const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const NZ = (() => { const r = rng(3), g = new Float32Array(65536); for (let i = 0; i < g.length; i++) g[i] = r(); const v = (x, y) => g[(y & 255) * 256 + (x & 255)], sm = t => t * t * (3 - 2 * t);
  return (x, y) => { const i = Math.floor(x), j = Math.floor(y), u = sm(x - i), w = sm(y - j), a = v(i, j), b = v(i + 1, j), c = v(i, j + 1), d = v(i + 1, j + 1); return a + (b - a) * u + (c - a) * w + (a - b - c + d) * u * w; }; })();
const fbm = (x, y) => NZ(x, y) * 0.6 + NZ(x * 2.1 + 17, y * 2.1 + 9) * 0.3 + NZ(x * 4.3 + 5, y * 4.3 + 31) * 0.1;
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const dith = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const clamp = (v, a = 0, b = 1) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const mix = (a, b, t) => { const ar = a >> 16 & 255, ag = a >> 8 & 255, ab = a & 255; return ((ar + ((b >> 16 & 255) - ar) * t) | 0) << 16 | ((ag + ((b >> 8 & 255) - ag) * t) | 0) << 8 | ((ab + ((b & 255) - ab) * t) | 0); };
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
function catmull(pts, n) { const out = []; for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)]; for (let k = 0; k < n; k++) { const t = k / n, t2 = t * t, t3 = t2 * t, f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3); out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]); } } out.push(pts[pts.length - 1].slice()); return out; }

const C = {
  ink: 0x15111f, shade: 0x1a1428,
  g0: 0x1c3431, g1: 0x264a39, g2: 0x32603f, g3: 0x457a44, g4: 0x62974b, g5: 0x8cb55a, g6: 0xbdd570,
  f0: 0x14242a, f1: 0x1a3134, f2: 0x21403b,
  d0: 0x4a3328, d1: 0x6b4c35, d2: 0x8e6d48, d3: 0xb18e5e, d4: 0xd3b47e,
  w0: 0x2b3160, w1: 0x3e4985, w2: 0x5867a5, w3: 0x8391c7, w4: 0xbac7ea, w5: 0xf0f3ff,
  bk0: 0x25233a, bk1: 0x36324c,
  pk: 0xf3a8bb, pk2: 0xc6708f, wh: 0xf4eee0, ye: 0xf5d77a, ye2: 0xc49a3c, lv: 0xb7a6e2, lv2: 0x7d6db0,
  wd0: 0x2b1d1b, wd1: 0x4a3125, wd2: 0x6c4931, wd3: 0x92683f, wd4: 0xb48650,
  st0: 0x253844, st1: 0x324e5d, st2: 0x466a73, st3: 0x618b88, st4: 0x88b0a1,
  br0: 0x381f37, br1: 0x56304a, br2: 0x784057, br3: 0x9b5761, br4: 0xbf7769,
  ro0: 0x4f2224, ro1: 0x7a3229, ro2: 0xa24a33, ro3: 0xc76c45, ro4: 0xe0935c,
  pl0: 0xe9dcc2, pl1: 0xd3c3a3, pl2: 0xb2a083, pl3: 0x8a7a64,
  f_0: 0x7a2416, f_1: 0xc8401e, f_2: 0xf07a2a, f_3: 0xffb84a, f_4: 0xffeaa6,
  glass: 0x2a3050, warm: 0xffcc6a, warm2: 0xffe6a4,
  moss: 0x5f8f3e, moss2: 0x86b04a,
  sl0: 0x2a3148, sl1: 0x3a4566, sl2: 0x4f5d84, sl3: 0x6a7aa0,
};
const RB = { H: 0x4a86ff, B: 0x1f5cf0, D: 0x0d3aa8, T: 0x5b93ff, W: 0xffffff, K: 0x0b1020, P: 0xff8fa8 };

const spr = (w, h) => ({ w, h, d: new Int32Array(w * h).fill(-1) });
const sp = (s, x, y, c) => { x |= 0; y |= 0; if (x >= 0 && y >= 0 && x < s.w && y < s.h) s.d[y * s.w + x] = c; };
const sg = (s, x, y) => (x >= 0 && y >= 0 && x < s.w && y < s.h) ? s.d[y * s.w + x] : -1;
const sr = (s, x, y, w, h, c) => { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) sp(s, x + i, y + j, c); };
const ascii = (rows, pal) => { const h = rows.length, w = Math.max(...rows.map(r => r.length)), s = spr(w, h); rows.forEach((r, y) => [...r].forEach((ch, x) => { if (pal[ch] !== undefined) sp(s, x, y, pal[ch]); })); return s; };
const scale2 = s => { const o = spr(s.w * 2, s.h * 2); for (let y = 0; y < o.h; y++) for (let x = 0; x < o.w; x++) o.d[y * o.w + x] = s.d[(y >> 1) * s.w + (x >> 1)]; return o; };
const outline = (s, c, below = true) => { const cp = s.d.slice(); for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) { if (cp[y * s.w + x] < 0) continue; const b = y + 1 >= s.h || cp[(y + 1) * s.w + x] < 0, l = x === 0 || cp[y * s.w + x - 1] < 0, r = x + 1 >= s.w || cp[y * s.w + x + 1] < 0; if ((below && b) || ((l || r) && dith(x, y) > 0.55)) s.d[y * s.w + x] = c; } };

// 3 by 5 letters for signs
const GLYPH = { A: '25755', B: '65656', C: '34443', D: '65556', E: '74647', F: '74644', G: '34553', H: '55755', I: '72227', J: '11152', K: '55655', L: '44447', M: '57755', N: '65555', O: '25552', P: '65644', Q: '25563', R: '65655', S: '34216', T: '72222', U: '55557', V: '55552', W: '55775', X: '55255', Y: '55222', Z: '71247', 0: '75557', 1: '26227', 2: '61247', 3: '61216', 4: '55711', 5: '74616', 6: '34757', 7: '71222', 8: '75757', 9: '75716', '-': '00700', '.': '00002', '/': '11244', ':': '02020', ' ': '00000' };
const textW = t => t.length * 4 - 1;
