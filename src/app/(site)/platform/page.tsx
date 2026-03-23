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
    url: "https://rubixkube.ai/platform",
  },
  twitter: {
    title: "RubixKube Platform - AI Agents for Reliability",
    description: "Explore our agent mesh that observes, plans, acts, and learns. Closed-loop remediation with guardrails, audit trails, and clear explanations.",
  },
}

export default function PlatformPage() {
  return <PlatformPageClient />
}
