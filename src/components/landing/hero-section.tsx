'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeroLink } from '@/components/hero-link'
import { outlineBlueAccentMd } from '@/lib/outline-blue-cta'
import { cn } from '@/lib/utils'
import { CustomerLogoGrid } from './partner-logos'
import { Rocket } from 'lucide-react'

const CONSOLE_URL = 'https://console.rubixkube.ai'
const KEPLER_URL = 'https://trykepler.rubixkube.ai'

const heroPrimaryCtaClass =
  '!rounded-[6px] !border-0 !bg-[var(--blue)] !px-[30px] !py-[13px] !text-[12px] !font-medium !tracking-[0.12em] !text-white !uppercase shadow-[0_1px_2px_rgba(17,19,24,0.06)] !transition-[box-shadow,opacity] !duration-200 hover:!opacity-100 hover:shadow-[0_4px_20px_rgba(47,91,255,0.38)] active:translate-y-px active:shadow-[0_1px_4px_rgba(47,91,255,0.25)] min-[1920px]:!px-[34px] min-[1920px]:!py-[15px] min-[1920px]:!text-[13px] min-[2560px]:!text-sm'

/** The first screen: one promise, who it is for and what it does, two ways in, and who uses it. */
export function HeroSection() {
  return (
    <div className="landing-hero-slide relative">
      <div className="flex min-h-0 flex-1 flex-col px-[var(--pad)]">
        <div className="rk-landing-max flex min-h-0 w-full flex-1 flex-col items-center justify-center text-center">
          <h1 className="rk-hero-headline rk-hero-display max-sm:!text-[10vw] w-full max-w-none tracking-[-0.01em] text-[var(--ink)]">
            <span className="whitespace-nowrap">For people who</span>
            <br />
            <span className="whitespace-nowrap">
              keep systems <span className="rk-hero-headline-accent text-[var(--blue)]">running.</span>
            </span>
          </h1>

          <p
            className={cn(
              'rk-hero-sub mt-8 max-w-[56ch] text-balance font-[family-name:var(--font-mono)] font-light leading-[1.6] tracking-[-0.01em] text-[var(--mid)] text-[16px] sm:mt-10 sm:text-[clamp(1.125rem,1.45vw,1.6rem)]',
            )}
          >
            <strong className="font-medium text-[var(--ink)]">RubixKube</strong> is an{' '}
            <span className="text-[var(--blue)]">AI SRE platform</span> that <em className="italic">understands</em> your
            infrastructure,{' '}
            <HeroLink href="/glossary/mean-time-to-understand">finds the root cause</HeroLink> of every incident,
            opens the fix and <HeroLink href="/blog/aiops-auto-remediation-memory-failure">remembers what worked</HeroLink>.
          </p>

          <div className="rk-hero-cta mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
            <Button asChild variant="primary" className={heroPrimaryCtaClass}>
              <Link href={CONSOLE_URL} target="_blank" rel="noopener noreferrer">
                Start for Free
                <Rocket className="h-3.5 w-3.5 shrink-0 opacity-95" strokeWidth={2.25} aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" className={outlineBlueAccentMd}>
              <Link href={KEPLER_URL} target="_blank" rel="noopener noreferrer">
                Try Kepler
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-full shrink-0 flex-row items-center border-t border-[var(--rule)] bg-[var(--bg)]">
        <span className="rk-marquee-label max-sm:px-3 max-sm:text-[13px] sm:py-0">Trusted by</span>
        <div className="flex min-h-0 flex-1 items-center overflow-hidden px-3 py-3 sm:px-[var(--pad)] sm:py-4 md:px-8">
          <CustomerLogoGrid />
        </div>
      </div>
    </div>
  )
}
