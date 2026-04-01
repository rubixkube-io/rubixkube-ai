'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { rkMono9, rkMono10 } from '@/lib/landing-responsive-type'

// TODO: Replace Kishore and Sachin quotes with approved final copy when provided.
const quotes = [
  {
    quote: 'Killer stuff. Super clean UX, well thought through.',
    name: 'Kishore',
    role: 'CTO, Yellow.ai',
  },
  {
    quote:
      'Super easy to set up with a single command. Impressed by the out-of-the-box metrics and clutter-free UI. A breath of fresh air.',
    name: 'Sachin Govind',
    role: 'Software Engineer',
  },
  {
    quote: "It truly feels like talking directly to your infrastructure. It's rare to see such polish in infra management platforms.",
    name: 'Mridul Gain',
    role: 'Staff Engineer, Platform9',
  },
  {
    quote: 'RubixKube brought calm and clarity to our operations. We moved from reacting to anticipating.',
    name: 'Ganesh Kumar',
    role: 'CEO, Sheshi AI',
  },
  {
    quote: "The value wasn't a dashboard. It was the system fixing the right things at the right time, with proof.",
    name: 'Kartik Pawar',
    role: 'Staff Engineer, Fellow.ai',
  },
]

const ease = 'easeOut' as const
const INTERVAL_MS = 7300

export function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % quotes.length), INTERVAL_MS)
    return () => clearInterval(t)
  }, [])

  const featured = quotes[activeIdx]
  const supporting = quotes.filter((_, i) => i !== activeIdx)

  return (
    <section className="landing-snap-section flex min-h-[calc(100vh-var(--nav-stack))] flex-col justify-center border-t border-[var(--rule)] bg-[var(--background-secondary)] px-[var(--pad)] py-20 lg:h-[calc(100vh-var(--nav-stack))]">
      <div className="rk-landing-max w-full">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mb-12 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] text-[var(--text-muted)] uppercase min-[1920px]:text-[12px]"
        >
          What our customers are saying
        </motion.p>

        {/* Featured quote — rotates */}
        <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={`featured-${activeIdx}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease }}
              className="font-[family-name:var(--font-serif)] text-[clamp(1.6rem,3.2vw,2.8rem)] font-light italic leading-[1.35] tracking-[-0.02em] text-[var(--ink)] min-[1920px]:text-[clamp(1.9rem,2.8vw,3.2rem)]"
            >
              &ldquo;{featured.quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.cite
              key={`cite-${activeIdx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease, delay: 0.15 }}
              className="flex shrink-0 flex-col justify-end not-italic lg:items-end"
            >
              <span className={cn('font-[family-name:var(--font-mono)] tracking-wide text-[var(--ink)]', rkMono10)}>
                {featured.name}
              </span>
              <span className={cn('mt-1 font-[family-name:var(--font-mono)] text-[var(--mid)]', rkMono9)}>
                {featured.role}
              </span>
            </motion.cite>
          </AnimatePresence>
        </div>

        {/* Dot nav */}
        <div className="mb-8 flex items-center gap-2">
          {quotes.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === activeIdx
                  ? 'w-5 bg-[var(--blue)]'
                  : 'w-1.5 bg-[var(--faint)] hover:bg-[var(--mid)]',
              )}
              aria-label={`Show testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="mb-0 h-px bg-[var(--rule)]" />

        {/* Supporting quotes — remaining 4 */}
        <div className="grid grid-cols-1 divide-y divide-[var(--rule)] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          <AnimatePresence mode="wait">
            {supporting.map((q, i) => (
              <motion.div
                key={`${q.name}-${activeIdx}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease, delay: i * 0.07 }}
                className={cn(
                  'flex flex-col justify-between py-8',
                  i > 0 && 'sm:pl-8',
                  i < supporting.length - 1 && 'sm:pr-8 lg:pr-8',
                )}
              >
                <p className="font-[family-name:var(--font-serif)] text-[clamp(1.05rem,1.6vw,1.35rem)] font-light italic leading-[1.6] tracking-[-0.01em] text-[var(--ink)]">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <cite className="mt-5 flex flex-col not-italic">
                  <span className={cn('font-[family-name:var(--font-mono)] tracking-wide text-[var(--ink)]', rkMono10)}>
                    {q.name}
                  </span>
                  <span className={cn('mt-0.5 font-[family-name:var(--font-mono)] text-[var(--mid)]', rkMono10)}>
                    {q.role}
                  </span>
                </cite>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
