import { urlFor } from '@/lib/sanity.client'

export type LandingFeaturedCard = {
  href: string
  title: string
  eyebrow: string
  imageUrl: string
  imageAlt: string
}

type SanityImage = {
  asset?: { _ref: string; _type?: string }
  alt?: string
} | null | undefined

type PodcastRow = {
  title?: string
  slug?: string
  image?: SanityImage
  excerpt?: string
} | null

type BlogRow = {
  title?: string
  slug?: string
  image?: SanityImage
  excerpt?: string
  categories?: string[] | null
} | null

function coverUrl(image: SanityImage, width: number, height: number): string | undefined {
  if (!image?.asset) return undefined
  return urlFor(image).width(width).height(height).url()
}

function buildCard(
  row: PodcastRow | BlogRow,
  hrefPrefix: '/podcast' | '/blog',
  eyebrow: string,
  fallback: LandingFeaturedCard
): LandingFeaturedCard {
  if (!row?.slug || !row.title) return fallback

  const imageUrl =
    coverUrl(row.image, 1200, 630) ??
    (hrefPrefix === '/podcast' ? '/beyond-observability.webp' : '/deepmind.jpg')
  const imageAlt =
    (row.image && typeof row.image === 'object' && 'alt' in row.image && row.image.alt?.trim()) ||
    row.title

  return {
    href: `${hrefPrefix}/${row.slug}`,
    title: row.title,
    eyebrow,
    imageUrl,
    imageAlt,
  }
}

export function toPodcastFeaturedCard(row: PodcastRow): LandingFeaturedCard {
  return buildCard(row, '/podcast', 'The Root Cause · Podcast', {
    href: '/podcast',
    title: 'The Root Cause by RubixKube',
    eyebrow: 'The Root Cause · Podcast',
    imageUrl: '/beyond-observability.webp',
    imageAlt: 'RubixKube podcast',
  })
}

export function toBlogFeaturedCard(row: BlogRow): LandingFeaturedCard {
  const category = row?.categories?.filter(Boolean)[0]
  const eyebrow = category ? `${category} · Blog` : 'SRI Diaries · Blog'
  return buildCard(row, '/blog', eyebrow, {
    href: '/blog',
    title: 'From the RubixKube blog',
    eyebrow: 'SRI Diaries · Blog',
    imageUrl: '/beyond-observability.webp',
    imageAlt: 'RubixKube blog',
  })
}

export const LATEST_PODCAST_FOR_HOME_QUERY = `*[_type == "podcastEpisode" && defined(slug.current)]|order(publishedAt desc)[0]{
  title,
  "slug": slug.current,
  image,
  excerpt
}`

export const LATEST_BLOG_FOR_HOME_QUERY = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0]{
  title,
  "slug": slug.current,
  image,
  excerpt,
  "categories": categories[]->title
}`

/** The pieces behind each belief on the home page: posts and reference pages. Their covers come from Sanity. */
export const BELIEF_SLUGS = [
  'kepler-a-tool-for-the-operator',
  'ai-for-operations-cant-live-in-one-repo',
  'mean-time-to-understand',
  'ai-sre-tools-2026',
] as const

/** The same pieces with the words the home page shows on their cards: the title and the description */
export const BELIEF_STORIES_QUERY = `*[_type in ["post", "referencePage"] && slug.current in $slugs]{
  "slug": slug.current,
  title,
  "description": coalesce(excerpt, subtitle, seoDescription),
  publishedAt,
  "image": coalesce(heroImage, image)
}`

export type BeliefStory = { title: string; description: string; date: string; cover?: string }

export function toBeliefStories(
  rows: { slug?: string; title?: string; description?: string; publishedAt?: string; image?: SanityImage }[] | null | undefined,
) {
  const out: Record<string, BeliefStory> = {}
  for (const r of rows ?? []) {
    if (!r.slug || !r.title) continue
    out[r.slug] = {
      title: r.title,
      // the first paragraph only: some excerpts carry a second, closing line
      description: (r.description ?? '').split(/\n\s*\n/)[0].trim(),
      date: r.publishedAt
        ? new Date(r.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '',
      cover: coverUrl(r.image, 1440, 1080),
    }
  }
  return out
}

