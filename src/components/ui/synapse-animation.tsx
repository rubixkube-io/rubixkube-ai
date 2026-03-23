'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface Neuron {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
  phase: number
  connections: number
}

interface SynapseAnimationProps {
  count?: number
  proximity?: number
  maxEdges?: number
  className?: string
}

export function SynapseAnimation({
  count = 50,
  proximity = 0.22,
  maxEdges = 5,
  className,
}: SynapseAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      w = rect.width
      h = rect.height
    }
    resize()
    window.addEventListener('resize', resize)

    const ns: Neuron[] = []
    for (let i = 0; i < count; i++) {
      const roll = Math.random()
      const r = roll < 0.55 ? 1.2 + Math.random() * 0.8
        : roll < 0.85 ? 2 + Math.random() * 1.2
          : 3.2 + Math.random() * 1.3

      ns.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.001,
        vy: (Math.random() - 0.5) * 0.001,
        r,
        alpha: 0.5 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        connections: 0,
      })
    }

    let raf: number

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)

      const connectDist = Math.min(w, h) * proximity

      ns.forEach((n) => {
        n.phase += 0.006
        n.x += n.vx + Math.sin(n.phase) * 0.0002
        n.y += n.vy + Math.cos(n.phase * 0.7) * 0.0002

        if (n.x < 0.02) n.vx += 0.0001
        if (n.x > 0.98) n.vx -= 0.0001
        if (n.y < 0.02) n.vy += 0.0001
        if (n.y > 0.98) n.vy -= 0.0001
        n.vx *= 0.999
        n.vy *= 0.999

        n.connections = 0
      })

      for (let i = 0; i < ns.length; i++) {
        const ax = ns[i].x * w
        const ay = ns[i].y * h
        for (let j = i + 1; j < ns.length; j++) {
          const dx = ax - ns[j].x * w
          const dy = ay - ns[j].y * h
          if (dx * dx + dy * dy < connectDist * connectDist) {
            ns[i].connections++
            ns[j].connections++
          }
        }
      }

      const edges: { i: number; j: number; dist: number }[] = []
      for (let i = 0; i < ns.length; i++) {
        const ax = ns[i].x * w
        const ay = ns[i].y * h
        for (let j = i + 1; j < ns.length; j++) {
          const dx = ax - ns[j].x * w
          const dy = ay - ns[j].y * h
          const d2 = dx * dx + dy * dy
          if (d2 < connectDist * connectDist) {
            edges.push({ i, j, dist: Math.sqrt(d2) })
          }
        }
      }
      edges.sort((a, b) => a.dist - b.dist)

      const drawn = new Uint8Array(ns.length)
      for (const e of edges) {
        if (drawn[e.i] >= maxEdges || drawn[e.j] >= maxEdges) continue
        drawn[e.i]++
        drawn[e.j]++

        const closeness = 1 - e.dist / connectDist
        const hub = Math.min(drawn[e.i], maxEdges) + Math.min(drawn[e.j], maxEdges)
        const cluster = 0.5 + hub * 0.1

        const alpha = closeness * closeness * 0.6 * cluster
        const lineW = 0.4 + closeness * cluster * 0.8

        ctx.beginPath()
        ctx.moveTo(ns[e.i].x * w, ns[e.i].y * h)
        ctx.lineTo(ns[e.j].x * w, ns[e.j].y * h)
        ctx.strokeStyle = `rgba(47,91,255,${Math.min(alpha, 0.55)})`
        ctx.lineWidth = Math.min(lineW, 2.2)
        ctx.stroke()
      }

      ns.forEach((n) => {
        const px = n.x * w
        const py = n.y * h

        ctx.beginPath()
        ctx.arc(px, py, n.r * 2.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(47,91,255,${0.08})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(px, py, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(47,91,255,${n.alpha})`
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [count, proximity, maxEdges])

  return (
    <canvas
      ref={canvasRef}
      className={cn('h-full w-full', className)}
      aria-hidden
    />
  )
}
