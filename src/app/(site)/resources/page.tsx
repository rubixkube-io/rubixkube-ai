import { Metadata } from 'next'
import { NAV_GUIDES_QUERY } from '@/lib/reference-nav'
import { sanityFetch } from '@/sanity/lib/live'
import { ResourcesPageClient } from './resources-page-client'
import type { ReferenceGuideListItem } from './types'
import { webPageJsonLd } from '@/components/structured-data'

export const metadata: Metadata = {
  title: 'Resources - RubixKube',
  description:
    'Docs, guides, comparisons and use cases for RubixKube, the AI SRE.',
  openGraph: {
    title: 'Resources - RubixKube',
    description:
      'Docs, guides, comparisons and use cases for RubixKube, the AI SRE.',
    url: 'https://rubixkube.ai/resources',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources - RubixKube',
    description:
      'Docs, guides, comparisons and use cases for RubixKube, the AI SRE.',
  },
}

const pageJsonLd = webPageJsonLd({
  name: 'Resources - RubixKube',
  description: 'Docs, guides, comparisons and use cases for RubixKube, the AI SRE.',
  url: 'https://rubixkube.ai/resources',
})

export default async function ResourcesPage() {
  const { data } = await sanityFetch({ query: NAV_GUIDES_QUERY })
  const guides = (data ?? []) as ReferenceGuideListItem[]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <ResourcesPageClient guides={guides} />
    </>
  )
}
