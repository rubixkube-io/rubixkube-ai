import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Terms of Service - RubixKube",
  description: "Read RubixKube's terms of service. Understand your rights and responsibilities when using our platform and services.",
  keywords: [
    "terms of service",
    "legal terms",
    "service agreement",
    "usage terms"
  ],
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
