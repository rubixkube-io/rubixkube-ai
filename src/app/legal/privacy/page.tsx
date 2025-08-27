import { Metadata } from 'next'
import { PrivacyPageClient } from './privacy-page-client'

export const metadata: Metadata = {
  title: "Privacy Policy - RubixKube",
  description: "How RubixKube collects, uses, and protects data across the platform, APIs, and integrations, with controls for security and compliance.",
  openGraph: {
    title: "Privacy Policy - RubixKube",
    description: "How RubixKube collects, uses, and protects data across the platform, APIs, and integrations, with controls for security and compliance.",
    url: "https://rubixkube.ai/legal/privacy",
    images: [
      {
        url: "https://rubixkube.ai/og.jpg",
        width: 1200,
        height: 630,
        alt: "Privacy Policy - RubixKube"
      }
    ],
  },
  twitter: {
    title: "Privacy Policy - RubixKube",
    description: "How RubixKube collects, uses, and protects data across the platform, APIs, and integrations, with controls for security and compliance.",
    images: ["https://rubixkube.ai/og.jpg"],
  },
}

export default function PrivacyPage() {
  return <PrivacyPageClient />
}
