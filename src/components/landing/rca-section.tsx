'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionLabel } from '@/components/ui/section-label'
import { landingCtaArrowSmClass, landingCtaLinkSm } from '@/lib/landing-inline-cta'
import { rkMono13 } from '@/lib/landing-responsive-type'
import { cn } from '@/lib/utils'
import { Backdrop, Float } from '@/components/console-shot'
import { Reveal } from './reveal'

export function RcaSection() {
  return (
    <section className="landing-snap-section flex min-h-[calc(100vh-var(--nav-stack))] flex-col justify-center px-[var(--pad)] py-20 lg:h-[calc(100vh-var(--nav-stack))]">
      <div className="rk-landing-max w-full">
      <SectionLabel className="mb-6">Investigation</SectionLabel>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
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
              Every incident comes with a complete investigation: the impact, the root cause and the fix, with
              evidence for every claim.
            </p>
            <p>An answer, with evidence. Not just an alert.</p>
            <Link href="/platform" className={`mt-8 w-fit ${landingCtaLinkSm}`}>
              Explore the platform
              <ArrowRight className={landingCtaArrowSmClass} strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <Backdrop className="aspect-[4/3]">
            <Float
              name="part-root-cause"
              w={2360}
              h={940}
              width={1.3}
              left={7}
              top={10}
              alt="An RCA in the RubixKube console: the impact, the root cause, and Was this the cause? with Right, Partly right and Wrong"
            />
          </Backdrop>
        </Reveal>
      </div>
      </div>
    </section>
  )
}
