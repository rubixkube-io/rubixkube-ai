'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Mail } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PageHero } from '@/components/page-hero'
import { Footer } from '@/components/footer'
import { BillingToggle } from '@/components/ui/billing-toggle'
import { fadeUpVariants } from '@/lib/animations'
import { siteButton } from '@/lib/site-ui'
import {
  type Billing,
  type CheckoutForm,
  HUBBLE_MAX_SEATS,
  HUBBLE_SEAT_PRICE,
  pay,
  startCheckout,
} from '@/lib/hubble-checkout'

const sans = 'font-[family-name:var(--font-figtree)]'
const mono = 'font-[family-name:var(--font-mono)]'
/** A field label: Figtree, small, in ink */
const label = `mb-2 block ${sans} text-[14px] font-medium text-[var(--ink)]`
const hint = `m-0 mt-2 ${sans} text-[13px] leading-[1.5] text-[var(--mid)]`
const field =
  'w-full min-w-0 rounded-[6px] bg-[var(--panel)] px-4 py-[11px] font-[family-name:var(--font-figtree)] text-[15px] leading-[22px] text-[var(--ink)] ring-1 ring-[var(--rule)] outline-none transition-shadow placeholder:text-[var(--mid)] hover:ring-[var(--mid)] focus:ring-[var(--ink)]'
const textLink = 'text-[var(--ink)] underline decoration-[var(--rule)] underline-offset-4 hover:decoration-[var(--ink)]'

const usd = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0 })}`

type Stage = { step: 'form' } | { step: 'paying' } | { step: 'paid'; email: string; company: string }

export function BuyPageClient() {
  const [billing, setBilling] = useState<Billing>('monthly')
  const [seats, setSeats] = useState('5')
  const [stage, setStage] = useState<Stage>({ step: 'form' })
  const [error, setError] = useState('')

  // /hubble/buy?billing=annual keeps the choice made on the pricing card
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('billing') === 'annual') setBilling('annual')
  }, [])

  const count = Number.parseInt(seats, 10)
  const validSeats = Number.isInteger(count) && count >= 1 && count <= HUBBLE_MAX_SEATS
  const perCycle = validSeats ? count * HUBBLE_SEAT_PRICE[billing] : 0

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validSeats) {
      setError(`Choose between 1 and ${HUBBLE_MAX_SEATS} seats.`)
      return
    }
    const data = new FormData(e.currentTarget)
    const form: CheckoutForm = {
      seats: count,
      billing,
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      company: String(data.get('company') ?? '').trim(),
    }
    setError('')
    setStage({ step: 'paying' })
    try {
      const outcome = await pay(await startCheckout(form), form)
      if (outcome.status === 'paid') {
        setStage({ step: 'paid', email: outcome.email, company: outcome.company })
        window.scrollTo({ top: 0 })
      } else {
        setStage({ step: 'form' })
        if (outcome.error) setError(`${outcome.error} You have not been charged.`)
      }
    } catch (err) {
      setStage({ step: 'form' })
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.')
    }
  }

  if (stage.step === 'paid') {
    return (
      <>
        <Navbar />
        <section className="bg-[var(--bg)]">
          <PageHero
            title="Payment received."
            lede={`We're setting up ${stage.company} on Hubble.`}
          />
          <div className="rk-landing-max px-[var(--pad)] pb-28">
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="max-w-[60ch] rounded-2xl bg-[var(--panel)] p-8 ring-1 ring-[var(--rule)] sm:p-10"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--green)]/10">
                <Mail className="h-5 w-5 text-[var(--green)]" />
              </div>
              <p className={`m-0 ${sans} text-[17px] leading-[1.6] text-[var(--ink)]`}>
                In a minute or two you&apos;ll get an email at <strong>{stage.email}</strong> with a link to set up{' '}
                {stage.company}. You&apos;re its admin.
              </p>
              <p className={`m-0 mt-4 ${sans} text-[15px] leading-[1.6] text-[var(--mid)]`}>
                Sign in from that link, as {stage.email}. Signing in any other way makes a separate, empty organization.
                The link works for 14 days. No email? Check spam, then write to{' '}
                <a href="mailto:connect@rubixkube.ai" className={textLink}>connect@rubixkube.ai</a>.
              </p>
            </motion.div>
          </div>
        </section>
        <Footer />
      </>
    )
  }

  const busy = stage.step === 'paying'
  return (
    <>
      <Navbar />
      <section className="bg-[var(--bg)]">
        <PageHero title="Buy Hubble." lede="Pick your seats, pay by card, and we'll email you a link to your new organization." />

        <div className="rk-landing-max grid gap-10 px-[var(--pad)] pb-28 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <motion.form
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            onSubmit={submit}
            className="space-y-8"
          >
            <div>
              <BillingToggle
                isAnnual={billing === 'annual'}
                onToggle={() => setBilling(billing === 'annual' ? 'monthly' : 'annual')}
              />
            </div>

            <div>
              <label htmlFor="seats" className={label}>Seats</label>
              <input
                id="seats"
                name="seats"
                type="number"
                inputMode="numeric"
                min={1}
                max={HUBBLE_MAX_SEATS}
                step={1}
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className={`${field} max-w-[10rem]`}
                required
              />
              <p className={hint}>
                One seat for each person who goes on call. People who only watch incidents are free. Need more than{' '}
                {HUBBLE_MAX_SEATS}? <Link href="/contact" className={textLink}>Contact us</Link>.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={label}>Your name</label>
                <input id="name" name="name" type="text" autoComplete="name" maxLength={100} className={field} required />
              </div>
              <div>
                <label htmlFor="company" className={label}>Organization name</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  minLength={2}
                  maxLength={100}
                  className={field}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={label}>Work email</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" className={field} required />
              <p className={hint}>You&apos;ll be the organization&apos;s admin. The link to set it up goes here.</p>
            </div>

            {error && <p role="alert" className={`m-0 ${sans} text-[14px] text-[var(--red)]`}>{error}</p>}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className={`m-0 ${sans} text-[14px] text-[var(--mid)]`}>
                By buying you agree to our{' '}
                <Link href="/legal/terms" className={textLink}>Terms</Link> and{' '}
                <Link href="/legal/privacy" className={textLink}>Privacy Policy</Link>.
              </p>
              <button
                type="submit"
                disabled={busy}
                className={`${siteButton} shrink-0 cursor-pointer disabled:cursor-default disabled:opacity-60`}
              >
                {busy ? 'Opening payment…' : 'Continue to payment'}
              </button>
            </div>
          </motion.form>

          <motion.aside
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="h-fit rounded-2xl bg-[var(--panel)] p-8 ring-1 ring-[var(--rule)] sm:p-10 lg:sticky lg:top-[calc(var(--nav-stack)+2rem)]"
          >
            <p className={`m-0 mb-6 ${mono} text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase`}>Your order</p>
            <div className={`flex items-baseline justify-between gap-4 ${sans} text-[15px] text-[var(--mid)]`}>
              <span>
                {validSeats ? count : '–'} seat{count === 1 ? '' : 's'} × {usd(HUBBLE_SEAT_PRICE[billing])}
              </span>
              <span>{billing === 'annual' ? 'per year' : 'per month'}</span>
            </div>
            <hr className="my-6 border-[var(--rule)]" />
            <p className={`m-0 ${mono} text-[clamp(2.25rem,4vw,3rem)] leading-none tracking-[-0.04em] text-[var(--ink)]`}>
              {validSeats ? usd(perCycle) : '–'}
            </p>
            <p className={`m-0 mt-2 ${sans} text-[15px] text-[var(--mid)]`}>
              {billing === 'annual' ? 'billed every year' : 'billed every month'}, in US dollars
            </p>
            <ul className="mt-8 space-y-3">
              {[
                'Charged today, then renews until you cancel',
                'Rosters, escalation, acknowledgements, phone app and Slack',
                'To cancel or change seats, write to connect@rubixkube.ai',
              ].map((item) => (
                <li key={item} className={`flex items-start gap-3 ${sans} text-[14px] leading-[1.5] text-[var(--mid)]`}>
                  <Check className="mt-[3px] h-4 w-4 shrink-0 text-[var(--ink)]" strokeWidth={1.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </section>
      <Footer />
    </>
  )
}
