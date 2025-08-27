import { Metadata } from 'next'
import { SolutionsPageClient } from './solutions-page-client'

export const metadata: Metadata = {
  title: "Solutions - Reduce MTTR, End Alert Fatigue",
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
    title: "Solutions - Reduce MTTR, End Alert Fatigue",
    description: "Cut MTTR by up to 80%, reduce noise, and stop revenue risk. RubixKube turns firefighting into foresight with autonomous, safe remediation.",
    url: "https://rubixkube.io/solutions",
    images: [
      {
        url: "https://rubixkube.io/og.png",
        width: 1200,
        height: 630,
        alt: "Solutions - Reduce MTTR, End Alert Fatigue"
      }
    ],
  },
  twitter: {
    title: "Solutions - Reduce MTTR, End Alert Fatigue",
    description: "Cut MTTR by up to 80%, reduce noise, and stop revenue risk. RubixKube turns firefighting into foresight with autonomous, safe remediation.",
    images: ["https://rubixkube.io/og.png"],
  },
}

export default function SolutionsPage() {
  return <SolutionsPageClient />
}
