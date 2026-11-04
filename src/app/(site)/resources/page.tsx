import { Metadata } from 'next'
import { NAV_GUIDES_QUERY } from '@/lib/reference-nav'
import { sanityFetch } from '@/sanity/lib/live'
import { ResourcesPageClient } from './resources-page-client'
import type { ReferenceGuideListItem } from './types'
import { webPageJsonLd } from '@/components/structured-data'
import { urlFor } from '@/lib/sanity.client'

type PostRow = { title: string; slug: string; excerpt?: string; publishedAt?: string; image: { asset: { _ref: string } } }

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

/** The newest posts with a cover, for the blog section */
const LATEST_POSTS_QUERY = `*[_type == "post" && defined(slug.current) && defined(image.asset)]|order(publishedAt desc)[0...3]{
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  image
}`

export default async function ResourcesPage() {
  const [{ data }, { data: postRows }] = await Promise.all([
    sanityFetch({ query: NAV_GUIDES_QUERY }),
    sanityFetch({ query: LATEST_POSTS_QUERY }),
  ])
  const guides = (data ?? []) as ReferenceGuideListItem[]
  const posts = ((postRows ?? []) as PostRow[]).map((p) => ({
    title: p.title,
    href: `/blog/${p.slug}`,
    excerpt: p.excerpt ?? '',
    date: p.publishedAt
      ? new Date(p.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
      : '',
    image: urlFor(p.image).width(800).height(600).url(),
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <ResourcesPageClient guides={guides} posts={posts} />
    </>
  )
}
