'use strict';
// Sprites for the later nights and for Rubix's cottage.
function person(pal) { return { s: ascii(MIRA_ROWS, pal), sb: ascii(MIRA_ROWS.map((r, i) => i === 3 ? "..hssssssh.." : r), pal) }; }
const PEOPLE = {
  mira: { s: MIRA, sb: MIRA_BL },
  theo: person({ h: 0xa8602e, s: 0xe2b48c, S: 0xc08e68, k: 0x1a1220, o: 0xc8b896, O: 0xefe4c8, p: 0x4a3426, w: 0x2a1e1c }),
  ines: person({ h: 0x14101a, s: 0x8a5a3a, S: 0x6e4428, k: 0x0b0a12, o: 0xb88a20, O: 0xe6b834, p: 0x232842, w: 0x2a2c3a }),
};
ROOF.stream = [0x1a2c4c, 0x28466c, 0x3c628c, 0x6a8eb4];
ROOF.encoder = [0x3a2440, 0x583660, 0x7a4e86, 0xa478b0];
POD_S.stream = makePod(ROOF.stream); POD_S.encoder = makePod(ROOF.encoder);

function makeWorkshop(roof) {
  const W = 40, H = 42, s = spr(W, H);
  for (let y = 18; y < H; y++) for (let x = 2; x < 38; x++) { const row = Math.floor((y - 18) / 4), mortar = y >= 36 ? ((x + (row % 2) * 3) % 6 === 0 || (y - 18) % 4 === 3) : false; const sh = (x - 2) / 36 * 0.55 + (dith(x, y) - 0.5) * 0.3 + (NZ(x * 0.4, y * 0.4) - 0.5) * 0.3; sp(s, x, y, y >= 36 ? (mortar ? C.st0 : C.st2) : sh < 0.25 ? C.pl0 : sh < 0.5 ? C.pl1 : sh < 0.75 ? C.pl2 : C.pl3); }
  for (let x = 2; x < 38; x++) { sp(s, x, 18, C.wd0); sp(s, x, 19, mix(sg(s, x, 19), C.ink, 0.4)); }
  for (let y = 2; y < 18; y++) { const f = (y - 2) / 16, l = Math.round(lerp(8, 0, f)), r = Math.round(lerp(31, 39, f)); for (let x = l; x <= r; x++) { const edge = (y - 2) % 3 === 2, seam = (x + (Math.floor((y - 2) / 3) % 2) * 3) % 6 === 0, lit = 0.2 + f * 0.5 + (x - l) / (r - l + 1) * 0.4 + (dith(x, y) - 0.5) * 0.2; sp(s, x, y, x === l || x === r ? roof[0] : edge || seam ? roof[0] : lit < 0.4 ? roof[3] : lit < 0.7 ? roof[2] : roof[1]); } }
  for (let y = 0; y < 12; y++) for (let x = 28; x < 34; x++) sp(s, x, y, y < 2 ? C.st3 : (x + Math.floor(y / 3)) % 4 === 0 || y % 3 === 0 ? C.br1 : x > 31 ? C.br2 : C.br3);
  for (let y = 26; y < 40; y++) for (let x = 14; x < 24; x++) { const top = 26 + Math.round(4 - Math.sqrt(Math.max(0, 25 - (x - 18.5) ** 2))); if (y < top) continue; sp(s, x, y, x === 14 || x === 23 || y === top ? C.wd0 : 0x2a1c20); }
  sr(s, 4, 23, 8, 7, C.wd0); sr(s, 5, 24, 6, 5, C.glass); sr(s, 8, 24, 1, 5, C.wd1);
  sr(s, 27, 22, 7, 13, C.wd0); sr(s, 28, 23, 5, 11, C.ink);
  return s;
}
const WORKSHOP_GLASS = [5, 24, 6, 5], WORKSHOP_DOOR = [15, 31, 8, 8], WORKSHOP_GAUGE = [28, 23, 5, 11];
function makeNotice() { const s = spr(24, 20); sr(s, 2, 8, 2, 12, C.wd1); sr(s, 20, 8, 2, 12, C.wd1); sr(s, 0, 0, 24, 12, C.wd0); sr(s, 1, 1, 22, 10, 0x9a6a3c); for (const [x, y] of [[3, 2], [10, 3], [16, 2]]) { sr(s, x, y, 5, 7, C.wh); sp(s, x + 2, y, C.ro2); for (let j = 2; j < 6; j += 2) sr(s, x + 1, y + j, 3, 1, C.pl3); } return s; }
function makeLift() {
  const W = 26, H = 60, s = spr(W, H);
  for (let y = 0; y < H; y++) { sp(s, 2, y, C.wd2); sp(s, 3, y, C.wd1); sp(s, 22, y, C.wd1); sp(s, 23, y, C.wd0); }
  for (let k = 0; k < 6; k++) { const y0 = 6 + k * 9; for (let i = 0; i < 19; i++) { sp(s, 3 + i, y0 + Math.round(i * 0.4), C.wd1); } }
  sr(s, 0, 0, 26, 3, C.wd3); sr(s, 10, 3, 6, 3, C.st3);
  for (let y = 6; y < 44; y++) sp(s, 13, y, 0xd8c8a0);
  sr(s, 4, 44, 18, 4, C.wd3); sr(s, 4, 47, 18, 1, C.wd0); sr(s, 5, 40, 16, 4, C.wd2); for (let x = 5; x < 21; x += 3) sp(s, x, 41, C.wd1);
  sr(s, 0, 56, 26, 4, C.st2);
  return s;
}
function makeSilo() {
  const W = 30, H = 50, s = spr(W, H), cx = 15;
  for (let y = 12; y < H; y++) for (let x = 2; x < 28; x++) { const rel = (x - 2) / 25, band = (y - 12) % 8 === 0, l = 0.2 + rel * 0.65 + (x % 3 === 0 ? 0.08 : 0) + (dith(x, y) - 0.5) * 0.2; sp(s, x, y, band ? C.sl0 : l < 0.35 ? 0xa8b4c8 : l < 0.55 ? C.sl3 : l < 0.75 ? C.sl2 : C.sl1); }
  for (let y = 0; y < 13; y++) { const half = 2 + y * 1.0; for (let x = Math.round(cx - half); x <= Math.round(cx + half); x++) sp(s, x, y, y === 12 ? C.ink : x < cx ? 0xc76c45 : 0xa24a33); }
  sr(s, 10, 38, 10, 12, C.sl0); sr(s, 11, 39, 8, 11, 0x1e2436);
  return s;
}
function makeLighthouse() {
  const W = 26, H = 74, s = spr(W, H), cx = 13;
  for (let y = 22; y < H; y++) { const half = 6 + (y - 22) / 52 * 5; for (let x = Math.round(cx - half); x <= Math.round(cx + half); x++) { const rel = (x - (cx - half)) / (2 * half), red = Math.floor((y - 22) / 9) % 2 === 0, l = rel * 0.7 + (dith(x, y) - 0.5) * 0.2; sp(s, x, y, red ? (l < 0.4 ? 0xd8604a : l < 0.7 ? 0xb04636 : 0x7e2e28) : (l < 0.4 ? 0xf4eee0 : l < 0.7 ? 0xd3c3a3 : 0x9a8a74)); } }
  sr(s, 4, 20, 18, 3, C.st1); sr(s, 3, 19, 20, 1, C.st3);
  for (let y = 8; y < 19; y++) for (let x = 7; x < 19; x++) sp(s, x, y, x === 7 || x === 18 || x === 12 ? C.ink : C.glass);
  for (let y = 0; y < 9; y++) { const half = 1 + y * 0.9; for (let x = Math.round(cx - half); x <= Math.round(cx + half); x++) sp(s, x, y, y === 8 ? C.ink : x < cx ? 0x3e4a66 : 0x2a3148); }
  sr(s, 9, 62, 8, 12, C.wd0); sr(s, 10, 63, 6, 11, C.wd2);
  return s;
}
const LIGHTHOUSE_GLASS = [8, 9, 10, 9];
function makePier(w, h) { const s = spr(w, h + 4); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) sp(s, x, y, y % 4 === 3 ? C.wd0 : Math.floor(y / 4) % 2 ? C.wd2 : C.wd3); for (let x = 0; x < w; x++) sp(s, x, 0, C.wd4); for (let x = 1; x < w; x += 12) sr(s, x, h, 2, 4, C.wd0); return s; }
function makeMast() {
  const W = 16, H = 76, s = spr(W, H);
  for (let y = 4; y < H; y++) { const half = 1 + (y - 4) / 72 * 6, a = Math.round(8 - half), b = Math.round(7 + half); sp(s, a, y, C.st3); sp(s, b, y, C.st1); if (y % 6 === 0) for (let x = a; x <= b; x++) sp(s, x, y, C.st2); if (y % 6 === 3) { sp(s, Math.round((a + b) / 2), y, C.st2); } }
  sr(s, 7, 0, 2, 4, C.st3);
  return s;
}
function makeBalloon() {
  const W = 34, H = 56, s = spr(W, H), cx = 17;
  for (let y = 0; y < 34; y++) for (let x = 0; x < W; x++) { const nx = (x - cx) / 16, ny = (y - 16) / 17, d = nx * nx + ny * ny * (y > 16 ? 1.4 : 1); if (d > 1) continue; const stripe = Math.floor((Math.atan2(nx, 1 - Math.abs(ny)) + 2) * 2.6) % 2, l = 0.5 - nx * 0.4 - ny * 0.3 + (dith(x, y) - 0.5) * 0.2; sp(s, x, y, stripe ? (l > 0.55 ? 0xf0c060 : 0xc89a3c) : (l > 0.55 ? 0x6a90d8 : 0x3e62a8)); }
  for (let y = 34; y < 46; y++) { sp(s, 10 + Math.round((y - 34) * 0.3), y, C.wd3); sp(s, 23 - Math.round((y - 34) * 0.3), y, C.wd3); }
  sr(s, 11, 46, 12, 8, C.wd2); for (let x = 11; x < 23; x += 2) sp(s, x, 48, C.wd1); sr(s, 11, 46, 12, 1, C.wd4); sr(s, 11, 53, 12, 1, C.wd0);
  outline(s, C.ink);
  return s;
}
const CELLAR = ascii([
  "dddddddddddddddddddd",
  "dwwwwwwwwdwwwwwwwwwd",
  "dwlwwwlwwdwwlwwwlwwd",
  "dwwwwwwwwdwwwwwwwwwd",
  "dwwwywwwwdwwwwywwwwd",
  "dwwwwwwwwdwwwwwwwwwd",
  "dwlwwwlwwdwwlwwwlwwd",
  "dddddddddddddddddddd",
  "ssssssssssssssssssss"], { d: C.wd0, w: C.wd2, l: C.wd1, y: C.ye2, s: C.st1 });
const CRATE = ascii(["dddddd", "dwlwwd", "dlwwld", "dwwlwd", "dddddd"], { d: C.wd1, w: C.wd4, l: C.wd3 });
// the cottage interior
const BED = ascii([
  "dddddddddddddddddddddd",
  "dwwwwwwdbbbbbbbbbbbbbd",
  "dwwwwwwdbBBBBBBBBBBBbd",
  "dwwwwwwdbBbbbbBbbbbBbd",
  "dwwwwwwdbBBBBBBBBBBBbd",
  "dwwwwwwdbbbbBbbbbbBbbd",
  "dwwwwwwdbBBBBBBBBBBBbd",
  "dwwwwwwdbbbbbbbbbbbbbd",
  "dddddddddddddddddddddd",
  "d....................d"], { d: C.wd1, w: C.wh, b: 0x5a6fb0, B: 0x7a8fd0 });
const DESK = ascii([
  "........kkkkkkkkkk..........",
  "........kssssssssk..........",
  "........kssssssssk..........",
  "........kssssssssk...mmm....",
  "........kkkkkkkkkk...mtm....",
  "...........kkkk......mmm....",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "dddddddddddddddddddddddddddd",
  "d.d......................d.d",
  "d.d......................d.d",
  "d.d......................d.d",
  "d.d......................d.d"], { k: 0x2a2c3a, s: 0x2a3050, w: C.wd3, d: C.wd1, m: 0x5b7fb5, t: 0x7a4a2a });
const DESK_SCREEN = [9, 1, 8, 3];
function makeShelf() { const s = spr(22, 30); sr(s, 0, 0, 22, 30, C.wd1); for (let k = 0; k < 4; k++) { const y = 2 + k * 7; sr(s, 1, y, 20, 6, 0x2a1c20); let x = 2; const r = rng(k + 4); while (x < 19) { const w = 1 + (r() * 2 | 0), h = 3 + (r() * 3 | 0), c = [C.ro2, 0x3d5a8a, 0x3e7a52, C.ye2, 0x7a5aa8][r() * 5 | 0]; sr(s, x, y + 6 - h, w, h, c); x += w + (r() < 0.2 ? 1 : 0); } sr(s, 1, y + 6, 20, 1, C.wd3); } return s; }
const SHELF = makeShelf();
const PLANT = ascii(["..gG.g..", ".gGgGgg.", "gGggGgGg", ".gGgggG.", "..dddd..", "..dwwd..", "..dwwd..", "...dd..."], { g: C.g3, G: C.g5, d: C.ro1, w: C.ro2 });
const RUG = (() => { const s = spr(60, 26); for (let y = 0; y < 26; y++) for (let x = 0; x < 60; x++) { const nx = (x - 30) / 30, ny = (y - 13) / 13; if (nx * nx + ny * ny > 1) continue; const ring = Math.floor(Math.sqrt(nx * nx + ny * ny) * 5); sp(s, x, y, [0xb0553c, 0xd07a52, 0x8a3c30, 0xe0a060, 0x7a3229][ring]); } return s; })();
