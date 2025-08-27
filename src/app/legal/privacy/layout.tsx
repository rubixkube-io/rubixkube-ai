import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Privacy Policy - RubixKube",
  description: "Learn how RubixKube collects, uses, and protects your data. Our comprehensive privacy policy ensures transparency and compliance.",
  keywords: [
    "privacy policy",
    "data protection",
    "GDPR compliance",
    "data usage"
  ],
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
