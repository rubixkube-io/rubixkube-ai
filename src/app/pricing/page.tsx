import { Metadata } from 'next'
import { PricingPageClient } from './pricing-page-client'
import { PricingPageJsonLd } from '@/components/structured-data'

export const metadata: Metadata = {
  title: 'Pricing - RubixKube',
  description: 'Start free. Scale when you\'re ready. RubixKube pricing: Free tier, Starter at $199/month, Enterprise custom.',
  keywords: [
    'RubixKube pricing',
    'SRE pricing',
    'Site Reliability Intelligence cost',
    'investigation pricing',
    'free tier',
    'enterprise SRE',
  ],
  openGraph: {
    title: 'Pricing - RubixKube | Site Reliability Intelligence',
    description: 'Start free. Scale when you\'re ready. Enterprise when reliability becomes mission-critical.',
    url: 'https://rubixkube.ai/pricing',
  },
  twitter: {
    title: 'Pricing - RubixKube',
    description: 'Start free. Scale when you\'re ready. Enterprise when reliability becomes mission-critical.',
  },
  alternates: {
    canonical: '/pricing',
  },
}

export default function PricingPage() {
  return (
    <>
      <PricingPageJsonLd />
      <PricingPageClient />
    </>
  )
}
