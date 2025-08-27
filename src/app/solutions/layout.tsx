import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Solutions - RubixKube",
  description: "Discover how RubixKube solves real infrastructure challenges. From incident response to proactive monitoring, see how our AI agents transform your operations.",
  keywords: [
    "infrastructure solutions",
    "incident response",
    "proactive monitoring",
    "AI operations",
    "site reliability solutions"
  ],
}

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
