'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionLabel } from '@/components/ui/section-label'
import { landingCtaArrowSmClass, landingCtaLinkSm } from '@/lib/landing-inline-cta'
import { rkMono9, rkMono10, rkMono11, rkMono13, rkMonoXs } from '@/lib/landing-responsive-type'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

export function RcaSection() {
  return (
    <section className="landing-snap-section flex min-h-[calc(100vh-var(--nav-stack))] flex-col justify-center px-[var(--pad)] py-20 lg:h-[calc(100vh-var(--nav-stack))]">
      <div className="rk-landing-max w-full">
      <SectionLabel className="mb-6">Magic insights</SectionLabel>
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="rk-landing-h2-std font-[family-name:var(--font-serif)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)]">
            Root cause,
            <br />
            not just
            <br />
            <em className="italic text-[var(--blue)]">the symptom.</em>
          </h2>
          <div
            className={cn(
              'mt-8 space-y-4 font-[family-name:var(--font-mono)] font-light leading-relaxed tracking-[-0.01em] text-[var(--mid)]',
              rkMono13,
            )}
          >
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
          <div
            className={cn(
              'overflow-hidden rounded-lg border border-[var(--rule)] bg-[var(--bg)] font-[family-name:var(--font-mono)]',
              rkMonoXs,
            )}
          >
            <div className="flex items-center justify-between border-b border-[var(--rule)] px-[18px] py-3.5">
              <span className={cn('font-medium tracking-wide text-[var(--ink)]', rkMono11)}>
                payments-api · CrashLoopBackOff (restart count: 5)
              </span>
              <span
                className={cn(
                  'rounded border border-[rgba(200,48,48,0.2)] bg-[rgba(200,48,48,0.08)] px-2 py-0.5 tracking-[0.12em] text-[var(--red)] uppercase',
                  rkMono9,
                )}
              >
                RCA
              </span>
            </div>
            <div className="border-b border-[var(--rule)] px-[18px] py-3.5">
              <p className={cn('mb-2 tracking-[0.22em] text-[var(--text-muted)] uppercase', rkMono10)}>
                Root Cause
              </p>
              <div
                className={cn(
                  'rounded-r border-l-2 border-[var(--blue)] bg-[rgba(47,91,255,0.05)] px-3 py-2.5 leading-relaxed text-[var(--mid)]',
                  rkMono11,
                )}
              >
                redis-cluster memory limit reached, triggering key eviction cascade into session-service, causing
                payments-api initialization failures.
              </div>
              <div className="mt-1.5 text-right">
                <span
                  className={cn(
                    'rounded border border-[rgba(26,144,96,0.25)] bg-[rgba(26,144,96,0.08)] px-2 py-0.5 tracking-[0.1em] text-[var(--green)] uppercase',
                    rkMono9,
                  )}
                >
                  Complete
                </span>
              </div>
            </div>
            <div className="border-b border-[var(--rule)] px-[18px] py-3.5">
              <p className={cn('mb-2 tracking-[0.22em] text-[var(--text-muted)] uppercase', rkMono10)}>
                Observed Conditions
              </p>
              <ul className={cn('space-y-1 leading-snug text-[var(--mid)]', rkMono11)}>
                <li className="flex gap-2 before:content-['·'] before:text-[var(--text-muted)]">
                  redis-cluster memory at 98.4%; eviction policy active
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
              <p className={cn('mb-2 tracking-[0.22em] text-[var(--text-muted)] uppercase', rkMono10)}>
                Recommended Actions
              </p>
              <div className="space-y-1">
                <div className="flex gap-2.5 py-1">
                  <span
                    className={cn(
                      'mt-0.5 shrink-0 rounded border border-[rgba(200,48,48,0.2)] bg-[rgba(200,48,48,0.08)] px-1.5 py-0.5 tracking-[0.14em] text-[var(--red)]',
                      rkMono10,
                    )}
                  >
                    HIGH
                  </span>
                  <span className={cn('leading-snug text-[var(--mid)]', rkMono11)}>
                    Scale redis-cluster memory limit from 2 GB → 4 GB immediately.
                  </span>
                </div>
                <div className="flex gap-2.5 py-1">
                  <span
                    className={cn(
                      'mt-0.5 shrink-0 rounded border border-[rgba(180,120,0,0.2)] bg-[rgba(180,120,0,0.08)] px-1.5 py-0.5 tracking-[0.14em] text-[#b47800]',
                      rkMono10,
                    )}
                  >
                    MED
                  </span>
                  <span className={cn('leading-snug text-[var(--mid)]', rkMono11)}>
                    Add memory pressure alerting threshold at 80% to catch this earlier.
                  </span>
                </div>
                <div className="flex gap-2.5 py-1">
                  <span
                    className={cn(
                      'mt-0.5 shrink-0 rounded border border-[rgba(180,120,0,0.2)] bg-[rgba(180,120,0,0.08)] px-1.5 py-0.5 tracking-[0.14em] text-[#b47800]',
                      rkMono10,
                    )}
                  >
                    MED
                  </span>
                  <span className={cn('leading-snug text-[var(--mid)]', rkMono11)}>
                    Review session-service retry policy; current config amplifies cascades.
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
