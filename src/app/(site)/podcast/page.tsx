import { type SanityDocument } from "next-sanity"
import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { PodcastPageClient } from "./podcast-page-client"
import { webPageJsonLd } from "@/components/structured-data"
import { podcastCoverOgFields } from "@/lib/podcast-cover-og"

export const revalidate = 3600 // Revalidate every hour

const PODCAST_INDEX_OG_QUERY = `*[_type == "podcastEpisode" && defined(slug.current)]|order(publishedAt desc)[0]{
  title,
  image
}`

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Podcast | RubixKube'
  const description =
    'Beyond Observability. The next decade is about systems that understand themselves. Tune in to our podcast.'
  const url = 'https://rubixkube.ai/podcast'

  const { data: latest } = await sanityFetch({ query: PODCAST_INDEX_OG_QUERY })
  const coverOg = podcastCoverOgFields(
    latest?.image,
    latest?.title || 'The Root Cause by RubixKube'
  )

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'RubixKube',
      ...coverOg.openGraph,
    },
    twitter: {
      title,
      description,
      ...coverOg.twitter,
    },
    alternates: {
      canonical: url,
    },
  }
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
