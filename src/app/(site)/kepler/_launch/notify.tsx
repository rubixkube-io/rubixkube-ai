'use client'

import posthog from 'posthog-js'
import { useState, type FormEvent } from 'react'

/** The email field and button, sent as the Netlify form `kepler-notify` (defined in public/contact-form.html). */
export function Notify() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    const bot = String(new FormData(e.currentTarget).get('bot-field') ?? '')
    setStatus('sending')
    try {
      const res = await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'kepler-notify', email, 'bot-field': bot }).toString(),
      })
      if (!res.ok) throw new Error('Submission failed')
      posthog.capture('kepler_notify_signed_up', { page: location.pathname })
      setStatus('done')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'done') return <p className="notify-done" role="status">You are on the list. We will email you on the 20th.</p>

  return (
    <>
    <form className="notify" name="kepler-notify" onSubmit={submit}>
      <input type="hidden" name="form-name" value="kepler-notify" />
      <input name="bot-field" tabIndex={-1} autoComplete="off" hidden />
      <input
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="you@company.com"
        aria-label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" disabled={status === 'sending'}>
        Notify me
      </button>
    </form>
    {status === 'failed' && (
      <p className="notify-error" role="alert">
        Something went wrong. Try again.
      </p>
    )}
    </>
  )
}
