'use strict';
// Draws the current scene into a 256 by 160 buffer, lights it, and puts it on the canvas.
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const img = ctx.createImageData(VW, VH), out32 = new Uint32Array(img.data.buffer);
const fb = new Int32Array(VW * VH);
const AR = new Float32Array(VW * VH), AG = new Float32Array(VW * VH), AB = new Float32Array(VW * VH);
const OR = new Float32Array(VW * VH), OG = new Float32Array(VW * VH), OB = new Float32Array(VW * VH);
const VIG = new Float32Array(VW * VH);
for (let y = 0; y < VH; y++) for (let x = 0; x < VW; x++) { const dx = (x - VW / 2) / (VW / 2), dy = (y - VH / 2) / (VH / 2), d = Math.sqrt(dx * dx * 0.8 + dy * dy); VIG[y * VW + x] = 1 - 0.38 * Math.max(0, d - 0.55) ** 1.5; }
let camX = 0, camY = 0, T = 0;
const P = (wx, wy, c) => { const x = Math.round(wx) - camX, y = Math.round(wy) - camY; if (x >= 0 && y >= 0 && x < VW && y < VH) fb[y * VW + x] = c; };
const PM = (wx, wy, c, a) => { const x = Math.round(wx) - camX, y = Math.round(wy) - camY; if (x >= 0 && y >= 0 && x < VW && y < VH) { const i = y * VW + x; fb[i] = mix(fb[i], c, a); } };
const RECT = (wx, wy, w, h, c) => { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) P(wx + i, wy + j, c); };
function blit(s, wx, wy, flip) {
  const x0 = Math.round(wx) - camX, y0 = Math.round(wy) - camY; if (x0 >= VW || y0 >= VH || x0 + s.w <= 0 || y0 + s.h <= 0) return;
  for (let j = 0; j < s.h; j++) { const y = y0 + j; if (y < 0 || y >= VH) continue; const row = j * s.w; for (let i = 0; i < s.w; i++) { const x = x0 + i; if (x < 0 || x >= VW) continue; const c = s.d[row + (flip ? s.w - 1 - i : i)]; if (c >= 0) fb[y * VW + x] = c; } }
}
function shadow(wx, wy, rx, ry, a = 0.45) { for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / ry) ** 2 <= 1) PM(wx + i, wy + j, C.shade, a); }
function text3(x, y, t, c) { for (const ch of t.toUpperCase()) { const g = GLYPH[ch] || GLYPH[' ']; for (let r = 0; r < 5; r++) { const bits = +g[r]; for (let i = 0; i < 3; i++) if (bits >> (2 - i) & 1) P(x + i, y + r, c); } x += 4; } }
const lights = [];
const light = (x, y, r, c, s) => lights.push(x, y, r, c[0], c[1], c[2], s);
const WARM = [1.0, 0.66, 0.32], CANDLE = [1.0, 0.72, 0.4], FLY = [0.85, 1.0, 0.45], BLUE = [0.4, 0.58, 1.0], CYAN = [0.4, 1.0, 0.9], RED = [1, 0.4, 0.32];
const AMB = [[1.12, 0.88, 0.68], [0.66, 0.58, 0.8], [0.36, 0.38, 0.62]];
let emis = [];
const parts = [];
const spawn = p => { parts.push(p); if (parts.length > 500) parts.shift(); };

const FRAME = (() => { const p = []; for (let i = 8; i >= 2; i--) p.push([i, 11]); for (let j = 10; j >= 2; j--) p.push([2, j]); for (let i = 3; i <= 10; i++) p.push([i, 2]); p.push([10, 3]); return p; })();
function drawRubix() {
  const wx = Math.round(R.x), wy = Math.round(R.y);
  let bob = 0, fl = 0, fr = 0, armL = 0, armR = 0, eyes = 'open';
  const hop = Math.round(R.hop);
  if (R.moving) { const ph = Math.floor(R.anim * 9) % 2; fl = ph; fr = 1 - ph; bob = ph; }
  else { bob = Math.sin(T * 2.4) > 0.5 ? 1 : 0; if ((T * 0.31) % 1 > 0.965) eyes = 'blink'; }
  if (R.happy > 0) { eyes = 'happy'; armL = armR = 4; }
  if (R.sit) { bob = 0; eyes = (T * 0.2) % 1 > 0.9 ? 'blink' : 'happy'; }
  const look = R.dir === 'left' ? -1 : R.dir === 'right' ? 1 : 0, back = R.dir === 'up' && !R.sit;
  shadow(wx, wy, 8, 2);
  const bx = wx - 8, by = wy - 17 - bob - hop + (R.sit ? 3 : 0);
  const pix = (i, j, c) => P(bx + i, by + j, c);
  if (!R.sit) for (const [fx, lift] of [[3, fl], [10, fr]]) { const bottom = wy - 1 - hop - lift; for (let y = by + 14; y <= bottom; y++) for (let i = 0; i < 3; i++) P(bx + fx + i, y, y === bottom ? RB.D : RB.B); }
  for (let j = 0; j < 14; j++) { const [a, b] = j === 0 || j === 13 ? [3, 12] : j === 1 || j === 12 ? [1, 14] : [0, 15]; for (let i = a; i <= b; i++) pix(i, j, j <= 1 ? RB.H : (i === b || j >= 12) ? RB.D : RB.B); }
  for (const [ax, up, outer] of [[-2, armL, 0], [16, armR, 1]]) { const top = 7 - up; for (let i = 0; i < 2; i++) { pix(ax + i, top, RB.H); pix(ax + i, top + 1, RB.B); pix(ax + i, top + 2, i === outer ? RB.D : RB.B); } }
  if (back) { for (let i = 3; i <= 12; i++) pix(i, 3, RB.H); for (let i = 9; i <= 13; i++) pix(i, 9, RB.D); return; }
  for (const [i, j] of FRAME) pix(i, j, RB.W);
  for (let j = 4; j <= 11; j++) for (let i = 9; i <= 14; i++) pix(i, j, RB.T);
  for (const [ex, ey] of [[5, 5], [11, 5]]) { const x = ex + look;
    if (eyes === 'open') { pix(x, ey, RB.K); pix(x + 1, ey, RB.W); pix(x, ey + 1, RB.K); pix(x + 1, ey + 1, RB.K); pix(x, ey + 2, RB.K); pix(x + 1, ey + 2, RB.K); }
    else if (eyes === 'blink') { pix(x, ey + 2, RB.K); pix(x + 1, ey + 2, RB.K); }
    else { pix(ex - 1, ey + 2, RB.K); pix(ex, ey + 1, RB.K); pix(ex + 1, ey + 1, RB.K); pix(ex + 2, ey + 2, RB.K); } }
  pix(3, 8, RB.P); pix(4, 8, RB.P); pix(12, 8, RB.P); pix(13, 8, RB.P);
  pix(6 + look, 9, RB.K); pix(7 + look, 9, RB.K); pix(8 + look, 9, RB.K); pix(6 + look, 10, RB.K); pix(7 + look, 10, RB.P); pix(8 + look, 10, RB.K);
  if (R.mug) { RECT(bx + 13, by + 9, 4, 4, 0x5b7fb5); P(bx + 14, by + 9, 0x7a4a2a); P(bx + 15, by + 9, 0x7a4a2a); }
}
function flame(cx, base, Wd, Hh, seed, smoky) {
  for (let dy = 0; dy < Hh; dy++) { const yv = dy / Hh; for (let dx = -Wd; dx <= Wd; dx++) {
    const w = Wd * Math.pow(1 - yv, 0.75) * (0.85 + 0.15 * Math.sin(T * 9 + yv * 6 + seed));
    if (w <= 0) continue; const n = NZ(dx * 0.32 + seed * 10, dy * 0.22 - T * 7);
    const v = (1 - Math.abs(dx + Math.sin(T * 5 + yv * 4 + seed) * yv * 2) / (w + 0.5)) * (1 - yv * 0.85) + (n - 0.5) * 0.75;
    if (v < 0.16) continue;
    P(cx + dx, base - dy, v > 0.78 ? C.f_4 : v > 0.56 ? C.f_3 : v > 0.36 ? C.f_2 : smoky ? C.f_0 : C.f_1);
  } }
}


function drawPerson(n) {
  const blink = ((T + n.ph * 3) * 0.29) % 1 > 0.955, bob = Math.sin(T * 1.6 + n.ph) > 0.6 ? 1 : 0;
  shadow(n.x, n.y, 6, 2);
  blit(blink ? n.sb : n.s, Math.round(n.x - n.s.w / 2), Math.round(n.y - n.s.h) - bob, R.x < n.x - 4);
}
function drawObserver(x0, y0, alert) {
  const bob = Math.round(Math.sin(T * 2.2 + x0) * 1.5), x = x0, y = y0 - 12 + bob;
  shadow(x0, y0, 4, 1, 0.35);
  RECT(x - 3, y - 2, 7, 5, RB.B); RECT(x - 2, y - 3, 5, 1, RB.H); RECT(x - 2, y + 3, 5, 1, RB.D); P(x + 3, y - 2, RB.D); P(x + 3, y + 2, RB.D); P(x - 4, y, RB.D); P(x + 4, y, RB.D); P(x, y - 4, RB.D);
  emis.push(() => { const c = alert ? (Math.sin(T * 8) > 0 ? 0xff6a50 : 0xffb070) : 0xcfe2ff; RECT(x - 1, y - 1, 3, 2, c); P(x, y - 1, 0xffffff); P(x, y - 5, alert ? 0xff6a50 : 0x9cc0ff); });
  light(x, y, alert ? 18 : 14, alert ? RED : BLUE, alert ? 0.5 + 0.25 * Math.sin(T * 8) : 0.35);
}
const MK = { '!': ["kkk", "kyk", "kyk", "kyk", "kyk", "kkk", "kyk", "kkk"], '?': [".kkkk.", "kyyyyk", "kykkyk", "kkkyyk", "..kykk", "..kkk.", "..kyk.", "..kkk."] };
function marker(x, y, m) { const rows = MK[m], w = rows[0].length; rows.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'k') P(x - (w >> 1) + i, y + j, C.ink); else if (ch === 'y') P(x - (w >> 1) + i, y + j, m === '!' ? C.ye : 0xcfe0ff); })); }

const fireflies = []; { const r = rng(9); for (let i = 0; i < 46; i++) fireflies.push({ hx: r(), hy: r(), ph: r() * 6.28, sp: 0.4 + r() * 0.6 }); }
const motes = []; { const r = rng(14); for (let i = 0; i < 22; i++) motes.push({ x: r() * VW, y: r() * VH, sp: 2 + r() * 4, ph: r() * 6.28, big: r() < 0.35 }); }
const petals = []; { const r = rng(15); for (let i = 0; i < 14; i++) petals.push({ x: r() * VW, y: r() * VH, sp: 6 + r() * 6, ph: r() * 6.28 }); }
const drops = []; { const r = rng(21); for (let i = 0; i < 90; i++) drops.push({ x: r() * (VW + 60), y: r() * VH, sp: 140 + r() * 80, len: 3 + (r() * 3 | 0) }); }

function render() {
  const S = G.scene, W = S.W, H = S.H;
  const cx = Math.round(camX), cy = Math.round(camY); camX = cx; camY = cy; emis = []; lights.length = 0;
  for (let y = 0; y < VH; y++) { const sy = y + cy; if (sy < 0 || sy >= H) { fb.fill(0x0b0914, y * VW, y * VW + VW); continue; } fb.set(S.ter.subarray(sy * W + cx, sy * W + cx + VW), y * VW); }
  const nf = clamp(G.phase / 2);
  for (let y = 0; y < VH; y++) for (let x = 0; x < VW; x++) { const wx = x + cx, wy = y + cy, k = wy * W + wx, kd = S.kind[k];
    if (kd === 2) { if (S.sea) { const s = NZ(wx * 0.09 + T * 0.35, wy * 0.55 + Math.sin(wx * 0.05 + T) * 0.6); if (s > 0.8) fb[y * VW + x] = s > 0.86 ? C.w4 : mix(fb[y * VW + x], C.w4, 0.5); }
      else { const s = NZ(wx * 0.16 + 4, wy * 0.75 - T * 2.4) * 0.75 + NZ(wx * 0.5 + 9, wy * 0.2 - T * 0.8) * 0.25; if (s > 0.86) fb[y * VW + x] = s > 0.9 ? C.w5 : C.w4; else if (s > 0.8) fb[y * VW + x] = mix(fb[y * VW + x], C.w4, 0.45); } }
    else if (kd === 3 && S.sea) { if (NZ(wx * 0.3 + T * 0.8, wy * 0.3) > 0.62) fb[y * VW + x] = mix(fb[y * VW + x], 0xf0f4ff, 0.7); }
    else if (kd === 6) { const v = clamp(wy / H), top = mix(0x2a2458, 0x6a4a8a, v), bot = mix(top, 0xe8927e, clamp((v - 0.45) * 1.6)); let c = mix(bot, mix(0x141a3a, 0x241c48, v), nf * 0.8); const cl = NZ((wx * 0.5 + camX * 0.5 - T * 3) / 26, wy / 10); if (cl > 0.62) c = mix(c, cl > 0.72 ? 0xf6c6c0 : 0xb896c0, (1 - nf * 0.6) * 0.75); fb[y * VW + x] = c; if (nf > 0.5 && hash(wx * 7.1 + wy * 131.7) > 0.996) emis.push(() => P(wx, wy, 0xe0e8ff)); } }
  for (const t of S.tufts) { if (t.x < cx - 2 || t.x > cx + VW + 2 || t.y < cy || t.y > cy + VH + 4) continue; const sw = Math.round(Math.sin(T * 1.4 + t.x * 0.09 + t.y * 0.05) * (S.wind ? 1.4 : 0.7)); for (let h = 0; h < t.h; h++) P(t.x + (h === t.h - 1 ? sw : 0), t.y - h, h === 0 ? t.c2 : t.c); P(t.x - 1, t.y - 1, t.c2); P(t.x + 1, t.y - 1 + (t.h > 3 ? -1 : 0), t.c); }
  if (S.ground) S.ground();
  const list = [];
  for (const p of S.props) { if (p.x > cx + VW + 24 || p.y > cy + VH || p.x + p.s.w < cx - 24 || p.y + p.s.h < cy - 30) continue; list.push(p.base, () => { blit(p.s, p.x, p.y, p.flip); if (p.after) p.after(); }); }
  for (const d of S.dyns) list.push(typeof d.base === 'function' ? d.base() : d.base, d.fn);
  list.push(R.y, drawRubix);
  for (const n of G.people()) list.push(n.y, () => drawPerson(n));
  const order = []; for (let i = 0; i < list.length; i += 2) order.push(i); order.sort((a, b) => list[a] - list[b]);
  for (const i of order) list[i + 1]();
  if (S.over) S.over();
  for (const p of parts) { const a = p.life / p.max;
    if (p.k === 'smoke') { const rr = Math.round(p.r + a * 4), al = (1 - a) * 0.3; for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) { const d = (i * i + j * j) / (rr * rr + 0.1); if (d <= 1) PM(p.x + i, p.y + j, p.c || 0xa49eb2, al * (d < 0.45 ? 1 : 0.55)); } }
    else if (p.k === 'steam') { if (dith(Math.round(p.x), Math.round(p.y)) < (1 - a)) PM(p.x + Math.sin(p.life * 4) * 1.2, p.y, 0xf0ecf4, 0.6); }
    else if (p.k === 'ripple') { const rr = 1 + a * 3; PM(p.x - rr, p.y, 0xc8d4f0, (1 - a) * 0.6); PM(p.x + rr, p.y, 0xc8d4f0, (1 - a) * 0.6); } }
  for (const s of G.signals) { if (s.scene !== S.id) continue; const u = clamp((T - s.t0) / s.dur), x = lerp(s.x0, s.x1, u), y = lerp(s.y0, s.y1, u) - Math.sin(u * Math.PI) * (s.kind === 'pigeon' ? 26 : 14);
    if (s.kind === 'pigeon') { const f = Math.floor(T * 10) % 2, dir = s.x1 < s.x0; RECT(x - 2, y, 5, 2, 0xc8c4d0); P(dir ? x - 3 : x + 3, y, 0x9a96a8); P(dir ? x - 4 : x + 4, y, C.ye2); RECT(x - 1, y + (f ? -2 : 2), 3, 1, 0xf0eef4); P(x, y + 2, C.wh); shadow(x, y + 20, 2, 1, 0.25); }
    else { emis.push(() => { for (let k = 0; k < 5; k++) { const uu = clamp(u - k * 0.02), xx = lerp(s.x0, s.x1, uu), yy = lerp(s.y0, s.y1, uu) - Math.sin(uu * Math.PI) * 14; PM(xx, yy, k ? 0x7fb0ff : 0xffffff, 1 - k * 0.18); } }); light(x, y, 14, BLUE, 0.6); } }
  // lights
  for (const f of S.lighters) f(nf);
  if (!S.indoor) light(R.x, R.y - 9, 22, BLUE, 0.4 * nf);
  const flies = [];
  if (S.flies && G.phase > 0.3 && !S.rain) for (const f of fireflies) { const x = f.hx * W + Math.sin(T * f.sp + f.ph) * 9, y = f.hy * H + Math.cos(T * f.sp * 1.3 + f.ph * 1.7) * 6, b = 0.5 + 0.5 * Math.sin(T * 3 + f.ph * 5); if (x < cx - 8 || x > cx + VW + 8 || y < cy - 8 || y > cy + VH + 8) continue; const kk = Math.round(y) * W + Math.round(x); if (S.kind[kk] === 6 || S.kind[kk] === 7) continue; flies.push([x, y, b]); light(x, y, 9, FLY, 0.35 * b * nf); }
  const amb = S.indoor ? [0.78, 0.66, 0.6] : G.phase < 1 ? AMB[0].map((v, i) => lerp(v, AMB[1][i], G.phase)) : AMB[1].map((v, i) => lerp(v, AMB[2][i], G.phase - 1));
  if (S.rain) { amb[0] *= 0.82; amb[1] *= 0.88; amb[2] *= 1.02; }
  const sf = S.indoor ? 0.7 : clamp(1 - G.phase) * (S.rain ? 0 : 1);
  for (let y = 0; y < VH; y++) for (let x = 0; x < VW; x++) { const i = y * VW + x, wx = x + cx, wy = y + cy; let g = 1; OR[i] = 0; OG[i] = 0; OB[i] = 0;
    if (sf > 0) { g = S.indoor ? 1 : 1 + sf * (0.1 - 0.2 * (wx / W)); const sh = Math.sin((wx * 0.7 + wy) * 0.045 + T * 0.12); if (sh > 0.8 && dith(x, y) < (sh - 0.8) * 4) { OR[i] = 0.24 * sf; OG[i] = 0.14 * sf; OB[i] = 0.02 * sf; } }
    const v = VIG[i] * (0.82 + 0.18 * sf); AR[i] = amb[0] * g * v; AG[i] = amb[1] * g * v; AB[i] = amb[2] * g * v; }
  for (let n = 0; n < lights.length; n += 7) {
    const sx = Math.round(lights[n]) - cx, sy = Math.round(lights[n + 1]) - cy, r = lights[n + 2], cr = lights[n + 3], cg = lights[n + 4], cb = lights[n + 5], s = lights[n + 6];
    if (s <= 0.01 || sx < -r || sx > VW + r || sy < -r || sy > VH + r) continue; const ry = Math.ceil(r * 0.76);
    for (let y = Math.max(0, sy - ry); y <= Math.min(VH - 1, sy + ry); y++) { const dy = (y - sy) * 1.32; for (let x = Math.max(0, Math.floor(sx - r)); x <= Math.min(VW - 1, Math.ceil(sx + r)); x++) { const dx = x - sx, d2 = dx * dx + dy * dy; if (d2 >= r * r) continue; let f = 1 - Math.sqrt(d2) / r; f = Math.floor((f * f) * 6 + dith(x, y)) / 6; if (f <= 0) continue; const i = y * VW + x; OR[i] += cr * f * s; OG[i] += cg * f * s; OB[i] += cb * f * s; } }
  }
  for (let i = 0; i < VW * VH; i++) { const c = fb[i]; const r = (c >> 16 & 255) * (AR[i] + OR[i]) + OR[i] * 26, g = (c >> 8 & 255) * (AG[i] + OG[i]) + OG[i] * 26, b = (c & 255) * (AB[i] + OB[i]) + OB[i] * 26; fb[i] = (r > 255 ? 255 : r | 0) << 16 | (g > 255 ? 255 : g | 0) << 8 | (b > 255 ? 255 : b | 0); }
  // emissive
  for (const f of S.emits) f(nf);
  for (const p of parts) { if (p.k === 'ember') { const a = p.life / p.max; P(p.x, p.y, a < 0.4 ? C.f_4 : a < 0.7 ? C.f_3 : C.f_2); } else if (p.k === 'conn') { const [x, y] = p.path(p.u); P(x, y - 1, p.c || 0xffd070); P(x, y, 0xfff2c0); } }
  for (const f of emis) f();
  for (const s of S.signs) text3(s.x + 3, s.y + 2, s.t, 0xf4e7c9);
  for (const [x, y, b] of flies) { PM(x, y, 0xf4ffb0, 0.4 + b * 0.6); if (b > 0.7) { PM(x + 1, y, 0xd8f080, 0.4); PM(x, y + 1, 0xd8f080, 0.3); } }
  const put = (xx, yy, c, al) => { if (xx >= 0 && yy >= 0 && xx < VW && yy < VH) { const i = yy * VW + xx; fb[i] = mix(fb[i], c, al); } };
  if (S.rain) for (const d of drops) { const y = (d.y + T * d.sp) % (VH + 10) - 5, x = Math.round(((d.x - T * d.sp * 0.25) % (VW + 60) + VW + 60) % (VW + 60) - 30); for (let k = 0; k < d.len; k++) put(x - Math.round(k * 0.3), Math.round(y) - k, 0xb8c8ec, 0.45 - k * 0.07); }
  else if (G.phase > 1.1 && !S.indoor) for (const m of motes) { const x = Math.round((m.x + Math.sin(T * 0.3 + m.ph) * 6) % VW), y = Math.round((m.y + T * m.sp) % VH), a = clamp(G.phase - 1.1) * (0.5 + 0.5 * Math.sin(T * 2 + m.ph * 3)) * 0.9; put(x, y, 0xdfe8ff, a); if (m.big) { put(x - 1, y, 0xdfe8ff, a * 0.5); put(x + 1, y, 0xdfe8ff, a * 0.5); put(x, y - 1, 0xdfe8ff, a * 0.5); put(x, y + 1, 0xdfe8ff, a * 0.5); } }
  if (sf > 0.05 && !S.indoor && !S.sky) for (const p of petals) { const x = Math.round((p.x + T * p.sp) % VW), y = Math.round((p.y + T * p.sp * 0.5 + Math.sin(T + p.ph) * 4) % VH); put(x, y, C.pk, sf * 0.9); put(x + 1, y, C.pk2, sf * 0.6); }
  if (UI.playing()) for (const sp0 of Object.values(S.spots)) { const m = G.markFor(sp0.id); if (!m) continue; marker(sp0.x, (sp0.my !== undefined ? sp0.my : sp0.y - 26) + Math.round(Math.sin(T * 4 + sp0.x) * 1.5), m); }
  if (G.fade > 0) for (let i = 0; i < VW * VH; i++) fb[i] = mix(fb[i], 0x0b0914, G.fade);
  for (let i = 0; i < VW * VH; i++) { const c = fb[i]; out32[i] = 0xff000000 | (c & 255) << 16 | (c & 0xff00) | (c >> 16 & 255); }
  ctx.putImageData(img, 0, 0);
}
