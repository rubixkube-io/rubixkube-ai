import { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { ResourcesPageClient } from './resources-page-client'
import type { ReferenceGuideListItem } from './types'

const GUIDES_QUERY = `*[
  _type == "referencePage"
  && defined(slug.current)
]|order(category asc, title asc){
  title,
  "slug": slug.current,
  category,
  subtitle,
  lastUpdated
}`

export const metadata: Metadata = {
  title: 'Resources - Docs, Playbooks, Case Studies',
  description:
    'Learn the reliability playbook. Guides, docs, and stories that show how teams prevent outages and ship with confidence using RubixKube.',
  keywords: ['documentation', 'playbooks', 'case studies', 'best practices', 'SRE guides'],
  openGraph: {
    title: 'Resources - Docs, Playbooks, Case Studies',
    description:
      'Learn the reliability playbook. Guides, docs, and stories that show how teams prevent outages and ship with confidence using RubixKube.',
    url: 'https://rubixkube.ai/resources',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources - Docs, Playbooks, Case Studies',
    description:
      'Learn the reliability playbook. Guides, docs, and stories that show how teams prevent outages and ship with confidence using RubixKube.',
  },
}

export default async function ResourcesPage() {
  const { data } = await sanityFetch({ query: GUIDES_QUERY })
  const guides = (data ?? []) as ReferenceGuideListItem[]

  return <ResourcesPageClient guides={guides} />
}
