'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { landingCtaArrowSmClass, landingCtaLinkSmCaps } from '@/lib/landing-inline-cta'
import { rkMono10, rkMono11, rkMonoXs } from '@/lib/landing-responsive-type'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

export function MetricsSection() {
  return (
    <section
      id="landing-metrics"
      className="landing-snap-section flex min-h-[calc(100vh-var(--nav-stack))] flex-col justify-center border-t border-[var(--rule)] px-[var(--pad)] py-20 lg:h-[calc(100vh-var(--nav-stack))]"
    >
      <div className="rk-landing-max w-full">
        <div className="mb-[72px] grid grid-cols-1 items-end gap-10 md:grid-cols-2 md:gap-[80px]">
        <Reveal>
          <h2 className="rk-landing-h2-std font-[family-name:var(--font-serif)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)]">
            What happens <br /> 
            when your stack <br />
            <em className="italic text-[var(--blue)]"> thinks for itself.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex flex-col items-start">
            <p
              className={cn(
                'font-[family-name:var(--font-mono)] tracking-[0.22em] text-[var(--mid)] uppercase',
                rkMono10,
              )}
            >
              Early results from production deployments
            </p>
            <p
              className={cn(
                'mt-2 font-[family-name:var(--font-mono)] font-light leading-relaxed text-[var(--text-muted)]',
                rkMono11,
              )}
            >
              Measured avg across 12 teams
            </p>
            <Link href="/pricing" className={`mt-8 ${landingCtaLinkSmCaps}`}>
              View pricing
              <ArrowRight className={landingCtaArrowSmClass} strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </Reveal>
        </div>

        {/*
        Border-drawn grid (not gap-px + bg) — avoids double-thick seams, subpixel gaps, and misaligned T-junctions
        at column boundaries. Matches redesign.html intent: single 1px rules everywhere.
      */}
        <Reveal
          delay={0.12}
          className="isolate border border-[var(--rule)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex min-h-0 flex-col border-b border-[var(--rule)] md:border-r md:border-b-0">
            <div className="flex min-h-0 flex-1 flex-col gap-3 border-b border-[var(--rule)] bg-[var(--bg)] p-12 transition-colors hover:bg-white">
              <div className="font-[family-name:var(--font-serif)] text-[clamp(3.5rem,6vw,5.5rem)] leading-none font-normal tracking-[-0.03em] text-[var(--blue)]">
                220<span className="text-[0.32em] font-light tracking-normal text-[var(--mid)]"> hrs</span>
              </div>
              <p
                className={cn(
                  'font-[family-name:var(--font-mono)] tracking-[0.16em] text-[var(--mid)] uppercase',
                  rkMono10,
                )}
              >
                Eng-hrs saved / month
              </p>
            <p
              className={cn(
                'mt-1 font-[family-name:var(--font-mono)] font-light leading-[1.65] text-[var(--text-muted)]',
                rkMonoXs,
              )}
            >
              Time your team gets back every month.
                <br />
                To build, not firefight.
              </p>
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3 bg-[var(--bg)] p-12 transition-colors hover:bg-white">
              <div className="font-[family-name:var(--font-serif)] text-[clamp(3.5rem,6vw,5.5rem)] leading-none font-normal tracking-[-0.03em] text-[var(--green)]">
                $6K<span className="text-[0.32em] font-light tracking-normal text-[var(--mid)]"> /mo</span>
              </div>
              <p
                className={cn(
                  'font-[family-name:var(--font-mono)] tracking-[0.16em] text-[var(--mid)] uppercase',
                  rkMono10,
                )}
              >
                Avg engineering cost saved
              </p>
            </div>
          </div>

          <div className="grid min-h-0 grid-cols-2 grid-rows-2">
            {[
              { n: '2.8', u: ' min', c: 'text-[var(--green)]', l: 'Mean time to understand' },
              { n: '21', u: '×', c: 'text-[var(--blue)]', l: 'Faster than manual investigations' },
              { n: '98', u: '%', c: 'text-[var(--ink)]', l: 'Issue Detection rate' },
              { n: '90', u: '%', c: 'text-[var(--ink)]', l: 'Reduction in alert noise' },
            ].map((s, i) => {
              const isRightCol = i % 2 === 1
              const isBottomRow = i >= 2
              return (
                <div
                  key={s.l}
                  className={`flex min-h-0 flex-col gap-2.5 bg-[var(--bg)] px-9 py-10 transition-colors hover:bg-white ${!isRightCol ? 'border-r border-[var(--rule)]' : ''} ${!isBottomRow ? 'border-b border-[var(--rule)]' : ''}`}
                >
                  <div
                    className={`font-[family-name:var(--font-serif)] text-[clamp(2.25rem,4vw,3.5rem)] leading-none font-normal tracking-[-0.02em] ${s.c}`}
                  >
                    {s.n}
                    <span className="text-[0.4em] font-light tracking-normal text-[var(--mid)]">{s.u}</span>
                  </div>
                  <p
                    className={cn(
                      'font-[family-name:var(--font-mono)] tracking-[0.16em] text-[var(--mid)] uppercase',
                      rkMono10,
                    )}
                  >
                    {s.l}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </Reveal>
      </div>
    </section>
  )
}
