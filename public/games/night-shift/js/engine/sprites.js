'use strict';
// Sprites drawn in code. Each maker returns { w, h, d } with -1 for transparent pixels.

const TREE_G = [0x142422, 0x1b382f, 0x244e39, 0x316741, 0x46824a, 0x67a053, 0x92be5e];
const TREE_P = [0x0f1b24, 0x152c35, 0x1c4045, 0x275555, 0x366f67, 0x4c8878];
const TREE_A = [0x2c1820, 0x52242a, 0x82372e, 0xae5636, 0xd47e44, 0xeeac5a];
const TREE_B = [0x2a1b33, 0x523050, 0x7f4f78, 0xaf79a0, 0xd8a5c2, 0xf2cddc];

function trunk(s, cx, top, bottom) {
  for (let y = top; y < bottom; y++) { const fl = y > bottom - 4 ? (y - (bottom - 4)) : 0; for (let x = cx - 2 - fl; x <= cx + 2 + fl; x++) { const t = (x - (cx - 2 - fl)) / (4 + fl * 2 + 0.01); sp(s, x, y, t < 0.3 ? C.wd3 : t > 0.7 ? C.wd0 : (dith(x, y) > 0.7 ? C.wd1 : C.wd2)); } }
}
function makeRound(seed, pal) {
  const r = rng(seed), w = 38, h = 48, s = spr(w, h);
  trunk(s, 19, 28, h);
  const blobs = [[19, 18, 12]];
  for (let i = 0; i < 7; i++) { const a = r() * 6.283, d = 4 + r() * 6; blobs.push([19 + Math.cos(a) * d * 1.15, 17 + Math.sin(a) * d * 0.8, 6 + r() * 4.5]); }
  for (let y = 0; y < 36; y++) for (let x = 0; x < w; x++) {
    let best = -99, bi = 0;
    for (let k = 0; k < blobs.length; k++) { const b = blobs[k], v = b[2] - Math.hypot(x - b[0], y - b[1]); if (v > best) { best = v; bi = k; } }
    if (best + (NZ(x * 0.5 + seed, y * 0.5) - 0.5) * 3.2 < 0) continue;
    const b = blobs[bi], nx = (x - b[0]) / b[2], ny = (y - b[1]) / b[2];
    const l = 0.56 - nx * 0.32 - ny * 0.42 + (NZ(x * 0.38 + seed * 3, y * 0.38) - 0.5) * 0.55 + (dith(x, y) - 0.5) * 0.3 - Math.max(0, y - 24) * 0.04;
    sp(s, x, y, pal[clamp(Math.floor(l * (pal.length - 1) + 0.5), 0, pal.length - 1)]);
  }
  outline(s, pal[0]);
  return s;
}
function makePine(seed, pal) {
  const w = 30, h = 52, s = spr(w, h), cx = 15;
  trunk(s, cx, 40, h);
  for (let k = 0; k < 5; k++) {
    const top = 1 + k * 7, bot = top + 15, half = 4.5 + k * 2.4;
    for (let y = top; y <= bot; y++) { const f = (y - top) / (bot - top), hw = half * f + (y === bot ? -1 : 0);
      for (let x = Math.floor(cx - hw); x <= Math.ceil(cx + hw); x++) { const rel = (x - cx) / (hw + 0.01); if (Math.abs(rel) > 1) continue;
        if (y >= bot - 1 && (x + k) % 3 === 0) continue;
        const l = 0.62 - rel * 0.42 - f * 0.28 + (NZ(x * 0.5 + seed, y * 0.5) - 0.5) * 0.4 + (dith(x, y) - 0.5) * 0.3;
        sp(s, x, y, pal[clamp(Math.floor(l * (pal.length - 1) + 0.5), 0, pal.length - 1)]); } }
  }
  outline(s, pal[0]);
  return s;
}

function makeCottage() {
  const s = spr(78, 74);
  // lean-to shed on the left
  for (let y = 50; y < 70; y++) for (let x = 0; x < 13; x++) sp(s, x, y, (x % 3 === 0) ? C.wd1 : (dith(x, y) > 0.8 ? C.wd1 : C.wd2));
  for (let y = 44; y < 51; y++) for (let x = 0; x < 14; x++) if (x >= (50 - y) - 1) sp(s, x, y, y === 50 ? C.ro0 : (x + y) % 4 === 0 ? C.ro1 : C.ro2);
  sr(s, 2, 58, 6, 8, C.wd0); sr(s, 3, 59, 4, 6, C.wd3); sr(s, 3, 61, 4, 1, C.wd1); // a barrel
  // stone foundation and plaster walls
  for (let y = 40; y < 71; y++) for (let x = 12; x < 64; x++) {
    let c;
    if (y >= 66) { const bx = Math.floor((x + (Math.floor((y - 66) / 2) % 2) * 3) / 6); c = ((x + (Math.floor((y - 66) / 2) % 2) * 3) % 6 === 0 || (y - 66) % 2 === 1 && dith(x, y) > 0.6) ? C.st0 : [C.st2, C.st1, C.st3][bx % 3]; }
    else { const shade = (x - 12) / 52 * 0.6 + (y - 40) / 26 * 0.3 + (NZ(x * 0.4, y * 0.4) - 0.5) * 0.4 + (dith(x, y) - 0.5) * 0.35; c = shade < 0.25 ? C.pl0 : shade < 0.55 ? C.pl1 : shade < 0.8 ? C.pl2 : C.pl3; }
    sp(s, x, y, c);
  }
  for (const bx of [12, 13, 62, 63, 37]) for (let y = 40; y < 66; y++) sp(s, bx, y, bx === 13 || bx === 63 ? C.wd1 : C.wd0);
  for (let x = 12; x < 64; x++) { sp(s, x, 40, C.wd0); sp(s, x, 41, C.wd1); sp(s, x, 54, C.wd1); }
  for (let x = 12; x < 64; x++) { sp(s, x, 42, mix(sg(s, x, 42), C.ink, 0.45)); sp(s, x, 43, mix(sg(s, x, 43), C.ink, 0.25)); }
  // door
  for (let y = 52; y < 70; y++) for (let x = 30; x < 39; x++) { if (y === 52 && (x === 30 || x === 38)) continue; sp(s, x, y, x === 30 || x === 38 || y === 52 ? C.wd0 : (x % 2 ? C.wd2 : C.wd1)); }
  sp(s, 36, 61, C.ye); sr(s, 28, 70, 13, 2, C.st2); sr(s, 29, 72, 11, 1, C.st1);
  // windows with flower boxes
  for (const wx of [17, 45]) {
    sr(s, wx - 1, 44, 11, 10, C.wd0);
    sr(s, wx, 45, 9, 8, C.glass);
    sr(s, wx + 4, 45, 1, 8, C.wd1); sr(s, wx, 48, 9, 1, C.wd1);
    sr(s, wx - 1, 54, 11, 3, C.wd2); sr(s, wx - 1, 56, 11, 1, C.wd0);
    for (let i = 0; i < 9; i++) sp(s, wx + i, 53, i % 2 ? C.g4 : (i % 4 === 0 ? C.pk : C.ro3));
  }
  // roof
  for (let y = 12; y < 43; y++) {
    const f = (y - 12) / 30, l = Math.round(lerp(20, 6, f)), r = Math.round(lerp(56, 70, f)), row = Math.floor((y - 12) / 3);
    for (let x = l; x <= r; x++) {
      const edge = (y - 12) % 3 === 2, seam = (x + (row % 2) * 3) % 6 === 0;
      const lit = 0.25 + f * 0.5 + (x - l) / (r - l + 1) * 0.35 + (NZ(x * 0.3, y * 0.3) - 0.5) * 0.4 + (dith(x, y) - 0.5) * 0.25;
      let c = lit < 0.35 ? C.ro4 : lit < 0.6 ? C.ro3 : lit < 0.85 ? C.ro2 : C.ro1;
      if (edge || seam) c = C.ro1; if (edge && seam) c = C.ro0;
      if (NZ(x * 0.18 + 40, y * 0.25) > 0.78 && dith(x, y) > 0.4) c = edge ? C.g1 : C.g3;
      if (x === l || x === r) c = C.ro0;
      sp(s, x, y, c);
    }
  }
  for (let x = 20; x <= 56; x++) { sp(s, x, 12, C.ro0); sp(s, x, 11, C.ro1); }
  for (let x = 6; x <= 70; x++) sp(s, x, 42, C.ink);
  // dormer
  for (let y = 19; y < 33; y++) for (let x = 29; x < 42; x++) { const top = 19 + Math.abs(x - 35) * 0.7; if (y < top) continue; sp(s, x, y, y < top + 2 ? C.ro0 : C.pl1); }
  sr(s, 32, 25, 7, 6, C.wd0); sr(s, 33, 26, 5, 4, C.glass);
  // chimney
  for (let y = 2; y < 24; y++) for (let x = 50; x < 57; x++) sp(s, x, y, y < 4 ? C.st3 : ((x + Math.floor(y / 3)) % 4 === 0 || y % 3 === 0) ? C.br1 : (x > 54 ? C.br2 : C.br3));
  return s;
}
const COTTAGE_GLASS = [[17, 45, 9, 8], [45, 45, 9, 8], [33, 26, 5, 4]];

function makeMushroom() {
  const W = 118, H = 102, s = spr(W, H), sc = 62, cc = 54, cy = 34, rx = 54, ry = 27;
  const SP = [0xf6e8c6, 0xe2cfa4, 0xc4ab82, 0x9c8462, 0x6e5a44];
  for (let y = 40; y < H; y++) { const f = (y - 40) / 62, w = 9 + f * 3 + (y > H - 9 ? (y - (H - 9)) * 1.3 : 0), cx = sc + Math.sin(f * 2.2) * 2;
    for (let x = Math.floor(cx - w); x <= Math.ceil(cx + w); x++) { const rel = (x - cx) / w; if (Math.abs(rel) > 1) continue;
      const l = 0.35 + rel * 0.4 + (NZ(x * 0.9, y * 0.12) - 0.5) * 0.45 + (dith(x, y) - 0.5) * 0.3 + Math.max(0, 56 - y) * 0.035;
      sp(s, x, y, SP[clamp(Math.floor(l * 4 + 0.5), 0, 4)]); } }
  const UP = [0xead7aa, 0xcfb68a, 0xa98e69, 0x7c6449, 0x564432];
  for (let y = cy; y < cy + 16; y++) for (let x = 0; x < W; x++) { const nx = (x - cc) / (rx - 2), ny = (y - (cy + 4)) / 9; if (nx * nx + ny * ny > 1) continue;
    const a = Math.atan2(y - (cy - 4), x - cc), gill = Math.sin(a * 70) > 0.55;
    const l = 0.2 + (1 - Math.abs(nx)) * 0.55 + ny * 0.2 + (gill ? 0.25 : 0) + (dith(x, y) - 0.5) * 0.3;
    sp(s, x, y, UP[clamp(Math.floor(l * 4), 0, 4)]); }
  const CAP = [0x1d151c, 0x2e2126, 0x43302d, 0x5b4134, 0x75553e, 0x92704b];
  const SPOT = [0x8a6a44, 0xb38e58, 0xd8b878, 0xeed39a];
  const r = rng(21), spots = [];
  for (let i = 0; i < 16; i++) { const a = -Math.PI * (0.08 + r() * 0.84), d = 0.2 + r() * 0.72; spots.push([cc + Math.cos(a) * rx * d, cy + Math.sin(a) * ry * d * 0.9, 1.6 + r() * 2.2, 1.5 + r() * 0.5]); }
  for (let y = 0; y < cy + 12; y++) for (let x = 0; x < W; x++) { const nx = (x - cc) / rx, ny = (y - cy) / ry; if (nx * nx + ny * ny > 1 || ny > 0.32) continue;
    let l = 0.52 - nx * 0.38 - ny * 0.55 + (NZ(x * 0.25, y * 0.25) - 0.5) * 0.35 + (dith(x, y) - 0.5) * 0.28;
    let pal = CAP;
    for (const [px, py, pr, el] of spots) { const dx = (x - px) / (pr * el), dy = (y - py) / pr; if (dx * dx + dy * dy < 1) { pal = SPOT; l += 0.05; } }
    if (ny > 0.22) l = l * 0.6 + 0.35;
    sp(s, x, y, pal[clamp(Math.floor(l * (pal.length - 1) + 0.5), 0, pal.length - 1)]); }
  for (let x = 0; x < W; x++) for (let y = cy + 12; y > 0; y--) { const c = sg(s, x, y); if (c >= 0 && CAP.includes(c) || SPOT.includes(c)) { sp(s, x, y + 1, C.ink); break; } }
  outline(s, CAP[0], false);
  return s;
}

function makeNorthWall() {
  const w = 118, h = 30, s = spr(w, h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (y < 6) { const jag = (y === 0 && NZ(x * 0.4, 3) > 0.55) || (y < 2 && x > 96 && x < 104); if (jag) continue; const cell = (x + (y > 2 ? 4 : 0)) % 9 === 0 || y === 2; sp(s, x, y, cell ? C.st1 : y < 2 ? C.st4 : (dith(x, y) > 0.7 ? C.st2 : C.st3)); continue; }
    const row = Math.floor((y - 6) / 4), bx = Math.floor((x + (row % 2) * 4) / 8), mortar = (y - 6) % 4 === 3 || (x + (row % 2) * 4) % 8 === 0;
    const hv = hash(bx * 13 + row * 7), dark = (y - 6) / 24;
    let c = mortar ? C.br0 : [C.br3, C.br2, C.br4, C.br2][Math.floor(hv * 4)];
    if (!mortar && (x + (row % 2) * 4) % 8 === 1 && (y - 6) % 4 === 0) c = C.br4;
    if (!mortar && dark > 0.6 && dith(x, y) < (dark - 0.6) * 2) c = C.br1;
    if (y > 24 && NZ(x * 0.3, y * 0.5) > 0.6) c = dith(x, y) > 0.5 ? C.moss : C.g2;
    sp(s, x, y, c);
  }
  // the shrine alcove
  for (let y = 6; y < h; y++) for (let x = 42; x < 78; x++) { const top = 6 + Math.max(0, (Math.abs(x - 60) - 12)) * 0.0 + (Math.abs(x - 60) > 13 ? 99 : Math.round(6 - Math.sqrt(Math.max(0, 169 - (x - 60) ** 2)) * 0.45)); if (y < top) continue; sp(s, x, y, (x === 42 || x === 77 || y === top) ? C.st1 : (dith(x, y) > 0.5 ? C.br0 : 0x2a1830)); }
  for (let y = 19; y < h; y++) for (let x = 46; x < 74; x++) sp(s, x, y, y < 21 ? C.st4 : y < 22 ? C.st3 : (x === 46 || x === 73) ? C.st1 : (dith(x, y) > 0.6 ? C.st1 : C.st2));
  return s;
}
function makeSideWall(len, front) {
  const w = 12, s = spr(w, len + front);
  for (let y = 0; y < len; y++) for (let x = 0; x < 10; x++) { const cy = Math.floor(y / 7), cell = y % 7 === 0 || (x + (cy % 2) * 4) % 9 === 0; let c = cell ? C.st1 : x < 2 ? C.st4 : (dith(x, y) > 0.72 ? C.st2 : C.st3); if (NZ(x * 0.4, y * 0.2 + 9) > 0.7) c = dith(x, y) > 0.5 ? C.moss : C.moss2; sp(s, x, y, c); }
  for (let y = 0; y < len; y++) { sp(s, 10, y, C.br1); sp(s, 11, y, C.br0); }
  for (let y = len; y < len + front; y++) for (let x = 0; x < 12; x++) { const row = Math.floor((y - len) / 4), mortar = (y - len) % 4 === 3 || (x + (row % 2) * 4) % 8 === 0; sp(s, x, y, mortar ? C.br0 : (x > 8 ? C.br2 : C.br3)); }
  return s;
}
function makePillar(hgt) {
  const s = spr(10, hgt + 5);
  for (let y = 0; y < 5; y++) for (let x = 0; x < 10; x++) sp(s, x, y, y === 4 ? C.st1 : x < 3 ? C.st4 : C.st3);
  for (let y = 5; y < hgt + 5; y++) for (let x = 0; x < 10; x++) { const row = Math.floor((y - 5) / 4), mortar = (y - 5) % 4 === 3 || (x + (row % 2) * 5) % 10 === 0; sp(s, x, y, mortar ? C.br0 : x > 6 ? C.br2 : C.br3); }
  return s;
}
function makeBridge(w) {
  const s = spr(w, 16);
  for (let y = 2; y < 15; y++) for (let x = 0; x < w; x++) { const gap = x % 4 === 3; sp(s, x, y, gap ? C.wd0 : (y === 2 ? C.wd4 : (Math.floor(x / 4) % 2 ? C.wd2 : C.wd3))); }
  for (let x = 0; x < w; x++) { sp(s, x, 0, C.wd3); sp(s, x, 1, C.wd1); }
  for (const px of [0, Math.floor(w / 2), w - 2]) sr(s, px, -1, 2, 3, C.wd1);
  return s;
}
function makeRail(w) { const s = spr(w, 5); for (let x = 0; x < w; x++) { sp(s, x, 1, C.wd3); sp(s, x, 2, C.wd1); } for (const px of [0, Math.floor(w / 2), w - 2]) sr(s, px, 0, 2, 5, C.wd1); for (const px of [0, Math.floor(w / 2), w - 2]) sp(s, px, 0, C.wd4); return s; }
const POST = ascii(["oo", "ol", "ol", "ol", "ol", "ol", "ol", "ol", "ol", "ol", "dl", "dd"], { o: C.wd3, l: C.wd2, d: C.wd0 });
const LANTERN = ascii([
  "...ddd.",
  "..dllld",
  "..d...d",
  "..dgggd",
  "..dgggd",
  "..dgggd",
  "..ddddd",
  "....o..",
  "....o..", "....o..", "....o..", "....o..", "....o..", "....o..", "....o..", "...ooo.", "...ddd."], { d: C.wd0, l: C.wd3, g: C.glass, o: C.wd2 });
const WOODPILE = ascii([
  "..cwcc.cwcc.....",
  ".cwywccwywc.cwc.",
  ".cwwwccwwwccwywc",
  "cwcc.cwcc.ccwwwc",
  "wywc.wywccwcc.cc",
  "wwwccwwwcwywc...",
  ".cc..ccc.wwwc...",
  "ddddddddddddddd."], { c: C.wd1, w: C.wd4, y: C.d4, d: C.wd0 });
const LOG = ascii(["..cccccccccccccc..", ".cwwwwwwwwwwwwwwyc", "cwyywwwwwwwwwwwwwc", ".ddddddddddddddddd"], { c: C.wd1, w: C.wd2, y: C.wd4, d: C.wd0 });
const STUMP = ascii([".cyyyyc.", "cyywwyyc", "cwyyyywc", "dllllllc", "dllllllc", "ddllllcd"], { c: C.wd1, y: C.wd4, w: C.wd3, l: C.wd2, d: C.wd0 });
const TABLE = ascii(["cccccccccccc", "dwwwwwwwwwwd", ".d........d.", ".d........d.", ".d........d."], { c: C.wd3, w: C.wd1, d: C.wd0 });
const MUG = ascii(["mmmm.", "mttmm", "mmmm.", ".mm.."], { m: 0x5b7fb5, t: 0x7a4a2a });
const MOSSY = ascii(["...ggGg.....", ".gGGggGgg...", "gGgggggGgg..", "sggsssggss..", "sssssssssss.", "dsssssssssss", ".dddddddddd."], { g: C.moss, G: C.moss2, s: C.st2, d: C.st0 });
const ROCK = ascii([".sll.", "sslls", "dssss", ".ddd."], { s: C.st2, l: C.st4, d: C.st0 });
const LILY = ascii([".gGGg.", "gGGgGg", "gGgg.g", ".ggg.."], { g: C.g3, G: C.g5 });
const LILYF = ascii([".gpGg.", "gGpgGg", "gGgg.g", ".ggg.."], { g: C.g3, G: C.g5, p: C.pk });
const ROOF = { checkout: [0x163c42, 0x22585c, 0x347a76, 0x58a092], cart: [0x34233f, 0x4e3462, 0x6c4c86, 0x9274aa], web: [0x5a3e18, 0x7e5c24, 0xa47e36, 0xc8a252] };
function makePod(pal) {
  const s = spr(16, 18);
  for (let y = 0; y < 7; y++) { const half = 3 + y, l0 = Math.floor(8 - half), r0 = Math.ceil(7 + half); for (let x = l0; x <= r0; x++) { const edge = y === 6 || x === l0 || x === r0, rel = (x - l0) / (r0 - l0 + 0.01); sp(s, x, y, edge ? pal[0] : y % 2 === 0 ? pal[1] : rel < 0.5 ? pal[3] : pal[2]); } }
  for (let y = 7; y < 18; y++) for (let x = 1; x < 15; x++) { const sh = (x - 1) / 14 * 0.6 + (dith(x, y) - 0.5) * 0.3; sp(s, x, y, y === 17 ? C.st1 : y === 7 ? C.pl3 : sh < 0.25 ? C.pl0 : sh < 0.5 ? C.pl1 : C.pl2); }
  sr(s, 3, 10, 6, 5, C.wd0); sr(s, 4, 11, 4, 3, C.glass);
  sr(s, 10, 11, 3, 6, C.wd1); sp(s, 10, 11, C.wd0); sp(s, 12, 11, C.wd0); sp(s, 12, 14, C.ye);
  return s;
}
const POD_S = { checkout: makePod(ROOF.checkout), cart: makePod(ROOF.cart), web: makePod(ROOF.web) };
function makeTower() {
  const W = 30, H = 52, s = spr(W, H), cx = 15;
  for (let y = 14; y < H; y++) for (let x = 2; x < 28; x++) { const rel = (x - 2) / 25, row = Math.floor((y - 14) / 4), mortar = (y - 14) % 4 === 3 || (x + (row % 2) * 3) % 6 === 0, l = 0.2 + rel * 0.65 + (dith(x, y) - 0.5) * 0.25; sp(s, x, y, mortar ? C.st0 : l < 0.35 ? C.st4 : l < 0.55 ? C.st3 : l < 0.75 ? C.st2 : C.st1); }
  for (let y = 0; y < 17; y++) { const half = 1 + y * 0.95; for (let x = Math.round(cx - half); x <= Math.round(cx + half); x++) { const rel = (x - (cx - half)) / (2 * half + 0.01), l = rel * 0.7 + (y % 3 === 0 ? 0.2 : 0) + (dith(x, y) - 0.5) * 0.2; sp(s, x, y, y === 16 ? C.ink : l < 0.3 ? 0x6a7aa0 : l < 0.55 ? 0x4a5a80 : 0x33405e); } }
  for (let y = 40; y < H; y++) for (let x = 11; x < 19; x++) { if (y === 40 && (x === 11 || x === 18)) continue; sp(s, x, y, x === 11 || x === 18 || y === 40 ? C.wd0 : (x % 2 ? C.wd2 : C.wd1)); }
  sr(s, 20, 21, 6, 18, C.wd0); sr(s, 21, 22, 4, 16, C.ink);
  sr(s, 5, 22, 6, 7, C.wd0); sr(s, 6, 23, 4, 5, C.glass);
  return s;
}
function makeMill() {
  const W = 28, H = 42, s = spr(W, H);
  for (let y = 9; y < H; y++) { const half = 7 + (y - 9) / 33 * 5; for (let x = Math.round(14 - half); x <= Math.round(13 + half); x++) { const rel = (x - (14 - half)) / (2 * half), l = 0.2 + rel * 0.65 + (dith(x, y) - 0.5) * 0.25; sp(s, x, y, x % 3 === 0 ? C.wd1 : l < 0.35 ? C.wd4 : l < 0.6 ? C.wd3 : l < 0.8 ? C.wd2 : C.wd1); } }
  for (let y = 0; y < 11; y++) { const half = 2 + y * 0.85; for (let x = Math.round(14 - half); x <= Math.round(13 + half); x++) sp(s, x, y, y === 10 ? C.ink : x < 14 ? C.ro3 : C.ro2); }
  sr(s, 11, 33, 6, 9, C.wd0); sr(s, 12, 34, 4, 8, C.wd1); sr(s, 11, 18, 6, 6, C.wd0); sr(s, 12, 19, 4, 4, C.glass);
  return s;
}
function makeWatch() {
  const W = 24, H = 56, s = spr(W, H);
  for (let y = 22; y < H; y++) { const a = Math.round(4 - (y - 22) / 34 * 3), b = Math.round(19 + (y - 22) / 34 * 3); sp(s, a, y, C.wd2); sp(s, a + 1, y, C.wd1); sp(s, b, y, C.wd1); sp(s, b - 1, y, C.wd0); }
  for (let k = 0; k < 3; k++) { const y0 = 26 + k * 9; for (let i = 0; i <= 14; i++) { sp(s, 5 + i, y0 + Math.round(i * 0.55), C.wd1); sp(s, 18 - i, y0 + Math.round(i * 0.55), C.wd0); } }
  sr(s, 0, 20, 24, 3, C.wd3); sr(s, 0, 22, 24, 1, C.wd0);
  for (let y = 9; y < 20; y++) for (let x = 3; x < 21; x++) sp(s, x, y, x % 4 === 0 ? C.wd1 : x > 16 ? C.wd1 : C.wd2);
  sr(s, 7, 12, 9, 5, C.wd0); sr(s, 8, 13, 7, 3, C.glass);
  for (let y = 2; y < 10; y++) { const half = 3 + (y - 2) * 1.45; for (let x = Math.round(12 - half); x <= Math.round(11 + half); x++) sp(s, x, y, y === 9 ? C.ink : x < 12 ? 0x7a5aa8 : 0x5a3e88); }
  sr(s, 19, 13, 5, 2, C.st3); sp(s, 23, 13, C.st4);
  for (let y = 0; y < 3; y++) sp(s, 12, y, C.wd0);
  return s;
}
function makeBellTower() {
  const W = 20, H = 50, s = spr(W, H);
  for (let y = 18; y < H; y++) for (let x = 3; x < 17; x++) { const row = Math.floor(y / 4), mortar = y % 4 === 3 || (x + (row % 2) * 3) % 6 === 0; sp(s, x, y, mortar ? C.br0 : x > 12 ? C.br2 : C.br3); }
  for (let y = 6; y < 18; y++) { sp(s, 3, y, C.wd2); sp(s, 4, y, C.wd1); sp(s, 15, y, C.wd1); sp(s, 16, y, C.wd0); for (let x = 5; x < 15; x++) sp(s, x, y, 0x24182c); }
  for (let y = 0; y < 7; y++) { const half = 3 + y * 1.25; for (let x = Math.round(10 - half); x <= Math.round(9 + half); x++) sp(s, x, y, y === 6 ? C.ink : x < 10 ? 0x3e8a5a : 0x2e6a46); }
  sr(s, 2, 17, 16, 2, C.st3);
  sr(s, 7, 42, 6, 8, C.wd0); sr(s, 8, 43, 4, 7, C.wd1);
  return s;
}
function makeShed() {
  const W = 28, H = 26, s = spr(W, H);
  for (let y = 9; y < H; y++) for (let x = 1; x < 27; x++) sp(s, x, y, x % 4 === 0 ? C.wd1 : x > 20 ? C.wd2 : C.wd3);
  for (let y = 2; y < 10; y++) for (let x = 0; x < 28; x++) sp(s, x, y, y === 9 ? C.ink : (y - 2) % 3 === 2 ? 0x2f3550 : (x + y) % 5 === 0 ? 0x5a6890 : 0x46557a);
  sr(s, 16, 14, 6, 12, C.wd0); sr(s, 17, 15, 4, 11, C.wd1); sp(s, 20, 20, C.ye);
  sr(s, 4, 13, 8, 6, C.wd0); sr(s, 5, 14, 6, 4, C.glass);
  return s;
}
function makeBoard() {
  const W = 36, H = 30, s = spr(W, H);
  sr(s, 2, 8, 2, 22, C.wd1); sr(s, 32, 8, 2, 22, C.wd1);
  sr(s, 0, 7, 36, 18, C.wd0);
  for (let y = 8; y < 24; y++) for (let x = 1; x < 35; x++) sp(s, x, y, dith(x, y) > 0.75 ? 0x9a6a3c : NZ(x * 0.5, y * 0.5) > 0.6 ? 0xc08a52 : 0xae7a46);
  for (let y = 0; y < 7; y++) for (let x = 0; x < 36; x++) { if (Math.abs(x - 17.5) > 4 + y * 2.3) continue; sp(s, x, y, y === 6 ? C.ink : x < 18 ? C.ro3 : C.ro2); }
  return s;
}
function makeFenceH(w) { const s = spr(w, 7); for (let x = 0; x < w; x++) { sp(s, x, 2, C.wd3); sp(s, x, 3, C.wd1); sp(s, x, 5, C.wd2); } for (let x = 0; x < w; x += 8) { sr(s, x, 0, 2, 7, C.wd2); sp(s, x, 0, C.wd4); sp(s, x + 1, 6, C.wd0); } return s; }
function makeFenceV(h) { const s = spr(3, h); for (let y = 0; y < h; y++) { sp(s, 1, y, C.wd2); sp(s, 2, y, C.wd0); } for (let y = 0; y < h; y += 8) { sr(s, 0, y, 3, 3, C.wd3); sp(s, 0, y, C.wd4); } return s; }
const LECTERN = ascii(["wwwwwwwwww", "wpppw.pppw", "wwwwwwwwww", "dddddddddd", "....dd....", "....dd....", "...dddd..."], { w: C.wh, p: 0x8a7ab0, d: C.wd1 });
const BOOKS = ascii(["rrb.g", "rrbgg", "rrbgg", "ddddd"], { r: C.ro2, b: 0x3d5a8a, g: 0x3e7a52, d: C.wd0 });
const LAPTOP = ascii(["..kkkkkkkk..", "..kssssssk..", "..kssssssk..", "..kkkkkkkk..", ".kkkkkkkkkk."], { k: 0x2a2c3a, s: 0x2a3050 });
const MIRA_P = { h: 0x2a1e1c, s: 0xc98f62, S: 0xa06c48, k: 0x1a1220, o: 0x245058, O: 0x3b7a84, p: 0x2a2c40, w: 0xe8e0d0 };
const MIRA_ROWS = [
  "...hhhhhh...",
  "..hhhhhhhh..",
  "..hhssssSh..",
  "..hskssksh..",
  "..hssssssh..",
  "...ssSSss...",
  "..oooooooo..",
  ".ooOOOOOOoo.",
  ".oOOOOOOOOo.",
  ".oOOOOOOOOo.",
  ".oOOOooOOOo.",
  ".sOOOOOOOOs.",
  "..OOOOOOOO..",
  "..pppppppp..",
  "..ppp..ppp..",
  "..ppp..ppp..",
  "..ww....ww..",
];
const MIRA = ascii(MIRA_ROWS, MIRA_P);
const MIRA_BL = ascii(MIRA_ROWS.map((r, i) => i === 3 ? "..hssssssh.." : r), MIRA_P);

function makeSign(text) { const w = textW(text) + 6, s = spr(w, 13); sr(s, 0, 0, w, 9, C.wd0); sr(s, 1, 1, w - 2, 7, C.wd1); for (let x = 1; x < w - 1; x++) sp(s, x, 1, C.wd2); sr(s, 2, 9, 2, 4, C.wd1); sr(s, w - 4, 9, 2, 4, C.wd1); return s; }

