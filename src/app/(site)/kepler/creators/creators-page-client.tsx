'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductLockup } from '@/components/product/product-lockup'
import { SectionBar } from '@/components/product/section-bar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'
import { siteButton, siteLink, siteLinkArrow } from '@/lib/site-ui'
import { ArrowRight } from 'lucide-react'
import { CREATOR_SECTIONS, EMAIL, FORM, HERO, RULES, STEPS, WHO } from './content'

const mono = 'font-[family-name:var(--font-mono)]'
const sans = 'font-[family-name:var(--font-figtree)]'
const label =
  'mb-6 inline-block font-[family-name:var(--font-mono)] text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase'
const h2 = 'rk-section-title mt-0 mb-6 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] text-[var(--ink)]'
const lead = 'rk-section-body m-0 max-w-[44ch] text-[var(--mid)]'
const section = 'scroll-mt-[calc(var(--nav-stack)+4rem)] bg-[var(--bg)] py-24 sm:py-32'
const fieldLabel = `${mono} mb-2 block text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase`
const fieldClass = 'h-[3.1rem]'

const PRODUCT = { name: 'Kepler', sections: CREATOR_SECTIONS } as const

const reveal = {
  variants: fadeUpVariants,
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, amount: 0.1 },
}

/** The four fields, submitted as the Netlify form `creators`. */
function ApplyForm() {
  const id = useId()
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle')

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const field = (key: string) => String(data.get(key) ?? '')
    setStatus('sending')
    try {
      const response = await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'creators',
          name: field('name'),
          email: field('email'),
          where: field('where'),
          link: field('link'),
          'bot-field': field('bot-field'),
        }).toString(),
      })
      if (!response.ok) throw new Error('Submission failed')
      setStatus('done')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'done') {
    return (
      <p role="status" className={`${sans} m-0 text-[18px] text-[var(--ink)]`}>
        {FORM.success}
      </p>
    )
  }

  return (
    <form onSubmit={submit} name="creators" data-netlify="true" data-netlify-honeypot="bot-field" className="flex flex-col gap-6">
      <input type="hidden" name="form-name" value="creators" />
      <div style={{ display: 'none' }}>
        <input name="bot-field" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor={`${id}-name`} className={fieldLabel}>
          Your name
        </label>
        <Input id={`${id}-name`} name="name" type="text" autoComplete="name" placeholder="What should we call you?" required className={fieldClass} />
      </div>
      <div>
        <label htmlFor={`${id}-email`} className={fieldLabel}>
          Email
        </label>
        <Input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.com" required className={fieldClass} />
      </div>
      <div>
        <label htmlFor={`${id}-where`} className={fieldLabel}>
          Where you publish
        </label>
        <select
          id={`${id}-where`}
          name="where"
          required
          defaultValue=""
          className={`${fieldClass} flex w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
        >
          <option value="" disabled>
            Choose one
          </option>
          {FORM.where.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-link`} className={fieldLabel}>
          Link to your profile
        </label>
        <Input id={`${id}-link`} name="link" type="url" autoComplete="url" placeholder="https://youtube.com/@you" required className={fieldClass} />
      </div>
      <div className="flex flex-col items-start gap-3">
        <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto">
          Send application
        </Button>
        {status === 'failed' && (
          <p role="alert" className={`${sans} m-0 text-[14px] text-[var(--red)]`}>
            {FORM.error}
          </p>
        )}
        <p className={`${sans} m-0 text-[14px] text-[var(--mid)]`}>{FORM.privacy}</p>
      </div>
    </form>
  )
}

export function CreatorsPageClient() {
  return (
    <>
      <Navbar />

      <div id="top">
        <section className="relative overflow-hidden bg-[var(--bg)]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(60% 70% at 85% 40%, color-mix(in srgb, var(--blue) 12%, transparent), transparent 70%), radial-gradient(color-mix(in srgb, var(--ink) 6%, transparent) 1px, transparent 1px)',
              backgroundSize: 'auto, 16px 16px',
              maskImage: 'linear-gradient(to bottom, black 60%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent)',
            }}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="rk-landing-max relative px-[var(--pad)] pt-[calc(var(--nav-stack)+4rem)] pb-24 lg:pt-[calc(var(--nav-stack)+5rem)] lg:pb-32"
          >
            <motion.div variants={fadeUpVariants} className="mb-10">
              <ProductLockup name="Kepler" size="lg" />
            </motion.div>
            <motion.span variants={fadeUpVariants} className={label}>
              {HERO.label}
            </motion.span>
            <motion.h1
              variants={fadeUpVariants}
              className="rk-section-title mt-0 mb-8 max-w-[18ch] text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.06] text-[var(--ink)]"
            >
              {HERO.title} <em>{HERO.titleEm}</em>
            </motion.h1>
            <motion.p variants={fadeUpVariants} className={`${lead} !max-w-[56ch]`}>
              {HERO.lead}
            </motion.p>
            <motion.div variants={fadeUpVariants} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href="#apply" className={`${siteButton} w-full sm:w-auto`}>
                Apply
              </a>
              <Link href="/kepler" className={siteLink}>
                See what Kepler does
                <ArrowRight className={siteLinkArrow} aria-hidden />
              </Link>
            </motion.div>
            <motion.p variants={fadeUpVariants} className={`${label} !mb-0 mt-10 max-w-[48ch] !normal-case !tracking-[0.05em]`}>
              {HERO.note}
            </motion.p>
          </motion.div>
        </section>
      </div>

      <SectionBar product={PRODUCT} action={{ label: 'Apply', href: '#apply' }} />

      <section id="how" className={section}>
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div {...reveal} className="mb-16">
            <span className={label}>How it works</span>
            <h2 className={h2}>
              Three steps. <em>No catch.</em>
            </h2>
          </motion.div>
          <motion.ol {...reveal} className="m-0 grid list-none gap-px overflow-hidden rounded-2xl bg-[var(--faint)] p-0 ring-1 ring-[var(--faint)] md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="bg-[var(--bg)] p-8">
                <span className={`${mono} mb-4 block text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase`}>Step {i + 1}</span>
                <h3 className="rk-section-title mt-0 mb-2.5 text-[1.2rem] leading-[1.3] tracking-[-0.01em] text-[var(--ink)]">{step.title}</h3>
                <p className={`${sans} m-0 text-[15px] leading-[1.6] text-[var(--mid)]`}>{step.copy}</p>
              </li>
            ))}
          </motion.ol>
        </div>
      </section>

      <section id="rules" className={`${section} border-t border-[var(--faint)]`}>
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div {...reveal} className="mb-16 max-w-3xl">
            <span className={label}>The rules</span>
            <h2 className={h2}>
              {RULES.heading} <em>{RULES.headingEm}</em>
            </h2>
          </motion.div>
          <div className="max-w-3xl">
            {RULES.items.map((item, i) => (
              <motion.div key={item.title} {...reveal} className={`py-8 ${i === 0 ? 'pt-0' : 'border-t border-[var(--rule)]'}`}>
                <h3 className="rk-section-title m-0 mb-2.5 text-[1.2rem] leading-[1.3] tracking-[-0.015em] text-[var(--ink)]">{item.title}</h3>
                <p className="rk-section-body m-0 text-[var(--mid)]">{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="who" className={`${section} border-t border-[var(--faint)]`}>
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
            <motion.div {...reveal}>
              <span className={label}>{WHO.label}</span>
              <h2 className={h2}>
                {WHO.heading} <em>{WHO.headingEm}</em>
              </h2>
            </motion.div>
            <motion.div {...reveal} className="flex flex-col gap-6">
              {WHO.paragraphs.map((p) => (
                <p key={p} className="rk-section-body m-0 max-w-[56ch] text-[var(--mid)]">
                  {p}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="apply" className={`${section} border-t border-[var(--faint)]`}>
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
            <motion.div {...reveal}>
              <span className={label}>{FORM.label}</span>
              <h2 className={h2}>
                {FORM.heading} <em>{FORM.headingEm}</em>
              </h2>
              <p className={lead}>{FORM.lead}</p>
            </motion.div>
            <motion.div {...reveal} className="max-w-xl">
              <ApplyForm />
            </motion.div>
          </div>
          <p className={`${sans} m-0 mt-16 text-[15px] text-[var(--mid)]`}>
            Kepler is made by RubixKube. Questions:{' '}
            <a href={`mailto:${EMAIL}`} className="text-[var(--ink)] underline underline-offset-4">
              {EMAIL}
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
