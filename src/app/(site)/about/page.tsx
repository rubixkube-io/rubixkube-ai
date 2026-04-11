import { Metadata } from 'next'
import { AboutPageClient } from './about-page-client'
import { webPageJsonLd, faqPageJsonLd } from '@/components/structured-data'
import { aboutFaqItems } from '@/data/about-faq'

export const metadata: Metadata = {
  title: "About RubixKube - From Outages to Intelligence",
  description: "We built RubixKube from lived pain: late nights and alert floods. Learn how we created an AI reliability brain that keeps systems alive.",
  keywords: [
    "founder story",
    "reliability brain", 
    "why RubixKube",
    "engineer burnout",
    "downtime cost",
    "trust and revenue"
  ],
  openGraph: {
    title: "About RubixKube - From Outages to Intelligence",
    description: "We built RubixKube from lived pain: late nights and alert floods. Learn how we created an AI reliability brain that keeps systems alive.",
    url: "https://rubixkube.ai/about",
  },
  twitter: {
    card: 'summary_large_image',
    title: "About RubixKube - From Outages to Intelligence",
    description: "We built RubixKube from lived pain: late nights and alert floods. Learn how we created an AI reliability brain that keeps systems alive.",
  },
}

const pageJsonLd = webPageJsonLd({
  name: 'About RubixKube - From Outages to Intelligence',
  description: 'We built RubixKube from lived pain: late nights and alert floods. Learn how we created an AI reliability brain that keeps systems alive.',
  url: 'https://rubixkube.ai/about',
  type: 'AboutPage',
})

const faqItems = aboutFaqItems.map((item) => ({ question: item.q, answer: item.a }))

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faqItems)) }}
      />
      <AboutPageClient />
    </>
  )
}
