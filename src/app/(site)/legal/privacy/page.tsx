import { Metadata } from 'next'
import { STATIC_MARKETING_OG_URL } from '@/lib/og-metadata'
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
        url: STATIC_MARKETING_OG_URL,
        width: 1200,
        height: 630,
        alt: "Privacy Policy - RubixKube"
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Privacy Policy - RubixKube",
    description: "How RubixKube collects, uses, and protects data across the platform, APIs, and integrations, with controls for security and compliance.",
    images: [STATIC_MARKETING_OG_URL],
  },
}

export default function PrivacyPage() {
  return <PrivacyPageClient />
}
