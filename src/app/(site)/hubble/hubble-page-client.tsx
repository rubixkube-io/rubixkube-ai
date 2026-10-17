'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ClosingCTA } from '@/components/closing-cta'
import { Button } from '@/components/ui/button'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { outlineBlueAccentMd } from '@/lib/outline-blue-cta'
import { CALENDLY_DEMO_URL } from '@/lib/calendly-demo-url'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  Check,
  CheckCircle,
  Hand,
  MessageSquare,
  Smartphone,
  SlidersHorizontal,
} from 'lucide-react'

/**
 * Hubble checkout. Leave null until Razorpay checkout exists; the pricing card then
 * shows "Talk to us". Set it to the checkout link to show a "Buy now" button instead.
 */
const HUBBLE_CHECKOUT_URL: string | null = null

const features = [
  {
    title: 'Rosters',
    copy: 'Set who is on call with rotations, layers and overrides. People can swap shifts, and everyone can see who is on call right now.',
    icon: CalendarDays,
  },
  {
    title: 'Escalation with timers',
    copy: 'If nobody answers a page, Hubble pages the next person after the time you set.',
    icon: BellRing,
  },
  {
    title: 'Acknowledgements',
    copy: 'One tap tells the team you have it.',
    icon: Hand,
  },
  {
    title: 'Contact rules',
    copy: 'Each person chooses how they are paged and how soon: push, email or in-app, with different rules for high and low urgency.',
    icon: SlidersHorizontal,
  },
  {
    title: 'Phone app',
    copy: 'Get paged, acknowledge and check the rota from your phone. Android today, iPhone soon.',
    icon: Smartphone,
  },
  {
    title: 'Slack',
    copy: 'See who is on call and acknowledge pages without leaving Slack.',
    icon: MessageSquare,
  },
]

const escalation = [
  { time: '02:14', who: 'Asha', what: 'Paged by push', state: 'sent' },
  { time: '02:19', who: 'Ravi', what: 'No answer in 5 min. Paged the next person', state: 'sent' },
  { time: '02:21', who: 'Ravi', what: 'Acknowledged. Escalation stopped', state: 'done' },
] as const

const steps = [
  {
    n: '01',
    title: 'Start with Hubble',
    copy: 'Set up rosters and escalation for your team. Send it alerts from the tools you already use.',
  },
  {
    n: '02',
    title: 'Add RubixKube when you are ready',
    copy: 'Rubix investigates each incident, finds the cause and suggests the fix. Same sign-in, same team, same settings. Nothing to move.',
  },
  {
    n: '03',
    title: 'Fewer pages',
    copy: 'As Rubix fixes the incidents that keep coming back, fewer of them reach a person.',
  },
]

const hubbleIncludes = [
  'Rosters with rotations, layers and overrides',
  'Escalation policies with timers',
  'Acknowledgements',
  'Contact rules per person',
  'Phone app',
  'Slack',
]

const bundleIncludes = [
  'Everything in Hubble',
  'Incidents investigated by Rubix',
  'Root cause analysis and suggested fixes',
  'One sign-in for both',
]

function EscalationCard() {
  return (
    <div className="rounded-xl border border-[var(--rule)] bg-[var(--bg)] shadow-sm">
      <div className="rounded-t-xl border-b border-[var(--rule)] bg-[var(--background-secondary)] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[var(--faint)]" />
            <div className="h-3 w-3 rounded-full bg-[var(--faint)]" />
            <div className="h-3 w-3 rounded-full bg-[var(--faint)]" />
          </div>
          <div className="flex-1 rounded-md bg-[var(--bg)] px-3 py-1.5 text-left font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)]">
            oncall.rubixkube.ai
          </div>
        </div>
      </div>
      <div className="p-6 text-left sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
              Incident · High urgency
            </p>
            <p className="mt-2 font-[family-name:var(--font-mono)] text-[15px] text-[var(--ink)]">
              Checkout API errors above 5%
            </p>
          </div>
          <span className="rounded-full bg-[var(--green)]/10 px-3 py-1 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.1em] text-[var(--green)] uppercase">
            Acknowledged
          </span>
        </div>
        <ol className="space-y-5 border-l border-[var(--rule)] pl-6">
          {escalation.map((row) => (
            <li key={row.time} className="relative">
              <span
                className={`absolute top-1.5 -left-[29px] h-2.5 w-2.5 rounded-full ${
                  row.state === 'done' ? 'bg-[var(--green)]' : 'bg-[var(--blue)]'
                }`}
              />
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-[family-name:var(--font-mono)] text-[13px]">
                <span className="text-[var(--mid)]">{row.time}</span>
                <span className="text-[var(--ink)]">{row.who}</span>
                <span className="font-light text-[var(--mid)]">{row.what}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function EarlyAccessForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    const formData = new FormData(e.currentTarget)
    try {
      const response = await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(Object.fromEntries(formData) as Record<string, string>).toString(),
      })
      if (!response.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const fieldClass = (name: string) =>
    `w-full border-0 border-b-[1.5px] bg-transparent px-0 py-3 font-[family-name:var(--font-mono)] text-[14px] font-light text-[var(--ink)] outline-none transition-all duration-300 placeholder:text-[var(--mid)]/40 ${
      focused === name
        ? 'border-b-[var(--blue)]'
        : 'border-b-[var(--rule)] hover:border-b-[var(--mid)]'
    }`

  const labelClass =
    'mb-1 block font-[family-name:var(--font-mono)] text-[11px] tracking-[0.1em] text-[var(--mid)] uppercase'

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--green)]/10">
          <Check className="h-7 w-7 text-[var(--green)]" />
        </div>
        <div>
          <p className="font-[family-name:var(--font-serif)] text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] font-light text-[var(--ink)]">
            Thanks. <span className="italic text-[var(--blue)]">You are on the list.</span>
          </p>
          <p className="mt-3 font-[family-name:var(--font-mono)] text-[14px] font-light text-[var(--mid)]">
            We will email you when your Hubble account is ready.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      name="contact"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="subject" value="Hubble early access" />
      <div style={{ display: 'none' }}>
        <input name="bot-field" />
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="hubble-name" className={labelClass}>Full name *</label>
          <input
            id="hubble-name"
            type="text"
            name="name"
            placeholder="Your name"
            className={fieldClass('name')}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            required
          />
        </div>
        <div>
          <label htmlFor="hubble-email" className={labelClass}>Work email *</label>
          <input
            id="hubble-email"
            type="email"
            name="email"
            placeholder="you@company.com"
            className={fieldClass('email')}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="hubble-company" className={labelClass}>Company</label>
        <input
          id="hubble-company"
          type="text"
          name="company"
          placeholder="Your company"
          className={fieldClass('company')}
          onFocus={() => setFocused('company')}
          onBlur={() => setFocused(null)}
        />
      </div>

      <div>
        <label htmlFor="hubble-message" className={labelClass}>Your team *</label>
        <textarea
          id="hubble-message"
          name="message"
          placeholder="How many people are on call, and what do you use today?"
          rows={4}
          className={`${fieldClass('message')} resize-none`}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
          required
        />
      </div>

      {error && (
        <p className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--red)]">{error}</p>
      )}

      <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-[family-name:var(--font-mono)] text-[11px] font-light text-[var(--mid)]">
          By submitting you agree to our{' '}
          <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-[var(--ink)]">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="/legal/terms" className="underline underline-offset-2 hover:text-[var(--ink)]">
            Terms
          </Link>
          .
        </p>
        <Button type="submit" disabled={isLoading} size="lg" className="shrink-0">
          {isLoading ? 'Sending…' : 'Join early access'}
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </form>
  )
}

const sectionLabel =
  'mb-6 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase'
const sectionHeading =
  'mb-4 font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl'
const sectionLead =
  'mx-auto max-w-2xl font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]'

export function HubblePageClient() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[var(--bg)] pb-24 sm:pb-32">
        <div className="rk-landing-max relative z-10 w-full px-[var(--pad)] pt-[calc(var(--nav-stack)+5rem)] pb-14 text-center">
          <motion.div className="mx-auto max-w-4xl" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.span variants={fadeUpVariants} className={`${sectionLabel} mb-8`}>
              Hubble by RubixKube · Early access
            </motion.span>

            <motion.h1
              variants={fadeUpVariants}
              className="mb-8 font-[family-name:var(--font-serif)] text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)]"
            >
              Hubble keeps watch,
              <br />
              <span className="italic text-[var(--blue)]">so your team can sleep.</span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="mx-auto max-w-[58ch] font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]"
            >
              Rosters, escalation and paging for the people who run your systems. With RubixKube, Rubix
              takes incidents off the rota over time, so on-call gets quieter.
            </motion.p>

            <motion.div variants={fadeUpVariants} className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="primary">
                <a href="#early-access">
                  Join early access
                  <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                </a>
              </Button>
              <CalendlyBooking url={CALENDLY_DEMO_URL} variant="outline" className={outlineBlueAccentMd}>
                Talk to us
              </CalendlyBooking>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto w-full max-w-3xl px-[var(--pad)]"
        >
          <EscalationCard />
        </motion.div>
      </section>

      {/* What Hubble does */}
      <section className="border-t border-[var(--rule)] bg-[var(--background-secondary)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="mb-16 text-center">
            <span className={sectionLabel}>What Hubble does</span>
            <h2 className={sectionHeading}>
              The right person, <span className="italic text-[var(--blue)]">every time.</span>
            </h2>
            <p className={sectionLead}>
              Alerts come in from the tools you already use. Hubble finds who is on call, pages them the
              way they asked, and moves on to the next person if nobody answers.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon
              const spans = [2, 1, 1, 2, 2, 1]
              const spanClass = spans[i] === 2 ? 'md:col-span-2' : 'md:col-span-1'
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className={`${spanClass} flex flex-col rounded-xl border border-[var(--rule)] bg-[var(--bg)] p-10 transition-shadow hover:shadow-md`}
                >
                  <div className="mb-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--blue)]/10">
                    <Icon className="h-5 w-5 text-[var(--blue)]" strokeWidth={1.5} />
                  </div>
                  <h3
                    className="mb-4 text-[16px] leading-snug tracking-[-0.02em] text-[var(--ink)]"
                    style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
                  >
                    {feature.title}
                  </h3>
                  <p className="font-[family-name:var(--font-mono)] text-[14px] font-normal leading-[1.7] text-[var(--ink)]/60">
                    {feature.copy}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it fits RubixKube */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="mb-16 text-center">
            <span className={sectionLabel}>Hubble and RubixKube</span>
            <h2 className={sectionHeading}>
              On-call that gets <span className="italic text-[var(--blue)]">quieter.</span>
            </h2>
            <p className={sectionLead}>
              Hubble works on its own. When you add RubixKube, Rubix works the incidents too, and fewer of
              them need a person at night.
            </p>
          </div>
          <div className="grid grid-cols-1 border border-[var(--rule)] md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className={`flex flex-col p-10 ${
                  i < steps.length - 1 ? 'border-b border-[var(--rule)] md:border-r md:border-b-0' : ''
                }`}
              >
                <span className="mb-6 font-[family-name:var(--font-mono)] text-[12px] text-[var(--blue)]">{step.n}</span>
                <h3
                  className="mb-4 text-[16px] leading-snug tracking-[-0.02em] text-[var(--ink)]"
                  style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
                >
                  {step.title}
                </h3>
                <p className="font-[family-name:var(--font-mono)] text-[14px] font-normal leading-[1.7] text-[var(--ink)]/60">
                  {step.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-[var(--nav-stack)] border-t border-[var(--rule)] bg-[var(--background-secondary)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="mb-16 text-center">
            <span className={sectionLabel}>Pricing</span>
            <h2 className={sectionHeading}>
              Simple <span className="italic text-[var(--blue)]">pricing.</span>
            </h2>
            <p className={sectionLead}>
              Hubble is in early access. Talk to us and we will set up your team.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 border border-[var(--rule)] bg-[var(--bg)] md:grid-cols-2">
            <div className="flex flex-col border-b border-l-2 border-[var(--rule)] border-l-[var(--blue)] bg-[var(--blue)]/[0.03] p-10 md:border-r md:border-b-0">
              <span className="mb-6 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
                Hubble
              </span>
              <p className="mb-1 font-[family-name:var(--font-serif)] text-[clamp(2.5rem,4vw,3.5rem)] leading-none font-light text-[var(--ink)]">
                Early access
              </p>
              <p className="mb-6 font-[family-name:var(--font-mono)] text-[11px] font-light text-[var(--mid)]">
                Priced per responder. We set it with you.
              </p>
              {HUBBLE_CHECKOUT_URL ? (
                <Button asChild variant="primary" className="w-full">
                  <a href={HUBBLE_CHECKOUT_URL}>Buy now</a>
                </Button>
              ) : (
                <CalendlyBooking url={CALENDLY_DEMO_URL} asChild>
                  <Button variant="primary" className="w-full">
                    Talk to us
                  </Button>
                </CalendlyBooking>
              )}
              <hr className="my-8 border-[var(--rule)]" />
              <ul className="space-y-2.5">
                {hubbleIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--ink)]">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--blue)]" strokeWidth={1.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col border-l-2 border-l-[var(--ink)] bg-[var(--ink)]/[0.03] p-10">
              <span className="mb-6 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
                Hubble with RubixKube
              </span>
              <p className="mb-1 font-[family-name:var(--font-serif)] text-[clamp(2.5rem,4vw,3.5rem)] leading-none font-light text-[var(--ink)]">
                RubixKube plans
              </p>
              <p className="mb-6 font-[family-name:var(--font-mono)] text-[11px] font-light text-[var(--mid)]">
                Hubble is added to your plan
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/pricing">See RubixKube pricing</Link>
              </Button>
              <hr className="my-8 border-[var(--rule)]" />
              <ul className="space-y-2.5">
                {bundleIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--ink)]">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--blue)]" strokeWidth={1.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Early access form */}
      <section id="early-access" className="scroll-mt-[var(--nav-stack)] border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="mx-auto max-w-2xl">
            <div className="mb-12 text-center">
              <span className={sectionLabel}>Early access</span>
              <h2 className={sectionHeading}>
                Get <span className="italic text-[var(--blue)]">Hubble.</span>
              </h2>
              <p className={sectionLead}>
                Tell us about your team. We will set up your account and help you move your rosters over.
              </p>
            </div>
            <EarlyAccessForm />
          </div>
        </div>
      </section>

      <ClosingCTA headline="See Hubble with your team." subline="Book a 30-minute call. We will walk through your rosters and escalation." />
      <Footer />
    </>
  )
}
