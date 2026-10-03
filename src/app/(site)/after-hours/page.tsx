import { Metadata } from 'next'
import { STATIC_MARKETING_OG_URL } from '@/lib/og-metadata'
import { webPageJsonLd } from '@/components/structured-data'
import { AfterHoursClient } from './after-hours-client'

const TITLE = 'Rubix is missing - RubixKube After Hours'
const DESCRIPTION =
  'Rubix was last seen at 03:17:42 UTC. He left no note. Everything you need is public. Find Rubix and win.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: 'Rubix is missing.',
    description: DESCRIPTION,
    url: 'https://rubixkube.ai/after-hours',
    images: [{ url: STATIC_MARKETING_OG_URL, width: 1200, height: 630, alt: 'RubixKube | Site Reliability Intelligence' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rubix is missing.',
    description: DESCRIPTION,
    images: [STATIC_MARKETING_OG_URL],
  },
  alternates: { canonical: '/after-hours' },
}

const pageJsonLd = webPageJsonLd({ name: TITLE, description: DESCRIPTION, url: 'https://rubixkube.ai/after-hours' })

export default function AfterHoursPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      <AfterHoursClient />
    </>
  )
}
