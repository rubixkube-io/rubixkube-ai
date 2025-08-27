import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { WhySectionServer } from '@/components/why-section-server'
import { SRIFlow } from '@/components/sri-flow'
import { FeaturesGridServer } from '@/components/features-grid-server'
import { UseCasesServer } from '@/components/use-cases-server'
import { TestimonialsServer } from '@/components/testimonials-server'
import { ClosingCTA } from '@/components/closing-cta'
import { Footer } from '@/components/footer'
import { StructuredData } from '@/components/structured-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RubixKube - Site Reliability Intelligence for the AI Era',
  description: 'Detect, diagnose, and heal production issues before customers feel them. Autonomous remediation with approvals for Kubernetes and cloud-native stacks.',
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
    'SLO management'
  ],
  openGraph: {
    title: 'RubixKube - Site Reliability Intelligence',
    description: 'Detect, diagnose, and heal issues before customers feel them.',
    url: 'https://rubixkube.io',
    siteName: 'RubixKube',
    type: 'website',
    images: [
      {
        url: 'https://rubixkube.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RubixKube - Site Reliability Intelligence'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RubixKube - Site Reliability Intelligence',
    description: 'Detect, diagnose, and heal issues before customers feel them.',
    images: ['https://rubixkube.io/og-image.png']
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
  verification: {
    google: 'your-google-site-verification-code',
  },
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <WhySectionServer />
          <SRIFlow />
          <FeaturesGridServer />
          <UseCasesServer />
          <TestimonialsServer />
          <ClosingCTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
