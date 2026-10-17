import { Metadata } from 'next'
import { HubblePageClient } from './hubble-page-client'
import { webPageJsonLd } from '@/components/structured-data'

const title = 'Hubble by RubixKube - On-call scheduling and paging'
const description =
  'Hubble keeps watch so your team can sleep. Rosters, escalation with timers, acknowledgements, contact rules, a phone app and Slack. Add RubixKube and on-call gets quieter.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'on-call scheduling',
    'on-call rotation',
    'escalation policy',
    'incident paging',
    'Hubble',
    'RubixKube',
  ],
  openGraph: {
    title,
    description,
    url: 'https://rubixkube.ai/hubble',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

const pageJsonLd = webPageJsonLd({
  name: title,
  description,
  url: 'https://rubixkube.ai/hubble',
})

export default function HubblePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <HubblePageClient />
    </>
  )
}
