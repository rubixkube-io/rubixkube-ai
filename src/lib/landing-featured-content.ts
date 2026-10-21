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

export const BELIEF_COVERS_QUERY = `*[_type in ["post", "referencePage"] && slug.current in $slugs]{ "slug": slug.current, "image": coalesce(heroImage, image) }`

export function toBeliefCovers(rows: { slug?: string; image?: SanityImage }[] | null | undefined) {
  const out: Record<string, string> = {}
  for (const r of rows ?? []) {
    const url = r.slug ? coverUrl(r.image, 1440, 1080) : undefined
    if (r.slug && url) out[r.slug] = url
  }
  return out
}

/** Newest posts, podcast episodes and reference pages (products, comparisons, glossary), with covers. */
export const LATEST_STORIES_FOR_HOME_QUERY = `*[_type in ["post", "podcastEpisode", "referencePage"] && defined(slug.current) && defined(coalesce(image.asset, heroImage.asset)) && !(slug.current in $exclude)]|order(coalesce(publishedAt, _createdAt) desc)[0...4]{
  _type,
  title,
  category,
  "slug": slug.current,
  "publishedAt": coalesce(publishedAt, _createdAt),
  "image": coalesce(image, heroImage),
  "categories": categories[]->title
}`

type StoryRow = {
  _type?: string
  title?: string
  category?: string
  slug?: string
  publishedAt?: string
  image?: SanityImage
  categories?: string[] | null
}

/** How a reference page's category reads as a tag. */
const REFERENCE_TAG: Record<string, string> = { products: 'Product', compare: 'Comparison', glossary: 'Glossary' }

export type HomeStory = { title: string; href: string; tag: string; date: string; sortKey: string; imageUrl: string; imageAlt: string }

/** The home page's Latest row: what was published most recently, of any kind, with its cover. */
export function toHomeStories(rows: StoryRow[] | null | undefined): HomeStory[] {
  return (rows ?? []).flatMap((r) => {
    const imageUrl = coverUrl(r.image, 960, 600)
    if (!r.title || !r.slug || !imageUrl) return []
    const href =
      r._type === 'podcastEpisode'
        ? `/podcast/${r.slug}`
        : r._type === 'referencePage'
          ? `/${r.category}/${r.slug}`
          : `/blog/${r.slug}`
    const tag =
      r._type === 'podcastEpisode'
        ? 'Podcast'
        : r._type === 'referencePage'
          ? (REFERENCE_TAG[r.category ?? ''] ?? 'Guide')
          : (r.categories?.filter(Boolean)[0] ?? 'Blog')
    return [
      {
        title: r.title,
        href,
        tag,
        date: r.publishedAt
          ? new Date(r.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
          : '',
        sortKey: r.publishedAt ?? '',
        imageUrl,
        imageAlt: (r.image && 'alt' in r.image && r.image.alt?.trim()) || r.title,
      },
    ]
  })
}
