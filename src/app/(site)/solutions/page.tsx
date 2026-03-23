import { Metadata } from 'next'
import { SolutionsPageClient } from './solutions-page-client'

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
    images: [
      {
        url: "https://rubixkube.ai/og.jpg",
        width: 1200,
        height: 630,
        alt: "RubixKube solves Infrastructure Challenges at scale"
      }
    ],
  },
  twitter: {
    title: "RubixKube solves Infrastructure Challenges at scale",
    description: "Cut MTTR by up to 80%, reduce noise, and stop revenue risk. RubixKube turns firefighting into foresight with autonomous, safe remediation.",
    images: ["https://rubixkube.ai/og.jpg"],
  },
}

export default function SolutionsPage() {
  return <SolutionsPageClient />
}
