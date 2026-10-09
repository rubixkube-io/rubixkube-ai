import { Metadata } from 'next'
import { STATIC_MARKETING_OG_URL } from '@/lib/og-metadata'
import { SlackPageClient } from './slack-page-client'
import { webPageJsonLd } from '@/components/structured-data'

const title = 'Rubix for Slack - RubixKube'
const description =
  'Rubix, the RubixKube agent, in your Slack threads: incidents, root causes and fixes, with approval buttons before any change.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://rubixkube.ai/slack',
    images: [
      {
        url: STATIC_MARKETING_OG_URL,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [STATIC_MARKETING_OG_URL],
  },
  alternates: {
    canonical: '/slack',
  },
}

const pageJsonLd = webPageJsonLd({
  name: title,
  description,
  url: 'https://rubixkube.ai/slack',
})

export default function SlackPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <SlackPageClient />
    </>
  )
}
