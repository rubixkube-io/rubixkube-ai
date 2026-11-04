'use strict';
// Plays one night from its data: intro, setup, incidents (alerts, triage, evidence, approval, fix, check), outro.
const SEV_RANK = { Critical: 4, High: 3, Medium: 2, Low: 1 };
const fmtTime = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
class NightRun {
  constructor(def) {
    this.def = def; this.stage = 'intro'; this.setupDone = new Set(); this.focus = null; this.score = { approvals: 0, triage: null };
    this.incs = def.incidents.map(d => ({ d, st: 'wait', seen: new Set(), alerts: [], conf: d.conf0 !== undefined ? d.conf0 : 0.2, ideas: {}, fix: { ...d.fix }, t: {}, followDone: new Set() }));
    this.mode = def.mode || 'assist';
  }
  get who() { return this.def.oncall.name; }
  inc(id) { return this.incs.find(i => i.d.id === id); }
  active() { return this.incs.filter(i => ['inv', 'needs', 'appr', 'check'].includes(i.st)); }
  pickFocus() { if (this.focus && this.focus.st !== 'closed' && this.focus.st !== 'wait') return this.focus; this.focus = this.active()[0] || null; return this.focus; }
  start() { UI.mode(this.mode); }
  kick(after) {
    for (const i of this.incs) { if (i.st !== 'wait') continue; const a = i.d.start && i.d.start.after || 'start'; if (a !== after) continue; i.st = 'queued'; G.later(i.d.start && i.d.start.delay || 1.5, () => this.open(i)); }
  }
  open(i) {
    i.st = 'sent'; i.t.open = T; const o = i.d.open || {}; if (o.vars) G.setVars(o.vars); if (o.lines) G.say(o.lines);
    const sigs = o.signals || []; let n = 0;
    sigs.forEach(s => G.later(s.at || 0, () => { if (s.bell) { sfx.bell(); G.setVars({ bell: T }); } G.signal(s.from, s.kind || 'dot', () => { i.alerts.push(s.alert); n++; sfx.ping(); el.panelDot.hidden = false; if (n === sigs.length) i.st = 'new'; }); }));
    if (!sigs.length) i.st = 'new';
  }
  ready(ev, i) { return !ev.after || i.seen.has(ev.after); }
  nextEvidence(i) { return i.d.evidence.find(e => !i.seen.has(e.id) && this.ready(e, i)); }
  // what the HUD says
  objective() {
    const d = this.def;
    if (this.stage === 'intro') return ['Now', d.intro.objective || `Say hello to ${this.who}.`];
    if (this.stage === 'setup') return ['Now', `${d.setup.objective} (${this.setupDone.size} of ${d.setup.steps.length})`];
    if (this.stage === 'outro') return ['Now', d.outro.objective];
    if (this.stage === 'done') return ['Now', 'The night is done.'];
    const fresh = this.incs.filter(i => i.st === 'new'), f = this.pickFocus();
    if (!f) { if (fresh.length) return ['Now', fresh.length > 1 ? `${fresh.length} new incidents are on the board. Read them.` : 'New on the board. Read it.']; if (this.incs.some(i => i.st === 'sent')) return ['Now', 'An alert is on its way to the board.']; return ['Now', d.quiet || 'The board is quiet, for now.']; }
    const extra = fresh.length ? ' Something new is on the board too.' : '';
    const fx = f.fix;
    const txt = f.st === 'inv' ? `Investigate ${f.d.id}: ${f.d.where} (${f.seen.size} of ${f.d.evidence.length}).`
      : f.st === 'needs' ? `Ask ${this.who} to approve the Fix for ${f.d.id}.`
      : f.st === 'appr' ? `${this.mode === 'auto' && !fx.destructive ? 'Apply' : 'Approved. Apply'} the Fix at ${fx.where}.`
      : 'The observer is checking that the fix holds.';
    return [f.d.id, txt + extra];
  }
  conf() { const f = this.pickFocus(); return f && (f.st === 'inv' || f.st === 'needs') ? f.conf : null; }
  markFor(id) {
    const d = this.def;
    if (this.stage === 'intro') return id === 'oncall' ? '!' : null;
    if (this.stage === 'setup') return d.setup.steps.some(s => s.spot === id && !this.setupDone.has(s.spot)) ? '?' : null;
    if (this.stage === 'outro') return id === d.outro.spot ? '!' : null;
    if (this.stage !== 'run') return null;
    if (id === (d.board || 'board') && this.incs.some(i => i.st === 'new')) return '?';
    for (const i of this.incs) {
      if (i.st === 'inv' && i.d.evidence.some(e => e.spot === id && !i.seen.has(e.id) && this.ready(e, i))) return '?';
      if (i.st === 'needs' && id === 'oncall') return '!';
      if (i.st === 'appr' && id === i.fix.spot) return '?';
    }
    return null;
  }
  labelFor(id) {
    const d = this.def;
    if (this.stage === 'setup') { const s = d.setup.steps.find(s => s.spot === id && !this.setupDone.has(s.spot)); if (s) return s.label; }
    if (this.stage === 'run') {
      if (id === (d.board || 'board') && this.incs.some(i => i.st === 'new')) return 'Read the board';
      for (const i of this.incs) { if (i.st === 'inv') { const e = i.d.evidence.find(e => e.spot === id && !i.seen.has(e.id) && this.ready(e, i)); if (e) return e.label; } if (i.st === 'appr' && id === i.fix.spot) return i.fix.label || 'Apply the Fix'; }
    }
    if (id === 'oncall') return `Talk to ${this.who}`;
    return null;
  }
  // pressing E at a spot
  interact(id) {
    const d = this.def;
    if (this.stage === 'intro' && id === 'oncall') { G.say(d.intro.lines, () => { if (d.setup) this.stage = 'setup'; else { this.stage = 'run'; this.kick('start'); } }); return true; }
    if (this.stage === 'setup') { const s = d.setup.steps.find(s => s.spot === id && !this.setupDone.has(s.spot)); if (s) { G.say(s.lines, () => { this.setupDone.add(s.spot); if (s.vars) G.setVars(s.vars); sfx.chime(); if (this.setupDone.size === d.setup.steps.length) G.say(d.setup.done, () => { this.stage = 'run'; this.kick('start'); }); }); return true; } }
    if (this.stage === 'outro' && id === d.outro.spot) { G.say(d.outro.lines, () => { this.stage = 'done'; if (d.outro.sit) { R.x = d.outro.sit[0]; R.y = d.outro.sit[1]; R.sit = true; R.mug = true; R.dir = 'down'; } sfx.chime(); G.later(2.2, () => G.finishNight()); }); return true; }
    if (this.stage !== 'run') return false;
    if (id === (d.board || 'board')) { const fresh = this.incs.filter(i => i.st === 'new'); if (fresh.length) { this.read(fresh); return true; } return false; }
    const order = [this.focus, ...this.incs].filter(Boolean);
    for (const i of order) { if (i.st !== 'inv') continue; const e = i.d.evidence.find(e => e.spot === id && !i.seen.has(e.id) && this.ready(e, i)); if (e) { this.look(i, e); return true; } }
    for (const i of order) if (i.st === 'appr' && id === i.fix.spot) { this.apply(i); return true; }
    if (id === 'oncall') {
      const need = order.find(i => i.st === 'needs'); if (need) { this.ask(need); return true; }
      const inv = order.find(i => i.st === 'inv'); if (inv) { const nx = this.nextEvidence(inv); G.say([[this.who, `${inv.d.id}: what do you have so far?`], ['Rubix', nx ? `I am ${Math.round(inv.conf * 100)}% sure. I still want to look at ${nx.where}.` : 'Almost there.']]); return true; }
      const ap = order.find(i => i.st === 'appr'); if (ap) { G.say([[this.who, ap.fix.destructive || this.mode !== 'auto' ? 'It is approved. Go ahead.' : 'Auto mode. You do not need me for that one.']]); return true; }
      const ck = order.find(i => i.st === 'check'); if (ck) { G.say([[this.who, 'Let the observer finish its check before we call it fixed.']]); return true; }
    }
    return false;
  }
  read(fresh) {
    const begin = (i, extra) => { i.st = 'inv'; i.t.read = T; if (!this.focus || this.focus.st === 'closed') this.focus = i; for (const l of (i.d.open && i.d.open.late) || []) G.later(l.at, () => G.signal(l.from, l.kind || 'dot', () => { i.alerts.push(l.alert); sfx.ping(); G.say(l.lines); })); };
    if (fresh.length === 1) { const i = fresh[0]; G.say(i.d.read, () => { begin(i); if (i.d.group) sfx.chime(); }); return; }
    const lines = fresh.map(i => ['', `${i.d.id}  ${i.d.title}\nSeverity: ${i.d.sev}    Source: ${i.d.source.split(',')[0]}`]);
    const top = Math.max(...fresh.map(i => SEV_RANK[i.d.sev] || 0));
    lines.push(['Rubix', 'Two incidents at once. Triage decides which one I look at first.', { choices: fresh.map(i => `${i.d.id}, ${i.d.sev}`), pick: k => {
      const ch = fresh[k], right = (SEV_RANK[ch.d.sev] || 0) === top; this.score.triage = right ? 'right' : 'wrong';
      fresh.forEach(i => begin(i)); this.focus = ch;
      G.say([...ch.d.read, ...((right ? this.def.triageRight : this.def.triageWrong) || [])]);
    } }]);
    G.say(lines);
  }
  look(i, e) {
    G.say(e.lines, () => {
      i.seen.add(e.id); Object.assign(i.ideas, e.ideas || {}); i.conf = Math.min(0.95, i.conf + (e.conf || 0.2)); if (e.vars) G.setVars(e.vars);
      if (i.seen.size === i.d.evidence.length) { i.t.root = T; i.conf = 0.95; G.say(i.d.conclude, () => { if (this.mode === 'auto' && !i.fix.destructive) { i.st = 'appr'; G.say([['Rubix', 'Auto mode: this Fix changes nothing that cannot be undone, so I can apply it myself. It goes in the audit log.']]); } else i.st = 'needs'; }); }
    });
  }
  ask(i) {
    const fx = i.fix, who = this.who;
    const yes = () => { this.score.approvals++; if (fx.counter) { const c = fx.counter; G.say(c.lines, () => { i.fix = { ...c.fix }; i.st = 'appr'; i.countered = c; }); } else G.say([[who, fx.yes || 'Approved. Go ahead.']], () => { i.st = 'appr'; }); };
    G.say([...(fx.ask || []), ['', fx.request, { choices: ['Approve', 'Not now'], pick: k => k === 0 ? yes() : G.say([[who, fx.notNow || 'Give me a minute to read the RCA first.']]) }]]);
  }
  apply(i) {
    const fx = i.fix;
    G.say(fx.apply, () => { UI.busy++; if (fx.vars) G.setVars(fx.vars); sfx.push(); G.later(fx.secs || 2.6, () => { UI.busy--; i.st = 'check'; const c = i.d.check; G.check(c.label, c.secs || 9, () => this.close(i)); }); });
  }
  close(i) {
    i.st = 'closed'; i.t.close = T; sfx.chime(); R.happy = 1.2;
    if (i.d.completes) for (const o of this.incs) o.followDone.add(i.d.completes);
    if (i.d.onClose) G.setVars(i.d.onClose);
    G.learn(this.def, i.d);
    G.say([...i.d.check.lines, ...(i.d.after || [])], () => {
      if (this.focus === i) this.focus = null; this.pickFocus();
      this.kick(i.d.id);
      if (this.incs.every(x => x.st === 'closed')) { this.stage = 'outro'; const o = this.def.outro; if (o.move) G.moveOncall(o.move); G.say(o.start || []); }
    });
  }
  summary() {
    const incs = this.incs, alerts = incs.reduce((a, i) => a + i.alerts.length, 0), tu = incs.filter(i => i.t.root && i.t.read).map(i => i.t.root - i.t.read);
    return { incidents: incs.length, alerts, grouped: incs.filter(i => i.alerts.length > 1).length, ttu: tu.length ? tu.reduce((a, b) => a + b, 0) / tu.length : 0, approvals: this.score.approvals, triage: this.score.triage };
  }
  panelHTML() {
    const chip = (cls, t) => `<span class="chip ${cls}">${t}</span>`;
    const row = (k, v) => `<dt>${k}</dt><dd class="${v ? '' : 'tbd'}">${v || 'Not found yet.'}</dd>`;
    const sevC = s => s === 'Critical' || s === 'High' ? 'high' : 'med';
    const status = i => i.st === 'closed' ? chip('closed', 'Closed') : i.st === 'check' ? chip('check', 'Checking') : i.st === 'appr' ? chip('check', 'Fixing') : i.st === 'needs' ? chip('needs', 'Needs you') : i.st === 'inv' ? chip('open', 'Investigating') : chip('open', 'New');
    const out = [];
    for (const i of this.incs) {
      if (!i.alerts.length && !['new', 'inv', 'needs', 'appr', 'check', 'closed'].includes(i.st)) continue;
      const d = i.d, root = !!i.t.root, fx = i.fix;
      const fixSt = i.st === 'closed' || i.st === 'check' ? 'Done' : i.st === 'appr' ? 'Approved' : root ? 'Proposed' : '';
      const ideas = d.ideas.map(x => { const s = i.ideas[x.id]; return `<li class="${s || 'open'}"><span>${x.text}</span></li>`; }).join('');
      const ev = d.evidence.filter(e => i.seen.has(e.id)).map(e => `<li>${e.note}</li>`).join('');
      const tasks = root ? `<ul class="tasks"><li><b>Fix</b><span>${fx.title} <code>${fx.code}</code></span>${chip(fixSt === 'Done' ? 'closed' : fixSt === 'Approved' ? 'check' : 'open', fixSt)}</li>${(d.followups || []).map(f => { const done = this.incs.some(o => o.followDone.has(f.code)); return `<li><b>Follow-up</b><span>${f.title} <code>${f.code}</code></span>${chip(done ? 'closed' : 'open', done ? 'Done' : 'Open')}</li>`; }).join('')}</ul>` : '<span class="tbd">After the root cause.</span>';
      out.push(`<article class="entry"><header><span class="code">${d.id}</span><h3>${d.title}</h3>${chip(sevC(d.sev), d.sev)}${status(i)}</header><dl>
        ${row('Source', d.source)}
        <dt>Alerts</dt><dd><ul class="ev">${i.alerts.map(a => `<li>${a}</li>`).join('')}${d.group && i.st !== 'new' && i.st !== 'sent' ? `<li>Grouped: ${i.alerts.length} alerts, one incident, one RCA.</li>` : ''}</ul></dd>
        <dt>Ideas</dt><dd><ul class="ideas">${ideas}</ul></dd>
        <dt>Evidence</dt><dd>${ev ? `<ul class="ev">${ev}</ul>` : '<span class="tbd">None yet.</span>'}</dd>
        <dt>Confidence</dt><dd><div class="conf"><div class="bar"><div class="fill" style="width:${Math.round(i.conf * 100)}%"></div></div><span>${Math.round(i.conf * 100)}%</span></div></dd>
        ${row('Root cause', root ? d.cause : '')}
        ${i.countered ? row('Changed by', `${this.who}: ${i.countered.note}`) : ''}
        <dt>Tasks</dt><dd>${tasks}</dd>
      </dl></article>`);
    }
    return out.length ? out.reverse().join('') : `<p class="empty">No incidents yet. ${this.def.quietPanel || 'The observers are watching.'}</p>`;
  }
}
