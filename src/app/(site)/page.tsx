import { Navbar } from '@/components/navbar'
import { LandingPage } from '@/components/landing'
import { HomeScrollLock } from '@/components/landing/home-scroll-lock'
import type { Metadata } from 'next'
import { STATIC_MARKETING_OG_URL } from '@/lib/og-metadata'
import { webPageJsonLd, faqPageJsonLd } from '@/components/structured-data'
import { homepageFaqItems } from '@/data/homepage-faq'

export const metadata: Metadata = {
  title: 'RubixKube | Site Reliability Intelligence',
  description:
    'Your infrastructure, healing itself. AI-native SRI that detects anomalies, diagnoses root cause, and resolves failures autonomously.',
  keywords: [
    'site reliability intelligence',
    'SRI',
    'AI SRE',
    'AIOps',
    'autonomous remediation',
    'incident response automation',
    'root cause analysis',
    'Kubernetes reliability',
    'reduce MTTR',
    'SLO management',
  ],
  openGraph: {
    title: 'RubixKube | Site Reliability Intelligence',
    description:
      'Infrastructure that heals itself. Detect anomalies, diagnose root cause, resolve autonomously before customers feel it.',
    url: 'https://rubixkube.ai',
    siteName: 'RubixKube',
    type: 'website',
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
    title: 'RubixKube | Site Reliability Intelligence',
    description:
      'Infrastructure that heals itself. Detect anomalies, diagnose root cause, resolve autonomously before customers feel it.',
    images: [STATIC_MARKETING_OG_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
}

const pageJsonLd = webPageJsonLd({
  name: 'RubixKube | Site Reliability Intelligence',
  description: 'Your infrastructure, healing itself. AI-native SRI that detects anomalies, diagnoses root cause, and resolves failures autonomously.',
  url: 'https://rubixkube.ai',
})

const faqItems = homepageFaqItems.map((item) => ({ question: item.q, answer: item.a }))

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faqItems)) }}
      />
      <HomeScrollLock />
      <Navbar />
      <LandingPage />
    </>
  )
}
