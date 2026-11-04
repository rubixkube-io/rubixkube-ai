'use strict';
// Game state, scenes and moving between them, the cottage between nights, saving progress, and the main loop.
const R = { x: 128, y: 120, dir: 'down', moving: false, anim: 0, sit: false, hop: 0, happy: 0, mug: false };
const SAVE_KEY = 'rns-progress-v1';
const G = {
  scene: null, run: null, night: null, cache: {}, vars: {}, varT: {}, phase: 0.3, fade: 0, transit: null, signals: [], events: [], queue: [], chk: null, speed: 1, oncall: null, target: null,
  save: { unlocked: 1, done: {}, learned: {}, graph: [], best: {} },
  load() { try { const s = JSON.parse(store.get(SAVE_KEY) || 'null'); if (s && s.unlocked) this.save = Object.assign(this.save, s); } catch (e) { } },
  persist() { store.set(SAVE_KEY, JSON.stringify(this.save)); },
  v(name, def) { return name in this.vars ? this.vars[name] : def; },
  since(name) { return T - (this.varT[name] !== undefined ? this.varT[name] : -99); },
  setVars(o) { for (const [k, v] of Object.entries(o)) { if (this.vars[k] !== v) { this.vars[k + '.prev'] = k in this.vars ? this.vars[k] : v; this.vars[k] = v; this.varT[k] = T; } } },
  later(sec, fn) { this.events.push({ t: T + sec, fn }); },
  say(lines, done) { if (UI.dlg || this.transit) this.queue.push([lines, done]); else UI.say(lines, done); },
  check(label, secs, done) { this.chk = { label, t0: T, secs, done }; },
  signal(from, kind, cb) {
    const S = this.scene, a = S.spots[from], b = S.spots[(this.run && this.run.def.board) || 'board'];
    if (a && b) { if (kind === 'pigeon') sfx.flap(); this.signals.push({ scene: S.id, kind, x0: a.sx !== undefined ? a.sx : a.x, y0: a.sy !== undefined ? a.sy : a.y - 12, x1: b.x, y1: b.y - 18, t0: T, dur: kind === 'pigeon' ? 3.2 : 1.6, cb }); }
    else this.later(1.6, cb);
  },
  learn(def, d) { this.run.learned = this.run.learned || []; for (const l of d.learn || []) if (!this.run.learned.includes(l)) this.run.learned.push(l); for (const e of d.graph || []) this.run.graphNew = (this.run.graphNew || []).concat([e]); },
  people() { const o = this.oncall; return o && this.run && o.scene === this.scene.id ? [o] : []; },
  moveOncall([scene, x, y]) { const o = this.oncall; o.scene = scene; o.x = x; o.y = y; this.syncOncallSpot(); },
  syncOncallSpot() { const S = this.scene; delete S.spots.oncall; const o = this.oncall; if (o && this.run && o.scene === S.id) S.spots.oncall = { id: 'oncall', x: o.x, y: o.y + 3, r: 20, my: o.y - 26, label: `Talk to ${o.name}` }; },
  markFor(id) {
    if (this.run) return this.run.markFor(id);
    if (this.scene.id === 'hub' && id === 'desk' && !this.save.done[NIGHTS[Math.min(this.save.unlocked, NIGHTS.length) - 1].id]) return '!';
    return null;
  },
  openIncidents() { if (!el.title.hidden) return; if (this.run) UI.openPanel(`Incidents, ${this.run.def.customer}`, this.run.panelHTML()); else this.openKnows(); },
  openKnows() {
    const parts = NIGHTS.filter(n => this.save.learned[n.id] && this.save.learned[n.id].length).map(n => `<article class="entry knows"><h3>${n.customer} <span class="night">${n.title}</span></h3><ul>${this.save.learned[n.id].map(l => `<li>${l}</li>`).join('')}</ul></article>`);
    UI.openPanel('What Rubix knows', parts.length ? parts.join('') : '<p class="empty">Nothing yet. Rubix learns something from every incident it closes.</p>');
  },
  enter(id, spawn, instant) {
    const go = () => {
      if (!this.cache[id]) this.cache[id] = buildScene(id, this.night);
      this.scene = this.cache[id]; R.x = spawn[0]; R.y = spawn[1]; R.sit = false; this.syncOncallSpot(); parts.length = 0;
      camX = clamp(R.x - VW / 2, 0, this.scene.W - VW); camY = clamp(R.y - 10 - VH / 2, 0, this.scene.H - VH);
    };
    if (instant) { go(); return; }
    this.transit = { t: 0, go, done: false }; sfx.door();
  },
  startNight(n) {
    this.night = n; this.cache = {}; this.vars = { ...(n.vars || {}) }; this.varT = {}; this.events = []; this.signals = []; this.chk = null;
    this.run = new NightRun(n); this.run.start();
    this.oncall = { name: n.oncall.name, ...PEOPLE[n.oncall.sprite], scene: n.oncall.at[0], x: n.oncall.at[1], y: n.oncall.at[2], ph: 0.7 };
    el.hud.hidden = false; this.phase = n.phase ? n.phase[0] : 0;
    this.enter(n.scene, n.spawn);
    this.later(0.9, () => this.say([['', `${n.title}\n${n.customer}, ${n.place}`], ...n.arrive]));
  },
  finishNight() {
    const run = this.run, n = this.night, s = run.summary();
    this.save.done[n.id] = true; this.save.learned[n.id] = Array.from(new Set([...(this.save.learned[n.id] || []), ...(run.learned || [])]));
    for (const e of run.graphNew || []) if (!this.save.graph.some(g => g[0] === e[0] && g[1] === e[1])) this.save.graph.push(e);
    const idx = NIGHTS.indexOf(n); this.save.unlocked = Math.max(this.save.unlocked, Math.min(NIGHTS.length, idx + 2));
    const prev = this.save.best[n.id]; if (!prev || s.ttu < prev.ttu) this.save.best[n.id] = { ttu: s.ttu };
    this.persist(); sfx.done(); tell({ type: 'night_finished', night: n.id, incidents: s.incidents });
    el.sumTitle.textContent = `${n.title} done`;
    el.sumSub.textContent = s.triage === 'wrong' ? `${n.customer}. The higher severity incident waited while Rubix worked on the other one.` : s.triage === 'right' ? `${n.customer}. Triage picked the right incident first.` : `${n.customer}, ${n.place}.`;
    el.sumStats.innerHTML = [[s.incidents, 'Incidents'], [s.alerts, s.alerts > s.incidents ? `Alerts, grouped into ${s.incidents}` : 'Alerts'], [fmtTime(s.ttu), 'Mean time to understand'], [s.approvals, n.mode === 'auto' ? 'Approvals asked' : 'Changes approved']].map(([b, t]) => `<div class="stat"><b>${b}</b><span>${t}</span></div>`).join('');
    el.sumLearn.innerHTML = (run.learned || []).map(l => `<li>${l}</li>`).join('');
    $('sumBtn').textContent = idx === NIGHTS.length - 1 ? 'Back to the cottage, for good' : 'Back to the cottage';
    el.summary.hidden = false; $('sumBtn').focus();
  },
  toHub(first) {
    const last = this.night && NIGHTS.indexOf(this.night) === NIGHTS.length - 1 && this.save.done[this.night.id];
    this.run = null; this.night = null; this.oncall = null; this.cache = {}; this.vars = {}; this.chk = null; UI.mode(null); UI.conf(null); UI.check(null, null);
    this.enter('hub', [118, 112], first); this.phase = 0.3;
    const next = NIGHTS[Math.min(this.save.unlocked, NIGHTS.length) - 1];
    this.later(first ? 0.5 : 1.0, () => this.say(first ? [['Rubix', 'Home. Every evening a different team asks me to watch over their systems.'], ['Rubix', 'The desk shows tonight\'s shift.']] : last ? [['Rubix', 'Five nights, five teams. I know every one of their systems a little better now.'], ['Rubix', 'The map on the wall has all of it. Any night can be played again from the desk.']] : [['Rubix', `Home again. Next up: ${next.title}, ${next.customer}.`]]));
  },
  hubInteract(id) {
    if (id === 'desk') {
      const open = NIGHTS.slice(0, this.save.unlocked);
      this.say([['', 'Night shifts', { choices: open.map(n => `${this.save.done[n.id] ? 'Again: ' : ''}${n.title}`), pick: k => this.startNight(open[k]) }]]);
      return;
    }
    if (id === 'map') return this.openKnows();
    if (id === 'shelf') { const n = Object.keys(this.save.done).length; return this.say([['Rubix', n ? `Every RCA from ${n} ${n === 1 ? 'night' : 'nights'}. I read the old ones before every investigation.` : 'My archive. It fills up with every RCA I write.']]); }
    const sp0 = this.scene.spots[id]; if (sp0 && sp0.flavor) this.say(sp0.flavor.map(t => ['Rubix', t]));
  },
  interact() {
    const t = this.target; if (!t) return;
    R.sit = false;
    if (!this.run) return this.hubInteract(t.id);
    if (this.run.interact(t.id)) return;
    const f = this.night.flavor && this.night.flavor[t.id];
    const lines = typeof f === 'function' ? f(this) : f || (t.flavor && (typeof t.flavor === 'function' ? t.flavor(this) : t.flavor));
    if (lines) return this.say(lines.map(l => typeof l === 'string' ? ['Rubix', l] : l));
    if (t.id === (this.night.board || 'board')) return this.openIncidents();
  },
  update(dt) {
    dt *= this.speed; T += dt;
    const S = this.scene;
    // night light follows how far the night has come
    let target = 0.3;
    if (this.run) { const n = this.night, [p0, p1] = n.phase || [0, 2], tot = this.run.incs.length, closed = this.run.incs.filter(i => i.st === 'closed').length, st = this.run.stage; target = st === 'intro' || st === 'setup' ? p0 : st === 'outro' || st === 'done' ? p1 : lerp(p0, p1, (closed + 0.15) / (tot + 0.3)); }
    this.phase += clamp(target - this.phase, -dt * 0.22, dt * 0.22);
    for (let i = this.events.length - 1; i >= 0; i--) if (T >= this.events[i].t) { const e = this.events.splice(i, 1)[0]; e.fn(); }
    for (let i = this.signals.length - 1; i >= 0; i--) if (T >= this.signals[i].t0 + this.signals[i].dur) { const s = this.signals.splice(i, 1)[0]; s.cb(); }
    if (!UI.dlg && !this.transit && this.queue.length) { const [l, d] = this.queue.shift(); UI.say(l, d); }
    if (this.chk) { const u = clamp((T - this.chk.t0) / this.chk.secs); UI.check(this.chk.label, u); if (u >= 1) { const d = this.chk.done; this.chk = null; UI.check(null, null); d(); } }
    UI.tick(dt);
    if (this.transit) { const tr = this.transit; tr.t += dt; if (!tr.done) { this.fade = clamp(tr.t / 0.35); if (tr.t >= 0.35) { tr.go(); tr.done = true; tr.t = 0; } } else { this.fade = 1 - clamp(tr.t / 0.35); if (tr.t >= 0.35) { this.transit = null; this.fade = 0; } } }
    R.happy = Math.max(0, R.happy - dt); R.hop = R.happy > 0 ? Math.max(0, Math.sin((1.2 - R.happy) * 9)) * 3 : 0;
    const playing = UI.playing();
    let vx = 0, vy = 0;
    if (playing) { if (held('arrowleft') || held('a')) vx -= 1; if (held('arrowright') || held('d')) vx += 1; if (held('arrowup') || held('w')) vy -= 1; if (held('arrowdown') || held('s')) vy += 1; }
    R.moving = vx !== 0 || vy !== 0;
    if (R.moving) {
      R.sit = false; const L = Math.hypot(vx, vy), spd = 58 * dt; vx = vx / L * spd; vy = vy / L * spd;
      R.dir = Math.abs(vx) > Math.abs(vy) ? (vx < 0 ? 'left' : 'right') : (vy < 0 ? 'up' : 'down');
      const blocked = (x, y) => { for (const [ox, oy] of [[-5, 0], [5, 0], [-5, -3], [5, -3], [0, 0], [0, -3]]) { const xx = Math.round(x + ox), yy = Math.round(y + oy); if (xx < 0 || yy < 0 || xx >= S.W || yy >= S.H || S.solid[yy * S.W + xx]) return true; } return false; };
      if (!blocked(R.x + vx, R.y)) R.x += vx; if (!blocked(R.x, R.y + vy)) R.y += vy;
      R.anim += dt;
      for (const ex of S.exits) if (R.x >= ex.x0 && R.x <= ex.x1 && R.y >= ex.y0 && R.y <= ex.y1) { if (!ex.when || ex.when(this)) { this.enter(ex.to, ex.spawn); break; } }
    }
    if (el.title.hidden) { camX += (R.x - VW / 2 - camX) * clamp(dt * 6); camY += (R.y - 10 - VH / 2 - camY) * clamp(dt * 6); }
    else { const a = T * 0.05; camX += ((300 + Math.sin(a) * 110 - VW / 2) - camX) * clamp(dt * 1.5); camY += ((170 + Math.cos(a * 1.3) * 80 - VH / 2) - camY) * clamp(dt * 1.5); }
    camX = clamp(camX, 0, S.W - VW); camY = clamp(camY, 0, S.H - VH);
    let best = null, bd = 1e9;
    if (playing) for (const sp0 of Object.values(S.spots)) { const d = Math.hypot(sp0.x - R.x, (sp0.y - (R.y - 4)) * 1.2); if (d < sp0.r && d < bd) { bd = d; best = sp0; } }
    this.target = best;
    if (best) { el.promptText.textContent = (this.run && this.run.labelFor(best.id)) || (typeof best.label === 'function' ? best.label(this) : best.label) || 'Look'; el.prompt.hidden = false; } else el.prompt.hidden = true;
    if (this.run && el.title.hidden) { const [h, t] = this.run.objective(); UI.objective(h, t); UI.conf(this.run.conf()); }
    else if (el.title.hidden) { const next = NIGHTS[Math.min(this.save.unlocked, NIGHTS.length) - 1]; UI.objective('Cottage', this.save.done[NIGHTS[NIGHTS.length - 1].id] ? 'Every night is done. Play any of them again from the desk.' : `Start ${next.title} from the desk.`); UI.conf(null); }
    if (S.tick) S.tick(dt);
    for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.life += dt; if (p.k === 'conn') { p.u += p.sp * dt; if (p.u >= 1) parts.splice(i, 1); continue; } if (p.k === 'ember') p.vx += Math.sin(T * 6 + i) * 10 * dt; p.x += p.vx * dt; p.y += p.vy * dt; if (p.life > p.max) parts.splice(i, 1); }
    audioTick(dt);
  },
};
$('sumBtn').addEventListener('click', () => { el.summary.hidden = true; G.toHub(false); });
function newGame(fresh) {
  audioInit(); if (embedded && UI.touch && !stage.classList.contains('immersive')) toggleImmersive(); if (fresh) { G.save = { unlocked: 1, done: {}, learned: {}, graph: [], best: {} }; G.persist(); }
  el.title.hidden = true; el.hud.hidden = false; G.toHub(true);
}
$('newBtn').addEventListener('click', () => newGame(true));
$('contBtn').addEventListener('click', () => newGame(false));
G.load(); if (Object.keys(G.save.done).length) $('contBtn').hidden = false;
// Dev mode: open index.html#dev. Number keys 1 to 5 start that night, 0 goes to the cottage,
// [ and ] step through every scene, T toggles 4x speed. Nothing it does is saved.
const DEV = location.hash === '#dev';
if (DEV) {
  G.persist = () => {}; G.save.unlocked = NIGHTS.length;
  const order = ['hub', 'valley', 'street', 'sky', 'harbor'];
  const spawnFor = { hub: [118, 112], valley: [150, 146], street: [200, 150], sky: [200, 140], harbor: [200, 150] };
  addEventListener('keydown', e => {
    if (!el.title.hidden) { if (/^[0-5]$/.test(e.key)) { audioInit(); el.title.hidden = true; el.hud.hidden = false; } else return; }
    if (UI.dlg) { UI.dlg = null; el.dialog.hidden = true; G.queue = []; }
    el.summary.hidden = true; UI.closePanel();
    if (/^[1-5]$/.test(e.key)) G.startNight(NIGHTS[+e.key - 1]);
    else if (e.key === '0') G.toHub(true);
    else if (e.key === '[' || e.key === ']') { const i = order.indexOf(G.scene.id), j = (i + (e.key === ']' ? 1 : order.length - 1)) % order.length; G.enter(order[j], spawnFor[order[j]]); }
    else if (e.key === 't' || e.key === 'T') G.speed = G.speed === 1 ? 4 : 1;
  });
}
G.enter(TITLE_SCENE, [300, 170], true);
let last = performance.now();
function frame(now) { const dt = Math.min(0.05, (now - last) / 1000); last = now; G.update(dt); render(); requestAnimationFrame(frame); }
requestAnimationFrame(frame);
window.__G = G; window.__R = R;
