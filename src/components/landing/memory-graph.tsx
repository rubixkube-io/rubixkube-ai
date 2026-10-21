'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/**
 * "The more it sees, the more it knows", drawn like object tracking on an abstract field: loose
 * particles drift as noise, and shapes in them (the services of a system) move slowly around.
 * A tracker picks each one out, follows it with corner brackets, names it, and grows more sure
 * the longer it watches; related services it has locked onto are linked. Each tracker runs on
 * its own cycle length and the shapes wander on unrelated paths, so the field keeps changing and
 * never settles into a start or an end. The one being acquired is blue. Reduced motion shows every service
 * tracked, still.
 */

/** The things in the field, where they wander (0..1 square), and how big their cloud is */
const OBJECTS = [
  { name: 'checkout', x: 0.27, y: 0.24, r: 0.06 },
  { name: 'payments-api', x: 0.7, y: 0.2, r: 0.055 },
  { name: 'orders-api', x: 0.5, y: 0.47, r: 0.07 },
  { name: 'orders-db', x: 0.76, y: 0.52, r: 0.05 },
  { name: 'auth', x: 0.2, y: 0.58, r: 0.05 },
  { name: 'kafka', x: 0.42, y: 0.78, r: 0.06 },
  { name: 'redis', x: 0.7, y: 0.82, r: 0.045 },
  { name: 'inventory', x: 0.24, y: 0.86, r: 0.045 },
] as const

/** Who talks to whom: a link is drawn when both ends are tracked */
const LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [2, 3],
  [0, 4],
  [2, 5],
  [3, 6],
  [5, 7],
  [4, 6],
]

/** Names a tracker can give what it finds; each time it re-acquires, it may be something new */
const NAMES = [
  'checkout', 'payments-api', 'orders-api', 'orders-db', 'auth', 'kafka', 'redis', 'inventory',
  'ledger', 'shipping', 'sessions', 'ingress', 'search', 'pricing', 'notify', 'fraud', 'cart',
  'billing', 'gateway', 'users', 'queue', 'k8s-nodes', 'cdn', 'reports',
]

const NOISE = 900
const PER_OBJECT = 170
/** One tracker's cycle: search, acquire, lock, hold, lose */
const CYCLE_S = 16

const ease = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t))

function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

/**
 * Where an object is at time t: two slow waves with unrelated speeds per axis, so the paths
 * never line up into a repeating pattern
 */
function at(i: number, t: number) {
  const o = OBJECTS[i]
  const x = o.x + Math.sin(t * (0.071 + i * 0.0137) + i * 1.7) * 0.07 + Math.sin(t * (0.031 + i * 0.0071) + i) * 0.05
  const y = o.y + Math.cos(t * (0.059 + i * 0.0113) + i * 2.3) * 0.06 + Math.cos(t * (0.027 + i * 0.0093) + i * 0.4) * 0.04
  return { x: Math.min(0.9, Math.max(0.1, x)), y: Math.min(0.9, Math.max(0.1, y)) }
}

/** Each tracker has its own cycle length, so the set of states never comes round the same way twice */
const period = (i: number) => CYCLE_S * (0.73 + ((i * 0.618) % 0.6))
const phase = (i: number, t: number) => t / period(i) + i * 0.37

/** What a tracker calls the thing it is following this time round */
const nameOf = (i: number, t: number) => NAMES[(Math.floor(phase(i, t)) * 7 + i * 5) % NAMES.length]

/** A tracker's state at time t: how locked on it is (0..1), and whether it is still acquiring */
function track(i: number, t: number) {
  const u = phase(i, t) % 1
  if (u < 0.08) return { lock: 0, acquiring: false, seen: 0 } // searching
  if (u < 0.22) return { lock: ease((u - 0.08) / 0.14), acquiring: true, seen: 0 }
  if (u < 0.88) return { lock: 1, acquiring: false, seen: (u - 0.22) / 0.66 }
  return { lock: 1 - ease((u - 0.88) / 0.12), acquiring: false, seen: 1 } // lost
}

export function MemoryGraph({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const still = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const r = rng(11)
    // particles: drifting noise, and clouds that belong to an object
    const noise = Array.from({ length: NOISE }, () => ({ x: r(), y: r(), p: r() * 6.28, s: r() < 0.08 ? 1.6 : 1 }))
    const clouds = OBJECTS.flatMap((o, i) =>
      Array.from({ length: PER_OBJECT }, () => {
        const a = r() * 6.28
        const d = Math.sqrt(-2 * Math.log(r() + 1e-6)) * 0.42 * o.r
        return { i, dx: Math.cos(a) * d, dy: Math.sin(a) * d, p: r() * 6.28, s: r() < 0.1 ? 1.8 : 1 }
      }),
    )
    // the tracker boxes follow with a little lag, the way a real tracker does
    const boxes = OBJECTS.map((o) => ({ x: o.x, y: o.y }))

    let w = 0
    let h = 0
    let ink = '#111318'
    let blue = '#2f5bff'
    let mid = '#5e616b'
    let bg = '#f2f0eb'
    let font = 'monospace'
    const colors = () => {
      const st = getComputedStyle(canvas)
      ink = st.getPropertyValue('--ink').trim() || ink
      blue = st.getPropertyValue('--blue').trim() || blue
      mid = st.getPropertyValue('--mid').trim() || mid
      bg = st.getPropertyValue('--bg').trim() || bg
      font = st.getPropertyValue('--font-mono').trim() || font
    }
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const brackets = (x: number, y: number, bw: number, bh: number, len: number) => {
      ctx.beginPath()
      for (const [cx, cy, sx, sy] of [
        [x, y, 1, 1],
        [x + bw, y, -1, 1],
        [x, y + bh, 1, -1],
        [x + bw, y + bh, -1, -1],
      ]) {
        ctx.moveTo(cx + sx * len, cy)
        ctx.lineTo(cx, cy)
        ctx.lineTo(cx, cy + sy * len)
      }
      ctx.stroke()
    }

    const draw = (time: number) => {
      const t = still ? 40 : time / 1000
      const size = Math.min(w, h)
      const ox = (w - size) / 2
      const px = (v: number) => ox + v * size
      const py = (v: number) => v * size
      ctx.clearRect(0, 0, w, h)

      // the field
      ctx.fillStyle = ink
      for (const n of noise) {
        ctx.globalAlpha = 0.14
        const x = (n.x + Math.sin(t * 0.07 + n.p) * 0.02 + 1) % 1
        const y = (n.y + Math.cos(t * 0.06 + n.p) * 0.02 + 1) % 1
        ctx.fillRect(px(x), py(y), n.s, n.s)
      }
      const states = OBJECTS.map((_, i) => (still ? { lock: 1, acquiring: false, seen: 1 } : track(i, t)))
      const centers = OBJECTS.map((_, i) => at(i, t))
      for (const c of clouds) {
        const s = states[c.i]
        const o = centers[c.i]
        // a shape only stands out from the noise while it is there to be tracked
        const u = still ? 0.5 : phase(c.i, t) % 1
        const presence = u < 0.04 ? ease(u / 0.04) : u > 0.95 ? 1 - ease((u - 0.95) / 0.05) : 1
        const jitter = 0.004 * (1 - s.lock * 0.6) + (1 - presence) * 0.05
        ctx.globalAlpha = (0.12 + s.lock * 0.5) * (0.3 + 0.7 * presence)
        ctx.fillStyle = s.acquiring ? blue : ink
        ctx.fillRect(
          px(o.x + c.dx + Math.sin(t * 1.3 + c.p) * jitter),
          py(o.y + c.dy + Math.cos(t * 1.1 + c.p) * jitter),
          c.s,
          c.s,
        )
      }

      // links between services it is tracking
      ctx.lineWidth = 1
      for (const [a, b] of LINKS) {
        const k = Math.min(states[a].lock, states[b].lock)
        if (k <= 0.01) continue
        ctx.globalAlpha = 0.22 * k
        ctx.strokeStyle = ink
        ctx.setLineDash([2, 4])
        ctx.beginPath()
        ctx.moveTo(px(boxes[a].x), py(boxes[a].y))
        ctx.lineTo(px(boxes[b].x), py(boxes[b].y))
        ctx.stroke()
      }
      ctx.setLineDash([])

      // the trackers
      ctx.font = `10px ${font}`
      ctx.textBaseline = 'middle'
      OBJECTS.forEach((o, i) => {
        const s = states[i]
        const c = centers[i]
        const b = boxes[i]
        // follow with lag; jump while not tracking so it re-acquires from where the object is
        const lag = s.lock > 0 ? 0.08 : 1
        b.x += (c.x - b.x) * (still ? 1 : lag)
        b.y += (c.y - b.y) * (still ? 1 : lag)
        if (s.lock <= 0.01) return
        // while acquiring the box closes in from wide and flickers; once locked it is tight
        const spread = (1 - s.lock) * 0.06
        const half = o.r * 1.15 + spread
        const x = px(b.x - half)
        const y = py(b.y - half)
        const side = half * 2 * size
        const color = s.acquiring ? blue : ink
        ctx.strokeStyle = color
        ctx.globalAlpha = s.acquiring ? 0.5 + 0.5 * Math.abs(Math.sin(t * 18)) : 0.75 * s.lock
        ctx.lineWidth = 1.25
        brackets(x, y, side, side, Math.max(6, side * 0.18))
        // a small crosshair at the centre while it is still finding the object
        if (s.acquiring) {
          const cx = px(b.x)
          const cy = py(b.y)
          ctx.beginPath()
          ctx.moveTo(cx - 5, cy)
          ctx.lineTo(cx + 5, cy)
          ctx.moveTo(cx, cy - 5)
          ctx.lineTo(cx, cy + 5)
          ctx.stroke()
        }
        // the tag: its name and how sure it is, which grows the longer it watches
        const conf = s.acquiring ? 0.3 + 0.4 * s.lock : 0.7 + 0.29 * ease(s.seen)
        const label = s.acquiring ? 'scanning' : `${still ? o.name : nameOf(i, t)}  ${conf.toFixed(2)}`
        const tw = ctx.measureText(label).width
        ctx.globalAlpha = s.lock
        ctx.fillStyle = s.acquiring ? blue : ink
        ctx.fillRect(x, y - 15, tw + 8, 13)
        ctx.fillStyle = bg
        ctx.fillText(label, x + 4, y - 8.5)
      })
      ctx.globalAlpha = 1
    }

    colors()
    fit()
    let raf = 0
    const loop = (tm: number) => {
      if (!document.hidden) draw(tm)
      raf = requestAnimationFrame(loop)
    }
    if (still) draw(0)
    else raf = requestAnimationFrame(loop)
    const resize = new ResizeObserver(() => {
      fit()
      if (still) draw(0)
    })
    resize.observe(canvas)
    const theme = new MutationObserver(() => {
      colors()
      if (still) draw(0)
    })
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => {
      cancelAnimationFrame(raf)
      resize.disconnect()
      theme.disconnect()
    }
  }, [still])

  return (
    <canvas
      ref={ref}
      className={className}
      role="img"
      aria-label="A tracker picks out the services in a field of signals, names them and links them, growing more sure over time"
    />
  )
}
