import type { Metadata } from 'next'
import { BuyPageClient } from './buy-page-client'

export const metadata: Metadata = {
  title: 'Buy Hubble - RubixKube',
  description: 'Buy Hubble seats for on-call scheduling and paging. Pay monthly or yearly by card.',
  alternates: { canonical: '/hubble/buy' },
  // A checkout step, not a page to land on from search
  robots: { index: false, follow: true },
}

export default function HubbleBuyPage() {
  return <BuyPageClient />
}
