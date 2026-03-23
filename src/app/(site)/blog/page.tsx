import { type SanityDocument } from "next-sanity"
import type { Metadata } from "next"
import { client } from "@/lib/sanity.client"
import { BlogPageClient } from "./blog-page-client"

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

const options = { next: { revalidate: 30 } }

async function getBlogPosts(category?: string) {
  if (category && category.trim() !== '') {
    return await client.fetch<SanityDocument[]>(FILTERED_POSTS_QUERY, { category }, options)
  } else {
    return await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options)
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

  return {
    title,
    description: baseDescription,
    openGraph: {
      title,
      description: baseDescription,
      url,
      type: 'website',
      siteName: 'RubixKube',
      images: [{ url: 'https://rubixkube.ai/og.jpg', width: 1200, height: 630, alt: 'RubixKube' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: baseDescription,
      images: ['https://rubixkube.ai/og.jpg']
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const posts = await getBlogPosts(category)

  return <BlogPageClient posts={posts} category={category} />
}
