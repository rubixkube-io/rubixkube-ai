'use client'

import {
  motion,
  useAnimation,
  animate,
  useMotionValue
} from 'framer-motion'
import { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { Eye, CheckCircle, Server, Search, Wrench, Shield, BookOpen } from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface JourneyNode {
  id: string
  label: string
  icon: React.ReactNode
  position: { x: number; y: number }
  description: string
}

const journeyNodes: JourneyNode[] = [
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    icon: <Server className="w-4 h-4" />,
    position: { x: 150, y: 80 },
    description: 'Starting point - monitoring infrastructure'
  },
  {
    id: 'observer',
    label: 'Observer',
    icon: <Eye className="w-4 h-4" />,
    position: { x: 120, y: 180 },
    description: 'Detected an issue - service facing errors'
  },
  {
    id: 'investigating',
    label: 'Investigating Root Cause',
    icon: <Search className="w-4 h-4" />,
    position: { x: 200, y: 280 },
    description: 'Multiple actions analyzing the problem'
  },
  {
    id: 'applying',
    label: 'Applying Remediations',
    icon: <Wrench className="w-4 h-4" />,
    position: { x: 100, y: 380 },
    description: 'Moving back to infra to apply changes'
  },
  {
    id: 'verifying',
    label: 'Verifying Fixes',
    icon: <Shield className="w-4 h-4" />,
    position: { x: 180, y: 480 },
    description: 'Confirming the fixes worked'
  },
  {
    id: 'stable',
    label: 'System Stable',
    icon: <CheckCircle className="w-4 h-4" />,
    position: { x: 140, y: 580 },
    description: 'System is now healthy and stable'
  },
  {
    id: 'learning',
    label: 'Store Learnings',
    icon: <BookOpen className="w-4 h-4" />,
    position: { x: 160, y: 680 },
    description: 'Capturing knowledge for future incidents'
  }
];

const ACTION_CONTENT: Record<string, { title: string; bullets: string[]; kpi?: string }> = {
  infrastructure: {
    title: 'Monitoring Infrastructure',
    bullets: [
      'Live telemetry wired (metrics, logs, traces)',
      'Baselines learned from last 30 days',
      'Change events correlated (deploys, config)'
    ]
  },
  observer: {
    title: 'Detection: Incident Start',
    bullets: [
      'Error rate crossed SLA on checkout-api',
      'Anomaly across p95 latency & 5xx',
      'Blast radius: 2 services in path'
    ],
    kpi: 'MTTD: 12s'
  },
  investigating: {
    title: 'Root Cause Analysis',
    bullets: [
      'Trace diff highlights regression spike',
      'Suspect: config drift in rollout v42.7',
      'Confidence 82% from past incidents'
    ],
    kpi: 'Time saved: 7m'
  },
  applying: {
    title: 'Apply Safe Remediation',
    bullets: [
      'Roll back canary to v42.6',
      'Scale replicas +2 for buffer',
      'Open change in approvals channel'
    ],
    kpi: 'Guardrails: policy & window OK'
  },
  verifying: {
    title: 'Verification & Guardrails',
    bullets: [
      'p95 back within baseline ±5%',
      'Error budget burn stabilizing',
      'No new alerts for 3m'
    ],
    kpi: 'Auto-rollback armed'
  },
  stable: {
    title: 'System Stable',
    bullets: [
      'User impact cleared',
      'All alerts green',
      'Post-incident checks passed'
    ],
    kpi: 'MTTR: 8m'
  },
  learning: {
    title: 'Store Learnings',
    bullets: [
      'Playbook updated from actions',
      'Signals + symptoms indexed',
      'Similar incidents auto-linked'
    ],
    kpi: 'Next-time ETA: -40%'
  }
}

// SVG path that connects all nodes in a flowing curve representing the journey
const VIEW_W = 300
const VIEW_H = 800
const CENTER = { x: VIEW_W / 2, y: VIEW_H / 2 }

const journeyPath =
  'M150,80 Q80,130 120,180 Q160,230 200,280 Q120,330 100,380 Q140,430 180,480 Q120,530 140,580 Q180,630 160,680'

export function JourneyAnimation() {
  const prefersReducedMotion = useReducedMotion()
  const pathLength = useMotionValue(0) // 0..1 animated smoothly

  const cameraControls = useAnimation()

  const [currentNodeIndex, setCurrentNodeIndex] = useState(-1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isActionActive, setIsActionActive] = useState(false)

  const [inView, setInView] = useState(true)
  const [ratios, setRatios] = useState<number[] | null>(null)
  const [bbox, setBbox] = useState<{minX:number; minY:number; maxX:number; maxY:number} | null>(null)
  const overview = useMemo(() => {
    if (!bbox) return null
    const centerX = (bbox.minX + bbox.maxX) / 2
    const centerY = (bbox.minY + bbox.maxY) / 2
    const spanX = bbox.maxX - bbox.minX
    const spanY = bbox.maxY - bbox.minY
    // fit inside view with a little padding
    const pad = 24
    const scaleX = VIEW_W / (spanX + pad)
    const scaleY = VIEW_H / (spanY + pad)
    const scale = Math.min(1, Math.min(scaleX, scaleY)) * 0.95
    return { centerX, centerY, spanY, scale }
  }, [bbox])

  const isRunningRef = useRef(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Derive camera positions from journey nodes to avoid duplication
  const cameraPositions = useMemo(
    () => journeyNodes.map((n) => ({ x: n.position.x, y: n.position.y })),
    []
  )

  // Intersection Observer for performance
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (rootRef.current) io.observe(rootRef.current)
    return () => io.disconnect()
  }, [])



  // Compute exact ratios after mount from the real path, and compute bbox for overview
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const path = svg.querySelector('#journey-path') as SVGPathElement | null
    if (!path) return

    const total = path.getTotalLength()
    // Progressive nearest-point search with refinement to avoid snapping far ahead
    const posToLenInRange = (x: number, y: number, startLen: number, endLen: number) => {
      const clampedStart = Math.max(0, Math.min(total, startLen))
      const clampedEnd = Math.max(clampedStart, Math.min(total, endLen))
      // Coarse scan to find a good starting region
      let best = clampedStart
      let bestDist = Infinity
      const coarseSteps = 60
      for (let i = 0; i <= coarseSteps; i++) {
        const l = clampedStart + ((clampedEnd - clampedStart) * i) / coarseSteps
        const p = path.getPointAtLength(l)
        const d = (p.x - x) ** 2 + (p.y - y) ** 2
        if (d < bestDist) {
          bestDist = d
          best = l
        }
      }
      // Ternary search refinement around the coarse best
      let left = Math.max(clampedStart, best - (clampedEnd - clampedStart) * 0.1)
      let right = Math.min(clampedEnd, best + (clampedEnd - clampedStart) * 0.1)
      for (let iter = 0; iter < 32; iter++) {
        const m1 = left + (right - left) / 3
        const m2 = right - (right - left) / 3
        const p1 = path.getPointAtLength(m1)
        const p2 = path.getPointAtLength(m2)
        const d1 = (p1.x - x) ** 2 + (p1.y - y) ** 2
        const d2 = (p2.x - x) ** 2 + (p2.y - y) ** 2
        if (d1 < d2) {
          right = m2
        } else {
          left = m1
        }
      }
      return (left + right) / 2
    }

    const epsilon = total * 0.004 // small forward nudge to preserve monotonicity
    const backOffsetPx = 24 // pull anchors slightly back along the path to avoid visual overshoot
    const avgStep = total / Math.max(1, journeyNodes.length)
    const windowFactor = 1.05 // tighter search window to avoid future segments

    const lengths: number[] = []
    let prev = 0
    for (let i = 0; i < journeyNodes.length; i++) {
      const node = journeyNodes[i]
      const start = i === 0 ? 0 : prev
      const end = Math.min(total, start + avgStep * windowFactor)
      let l = posToLenInRange(node.position.x, node.position.y, start, end)
      // Shift back a little so the visible trace stops before the node
      l = Math.max(0, l - backOffsetPx)
      // Enforce forward-only progression and avoid zero-length segments
      if (l < prev + epsilon) l = Math.min(total, prev + epsilon)
      lengths.push(l)
      prev = l
    }

    setRatios(lengths.map((l) => l / total))
    const bb = path.getBBox()
    setBbox({ minX: bb.x, minY: bb.y, maxX: bb.x + bb.width, maxY: bb.y + bb.height })
  }, [])

  // Clamp camera to ensure zoomed content stays within visible container
  const clampCamera = useCallback((x: number, y: number, scale: number = 1) => {
    if (!overview) return { x, y }
    
    // Container dimensions in SVG coordinate space
    const containerCenterX = -overview.centerX + CENTER.x
    const containerCenterY = -overview.centerY + CENTER.y
    
    // Calculate how much of the SVG will be visible at this zoom level
    // Higher zoom = less SVG content visible = tighter camera constraints
    const visibleWidth = VIEW_W / scale
    const visibleHeight = VIEW_H / scale
    
    // Calculate the bounds where camera can be positioned
    // Camera position + half visible area should not exceed SVG bounds
    const maxCameraX = containerCenterX + (VIEW_W - visibleWidth) / 2
    const minCameraX = containerCenterX - (VIEW_W - visibleWidth) / 2
    const maxCameraY = containerCenterY + (VIEW_H - visibleHeight) / 2  
    const minCameraY = containerCenterY - (VIEW_H - visibleHeight) / 2
    
    // Clamp the camera position
    const clampedX = Math.max(minCameraX, Math.min(maxCameraX, x))
    const clampedY = Math.max(minCameraY, Math.min(maxCameraY, y))
    
    return { x: clampedX, y: clampedY }
  }, [overview])

  useEffect(() => {
    if (!inView || prefersReducedMotion || !ratios || !overview) return

    const runAnimation = async () => {
      if (isRunningRef.current) return
      isRunningRef.current = true

      try {
        setIsAnimating(true)
        setCurrentNodeIndex(-1)

        // Start with camera centered on the overview for proper framing
        await cameraControls.start({
          x: -overview.centerX + CENTER.x,
          y: -overview.centerY + CENTER.y,
          scale: Math.max(overview.scale, 0.8), // Ensure minimum readable scale
          transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
        })

        // Reset path to 0 at start of each loop
        await animate(pathLength, 0, { duration: 0.1, ease: [0.25, 0.1, 0.25, 1] })

        for (let i = 0; i < journeyNodes.length; i++) {
          const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
          setCurrentNodeIndex(i)
          
          // Draw path progressively to the current node
          // Animate strictly to the mapped ratio (mapping already includes back-offset)
          const currentRatio = ratios[i] ?? ((i + 1) / journeyNodes.length)
          await animate(pathLength, clamp01(currentRatio), {
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1]
          })

          // Wait for path to complete before proceeding
          await new Promise((r) => setTimeout(r, 500))

          // Camera pans to keep the current node dead center, clamp Y, scale 1.2 for readability
          {
            const targetScale = 1.5
            const target = clampCamera(
              -cameraPositions[i].x + CENTER.x,
              -cameraPositions[i].y + CENTER.y,
              targetScale
            )
            await cameraControls.start({
              x: target.x,
              y: target.y,
              scale: targetScale, // Increased for better readability
              transition: {
                duration: 1.6,
                ease: [0.25, 0.1, 0.25, 1]
              }
            })
          }

          // Dwell at node before action
          await new Promise((r) => setTimeout(r, 800))

          // Zoom in for action, clamp Y
          setIsActionActive(true)
          {
            const targetScale = 2.0
            const target = clampCamera(
              -cameraPositions[i].x + CENTER.x,
              -cameraPositions[i].y + CENTER.y,
              targetScale
            )
            await cameraControls.start({
              x: target.x,
              y: target.y,
              scale: targetScale, // Increased zoom for action focus
              transition: {
                duration: 0.9,
                ease: [0.25, 0.1, 0.25, 1]
              }
            })
          }

          // Perform action with variable timing
          const actionDuration = i === 2 ? 2400 : i === 3 ? 2000 : 1500
          await new Promise((r) => setTimeout(r, actionDuration))

          // Zoom out, clamp Y
          {
            const targetScale = 1.5
            const target = clampCamera(
              -cameraPositions[i].x + CENTER.x,
              -cameraPositions[i].y + CENTER.y,
              targetScale
            )
            await cameraControls.start({
              x: target.x,
              y: target.y,
              scale: targetScale, // Match the main scale for consistency
              transition: {
                duration: 1.0,
                ease: [0.25, 0.1, 0.25, 1]
              }
            })
          }
          setIsActionActive(false)

          // Breath between steps
          await new Promise((r) => setTimeout(r, 400))
        }

        // Hold final state briefly
        await new Promise((r) => setTimeout(r, 1200))

        // Reset for next loop: return to overview for proper restart
        await Promise.all([
          animate(pathLength, 0, { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }),
          cameraControls.start({
            x: -overview.centerX + CENTER.x,
            y: -overview.centerY + CENTER.y,
            scale: Math.max(overview.scale, 0.8), // Ensure minimum readable scale
            transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
          })
        ])

        // Brief pause on overview before next cycle
        await new Promise((r) => setTimeout(r, 1000))

        setCurrentNodeIndex(-1)
        setIsAnimating(false)
      } finally {
        isRunningRef.current = false
      }
    }

    const t = setTimeout(runAnimation, 800)
    // Interval timing adjusted for new sequence duration
    const id = setInterval(runAnimation, 6000)

    return () => {
      clearTimeout(t)
      clearInterval(id)
    }
  }, [inView, prefersReducedMotion, ratios, cameraPositions, cameraControls, pathLength, overview, clampCamera])

  if (prefersReducedMotion) {
    return (
      <div className="w-full space-y-4">
        {journeyNodes.map((node) => (
          <div key={node.id} className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                {node.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground mb-1">{node.label}</h4>
                <p className="text-xs text-foreground-muted">{node.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.div
        ref={rootRef}
        className="absolute inset-0 pointer-events-none z-10"
        initial={overview ? {
          x: -overview.centerX + CENTER.x,
          y: -overview.centerY + CENTER.y,
          scale: Math.max(overview.scale, 0.8)
        } : {
          x: 0, y: 0, scale: 0.8
        }}
        animate={cameraControls}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          {/* Gradient for the path */}
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="rgb(147, 197, 253)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.6" />
          </linearGradient>



          {/* Enhanced glow effect */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            {/* Create multiple blur layers for richer glow */}
            <feGaussianBlur stdDeviation="2" result="innerGlow" />
            <feGaussianBlur stdDeviation="4" result="midGlow" />
            <feGaussianBlur stdDeviation="8" result="outerGlow" />
            
            {/* Enhance the colors */}
            <feColorMatrix in="innerGlow" type="matrix" 
              values="0 0 0 0 0.23  0 0 0 0 0.51  0 0 0 0 0.96  0 0 0 0.8 0" result="innerGlowColored" />
            <feColorMatrix in="midGlow" type="matrix" 
              values="0 0 0 0 0.23  0 0 0 0 0.51  0 0 0 0 0.96  0 0 0 0.4 0" result="midGlowColored" />
            <feColorMatrix in="outerGlow" type="matrix" 
              values="0 0 0 0 0.23  0 0 0 0 0.51  0 0 0 0 0.96  0 0 0 0.2 0" result="outerGlowColored" />
            
            {/* Merge all layers */}
            <feMerge>
              <feMergeNode in="outerGlowColored" />
              <feMergeNode in="midGlowColored" />
              <feMergeNode in="innerGlowColored" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background path (faded) */}
        <path
          d={journeyPath}
          stroke="rgb(148, 163, 184)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="5,5"
          opacity="0.2"
          vectorEffect="non-scaling-stroke"
        />

        {/* Context path for continuity */}
        {currentNodeIndex >= 0 && (
          <path
            d={journeyPath}
            stroke="rgb(59, 130, 246)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.15"
            vectorEffect="non-scaling-stroke"
          />
        )}

        {/* Animated path with gradient and glow */}
        <motion.path
          id="journey-path"
          d={journeyPath}
          stroke="url(#pathGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="0 1"
          filter="url(#glow)"
          style={{ pathLength }}
          vectorEffect="non-scaling-stroke"
        />

        {/* Journey nodes */}
        {journeyNodes.map((node, index) => {
          const isActive = currentNodeIndex >= index
          const isCurrent = currentNodeIndex === index
          const isDim = currentNodeIndex >= 0 && Math.abs(currentNodeIndex - index) > 1

          return (
            <g key={node.id}>
              {/* Node circle */}
              <motion.circle
                cx={node.position.x}
                cy={node.position.y}
                r="16"
                fill={isActive ? 'rgb(59, 130, 246)' : 'rgb(148, 163, 184)'}
                stroke={isCurrent ? 'rgb(147, 197, 253)' : 'transparent'}
                strokeWidth="3"
                filter={isCurrent ? 'url(#glow)' : 'none'}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isActive ? 1 : 0.72,
                  opacity: isCurrent ? 1 : isDim ? 0.3 : 0.6,
                  strokeWidth: isCurrent ? 6 : 3
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                vectorEffect="non-scaling-stroke"
              />

              {/* Pulse effect for current node */}
              {isCurrent && (
                <motion.circle
                  cx={node.position.x}
                  cy={node.position.y}
                  r="16"
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                  vectorEffect="non-scaling-stroke"
                />
              )}

              {/* Node icon (foreignObject may be flaky on Safari; acceptable trade-off here) */}
              <foreignObject x={node.position.x - 8} y={node.position.y - 8} width="16" height="16">
                <motion.div
                  className={`flex items-center justify-center w-4 h-4 ${
                    isActive ? 'text-white' : 'text-gray-400'
                  }`}
                  animate={{ scale: isCurrent ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.6, repeat: isCurrent ? Infinity : 0, repeatType: 'reverse' }}
                >
                  {node.icon}
                </motion.div>
              </foreignObject>

              {/* Node label (visual alternating pattern: right-left-right-left-right-left) */}
              <motion.text
                y={node.position.y + 4}
                textAnchor={[0, 2, 4].includes(index) ? 'start' : 'end'}
                className="text-[11px] font-medium fill-current"
                fill={isActive ? 'rgb(59, 130, 246)' : 'rgb(148, 163, 184)'}
                initial={{ 
                  opacity: 0, 
                  x: [0, 2, 4].includes(index) ? node.position.x + 14 : node.position.x - 14 
                }}
                animate={{
                  opacity: isCurrent ? 1 : isDim ? 0.3 : isActive ? 0.65 : 0.4,
                  x: [0, 2, 4].includes(index) ? node.position.x + 18 : node.position.x - 18,
                  scale: isCurrent ? 1.08 : 1
                }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
              >
                {node.label}
              </motion.text>
            </g>
          )
        })}

        {/* RubixKube tracer - the main character we're following */}
        <motion.g initial={{ opacity: 0 }} animate={isAnimating ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.5 }}>
          {/* Main body */}
          <motion.circle
            r="6"
            fill="rgb(59, 130, 246)"
            stroke="rgb(147, 197, 253)"
            strokeWidth="2"
            filter="url(#glow)"
            initial={{ cx: journeyNodes[0].position.x, cy: journeyNodes[0].position.y }}
            animate={{
              cx: currentNodeIndex >= 0 ? cameraPositions[currentNodeIndex].x : journeyNodes[0].position.x,
              cy: currentNodeIndex >= 0 ? cameraPositions[currentNodeIndex].y : journeyNodes[0].position.y
            }}
            transition={{ duration: 2.0, ease: [0.25, 0.1, 0.25, 1] }}
            vectorEffect="non-scaling-stroke"
          />

          {/* Pulsing outer ring */}
          <motion.circle
            r="6"
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="1"
            initial={{ cx: journeyNodes[0].position.x, cy: journeyNodes[0].position.y }}
            animate={{
              cx: currentNodeIndex >= 0 ? cameraPositions[currentNodeIndex].x : journeyNodes[0].position.x,
              cy: currentNodeIndex >= 0 ? cameraPositions[currentNodeIndex].y : journeyNodes[0].position.y,
              r: isActionActive ? [6, 18, 6] : [6, 12, 6],
              opacity: isActionActive ? [1, 0.1, 1] : [0.8, 0.2, 0.8],
              strokeWidth: isActionActive ? [1, 3, 1] : 1
            }}
            transition={{
              cx: { duration: 2.0, ease: [0.25, 0.1, 0.25, 1] },
              cy: { duration: 2.0, ease: [0.25, 0.1, 0.25, 1] },
              r: { duration: isActionActive ? 0.8 : 1.5, repeat: Infinity, repeatType: 'reverse' },
              opacity: { duration: isActionActive ? 0.8 : 1.5, repeat: Infinity, repeatType: 'reverse' },
              strokeWidth: { duration: isActionActive ? 0.8 : 1.5, repeat: Infinity, repeatType: 'reverse' }
            }}
            vectorEffect="non-scaling-stroke"
          />

          {/* Action burst effect */}
          {isActionActive && (
            <motion.g>
              {[...Array(6)].map((_, index) => (
                <motion.circle
                  key={index}
                  r="2"
                  fill="rgb(147, 197, 253)"
                  initial={{
                    cx: currentNodeIndex >= 0 ? cameraPositions[currentNodeIndex].x : journeyNodes[0].position.x,
                    cy: currentNodeIndex >= 0 ? cameraPositions[currentNodeIndex].y : journeyNodes[0].position.y,
                    opacity: 0
                  }}
                  animate={{
                    cx:
                      (currentNodeIndex >= 0 ? cameraPositions[currentNodeIndex].x : journeyNodes[0].position.x) +
                      Math.cos((index * Math.PI) / 3) * 25,
                    cy:
                      (currentNodeIndex >= 0 ? cameraPositions[currentNodeIndex].y : journeyNodes[0].position.y) +
                      Math.sin((index * Math.PI) / 3) * 25,
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.2, 0.5]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1, ease: 'easeInOut' }}
                />
              ))}
            </motion.g>
          )}
        </motion.g>
      </svg>
      </motion.div>
      
      {/* Action HUD - positioned at bottom corner outside camera transform */}
      {isActionActive && currentNodeIndex >= 0 && (
        <motion.div
          className={`absolute ${currentNodeIndex % 2 === 0 ? 'right-4' : 'left-4'} bottom-4 pointer-events-auto z-30`}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="bg-background/95 backdrop-blur-xl border border-border/60 shadow-xl rounded-lg px-3 py-2.5 w-64 max-w-[280px] break-words">
            {(() => {
              const node = journeyNodes[currentNodeIndex]
              const info = ACTION_CONTENT[node.id] || { title: node.label, bullets: [node.description] }
              return (
                <div>
                  <div className="flex items-start gap-2.5 mb-2.5">
                    <div className="w-7 h-7 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                      {node.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground leading-tight">{info.title}</h4>
                      {info.kpi && (
                        <div className="inline-block mt-1 px-2 py-0.5 bg-primary/8 text-[11px] font-medium text-primary rounded-full">
                          {info.kpi}
                        </div>
                      )}
                    </div>
                  </div>
                  <ul className="text-[11px] leading-[1.4] text-foreground-muted space-y-1 pr-1">
                    {info.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-primary/60 flex-shrink-0 mt-2"></span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })()} 
          </div>
        </motion.div>
      )}
    </div>
  )
}
