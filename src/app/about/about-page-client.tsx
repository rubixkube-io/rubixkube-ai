'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ClosingCTA } from '@/components/closing-cta'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { fadeUpVariants, staggerContainer, fadeUp } from '@/lib/animations'


const BELIEFS = [
  {
    title: 'Reliability is a product decision, not just an ops task',
    body: 'Uptime is not an ops concern — it is a business commitment. We built tools that make that commitment possible for teams of any size, at any stage of growth.',
  },
  {
    title: 'Memory beats muscle. What you learn should compound',
    body: 'Every incident your systems survive generates hard-won knowledge. RubixKube preserves it — so your team stops re-learning the same lesson at 2 AM.',
  },
  {
    title: 'Automation must be governed, explainable, and reversible',
    body: 'Automation that cannot explain itself is just noise at speed. Every action RubixKube takes is traceable, reversible, and legible to the humans behind it.',
  },
  {
    title: 'Great teams deserve tools that protect their focus and health',
    body: 'Alert fatigue is a design failure. We build systems that escalate only what matters — so engineers can do their best work without burning out.',
  },
]

const TEAM_BENEFITS = [
  'Fewer escalations and fewer late nights',
  'Clear root cause in plain language',
  'Safer, faster releases',
  'A system that gets better with every fix',
]

const BUSINESS_BENEFITS = [
  'Less revenue at risk',
  'Fewer broken customer moments',
  'Reliable launches on tight timelines',
  'Leadership visibility on risk, cost, and impact',
]

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

const N = 50

function SynapseAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Neuron[]>([])

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
    for (let i = 0; i < N; i++) {
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
    nodesRef.current = ns

    let raf: number

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)

      const connectDist = Math.min(w, h) * 0.22

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

      // Pass 1 — count how connected each neuron is
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

      // Build sorted neighbor lists (closest first), cap at 5 per neuron
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
        if (drawn[e.i] >= 5 || drawn[e.j] >= 5) continue
        drawn[e.i]++
        drawn[e.j]++

        const closeness = 1 - e.dist / connectDist
        const hub = Math.min(drawn[e.i], 5) + Math.min(drawn[e.j], 5)
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

      // Draw neurons — light, consistent, never overshadow edges
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
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full min-h-[180px]"
      aria-hidden
    />
  )
}

export function AboutPageClient() {
  return (
    <>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative bg-[var(--bg)]">
        <div className="rk-landing-max px-[var(--pad)] pt-[calc(var(--nav-stack)+5rem)] pb-28 sm:pb-36 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <motion.p
              variants={fadeUpVariants}
              className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase"
            >
              Our Story
            </motion.p>

            <motion.h1
              variants={fadeUpVariants}
              className="font-[family-name:var(--font-serif)] text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)] max-w-3xl"
            >
              Building the Bridge Between{' '}
              <span className="italic text-[var(--blue)]">
                Infrastructure &amp; Impact
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)] max-w-xl"
            >
              We did not start with a product idea. We started with a feeling
              we could not ignore.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row gap-3"
            >
              <CalendlyBooking url="https://calendly.com/rubixkube-ai/30min" asChild>
                <Button variant="primary">Book Demo</Button>
              </CalendlyBooking>
              <Button asChild variant="outline">
                <a
                  href="https://console.rubixkube.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See it in Action
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Problem + Solution ─────────────────────────── */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={staggerContainer}
            {...fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-0"
          >
            {/* Left: problem */}
            <motion.div variants={fadeUpVariants} className="flex flex-col gap-5 md:pr-16 lg:pr-20">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
                Why we exist
              </span>
              <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.05] tracking-[-0.01em] text-[var(--ink)]">
                The problem we couldn&apos;t{' '}
                <span className="italic text-[var(--blue)]">ignore.</span>
              </h2>
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                Infrastructure complexity crossed a threshold. Millions of signals across hundreds of services, namespaces, and dependencies, every second. No engineer, no matter how experienced, can hold that topology in their head anymore. The system outgrew the human mind. And it&apos;s not slowing down.
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                The industry responded with more dashboards. More alerts. More surfaces for people to stare at. But instrumenting everything and automating nothing isn&apos;t a strategy. It&apos;s a tax on your best people.
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                We believe infrastructure should become invisible. Self-healing. Systems that detect, reason, and resolve on their own, not systems that page a human and hope they have enough context to act.
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                That waste of talent and cognitive load is why we built RubixKube.
              </p>
            </motion.div>

            {/* Right: solution (with left border divider) */}
            <motion.div variants={fadeUpVariants} className="flex flex-col gap-5 border-t border-[var(--rule)] pt-12 md:border-t-0 md:pt-0 md:border-l md:pl-16 lg:pl-20">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--blue)] uppercase">
                The solution
              </span>
              <h3 className="font-[family-name:var(--font-serif)] text-[clamp(1.75rem,3.5vw,3rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)]">
                Site Reliability <span className="italic text-[var(--blue)]">Intelligence.</span>
              </h3>
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                Not another monitoring layer. An intelligent system that closes the entire loop: detection, reasoning, resolution, learning, without waiting for a human in the middle.
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                It builds a living model of your infrastructure that compounds with every signal. Context that never resets. Awareness that never stops.
              </p>

              {/* Synapse animation */}
              <div className="flex-1 mt-8">
                <SynapseAnimation />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ── Values ───────────────────────────────────────── */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={staggerContainer}
            {...fadeUp}
            className="flex flex-col gap-14"
          >
            <motion.div variants={fadeUpVariants} className="flex flex-col gap-3">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
                What we believe
              </span>
              <h2 className="font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl">
                Principles that shape every{' '}
                <span className="italic text-[var(--blue)]">decision.</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BELIEFS.map((belief) => (
                <motion.div
                  key={belief.title}
                  variants={fadeUpVariants}
                  className="rounded-xl border border-[var(--rule)] bg-[var(--bg)] p-8 flex flex-col gap-4"
                >
                  <span
                    style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
                    className="text-[14px] text-[var(--ink)] leading-[1.4]"
                  >
                    {belief.title}
                  </span>
                  <p className="font-[family-name:var(--font-mono)] text-[14px] font-normal leading-[1.7] text-[var(--ink)]/60">
                    {belief.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────── */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={staggerContainer}
            {...fadeUp}
            className="flex flex-col gap-14"
          >
            <motion.div variants={fadeUpVariants} className="flex flex-col gap-3">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
                The impact
              </span>
              <h2 className="font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl">
                What this means for your{' '}
                <span className="italic text-[var(--blue)]">team.</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div variants={fadeUpVariants} className="flex flex-col gap-6">
                <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-[var(--mid)] uppercase">
                  What this means for your team
                </p>
                <ul className="flex flex-col gap-4">
                  {TEAM_BENEFITS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-[var(--blue)]"
                      />
                      <span className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeUpVariants} className="flex flex-col gap-6">
                <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-[var(--mid)] uppercase">
                  What this means for your business
                </p>
                <ul className="flex flex-col gap-4">
                  {BUSINESS_BENEFITS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-[var(--blue)]"
                      />
                      <span className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </>
  )
}
