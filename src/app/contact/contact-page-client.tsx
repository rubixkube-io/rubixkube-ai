'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ClosingCTA } from '@/components/closing-cta'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'
import { Mail, MapPin, Send, Clock, MessageSquare, Check } from 'lucide-react'

export function ContactPageClient() {
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

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
    },
    {
      icon: MessageSquare,
      label: 'Live Chat',
      description: 'Get instant support',
      contact: 'Available 24/7',
      href: '#',
    },
    {
      icon: Clock,
      label: 'Response Time',
      description: 'We typically respond within',
      contact: '2–4 hours',
      href: '#',
    },
    {
      icon: MapPin,
      label: 'Office',
      description: 'RubixKube Intelligence Private Limited',
      contact: 'India',
      href: '#',
    },
  ]

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

      {/* ── Form + Contact Info ── */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_380px] lg:items-start">

            {/* Left: form */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-8% 0px' }}
            >
              <motion.span
                variants={fadeUpVariants}
                className="mb-8 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase"
              >
                Send a Message
              </motion.span>

              {submitted ? (
                <motion.div
                  variants={fadeUpVariants}
                  className="flex flex-col items-center gap-5 py-16 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--rule)]">
                    <Check className="h-6 w-6 text-[var(--blue)]" />
                  </div>
                  <p className="font-[family-name:var(--font-serif)] text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] font-light text-[var(--ink)]">
                    Message <span className="italic text-[var(--blue)]">received.</span>
                  </p>
                  <p className="font-[family-name:var(--font-mono)] text-[14px] font-light text-[var(--mid)]">
                    We&apos;ll get back to you within 2–4 hours.
                  </p>
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

                  {/* Name + Company */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-[var(--ink)] uppercase">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        className="w-full border-[var(--rule)] bg-transparent font-[family-name:var(--font-mono)] text-[13px] text-[var(--ink)] placeholder:text-[var(--mid)] focus-visible:ring-[var(--blue)]"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-[var(--ink)] uppercase">
                        Company
                      </label>
                      <Input
                        type="text"
                        name="company"
                        placeholder="Your company"
                        className="w-full border-[var(--rule)] bg-transparent font-[family-name:var(--font-mono)] text-[13px] text-[var(--ink)] placeholder:text-[var(--mid)] focus-visible:ring-[var(--blue)]"
                      />
                    </div>
                  </div>

                  {/* Email + Subject */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-[var(--ink)] uppercase">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        className="w-full border-[var(--rule)] bg-transparent font-[family-name:var(--font-mono)] text-[13px] text-[var(--ink)] placeholder:text-[var(--mid)] focus-visible:ring-[var(--blue)]"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-[var(--ink)] uppercase">
                        Subject *
                      </label>
                      <Input
                        type="text"
                        name="subject"
                        placeholder="What's this about?"
                        className="w-full border-[var(--rule)] bg-transparent font-[family-name:var(--font-mono)] text-[13px] text-[var(--ink)] placeholder:text-[var(--mid)] focus-visible:ring-[var(--blue)]"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-[var(--ink)] uppercase">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Tell us how we can help you..."
                      className="w-full min-h-[160px] border-[var(--rule)] bg-transparent font-[family-name:var(--font-mono)] text-[13px] text-[var(--ink)] placeholder:text-[var(--mid)] focus-visible:ring-[var(--blue)] resize-none"
                      required
                    />
                  </div>

                  {error && (
                    <p className="font-[family-name:var(--font-mono)] text-[12px] text-red-500">
                      {error}
                    </p>
                  )}

                  <div className="flex items-center gap-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center gap-2 rounded-[6px] bg-[var(--blue)] px-[30px] py-[13px] font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-white uppercase transition-colors hover:bg-blue-700 disabled:opacity-50"
                    >
                      <Send className="h-3.5 w-3.5" />
                      {isLoading ? 'Sending…' : 'Send Message'}
                    </button>

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
                  </div>
                </motion.form>
              )}
            </motion.div>

            {/* Right: contact info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-8% 0px' }}
              className="space-y-4 lg:pt-[2.4rem]"
            >
              <motion.span
                variants={fadeUpVariants}
                className="mb-8 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase"
              >
                Contact Info
              </motion.span>

              {contactMethods.map((method) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  variants={fadeUpVariants}
                  className="group flex items-start gap-4 border border-[var(--rule)] p-5 transition-colors hover:border-[var(--blue)]/30"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--rule)] transition-colors group-hover:border-[var(--blue)]/30">
                    <method.icon className="h-3.5 w-3.5 text-[var(--mid)] transition-colors group-hover:text-[var(--blue)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-[var(--ink)] uppercase">
                      {method.label}
                    </p>
                    <p className="mt-0.5 font-[family-name:var(--font-mono)] text-[12px] font-light text-[var(--mid)]">
                      {method.description}
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-mono)] text-[13px] text-[var(--ink)]">
                      {method.contact}
                    </p>
                  </div>
                </motion.a>
              ))}

              {/* Use cases note */}
              <motion.div
                variants={fadeUpVariants}
                className="border-t border-[var(--rule)] pt-6 mt-6"
              >
                <p className="mb-3 font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-[var(--ink)] uppercase">
                  Why Contact Us?
                </p>
                <ul className="space-y-2">
                  {[
                    'Get help with platform setup and configuration',
                    'Discuss enterprise pricing and custom solutions',
                    'Report bugs or request new features',
                    'Schedule a consultation call',
                    'Learn about integration possibilities',
                  ].map((item) => (
                    <li
                      key={item}
                      className="font-[family-name:var(--font-mono)] text-[12px] font-light text-[var(--mid)]"
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </>
  )
}
