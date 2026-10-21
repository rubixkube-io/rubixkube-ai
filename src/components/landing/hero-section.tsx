'use client'

import Link from 'next/link'
import { HeroLink } from '@/components/hero-link'
import { FeaturedFilm } from '@/components/featured-film'
import { CustomerLogoTicker } from './customer-logo-ticker'
import { HeroBloom } from './hero-bloom'
import { ArrowRight } from 'lucide-react'

const CONSOLE_URL = 'https://console.rubixkube.ai'
const KEPLER_URL = 'https://trykepler.rubixkube.ai'

/**
 * The first screen: one large headline in a single colour, the opening paragraph, one button
 * and a quiet text link. The customer logos follow as a ticker that ends the cover.
 */
export function HeroSection() {
  return (
    <div className="relative shrink-0 snap-start">
      <div className="relative isolate overflow-hidden px-[var(--pad)]">
        <HeroBloom className="pointer-events-none absolute inset-0 -z-10 h-full w-full max-md:hidden" />
        <div className="rk-landing-max flex flex-col gap-9 pt-12 pb-12 sm:gap-[clamp(2.5rem,6vh,4rem)] sm:pt-[clamp(3rem,10vh,8rem)] sm:pb-[clamp(2.5rem,6vh,4rem)]">
          <h1 className="rk-cover-title m-0 -ml-[0.03em] max-w-[14ch] text-start text-[var(--ink)]">
            For people who keep systems running.
          </h1>

          <div>
            <p className="rk-cover-lede m-0 max-w-[44em] text-pretty text-[color-mix(in_oklab,var(--ink)_68%,var(--bg))]">
              <strong className="font-semibold text-[var(--ink)]">RubixKube</strong> is an{' '}
              <HeroLink href="/compare/ai-sre-tools-2026" accent>AI SRE platform</HeroLink> that{' '}
              <em className="italic">understands</em> your infrastructure,{' '}
              <br className="max-md:hidden" />
              <HeroLink href="/glossary/mean-time-to-understand">finds the root cause</HeroLink> of every incident,
              opens the fix and{' '}
              <HeroLink href="/blog/aiops-auto-remediation-memory-failure">remembers what worked</HeroLink>.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 sm:mt-9">
              <Link
                href={CONSOLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center rounded-[6px] bg-[var(--blue)] px-6 font-[family-name:var(--font-figtree)] text-[16px] font-medium text-white transition-[box-shadow] duration-200 hover:shadow-[0_6px_24px_rgba(47,91,255,0.35)] active:translate-y-px"
              >
                Start for free
              </Link>
              <Link
                href={KEPLER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-[family-name:var(--font-figtree)] text-[16px] font-medium text-[var(--ink)]"
              >
                Try Kepler
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-3">
        <CustomerLogoTicker />
      </div>
    </div>
  )
}

/**
 * The console panel and the film, one screen of its own right after the hero, with the card
 * centred in it. The card is never taller than the screen, so its top still shows under the hero.
 */
export function FilmSection() {
  return (
    <section className="landing-snap-section flex items-center px-[var(--pad)] py-8 lg:py-0">
      <div className="rk-landing-max">
        {/* never taller than the screen: the panel is 16:9, so its width follows the height left */}
        <div className="mx-auto w-full lg:max-w-[calc((100vh-var(--nav-stack)-5rem)*16/9)]">
          <FeaturedFilm />
        </div>
      </div>
    </section>
  )
}
