import { type SanityDocument } from "next-sanity"
import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { BlogPageClient } from "./blog-page-client"
import { webPageJsonLd } from "@/components/structured-data"
import { sanityCoverOgFields } from "@/lib/sanity-cover-og"

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(featured desc, publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  image,
  featured,
  "categories": categories[]->title,
  "author": author->name
}`

const FILTERED_POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && $category in categories[]->title
]|order(featured desc, publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  image,
  featured,
  "categories": categories[]->title,
  "author": author->name
}`

async function getBlogPosts(category?: string) {
  if (category && category.trim() !== '') {
    const { data } = await sanityFetch({ query: FILTERED_POSTS_QUERY, params: { category } })
    return data as SanityDocument[]
  } else {
    const { data } = await sanityFetch({ query: POSTS_QUERY })
    return data as SanityDocument[]
  }
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}): Promise<Metadata> {
  const baseTitle = 'RubixKube Blog'
  const baseDescription = 'Deep dives into AI-native infrastructure, SRE, and autonomous reliability.'
  const { category: rawCategory } = await searchParams
  const category = rawCategory?.trim()
  const title = category && category !== '' ? `${baseTitle} – ${category}` : baseTitle
  const url = category && category !== '' ? `https://rubixkube.ai/blog?category=${encodeURIComponent(category)}` : 'https://rubixkube.ai/blog'

  const coverQuery = category
    ? `*[_type == "post" && defined(slug.current) && $category in categories[]->title]|order(featured desc, publishedAt desc)[0]{ title, image }`
    : `*[_type == "post" && defined(slug.current)]|order(featured desc, publishedAt desc)[0]{ title, image }`
  const { data: leadPost } = await sanityFetch({
    query: coverQuery,
    params: category ? { category } : {},
  })
  const coverOg = sanityCoverOgFields(leadPost?.image, leadPost?.title || baseTitle)

  return {
    title,
    description: baseDescription,
    openGraph: {
      title,
      description: baseDescription,
      url,
      type: 'website',
      siteName: 'RubixKube',
      ...coverOg.openGraph,
    },
    twitter: {
      title,
      description: baseDescription,
      ...coverOg.twitter,
    },
    alternates: {
      canonical: url,
    },
  }
}

const pageJsonLd = webPageJsonLd({
  name: 'RubixKube Blog',
  description: 'Deep dives into AI-native infrastructure, SRE, and autonomous reliability.',
  url: 'https://rubixkube.ai/blog',
  type: 'CollectionPage',
})

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const posts = await getBlogPosts(category)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <BlogPageClient posts={posts} category={category} />
    </>
  )
}
