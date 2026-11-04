'use strict';
// Dialogue, choices, the HUD, the panels and input.
const $ = id => document.getElementById(id);
const el = {};
for (const id of ['hud', 'objHead', 'objText', 'prompt', 'promptText', 'promptKey', 'dialog', 'who', 'dtext', 'choices', 'panel', 'panelTitle', 'panelBody', 'panelDot', 'title', 'summary', 'conf', 'confLabel', 'confVal', 'confFill', 'check', 'checkVal', 'checkFill', 'checkLabel', 'modeChip', 'sumTitle', 'sumSub', 'sumStats', 'sumLearn']) el[id] = $(id);
const VOICE = { Rubix: 520, Mira: 380, Theo: 300, Ines: 440, Observer: 760, '': 0 };
const UI = {
  dlg: null, busy: 0, touch: matchMedia('(pointer: coarse)').matches,
  playing() { return el.title.hidden && el.summary.hidden && el.panel.hidden && !UI.dlg && !UI.busy && !G.transit; },
  say(lines, done) { if (!lines || !lines.length) { if (done) done(); return; } UI.dlg = { lines, i: 0, n: 0, done }; UI.showLine(); },
  showLine() {
    const d = UI.dlg, [who, text, opt] = d.lines[d.i];
    el.who.textContent = who; el.dialog.dataset.who = who; d.full = text; d.n = 0; d.opt = opt || null; d.sel = 0; d.ready = false;
    el.dtext.textContent = ''; el.choices.hidden = true; el.choices.innerHTML = ''; el.dialog.classList.toggle('asking', !!opt); el.dialog.hidden = false; el.prompt.hidden = true;
  },
  renderChoices() {
    const d = UI.dlg; if (!d || !d.opt) return; d.ready = true; el.choices.innerHTML = '';
    d.opt.choices.forEach((c, i) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = c; if (i === d.sel) b.className = 'sel'; b.addEventListener('click', e => { e.stopPropagation(); UI.pick(i); }); el.choices.appendChild(b); });
    el.choices.hidden = false;
  },
  pick(i) { const d = UI.dlg; if (!d || !d.opt) return; const opt = d.opt; UI.dlg = null; el.dialog.hidden = true; sfx.approve(); opt.pick(i); },
  advance() {
    const d = UI.dlg; if (!d) return;
    if (d.n < d.full.length) { d.n = d.full.length; el.dtext.textContent = d.full; if (d.opt) UI.renderChoices(); return; }
    if (d.opt) { if (d.ready) UI.pick(d.sel); return; }
    d.i++; sfx.tick();
    if (d.i >= d.lines.length) { const done = d.done; UI.dlg = null; el.dialog.hidden = true; if (done) done(); } else UI.showLine();
  },
  tick(dt) {
    const d = UI.dlg;
    if (d && d.n < d.full.length) { const before = Math.floor(d.n); d.n = Math.min(d.full.length, d.n + dt * 46); const now = Math.floor(d.n); if (now !== before) { el.dtext.textContent = d.full.slice(0, now); if (now % 3 === 0 && d.full[now - 1] !== ' ') sfx.blip(VOICE[el.dialog.dataset.who]); } if (now >= d.full.length && d.opt) UI.renderChoices(); }
  },
  objective(head, text) { el.objHead.textContent = head; el.objText.textContent = text; },
  conf(v) { el.conf.hidden = v === null; if (v !== null) { el.confVal.textContent = Math.round(v * 100) + '%'; el.confFill.style.width = (v * 100) + '%'; } },
  check(label, u) { el.check.hidden = u === null; if (u !== null) { el.checkLabel.textContent = label; el.checkVal.textContent = `healthy ${Math.floor(u * 10)} of 10 min`; el.checkFill.style.width = (u * 100) + '%'; } },
  mode(m) { el.modeChip.hidden = !m; if (m) { el.modeChip.textContent = m === 'auto' ? 'Auto mode' : 'Assist mode'; el.modeChip.classList.toggle('auto', m === 'auto'); } },
  openPanel(title, html) { el.panelTitle.textContent = title; el.panelBody.innerHTML = html; el.panel.hidden = false; el.panelDot.hidden = true; $('panelClose').focus(); },
  closePanel() { el.panel.hidden = true; },
  setTouch(v) { UI.touch = v; document.body.classList.toggle('touch', v); el.promptKey.textContent = v ? 'A' : 'E'; },
};
UI.setTouch(UI.touch);
addEventListener('touchstart', () => { if (!UI.touch) UI.setTouch(true); }, { passive: true });
el.dialog.addEventListener('click', () => UI.advance());
$('panelClose').addEventListener('click', () => UI.closePanel());
el.panel.addEventListener('click', e => { if (e.target === el.panel) UI.closePanel(); });
$('panelBtn').addEventListener('click', e => { e.currentTarget.blur(); el.panel.hidden ? G.openIncidents() : UI.closePanel(); });
$('padPanel').addEventListener('click', () => el.panel.hidden ? G.openIncidents() : UI.closePanel());
$('soundBtn').textContent = A.on ? 'Sound on' : 'Sound off';
$('soundBtn').addEventListener('click', e => { e.currentTarget.blur(); audioInit(); toggleSound(); });

const keys = new Set(), padDir = new Set();
const ACT = new Set(['e', 'E', ' ', 'Enter', 'z', 'Z']);
addEventListener('keydown', e => {
  if (e.target && e.target.tagName === 'BUTTON' && (e.key === ' ' || e.key === 'Enter')) return;
  const k = e.key;
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(k)) e.preventDefault();
  if (UI.touch && k.length) UI.setTouch(false);
  const d = UI.dlg;
  if (d && d.opt && d.ready && ['ArrowLeft', 'ArrowRight', 'a', 'd', 'A', 'D', 'ArrowUp', 'ArrowDown'].includes(k)) { const n = d.opt.choices.length, step = ['ArrowLeft', 'a', 'A', 'ArrowUp'].includes(k) ? -1 : 1; d.sel = (d.sel + step + n) % n; UI.renderChoices(); return; }
  if (k === 'Escape') { if (!el.panel.hidden) UI.closePanel(); return; }
  if (k === 'j' || k === 'J') { el.panel.hidden ? G.openIncidents() : UI.closePanel(); return; }
  if (k === 'm' || k === 'M') { audioInit(); toggleSound(); return; }
  if (k === 'f' || k === 'F') { toggleImmersive(); return; }
  if (ACT.has(k)) { if (!e.repeat) action(); return; }
  keys.add(k.toLowerCase());
});
addEventListener('keyup', e => keys.delete(e.key.toLowerCase()));
addEventListener('blur', () => { keys.clear(); padDir.clear(); });
for (const b of document.querySelectorAll('.dpad button')) {
  const d = b.dataset.dir, on = e => { e.preventDefault(); padDir.add(d); b.classList.add('on'); }, off = () => { padDir.delete(d); b.classList.remove('on'); };
  b.addEventListener('pointerdown', on); b.addEventListener('pointerup', off); b.addEventListener('pointercancel', off); b.addEventListener('pointerleave', off);
}
$('padA').addEventListener('pointerdown', e => { e.preventDefault(); action(); });
function action() {
  if (!el.title.hidden || !el.summary.hidden) return;
  if (!el.panel.hidden) return UI.closePanel();
  if (UI.dlg) return UI.advance();
  if (UI.busy || G.transit) return;
  G.interact();
}
const held = d => keys.has(d) || padDir.has(d === 'arrowup' || d === 'w' ? 'up' : d === 'arrowdown' || d === 's' ? 'down' : d === 'arrowleft' || d === 'a' ? 'left' : 'right');

// Immersive mode: the browser's full screen where it can. Where it cannot (iPhone), a fixed full-window view,
// and when the game sits in the website's frame it asks the page to do the same with the frame.
const stage = $('stage'), fsPage = $('fsPage'), embedded = window.parent !== window;
const tell = msg => { if (embedded) try { window.parent.postMessage({ source: 'rubix-night-shift', ...msg }, location.origin); } catch (e) { } };
function setImmersive(on) { stage.classList.toggle('immersive', on); document.body.classList.toggle('immersive-on', on); $('fsBtn').textContent = on ? 'Exit full screen' : 'Full screen'; if (fsPage) fsPage.textContent = $('fsBtn').textContent; }
function fallback(on) { setImmersive(on); tell({ type: 'immersive', on }); }
function toggleImmersive() {
  if (document.fullscreenElement) { document.exitFullscreen(); return; }
  if (stage.classList.contains('immersive')) { fallback(false); return; }
  if (stage.requestFullscreen) stage.requestFullscreen().then(() => setImmersive(true)).catch(() => fallback(true)); else fallback(true);
}
document.addEventListener('fullscreenchange', () => setImmersive(!!document.fullscreenElement));
addEventListener('keydown', e => { if (e.key === 'Escape' && stage.classList.contains('immersive') && !document.fullscreenElement) fallback(false); });
addEventListener('message', e => { if (e.origin === location.origin && e.data && e.data.source === 'rubix-night-shift-page' && e.data.type === 'toggle-immersive') toggleImmersive(); });
$('fsBtn').addEventListener('click', e => { e.currentTarget.blur(); toggleImmersive(); });
if (fsPage) fsPage.addEventListener('click', e => { e.currentTarget.blur(); toggleImmersive(); });
