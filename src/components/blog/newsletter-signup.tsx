'use client'

import Link from 'next/link'
import { useState } from "react"
import { Check } from "lucide-react"

interface NewsletterSignupProps {
  compact?: boolean
  className?: string
}

/** The site's main button: solid blue, Figtree, 6px corners */
const button =
  'inline-flex h-11 shrink-0 cursor-pointer items-center justify-center rounded-[6px] bg-[var(--blue)] px-5 font-[family-name:var(--font-figtree)] text-[15px] font-medium text-white transition-[box-shadow,opacity] duration-200 hover:shadow-[0_6px_24px_rgba(47,91,255,0.35)] active:translate-y-px disabled:cursor-default disabled:opacity-60'

const input =
  'h-11 w-full min-w-0 rounded-[6px] bg-[var(--panel)] px-4 font-[family-name:var(--font-figtree)] text-[15px] text-[var(--ink)] ring-1 ring-[var(--rule)] outline-none placeholder:text-[var(--mid)] focus:ring-[var(--ink)]'

/**
 * The newsletter signup. The full one is a row: what it is on the left, the form on the right.
 * The compact one stacks, for the end of an article or a side column.
 */
export function NewsletterSignup({ compact = false, className = "" }: NewsletterSignupProps) {
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

  const form = (stack: boolean) => (
    <form
      onSubmit={handleSubmit}
      name="newsletter"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className={stack ? 'grid gap-3' : 'flex flex-col gap-3 sm:flex-row'}
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
        placeholder="Email address"
        aria-label="Email address"
        className={input}
        required
      />
      <button type="submit" disabled={isLoading} className={button}>
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  )

  const done = (
    <p className="m-0 flex items-center gap-2 font-[family-name:var(--font-figtree)] text-[15px] text-[var(--ink)]">
      <Check className="h-4 w-4 text-[var(--green)]" aria-hidden />
      You&apos;re subscribed.
    </p>
  )

  const failed = error && (
    <p className="m-0 mt-2 font-[family-name:var(--font-figtree)] text-[14px] text-[var(--red)]">{error}</p>
  )

  if (compact) {
    return (
      <div className={`border-t border-[var(--rule)] pt-8 ${className}`}>
        <h3 className="rk-section-title m-0 text-[18px] leading-[1.3] tracking-[-0.01em] text-[var(--ink)]">
          Stay updated
        </h3>
        <p className="rk-section-body m-0 mt-1.5 mb-5 text-[15px] text-[var(--mid)]">
          Get the latest insights on infrastructure reliability.
        </p>
        {subscribed ? done : form(true)}
        {failed}
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 items-end gap-8 text-left md:grid-cols-2 md:gap-16 ${className}`}>
      <div>
        <h2 className="rk-section-title m-0 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] text-[var(--ink)]">
          Stay ahead of the <em>reliability</em> curve
        </h2>
        <p className="rk-section-body m-0 mt-4 max-w-[30em] text-[var(--mid)]">
          Join engineers getting insights on infrastructure reliability, AI operations, and the future of SRE.
        </p>
      </div>
      <div>
        {subscribed ? done : form(false)}
        {failed}
        <p className="m-0 mt-3 font-[family-name:var(--font-figtree)] text-[14px] text-[var(--mid)]">
          No spam, unsubscribe at any time. Read our{' '}
          <Link href="/legal/privacy" className="text-[var(--ink)] underline decoration-[var(--rule)] underline-offset-4 hover:decoration-[var(--ink)]">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
