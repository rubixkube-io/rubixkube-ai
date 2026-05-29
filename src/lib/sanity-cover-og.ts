import { urlFor } from '@/lib/sanity.client'
import { STATIC_MARKETING_OG_URL } from '@/lib/og-metadata'

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

/** OG/Twitter image fields from a Sanity cover/hero image, with site fallback. */
export function sanityCoverOgFields(
  image: SanityCoverImage,
  altFallback: string
): SanityCoverOgFields {
  const url = sanityCoverOgUrl(image)
  const alt =
    image && typeof image === 'object' && 'alt' in image && image.alt?.trim()
      ? image.alt.trim()
      : altFallback
  const ogImages = url
    ? [{ url, width: OG_WIDTH, height: OG_HEIGHT, alt }]
    : [
        {
          url: STATIC_MARKETING_OG_URL,
          width: OG_WIDTH,
          height: OG_HEIGHT,
          alt: altFallback,
        },
      ]

  return {
    openGraph: { images: ogImages },
    twitter: {
      card: 'summary_large_image',
      images: ogImages.map((img) => img.url),
    },
  }
}
