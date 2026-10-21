/**
 * A cover for an entry that has no image: a small abstract drawing in ink on paper, with one
 * accent in blue. The drawing comes from the entry's slug, so an entry always gets the same one
 * and neighbours rarely match. It follows the theme through the colour tokens.
 */

const W = 400
const H = 300

function rng(seed: string) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return ((h ^= h >>> 16) >>> 0) / 4294967296
  }
}

const ink = 'var(--ink)'
const blue = 'var(--blue)'

/** A field of dots that thickens into a blue cluster, like a signal standing out of noise */
function Field(r: () => number) {
  const cx = 90 + r() * 220
  const cy = 70 + r() * 160
  const dots = []
  for (let y = 12; y < H; y += 14)
    for (let x = 12; x < W; x += 14) {
      const d = Math.hypot(x - cx, y - cy)
      const near = d < 70
      dots.push(
        <circle key={`${x}-${y}`} cx={x} cy={y} r={near ? 2.6 - d / 45 : 1.1} fill={near ? blue : ink} opacity={near ? 0.9 : 0.22} />,
      )
    }
  return dots
}

/** Rings spreading out from one point */
function Rings(r: () => number) {
  const cx = 80 + r() * 240
  const cy = 60 + r() * 180
  return Array.from({ length: 9 }, (_, i) => (
    <circle
      key={i}
      cx={cx}
      cy={cy}
      r={18 + i * 26}
      fill="none"
      stroke={i === 2 ? blue : ink}
      strokeWidth={i === 2 ? 3 : 1}
      opacity={i === 2 ? 0.95 : 0.35 - i * 0.025}
    />
  ))
}

/** A bar chart with one bar that matters */
function Bars(r: () => number) {
  const n = 11
  const hot = Math.floor(r() * n)
  return Array.from({ length: n }, (_, i) => {
    const h = 40 + r() * 170
    return <rect key={i} x={30 + i * 32} y={H - 30 - h} width={18} height={h} fill={i === hot ? blue : ink} opacity={i === hot ? 0.95 : 0.3} />
  })
}

/** A grid of squares with a few picked out */
function Tiles(r: () => number) {
  const out = []
  for (let y = 0; y < 6; y++)
    for (let x = 0; x < 8; x++) {
      const v = r()
      out.push(
        <rect
          key={`${x}-${y}`}
          x={22 + x * 46}
          y={18 + y * 46}
          width={36}
          height={36}
          fill={v > 0.93 ? blue : ink}
          opacity={v > 0.93 ? 0.95 : v > 0.7 ? 0.32 : 0.08}
        />,
      )
    }
  return out
}

/** Lines that run quiet, then one breaks out */
function Waves(r: () => number) {
  const hot = 3 + Math.floor(r() * 4)
  return Array.from({ length: 11 }, (_, i) => {
    const y0 = 30 + i * 24
    const amp = i === hot ? 22 : 2 + r() * 3
    const pts = Array.from({ length: 41 }, (_, k) => {
      const x = k * 10
      const bump = i === hot ? Math.exp(-((x - 200) ** 2) / 2600) : 1
      return `${x},${(y0 + Math.sin(k * 0.9 + i) * amp * bump).toFixed(1)}`
    }).join(' ')
    return (
      <polyline key={i} points={pts} fill="none" stroke={i === hot ? blue : ink} strokeWidth={i === hot ? 2.5 : 1} opacity={i === hot ? 0.95 : 0.35} />
    )
  })
}

/** Corner brackets locked on to one shape in a scatter of others */
function Tracked(r: () => number) {
  const shapes = Array.from({ length: 26 }, (_, i) => {
    const x = 20 + r() * 360
    const y = 20 + r() * 260
    return <rect key={i} x={x} y={y} width={6} height={6} fill={ink} opacity={0.3} />
  })
  const x = 110 + r() * 160
  const y = 80 + r() * 120
  const s = 64
  const c = 16
  const b = `M${x},${y + c} V${y} H${x + c} M${x + s - c},${y} H${x + s} V${y + c} M${x + s},${y + s - c} V${y + s} H${x + s - c} M${x + c},${y + s} H${x} V${y + s - c}`
  return [
    ...shapes,
    <rect key="t" x={x + 20} y={y + 20} width={24} height={24} fill={blue} opacity={0.95} />,
    <path key="b" d={b} fill="none" stroke={ink} strokeWidth={2.5} opacity={0.85} />,
  ]
}

/** Overlapping circles, one in blue */
function Overlap(r: () => number) {
  const n = 4
  const hot = Math.floor(r() * n)
  return Array.from({ length: n }, (_, i) => (
    <circle
      key={i}
      cx={110 + i * 62}
      cy={150 + (r() - 0.5) * 40}
      r={76}
      fill={i === hot ? blue : ink}
      opacity={i === hot ? 0.85 : 0.12}
    />
  ))
}

/** Steps climbing, with the last one in blue */
function Steps(r: () => number) {
  const n = 6 + Math.floor(r() * 3)
  const w = (W - 60) / n
  return Array.from({ length: n }, (_, i) => {
    const h = 30 + (i + 1) * ((H - 90) / n)
    return <rect key={i} x={30 + i * w} y={H - 30 - h} width={w - 6} height={h} fill={i === n - 1 ? blue : ink} opacity={i === n - 1 ? 0.95 : 0.12 + i * 0.04} />
  })
}

const MOTIFS = [Field, Rings, Bars, Tiles, Waves, Tracked, Overlap, Steps]

export function AbstractCover({ seed, index, className = '' }: { seed: string; index?: number; className?: string }) {
  const r = rng(seed)
  // in a list, neighbours get different motifs; on its own the seed picks one
  const motif = MOTIFS[(index ?? Math.floor(r() * MOTIFS.length)) % MOTIFS.length]
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className={`block h-full w-full bg-[var(--panel)] ${className}`}
    >
      {motif(r)}
    </svg>
  )
}
