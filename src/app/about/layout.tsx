import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Our Story - RubixKube",
  description: "Learn about RubixKube's journey from a real problem to the bridge between infrastructure and impact. Discover how we're building the default reliability layer for your infra and business.",
  keywords: [
    "RubixKube story",
    "company mission", 
    "infrastructure reliability",
    "AI SRE",
    "site reliability intelligence"
  ],
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
