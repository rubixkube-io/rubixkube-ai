'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ClosingCTA } from '@/components/closing-cta'
import { fadeUpVariants } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

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

const faqItems = [
  {
    q: 'What is an investigation?',
    a: "When something breaks, RubixKube finds it, traces it back to the root cause, and tells you exactly what to fix. That's one investigation.",
  },
  {
    q: 'What is an environment?',
    a: 'Your AWS account, your GCP project, your Kubernetes cluster, each one is an environment. Think of it as one distinct place your infrastructure lives.',
  },
  {
    q: 'What is a monitored application?',
    a: 'Any service RubixKube keeps an eye on, like your payment API, your auth service, your data pipeline. If it breaks, we catch it.',
  },
  {
    q: 'What happens when I hit my investigation limit?',
    a: "On Free, you're paused until next month. On Starter, we keep going at $8 per investigation or grab a Boost Pack if you'd rather pay upfront at a lower rate.",
  },
  {
    q: 'Does RubixKube touch my infrastructure?',
    a: 'No. We watch, we analyze, we recommend. Your team decides what to do. Nothing changes without you.',
  },
]

function FeatureItem({ item }: { item: string }) {
  const html = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  return (
    <li className="flex items-start gap-2.5">
      <Check className="h-3.5 w-3.5 text-[var(--blue)] shrink-0 mt-0.5" />
      <span
        className="font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--mid)]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </li>
  )
}

export function PricingPageClient() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[var(--bg)] pb-0">
        <div className="rk-landing-max px-[var(--pad)] pt-[calc(var(--nav-stack)+5rem)] pb-20 sm:pb-28 text-center">
          <motion.div
            variants={fadeUpVariants}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
              Pricing
            </span>

            <h1 className="font-[family-name:var(--font-serif)] text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)] max-w-3xl mx-auto">
              <span className="italic text-[var(--blue)]">Reliability</span> that pays for itself.
            </h1>

            <div className="font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--mid)]/60 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              <span>14x ROI</span>
              <span className="text-[var(--mid)]/30">·</span>
              <span>55 hrs saved/week</span>
              <span className="text-[var(--mid)]/30">·</span>
              <span>$379 saved per incident</span>
              <span className="text-[var(--mid)]/30">·</span>
              <span>4.13 min to root cause</span>
            </div>

            <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)] max-w-[55ch] mx-auto">
              Every hour your team spends investigating is an hour not building. RubixKube finds the root cause in minutes, so your engineers can get back to what matters.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a
                href="#pricing-cards"
                className="rounded-[6px] bg-[var(--blue)] px-[30px] py-[13px] font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-white uppercase transition-colors hover:bg-blue-700"
              >
                View plans
              </a>
              <a
                href="https://calendly.com/rubixkube-ai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[6px] border border-[var(--faint)] bg-transparent px-6 py-[13px] font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-[var(--mid)] uppercase transition-colors hover:border-[var(--mid)]"
              >
                Book Demo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section
        id="pricing-cards"
        className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32 scroll-mt-20"
      >
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">

            {/* Free */}
            <motion.div
              variants={fadeUpVariants}
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex flex-col rounded-xl border border-[var(--rule)] bg-[var(--bg)] p-10">
                <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase mb-6">
                  Individual
                </p>
                <div className="mb-1">
                  <span className="font-[family-name:var(--font-serif)] text-[3.5rem] font-light leading-none text-[var(--ink)]">
                    $0
                  </span>
                </div>
                <p className="font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--mid)] mb-8">
                  forever
                </p>
                <hr className="border-[var(--rule)] mb-8" />
                <ul className="space-y-3 mb-10">
                  {freeIncludes.map((item) => (
                    <FeatureItem key={item} item={item} />
                  ))}
                </ul>
                <a
                  href="https://console.rubixkube.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[6px] border border-[var(--faint)] bg-transparent px-6 py-[13px] font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-[var(--mid)] uppercase transition-colors hover:border-[var(--mid)] text-center"
                >
                  Start for free
                </a>
                <p className="font-[family-name:var(--font-mono)] text-[11px] font-light text-[var(--mid)] text-center mt-3 opacity-60">
                  No credit card. No time limit.
                </p>
              </div>
            </motion.div>

            {/* Starter */}
            <motion.div
              variants={fadeUpVariants}
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex flex-col rounded-xl border border-[var(--blue)] bg-[var(--blue)]/[0.02] p-10 relative">
                <div className="absolute -top-3 left-10">
                  <span className="inline-flex items-center rounded-full bg-[var(--blue)] px-3 py-1 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] text-white uppercase">
                    ⚡ Early Access — Limited Time
                  </span>
                </div>
                <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase mb-6">
                  Business
                </p>
                <div className="mb-1 flex items-baseline gap-3 flex-wrap">
                  <span className="font-[family-name:var(--font-serif)] text-[2rem] font-light leading-none text-[var(--mid)] line-through">
                    $599
                  </span>
                  <span className="font-[family-name:var(--font-serif)] text-[3.5rem] font-light leading-none text-[var(--ink)]">
                    $199
                  </span>
                </div>
                <p className="font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--mid)] mb-8">
                  per month
                </p>
                <hr className="border-[var(--rule)] mb-8" />
                <ul className="space-y-3 mb-10">
                  {starterIncludes.map((item) => (
                    <FeatureItem key={item} item={item} />
                  ))}
                </ul>
                <a
                  href="https://calendly.com/rubixkube-ai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[6px] bg-[var(--blue)] px-[30px] py-[13px] font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-white uppercase transition-colors hover:bg-blue-700 text-center"
                >
                  Get started
                </a>
                <p className="font-[family-name:var(--font-mono)] text-[11px] font-light text-[var(--mid)] text-center mt-3 opacity-60">
                  Early access pricing. Your rate stays put when we raise ours.
                </p>
              </div>
            </motion.div>

            {/* Enterprise */}
            <motion.div
              variants={fadeUpVariants}
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex flex-col rounded-xl border border-[var(--rule)] bg-[var(--bg)] p-10">
                <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase mb-6">
                  Enterprise
                </p>
                <div className="mb-1">
                  <span className="font-[family-name:var(--font-serif)] text-[3.5rem] font-light leading-none text-[var(--ink)]">
                    Custom
                  </span>
                </div>
                <p className="font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--mid)] mb-8">
                  pricing
                </p>
                <hr className="border-[var(--rule)] mb-8" />
                <ul className="space-y-3 mb-10">
                  {enterpriseIncludes.map((item) => (
                    <FeatureItem key={item} item={item} />
                  ))}
                </ul>
                <a
                  href="https://calendly.com/rubixkube-ai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[6px] border border-[var(--faint)] bg-transparent px-6 py-[13px] font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-[var(--mid)] uppercase transition-colors hover:border-[var(--mid)] text-center"
                >
                  Talk to us
                </a>
                <p className="font-[family-name:var(--font-mono)] text-[11px] font-light text-[var(--mid)] text-center mt-3 opacity-60">
                  Annual contract. We&apos;ll scope it together.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Boost Packs */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={fadeUpVariants}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
              Add-ons
            </span>
            <h2 className="font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl mt-4 mb-4">
              Need more{' '}
              <span className="italic text-[var(--blue)]">investigations?</span>
            </h2>
            <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)] max-w-[52ch] mb-12">
              Boost Packs are one-time add-ons. Unused investigations expire at end of month. For consistent high volume, Enterprise is the better value.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              {boostPacks.map((pack) => (
                <div
                  key={pack.name}
                  className="flex flex-col rounded-xl border border-[var(--rule)] bg-[var(--bg)] p-8"
                >
                  <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase mb-4">
                    {pack.name}
                  </p>
                  <div className="mb-1">
                    <span className="font-[family-name:var(--font-serif)] text-[3.5rem] font-light leading-none text-[var(--ink)]">
                      ${pack.price}
                    </span>
                  </div>
                  <p className="font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--mid)] mb-8">
                    {pack.investigations} investigations · ${pack.perInvestigation} each
                  </p>
                  <a
                    href="https://calendly.com/rubixkube-ai/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[6px] border border-[var(--faint)] bg-transparent px-6 py-[13px] font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-[var(--mid)] uppercase transition-colors hover:border-[var(--mid)] text-center"
                  >
                    Add pack
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={fadeUpVariants}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl">
              FAQ
            </h2>
          </motion.div>

          <div className="max-w-[720px]">
            {faqItems.map((item, i) => (
              <motion.div
                key={item.q}
                variants={fadeUpVariants}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true }}
                className={`py-8${i !== 0 ? ' border-t border-[var(--rule)]' : ''}`}
              >
                <h3 className="font-[family-name:var(--font-mono)] text-[13px] font-light tracking-[0.05em] text-[var(--ink)] uppercase mb-3">
                  {item.q}
                </h3>
                <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                  {item.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </>
  )
}
