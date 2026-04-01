import { Metadata } from 'next'
import { STATIC_MARKETING_OG_URL } from '@/lib/og-metadata'
import { StatusPageClient } from './status-page-client'

export const metadata: Metadata = {
  title: 'System Status - RubixKube',
  description: 'Real-time health status of all RubixKube platform services.',
  openGraph: {
    title: 'System Status - RubixKube',
    description: 'Real-time health status of all RubixKube platform services.',
    url: 'https://rubixkube.ai/status',
    images: [
      {
        url: STATIC_MARKETING_OG_URL,
        width: 1200,
        height: 630,
        alt: 'RubixKube | Site Reliability Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'System Status - RubixKube',
    description: 'Real-time health status of all RubixKube platform services.',
    images: [STATIC_MARKETING_OG_URL],
  },
  alternates: {
    canonical: '/status',
  },
}

export default function StatusPage() {
  return <StatusPageClient />
}
