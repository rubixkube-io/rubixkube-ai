import { Metadata } from 'next'
import { PlatformPageClient } from './platform-page-client'
import { webPageJsonLd, faqPageJsonLd } from '@/components/structured-data'
import { platformFaqItems } from '@/data/platform-faq'

export const metadata: Metadata = {
  title: "RubixKube Platform - AI Agents for Reliability",
  description: "Explore our agent mesh that observes, plans, acts, and learns. Closed-loop remediation with guardrails, audit trails, and clear explanations.",
  keywords: [
    "agent mesh",
    "observe plan act learn",
    "guardrails",
    "auditability",
    "explainable automation",
    "RCA"
  ],
  openGraph: {
    title: "RubixKube Platform - AI Agents for Reliability",
    description: "Explore our agent mesh that observes, plans, acts, and learns. Closed-loop remediation with guardrails, audit trails, and clear explanations.",
    url: "https://rubixkube.ai/platform",
  },
  twitter: {
    card: 'summary_large_image',
    title: "RubixKube Platform - AI Agents for Reliability",
    description: "Explore our agent mesh that observes, plans, acts, and learns. Closed-loop remediation with guardrails, audit trails, and clear explanations.",
  },
}

const pageJsonLd = webPageJsonLd({
  name: 'RubixKube Platform - AI Agents for Reliability',
  description: 'Explore our agent mesh that observes, plans, acts, and learns. Closed-loop remediation with guardrails, audit trails, and clear explanations.',
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
