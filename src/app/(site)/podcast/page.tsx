import { type SanityDocument } from "next-sanity"
import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { PodcastPageClient } from "./podcast-page-client"
import { webPageJsonLd } from "@/components/structured-data"

export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: 'Podcast | RubixKube',
  description: 'Beyond Observability. The next decade is about systems that understand themselves. Tune in to our podcast.',
  openGraph: {
    title: 'Podcast | RubixKube',
    description: 'Beyond Observability. The next decade is about systems that understand themselves. Tune in to our podcast.',
    url: 'https://rubixkube.ai/podcast',
    type: 'website',
    siteName: 'RubixKube',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Podcast | RubixKube',
    description: 'Beyond Observability. The next decade is about systems that understand themselves. Tune in to our podcast.',
  },
  alternates: {
    canonical: 'https://rubixkube.ai/podcast',
  },
}

const pageJsonLd = webPageJsonLd({
  name: 'RubixKube Podcast',
  description: 'Beyond Observability. The next decade is about systems that understand themselves.',
  url: 'https://rubixkube.ai/podcast',
  type: 'CollectionPage',
})

const PODCAST_EPISODES_QUERY = `*[
  _type == "podcastEpisode"
  && defined(slug.current)
]|order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  image,
  videoUrl,
  youtubeUrl
}`

export default async function PodcastPage() {
  const { data } = await sanityFetch({ query: PODCAST_EPISODES_QUERY })
  const episodes = data as SanityDocument[]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <PodcastPageClient episodes={episodes} />
    </>
  )
}
