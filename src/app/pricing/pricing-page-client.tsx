'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PageHero } from '@/components/page-hero'
import { Footer } from '@/components/footer'
import { ClosingCTA } from '@/components/closing-cta'
import { Button } from '@/components/ui/button'
import { fadeUpVariants, fadeUp } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { cn } from '@/lib/utils'
import { rkMono10 } from '@/lib/landing-responsive-type'
import { pricingFaqItems } from '@/data/pricing-faq'
import { outlineBlueAccentMd } from '@/lib/outline-blue-cta'
import { siteButtonCalendly, siteLink, siteLinkArrow } from '@/lib/site-ui'
import { BillingToggle } from '@/components/ui/billing-toggle'
import { ThemedImage } from '@/components/console-shot'

const CALENDLY = 'https://calendly.com/rubixkube-ai/30min'


/**
 * Names and limits match the console (console-next src/areas/account/plans.ts and planFeatures):
 * only Individual has feature gates; Business and Enterprise differ in limits and support.
 */
const TIERS = [
  {
    name: 'Individual',
    price: { monthly: '$0', annual: '$0' },
    was: { monthly: null, annual: null },
    unit: { monthly: 'forever', annual: 'forever' },
    note: { monthly: 'No credit card. No time limit.', annual: 'No credit card. No time limit.' },
    cta: 'start',
    includes: [
      '**1 environment**',
      '10 investigations a month',
      '1 user',
      'Incidents, RCAs and Fix tasks',
      'Rubix in the console, the CLI and your AI tools',
    ],
  },
  {
    name: 'Business',
    price: { monthly: '$999', annual: '$9,999' },
    was: { monthly: null, annual: '$11,988' },
    unit: { monthly: 'per month', annual: 'per year, billed annually' },
    note: { monthly: 'Switch to annual, save $1,989', annual: 'That is $833 a month.' },
    cta: 'primary',
    includes: [
      '**Up to 3 environments**',
      '100 investigations, about $10 each',
      '5 users',
      'Everything in Individual',
      'Rubix in Slack',
      'Automations, hooks and webhooks',
      'Your own model providers',
      'Teams and custom integrations',
    ],
  },
  {
    name: 'Enterprise',
    price: { monthly: 'Custom', annual: 'Custom' },
    was: { monthly: null, annual: null },
    unit: { monthly: 'annual contract', annual: 'annual contract' },
    note: { monthly: "We'll scope it together.", annual: "We'll scope it together." },
    cta: 'outline',
    includes: [
      '**Unlimited environments**',
      'Custom investigation volume',
      'Up to 1,000 users',
      'Everything in Business',
      'Self-hosted deployment',
      'Dedicated support and custom SLAs',
      'Onboarding with our team',
    ],
  },
] as const

const hubbleIncludes = [
  'Rosters with rotations, layers and overrides',
  'Escalation policies with timers',
  'Phone app for iOS and Android',
  "Every page arrives with Rubix's RCA attached",
]

const proofStats = [
  { n: '30', u: '×', l: 'Return on investment' },
  { n: '55', u: ' hrs', l: 'Team eng-hrs / week' },
  { n: '$48', u: '', l: 'Avg saved / incident' },
  { n: '2.8', u: ' min', l: 'Mean time to understand' },
]

function FeatureItem({ item, inverted = false }: { item: string; inverted?: boolean }) {
  const isBold = item.startsWith('**') && item.endsWith('**')
  const text = item.replace(/\*\*(.*?)\*\*/g, '$1')
  return (
    <li
      className={cn(
        'font-[family-name:var(--font-figtree)] text-[15px] leading-[1.6]',
        inverted
          ? cn('text-white/60', isBold && 'font-medium text-white')
          : cn('text-[var(--mid)]', isBold && 'font-medium text-[var(--ink)]'),
      )}
    >
      <span className={inverted ? 'mr-2 text-white/25' : 'mr-2 text-[var(--faint)]'}>&mdash;</span>
      {text}
    </li>
  )
}

export function PricingPageClient() {
  const prefersReducedMotion = useReducedMotion()
  const [isAnnual, setIsAnnual] = useState(false)

  const billing = isAnnual ? 'annual' : 'monthly'

  return (
    <div className="lining-nums">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[var(--bg)]">
        <PageHero
          title="Reliability that pays for itself."
          lede="Every hour your team spends investigating is an hour not building. RubixKube finds the root cause in minutes, so your engineers can get back to what matters."
        />
      </section>

      {/* Pricing tiers — editorial ruled grid */}
      <section
        id="pricing-grid"
        className="border-t border-[var(--rule)] bg-[var(--bg)] py-16 sm:py-24 scroll-mt-20"
      >
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
          >
            <BillingToggle isAnnual={isAnnual} onToggle={() => setIsAnnual(!isAnnual)} saving="Save up to 17%" />
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className="flex flex-col rounded-2xl bg-[var(--panel)] p-8 ring-1 ring-[var(--rule)] sm:p-10"
                >
                  <span
                    className={cn(
                      'font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase mb-6',
                      rkMono10,
                    )}
                  >
                    {tier.name}
                  </span>
                  <div className="mb-1 flex flex-wrap items-baseline gap-3">
                    <span className="font-[family-name:var(--font-mono)] text-[clamp(3rem,5vw,4.5rem)] font-normal tracking-[-0.04em] leading-none text-[var(--ink)]">
                      {tier.price[billing]}
                    </span>
                    {tier.was[billing] && (
                      <span className="font-[family-name:var(--font-mono)] text-[clamp(1.5rem,2.5vw,2rem)] font-normal tracking-[-0.04em] leading-none text-[var(--mid)] line-through decoration-1">
                        <span className="sr-only">Was </span>
                        {tier.was[billing]}
                      </span>
                    )}
                  </div>
                  <p className="font-[family-name:var(--font-figtree)] text-[15px] text-[var(--mid)] mt-2 mb-6">
                    {tier.unit[billing]}
                  </p>

                  {/* one main action: the featured plan's solid button, the others in the outline */}
                  {tier.cta === 'start' ? (
                    <Button asChild variant="outline" className={cn('h-12 w-full', outlineBlueAccentMd)}>
                      <a href="https://console.rubixkube.ai" target="_blank" rel="noopener noreferrer">
                        Start for free
                      </a>
                    </Button>
                  ) : tier.cta === 'primary' ? (
                    <CalendlyBooking url={CALENDLY} className={cn(siteButtonCalendly, '!w-full')}>
                      Contact us
                    </CalendlyBooking>
                  ) : (
                    <CalendlyBooking url={CALENDLY} variant="outline" className={cn('h-12 w-full', outlineBlueAccentMd)}>
                      Contact us
                    </CalendlyBooking>
                  )}
                  {tier.name === 'Business' && !isAnnual ? (
                    <button
                      type="button"
                      onClick={() => setIsAnnual(true)}
                      className="mt-3 cursor-pointer text-center font-[family-name:var(--font-figtree)] text-[14px] text-[var(--green)] underline decoration-[var(--green)]/40 underline-offset-2 hover:decoration-[var(--green)]"
                    >
                      {tier.note.monthly}
                    </button>
                  ) : (
                    <p className="font-[family-name:var(--font-figtree)] text-[14px] text-[var(--mid)] text-center mt-3">
                      {tier.note[billing]}
                    </p>
                  )}

                  <hr className="border-[var(--rule)] my-8" />
                  <ul className="space-y-2.5">
                    {tier.includes.map((item) => (
                      <FeatureItem key={item} item={item} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value proof — ruled metric grid */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
            className="border-x border-[var(--rule)]"
          >
            <div className="grid grid-cols-2 md:grid-cols-4">
              {proofStats.map((s, i) => {
                const isLast = i === proofStats.length - 1
                return (
                  <div
                    key={s.l}
                    className={cn(
                      'flex flex-col gap-2.5 bg-[var(--bg)] px-8 py-10 transition-colors hover:bg-[var(--surface)]',
                      !isLast && 'border-r border-[var(--rule)]',
                      i === 1 && 'border-r-0 md:border-r',
                      i < 2 && 'border-b border-[var(--rule)] md:border-b-0',
                    )}
                  >
                    <div className="font-[family-name:var(--font-mono)] text-[clamp(2.25rem,4vw,3.5rem)] leading-none font-normal tracking-[-0.04em] text-[var(--ink)]">
                      {s.n}
                      <span className="text-[0.4em] font-light tracking-normal text-[var(--mid)]">
                        {s.u}
                      </span>
                    </div>
                    <p className="font-[family-name:var(--font-figtree)] text-[14px] leading-[1.4] text-[var(--mid)]">
                      {s.l}
                    </p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hubble add-on */}
      <section id="hubble" className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32 scroll-mt-20">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
            className="grid grid-cols-1 overflow-hidden rounded-2xl bg-[var(--panel)] ring-1 ring-[var(--rule)] lg:grid-cols-[1fr_1.15fr]"
          >
            <div className="flex flex-col p-10 sm:p-12">
              <span
                className={cn(
                  'font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase',
                  rkMono10,
                )}
              >
                Add-on
              </span>
              <h2 className="rk-section-title m-0 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] text-[var(--ink)] mt-4">
                Add <em>Hubble</em> for <span className="whitespace-nowrap">on-call.</span>
              </h2>
              <p className="rk-section-body m-0 text-[var(--mid)] mt-4">
                Rotations, escalation and paging on the web and on your phone. With RubixKube, the person on call gets the cause along with the page.
              </p>

              <div className="mt-8 flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-mono)] text-[clamp(2.5rem,4vw,3.5rem)] font-normal tracking-[-0.04em] leading-none text-[var(--ink)]">
                  {isAnnual ? '$102' : '$10'}
                </span>
                {isAnnual && (
                  <span className="font-[family-name:var(--font-mono)] text-[clamp(1.25rem,2vw,1.6rem)] font-normal tracking-[-0.04em] leading-none text-[var(--mid)] line-through decoration-1">
                    <span className="sr-only">Was </span>$120
                  </span>
                )}
                <span className="font-[family-name:var(--font-figtree)] text-[15px] text-[var(--mid)]">
                  {isAnnual ? 'per seat, per year' : 'per seat, per month'}
                </span>
              </div>
              <p className="font-[family-name:var(--font-figtree)] text-[14px] text-[var(--mid)] mt-2">
                {isAnnual ? 'That is $8.50 a month. ' : ''}With any RubixKube plan, at half the price of Hubble on its own.
              </p>

              <hr className="border-[var(--rule)] my-8" />
              <ul className="space-y-2.5">
                {hubbleIncludes.map((item) => (
                  <FeatureItem key={item} item={item} />
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                <CalendlyBooking url={CALENDLY} className={siteButtonCalendly}>
                  Contact us
                </CalendlyBooking>
                <Link href="/hubble" className={siteLink}>
                  Explore Hubble
                  <ArrowRight className={siteLinkArrow} aria-hidden />
                </Link>
              </div>
              <Link
                href="/hubble#pricing"
                className="group mt-6 inline-flex items-center gap-1.5 self-start font-[family-name:var(--font-figtree)] text-[15px] text-[var(--mid)] hover:text-[var(--ink)]"
              >
                Only need on-call? See Hubble pricing
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>

            <div
              className="relative min-h-[420px] overflow-hidden border-t border-[var(--rule)] bg-[var(--background-secondary)] lg:border-t-0 lg:border-l"
              style={{
                backgroundImage:
                  'radial-gradient(120% 90% at 0% 0%, rgba(47,91,255,0.16), transparent 60%), radial-gradient(90% 70% at 100% 100%, rgba(47,91,255,0.10), transparent 60%), radial-gradient(color-mix(in srgb, var(--ink) 8%, transparent) 1px, transparent 1px)',
                backgroundSize: 'auto, auto, 14px 14px',
              }}
            >
              <div className="absolute top-12 left-[20%] w-[135%] overflow-hidden rounded-lg border border-[var(--rule)] shadow-sm">
                <ThemedImage
                  name="hubble-oncall"
                  alt="Hubble On call page: who is on call for each service, and the next handoffs"
                  w={2880}
                  h={1800}
                  sizes="(max-width: 1024px) 130vw, 70vw"
                  className="h-auto w-full"
                />
              </div>
              <div className="absolute top-[30%] left-8 w-[32%] max-w-[220px] drop-shadow-[0_18px_28px_rgba(17,19,24,0.28)]">
                <ThemedImage
                  name="hubble-phone"
                  alt="Hubble phone app: an incident waiting for acknowledgement"
                  w={780}
                  h={1640}
                  sizes="220px"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ — ruled editorial list */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-[80px]">
            <motion.div
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
            >
              <span
                className={cn(
                  'font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase',
                  rkMono10,
                )}
              >
                Questions
              </span>
              <h2 className="rk-section-title m-0 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] text-[var(--ink)] mt-4">
                Frequently{' '}
                <em>asked.</em>
              </h2>
            </motion.div>

            <div>
              {pricingFaqItems.map((item, i) => (
                <motion.div
                  key={item.q}
                  variants={fadeUpVariants}
                  {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
                  className={cn(
                    'py-8',
                    i !== 0 && 'border-t border-[var(--rule)]',
                  )}
                >
                  <h3 className="rk-section-title m-0 mb-2.5 text-[1.2rem] leading-[1.3] tracking-[-0.015em] text-[var(--ink)]">
                    {item.q}
                  </h3>
                  <p className="rk-section-body m-0 text-[var(--mid)]">
                    {item.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ClosingCTA
        headline="See RubixKube on your own systems"
        subline="Book a 30-minute walkthrough with our team."
      />
      <Footer />
    </div>
  )
}
