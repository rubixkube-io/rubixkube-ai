import { urlFor } from '@/lib/sanity.client'
import { SITE_URL } from '@/lib/og-metadata'

const OG_WIDTH = 1200
const OG_HEIGHT = 630

export type SanityCoverOgImage = {
  url: string
  width: number
  height: number
  alt: string
}

/** Images only — safe to spread into article openGraph without widening `type`. */
export type SanityCoverOgFields = {
  openGraph: { images: SanityCoverOgImage[] }
  twitter: { card: 'summary_large_image'; images: string[] }
}

export type SanityCoverImage = {
  asset?: { _ref: string; _type?: string }
  alt?: string
} | null | undefined

export function sanityCoverOgUrl(image: SanityCoverImage): string | undefined {
  if (!image?.asset) return undefined
  return urlFor(image).width(OG_WIDTH).height(OG_HEIGHT).url()
}

/** The dynamic card (`/api/og`) with the page's own title, for a page with no cover */
export function titleOgUrl(title: string, eyebrow?: string): string {
  const q = new URLSearchParams({ title })
  if (eyebrow) q.set('eyebrow', eyebrow)
  return `${SITE_URL}/api/og?${q.toString()}`
}

/** OG/Twitter image fields for a Sanity page: its cover with the logo, or the dark card with its title. */
export function sanityCoverOgFields(
  image: SanityCoverImage,
  altFallback: string,
  eyebrow?: string,
): SanityCoverOgFields {
  const cover = sanityCoverOgUrl(image)
  const alt =
    image && typeof image === 'object' && 'alt' in image && image.alt?.trim()
      ? image.alt.trim()
      : altFallback
  // with a cover: the cover with the logo tab; without one: the dark card with the title
  const url = cover ? `${SITE_URL}/api/og?${new URLSearchParams({ cover }).toString()}` : titleOgUrl(altFallback, eyebrow)
  const ogImages = [{ url, width: OG_WIDTH, height: OG_HEIGHT, alt }]

  return {
    openGraph: { images: ogImages },
    twitter: {
      card: 'summary_large_image',
      images: ogImages.map((img) => img.url),
    },
  }
}
