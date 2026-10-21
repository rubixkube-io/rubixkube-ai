'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/** 4×4 ordered-dither thresholds, 0 to 1 */
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16)
/** Grid step and dot size in CSS pixels */
const PITCH = 6
const CELL = 3
/** One slow breath, in seconds */
const BREATH_S = 9

const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

/**
 * A halftone field in ink that breathes: the dots swell and thin out on a slow breath while the
 * pattern itself drifts on waves with unrelated speeds, so it never comes back the same way and has
 * no start or end. It stays on the right of the cover, clear of the text, and is not drawn on phones,
 * where the text takes the full width. It is still for people who ask for reduced motion.
 */
export function HeroBloom({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const still = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let w = 0
    let h = 0
    let ink = '#111318'
    let alpha = 0.5
    const colors = () => {
      const st = getComputedStyle(canvas)
      ink = st.getPropertyValue('--ink').trim() || ink
      alpha = parseFloat(st.getPropertyValue('--bloom-alpha')) || alpha
    }
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const draw = (ms: number) => {
      const t = still ? 20 : ms / 1000
      const breath = 0.78 + 0.22 * Math.sin((t / BREATH_S) * Math.PI * 2)
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = ink
      ctx.globalAlpha = alpha
      const cols = Math.ceil(w / PITCH)
      const rows = Math.ceil(h / PITCH)
      for (let gy = 0; gy < rows; gy++) {
        const y = gy / rows
        for (let gx = 0; gx < cols; gx++) {
          const x = gx / cols
          // where the field may show: the right of the cover, fading out towards the text
          const room = smooth(0.62, 1, x) * smooth(0, 0.3, y) * smooth(1, 0.7, y)
          if (room <= 0.02) continue
          // the pattern: a few slow waves that drift past each other
          const px = x * (w / 260)
          const py = y * (h / 260)
          const f =
            Math.sin(px * 1.3 + t * 0.11) * Math.cos(py * 1.1 - t * 0.07) +
            0.6 * Math.sin((px + py) * 0.8 - t * 0.05 + 1.7) +
            0.4 * Math.cos(px * 2.1 - py * 1.7 + t * 0.13)
          const v = room * breath * (0.5 + 0.25 * f)
          if (v > BAYER[(gy & 3) * 4 + (gx & 3)]) ctx.fillRect(gx * PITCH, gy * PITCH, CELL, CELL)
        }
      }
      ctx.globalAlpha = 1
    }

    colors()
    fit()
    let raf = 0
    let last = 0
    // about 20 frames a second is plenty for something this slow
    const loop = (ms: number) => {
      if (!document.hidden && ms - last > 50) {
        draw(ms)
        last = ms
      }
      raf = requestAnimationFrame(loop)
    }
    if (still) draw(0)
    else raf = requestAnimationFrame(loop)
    const resize = new ResizeObserver(() => {
      fit()
      draw(still ? 0 : performance.now())
    })
    resize.observe(canvas)
    const theme = new MutationObserver(() => {
      colors()
      draw(still ? 0 : performance.now())
    })
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => {
      cancelAnimationFrame(raf)
      resize.disconnect()
      theme.disconnect()
    }
  }, [still])

  return <canvas ref={ref} aria-hidden className={className} />
}
