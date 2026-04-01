'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowRight, Check } from "lucide-react"
import { fadeUpVariants } from "@/lib/animations"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Button } from "@/components/ui/button"

interface NewsletterSignupProps {
  compact?: boolean
  className?: string
}

export function NewsletterSignup({ compact = false, className = "" }: NewsletterSignupProps) {
  const prefersReducedMotion = useReducedMotion()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'newsletter', email }).toString(),
      })

      if (!response.ok) throw new Error('Submission failed')

      setSubscribed(true)
      setEmail('')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (compact) {
    return (
      <motion.div
        className={`rounded-2xl border border-[var(--rule)] bg-[var(--bg)] p-6 ${className}`}
        variants={fadeUpVariants}
        {...(prefersReducedMotion ? { initial: "visible" } : {
          initial: "hidden",
          animate: "visible",
          transition: { delay: 0.8 }
        })}
      >
        {subscribed ? (
          <div className="text-center">
            <div className="w-10 h-10 bg-[var(--green)]/10 flex items-center justify-center mx-auto mb-3 rounded-lg">
              <Check className="w-5 h-5 text-[var(--green)]" />
            </div>
            <h3
              className="text-[16px] leading-snug tracking-[-0.02em] text-[var(--ink)] mb-2"
              style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
            >
              You&apos;re subscribed!
            </h3>
            <p className="font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)]">
              Welcome to the reliability era.
            </p>
          </div>
        ) : (
          <>
            <h3
              className="text-[16px] leading-snug tracking-[-0.02em] text-[var(--ink)] mb-2"
              style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
            >
              Stay Updated
            </h3>
            <p className="font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)] mb-4">
              Get the latest insights on infrastructure reliability.
            </p>
            <form
              onSubmit={handleSubmit}
              name="newsletter"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              className="space-y-3"
            >
              <input type="hidden" name="form-name" value="newsletter" />
              <div style={{ display: 'none' }}>
                <input name="bot-field" />
              </div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg px-3 py-2 bg-[var(--bg)] border border-[var(--rule)] font-[family-name:var(--font-mono)] text-xs font-light text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]/50 focus:border-[var(--blue)] transition-colors"
                required
              />
              <Button type="submit" disabled={isLoading} size="sm" className="w-full">
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
              {error && (
                <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--red)] text-center">{error}</p>
              )}
            </form>
          </>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`rounded-2xl border border-[var(--rule)] bg-[var(--bg)] p-6 sm:p-8 md:p-10 ${className}`}
      variants={fadeUpVariants}
      {...(prefersReducedMotion ? { initial: "visible" } : {
        initial: "hidden",
        animate: "visible",
        transition: { delay: 0.5 }
      })}
    >
      {subscribed ? (
        <div className="text-center">
          <div className="w-14 h-14 bg-[var(--green)]/10 flex items-center justify-center mx-auto mb-4 rounded-xl">
            <Check className="w-7 h-7 text-[var(--green)]" />
          </div>
          <h3 className="font-[family-name:var(--font-serif)] text-[clamp(1.5rem,3vw,2rem)] font-light leading-[1.1] text-[var(--ink)] mb-3">
            Welcome aboard!
          </h3>
          <p className="font-[family-name:var(--font-mono)] text-[14px] font-light leading-relaxed text-[var(--mid)]">
            You&apos;ll receive our latest insights on infrastructure reliability and AI operations.
          </p>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-[var(--blue)]/10 flex items-center justify-center mx-auto mb-4 rounded-xl">
              <Mail className="w-6 h-6 text-[var(--blue)]" />
            </div>
            <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] mb-3">
              Stay ahead of the <span className="italic text-[var(--blue)]">reliability</span> curve
            </h2>
            <p className="font-[family-name:var(--font-mono)] text-[14px] font-light leading-relaxed text-[var(--mid)] max-w-md mx-auto">
              Join engineers getting insights on infrastructure reliability,
              AI operations, and the future of SRE.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            name="newsletter"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <div style={{ display: 'none' }}>
              <input name="bot-field" />
            </div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-lg px-4 py-3 bg-[var(--bg)] border border-[var(--rule)] font-[family-name:var(--font-mono)] text-xs font-light text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]/50 focus:border-[var(--blue)] transition-colors"
              required
            />
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto whitespace-nowrap flex items-center gap-2">
              {isLoading ? 'Subscribing...' : (
                <>
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {error && (
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--red)] mt-2 text-center">{error}</p>
          )}

          <p className="font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)] mt-4 text-center">
            No spam, unsubscribe at any time. Read our{" "}
            <a href="/legal/privacy" className="text-[var(--blue)] hover:underline transition-colors">
              privacy policy
            </a>
            .
          </p>
        </>
      )}
    </motion.div>
  )
}
