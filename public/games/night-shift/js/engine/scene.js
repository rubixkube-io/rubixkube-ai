'use strict';
// A scene is one map: terrain, what blocks movement, props, spots you can look at, and exits to other scenes.
// Ground kinds: 0 grass, 1 path, 2 water, 3 bank, 4 stone, 5 water feature, 6 sky, 7 cliff, 8 wood floor, 9 wall.
const SOLID_KIND = [0, 0, 1, 0, 0, 1, 1, 1, 0, 1];
class Scene {
  constructor(id, W, H, seed = 11) {
    Object.assign(this, { id, W, H, seed, props: [], dyns: [], emits: [], lighters: [], spots: {}, exits: [], signs: [], tufts: [], rain: false, sea: false, wind: false, sky: false, indoor: false, title: '' });
    const n = W * H; this.ter = new Int32Array(n); this.kind = new Uint8Array(n); this.solid = new Uint8Array(n); this.sd = new Float32Array(n).fill(99); this.wdep = new Float32Array(n);
    this.r = rng(seed);
  }
  k(x, y) { return y * this.W + x; }
  meadow() {
    const { W, H, r } = this;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const k = y * W + x, n = fbm(x / 22 + this.seed, y / 22), edge = Math.min(x, y, W - 1 - x, H - 1 - y) + (NZ(x / 12, y / 12) - 0.5) * 22;
      const lk = 2.4 + (n - 0.5) * 3.4 + (dith(x, y) - 0.5) * 1.1 + (NZ(x / 7 + 40, y / 7) - 0.5) * 1.2;
      let c = [C.g0, C.g1, C.g2, C.g3, C.g4, C.g5][clamp(Math.floor(lk), 0, 5)];
      if (lk > 5.2 && r() < 0.25) c = C.g6;
      if (edge < 30 && !this.noForestFloor) { const f = 1 - edge / 30; if (dith(x, y) < f * 1.2) c = f > 0.6 ? C.f0 : f > 0.3 ? C.f1 : C.f2; }
      if (r() < 0.05 && c !== C.f0) c = mix(c, C.g5, 0.35);
      this.ter[k] = c; this.kind[k] = 0;
    }
    return this;
  }
  skyFill() { this.sky = true; this.kind.fill(6); this.ter.fill(0x6a5a9a); return this; }
  island(cx, cy, rx, ry) {
    const { W, H } = this;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const k = y * W + x, d = Math.sqrt(((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2) + (NZ(x / 10, y / 10) - 0.5) * 0.16;
      if (d < 1) { const n = fbm(x / 20, y / 20), lk = 2.4 + (n - 0.5) * 3 + (dith(x, y) - 0.5) * 1.1 - Math.max(0, d - 0.85) * 12; this.kind[k] = 0; this.ter[k] = [C.g0, C.g1, C.g2, C.g3, C.g4, C.g5][clamp(Math.floor(lk), 0, 5)]; } }
    for (let x = 0; x < W; x++) for (let y = H - 2; y > 0; y--) { const k = y * W + x; if (this.kind[k] !== 6 && this.kind[k + W] === 6) { const depth = 10 + Math.round(NZ(x / 6, 3) * 10); for (let j = 1; j <= depth && y + j < H; j++) { const kk = (y + j) * W + x; if (this.kind[kk] !== 6) break; this.kind[kk] = 7; const l = j / depth + (dith(x, y + j) - 0.5) * 0.3; this.ter[kk] = l < 0.25 ? 0x6a5444 : l < 0.5 ? 0x4e3c34 : l < 0.8 ? 0x382a2a : 0x261c22; } } }
    return this;
  }
  interior(wallH = 34) {
    const { W, H } = this; this.indoor = true;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const k = y * W + x;
      if (y < wallH) { this.kind[k] = 9; const wl = y > wallH - 4 ? (y === wallH - 1 ? C.wd0 : C.wd2) : (x % 14 === 0 ? 0x8a6a52 : (Math.floor(x / 7) + Math.floor(y / 7)) % 2 ? 0xc8a882 : 0xbc9c78); this.ter[k] = y < 3 ? C.wd1 : wl; continue; }
      const plank = Math.floor((y - wallH) / 7), seam = (y - wallH) % 7 === 6 || (x + plank * 23) % 61 === 0, l = NZ(x / 24, plank * 3) * 0.6 + hash(plank * 7 + Math.floor((x + plank * 23) / 61)) * 0.4 + (dith(x, y) - 0.5) * 0.12;
      this.kind[k] = 8; this.ter[k] = seam ? 0x5a3c2a : l < 0.5 ? 0x7a5238 : 0x86603f; }
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (x < 4 || x > W - 5 || y > H - 4) { const k = y * W + x; this.kind[k] = 9; this.ter[k] = C.wd0; }
    return this;
  }
  stream(pts) {
    const { W, H } = this, line = catmull(pts, 40), sr0 = line.map((p, i) => 8 + 2 * Math.sin(i * 0.05) + (NZ(i * 0.04, 4) - 0.5) * 3);
    this.streamLine = line; this.streamR = sr0;
    line.forEach(([cx, cy], i) => { const rad = sr0[i], Rr = rad + 7; for (let y = Math.max(0, Math.floor(cy - Rr)); y <= Math.min(H - 1, Math.ceil(cy + Rr)); y++) for (let x = Math.max(0, Math.floor(cx - Rr)); x <= Math.min(W - 1, Math.ceil(cx + Rr)); x++) { const d = Math.hypot(x - cx, y - cy) - rad, k = y * W + x; if (d < this.sd[k]) { this.sd[k] = d; this.wdep[k] = rad; } } });
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const k = y * W + x; if (this.sd[k] > 8) continue; const e = this.sd[k] + (NZ(x / 5, y / 5) - 0.5) * 2.4;
      if (e < 0) { const t = clamp(-e / this.wdep[k]); this.kind[k] = 2; const v = t + (NZ(x / 6, y / 14) - 0.5) * 0.35 + (dith(x, y) - 0.5) * 0.25; this.ter[k] = v < 0.18 ? C.w3 : v < 0.45 ? C.w2 : v < 0.75 ? C.w1 : C.w0; }
      else if (e < 2.4) { this.kind[k] = 3; this.ter[k] = e < 1.2 ? C.bk0 : C.bk1; }
      else if (e < 6 && dith(x, y) < 0.5) this.ter[k] = mix(this.ter[k], C.g0, 0.4); }
    return this;
  }
  seaFrom(yTop) {
    const { W, H } = this; this.sea = true;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const k = y * W + x, shore = yTop + Math.sin(x * 0.03) * 6 + (NZ(x / 14, 7) - 0.5) * 10, e = y - shore;
      this.sd[k] = Math.min(this.sd[k], shore - y);
      if (e > 6) { const t = clamp((e - 6) / 60), v = t + (NZ(x / 8, y / 20) - 0.5) * 0.3 + (dith(x, y) - 0.5) * 0.2; this.kind[k] = 2; this.ter[k] = v < 0.15 ? C.w3 : v < 0.4 ? C.w2 : v < 0.7 ? C.w1 : C.w0; }
      else if (e > 2) { this.kind[k] = 3; this.ter[k] = dith(x, y) > 0.5 ? 0x8a7a5e : 0x6e624e; }
      else if (e > -6) { this.kind[k] = 1; const v = NZ(x / 3, y / 3) + (dith(x, y) - 0.5) * 0.4; this.ter[k] = v < 0.4 ? 0xb8a070 : v < 0.7 ? 0xd0b884 : 0xe2cc98; } }
    return this;
  }
  path(P, wid = 4.6, pal = [C.d1, C.d2, C.d3, C.d4]) {
    const { W, H } = this;
    for (const [cx, cy] of catmull(P, 30)) for (let y = Math.floor(cy - 7); y <= cy + 7; y++) for (let x = Math.floor(cx - 7); x <= cx + 7; x++) { if (x < 0 || y < 0 || x >= W || y >= H) continue; const k = y * W + x; if ([2, 3, 5, 6, 7, 9].includes(this.kind[k])) continue; const d = Math.hypot(x - cx, y - cy) + (NZ(x / 4, y / 4) - 0.5) * 3; if (d > wid) continue;
      if (d > wid - 1 && dith(x, y) > 0.5) { if (this.kind[k] !== 1) this.ter[k] = mix(this.ter[k], pal[0], 0.5); continue; }
      this.kind[k] = 1; const v = NZ(x / 3, y / 3) + (dith(x, y) - 0.5) * 0.4 - d * 0.05; this.ter[k] = v < 0.3 ? pal[0] : v < 0.6 ? pal[1] : v < 0.85 ? pal[2] : pal[3]; }
    return this;
  }
  stones(cx, cy, rx, ry, pal, cell = 11, rect = false) {
    const { W, H } = this;
    for (let y = Math.max(0, Math.floor(cy - ry - 4)); y < Math.min(H, cy + ry + 4); y++) for (let x = Math.max(0, Math.floor(cx - rx - 4)); x < Math.min(W, cx + rx + 4); x++) {
      const k = y * W + x, inside = rect ? Math.max(Math.abs(x - cx) / rx, Math.abs(y - cy) / ry) + (NZ(x / 7, y / 7) - 0.5) * 0.12 : ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + (NZ(x / 9, y / 9) - 0.5) * 0.5;
      if (inside > 1 || [2, 3, 5, 6, 7, 9].includes(this.kind[k])) continue;
      let d1 = 1e9, d2 = 1e9, id = 0; const gx = Math.floor(x / cell), gy = Math.floor(y / cell);
      for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) { const sx = (gx + i) * cell + hash((gx + i) * 31 + (gy + j) * 17) * cell, sy = (gy + j) * cell + hash((gx + i) * 7 + (gy + j) * 59) * cell, d = Math.hypot(x - sx, (y - sy) * 1.2); if (d < d1) { d2 = d1; d1 = d; id = (gx + i) * 1000 + gy + j; } else if (d < d2) d2 = d; }
      const hv = hash(id * 0.37); if (hv < 0.08 && inside > 0.6) continue;
      this.kind[k] = 4;
      if (d2 - d1 < 1.3) { this.ter[k] = NZ(x / 3, y / 3) > 0.64 ? C.moss : pal[0]; continue; }
      const l = 0.3 + hv * 0.5 - (d1 / cell) * 0.25 + (dith(x, y) - 0.5) * 0.25;
      this.ter[k] = l < 0.3 ? pal[1] : l < 0.55 ? pal[2] : l < 0.75 ? pal[3] : pal[4];
    }
    return this;
  }
  flowers(rate = 1) {
    const { W, H, r } = this;
    for (let y = 2; y < H - 2; y++) for (let x = 1; x < W - 1; x++) { const k = y * W + x; if (this.kind[k] !== 0) continue; const m = fbm(x / 34 + 50, y / 34), rr = r();
      if ((m > 0.62 && rr < 0.016 * rate) || rr < 0.0008 * rate) { const t = hash(Math.floor(x / 9) * 3.1 + Math.floor(y / 9) * 7.7), col = t < 0.5 ? C.pk : t < 0.72 ? C.wh : t < 0.9 ? C.lv : C.ye; this.ter[k] = col; this.ter[k + W] = C.g1; }
      else if (rr < 0.006) { this.ter[k] = C.g6; this.ter[k + W] = C.g3; } }
    for (let i = 0; i < 300; i++) { const x = r() * W | 0, y = r() * H | 0, k = y * W + x; if (this.kind[k] === 1) { this.ter[k] = mix(this.ter[k], 0xffffff, 0.25); } }
    return this;
  }
  lilies(idx) { const line = this.streamLine; for (const [i, f] of idx) { const [cx, cy] = line[i], sx = Math.round(cx + (hash(i) - 0.5) * 8), sy = Math.round(cy), S = f ? LILYF : LILY; for (let y = 0; y < S.h; y++) for (let x = 0; x < S.w; x++) { const c = S.d[y * S.w + x]; if (c < 0) continue; const k = (sy + y) * this.W + sx + x; if (this.kind[k] === 2) { this.ter[k] = c; this.kind[k] = 5; } } } return this; }
  finishSolid() {
    const { W, H } = this;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const k = y * W + x; if (SOLID_KIND[this.kind[k]]) this.solid[k] = 1; if (x < 6 || x > W - 7 || y < 8 || y > H - 6) this.solid[k] = 1; }
    return this;
  }
  clear(x0, y0, x1, y1) { for (let y = Math.max(0, y0); y <= Math.min(this.H - 1, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(this.W - 1, x1); x++) this.solid[y * this.W + x] = 0; }
  block(x0, y0, x1, y1) { for (let y = Math.max(0, y0); y <= Math.min(this.H - 1, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(this.W - 1, x1); x++) this.solid[y * this.W + x] = 1; }
  free(x, y, rr = 4) { for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) { const xx = x + i, yy = y + j; if (xx < 0 || yy < 0 || xx >= this.W || yy >= this.H) return false; const k = yy * this.W + xx; if (this.solid[k] || this.kind[k] === 1 || this.kind[k] === 3) return false; } return true; }
  landNear(x, y) { for (let rr = 0; rr < 30; rr++) for (let a = 0; a < 16; a++) { const xx = Math.round(x + Math.cos(a / 16 * 6.283) * rr), yy = Math.round(y + Math.sin(a / 16 * 6.283) * rr); if (this.free(xx, yy, 3)) return [xx, yy]; } return [x, y]; }
  streamSide(i, side, off) { const L0 = this.streamLine, a = L0[Math.max(0, i - 2)], b = L0[Math.min(L0.length - 1, i + 2)], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; let nx = -dy / L, ny = dx / L; if (Math.sign(nx) !== side) { nx = -nx; ny = -ny; } return this.landNear(Math.round(L0[i][0] + nx * (this.streamR[i] + off)), Math.round(L0[i][1] + ny * (this.streamR[i] + off))); }
  streamX(y) { let best = this.streamLine[0], bd = 1e9; for (const p of this.streamLine) { const d = Math.abs(p[1] - y); if (d < bd) { bd = d; best = p; } } return best[0]; }
  // things in the scene
  prop(s, x, y, o = {}) { const p = { s, x: Math.round(x), y: Math.round(y), base: o.base !== undefined ? o.base : y + s.h, ...o }; this.props.push(p); if (o.foot) { const [a, b, c, d] = o.foot; this.block(p.x + a, p.y + b, p.x + c, p.y + d); } return p; }
  dyn(base, fn, box) { this.dyns.push({ base, fn, box }); }
  emit(fn) { this.emits.push(fn); }
  lights(fn) { this.lighters.push(fn); }
  sign(x, y, t, o = {}) { const s = makeSign(t); this.signs.push({ x, y, t }); this.prop(s, x, y, { base: y + 12 }); if (!o.noBlock) { this.block(x + 2, y + 10, x + 3, y + 12); this.block(x + s.w - 4, y + 10, x + s.w - 3, y + 12); } return s; }
  spot(id, o) { if (!o) return this.spots[id]; this.spots[id] = { id, r: 16, ...o }; return this.spots[id]; }
  exit(o) { this.exits.push(o); }
  forest(keep, inner = 90) {
    const { W, H } = this, r = rng(this.seed + 66), trees = [];
    const TV = { g: [1, 2, 3, 4].map(i => makeRound(i * 7, TREE_G)), p: [1, 2, 3].map(i => makePine(i * 11, TREE_P)), a: [1, 2].map(i => makeRound(i * 13 + 5, TREE_A)), b: [makeRound(91, TREE_B)] };
    const inKeep = (x, y) => keep.some(([a, b, c, d]) => x >= a && x <= c && y >= b && y <= d);
    const tryTree = (x, y, minD) => { x = Math.round(x); y = Math.round(y); if (y < 6 || y > H + 6 || x < -6 || x > W + 6 || inKeep(x, y)) return; const kc = clamp(y, 0, H - 1) * W + clamp(x, 0, W - 1); if (this.kind[kc] !== 0 || this.solid[kc]) return;
      for (let j = -4; j <= 4; j++) for (let i = -6; i <= 6; i++) { const kk = clamp(y + j, 0, H - 1) * W + clamp(x + i, 0, W - 1); if (this.kind[kk] !== 0) return; }
      if (trees.some(t => Math.hypot(t.x - x, (t.y - y) * 1.4) < minD)) return;
      const edge = Math.min(x, y, W - x, H - y), roll = r(); let set = y < 40 ? (roll < 0.7 ? 'p' : 'g') : (roll < 0.3 ? 'p' : 'g'); if (edge > 40 && roll > 0.82) set = roll > 0.93 ? 'b' : 'a';
      const v = TV[set]; trees.push({ x, y, s: v[Math.floor(r() * v.length)], flip: r() < 0.5 }); this.block(x - 3, y - 3, x + 3, y); };
    for (let i = 0; i < W * H / 70; i++) { const x = r() * (W + 20) - 10, y = r() * (H + 30) - 4, edge = Math.min(x, y - 4, W - x, H - y); if (edge > 26 + r() * 22) continue; tryTree(x, y, 10); }
    for (let i = 0; i < inner; i++) tryTree(30 + r() * (W - 60), 40 + r() * (H - 80), 36);
    for (const t of trees) this.prop(t.s, t.x - (t.s.w >> 1), t.y - t.s.h + 1, { base: t.y, flip: t.flip });
    return this;
  }
  grass(n = 900) { const r = rng(this.seed + 5); for (let i = 0; i < n; i++) { const x = 10 + r() * (this.W - 20) | 0, y = 12 + r() * (this.H - 24) | 0, k = y * this.W + x; if (this.kind[k] !== 0 || this.solid[k]) continue; this.tufts.push({ x, y, h: 2 + (r() * 3 | 0), c: r() < 0.5 ? C.g4 : C.g5, c2: C.g2 }); } return this; }
  rocksAt(list) { for (const [x, y] of list) if (this.free(x, y, 3)) this.prop(ROCK, x - 2, y - 3, { base: y + 1, foot: [0, 2, 4, 3] }); return this; }
}
const SCENES = {};   // id -> builder(scene, night)
function buildScene(id, night) { const b = SCENES[id]; const s = b.make(night); s.title = b.title || ''; return s; }
