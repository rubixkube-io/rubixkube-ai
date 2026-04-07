import { client } from '@/lib/sanity.client'
import { generateOGImage } from '@/lib/og-image'
import { clipOgText } from '@/lib/og-text'

export const alt = 'RubixKube'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const runtime = 'nodejs'

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

const OG_QUERY = `*[_type == "referencePage" && category == $category && slug.current == $slug][0]{
  title,
  subtitle,
  seoTitle,
  seoDescription,
  category,
}`

export default async function Image({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params

  if (KNOWN_ROUTES.has(category)) {
    return generateOGImage({ title: 'RubixKube' })
  }

  const fallbackEyebrow = CATEGORY_LABELS[category] ?? category.replace(/-/g, ' ')

  try {
    const page = await client.fetch<{
      title?: string
      subtitle?: string
      seoTitle?: string
      seoDescription?: string
      category?: string
    } | null>(OG_QUERY, { category, slug }, { next: { revalidate: 60 } })

    if (!page) {
      return generateOGImage({
        eyebrow: `RubixKube · ${fallbackEyebrow}`,
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      })
    }

    const title = clipOgText(page.seoTitle || page.title, 64) || 'RubixKube'
    const description = clipOgText(page.seoDescription || page.subtitle, 200)
    const eyebrow = `RubixKube · ${CATEGORY_LABELS[page.category ?? category] ?? fallbackEyebrow}`

    return generateOGImage({ eyebrow, title, description })
  } catch (e) {
    console.error('Dynamic page OG image:', e)
    return generateOGImage({
      eyebrow: `RubixKube · ${fallbackEyebrow}`,
      title: 'RubixKube',
    })
  }
}
