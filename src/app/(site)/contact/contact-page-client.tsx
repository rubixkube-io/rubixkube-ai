'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Script from 'next/script'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { PageHero } from '@/components/page-hero'
import { Footer } from '@/components/footer'
import { ClosingCTA } from '@/components/closing-cta'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'
import { Mail, MapPin, Check } from 'lucide-react'
import { CALENDLY_DEMO_URL } from '@/lib/calendly-demo-url'
import { siteButton } from '@/lib/site-ui'

/** A field label: Figtree, small, in ink */
const label = 'mb-2 block font-[family-name:var(--font-figtree)] text-[14px] font-medium text-[var(--ink)]'

export function ContactPageClient() {
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState<string | null>(null)
  const calendlyRef = useRef<HTMLDivElement>(null)

  const calendlyUrl = `${CALENDLY_DEMO_URL}?hide_event_type_details=1&hide_gdpr_banner=1&hide_landing_page_details=1`

  useEffect(() => {
    const win = window as unknown as Record<string, { initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void }>
    if (calendlyRef.current && win.Calendly) {
      win.Calendly.initInlineWidget({
        url: calendlyUrl,
        parentElement: calendlyRef.current,
      })
    }
  }, [calendlyUrl])

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

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      description: 'Send us a message directly',
      contact: 'connect@rubixkube.ai',
      href: 'mailto:connect@rubixkube.ai',
      accent: 'bg-[var(--bg)] text-[var(--ink)] ring-1 ring-[var(--rule)]',
    },
    {
      icon: MapPin,
      label: 'Office',
      description: 'RubixKube Intelligence Private Limited',
      contact: 'India',
      href: '#',
      accent: 'bg-[var(--bg)] text-[var(--ink)] ring-1 ring-[var(--rule)]',
    },
  ]

  // the newsletter signup's field: panel paper, a hairline ring, ink when focused
  const fieldClass = (name: string) =>
    `w-full min-w-0 rounded-[6px] bg-[var(--panel)] px-4 py-[11px] font-[family-name:var(--font-figtree)] text-[15px] leading-[22px] text-[var(--ink)] ring-1 outline-none transition-shadow placeholder:text-[var(--mid)] ${
      focused === name
        ? 'ring-[var(--ink)]'
        : 'ring-[var(--rule)] hover:ring-[var(--mid)]'
    }`

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-[var(--bg)]">
        <PageHero
          title="Get in touch."
          lede="Have questions about RubixKube? Need help getting started? We're here to help."
        />
      </section>

      {/* ── Calendly + Contact ── */}
      <section className="border-t border-[var(--rule)] bg-[var(--background-secondary)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-stretch">

            {/* Left: cards + Calendly stacked */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-8% 0px' }}
              className="flex flex-col gap-4"
            >
              {contactMethods.map((method) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  variants={fadeUpVariants}
                  className="group flex items-start gap-4 rounded-2xl bg-[var(--panel)] p-5 ring-1 ring-[var(--rule)]"
                >
                  <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${method.accent}`}>
                    <method.icon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="m-0 font-[family-name:var(--font-mono)] text-[12px] tracking-[0.12em] text-[var(--mid)] uppercase">
                      {method.label}
                    </p>
                    <p className="m-0 mt-1 font-[family-name:var(--font-figtree)] text-[15px] text-[var(--mid)]">
                      {method.description}
                    </p>
                    <p className="m-0 mt-1 font-[family-name:var(--font-figtree)] text-[16px] font-medium text-[var(--ink)]">
                      {method.contact}
                    </p>
                  </div>
                </motion.a>
              ))}

              <motion.div variants={fadeUpVariants} className="overflow-hidden rounded-2xl bg-[var(--bg)] ring-1 ring-[var(--rule)]">
                <div
                  ref={calendlyRef}
                  className="-mt-6"
                  style={{ minWidth: '320px', height: '700px' }}
                ></div>
                <Script
                  src="https://assets.calendly.com/assets/external/widget.js"
                  strategy="afterInteractive"
                  onLoad={() => {
                    const win = window as unknown as Record<string, { initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void }>
                    if (calendlyRef.current && win.Calendly) {
                      win.Calendly.initInlineWidget({
                        url: calendlyUrl,
                        parentElement: calendlyRef.current,
                      })
                    }
                  }}
                />
              </motion.div>

            </motion.div>

            {/* Right: form only */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-8% 0px' }}
              className="flex flex-col rounded-2xl bg-[var(--panel)] p-8 ring-1 ring-[var(--rule)] sm:p-10"
            >
              <motion.div variants={fadeUpVariants} className="pb-2">
                <h2 className="rk-section-title m-0 text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.15] tracking-[-0.02em] text-[var(--ink)]">
                  Send us a message
                </h2>
                <p className="rk-section-body m-0 mt-2 text-[15px] text-[var(--mid)]">
                  Fill in the details below and we&apos;ll get back to you within a few hours.
                </p>
              </motion.div>

              <div className="h-8" />

              {submitted ? (
                <motion.div
                  variants={fadeUpVariants}
                  className="flex flex-col items-center gap-6 py-16 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--green)]/10">
                    <Check className="h-7 w-7 text-[var(--green)]" />
                  </div>
                  <div>
                    <p className="rk-section-title m-0 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.1] text-[var(--ink)]">
                      Message <em>received.</em>
                    </p>
                    <p className="rk-section-body m-0 mt-3 text-[var(--mid)]">
                      We&apos;ll get back to you within an hour.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  variants={fadeUpVariants}
                  name="contact"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <div style={{ display: 'none' }}>
                    <input name="bot-field" />
                  </div>

                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <label className={label}>
                        Full Name *
                      </label>
                      <input
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
                      <label className={label}>
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Your company"
                        className={fieldClass('company')}
                        onFocus={() => setFocused('company')}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <label className={label}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@company.com"
                        className={fieldClass('email')}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        required
                      />
                    </div>
                    <div>
                      <label className={label}>
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="What's this about?"
                        className={fieldClass('subject')}
                        onFocus={() => setFocused('subject')}
                        onBlur={() => setFocused(null)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={label}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      className={`${fieldClass('message')} resize-none`}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      required
                    />
                  </div>

                  {error && (
                    <p className="m-0 font-[family-name:var(--font-figtree)] text-[14px] text-[var(--red)]">
                      {error}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-6 pt-2">
                    <p className="m-0 font-[family-name:var(--font-figtree)] text-[14px] text-[var(--mid)]">
                      By submitting you agree to our{' '}
                      <Link href="/legal/privacy" className="text-[var(--ink)] underline decoration-[var(--rule)] underline-offset-4 hover:decoration-[var(--ink)]">
                        Privacy Policy
                      </Link>
                      {' '}and{' '}
                      <Link href="/legal/terms" className="text-[var(--ink)] underline decoration-[var(--rule)] underline-offset-4 hover:decoration-[var(--ink)]">
                        Terms
                      </Link>.
                    </p>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`${siteButton} shrink-0 cursor-pointer disabled:cursor-default disabled:opacity-60`}
                    >
                      {isLoading ? 'Sending…' : 'Send Message'}
                    </button>
                  </div>
                </motion.form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </>
  )
}
