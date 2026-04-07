'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ClosingCTA } from '@/components/closing-cta'
import { Button } from '@/components/ui/button'
import { fadeUpVariants, fadeUp } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { cn } from '@/lib/utils'
import { rkMono9, rkMono10, rkMono11, rkMono13, rkMonoXs } from '@/lib/landing-responsive-type'
import { pricingFaqItems } from '@/data/pricing-faq'
import { outlineBlueAccentMd } from '@/lib/outline-blue-cta'

const CALENDLY = 'https://calendly.com/rubixkube-ai/30min'


const freeIncludes = [
  '1 environment',
  'Up to 5 monitored applications',
  '10 investigations per month',
  '7-day data retention',
  'Basic anomaly detection',
]

const starterIncludes = [
  'Up to 3 environments (AWS, GCP, Azure, or Kubernetes)',
  'Up to 25 monitored applications',
  '**50 investigations/month for first 3 months**',
  '15 investigations/month from month 4',
  '30-day data retention',
  '5 users',
  'Slack integration',
  'Automatic analysis & RCA reports',
  'Overage available at $8/investigation',
]

const enterpriseIncludes = [
  'Unlimited environments',
  'Unlimited monitored applications',
  '**300 investigations/month**',
  'Unlimited data retention',
  'Anomaly detection & alert management',
  'RBAC & SSO',
  'Interactive Slack & Teams bot',
  'IaC enhancements & ticket intelligence',
  'Dedicated support & custom SLAs',
  'Custom integrations & onboarding',
]

const boostPacks = [
  { name: 'Boost S', investigations: 50, price: 300, perInvestigation: 6 },
  { name: 'Boost M', investigations: 100, price: 500, perInvestigation: 5 },
]

const proofStats = [
  { n: '30', u: '×', c: 'text-[var(--blue)]', l: 'Return on investment' },
  { n: '55', u: ' hrs', c: 'text-[var(--ink)]', l: 'Team eng-hrs / week' },
  { n: '$48', u: '', c: 'text-[var(--green)]', l: 'Avg saved / incident' },
  { n: '2.8', u: ' min', c: 'text-[var(--blue)]', l: 'Mean time to understand' },
]

function FeatureItem({ item, inverted = false }: { item: string; inverted?: boolean }) {
  const isBold = item.startsWith('**') && item.endsWith('**')
  const text = item.replace(/\*\*(.*?)\*\*/g, '$1')
  return (
    <li
      className={cn(
        'font-[family-name:var(--font-mono)] font-light leading-[1.65]',
        rkMonoXs,
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

function BillingToggle({ isAnnual, onToggle }: { isAnnual: boolean; onToggle: () => void }) {
  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex rounded-full border border-[var(--rule)] bg-[var(--bg)] p-1">
        <button
          type="button"
          onClick={() => !isAnnual || onToggle()}
          className={cn(
            'rounded-full px-6 py-2.5 font-[family-name:var(--font-mono)] tracking-[0.1em] uppercase transition-all duration-200 cursor-pointer',
            rkMono11,
            !isAnnual
              ? 'bg-white text-[var(--ink)] shadow-sm'
              : 'bg-transparent text-[var(--mid)]',
          )}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => isAnnual || onToggle()}
          className={cn(
            'rounded-full px-6 py-2.5 font-[family-name:var(--font-mono)] tracking-[0.1em] uppercase transition-all duration-200 cursor-pointer flex items-center gap-2',
            rkMono11,
            isAnnual
              ? 'bg-white text-[var(--ink)] shadow-sm'
              : 'bg-transparent text-[var(--mid)]',
          )}
        >
          Annual
          <span
            className={cn(
              'font-[family-name:var(--font-mono)] tracking-[0.1em] text-[var(--green)] uppercase',
              rkMono9,
            )}
          >
            Save 15%
          </span>
        </button>
      </div>
    </div>
  )
}

export function PricingPageClient() {
  const prefersReducedMotion = useReducedMotion()
  const [isAnnual, setIsAnnual] = useState(false)

  const starterPrice = isAnnual ? 169 : 199
  const starterPeriod = isAnnual ? 'per month, billed annually' : 'per month'

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[var(--bg)]">
        <div className="rk-landing-max px-[var(--pad)] pt-[calc(var(--nav-stack)+5rem)] pb-20 sm:pb-28 text-center">
          <motion.div
            variants={fadeUpVariants}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            className="flex flex-col items-center"
          >
            <span
              className={cn(
                'font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase mb-10',
                rkMono10,
              )}
            >
              Pricing
            </span>

            <h1 className="rk-landing-h2-std font-[family-name:var(--font-serif)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)] w-full max-w-none">
              <span className="italic text-[var(--blue)]">Reliability</span> that pays for itself.
            </h1>

            <p
              className={cn(
                'font-[family-name:var(--font-mono)] font-light leading-[1.75] text-[var(--mid)] w-full max-w-3xl mt-10',
                rkMono13,
              )}
            >
              Every hour your team spends investigating is an hour not building. RubixKube finds the root cause in minutes, so your engineers can get back to what matters.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <Button asChild variant="primary">
                <a href="#pricing-grid">View plans</a>
              </Button>
              <CalendlyBooking url={CALENDLY} asChild>
                <Button variant="outline" className={outlineBlueAccentMd}>Book Demo</Button>
              </CalendlyBooking>
            </div>
          </motion.div>
        </div>
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
            <BillingToggle isAnnual={isAnnual} onToggle={() => setIsAnnual(!isAnnual)} />
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
            className="border border-[var(--rule)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Free tier — green accent */}
              <div className="flex flex-col border-b border-[var(--rule)] md:border-b-0 md:border-r border-l-2 border-l-[var(--green)] bg-[var(--green)]/[0.03] p-10">
                <span
                  className={cn(
                    'font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase mb-6',
                    rkMono10,
                  )}
                >
                  Individual
                </span>
                <div className="mb-1">
                  <span className="font-[family-name:var(--font-serif)] text-[clamp(3rem,5vw,4.5rem)] font-light leading-none text-[var(--ink)]">
                    $0
                  </span>
                </div>
                <p
                  className={cn(
                    'font-[family-name:var(--font-mono)] font-light text-[var(--mid)] mb-6',
                    rkMono11,
                  )}
                >
                  forever
                </p>

                <Button asChild variant="outline" className="w-full">
                  <a
                    href="https://console.rubixkube.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start for free
                  </a>
                </Button>
                <p
                  className={cn(
                    'font-[family-name:var(--font-mono)] font-light text-[var(--mid)] text-center mt-3 opacity-60',
                    rkMono11,
                  )}
                >
                  No credit card. No time limit.
                </p>

                <hr className="border-[var(--rule)] my-8" />
                <ul className="space-y-2.5">
                  {freeIncludes.map((item) => (
                    <FeatureItem key={item} item={item} />
                  ))}
                </ul>
              </div>

              {/* Business tier — blue accent */}
              <div className="flex flex-col border-b border-[var(--rule)] md:border-b-0 md:border-r border-l-2 border-l-[var(--blue)] bg-[var(--blue)]/[0.03] p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className={cn(
                      'font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase',
                      rkMono10,
                    )}
                  >
                    Business
                  </span>
                  <span
                    className={cn(
                      'font-[family-name:var(--font-mono)] tracking-[0.1em] text-[var(--blue)] uppercase',
                      rkMono9,
                    )}
                  >
                    Early Access
                  </span>
                </div>
                <div className="mb-1 flex items-baseline gap-3 flex-wrap">
                  <span className="font-[family-name:var(--font-serif)] text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-none text-[var(--faint)] line-through">
                    $599
                  </span>
                  <span className="font-[family-name:var(--font-serif)] text-[clamp(3rem,5vw,4.5rem)] font-light leading-none text-[var(--ink)]">
                    ${starterPrice}
                  </span>
                </div>
                <p
                  className={cn(
                    'font-[family-name:var(--font-mono)] font-light text-[var(--mid)] mb-6',
                    rkMono11,
                  )}
                >
                  {starterPeriod}
                </p>

                <CalendlyBooking url={CALENDLY} asChild>
                  <Button variant="primary" className="w-full">
                    Get started
                  </Button>
                </CalendlyBooking>
                <p
                  className={cn(
                    'font-[family-name:var(--font-mono)] font-light text-[var(--mid)] text-center mt-3 opacity-60',
                    rkMono11,
                  )}
                >
                  Early access pricing. Your rate stays put when we raise ours.
                </p>

                <hr className="border-[var(--rule)] my-8" />
                <ul className="space-y-2.5">
                  {starterIncludes.map((item) => (
                    <FeatureItem key={item} item={item} />
                  ))}
                </ul>
              </div>

              {/* Enterprise tier — ink accent */}
              <div className="flex flex-col border-l-2 border-l-[var(--ink)] bg-[var(--ink)]/[0.03] p-10">
                <span
                  className={cn(
                    'font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase mb-6',
                    rkMono10,
                  )}
                >
                  Enterprise
                </span>
                <div className="mb-1">
                  <span className="font-[family-name:var(--font-serif)] text-[clamp(3rem,5vw,4.5rem)] font-light leading-none text-[var(--ink)]">
                    Custom
                  </span>
                </div>
                <p
                  className={cn(
                    'font-[family-name:var(--font-mono)] font-light text-[var(--mid)] mb-6',
                    rkMono11,
                  )}
                >
                  pricing
                </p>

                <CalendlyBooking url={CALENDLY} asChild>
                  <Button variant="outline" className="w-full">
                    Talk to us
                  </Button>
                </CalendlyBooking>
                <p
                  className={cn(
                    'font-[family-name:var(--font-mono)] font-light text-[var(--mid)] text-center mt-3 opacity-60',
                    rkMono11,
                  )}
                >
                  Annual contract. We&apos;ll scope it together.
                </p>

                <hr className="border-[var(--rule)] my-8" />
                <ul className="space-y-2.5">
                  {enterpriseIncludes.map((item) => (
                    <FeatureItem key={item} item={item} />
                  ))}
                </ul>
              </div>
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
                      'flex flex-col gap-2.5 bg-[var(--bg)] px-8 py-10 transition-colors hover:bg-white',
                      !isLast && 'border-r border-[var(--rule)]',
                      i === 1 && 'border-r-0 md:border-r',
                      i < 2 && 'border-b border-[var(--rule)] md:border-b-0',
                    )}
                  >
                    <div
                      className={cn(
                        'font-[family-name:var(--font-serif)] text-[clamp(2.25rem,4vw,3.5rem)] leading-none font-normal tracking-[-0.02em]',
                        s.c,
                      )}
                    >
                      {s.n}
                      <span className="text-[0.4em] font-light tracking-normal text-[var(--mid)]">
                        {s.u}
                      </span>
                    </div>
                    <p
                      className={cn(
                        'font-[family-name:var(--font-mono)] tracking-[0.16em] text-[var(--mid)] uppercase',
                        rkMono9,
                      )}
                    >
                      {s.l}
                    </p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Boost Packs — ruled sub-grid */}
      <section className="border-t border-[var(--rule)] bg-[var(--background-secondary)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
            className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-[80px] items-start"
          >
            <div>
              <span
                className={cn(
                  'font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase',
                  rkMono10,
                )}
              >
                Add-ons
              </span>
              <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] mt-4 mb-4">
                Need more{' '}
                <span className="italic text-[var(--blue)]">investigations?</span>
              </h2>
              <p
                className={cn(
                  'font-[family-name:var(--font-mono)] font-light leading-relaxed text-[var(--mid)]',
                  rkMono13,
                )}
              >
                Boost Packs are one-time add-ons. Unused investigations roll over to the next month. For consistent high volume, Enterprise is the better value.
              </p>
            </div>

            <div className="border border-[var(--rule)]">
              {boostPacks.map((pack, i) => (
                <div
                  key={pack.name}
                  className={cn(
                    'flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 p-8 bg-[var(--bg)] transition-colors hover:bg-white',
                    i !== 0 && 'border-t border-[var(--rule)]',
                  )}
                >
                  <div className="flex-1">
                    <span
                      className={cn(
                        'font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase',
                        rkMono10,
                      )}
                    >
                      {pack.name}
                    </span>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-[family-name:var(--font-serif)] text-[clamp(2rem,3vw,3rem)] font-light leading-none text-[var(--ink)]">
                        ${pack.price}
                      </span>
                    </div>
                    <p
                      className={cn(
                        'font-[family-name:var(--font-mono)] font-light text-[var(--mid)] mt-1',
                        rkMonoXs,
                      )}
                    >
                      {pack.investigations} investigations &middot; ${pack.perInvestigation} each
                    </p>
                  </div>
                  <CalendlyBooking url={CALENDLY} asChild>
                    <Button variant="outline" size="sm">
                      Add pack
                    </Button>
                  </CalendlyBooking>
                </div>
              ))}
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
              <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] mt-4">
                Frequently{' '}
                <span className="italic text-[var(--blue)]">asked.</span>
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
                  <h3
                    className={cn(
                      'font-[family-name:var(--font-serif)] text-[clamp(1.1rem,2vw,1.35rem)] font-light leading-[1.2] text-[var(--ink)] mb-3',
                    )}
                  >
                    {item.q}
                  </h3>
                  <p
                    className={cn(
                      'font-[family-name:var(--font-mono)] font-light leading-relaxed text-[var(--mid)]',
                      rkMono13,
                    )}
                  >
                    {item.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ClosingCTA
        headline="Calculate your ROI"
        subline="See what RubixKube saves your team every month."
      />
      <Footer />
    </>
  )
}
