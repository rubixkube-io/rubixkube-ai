'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Script from 'next/script'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ClosingCTA } from '@/components/closing-cta'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'
import { Mail, MapPin, Send, Check, ArrowRight } from 'lucide-react'
import { CALENDLY_DEMO_URL } from '@/lib/calendly-demo-url'

export function ContactPageClient() {
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState<string | null>(null)
  const calendlyRef = useRef<HTMLDivElement>(null)

  const calendlyUrl = `${CALENDLY_DEMO_URL}?hide_event_type_details=1&hide_gdpr_banner=1&hide_landing_page_details=1`

  const initCalendly = () => {
    if (calendlyRef.current && (window as any).Calendly) {
      (window as any).Calendly.initInlineWidget({
        url: calendlyUrl,
        parentElement: calendlyRef.current,
      })
    }
  }

  useEffect(() => {
    if ((window as any).Calendly) initCalendly()
  }, [])

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
      accent: 'bg-[var(--blue)]/[0.07] text-[var(--blue)]',
    },
    {
      icon: MapPin,
      label: 'Office',
      description: 'RubixKube Intelligence Private Limited',
      contact: 'India',
      href: '#',
      accent: 'bg-[var(--blue)]/[0.07] text-[var(--blue)]',
    },
  ]

  const fieldClass = (name: string) =>
    `w-full border-0 border-b-[1.5px] bg-transparent px-0 py-3 font-[family-name:var(--font-mono)] text-[14px] font-light text-[var(--ink)] outline-none transition-all duration-300 placeholder:text-[var(--mid)]/40 ${
      focused === name
        ? 'border-b-[var(--blue)]'
        : 'border-b-[var(--rule)] hover:border-b-[var(--mid)]'
    }`

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-[var(--bg)]">
        <div className="rk-landing-max px-[var(--pad)] pt-[calc(var(--nav-stack)+5rem)] pb-20 text-center">
          <motion.div
            className="mx-auto max-w-3xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={fadeUpVariants}
              className="mb-6 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase"
            >
              Contact
            </motion.span>

            <motion.h1
              variants={fadeUpVariants}
              className="mb-6 font-[family-name:var(--font-serif)] text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)]"
            >
              Get in <span className="italic text-[var(--blue)]">touch.</span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]"
            >
              Have questions about RubixKube? Need help getting started? We&apos;re here to help.
            </motion.p>
          </motion.div>
        </div>
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
                  className="group flex items-start gap-4 border border-[var(--rule)] bg-[var(--bg)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/[0.04]"
                >
                  <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${method.accent} transition-transform duration-300 group-hover:scale-110`}>
                    <method.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-[var(--ink)] uppercase">
                      {method.label}
                    </p>
                    <p className="mt-0.5 font-[family-name:var(--font-mono)] text-[12px] font-light text-[var(--mid)]">
                      {method.description}
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-mono)] text-[13px] font-medium text-[var(--ink)]">
                      {method.contact}
                    </p>
                  </div>
                </motion.a>
              ))}

              <motion.div variants={fadeUpVariants} className="overflow-hidden border border-[var(--rule)] bg-[var(--bg)]">
                <div
                  ref={calendlyRef}
                  className="-mt-6"
                  style={{ minWidth: '320px', height: '700px' }}
                ></div>
                <Script
                  src="https://assets.calendly.com/assets/external/widget.js"
                  strategy="afterInteractive"
                  onLoad={initCalendly}
                />
              </motion.div>

            </motion.div>

            {/* Right: form only */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-8% 0px' }}
              className="flex flex-col rounded-xl border border-[var(--rule)]/60 bg-[#f6f6f4] p-8 shadow-xl shadow-black/[0.03] sm:p-10"
            >
              <motion.div variants={fadeUpVariants} className="pb-2">
                <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.4rem,3vw,2rem)] leading-[1.15] font-light text-[var(--ink)]">
                  Send us a message
                </h2>
                <p className="mt-2 font-[family-name:var(--font-mono)] text-[13px] font-light leading-relaxed text-[var(--mid)]">
                  Fill in the details below and we&apos;ll get back to you within a few hours.
                </p>
              </motion.div>

              <div className="h-8" />

              {submitted ? (
                <motion.div
                  variants={fadeUpVariants}
                  className="flex flex-col items-center gap-6 py-16 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                    <Check className="h-7 w-7 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-serif)] text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] font-light text-[var(--ink)]">
                      Message <span className="italic text-[var(--blue)]">received.</span>
                    </p>
                    <p className="mt-3 font-[family-name:var(--font-mono)] text-[14px] font-light text-[var(--mid)]">
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
                  className="space-y-8"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <div style={{ display: 'none' }}>
                    <input name="bot-field" />
                  </div>

                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-[family-name:var(--font-mono)] text-[11px] tracking-[0.1em] text-[var(--mid)] uppercase">
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
                      <label className="mb-1 block font-[family-name:var(--font-mono)] text-[11px] tracking-[0.1em] text-[var(--mid)] uppercase">
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
                      <label className="mb-1 block font-[family-name:var(--font-mono)] text-[11px] tracking-[0.1em] text-[var(--mid)] uppercase">
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
                      <label className="mb-1 block font-[family-name:var(--font-mono)] text-[11px] tracking-[0.1em] text-[var(--mid)] uppercase">
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
                    <label className="mb-1 block font-[family-name:var(--font-mono)] text-[11px] tracking-[0.1em] text-[var(--mid)] uppercase">
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
                    <p className="font-[family-name:var(--font-mono)] text-[12px] text-red-500">
                      {error}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-6 pt-2">
                    <p className="font-[family-name:var(--font-mono)] text-[11px] font-light text-[var(--mid)]">
                      By submitting you agree to our{' '}
                      <a href="/legal/privacy" className="underline underline-offset-2 hover:text-[var(--ink)]">
                        Privacy Policy
                      </a>
                      {' '}and{' '}
                      <a href="/legal/terms" className="underline underline-offset-2 hover:text-[var(--ink)]">
                        Terms
                      </a>.
                    </p>
                    <Button type="submit" disabled={isLoading} size="lg" className="shrink-0">
                      {isLoading ? 'Sending…' : 'Send Message'}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
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
