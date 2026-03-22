'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { PartnerLogoRow } from './partner-logos'

const CALENDLY = 'https://calendly.com/rubixkube-ai/30min'
const SRI_MANIFESTO_HREF = '/blog/the-age-of-site-reliability-intelligence-sri'

const TRUTHS = [
  { metric: '4.1 min', label: 'from alert to root cause', truth: 'not hours. minutes.' },
  { metric: '100%', label: 'detection rate', truth: 'nothing slips through.' },
  { metric: '90% less', label: 'alert noise', truth: 'your team only sees what matters.' },
  { metric: '55 hrs', label: 'saved per engineer, per week', truth: 'spend it building, not firefighting.' },
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

  const scrollToMetrics = () => {
    document.getElementById('landing-metrics')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="landing-hero-slide relative">
      <Link
        href={SRI_MANIFESTO_HREF}
        className="absolute top-1/2 left-[var(--pad)] z-10 hidden -translate-y-1/2 -rotate-90 whitespace-nowrap font-[family-name:var(--font-mono)] text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase transition-colors hover:text-[var(--ink)] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] sm:block"
      >
        Site Reliability Intelligence
      </Link>
      <span
        className="pointer-events-none absolute top-1/2 right-[var(--pad)] z-10 hidden -translate-y-1/2 rotate-90 whitespace-nowrap font-[family-name:var(--font-mono)] text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase sm:block"
        aria-hidden
      >
        Memory · Safety · Explainability
      </span>

      <div className="flex min-h-0 flex-1 flex-col px-[var(--pad)]">
        <div className="rk-landing-max flex min-h-0 w-full flex-1 flex-col items-center justify-center text-center">
        <p className="rk-hero-eyebrow mb-8 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] text-[var(--mid)] uppercase">
          Beyond Observability
        </p>

        {/* No max-width — matches redesign.html .headline so line breaks stay editorial (e.g. “While you sleep.” one line). */}
        <h1 className="rk-hero-headline w-full max-w-none text-[clamp(4rem,8.5vw,7.5rem)] tracking-[-0.01em] text-[var(--ink)]">
          Your infra,
          <br />
          <span className="rk-hero-headline-accent text-[var(--blue)]">healing itself.</span>
          <br />
          <span className="rk-hero-headline-muted">While you sleep.</span>
        </h1>

        <div className="rk-hero-rule my-9 h-12 w-px bg-[var(--faint)]" aria-hidden />

        <p className="rk-hero-sub font-[family-name:var(--font-mono)] text-[13px] font-light leading-[1.65] tracking-[-0.01em] text-[var(--mid)]">
          Detects anomalies. Diagnoses root cause.
          <br />
          Resolves failures. Autonomously.
        </p>

        <div className="rk-hero-cta mt-8 flex flex-wrap items-center justify-center gap-4">
          <CalendlyBooking
            url={CALENDLY}
            variant="primary"
            className="!rounded-[6px] !border-0 !bg-[var(--blue)] !px-[30px] !py-[13px] !text-[11px] !font-light !tracking-[0.1em] !text-white !uppercase"
          >
            Book a Demo
          </CalendlyBooking>
          <button
            type="button"
            onClick={scrollToMetrics}
            className="cursor-pointer rounded-[6px] border border-[var(--faint)] bg-transparent px-6 py-[13px] font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-[var(--mid)] uppercase transition-colors hover:border-[var(--mid)]"
          >
            See how it works ↓
          </button>
        </div>

        <div className="rk-hero-status mt-10 flex items-center justify-center gap-3">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--blue)]"
            style={
              prefersReducedMotion ? undefined : { animation: 'rk-pulse 2.4s ease-in-out infinite' }
            }
          />
          <p
            className="rk-hero-status-text font-[family-name:var(--font-mono)] text-[13px] text-[var(--mid)] transition-opacity duration-300"
            style={{ opacity }}
          >
            <span className="text-[var(--blue)]">{t.metric}</span>
            <span className="mx-[10px] text-[var(--text-muted)]">·</span>
            <span className="text-[var(--ink)]">{t.label}</span>
            <span className="mx-[10px] text-[var(--text-muted)]">·</span>
            <span className="text-[var(--mid)]">{t.truth}</span>
          </p>
        </div>
        </div>
      </div>

      <div className="rk-marquee-bar">
        <span className="rk-marquee-label">Trusted by</span>
        <div className="rk-marquee-track">
          <div className="rk-marquee-inner">
            <PartnerLogoRow />
          </div>
        </div>
      </div>
    </div>
  )
}
