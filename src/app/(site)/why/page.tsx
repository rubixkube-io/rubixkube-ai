import { HomePage } from '@/components/home/home-page'
import type { Metadata } from 'next'
import { STATIC_MARKETING_OG_URL } from '@/lib/og-metadata'
import { webPageJsonLd } from '@/components/structured-data'
import { sanityFetch } from '@/sanity/lib/live'
import {
  BELIEF_COVERS_QUERY,
  BELIEF_SLUGS,
  LATEST_STORIES_FOR_HOME_QUERY,
  toBeliefCovers,
  toHomeStories,
} from '@/lib/landing-featured-content'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Why RubixKube',
  description:
    'RubixKube builds for the people who keep production running. Our platform watches your infrastructure when nobody is there, and Kepler sits with the engineer when someone is.',
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
      'RubixKube builds for the people who keep production running. Our platform watches your infrastructure when nobody is there, and Kepler sits with the engineer when someone is.',
    url: 'https://rubixkube.ai/why',
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
      'RubixKube builds for the people who keep production running. Our platform watches your infrastructure when nobody is there, and Kepler sits with the engineer when someone is.',
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
    canonical: '/why',
  },
}

const pageJsonLd = webPageJsonLd({
  name: 'Why RubixKube',
  description: 'RubixKube builds for the people who keep production running. Our platform watches your infrastructure when nobody is there, and Kepler sits with the engineer when someone is.',
  url: 'https://rubixkube.ai/why',
})

/** The new landing draft, kept here as a reference while the home page is redesigned. */
export default async function WhyPage() {
  const slugs = [...BELIEF_SLUGS]
  const [{ data: stories }, { data: covers }] = await Promise.all([
    sanityFetch({ query: LATEST_STORIES_FOR_HOME_QUERY, params: { exclude: slugs } }),
    sanityFetch({ query: BELIEF_COVERS_QUERY, params: { slugs } }),
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <HomePage stories={toHomeStories(stories)} beliefCovers={toBeliefCovers(covers)} />
    </>
  )
}
