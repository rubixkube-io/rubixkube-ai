import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Platform - RubixKube",
  description: "Explore RubixKube's intelligent platform. Discover how our AI agents observe, plan, act, and learn to keep your infrastructure reliable and your business running.",
  keywords: [
    "RubixKube platform",
    "AI agents",
    "infrastructure automation",
    "site reliability",
    "Kubernetes management"
  ],
}

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
