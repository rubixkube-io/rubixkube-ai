import { client } from '@/lib/sanity.client'
import { generateOGImage } from '@/lib/og-image'
import { dynamicOgPageContent } from '@/lib/og-dynamic-page-content'
import { clipOgText } from '@/lib/og-text'

export const alt = 'Article on RubixKube'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export const runtime = 'nodejs'

const OG_POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  excerpt,
  seoTitle,
  seoDescription,
  "categories": categories[]->title
}`

type OgPost = {
  title?: string
  excerpt?: string
  seoTitle?: string
  seoDescription?: string
  categories?: string[] | null
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const fallback = dynamicOgPageContent.blogIndex

  try {
    const post = await client.fetch<OgPost | null>(
      OG_POST_QUERY,
      { slug },
      { next: { revalidate: 60 } }
    )

    if (!post) {
      return generateOGImage({
        eyebrow: 'RubixKube Blog',
        title: 'Post not found',
        description: fallback.description,
        accent: fallback.accent,
      })
    }

    const title = clipOgText(post.seoTitle || post.title, 64) || 'From the blog'
    const description = clipOgText(
      post.seoDescription || post.excerpt || fallback.description,
      200
    )
    const primaryCategory = post.categories?.filter(Boolean)[0]
    const accent = primaryCategory ? `Topic · ${primaryCategory}` : fallback.accent

    return generateOGImage({
      eyebrow: 'RubixKube Blog',
      title,
      description,
      accent,
    })
  } catch (e) {
    console.error('Blog OG image:', e)
    return generateOGImage({
      eyebrow: 'RubixKube Blog',
      title: fallback.title,
      description: fallback.description,
      accent: fallback.accent,
    })
  }
}
