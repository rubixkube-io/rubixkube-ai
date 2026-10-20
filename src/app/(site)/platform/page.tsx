import { Metadata } from 'next'
import { PlatformPageClient } from './platform-page-client'
import { webPageJsonLd, faqPageJsonLd } from '@/components/structured-data'
import { platformFaqItems } from '@/data/platform-faq'

export const metadata: Metadata = {
  title: "RubixKube Platform - Know why it broke, in minutes",
  description: "Rubix, an AI agent, watches your infrastructure, finds the cause when something breaks, and fixes it with you. Less noise, the cause in minutes, across your whole stack.",
  keywords: [
    "root cause analysis",
    "incident investigation",
    "Kubernetes incidents",
    "AI SRE agent",
    "RCA",
    "incident management"
  ],
  openGraph: {
    title: "RubixKube Platform - Know why it broke, in minutes",
    description: "Rubix, an AI agent, watches your infrastructure, finds the cause when something breaks, and fixes it with you. Less noise, the cause in minutes, across your whole stack.",
    url: "https://rubixkube.ai/platform",
  },
  twitter: {
    card: 'summary_large_image',
    title: "RubixKube Platform - Know why it broke, in minutes",
    description: "Rubix, an AI agent, watches your infrastructure, finds the cause when something breaks, and fixes it with you. Less noise, the cause in minutes, across your whole stack.",
  },
}

const pageJsonLd = webPageJsonLd({
  name: 'RubixKube Platform - Know why it broke, in minutes',
  description: 'Rubix, an AI agent, watches your infrastructure, finds the cause when something breaks, and fixes it with you. Less noise, the cause in minutes, across your whole stack.',
  url: 'https://rubixkube.ai/platform',
})

const faqItems = platformFaqItems.map((item) => ({ question: item.q, answer: item.a }))

export default function PlatformPage() {
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
      <PlatformPageClient />
    </>
  )
}
