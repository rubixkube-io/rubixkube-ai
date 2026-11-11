'use client'

import { useId, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const sans = 'font-[family-name:var(--font-figtree)]'

/** An email field and a button, submitted as the Netlify form `kepler-notify`. */
export function NotifyForm({ className }: { className?: string }) {
  const id = useId()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    const botField = String(new FormData(e.currentTarget as HTMLFormElement).get('bot-field') ?? '')
    setStatus('sending')
    try {
      const response = await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'kepler-notify', email, 'bot-field': botField }).toString(),
      })
      if (!response.ok) throw new Error('Submission failed')
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'done') {
    return <p role="status" className={`${sans} m-0 text-[15px] text-[var(--ink)] ${className ?? ''}`}>We will email you on the 20th.</p>
  }

  return (
    <div className={className}>
      <form
        onSubmit={submit}
        name="kepler-notify"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        className="flex flex-col gap-3 sm:flex-row"
      >
        <input type="hidden" name="form-name" value="kepler-notify" />
        <div style={{ display: 'none' }}>
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </div>
        <label htmlFor={id} className="sr-only">
          Email
        </label>
        <Input
          id={id}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-[3.1rem] sm:max-w-[20rem]"
        />
        <Button type="submit" size="lg" disabled={status === 'sending'}>
          Notify me
        </Button>
      </form>
      {status === 'failed' && (
        <p role="alert" className={`${sans} m-0 mt-3 text-[14px] text-[var(--red)]`}>
          Something went wrong. Try again.
        </p>
      )}
    </div>
  )
}
