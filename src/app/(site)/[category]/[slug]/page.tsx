import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import { ReferencePageClient } from './dynamic-page-client'
import type { ReferencePage, ContentBlock } from './dynamic-page-client'

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sanityBodyToBlocks(body: any[]): ContentBlock[] {
  if (!body || !Array.isArray(body)) return []

  const blocks: ContentBlock[] = []
  let currentProse: { heading: string; id: string; body: any[] } | null = null

  function flushProse() {
    if (currentProse && currentProse.body.length > 0) {
      blocks.push({
        _type: 'prose',
        id: currentProse.id,
        heading: currentProse.heading,
        body: currentProse.body,
      })
      currentProse = null
    }
  }

  for (const node of body) {
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
    } else if (['highlight', 'stats', 'comparison', 'split', 'checklist', 'cards', 'quote', 'faq', 'inlineCta'].includes(node._type)) {
      flushProse()

      if (node._type === 'split' && node.image?.asset) {
        blocks.push({
          ...node,
          imageSrc: urlFor(node.image.asset).width(800).url(),
          imageAlt: node.image?.alt || '',
        })
      } else if (node._type === 'checklist') {
        const id = (node.heading || '')
          .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `checklist-${blocks.length}`
        blocks.push({ ...node, id } as ContentBlock)
      } else {
        blocks.push(node as ContentBlock)
      }
    }
  }

  flushProse()
  return blocks
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
    title: `${title} — RubixKube`,
    description,
    openGraph: { title, description, url, type: 'article', siteName: 'RubixKube' },
    twitter: { card: 'summary_large_image', title },
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

  return <ReferencePageClient page={page} />
}
