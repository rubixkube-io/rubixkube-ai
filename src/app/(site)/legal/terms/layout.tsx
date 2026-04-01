import type { Metadata } from 'next'
import { STATIC_MARKETING_OG_URL } from '@/lib/og-metadata'

export const metadata: Metadata = {
  title: "Terms of Service - RubixKube",
  description: "Read RubixKube's terms of service. Understand your rights and responsibilities when using our platform and services.",
  keywords: [
    "terms of service",
    "legal terms",
    "service agreement",
    "usage terms"
  ],
  openGraph: {
    title: "Terms of Service - RubixKube",
    description:
      "Read RubixKube's terms of service. Understand your rights and responsibilities when using our platform and services.",
    url: "https://rubixkube.ai/legal/terms",
    images: [
      {
        url: STATIC_MARKETING_OG_URL,
        width: 1200,
        height: 630,
        alt: "Terms of Service - RubixKube",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - RubixKube",
    description:
      "Read RubixKube's terms of service. Understand your rights and responsibilities when using our platform and services.",
    images: [STATIC_MARKETING_OG_URL],
  },
  alternates: {
    canonical: '/legal/terms',
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
