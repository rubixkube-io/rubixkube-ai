'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './reveal'

const slides = [
  {
    quote: (
      <>
        It&apos;s rare that something makes seasoned SREs pause mid-standup.
        <br />
        RubixKube did. Confident impact with low risk.
      </>
    ),
    name: 'Richie Sebastian',
    role: 'DevOps Lead',
  },
  {
    quote: (
      <>
        RubixKube brought calm and clarity to our operations.
        <br />
        We moved from reacting to anticipating.
      </>
    ),
    name: 'Ganesh Kumar',
    role: 'CEO, Sheshi AI',
  },
  {
    quote: (
      <>
        The value wasn&apos;t a dashboard.
        <br />
        It was the system fixing the right things at the right time, with proof.
      </>
    ),
    name: 'Kartik Pawar',
    role: 'Staff Engineer, Fellow.ai',
  },
] as const

export function TestimonialsSection() {
  const [cur, setCur] = useState(0)

  const goTo = useCallback((n: number) => {
    setCur(((n % slides.length) + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setCur((c) => (c + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="landing-snap-section flex min-h-[calc(100vh-var(--nav-stack))] items-center border-t border-[var(--rule)] bg-[var(--background-secondary)] px-[var(--pad)] py-20 lg:h-[calc(100vh-var(--nav-stack))]">
      <div className="rk-landing-max flex w-full justify-center">
      <Reveal className="w-full max-w-2xl text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={cur}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="mb-8 font-[family-name:var(--font-serif)] text-[clamp(1.25rem,2.4vw,1.875rem)] font-light leading-[1.45] tracking-[-0.01em] text-[var(--ink)] italic min-[1920px]:text-[clamp(1.35rem,2.1vw,2.25rem)] min-[2560px]:text-[clamp(1.45rem,1.85vw,2.65rem)]">
              {slides[cur].quote}
            </blockquote>
            <cite className="flex flex-wrap items-center justify-center gap-2 not-italic">
              <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-[var(--ink)] min-[1920px]:text-[13px] min-[2560px]:text-[15px]">
                {slides[cur].name}
              </span>
              <span className="h-1 w-1 rounded-full bg-[var(--faint)]" aria-hidden />
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--mid)] min-[1920px]:text-[13px] min-[2560px]:text-[15px]">
                {slides[cur].role}
              </span>
            </cite>
          </motion.div>
        </AnimatePresence>
        <div className="mt-10 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${i === cur ? 'bg-[var(--blue)]' : 'bg-[var(--faint)]'}`}
              aria-label={`Show testimonial ${i + 1}`}
            />
          ))}
        </div>
      </Reveal>
      </div>
    </section>
  )
}
