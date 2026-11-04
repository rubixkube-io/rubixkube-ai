'use strict';
// The places. Each builder returns a Scene; what changes during a night is read from G.vars.
const TITLE_SCENE = 'valley';
const nid = night => night ? night.id : '';

// shared pieces
function boardCards(bx, by) {
  const run = G.run; if (!run) return;
  const open = run.incs.filter(i => ['new', 'inv', 'needs', 'appr', 'check'].includes(i.st) || (i.st === 'sent' && i.alerts.length));
  open.forEach((i, k) => { const x = bx + 4 + k * 8, y = by + 16, col = i.d.sev === 'Critical' ? 0xff4a3a : i.d.sev === 'High' ? 0xe0604a : i.d.sev === 'Medium' ? 0xe0b040 : 0x8ac0e0, pin = i.st === 'new' || i.st === 'sent' ? C.ro1 : RB.T;
    const n = i.st === 'sent' || i.st === 'new' ? i.alerts.length : 1; if (i.d.group && n > 1) for (let s = Math.min(3, n - 1); s > 0; s--) card(x + s, y - s, [0x8a6ac8, 0x3e9a6a, 0xe0b040][s - 1], C.ro1); card(x, y, col, pin); });
  run.incs.filter(i => i.st === 'closed').forEach((i, k) => RECT(bx + 4 + k * 3, by + 22, 2, 2, 0x7fd08a));
}
function card(x, y, col, pin) { RECT(x, y, 5, 7, C.wh); RECT(x, y, 5, 2, col); P(x + 1, y + 3, C.pl3); P(x + 2, y + 3, C.pl3); P(x + 3, y + 3, C.pl3); P(x + 1, y + 5, C.pl3); P(x + 2, y + 5, C.pl3); P(x + 2, y - 1, pin); }
function addBoard(S, x, y, spotY) {
  const s = makeBoard(); S.prop(s, x, y, { base: y + 29, foot: [1, 24, 34, 29], after: () => boardCards(x, y) });
  S.emit(() => text3(x + 1, y + 9, 'INCIDENTS', 0x2b1d14));
  S.lights(nf => light(x + 18, y + 16, 24, WARM, 0.15 + 0.3 * nf));
  S.spot('board', { x: x + 18, y: spotY || y + 33, r: 18, my: y - 10, label: 'Open the incidents' });
}
function addFire(S, fx, fy) {
  S.fire = { x: fx, y: fy };
  const ground = S.ground; S.ground = () => { if (ground) ground(); for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283, x = fx + Math.cos(a) * 8, y = fy + Math.sin(a) * 3.5; RECT(x - 1, y - 1, 3, 2, C.st2); P(x - 1, y - 1, C.st4); P(x + 1, y, C.st0); } RECT(fx - 6, fy - 2, 12, 2, C.wd1); RECT(fx - 4, fy - 3, 8, 1, C.wd2); };
  S.lights(nf => light(fx, fy - 8, 86 * (0.92 + Math.sin(T * 13) * 0.04 + Math.sin(T * 7.3) * 0.04), WARM, 1.7 * (0.45 + 0.55 * nf)));
  S.emit(() => { flame(fx, fy - 3, 6, 22, 1, false); flame(fx - 4, fy - 3, 3, 12, 2, false); flame(fx + 4, fy - 3, 3, 13, 3, false); });
  const tick = S.tick; S.tick = dt => { if (tick) tick(dt); if (Math.random() < dt * 2) spawn({ k: 'smoke', x: fx + (Math.random() - 0.5) * 6, y: fy - 22, vx: (Math.random() - 0.3) * 4, vy: -10 - Math.random() * 5, life: 0, max: 1.6, r: 2 }); if (Math.random() < dt * 12) spawn({ k: 'ember', x: fx + (Math.random() - 0.5) * 8, y: fy - 6, vx: (Math.random() - 0.5) * 8, vy: -18 - Math.random() * 18, life: 0, max: 1 + Math.random() * 1.4 }); };
}
function addTick(S, fn) { const t = S.tick; S.tick = dt => { if (t) t(dt); fn(dt); }; }
function addObserver(S, id, x, y, alertVar, show) { S.dyn(y, () => { if (!show || show()) drawObserver(x, y, !!G.v(alertVar, false)); }); S.spot(id, { x, y: y + 2, r: 14, my: y - 30, label: 'Talk to the observer', when: show }); }
function podDrawer(S, p, varName, delayIdx) {
  const state = () => { const v = G.v(varName, 'ok'), prev = G.v(varName + '.prev', 'ok'); return G.since(varName) > 0.6 + delayIdx * 0.7 ? v : prev; };
  S.prop(POD_S[p.svc], p.x - 8, p.y - 17, { base: p.y + 1, foot: [1, 11, 14, 17] });
  S.emit(() => { const st = state(), on = st === 'ok' || (st === 'slow' && Math.sin(T * 3 + p.ph) > -0.3) || (st === 'crash' && ((T + p.ph) % 2.2) < 0.35), c = st === 'slow' ? 0xffb050 : C.warm;
    if (st === 'pending') return;
    for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) { const x = p.x - 4 + i, y = p.y - 6 + j; if (on) P(x, y, j === 0 ? C.warm2 : c); else if (st === 'crash') PM(x, y, 0x2a1830, 0.6); }
    if (st === 'crash' && ((T + p.ph) % 2.2) > 1.6) { P(p.x - 2, p.y - 20, 0xff6a50); P(p.x - 2, p.y - 19, 0xff6a50); P(p.x - 2, p.y - 17, 0xff6a50); } });
  S.lights(nf => { const st = state(), on = st === 'ok' || (st === 'slow' && Math.sin(T * 3 + p.ph) > -0.3) || (st === 'crash' && ((T + p.ph) % 2.2) < 0.35); if (on) light(p.x - 2, p.y - 5, 14, st === 'slow' ? [1, 0.7, 0.3] : WARM, 0.5 * (0.2 + 0.8 * nf) + 0.1); });
  addTick(S, dt => { if (state() === 'crash' && Math.random() < dt * 0.9) spawn({ k: 'smoke', x: p.x + (Math.random() - 0.5) * 6, y: p.y - 18, vx: (Math.random() - 0.3) * 3, vy: -8, life: 0, max: 1.4, r: 1 }); });
}
function addLantern(S, x, y) { S.prop(LANTERN, x - 4, y - 16, { base: y + 1, foot: [3, 14, 5, 16] }); S.lights(nf => light(x, y - 12, 34, [1.0, 0.86, 0.45], 0.8 * (0.2 + 0.8 * nf))); S.emit(() => { for (let j = 0; j < 3; j++) for (let k = 0; k < 3; k++) P(x - 2 + k, y - 13 + j, (j + k + Math.floor(T * 4)) % 4 === 0 ? 0xffffff : C.warm2); }); }
function addGauge(S, x, y, h, varName, smooth) {
  let lvl = G.v(varName, 0); addTick(S, dt => { lvl += clamp(G.v(varName, 0) - lvl, -dt * (smooth || 0.25), dt * (smooth || 0.25)); });
  S.emit(() => { const fill = Math.round(lvl * h), col = lvl > 0.8 ? 0xff5a46 : lvl > 0.6 ? 0xffc04a : 0x7fe08a; for (let j = 0; j < fill; j++) for (let i = 0; i < 4; i++) P(x + i, y + h - 1 - j, j === fill - 1 ? 0xffffff : col); for (let j = 0; j < h; j += 4) P(x + 4, y + j, C.wd3); });
  S.lights(nf => light(x + 2, y + h / 2, 16, lvl > 0.8 ? RED : lvl > 0.6 ? [1, 0.75, 0.3] : [0.45, 1, 0.55], 0.3 + 0.2 * nf));
}
function warmWindows(S, rects) { S.emit(nf => { const wn = clamp((G.phase - 0.2) / 0.8); for (const [x0, y0, w, h] of rects) for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) PM(x0 + i, y0 + j, j < h / 2 ? C.warm : C.f_3, wn); }); S.lights(nf => { for (const [x0, y0, w] of rects) light(x0 + w / 2, y0 + 10, 26, WARM, 0.55 * nf); }); }
function addSteam(S, x, y, rate = 0.8) { addTick(S, dt => { if (Math.random() < dt * rate) spawn({ k: 'steam', x: x + Math.random() * 2, y, vx: 0, vy: -5, life: 0, max: 1.5 }); }); }
function addCandles(S, list, small) { S.lights(nf => { for (const [x, y] of list) light(x, y + 2, small ? 20 : 24, CANDLE, 0.55 * (0.2 + 0.8 * nf)); }); S.emit(() => { for (const [x, y] of list) { RECT(x, y, small ? 1 : 2, 3, C.wh); P(x, y - 1, C.f_3); P(x + (Math.sin(T * 9 + x) > 0 && !small ? 1 : 0), y - 2, C.f_4); } }); }
function glowShrooms(S, list) { S.lights(nf => { for (const [x, y] of list) light(x, y, 10, CYAN, 0.45 * nf); }); S.emit(nf => { const g = 0.4 + 0.6 * nf; for (const [x, y] of list) { PM(x, y, 0x7ff0e0, g); PM(x + 1, y, 0x7ff0e0, g); PM(x - 1, y + 1, 0x3aa8a0, g); PM(x, y + 1, 0xbffff4, g); PM(x + 1, y + 1, 0x7ff0e0, g); PM(x + 2, y + 1, 0x3aa8a0, g); P(x, y + 2, 0xd8d0c0); } }); }

// ---------------------------------------------------------------- the valley (Juniper Coffee)
SCENES.valley = { title: 'Juniper Coffee', make(night) {
  const S = new Scene('valley', 512, 352, 11), N = nid(night); S.flies = true;
  S.meadow().stream([[262, -14], [256, 26], [236, 70], [254, 116], [282, 160], [262, 206], [226, 248], [196, 292], [184, 366]]);
  const BX = Math.round(S.streamX(165)) - 25;
  for (const P0 of [[[86, 128], [120, 140], [160, 158], [210, 166], [BX - 2, 166]], [[BX + 52, 166], [326, 192], [334, 232], [356, 234]], [[318, 170], [336, 146], [352, 132], [380, 122], [408, 108], [432, 96]], [[352, 132], [354, 100], [340, 66]], [[86, 128], [80, 170], [74, 220], [86, 268], [100, 300]], [[118, 138], [135, 120], [136, 96], [160, 74], [196, 62]], [[334, 236], [318, 262], [302, 304]], [[80, 170], [50, 186], [32, 196]]]) S.path(P0);
  S.stones(436, 72, 72, 54, [C.st0, C.st1, C.st2, C.st3, C.st4], 11);
  S.stones(415, 236, 69, 58, [0x3a2e2a, 0x5a4a40, 0x74624f, 0x8e7a62, 0xab967a], 9, true);
  S.flowers().lilies([[60, 1], [118, 0], [190, 1], [232, 0], [262, 1], [300, 0]]).finishSolid();
  S.clear(BX, 160, BX + 49, 171);
  S.prop(makeBridge(50), BX, 156, { base: 156 - 99 }); S.prop(makeRail(50), BX, 170, { base: 175 });
  S.prop(makeCottage(), 52, 54, { base: 127, foot: [2, 12, 76, 69] }); warmWindows(S, COTTAGE_GLASS.map(([x, y, w, h]) => [52 + x, 54 + y, w, h]));
  S.prop(TABLE, 60, 130, { base: 135, foot: [0, 1, 12, 5] }); S.prop(MUG, 64, 127, { base: 135.5 }); addSteam(S, 65, 126);
  addBoard(S, 140, 98, 131);
  S.prop(TABLE, 180, 147, { base: 152.5, foot: [0, 0, 12, 5] }); S.prop(LAPTOP, 180, 143, { base: 153 }); S.prop(MUG, 188, 145, { base: 153.2 }); addSteam(S, 189, 142);
  S.emit(() => { for (let j = 0; j < 2; j++) for (let i = 0; i < 6; i++) PM(183 + i, 144 + j, (i + j) % 3 === 0 ? 0xffffff : 0x9ac4ff, 0.95); }); S.lights(nf => light(186, 144, 22, [0.6, 0.78, 1.0], 0.2 + 0.4 * nf));
  S.prop(makeMushroom(), 88, 202, { base: 304, foot: [52, 92, 74, 102] }); addFire(S, 112, 310);
  S.prop(LOG, 76, 314, { base: 317, foot: [1, 0, 17, 3] }); S.prop(STUMP, 128, 318, { base: 323, foot: [1, 1, 7, 5] }); S.prop(WOODPILE, 168, 314, { base: 321, foot: [0, 2, 15, 7] });
  // orders-db and nightly-export
  const dark = () => G.v('db.dark', false);
  S.prop(makeTower(), 318, 76, { base: 127, foot: [2, 30, 27, 51] }); addGauge(S, 339, 98, 16, 'db');
  S.emit(() => { if (dark()) return; const wn = clamp((G.phase - 0.2) / 0.8); for (let j = 0; j < 5; j++) for (let i = 0; i < 4; i++) PM(324 + i, 99 + j, C.warm, wn); });
  let wm = 0, wa = 0; addTick(S, dt => { wm += clamp(G.v('mill', 0) - wm, -dt * 1.5, dt * 1.5); wa += wm * dt; if (wm > 0.3 && Math.random() < dt * wm * 2) spawn({ k: 'conn', u: 0, sp: 0.5 + Math.random() * 0.3, life: 0, max: 99, path: cab }); });
  const cab = u => [lerp(334, 326, u), lerp(42, 86, u) + Math.sin(u * Math.PI) * 6];
  S.prop(makeMill(), 312, 14, { base: 55, foot: [3, 26, 24, 41], after: () => { const hx = 326, hy = 20; for (let k = 0; k < 4; k++) { const a = wa + k * Math.PI / 2, ca = Math.cos(a), sa = Math.sin(a); for (let l = 2; l <= 19; l++) { const x = hx + ca * l, y = hy + sa * l * 0.9; P(x, y, C.wd0); if (l > 6) for (let o = 1; o <= 4; o++) P(x - sa * o, y + ca * o * 0.9, (l + o) % 3 === 0 ? C.wd1 : C.pl1); } } RECT(hx - 1, hy - 1, 3, 3, C.wd1); P(hx, hy, C.wd4); } });
  S.over = () => { for (let i = 0; i <= 40; i++) { const [x, y] = cab(i / 40); P(x, y, C.ink); } };
  S.emit(() => { if (wm > 0.3) for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) PM(324 + i, 33 + j, C.warm, 0.7); });
  // the platforms
  S.prop(makeWatch(), 288, 250, { base: 305, foot: [1, 48, 22, 55] }); S.emit(() => { const w = Math.floor(T * 5) % 2; P(301, 250, 0x9a7ad8); P(302, 250 + w, 0x9a7ad8); P(301, 251, 0x7a5ab8); P(303, 251 - w, 0x7a5ab8); });
  S.prop(makeBellTower(), 190, 8, { base: 57, foot: [3, 36, 16, 49], after: () => { const ring = G.since('bell') < 3.4 && G.v('bell', 0), sw = ring ? Math.round(Math.sin(T * 14) * 2) : 0, x = 200 + sw, y = 17; RECT(x - 2, y, 4, 1, C.ye2); RECT(x - 3, y + 1, 6, 3, C.ye); RECT(x - 4, y + 4, 8, 1, C.ye2); P(x - 2, y + 1, 0xfff0b0); } });
  S.prop(makeShed(), 446, 258, { base: 283, foot: [1, 12, 26, 25] }); warmWindows(S, [[451, 272, 6, 4]]);
  // the archive
  S.prop(makeNorthWall(), 380, 20, { base: 50, foot: [0, 0, 117, 29] }); S.prop(makeSideWall(84, 12), 374, 24, { base: 120, foot: [0, 0, 11, 95] }); S.prop(makeSideWall(66, 12), 490, 24, { base: 102, foot: [0, 0, 11, 77] });
  S.prop(makePillar(14), 403, 82, { base: 101, foot: [0, 14, 9, 19] }); S.prop(makePillar(10), 469, 90, { base: 105, foot: [0, 10, 9, 15] });
  S.prop(LECTERN, 431, 44, { base: 51 }); S.prop(BOOKS, 418, 44, { base: 49.5 }); S.prop(BOOKS, 449, 44, { base: 49.5 });
  addCandles(S, [[423, 40], [428, 39], [446, 39], [451, 40]], true); addCandles(S, [[387, 20], [493, 20], [408, 96], [474, 100]]);
  glowShrooms(S, [[358, 140], [366, 146], [500, 136], [494, 144], [240, 40], [232, 48], [40, 220], [50, 226], [214, 318], [222, 324]]);
  // shop-prod
  const PODS = [['checkout', 368, 220], ['checkout', 388, 220], ['checkout', 408, 220], ['cart', 442, 220], ['cart', 462, 220], ['web', 372, 270], ['web', 392, 270]].map(([svc, x, y], i) => ({ svc, x, y, i, ph: hash(i * 9.1) * 6 }));
  for (const p of PODS) { podDrawer(S, p, 'pod.' + p.svc, p.svc === 'cart' ? p.i - 3 : p.svc === 'web' ? p.i - 5 : p.i); S.spot('pod' + p.i, { x: p.x + 2, y: p.y + 3, r: 11, my: p.y - 26, label: `Look at the ${p.svc} pod`, flavor: () => { const st = G.v('pod.' + p.svc, 'ok'); return [st === 'crash' ? `This ${p.svc} pod keeps restarting.` : st === 'slow' ? `${p.svc} is up, but slow. It is waiting on something.` : p.svc === 'web' ? 'A web pod. It serves the shop\'s pages.' : `A ${p.svc} pod. Healthy, and taking orders.`]; } }); }
  { const x0 = 344, y0 = 176, x1 = 486, y1 = 296; S.prop(makeFenceH(x1 - x0), x0, y0 - 6, { base: y0 }); S.block(x0, y0 - 2, x1, y0); S.prop(makeFenceH(x1 - x0), x0, y1 - 6, { base: y1 }); S.block(x0, y1 - 2, x1, y1); S.prop(makeFenceV(222 - y0), x0 - 1, y0, { base: 222 }); S.block(x0 - 1, y0, x0 + 1, 222); S.prop(makeFenceV(y1 - 246), x0 - 1, 246, { base: y1 }); S.block(x0 - 1, 246, x0 + 1, y1); S.prop(makeFenceV(y1 - y0), x1 - 2, y0, { base: y1 }); S.block(x1 - 2, y0, x1, y1); }
  addObserver(S, 'obs.prod', 354, 232, 'alert.prod'); addObserver(S, 'obs.db', 356, 124, 'alert.db');
  for (const L of [S.streamSide(92, -1, 12), S.streamSide(206, -1, 12), S.streamSide(250, 1, 12)]) addLantern(S, L[0], L[1]);
  for (const [x, y, t] of [[286, 226, 'SHOP-PROD'], [356, 186, 'CHECKOUT'], [434, 186, 'CART'], [366, 240, 'WEB'], [276, 108, 'ORDERS-DB'], [262, 60, 'NIGHTLY-EXPORT'], [314, 298, 'DATADOG'], [148, 50, 'PAGERDUTY'], [404, 122, 'ARCHIVE'], [438, 244, 'DEPLOYS']]) S.sign(x, y, t);
  if (N === 'n4') { S.prop(makeNotice(), 296, 186, { base: 206, foot: [2, 16, 21, 19] }); S.sign(296, 172, 'CONFIG', { noBlock: true }); S.prop(CELLAR, 290, 88, { base: 97, foot: [0, 0, 19, 8] }); S.spot('config', { x: 308, y: 210, r: 14, my: 160, label: 'Read the config' }); S.spot('cellar', { x: 300, y: 102, r: 14, my: 72, label: 'Look at the cold storage', flavor: ['Cold storage. Old data goes down here when nobody needs it every day.'] }); }
  if (N === 'n5') { S.sign(196, 100, 'DNS'); S.prop(makeNotice(), 196, 112, { base: 132, foot: [2, 16, 21, 19] }); S.spot('dns', { x: 208, y: 136, r: 14, my: 86, label: 'Read the DNS records' }); const b = makeBalloon(); S.prop(b, 16, 142, { base: 197, foot: [11, 46, 22, 53] }); S.spot('balloon', { x: 33, y: 202, r: 14, my: 132, label: 'Ride the balloon up to the AWS dock' }); S.exit({ x0: 22, y0: 200, x1: 44, y1: 210, to: 'sky', spawn: [70, 130] }); }
  S.spot('obs.prod').flavor = () => [['Observer', G.v('alert.prod') ? 'shop-prod observer here. Something is wrong, it is on the board.' : 'shop-prod observer here. Every pod is healthy.']];
  S.spot('obs.db').flavor = () => [['Observer', `orders-db observer here. ${G.v('db.dark') ? 'orders-db moved to orders-db-2 at 22:00. This host is shut down.' : Math.round(G.v('db', 0.24) * 500) + ' of 500 connections in use.'}`]];
  S.spot('shed', { x: 465, y: 287, r: 14, my: 248, label: 'Read the deploys', flavor: ['Deploys. Every change to shop-prod is written here.'] });
  S.spot('db', { x: 333, y: 131, r: 16, my: 66, label: 'Look at orders-db', flavor: () => ['orders-db, the shop\'s database. checkout, cart and nightly-export all use it.'] });
  S.spot('mill', { x: 326, y: 60, r: 16, my: 10, label: 'Look at nightly-export', flavor: () => [G.v('mill', 0) > 0.5 ? 'nightly-export is running.' : 'nightly-export, a scheduled job. It runs every night at 20:00.'] });
  S.spot('watch', { x: 300, y: 310, r: 16, my: 240, label: 'Look at the Datadog tower', flavor: ['The Datadog watchtower. Its alerts come to the board by pigeon.'], sx: 300, sy: 256 });
  S.spot('bell', { x: 200, y: 61, r: 14, my: 0, label: 'Look at the PagerDuty bell', flavor: ['The PagerDuty bell. When it rings, someone gets paged.'], sx: 200, sy: 18 });
  S.spot('archive', { x: 436, y: 56, r: 16, my: 28, label: 'Read the archive', flavor: ['The archive. Every RCA ends up here, so the next investigation starts from what we already know.'] });
  S.spot('fire', { x: 112, y: 304, r: 16, my: 270, label: 'Sit by the fire', flavor: ['A small campfire under the big mushroom.'] });
  S.spot('door', { x: 86, y: 130, r: 12, label: 'Look at the door', flavor: ['Juniper\'s cottage. The team roasts the coffee in there.'] });
  S.forest([[44, 50, 138, 146], [96, 76, 206, 166], [40, 196, 230, 346], [180, 0, 228, 64], [268, 0, 370, 160], [340, 0, 512, 150], [322, 164, 512, 312], [276, 240, 330, 318], [BX - 20, 140, BX + 60, 190], [6, 128, 64, 210]]).grass();
  S.rocksAt([[30, 120], [212, 120], [120, 240], [470, 320], [250, 300]]);
  return S;
} };

// ---------------------------------------------------------------- the bakery street (Hearth Bakery)
SCENES.street = { title: 'Hearth Bakery', make(night) {
  const S = new Scene('street', 448, 256, 23); S.flies = true;
  S.meadow();
  S.stones(224, 140, 214, 22, [0x3a2e2a, 0x6a5444, 0x86705a, 0xa08a70, 0xbaa486], 8, true);
  S.path([[200, 160], [204, 200], [210, 236]]); S.path([[120, 118], [120, 100]]); S.path([[210, 118], [210, 100]]); S.path([[300, 118], [300, 100]]);
  S.flowers(1.4).finishSolid();
  const OV = [[100, 58, 'oven1', 'OVEN-1'], [190, 58, 'oven2', 'OVEN-2'], [280, 58, 'oven3', 'OVEN-3']];
  const pal = [[0x4a2a1e, 0x7a4430, 0xa05a3a, 0xc8784c], [0x1e3a4a, 0x2c566a, 0x3e7690, 0x5e98b0], [0x3a3a1e, 0x5e5a2c, 0x86803e, 0xaca45a]];
  OV.forEach(([x, y, id, t], i) => {
    S.prop(makeWorkshop(pal[i]), x, y, { base: y + 41, foot: [2, 20, 37, 41] });
    S.sign(x + 5, y + 44, t, { noBlock: true });
    const ok = () => G.v('disk.' + id, 0.3) < 0.95;
    S.emit(nf => { const g = 0.55 + 0.25 * Math.sin(T * 3 + i); for (let j = 0; j < WORKSHOP_DOOR[3]; j++) for (let k = 0; k < WORKSHOP_DOOR[2]; k++) PM(x + WORKSHOP_DOOR[0] + k, y + WORKSHOP_DOOR[1] + j, ok() ? (j > 4 ? C.f_2 : C.f_3) : 0x3a2430, ok() ? g : 0.7); const wn = clamp((G.phase - 0.2) / 0.8); for (let j = 0; j < 5; j++) for (let k = 0; k < 6; k++) PM(x + 5 + k, y + 24 + j, C.warm, wn); });
    S.lights(nf => { if (ok()) light(x + 19, y + 36, 30, WARM, 0.4 + 0.5 * nf); });
    addGauge(S, x + 28, y + 23, 11, 'disk.' + id, 0.15);
    addTick(S, dt => { if (ok() && Math.random() < dt * 1.4) spawn({ k: 'smoke', x: x + 31, y: y, vx: 2 + Math.random() * 2, vy: -7, life: 0, max: 2.6, r: 2 }); });
    addObserver(S, 'obs.' + id, x + 44, y + 52, 'alert.' + id, () => G.v('obs.' + id, 0));
    S.spot(id, { x: x + 19, y: y + 48, r: 14, my: y - 8, label: `Look at ${t.toLowerCase()}`, flavor: () => [ok() ? `${t.toLowerCase()}, one of the bakery's machines. Warm and busy.` : `${t.toLowerCase()} has stopped baking.`] });
  });
  // the log pile at oven-2
  S.dyn(116, () => { const n = Math.round(G.v('logs', 0) * 12); for (let k = 0; k < n; k++) { const x = 214 + (k % 4) * 5 - Math.floor(k / 4) * 2, y = 112 - Math.floor(k / 4) * 3; RECT(x, y, 5, 3, C.wh); P(x, y + 1, C.pl3); P(x + 4, y + 1, C.pl2); } });
  S.spot('logs', { x: 222, y: 118, r: 12, my: 92, label: 'Look at the logs', flavor: () => [G.v('logs', 0) > 0.3 ? 'Scrolls of logs, spilling out of oven-2.' : 'oven-2\'s logs, rolled up neatly.'] });
  // the bakery and Theo's counter
  const shop = makeCottage(); S.prop(shop, 40, 170, { base: 243, foot: [2, 12, 76, 69] }); warmWindows(S, COTTAGE_GLASS.map(([x, y, w, h]) => [40 + x, 170 + y, w, h]));
  S.sign(48, 158, 'HEARTH BAKERY', { noBlock: true });
  S.prop(TABLE, 128, 196, { base: 201, foot: [0, 0, 12, 5] }); S.prop(LAPTOP, 128, 192, { base: 201.5 }); S.prop(MUG, 136, 194, { base: 201.6 }); addSteam(S, 137, 191);
  S.emit(() => { for (let j = 0; j < 2; j++) for (let i = 0; i < 6; i++) PM(131 + i, 193 + j, (i + j) % 3 === 0 ? 0xffffff : 0x9ac4ff, 0.95); });
  addBoard(S, 170, 170, 203);
  S.prop(makeNotice(), 330, 86, { base: 106, foot: [2, 16, 21, 19] }); S.sign(330, 72, 'UPDATES', { noBlock: true }); S.spot('updates', { x: 342, y: 110, r: 14, my: 60, label: 'Read the updates', flavor: ['The updates board. Every package installed on the bakery\'s machines.'] });
  // the lift up to the AWS dock
  S.prop(makeLift(), 396, 92, { base: 152, foot: [0, 56, 25, 59] }); S.sign(390, 78, 'AWS', { noBlock: true });
  S.spot('lift', { x: 409, y: 162, r: 14, my: 70, label: 'Take the lift up to the AWS dock' });
  S.exit({ x0: 400, y0: 158, x1: 418, y1: 166, to: 'sky', spawn: [70, 130], when: g => !g.run || g.run.stage !== 'intro' });
  for (const [x, y] of [[60, 130], [160, 130], [250, 130], [350, 130], [150, 160], [300, 160]]) addLantern(S, x, y);
  S.forest([[30, 50, 440, 250]], 0).grass(500);
  return S;
} };

// ---------------------------------------------------------------- the AWS dock in the sky
SCENES.sky = { title: 'AWS account', make(night) {
  const S = new Scene('sky', 384, 240, 31); S.wind = true;
  S.skyFill().island(196, 118, 168, 88);
  S.path([[60, 132], [120, 130], [200, 140], [290, 150], [320, 176]], 4.4); S.path([[120, 130], [110, 96]], 4);
  S.flowers(0.8).finishSolid();
  const N = nid(night), label = N === 'n5' ? 'JUNIPER-AWS' : 'HEARTH-AWS';
  S.sign(40, 70, label, { noBlock: true });
  S.prop(makeLift(), 30, 84, { base: 144, foot: [0, 56, 25, 59] }); S.spot('liftdown', { x: 44, y: 150, r: 14, my: 66, label: N === 'n5' ? 'Ride the balloon down' : 'Take the lift down' });
  S.exit({ x0: 34, y0: 146, x1: 54, y1: 156, to: N === 'n5' ? 'valley' : 'street', spawn: N === 'n5' ? [33, 214] : [409, 172] });
  S.prop(makeSilo(), 96, 46, { base: 95, foot: [2, 36, 27, 49] }); S.sign(92, 98, 'BACKUPS', { noBlock: true });
  S.spot('s3', { x: 111, y: 106, r: 14, my: 34, label: 'Look at the backups bucket', flavor: ['The backups bucket, in S3. Every night\'s backups land here.'] });
  // the queue: a belt with crates on it
  const qx = 170, qy = 116;
  S.ground = () => { RECT(qx, qy, 90, 7, 0x2a2c3a); for (let i = 0; i < 90; i += 6) P(qx + i + Math.floor(T * 8) % 6, qy + 3, 0x5a5e70); RECT(qx, qy, 90, 1, 0x4a4e60); };
  S.block(qx, qy, qx + 90, qy + 7);
  S.dyn(qy + 7, () => { const n = Math.round(G.v('queue', 0.15) * 16); for (let k = 0; k < n; k++) { const x = qx + 84 - (k % 12) * 7, y = qy - 4 - Math.floor(k / 12) * 5; blit(CRATE, x - 3, y); } });
  S.sign(186, 100, 'ORDERS-QUEUE', { noBlock: true });
  S.spot('queue', { x: 215, y: 128, r: 16, my: 88, label: 'Look at the queue', flavor: () => [G.v('queue', 0.15) > 0.5 ? 'The queue is backing up. Orders are waiting.' : 'The orders queue. Crates come in, the worker takes them out.'] });
  // the worker: an arm that lifts crates from the queue into the bucket
  const wx = 286, wy = 126;
  S.dyn(wy, () => { const st = G.v('worker', 'ok'), sw = st === 'ok' ? Math.sin(T * 2.5) : 0; RECT(wx - 5, wy - 4, 10, 4, C.sl1); RECT(wx - 4, wy - 5, 8, 1, C.sl3); const ax = wx + Math.round(sw * 8), ay = wy - 18; for (let i = 0; i < 14; i++) P(lerp(wx, ax, i / 14), lerp(wy - 5, ay, i / 14), C.sl3); RECT(ax - 2, ay - 2, 5, 3, C.sl2); if (st === 'ok' && sw > 0.3) blit(CRATE, ax - 3, ay + 1); shadow(wx, wy, 6, 2, 0.35); });
  S.emit(() => { const st = G.v('worker', 'ok'); if (st !== 'ok' && Math.sin(T * 6) > 0) { const x = wx, y = wy - 28; for (let i = -2; i <= 2; i++) { P(x + i, y + i, 0xff5a46); P(x + i, y - i, 0xff5a46); } } });
  S.block(wx - 5, wy - 4, wx + 5, wy); S.sign(270, 136, 'WORKER', { noBlock: true });
  S.spot('worker', { x: wx, y: wy + 6, r: 14, my: wy - 42, label: 'Look at the worker', flavor: ['The worker. A small function that takes orders off the queue and files them.'] });
  S.prop(LECTERN, 300, 168, { base: 175, foot: [0, 3, 9, 6] }); S.sign(290, 152, 'CLOUDTRAIL', { noBlock: true });
  S.spot('trail', { x: 305, y: 180, r: 14, my: 140, label: 'Read CloudTrail', flavor: ['CloudTrail. Every change anyone makes in this AWS account is written here.'] });
  addObserver(S, 'obs.aws', 150, 160, 'alert.aws');
  S.spot('obs.aws').flavor = () => [['Observer', G.v('alert.aws') ? 'AWS observer here. The queue is backing up.' : 'AWS observer here. The account looks healthy.']];
  for (const [x, y] of [[140, 120], [250, 160], [80, 160]]) addLantern(S, x, y);
  S.forest([[40, 60, 340, 190]], 0).grass(400);
  return S;
} };

// ---------------------------------------------------------------- the harbour (Harbor Radio)
SCENES.harbor = { title: 'Harbor Radio', make(night) {
  const S = new Scene('harbor', 480, 320, 41); S.rain = true; S.noForestFloor = false;
  S.meadow().seaFrom(188);
  S.path([[40, 150], [120, 150], [200, 156], [300, 150], [400, 160], [440, 178]]); S.path([[120, 150], [100, 122]]); S.path([[300, 150], [312, 122]]);
  S.stones(240, 176, 230, 10, [0x2a2e3a, 0x44495a, 0x5a6074, 0x727a8e, 0x8a92a6], 7, true);
  S.flowers(0.5).finishSolid();
  // piers are the nodes
  const PIERS = [[120, 'NODE-1'], [220, 'NODE-2'], [320, 'NODE-3']];
  for (const [x, t] of PIERS) { const pier = makePier(40, 100); S.prop(pier, x, 190, { base: 150 }); S.clear(x, 186, x + 39, 289); S.sign(x + 6, 290, t, { noBlock: true }); }
  const node3Closed = () => G.v('cordon', true);
  S.dyn(198, () => { if (!node3Closed()) return; for (let i = 0; i < 40; i += 8) { RECT(320 + i, 192, 2, 6, C.wd1); } for (let i = 0; i < 40; i++) P(320 + i, 194 + Math.round(Math.sin(i * 0.4) * 1), 0xd8c070); });
  S.lights(nf => { if (node3Closed()) light(340, 194, 14, [1, 0.8, 0.3], 0.2); });
  addTick(S, () => { if (node3Closed()) S.block(320, 190, 359, 198); else S.clear(320, 188, 359, 198); });
  const HOUSES = [['stream', 132, 230], ['stream', 148, 262], ['stream', 232, 230], ['stream', 248, 262]].map(([svc, x, y], i) => ({ svc, x, y, i, ph: hash(i * 3.3) * 6 }));
  for (const p of HOUSES) podDrawer(S, p, 'pod.stream', p.i);
  // the encoder pod, waiting on the shore for a node to take it
  const enc = { svc: 'encoder', x: 340, y: 240, i: 0, ph: 1 };
  S.dyn(() => G.v('encoder', 'pending') === 'ok' ? 241 : 182, () => { const ok = G.v('encoder', 'pending') === 'ok'; if (ok) blit(POD_S.encoder, 332, 223); else { const s = POD_S.encoder; for (let j = 0; j < s.h; j++) for (let i = 0; i < s.w; i++) { const c = s.d[j * s.w + i]; if (c >= 0 && (i + j + Math.floor(T * 3)) % 3 === 0) PM(300 + i, 160 + j, c, 0.7); } } });
  S.emit(() => { if (G.v('encoder', 'pending') === 'ok') for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) P(336 + i, 234 + j, C.warm); });
  S.spot('encoder', { x: 308, y: 182, r: 14, my: 140, label: 'Look at podcast-encoder', flavor: () => [G.v('encoder', 'pending') === 'ok' ? 'podcast-encoder is running on node-3.' : 'podcast-encoder is waiting on the shore. No node has taken it.'] });
  S.spot('node3', { x: 340, y: 186, r: 14, my: 160, label: 'Look at node-3', flavor: () => [node3Closed() ? 'node-3 is roped off.' : 'node-3 is open again.'] });
  // the lighthouse is the ingress: its light brings listeners in
  const LX = 424, LY = 92; S.prop(makeLighthouse(), LX, LY, { base: LY + 73, foot: [4, 62, 22, 73] });
  const tlsOk = () => G.v('tls', 'ok') === 'ok';
  S.emit(() => { const on = tlsOk() || Math.sin(T * 17) > 0.7; for (let j = 0; j < 9; j++) for (let i = 0; i < 10; i++) if (i !== 4) PM(LX + 8 + i, LY + 9 + j, tlsOk() ? C.warm2 : 0xff6a50, on ? 0.95 : 0.3); if (tlsOk()) { const a = T * 0.8, ca = Math.cos(a), sa = Math.sin(a) * 0.55; for (let l = 10; l < 150; l += 1.5) { const w = l * 0.12; for (let o = -w; o <= w; o += 1.5) PM(LX + 13 + ca * l - sa * o, LY + 13 + sa * l + ca * o * 0.5, 0xfff0c0, 0.16 * (1 - l / 150)); } } });
  S.lights(nf => { if (tlsOk()) { const a = T * 0.8; light(LX + 13 + Math.cos(a) * 60, LY + 13 + Math.sin(a) * 33, 30, [1, 0.92, 0.7], 0.5); light(LX + 13, LY + 13, 30, [1, 0.9, 0.6], 0.6); } else light(LX + 13, LY + 13, 20, RED, 0.3 + 0.2 * Math.sin(T * 9)); });
  S.sign(LX - 10, LY + 76, 'INGRESS', { noBlock: true });
  S.spot('lighthouse', { x: LX + 13, y: LY + 80, r: 16, my: LY - 10, label: 'Look at the ingress', flavor: () => [tlsOk() ? 'The ingress. Its light brings listeners in to the stream.' : 'The ingress light is flickering red.'] });
  // the radio station: mast, booth, Ines
  S.prop(makeMast(), 40, 30, { base: 106, foot: [4, 70, 11, 76] }); S.emit(() => { if (Math.sin(T * 3) > 0) { P(47, 30, 0xff5a46); P(48, 30, 0xff5a46); } }); S.lights(() => light(48, 30, 10, RED, Math.sin(T * 3) > 0 ? 0.6 : 0));
  S.prop(makeShed(), 62, 84, { base: 109, foot: [1, 12, 26, 25] }); warmWindows(S, [[67, 98, 6, 4]]); S.sign(60, 70, 'HARBOR RADIO', { noBlock: true });
  S.prop(TABLE, 96, 118, { base: 123, foot: [0, 0, 12, 5] }); S.prop(LAPTOP, 96, 114, { base: 123.5 }); S.prop(MUG, 104, 116, { base: 123.6 }); addSteam(S, 105, 113);
  S.emit(() => { for (let j = 0; j < 2; j++) for (let i = 0; i < 6; i++) PM(99 + i, 115 + j, (i + j) % 3 === 0 ? 0xffffff : 0x9ac4ff, 0.95); });
  addBoard(S, 150, 98, 131);
  S.prop(makeShed(), 296, 96, { base: 121, foot: [1, 12, 26, 25] }); warmWindows(S, [[301, 110, 6, 4]]); S.sign(298, 82, 'CERTS', { noBlock: true });
  S.spot('certs', { x: 314, y: 128, r: 14, my: 80, label: 'Read the certificates', flavor: ['The certificates office. cert-manager renews them here.'] });
  S.prop(makeNotice(), 230, 112, { base: 132, foot: [2, 16, 21, 19] }); S.sign(226, 98, 'SCHEDULER', { noBlock: true });
  S.spot('scheduler', { x: 242, y: 136, r: 14, my: 86, label: 'Read the scheduler', flavor: ['The scheduler board. It decides which node each pod goes to.'] });
  S.prop(makeWatch(), 372, 70, { base: 125, foot: [1, 48, 22, 55] }); S.sign(368, 128, 'DATADOG', { noBlock: true });
  S.emit(() => { const w = Math.floor(T * 5) % 2; P(385, 70, 0x9a7ad8); P(386, 70 + w, 0x9a7ad8); });
  S.spot('watch', { x: 384, y: 142, r: 14, my: 60, label: 'Look at the Datadog tower', flavor: ['The Datadog tower. It watches the stream from outside, the way listeners hear it.'], sx: 384, sy: 76 });
  addObserver(S, 'obs.radio', 196, 162, 'alert.radio');
  S.spot('obs.radio').flavor = () => [['Observer', G.v('alert.radio') ? 'radio-prod observer here. Something is wrong, it is on the board.' : 'radio-prod observer here. All quiet.']];
  for (const [x, y] of [[110, 170], [210, 170], [310, 170], [400, 176]]) addLantern(S, x, y);
  addTick(S, dt => { if (Math.random() < dt * 30) { const x = camX + Math.random() * VW, y = camY + Math.random() * VH, k = Math.round(y) * S.W + Math.round(x); if (S.kind[k] === 1 || S.kind[k] === 4 || S.kind[k] === 2) spawn({ k: 'ripple', x, y, vx: 0, vy: 0, life: 0, max: 0.6 }); } });
  S.forest([[30, 60, 470, 320]], 0).grass(500);
  return S;
} };

// ---------------------------------------------------------------- Rubix's cottage
const KNOW_NODES = {
  checkout: [148, 14], cart: [160, 22], web: [140, 24], 'orders-db': [156, 9], 'nightly-export': [168, 8], datadog: [134, 12], pagerduty: [146, 30],
  oven2: [182, 20], updates: [190, 12], queue: [196, 26], worker: [204, 18], backups: [200, 9], cloudtrail: [210, 26],
  ingress: [222, 12], certs: [230, 20], encoder: [216, 26], node3: [226, 30], stream: [234, 10], dns: [176, 30],
};
SCENES.hub = { title: 'Rubix\'s cottage', make() {
  const S = new Scene('hub', 256, 160, 5); S.interior(40);
  // the window and its sunbeam
  S.ground = () => {
    for (let y = 8; y < 30; y++) for (let x = 36; x < 76; x++) { const fr = x === 36 || x === 75 || y === 8 || y === 29 || x === 55 || y === 18; P(x, y, fr ? C.wd1 : mix(0xe8927e, 0x6a4a8a, (30 - y) / 22)); }
    for (let x = 36; x < 76; x++) P(x, 30, C.wd3);
    for (let y = 6; y < 34; y++) for (let x = 126; x < 242; x++) if (y === 6 || y === 33 || x === 126 || x === 241) P(x, y, C.wd1); else PM(x, y, 0x1a1830, 0.9);
    text3(128, 35, 'WHAT RUBIX KNOWS', 0x2b1d14);
  };
  S.emit(() => {
    const done = G.save.graph; for (const [a, b] of done) { const A0 = KNOW_NODES[a], B0 = KNOW_NODES[b]; if (!A0 || !B0) continue; const L = Math.hypot(B0[0] - A0[0], B0[1] - A0[1]); for (let s = 0; s < L; s++) if ((Math.floor(s) + Math.floor(T * 4)) % 3) PM(A0[0] + (B0[0] - A0[0]) * s / L, A0[1] + (B0[1] - A0[1]) * s / L, 0x9cc0ff, 0.6); }
    const seen = new Set(done.flat()); for (const [id, [x, y]] of Object.entries(KNOW_NODES)) { if (!seen.has(id)) { PM(x, y, 0x3a3a5a, 0.8); continue; } const tw = 0.7 + 0.3 * Math.sin(T * 2 + x); PM(x, y, 0xffffff, tw); PM(x - 1, y, 0x9cc0ff, tw * 0.7); PM(x + 1, y, 0x9cc0ff, tw * 0.7); PM(x, y - 1, 0x9cc0ff, tw * 0.7); PM(x, y + 1, 0x9cc0ff, tw * 0.7); }
    for (let y = 9; y < 29; y++) for (let x = 37; x < 75; x++) if (!(x === 55 || y === 18)) PM(x, y, 0xffd0a0, 0.25);
  });
  S.lights(() => { for (let k = 0; k < 5; k++) light(60 + k * 14, 60 + k * 16, 22, [1, 0.8, 0.5], 0.35); light(200, 70, 40, WARM, 0.6); light(128, 56, 26, [0.6, 0.78, 1], 0.35); });
  S.prop(RUG, 98, 92, { base: 0 });
  S.prop(scale2(BED), 8, 42, { base: 62, foot: [0, 0, 43, 17] });
  S.prop(scale2(DESK), 98, 26, { base: 50, foot: [0, 12, 55, 23] }); S.emit(() => { for (let j = 0; j < 6; j++) for (let i = 0; i < 16; i++) PM(98 + 18 + i, 26 + 2 + j, (i + j + Math.floor(T * 2)) % 7 === 0 ? 0xffffff : 0x7fb0ff, 0.95); }); addSteam(S, 142, 30);
  S.prop(SHELF, 222, 34, { base: 64, foot: [0, 24, 21, 29] });
  S.prop(scale2(PLANT), 76, 26, { base: 42, foot: [2, 8, 13, 15] }); S.prop(scale2(PLANT), 226, 110, { base: 126, foot: [2, 8, 13, 15] });
  S.prop(LANTERN, 196, 44, { base: 61 });
  S.prop(scale2(TABLE), 22, 112, { base: 122, foot: [0, 0, 23, 9] }); S.prop(scale2(MUG), 30, 106, { base: 123 }); addSteam(S, 33, 104);
  S.spot('desk', { x: 126, y: 56, r: 18, my: 12, label: 'Start a night shift' });
  S.spot('map', { x: 184, y: 50, r: 22, my: -99, label: 'Look at what Rubix knows' });
  S.spot('shelf', { x: 232, y: 70, r: 14, my: 20, label: 'Look at the archive' });
  S.spot('bed', { x: 30, y: 68, r: 14, label: 'Look at the bed', flavor: ['Rubix does not sleep much. Someone is always on call.'] });
  S.spot('window', { x: 56, y: 46, r: 16, label: 'Look out the window', flavor: ['Dusk again. Somewhere, a team is about to start their evening rush.'] });
  S.spot('cup', { x: 34, y: 128, r: 12, label: 'Look at the cup', flavor: ['Coffee from Juniper. They send a bag every week now.'] });
  S.spot('door', { x: 128, y: 150, r: 12, label: 'Look at the door', flavor: ['The desk picks the night. The door takes me there.'] });
  S.prop(ascii(["dddddddddddd", "dwwwwwwwwwwd", "dwwwwwwwwwwd", "dwwwwwwwyywd"], { d: C.wd0, w: C.wd2, y: C.ye2 }), 122, 154, { base: 0 });
  S.finishSolid();
  return S;
} };
