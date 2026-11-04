'use strict';
// Music and sound, all made in code. Nothing to license.
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }, del(k) { try { localStorage.removeItem(k); } catch (e) { } } };
const A = { ctx: null, on: store.get('rns-sound') !== 'off' };
function audioInit() {
  if (A.ctx) { if (A.ctx.state === 'suspended') A.ctx.resume(); return; }
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)(); A.ctx = ac;
    A.master = ac.createGain(); A.master.gain.value = A.on ? 0.75 : 0; A.master.connect(ac.destination);
    A.echo = ac.createDelay(1); A.echo.delayTime.value = 0.42; const fbk = ac.createGain(); fbk.gain.value = 0.36; const elp = ac.createBiquadFilter(); elp.type = 'lowpass'; elp.frequency.value = 1700; A.echo.connect(elp); elp.connect(fbk); fbk.connect(A.echo); const wet = ac.createGain(); wet.gain.value = 0.55; elp.connect(wet); wet.connect(A.master);
    A.music = ac.createGain(); A.music.gain.value = 0.42; A.music.connect(A.master); A.music.connect(A.echo);
    A.fx = ac.createGain(); A.fx.gain.value = 0.55; A.fx.connect(A.master); const fxs = ac.createGain(); fxs.gain.value = 0.3; A.fx.connect(fxs); fxs.connect(A.echo);
    const len = ac.sampleRate * 2, nb = ac.createBuffer(1, len, ac.sampleRate), ch = nb.getChannelData(0); let b = 0; for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; b = 0.985 * b + 0.015 * w; ch[i] = w * 0.25 + b * 3; } A.noise = nb;
    const bed = (freq, q, type) => { const s = ac.createBufferSource(); s.buffer = nb; s.loop = true; const f = ac.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q; const g = ac.createGain(); g.gain.value = 0; s.connect(f); f.connect(g); g.connect(A.master); s.start(); return g; };
    A.streamG = bed(900, 0.6, 'bandpass'); A.fireG = bed(380, 0.5, 'lowpass'); A.seaG = bed(420, 0.4, 'lowpass'); A.rainG = bed(3200, 0.3, 'highpass'); A.windG = bed(600, 2, 'bandpass');
    A.next = ac.currentTime + 0.2; A.beat = 0; A.mi = 3;
  } catch (e) { A.ctx = null; }
}
function toggleSound() { A.on = !A.on; store.set('rns-sound', A.on ? 'on' : 'off'); document.getElementById('soundBtn').textContent = A.on ? 'Sound on' : 'Sound off'; if (A.ctx) A.master.gain.setTargetAtTime(A.on ? 0.75 : 0, A.ctx.currentTime, 0.05); }
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
function tone(freq, t, dur, { type = 'sine', gain = 0.1, attack = 0.01, dest, cutoff = 2400 } = {}) {
  const ac = A.ctx; if (!ac) return; const o = ac.createOscillator(), g = ac.createGain(), f = ac.createBiquadFilter(); o.type = type; o.frequency.value = freq; f.type = 'lowpass'; f.frequency.value = cutoff;
  g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(gain, t + attack); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(f); f.connect(g); g.connect(dest || A.fx); o.start(t); o.stop(t + dur + 0.05);
}
function noiseHit(t, dur, freq, gain, type = 'highpass') { const ac = A.ctx; if (!ac) return; const s = ac.createBufferSource(); s.buffer = A.noise; const f = ac.createBiquadFilter(); f.type = type; f.frequency.value = freq; const g = ac.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); s.connect(f); f.connect(g); g.connect(A.fx); s.start(t, Math.random() * 1.5); s.stop(t + dur + 0.02); }
const sfx = {
  blip(f) { if (!A.ctx || !f) return; tone(f * (0.96 + Math.random() * 0.08), A.ctx.currentTime, 0.06, { type: 'square', gain: 0.025, cutoff: 1600 }); },
  tick() { if (A.ctx) tone(880, A.ctx.currentTime, 0.05, { type: 'triangle', gain: 0.03 }); },
  chime() { if (!A.ctx) return; const t = A.ctx.currentTime; [72, 76, 79, 84, 88].forEach((m, i) => tone(mtof(m), t + i * 0.09, 1.4, { type: 'triangle', gain: 0.07 })); },
  approve() { if (!A.ctx) return; const t = A.ctx.currentTime; [76, 83].forEach((m, i) => tone(mtof(m), t + i * 0.1, 0.8, { type: 'triangle', gain: 0.07 })); },
  ping() { if (!A.ctx) return; const t = A.ctx.currentTime; tone(mtof(81), t, 0.5, { type: 'sine', gain: 0.08 }); tone(mtof(76), t + 0.12, 0.7, { type: 'sine', gain: 0.07 }); },
  bell() { if (!A.ctx) return; const t = A.ctx.currentTime; for (let i = 0; i < 3; i++) { tone(660, t + i * 0.5, 2.2, { type: 'sine', gain: 0.07 }); tone(1655, t + i * 0.5, 1.2, { type: 'sine', gain: 0.025 }); } },
  flap() { if (!A.ctx) return; const t = A.ctx.currentTime; for (let i = 0; i < 4; i++) noiseHit(t + i * 0.09, 0.05, 1200, 0.05); },
  push() { if (!A.ctx) return; const t = A.ctx.currentTime; noiseHit(t, 0.35, 300, 0.2, 'lowpass'); [64, 67, 71].forEach((m, i) => tone(mtof(m), t + 0.2 + i * 0.12, 0.5, { type: 'triangle', gain: 0.05 })); },
  door() { if (!A.ctx) return; const t = A.ctx.currentTime; noiseHit(t, 0.25, 500, 0.15, 'lowpass'); tone(196, t, 0.3, { type: 'triangle', gain: 0.05 }); },
  done() { if (!A.ctx) return; const t = A.ctx.currentTime; [60, 64, 67, 72, 76, 79, 84].forEach((m, i) => tone(mtof(m), t + i * 0.11, 2, { type: 'triangle', gain: 0.06 })); },
};
const CHORDS = [[53, 57, 60, 64], [50, 53, 57, 60], [46, 50, 53, 57], [48, 52, 55, 58]];
const MEL = [65, 67, 69, 72, 74, 77, 79, 81, 84];
function audioTick(dt) {
  const ac = A.ctx; if (!ac || ac.state !== 'running') return;
  const S = G.scene, spb = 60 / (S.rain ? 58 : 62);
  while (A.next < ac.currentTime + 0.4) {
    const b = A.beat, bar = Math.floor(b / 8) % 4, t = A.next;
    if (b % 8 === 0) { for (const m of CHORDS[bar]) { tone(mtof(m), t, spb * 4.6, { type: 'sine', gain: 0.028, attack: 1.1, dest: A.music, cutoff: 900 }); tone(mtof(m) * 1.003, t, spb * 4.6, { type: 'triangle', gain: 0.012, attack: 1.3, dest: A.music, cutoff: 800 }); } tone(mtof(CHORDS[bar][0] - 12), t, spb * 3.8, { type: 'sine', gain: 0.05, attack: 0.3, dest: A.music, cutoff: 400 }); }
    if (Math.random() < (b % 2 === 0 ? 0.42 : 0.16)) { A.mi = clamp(A.mi + Math.round((Math.random() - 0.5) * 4), 0, MEL.length - 1); tone(mtof(MEL[A.mi]), t, 1.6, { type: 'triangle', gain: 0.045, attack: 0.008, dest: A.music, cutoff: 2600 }); }
    A.next += spb / 2; A.beat++;
  }
  const near = S.streamLine ? clamp(1 - S.sd[clamp(R.y | 0, 0, S.H - 1) * S.W + clamp(R.x | 0, 0, S.W - 1)] / 80) : 0;
  A.streamG.gain.setTargetAtTime(near * 0.09, ac.currentTime, 0.3);
  const fd = S.fire ? clamp(1 - Math.hypot(R.x - S.fire.x, R.y - S.fire.y) / 130) : 0;
  A.fireG.gain.setTargetAtTime(fd * 0.16, ac.currentTime, 0.3);
  if (fd > 0 && Math.random() < dt * 8) noiseHit(ac.currentTime, 0.02 + Math.random() * 0.03, 2500, 0.12 * fd);
  A.seaG.gain.setTargetAtTime(S.sea ? 0.12 + 0.05 * Math.sin(T * 0.6) : 0, ac.currentTime, 0.5);
  A.rainG.gain.setTargetAtTime(S.rain ? 0.05 : 0, ac.currentTime, 0.5);
  A.windG.gain.setTargetAtTime(S.wind ? 0.05 + 0.03 * Math.sin(T * 0.4) : 0, ac.currentTime, 0.5);
  if (G.phase > 0.6 && !S.rain && !S.indoor && !S.sky && Math.random() < dt * 1.3) { const t = ac.currentTime, f = 4200 + Math.random() * 500; for (let i = 0; i < 3; i++) tone(f, t + i * 0.055, 0.03, { type: 'sine', gain: 0.008 * clamp(G.phase - 0.4), attack: 0.004 }); }
}
