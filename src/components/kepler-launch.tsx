'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { rkMono11, rkMono13 } from '@/lib/landing-responsive-type'
import { cn } from '@/lib/utils'

const KEPLER_URL = 'https://trykepler.rubixkube.ai'
const POSTER = '/screenshots/kepler.png'
const EASE = [0.22, 1, 0.36, 1] as const

const proofPoints = [
  'Runs on your machine, with your credentials',
  'Memory that carries across incidents',
  'You set the autonomy: Observe, Assist, or Yolo',
]

const primaryCtaClass =
  '!rounded-[6px] !border-0 !bg-[var(--blue)] !px-[30px] !py-[13px] !text-[11px] !font-medium !tracking-[0.12em] !text-white !uppercase shadow-[0_1px_2px_rgba(0,0,0,0.3)] !transition-[box-shadow,opacity] !duration-200 hover:shadow-[0_4px_24px_rgba(47,91,255,0.55)] active:translate-y-px min-[1920px]:!px-[34px] min-[1920px]:!py-[15px] min-[1920px]:!text-[13px]'

/** Kepler orbital mark, same geometry as the app. */
function KeplerMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-28 12 12)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="3.1" fill="currentColor" />
      <circle cx="19.3" cy="7.7" r="1.6" fill="currentColor" />
    </svg>
  )
}

/**
 * Launch spotlight for Kepler: a floating card in the corner that expands into a
 * full-screen takeover. The x only hides it for this page view; it is back on the next load.
 */
export function KeplerLaunch() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const hide = useCallback(() => {
    setOpen(false)
    setHidden(true)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (hidden) return null

  const dur = (d: number) => (prefersReducedMotion ? 0 : d)

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="takeover"
          role="dialog"
          aria-modal="true"
          aria-label="Kepler launch"
          className="fixed inset-0 z-[3000] grid grid-rows-[minmax(0,42%)_1fr] bg-[var(--ink)] text-[var(--bg)] lg:grid-cols-[minmax(380px,42%)_1fr] lg:grid-rows-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: dur(0.3), ease: EASE }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 rounded-full border border-white/15 bg-[var(--ink)]/60 p-2.5 text-[var(--faint)] backdrop-blur transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] sm:top-6 sm:right-6"
          >
            <X className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>

          {/* Poster: top on mobile, right on desktop */}
          <motion.div
            layoutId="kepler-launch-poster"
            className="relative order-1 min-h-0 overflow-hidden lg:order-2"
            transition={{ duration: dur(0.55), ease: EASE }}
          >
            <Image
              src={POSTER}
              alt="Kepler, the SRE IDE by RubixKube. Find calm in the chaos."
              fill
              priority
              sizes="100vw"
              className="object-cover object-[35%_center]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--ink)]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[var(--ink)]/60 lg:via-transparent lg:to-transparent" />
          </motion.div>

          {/* Copy panel */}
          <motion.div
            className="order-2 flex min-h-0 flex-col justify-center overflow-y-auto px-6 py-8 sm:px-10 lg:order-1 lg:px-14 lg:py-12"
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur(0.5), ease: EASE, delay: dur(0.12) }}
          >
            <div className="mb-8 flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-[12px] tracking-[0.18em] text-[var(--faint)] uppercase lg:mb-12">
              <KeplerMark className="h-5 w-5 text-white" />
              <span className="text-white">Kepler</span>
              <span className="text-[var(--text-muted)]">·</span>
              <span>by RubixKube</span>
            </div>

            <p className={cn('mb-4 font-[family-name:var(--font-mono)] text-[var(--faint)]', rkMono11)}>
              Just launched
            </p>
            <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.02] font-light tracking-[-0.01em] text-white">
              The SRE IDE,
              <br />
              <em className="italic text-[#8fa6ff]">on your machine.</em>
            </h2>
            <p
              className={cn(
                'mt-6 max-w-[34rem] font-[family-name:var(--font-mono)] font-light leading-[1.65] tracking-[-0.01em] text-[var(--faint)]',
                rkMono13,
              )}
            >
              A desktop AI agent for the people on call. Kepler learns your systems and remembers every incident,
              so the next one is faster than the last.
            </p>
            <ul className={cn('mt-6 hidden space-y-2.5 font-[family-name:var(--font-mono)] font-light text-white/85 sm:block', rkMono11)}>
              {proofPoints.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 shrink-0 text-[#8fa6ff]" strokeWidth={1.5} aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 lg:mt-10">
              <Button asChild variant="primary" className={primaryCtaClass}>
                <Link href={KEPLER_URL} target="_blank" rel="noopener noreferrer">
                  Try Kepler
                </Link>
              </Button>
              <Link
                href="/platform#kepler"
                onClick={() => setOpen(false)}
                className="group inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[13px] font-medium text-[var(--faint)] underline decoration-1 underline-offset-4 transition-colors hover:text-white"
              >
                See how it works
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="card"
          className="fixed right-4 bottom-4 z-[95] w-[220px] sm:right-6 sm:bottom-6 sm:w-[264px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: dur(0.5), ease: EASE, delay: dur(1.2) }}
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity }}
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="See the Kepler launch"
              className="group block w-full overflow-hidden rounded-[10px] border border-white/10 bg-[var(--ink)] text-left shadow-[0_18px_50px_-12px_rgba(17,19,24,0.55)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-12px_rgba(47,91,255,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            >
              <motion.div
                layoutId="kepler-launch-poster"
                className="relative aspect-[16/9] w-full overflow-hidden"
                transition={{ duration: dur(0.55), ease: EASE }}
              >
                <Image
                  src={POSTER}
                  alt=""
                  fill
                  sizes="264px"
                  className="object-cover object-[35%_center] transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </motion.div>
              <div className="flex items-center gap-2.5 px-3.5 py-3 font-[family-name:var(--font-mono)] text-[var(--bg)]">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-[var(--blue)] opacity-75"
                    style={prefersReducedMotion ? undefined : { animation: 'rk-pulse 2.4s ease-in-out infinite' }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--blue)]" />
                </span>
                <span className="min-w-0 flex-1 truncate text-[11px] tracking-[0.02em] sm:text-[12px]">
                  <span className="font-medium text-white">Kepler</span>
                  <span className="text-[var(--faint)]"> is out. The SRE IDE.</span>
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--faint)] transition-transform group-hover:translate-x-0.5 group-hover:text-white" strokeWidth={2} aria-hidden />
              </div>
            </button>
            <button
              type="button"
              onClick={hide}
              aria-label="Hide Kepler launch card"
              className="absolute -top-2 -right-2 rounded-full border border-white/15 bg-[var(--ink)] p-1 text-[var(--faint)] shadow transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)]"
            >
              <X className="h-3 w-3" strokeWidth={2} aria-hidden />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
