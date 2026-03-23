import { Metadata } from 'next'
import { StatusPageClient } from './status-page-client'

export const metadata: Metadata = {
  title: 'System Status - RubixKube',
  description: 'Real-time health status of all RubixKube platform services.',
  openGraph: {
    title: 'System Status - RubixKube',
    description: 'Real-time health status of all RubixKube platform services.',
    url: 'https://rubixkube.ai/status',
  },
  alternates: {
    canonical: '/status',
  },
}

export default function StatusPage() {
  return <StatusPageClient />
}
