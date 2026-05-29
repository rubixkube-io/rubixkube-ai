'use client'

import { useRef } from 'react'
import { LandingScrollRootRefContext } from './landing-scroll-context'
import { HeroSection } from './hero-section'
import { MetricsSection } from './metrics-section'
import { IntelligenceSection } from './intelligence-section'
import { BrainSection } from './brain-section'
import { RcaSection } from './rca-section'
import { TestimonialsSection } from './testimonials-section'
import { ClosingLandingSection } from './closing-landing-section'
import { LandingFooter } from './landing-footer'
import type { LandingContentCardsProps } from './content-cards-section'

export function LandingPage({ latestPodcast, latestBlog }: LandingContentCardsProps) {
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <LandingScrollRootRefContext.Provider value={mainRef}>
      <main
        ref={mainRef}
        id="landing-scroll"
        className="landing-scroll scrollbar-hide"
      >
        <HeroSection />
        <MetricsSection />
        <IntelligenceSection />
        <BrainSection />
        <RcaSection />
        <TestimonialsSection />
        <ClosingLandingSection />
        <LandingFooter latestPodcast={latestPodcast} latestBlog={latestBlog} />
      </main>
    </LandingScrollRootRefContext.Provider>
  )
}
