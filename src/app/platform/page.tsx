import { Metadata } from 'next'
import { PlatformPageClient } from './platform-page-client'

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
    url: "https://rubixkube.io/platform",
    images: [
      {
        url: "https://rubixkube.io/og.png",
        width: 1200,
        height: 630,
        alt: "RubixKube Platform - AI Agents for Reliability"
      }
    ],
  },
  twitter: {
    title: "RubixKube Platform - AI Agents for Reliability",
    description: "Explore our agent mesh that observes, plans, acts, and learns. Closed-loop remediation with guardrails, audit trails, and clear explanations.",
    images: ["https://rubixkube.io/og.png"],
  },
}

export default function PlatformPage() {
  return <PlatformPageClient />
}
