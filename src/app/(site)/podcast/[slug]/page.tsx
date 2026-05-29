import { type SanityDocument } from "next-sanity"
import type { Metadata } from "next"
import { client } from "@/lib/sanity.client"
import { podcastCoverOgFields } from "@/lib/podcast-cover-og"
import { sanityFetch } from "@/sanity/lib/live"
import { notFound } from "next/navigation"
import { PodcastEpisodeClient } from "./podcast-episode-client"
import { webPageJsonLd } from "@/components/structured-data"

const EPISODE_QUERY = `*[_type == "podcastEpisode" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  image,
  videoUrl,
  youtubeUrl,
  applePodcastUrl,
  body,
  seoTitle,
  seoDescription
}`

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data: episode } = await sanityFetch({ query: EPISODE_QUERY, params: { slug } })

  if (!episode) {
    notFound()
  }

  const url = `https://rubixkube.ai/podcast/${slug}`

  const jsonLd = webPageJsonLd({
    name: episode.title,
    description: episode.excerpt || undefined,
    url,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PodcastEpisodeClient episode={episode as SanityDocument} />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data: episode } = await sanityFetch({ query: EPISODE_QUERY, params: { slug } })
  if (!episode) return {}

  const title = episode.seoTitle || episode.title
  const description = episode.seoDescription || episode.excerpt || 'Podcast episode from RubixKube.'
  const url = `https://rubixkube.ai/podcast/${slug}`
  const coverOg = podcastCoverOgFields(episode.image, title)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: 'RubixKube',
      publishedTime: episode.publishedAt,
      modifiedTime: episode.publishedAt,
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
    robots: {
      index: true,
      follow: true,
    },
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(
    `*[_type == "podcastEpisode" && defined(slug.current)]{ "slug": slug.current }`,
    {},
    { next: { revalidate: 60 } }
  )

  return slugs.map((s) => ({ slug: s.slug }))
}
