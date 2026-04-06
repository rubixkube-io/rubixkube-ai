'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { rkMono13 } from '@/lib/landing-responsive-type'
import { cn } from '@/lib/utils'
import { CustomerLogoGrid } from './partner-logos'

const CALENDLY = 'https://calendly.com/rubixkube-ai/30min'
const CONSOLE_URL = 'https://console.rubixkube.ai'

const heroPrimaryCtaClass =
  '!rounded-[6px] !border-0 !bg-[var(--blue)] !px-[30px] !py-[13px] !text-[11px] !font-light !tracking-[0.1em] !text-white !uppercase min-[1920px]:!px-[34px] min-[1920px]:!py-[15px] min-[1920px]:!text-[13px] min-[2560px]:!text-sm'

const heroOutlineCtaClass =
  'font-[family-name:var(--font-mono)] !rounded-[6px] !border !border-[var(--faint)] !bg-transparent !px-6 !py-[13px] !text-[11px] !font-light !tracking-[0.1em] !text-[var(--mid)] !uppercase transition-colors hover:!border-[var(--mid)] min-[1920px]:!px-7 min-[1920px]:!py-[15px] min-[1920px]:!text-[13px] min-[2560px]:!text-sm'
const SRI_MANIFESTO_HREF = '/blog/the-age-of-site-reliability-intelligence-sri'

const TRUTHS = [
  { metric: '2.8 min', label: 'mean time to understand', truth: 'not hours. minutes.' },
  { metric: '98%', label: 'detection rate', truth: 'nothing slips through.' },
  { metric: '90% less', label: 'alert noise', truth: 'your team only sees what matters.' },
  { metric: '55 hrs', label: 'team eng-hrs saved per week', truth: 'focuse on shipping features, not fixing' },
  { metric: 'zero', label: 'new tools to adopt', truth: 'plugs into your existing stack on day one.' },
  { metric: 'gets smarter', label: 'with every incident', truth: 'the longer it runs, the better it gets.' },
] as const

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const [si, setSi] = useState(0)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setOpacity(0)
      setTimeout(() => {
        setSi((i) => (i + 1) % TRUTHS.length)
        setOpacity(1)
      }, 400)
    }, 7000)
    return () => clearInterval(id)
  }, [])

  const t = TRUTHS[si]

  return (
    <div className="landing-hero-slide relative">
      <Link
        href={SRI_MANIFESTO_HREF}
        className="absolute top-1/2 left-[var(--pad)] z-10 hidden -translate-y-1/2 -rotate-90 whitespace-nowrap font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-[var(--text-muted)] uppercase transition-colors hover:text-[var(--ink)] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] min-[1920px]:text-[13px] min-[2560px]:text-[14px] lg:block"
      >
        Site Reliability Intelligence
      </Link>
      <span
        className="pointer-events-none absolute top-1/2 right-[var(--pad)] z-10 hidden -translate-y-1/2 rotate-90 whitespace-nowrap font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-[var(--text-muted)] uppercase min-[1920px]:text-[13px] min-[2560px]:text-[14px] lg:block"
        aria-hidden
      >
        Memory · Safety · Resilience
      </span>

      <div className="flex min-h-0 flex-1 flex-col px-[var(--pad)]">
        <div className="rk-landing-max flex min-h-0 w-full flex-1 flex-col items-center justify-center text-center">

          <p className="rk-hero-eyebrow mb-4 font-[family-name:var(--font-mono)] tracking-[0.3em] text-[var(--mid)] uppercase sm:mb-8">
            Beyond Observability
          </p>

          <h1 className="rk-hero-headline rk-hero-display w-full max-w-none tracking-[-0.01em] text-[var(--ink)]">
            Your infra,
            <br />
            <span className="rk-hero-headline-accent text-[var(--blue)]">healing itself.</span>
            <br />
            <span className="rk-hero-headline-muted">While you sleep.</span>
          </h1>

          <div className="rk-hero-rule !hidden h-12 w-px bg-[var(--faint)] sm:my-9 sm:!block" aria-hidden />

          <p
            className={cn(
              'rk-hero-sub mt-7 font-[family-name:var(--font-mono)] font-light leading-[1.65] tracking-[-0.01em] text-[var(--mid)] max-sm:text-[13px] sm:mt-0',
              rkMono13,
            )}
          >
            Detects anomalies. Diagnoses root cause.
            <br />
            Resolves failures. Autonomously.
          </p>

          <div className="rk-hero-cta mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
            <Button asChild variant="primary" className={heroPrimaryCtaClass}>
              <Link href={CONSOLE_URL} target="_blank" rel="noopener noreferrer">
                Start for Free →
              </Link>
            </Button>
            <CalendlyBooking url={CALENDLY} variant="outline" className={heroOutlineCtaClass}>
              Book a Demo
            </CalendlyBooking>
          </div>

          <div className="rk-hero-status mt-5 flex items-center justify-center gap-2 sm:mt-10 sm:gap-3">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--blue)]"
              style={
                prefersReducedMotion ? undefined : { animation: 'rk-pulse 2.4s ease-in-out infinite' }
              }
            />
            <p
              className={cn(
                'rk-hero-status-text font-[family-name:var(--font-mono)] text-[var(--mid)] transition-opacity duration-300 max-sm:text-[11px]',
                rkMono13,
              )}
              style={{ opacity }}
            >
              <span className="text-[var(--blue)]">{t.metric}</span>
              <span className="mx-1 text-[var(--text-muted)] sm:mx-[10px]">·</span>
              <span className="text-[var(--ink)]">{t.label}</span>
              <span className="hidden sm:inline">
                <span className="mx-[10px] text-[var(--text-muted)]">·</span>
                <span className="text-[var(--mid)]">{t.truth}</span>
              </span>
            </p>
          </div>

        </div>
      </div>

      <div className="flex w-full shrink-0 flex-row items-center border-t border-[var(--rule)] bg-[var(--bg)]">
        <span className="rk-marquee-label max-sm:px-3 max-sm:text-[10px] sm:py-0">
          Trusted by
        </span>
        <div className="flex min-h-0 flex-1 items-center overflow-hidden px-3 py-3 sm:px-[var(--pad)] sm:py-4 md:px-8">
          <CustomerLogoGrid />
        </div>
      </div>
    </div>
  )
}
