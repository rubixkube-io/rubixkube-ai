import { Metadata } from 'next'
import { AboutPageClient } from './about-page-client'

export const metadata: Metadata = {
  title: "About RubixKube - From Outages to Intelligence",
  description: "We built RubixKube from lived pain: late nights and alert floods. Learn how we created an AI reliability brain that keeps systems alive.",
  keywords: [
    "founder story",
    "reliability brain", 
    "why RubixKube",
    "engineer burnout",
    "downtime cost",
    "trust and revenue"
  ],
  openGraph: {
    title: "About RubixKube - From Outages to Intelligence",
    description: "We built RubixKube from lived pain: late nights and alert floods. Learn how we created an AI reliability brain that keeps systems alive.",
    url: "https://rubixkube.ai/about",
    images: [
      {
        url: "https://rubixkube.ai/og.png",
        width: 1200,
        height: 630,
        alt: "About RubixKube - From Outages to Intelligence"
      }
    ],
  },
  twitter: {
    title: "About RubixKube - From Outages to Intelligence",
    description: "We built RubixKube from lived pain: late nights and alert floods. Learn how we created an AI reliability brain that keeps systems alive.",
    images: ["https://rubixkube.ai/og.png"],
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
