'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { outlineBlueAccentMd } from '@/lib/outline-blue-cta'
import { rkMono9, rkMono13 } from '@/lib/landing-responsive-type'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

const CALENDLY = 'https://calendly.com/rubixkube-ai/30min'

export function ClosingLandingSection() {
  return (
    <section className="landing-snap-section flex min-h-[calc(100vh-var(--nav-stack))] items-center border-t border-[var(--rule)] px-[var(--pad)] py-20 lg:h-[calc(100vh-var(--nav-stack))]">
      <div className="rk-landing-max w-full">
      <div className="mx-auto w-full max-w-4xl text-center">
        <Reveal>
          <p
            className={cn(
              'mb-10 font-[family-name:var(--font-mono)] tracking-[0.28em] text-[var(--text-muted)] uppercase',
              rkMono9,
            )}
          >
            The result
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="rk-landing-h2-std mb-12 font-[family-name:var(--font-serif)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)]">
            Not a faster tool.
            <br />
            <em className="italic text-[var(--blue)]">A smarter system.</em>
            <br />
            <span className="text-[var(--text-soft)]">That&apos;s entirely yours.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p
            className={cn(
              'mx-auto -mt-6 max-w-xl font-[family-name:var(--font-mono)] font-light leading-[1.65] tracking-[-0.01em] text-[var(--mid)]',
              rkMono13,
            )}
          >
            Every incident you resolve without RubixKube is context it never learns from.
          </p>
        </Reveal>
        <Reveal delay={0.22} className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
          <CalendlyBooking url={CALENDLY} variant="primary" size="md">
            Book a Demo
          </CalendlyBooking>
          <Button asChild variant="outline" size="md" className={outlineBlueAccentMd}>
            <Link href="/assets/whitepaper.pdf">Read the whitepaper →</Link>
          </Button>
        </Reveal>
      </div>
      </div>
    </section>
  )
}
