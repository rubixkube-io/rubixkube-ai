'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import posthog from 'posthog-js'
import { Button } from '@/components/ui/button'

/** The footer's "Cookie settings" sends this to open the banner again. */
export const COOKIE_SETTINGS_EVENT = 'rk:cookie-settings'

/**
 * Asks before analytics. PostHog runs with cookieless_mode "on_reject" (src/instrumentation-client.ts):
 * nothing is captured until a choice is made, Accept turns on cookies and full analytics,
 * Decline keeps the browser free of cookies. PostHog stores the choice, so this shows once.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // PostHog only starts in production builds; without it there is nothing to ask about
    if (!posthog.__loaded) return
    if (posthog.get_explicit_consent_status() === 'pending') setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen)
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen)
  }, [])

  if (!open) return null

  const choose = (accept: boolean) => {
    if (accept) posthog.opt_in_capturing()
    else posthog.opt_out_capturing()
    setOpen(false)
  }

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className="fixed right-3 bottom-3 left-3 z-[100] rounded-md border border-[var(--border)] bg-[var(--bg)] p-5 shadow-[0_8px_32px_rgba(17,19,24,0.14)] sm:right-auto sm:bottom-6 sm:left-6 sm:max-w-sm"
    >
      <p className="font-[family-name:var(--font-mono)] text-[12px] leading-relaxed text-[var(--mid)]">
        We use cookies to see how people use this site, so we can improve it. No ads. Learn more in
        our{' '}
        <Link href="/legal/privacy" className="text-[var(--ink)] underline underline-offset-4 hover:text-[var(--blue)]">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <Button size="sm" className="flex-1" onClick={() => choose(true)}>
          Accept
        </Button>
        <Button size="sm" variant="secondary" className="flex-1" onClick={() => choose(false)}>
          Decline
        </Button>
      </div>
    </div>
  )
}
