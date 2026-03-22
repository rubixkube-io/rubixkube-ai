'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionLabel } from '@/components/ui/section-label'
import { landingCtaArrowSmClass, landingCtaLinkSm } from '@/lib/landing-inline-cta'
import { Reveal } from './reveal'

export function RcaSection() {
  return (
    <section className="landing-snap-section flex min-h-[calc(100vh-64px)] flex-col justify-center px-[var(--pad)] py-20 lg:h-[calc(100vh-64px)]">
      <div className="rk-landing-max w-full">
      <SectionLabel className="mb-6">Magic insights</SectionLabel>
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)]">
            Root cause,
            <br />
            not just
            <br />
            <em className="italic text-[var(--blue)]">the symptom.</em>
          </h2>
          <div className="mt-8 space-y-4 font-[family-name:var(--font-mono)] text-[13px] font-light leading-relaxed tracking-[-0.01em] text-[var(--mid)]">
            <p>
              Every anomaly surfaces with a complete investigation: observed conditions, causal chain, and
              recommended actions.
            </p>
            <p>An answer, with evidence. Not just an alert.</p>
            <Link href="/platform" className={`mt-8 w-fit ${landingCtaLinkSm}`}>
              Explore the platform
              <ArrowRight className={landingCtaArrowSmClass} strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="overflow-hidden rounded-lg border border-[var(--rule)] bg-[var(--bg)] font-[family-name:var(--font-mono)] text-xs">
            <div className="flex items-center justify-between border-b border-[var(--rule)] px-[18px] py-3.5">
              <span className="text-[11px] font-medium tracking-wide text-[var(--ink)]">
                payments-api · CrashLoopBackOff (restart count: 5)
              </span>
              <span className="rounded border border-[rgba(200,48,48,0.2)] bg-[rgba(200,48,48,0.08)] px-2 py-0.5 text-[9px] tracking-[0.12em] text-[var(--red)] uppercase">
                RCA
              </span>
            </div>
            <div className="border-b border-[var(--rule)] px-[18px] py-3.5">
              <p className="mb-2 text-[8px] tracking-[0.22em] text-[var(--text-muted)] uppercase">Root Cause</p>
              <div className="rounded-r border-l-2 border-[var(--blue)] bg-[rgba(47,91,255,0.05)] px-3 py-2.5 text-[11px] leading-relaxed text-[var(--mid)]">
                redis-cluster memory limit reached, triggering key eviction cascade into session-service, causing
                payments-api initialization failures.
              </div>
              <div className="mt-1.5 text-right">
                <span className="rounded border border-[rgba(26,144,96,0.25)] bg-[rgba(26,144,96,0.08)] px-2 py-0.5 text-[9px] tracking-[0.1em] text-[var(--green)] uppercase">
                  Complete
                </span>
              </div>
            </div>
            <div className="border-b border-[var(--rule)] px-[18px] py-3.5">
              <p className="mb-2 text-[8px] tracking-[0.22em] text-[var(--text-muted)] uppercase">Observed Conditions</p>
              <ul className="space-y-1 text-[11px] leading-snug text-[var(--mid)]">
                <li className="flex gap-2 before:content-['·'] before:text-[var(--text-muted)]">
                  redis-cluster memory at 98.4% — eviction policy active
                </li>
                <li className="flex gap-2 before:content-['·'] before:text-[var(--text-muted)]">
                  session-service p99 latency increased 8× over baseline
                </li>
                <li className="flex gap-2 before:content-['·'] before:text-[var(--text-muted)]">
                  payments-api startup fails on session token validation
                </li>
              </ul>
            </div>
            <div className="px-[18px] py-3.5">
              <p className="mb-2 text-[8px] tracking-[0.22em] text-[var(--text-muted)] uppercase">Recommended Actions</p>
              <div className="space-y-1">
                <div className="flex gap-2.5 py-1">
                  <span className="mt-0.5 shrink-0 rounded border border-[rgba(200,48,48,0.2)] bg-[rgba(200,48,48,0.08)] px-1.5 py-0.5 text-[8px] tracking-[0.14em] text-[var(--red)]">
                    HIGH
                  </span>
                  <span className="text-[11px] leading-snug text-[var(--mid)]">
                    Scale redis-cluster memory limit from 2 GB → 4 GB immediately.
                  </span>
                </div>
                <div className="flex gap-2.5 py-1">
                  <span className="mt-0.5 shrink-0 rounded border border-[rgba(180,120,0,0.2)] bg-[rgba(180,120,0,0.08)] px-1.5 py-0.5 text-[8px] tracking-[0.14em] text-[#b47800]">
                    MED
                  </span>
                  <span className="text-[11px] leading-snug text-[var(--mid)]">
                    Add memory pressure alerting threshold at 80% to catch this earlier.
                  </span>
                </div>
                <div className="flex gap-2.5 py-1">
                  <span className="mt-0.5 shrink-0 rounded border border-[rgba(180,120,0,0.2)] bg-[rgba(180,120,0,0.08)] px-1.5 py-0.5 text-[8px] tracking-[0.14em] text-[#b47800]">
                    MED
                  </span>
                  <span className="text-[11px] leading-snug text-[var(--mid)]">
                    Review session-service retry policy — current config amplifies cascades.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      </div>
    </section>
  )
}
