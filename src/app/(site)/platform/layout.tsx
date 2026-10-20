import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Platform - RubixKube",
  description: "Rubix, an AI agent, watches your infrastructure, finds the cause when something breaks, and fixes it with you. Less noise, the cause in minutes, across your whole stack.",
  keywords: [
    "RubixKube platform",
    "AI agents",
    "infrastructure automation",
    "site reliability",
    "Kubernetes management"
  ],
  alternates: {
    canonical: '/platform',
  },
}

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
