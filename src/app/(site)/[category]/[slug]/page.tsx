import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity.client'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import { ReferencePageClient } from './dynamic-page-client'
import type { ReferencePage, ContentBlock } from './dynamic-page-client'
import { articleJsonLd, faqPageJsonLd } from '@/components/structured-data'

const KNOWN_ROUTES = new Set([
  'blog', 'platform', 'solutions', 'resources', 'about',
  'contact', 'legal', 'status', 'studio', 'pricing',
])

const CATEGORY_LABELS: Record<string, string> = {
  compare: 'Compare',
  learn: 'Learn',
  tools: 'Tools',
  guide: 'Guide',
  'case-study': 'Case Study',
  glossary: 'Glossary',
  products: 'Products',
}

const PAGE_QUERY = `*[_type == "referencePage" && category == $category && slug.current == $slug][0]{
  _id,
  title,
  titleAccent,
  subtitle,
  category,
  lastUpdated,
  readingTime,
  heroImage,
  body,
  relatedPages,
  seoTitle,
  seoDescription,
}`

/** Loose shape for raw Sanity portable text / custom blocks while transforming */
type SanityPortableNode = Record<string, unknown> & {
  _type?: string
  style?: string
  listItem?: string
  children?: { text?: string }[]
  asset?: unknown
  alt?: string
  caption?: string
  image?: { asset?: unknown; alt?: string }
  heading?: string
}

function sanityBodyToBlocks(body: unknown): ContentBlock[] {
  if (!body || !Array.isArray(body)) return []

  const blocks: ContentBlock[] = []
  let currentProse: { heading: string; id: string; body: SanityPortableNode[] } | null = null

  function flushProse() {
    const hasBody = currentProse && currentProse.body.length > 0
    const hasHeading = currentProse && currentProse.heading.trim().length > 0
    if (currentProse && (hasBody || hasHeading)) {
      blocks.push({
        _type: 'prose',
        id: currentProse.id,
        heading: currentProse.heading,
        body: currentProse.body,
      })
      currentProse = null
    }
  }

  for (const raw of body) {
    const node = raw as SanityPortableNode
    if (node._type === 'block') {
      const text = (node.children || []).map((c: { text?: string }) => c.text || '').join('')

      if (node.style === 'h2') {
        flushProse()
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        currentProse = { heading: text, id, body: [] }
      } else if (node.style === 'blockquote') {
        if (!currentProse) {
          currentProse = { heading: '', id: `section-${blocks.length}`, body: [] }
        }
        currentProse.body.push(node)
      } else {
        if (!currentProse) {
          currentProse = { heading: '', id: `section-${blocks.length}`, body: [] }
        }
        if (text.trim() || node.listItem) {
          currentProse.body.push(node)
        }
      }
    } else if (node._type === 'image') {
      flushProse()
      blocks.push({
        _type: 'imageBlock',
        id: `img-${blocks.length}`,
        src: node.asset ? urlFor(node.asset).width(1200).url() : undefined,
        alt: node.alt || '',
        caption: node.caption || '',
      })
    } else if (
      node._type &&
      [
        'highlight',
        'stats',
        'comparison',
        'split',
        'checklist',
        'cards',
        'quote',
        'faq',
        'inlineCta',
        'markdownSection',
      ].includes(node._type)
    ) {
      flushProse()

      if (node._type === 'split' && node.image?.asset) {
        const splitId =
          (node.heading || '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || `split-${blocks.length}`
        blocks.push({
          ...node,
          _type: 'split' as const,
          id: splitId,
          imageSrc: urlFor(node.image.asset).width(800).url(),
          imageAlt: node.image?.alt || '',
        } as ContentBlock)
      } else if (node._type === 'checklist') {
        const id = (node.heading || '')
          .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `checklist-${blocks.length}`
        blocks.push({ ...node, id } as ContentBlock)
      } else if (node._type === 'markdownSection') {
        const cap = typeof node.caption === 'string' ? node.caption.trim() : ''
        const id =
          (cap
            ? cap.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            : '') || `markdown-${blocks.length}`
        blocks.push({
          _type: 'markdownSection',
          id,
          caption: typeof node.caption === 'string' ? node.caption : undefined,
          content: typeof node.content === 'string' ? node.content : '',
        } as ContentBlock)
      } else {
        blocks.push(node as ContentBlock)
      }
    }
  }

  flushProse()
  return blocks
}

/** Extract FAQ items from raw Sanity body nodes for structured data. */
function extractFaqItems(body: unknown): { question: string; answer: string }[] {
  if (!body || !Array.isArray(body)) return []
  const results: { question: string; answer: string }[] = []
  for (const node of body) {
    if (node?._type !== 'faq' || !Array.isArray(node.items)) continue
    for (const item of node.items) {
      const q = (item.question || '').trim()
      if (!q) continue
      let a: string
      if (typeof item.answer === 'string') {
        a = item.answer.trim()
      } else if (Array.isArray(item.answer)) {
        a = item.answer
          .flatMap((block: Record<string, unknown>) =>
            Array.isArray(block.children)
              ? block.children.map((c: { text?: string }) => c.text || '')
              : []
          )
          .join(' ')
          .trim()
      } else {
        continue
      }
      if (a) results.push({ question: q, answer: a })
    }
  }
  return results
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}): Promise<Metadata> {
  const { category, slug } = await params
  if (KNOWN_ROUTES.has(category)) return {}

  const { data: page } = await sanityFetch({ query: PAGE_QUERY, params: { category, slug } })

  const title = page?.seoTitle || page?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
  const description = page?.seoDescription || page?.subtitle || ''
  const url = `https://rubixkube.ai/${category}/${slug}`

  return {
    title: `${title}`,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: 'RubixKube',
      ...(page?.lastUpdated && {
        publishedTime: page.lastUpdated,
        modifiedTime: page.lastUpdated,
      }),
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  }
}

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params
  if (KNOWN_ROUTES.has(category)) notFound()

  const { data: sanityPage } = await sanityFetch({ query: PAGE_QUERY, params: { category, slug } })

  if (!sanityPage) notFound()

  const heroImage = sanityPage.heroImage?.asset
    ? {
        src: urlFor(sanityPage.heroImage.asset).width(1400).url(),
        alt: sanityPage.heroImage.alt || '',
        caption: sanityPage.heroImage.caption || '',
      }
    : undefined

  const page: ReferencePage = {
    category,
    categoryLabel: CATEGORY_LABELS[category] || category.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
    title: sanityPage.title,
    titleAccent: sanityPage.titleAccent,
    subtitle: sanityPage.subtitle,
    lastUpdated: sanityPage.lastUpdated,
    readingTime: sanityPage.readingTime,
    heroImage,
    blocks: sanityBodyToBlocks(sanityPage.body),
    relatedPages: sanityPage.relatedPages,
  }

  const url = `https://rubixkube.ai/${category}/${slug}`
  const description = sanityPage.seoDescription || sanityPage.subtitle || ''
  const article = articleJsonLd({
    headline: sanityPage.title,
    description,
    dateModified: sanityPage.lastUpdated,
    url,
  })

  const faqItems = extractFaqItems(sanityPage.body)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faqItems)) }}
        />
      )}
      <ReferencePageClient page={page} />
    </>
  )
}

export async function generateStaticParams() {
  const pages = await client.fetch<{ category: string; slug: { current: string } }[]>(
    `*[_type == "referencePage" && defined(slug.current) && defined(category)]{ category, slug }`,
    {},
    { next: { revalidate: 60 } }
  )

  return pages
    .filter((p) => !KNOWN_ROUTES.has(p.category))
    .map((p) => ({ category: p.category, slug: p.slug.current }))
}
