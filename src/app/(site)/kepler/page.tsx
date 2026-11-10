import { Metadata } from 'next'
import { KeplerPageClient } from './kepler-page-client'
import { faqPageJsonLd, webPageJsonLd } from '@/components/structured-data'
import { FAQ } from './pricing'

const title = 'Kepler, the IDE for operators'
const description = 'A desktop agent for the people who keep systems alive.'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Kepler', 'IDE for operators', 'desktop agent', 'SRE', 'RubixKube'],
  openGraph: {
    title,
    description,
    url: 'https://rubixkube.ai/kepler',
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
  url: 'https://rubixkube.ai/kepler',
})

const faqJsonLd = faqPageJsonLd(FAQ.map(({ question, answer }) => ({ question, answer })))

export default function KeplerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <KeplerPageClient />
    </>
  )
}
