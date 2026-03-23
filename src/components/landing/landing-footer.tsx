'use client'

import { FooterBody } from '@/components/footer'
import { LandingContentCards } from './content-cards-section'

/**
 * Homepage only: one `<footer>` with full-bleed content cards on top and site chrome below
 * (replacing a separate `ContentCardsSection` + `Footer` stack).
 */
export function LandingFooter() {
  return (
    <footer
      className="rk-landing-footer landing-snap-section flex min-h-[calc(100vh-var(--nav-stack))] w-full shrink-0 flex-col bg-[var(--bg)] lg:min-h-[calc(100vh-var(--nav-stack))]"
      aria-label="Featured articles, resources, and site footer"
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <LandingContentCards />
      </div>
      <div className="shrink-0 border-t border-[var(--rule)] bg-[var(--background-secondary)] px-[var(--pad)] pt-14 pb-16 md:pt-16 md:pb-20">
        <div className="rk-landing-max w-full">
          <FooterBody />
        </div>
      </div>
    </footer>
  )
}
