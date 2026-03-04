'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { ClosingCTA } from '@/components/closing-cta'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { fadeUpVariants } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useTheme } from '@/components/theme-provider'
import DotGrid from '@/components/ui/bg'
import { Check } from 'lucide-react'

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
    a: 'When something breaks, RubixKube finds it, traces it back to the root cause, and tells you exactly what to fix. That\'s one investigation.',
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
    a: 'On Free, you\'re paused until next month. On Starter, we keep going at $8 per investigation or grab a Boost Pack if you\'d rather pay upfront at a lower rate.',
  },
  {
    q: 'Does RubixKube touch my infrastructure?',
    a: 'No. We watch, we analyze, we recommend. Your team decides what to do. Nothing changes without you.',
  },
]

export function PricingPageClient() {
  const prefersReducedMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()

  const dotColors = resolvedTheme === 'dark'
    ? { baseColor: 'rgba(147, 197, 253, 0.06)', activeColor: 'rgba(147, 197, 253, 0.07)' }
    : { baseColor: 'rgba(59, 130, 246, 0.06)', activeColor: 'rgba(59, 130, 246, 0.07)' }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <DotGrid
            dotSize={1.5}
            gap={20}
            baseColor={dotColors.baseColor}
            activeColor={dotColors.activeColor}
            proximity={100}
            shockRadius={250}
            shockStrength={4}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2000px] px-4 sm:px-6 md:px-8 pt-20">
          <div className="min-h-[600px] flex flex-col items-center justify-center gap-8">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              variants={fadeUpVariants}
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              animate="visible"
            >
              <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <span className="inline-flex items-center rounded-full border border-border bg-background-secondary px-3 py-1 text-sm font-medium text-foreground-muted mb-8">
                  Pricing
                </span>
              </motion.div>

              <motion.h1
                className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] 2xl:text-[80px] tracking-[-0.02em] leading-[0.95] text-foreground mb-6 px-4 sm:px-0"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="text-accent">Reliability</span> that pays for itself.
              </motion.h1>

              <motion.div
                className="font-mono text-sm sm:text-base text-foreground-muted/60 flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6 px-4 sm:px-0"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span>14x ROI</span>
                <span className="text-foreground-muted/30">·</span>
                <span>55 hrs saved/week</span>
                <span className="text-foreground-muted/30">·</span>
                <span>$379 saved per incident</span>
                <span className="text-foreground-muted/30">·</span>
                <span>4.13 min to root cause</span>
              </motion.div>

              <motion.p
                className="max-w-[90vw] sm:max-w-[55ch] text-[18px] sm:text-[19px] md:text-[20px] leading-7 text-foreground-muted mx-auto px-4 sm:px-0"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Every hour your team spends investigating is an hour not building.<br className="hidden sm:block" /> RubixKube finds the root cause in minutes, so your engineers can get back to what matters.
              </motion.p>

              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-3 mt-8 justify-center items-center w-full"
              >
                <Button size="lg" asChild>
                  <a href="#pricing-cards">View plans</a>
                </Button>
                <CalendlyBooking url="https://calendly.com/rubixkube-ai/30min" variant="outline" size="lg">
                  Book Demo
                </CalendlyBooking>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="pricing-cards" className="pt-8 pb-14 sm:pb-20 md:pb-24 bg-background scroll-mt-20 overflow-x-hidden">
        <div className="mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {/* Free */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <Card className="flex flex-col h-full border-border">
                <CardHeader className="pb-4">
                  <p className="text-sm font-medium text-foreground-muted uppercase tracking-wide">Individual</p>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-foreground">$0</span>
                    <span className="text-foreground-muted ml-1">forever</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div>
                    <Button variant="primary" size="lg" className="w-full rounded-full" asChild>
                      <Link href="https://console.rubixkube.ai" target="_blank" rel="noopener noreferrer">
                        Start for free
                      </Link>
                    </Button>
                    <p className="text-xs text-foreground-muted text-center mt-2">No credit card. No time limit.</p>
                  </div>
                  <ul className="space-y-3 pt-4">
                    {freeIncludes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                        <Check className="w-5 h-5 text-cta-green flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Starter + Boost Packs */}
            <div className="flex flex-col gap-4">
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex-1"
              >
                <Card className="h-full border-2 border-primary relative overflow-visible">
                  <div className="absolute -top-3 right-4">
                    <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                      ⚡ Early Access Pricing — Limited Time
                    </span>
                  </div>
                  <CardHeader className="pb-4 pt-6">
                    <p className="text-sm font-medium text-foreground-muted uppercase tracking-wide">Business</p>
                    <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                      <span className="text-2xl font-bold text-foreground-muted line-through">$599</span>
                      <span className="text-4xl font-bold text-foreground">$199</span>
                      <span className="text-foreground-muted">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div>
                      <CalendlyBooking url="https://calendly.com/rubixkube-ai/30min" variant="primary" size="lg" className="w-full rounded-full">
                        Get started
                      </CalendlyBooking>
                      <p className="text-xs text-foreground-muted text-center mt-2">Early access pricing. Your rate stays put when we raise ours.</p>
                    </div>
                    <ul className="space-y-3 pt-4">
                      {starterIncludes.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                          <Check className="w-5 h-5 text-cta-green flex-shrink-0 mt-0.5" />
                          <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-foreground-muted pt-4">
                      Add a Boost Pack or upgrade to Enterprise.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Boost Packs - inline block under Starter */}
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-xl border border-border bg-background-secondary p-4"
              >
                <p className="text-sm font-medium text-foreground mb-3">Need more investigations?</p>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[320px] text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 pr-4 font-medium text-foreground-muted">Pack</th>
                        <th className="text-left py-2 pr-4 font-medium text-foreground-muted">Investigations</th>
                        <th className="text-left py-2 pr-4 font-medium text-foreground-muted">Price</th>
                        <th className="text-left py-2 pr-4 font-medium text-foreground-muted">Per investigation</th>
                        <th className="text-right py-2 font-medium text-foreground-muted"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {boostPacks.map((pack) => (
                        <tr key={pack.name} className="border-b border-border/50 last:border-0">
                          <td className="py-2 pr-4 text-foreground font-medium">{pack.name}</td>
                          <td className="py-2 pr-4 text-foreground">{pack.investigations}</td>
                          <td className="py-2 pr-4 text-foreground">${pack.price}</td>
                          <td className="py-2 pr-4 text-foreground-muted">${pack.perInvestigation} each</td>
                          <td className="py-2 text-right">
                            <CalendlyBooking url="https://calendly.com/rubixkube-ai/30min" variant="ghost" size="sm" className="text-primary hover:text-primary">
                              Add pack
                            </CalendlyBooking>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-foreground-muted mt-3">
                  Boost Packs are one-time add-ons. Unused investigations expire at end of month. For consistent high volume, Enterprise is the better value.
                </p>
              </motion.div>
            </div>

            {/* Enterprise */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <Card className="flex flex-col h-full border-border">
                <CardHeader className="pb-4">
                  <p className="text-sm font-medium text-foreground-muted uppercase tracking-wide">Enterprise</p>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-foreground">Custom pricing</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div>
                    <CalendlyBooking url="https://calendly.com/rubixkube-ai/30min" variant="primary" size="lg" className="w-full rounded-full">
                      Talk to us
                    </CalendlyBooking>
                    <p className="text-xs text-foreground-muted text-center mt-2">Annual contract. We&apos;ll scope it together.</p>
                  </div>
                  <p className="text-sm text-foreground-muted pt-2">Everything in Business, plus:</p>
                  <ul className="space-y-3">
                    {enterpriseIncludes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                        <Check className="w-5 h-5 text-cta-green flex-shrink-0 mt-0.5" />
                        <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-foreground-muted pt-4">
                    Running consistent investigations every month? Enterprise pays for itself the moment you stop buying Boost Packs.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20 md:py-24 bg-background-secondary">
        <div className="mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-6 md:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-extrabold tracking-[-0.015em] text-foreground mb-4">
            FAQ
            </h2>
          </motion.div>
          <div className="max-w-[800px] mx-auto space-y-10">
            {faqItems.map((item) => (
              <motion.div
                key={item.q}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-foreground-muted leading-relaxed">{item.a}</p>
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
