import { Metadata } from 'next'
import { PricingPageClient } from './pricing-page-client'
import { PricingPageJsonLd } from '@/components/structured-data'

export const metadata: Metadata = {
  title: 'Pricing - RubixKube',
  description: 'Individual is free. Business is $999 a month or $9,999 a year. Enterprise is custom. Add Hubble for on-call at $10 a seat.',
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
    card: 'summary_large_image',
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
