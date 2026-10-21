'use client'

import { useRef } from 'react'
import { LandingScrollRootRefContext } from './landing-scroll-context'
import { FilmSection, HeroSection } from './hero-section'
import { MetricsSection } from './metrics-section'
import { BrainSection } from './brain-section'
import { TestimonialsSection } from './testimonials-section'
import { ClosingLandingSection } from './closing-landing-section'
import { LandingFooter } from './landing-footer'
import type { LandingContentCardsProps } from './content-cards-section'
import type { BeliefStory } from '@/lib/landing-featured-content'
import { BeliefsSection } from './beliefs-section'
import { ProductsSection } from './products-section'

export function LandingPage({
  latestPodcast,
  latestBlog,
  beliefStories,
}: LandingContentCardsProps & { beliefStories: Record<string, BeliefStory> }) {
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <LandingScrollRootRefContext.Provider value={mainRef}>
      <main
        ref={mainRef}
        id="landing-scroll"
        className="landing-scroll scrollbar-hide"
      >
        <HeroSection />
        <FilmSection />
        <MetricsSection />
        <BrainSection />
        <ProductsSection />
        <BeliefsSection stories={beliefStories} />
        <TestimonialsSection />
        <ClosingLandingSection />
        <LandingFooter latestPodcast={latestPodcast} latestBlog={latestBlog} />
      </main>
    </LandingScrollRootRefContext.Provider>
  )
}
