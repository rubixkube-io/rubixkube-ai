import { Metadata } from 'next'
import { SolutionsPageClient } from './solutions-page-client'
import { webPageJsonLd, faqPageJsonLd } from '@/components/structured-data'
import { solutionsFaqItems } from '@/data/solutions-faq'

export const metadata: Metadata = {
  title: "RubixKube solves Infrastructure Challenges at scale",
  description: "Cut MTTR by up to 80%, reduce noise, and stop revenue risk. RubixKube turns firefighting into foresight with autonomous, safe remediation.",
  keywords: [
    "reduce MTTR",
    "alert fatigue",
    "prevent outages",
    "revenue at risk",
    "safe rollbacks",
    "capacity optimization",
    "deployment health"
  ],
  openGraph: {
    title: "RubixKube solves Infrastructure Challenges at scale",
    description: "Cut MTTR by up to 80%, reduce noise, and stop revenue risk. RubixKube turns firefighting into foresight with autonomous, safe remediation.",
    url: "https://rubixkube.ai/solutions",
  },
  twitter: {
    card: 'summary_large_image',
    title: "RubixKube solves Infrastructure Challenges at scale",
    description: "Cut MTTR by up to 80%, reduce noise, and stop revenue risk. RubixKube turns firefighting into foresight with autonomous, safe remediation.",
  },
}

const pageJsonLd = webPageJsonLd({
  name: 'RubixKube solves Infrastructure Challenges at scale',
  description: 'Cut MTTR by up to 80%, reduce noise, and stop revenue risk. RubixKube turns firefighting into foresight with autonomous, safe remediation.',
  url: 'https://rubixkube.ai/solutions',
})

const faqItems = solutionsFaqItems.map((item) => ({ question: item.q, answer: item.a }))

export default function SolutionsPage() {
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
      <SolutionsPageClient />
    </>
  )
}
