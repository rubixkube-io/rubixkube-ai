import { type SanityDocument } from "next-sanity"
import type { Metadata } from "next"
import { client, urlFor } from "@/lib/sanity.client"
import { sanityFetch } from "@/sanity/lib/live"
import { notFound } from "next/navigation"
import { BlogPostClient } from "./blog-post-client"
import { blogPostingJsonLd } from "@/components/structured-data"
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

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data: post } = await sanityFetch({ query: POST_QUERY, params: { slug } })

  if (!post) {
    notFound()
  }

  const { data: relatedPosts } = await sanityFetch({
    query: RELATED_POSTS_QUERY,
    params: { postId: post._id, categories: post.categories || [] },
  })

  const url = `https://rubixkube.ai/blog/${slug}`
  const imageUrl = post.image ? urlFor(post.image)?.width(1200).height(630).url() : undefined

  const jsonLd = blogPostingJsonLd({
    headline: post.title,
    description: post.excerpt || undefined,
    datePublished: post.publishedAt,
    authorName: post.author?.name,
    imageUrl: imageUrl || undefined,
    url,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post as unknown as SanityPost} relatedPosts={relatedPosts as SanityDocument[]} />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await sanityFetch({ query: POST_QUERY, params: { slug } })
  if (!post) return {}

  const title = post.seoTitle || post.title
  const description = post.seoDescription || post.excerpt || 'Article from RubixKube.'
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
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
