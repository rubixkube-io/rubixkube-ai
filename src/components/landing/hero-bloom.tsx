'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/** 4×4 ordered-dither thresholds, 0 to 1 */
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16)
/** Grid step and dot size in CSS pixels */
const PITCH = 6
const CELL = 4.5
/** One full drift takes this long */
const LOOP_MS = 40_000

/**
 * The cover's halftone bloom in brand blue: two dot blobs that drift slowly, drawn with an
 * ordered dither so they fade to nothing at the edges. `cx`/`cy` place it (0 to 1 of the box),
 * `size` is its radius against the box's longer side and `peak` how dense the middle gets.
 * It is still for people who ask for reduced motion.
 */
export function HeroBloom({
  className,
  cx = 0.74,
  cy = 0.36,
  size = 0.3,
  peak = 0.62,
}: {
  className?: string
  cx?: number
  cy?: number
  size?: number
  peak?: number
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const still = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let w = 0
    let h = 0
    const fit = () => {
      const dpr = window.devicePixelRatio || 1
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const draw = (t: number) => {
      const styles = getComputedStyle(canvas)
      const a = (t / LOOP_MS) * Math.PI * 2
      const m = Math.max(w, h)
      const blobs = [
        { x: w * (cx - 0.08 + 0.08 * Math.cos(a)), y: h * (cy - 0.03 + 0.06 * Math.sin(a)), r: m * size, c: styles.getPropertyValue('--bloom-a') },
        { x: w * (cx + 0.1 + 0.08 * Math.sin(a * 0.7)), y: h * (cy + 0.03 + 0.06 * Math.cos(a * 0.7)), r: m * size * 0.8, c: styles.getPropertyValue('--bloom-b') },
      ]
      ctx.clearRect(0, 0, w, h)
      ctx.globalAlpha = parseFloat(styles.getPropertyValue('--bloom-alpha')) || 0.5
      for (const b of blobs) {
        ctx.fillStyle = b.c
        const x0 = Math.max(0, Math.floor((b.x - b.r) / PITCH))
        const x1 = Math.min(Math.ceil(w / PITCH), Math.ceil((b.x + b.r) / PITCH))
        const y0 = Math.max(0, Math.floor((b.y - b.r) / PITCH))
        const y1 = Math.min(Math.ceil(h / PITCH), Math.ceil((b.y + b.r) / PITCH))
        for (let gy = y0; gy < y1; gy++)
          for (let gx = x0; gx < x1; gx++) {
            const dx = (gx * PITCH - b.x) / b.r
            const dy = (gy * PITCH - b.y) / b.r
            const d = dx * dx + dy * dy
            if (d >= 1) continue
            if (peak * (1 - d) * (1 - d) > BAYER[(gy & 3) * 4 + (gx & 3)]) ctx.fillRect(gx * PITCH, gy * PITCH, CELL, CELL)
          }
      }
      ctx.globalAlpha = 1
    }
    fit()
    draw(0)
    const resize = new ResizeObserver(() => {
      fit()
      draw(still ? 0 : performance.now())
    })
    resize.observe(canvas)
    // the theme switch changes the dot colour
    const theme = new MutationObserver(() => draw(still ? 0 : performance.now()))
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const tick = still ? undefined : setInterval(() => !document.hidden && draw(performance.now()), 100)
    return () => {
      resize.disconnect()
      theme.disconnect()
      clearInterval(tick)
    }
  }, [still, cx, cy, size, peak])

  return <canvas ref={ref} aria-hidden className={className} />
}
