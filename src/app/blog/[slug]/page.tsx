import { type SanityDocument } from "next-sanity"
import type { Metadata } from "next"
import { client, urlFor } from "@/lib/sanity.client"
import { notFound } from "next/navigation"
import { BlogPostClient } from "./blog-post-client"
import type { SanityPost } from "@/types/sanity"

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  image,
  body,
  seoTitle,
  seoDescription,
  "author": author->{name, bio, image},
  "categories": categories[]->title
}`

const RELATED_POSTS_QUERY = `*[_type == "post" && defined(slug.current) && _id != $postId && count(categories[]->title[@ in $categories]) > 0]
  | order(publishedAt desc)[0...3]{
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    image,
    "categories": categories[]->title,
    "author": author->name
  }`

const options = { next: { revalidate: 30 } }

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await client.fetch<SanityDocument>(POST_QUERY, { slug }, options)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = await client.fetch<SanityDocument[]>(
    RELATED_POSTS_QUERY,
    { postId: post._id, categories: post.categories || [] },
    options
  )

  return <BlogPostClient post={post as unknown as SanityPost} relatedPosts={relatedPosts} />
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch<SanityDocument>(POST_QUERY, { slug }, options)
  if (!post) return {}

  const title = post.seoTitle || post.title
  const description = post.seoDescription || post.excerpt || 'Article from RubixKube.'
  const imageUrl = post.image ? `${urlFor(post.image)?.width(1200).height(630).url()}` : 'https://rubixkube.ai/og.jpg'
  const url = `https://rubixkube.ai/blog/${slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: 'RubixKube',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
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
  const slugs = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "post" && defined(slug.current)]{ slug }`,
    {},
    { next: { revalidate: 60 } }
  )

  return slugs.map((s) => ({ slug: s.slug.current }))
}
