import { Metadata } from 'next'
import { SolutionsPageClient, type SolutionEntry } from './solutions-page-client'
import { webPageJsonLd } from '@/components/structured-data'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import { SOLUTIONS_CATEGORIES, REFERENCE_CATEGORY_LABELS } from '@/lib/reference-nav'

const TITLE = 'Solutions - RubixKube'
const DESCRIPTION =
  'What teams use RubixKube for, and the products that do it: use cases, products, case studies and the glossary.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/solutions' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: 'https://rubixkube.ai/solutions' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

const pageJsonLd = webPageJsonLd({ name: TITLE, description: DESCRIPTION, url: 'https://rubixkube.ai/solutions' })

/** Every Sanity reference page in the Solutions categories: use cases, case studies, the glossary and products */
const SOLUTION_PAGES_QUERY = `*[_type == "referencePage" && defined(slug.current) && category in $categories]|order(coalesce(publishedAt, _createdAt) desc){
  title,
  subtitle,
  category,
  "slug": slug.current,
  "date": coalesce(publishedAt, _createdAt),
  heroImage
}`

type Row = { title?: string; subtitle?: string; category?: string; slug?: string; date?: string; heroImage?: { asset?: unknown } }

export const revalidate = 3600

export default async function SolutionsPage() {
  const { data } = await sanityFetch({ query: SOLUTION_PAGES_QUERY, params: { categories: [...SOLUTIONS_CATEGORIES] } })
  const pages: SolutionEntry[] = ((data ?? []) as Row[]).flatMap((r) =>
    r.title && r.slug && r.category
      ? [
          {
            key: `${r.category}/${r.slug}`,
            category: r.category,
            kind: REFERENCE_CATEGORY_LABELS[r.category] ?? r.category,
            title: r.title,
            summary: (r.subtitle ?? '').split(/\n\s*\n/)[0].trim(),
            href: `/${r.category}/${r.slug}`,
            date: r.date
              ? new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
              : undefined,
            image: r.heroImage?.asset ? urlFor(r.heroImage as Parameters<typeof urlFor>[0]).width(1400).height(900).url() : undefined,
          },
        ]
      : [],
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      <SolutionsPageClient pages={pages} />
    </>
  )
}
