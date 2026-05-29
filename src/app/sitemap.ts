import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity.client'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rubixkube.ai'

  // Fetch post slugs and dates from Sanity for blog URLs
  const posts: { slug: { current: string }, publishedAt?: string }[] = await client.fetch(
    `*[_type == "post" && defined(slug.current)]{ slug, publishedAt }`,
    {},
    { next: { revalidate: 0 } }
  )

  const podcastEpisodes: { slug: { current: string }, publishedAt?: string }[] = await client.fetch(
    `*[_type == "podcastEpisode" && defined(slug.current)]{ slug, publishedAt }`,
    {},
    { next: { revalidate: 0 } }
  )

  const KNOWN_ROUTES = new Set([
    'blog', 'platform', 'solutions', 'resources', 'about',
    'contact', 'legal', 'status', 'studio', 'pricing',
  ])

  // Fetch dynamic reference pages
  const referencePages: { category: string; slug: { current: string }; lastUpdated?: string }[] =
    await client.fetch(
      `*[_type == "referencePage" && defined(slug.current) && defined(category)]{ category, slug, lastUpdated }`,
      {},
      { next: { revalidate: 0 } }
    )

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/llms-full.txt`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/platform`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/podcast`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      // Public URL /about; site chrome labels this page "About" (nav, footer, llms.txt).
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug.current}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const referenceEntries: MetadataRoute.Sitemap = referencePages
    .filter((p) => !KNOWN_ROUTES.has(p.category))
    .map((p) => ({
      url: `${baseUrl}/${p.category}/${p.slug.current}`,
      lastModified: p.lastUpdated ? new Date(p.lastUpdated) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  const podcastEntries: MetadataRoute.Sitemap = podcastEpisodes.map((ep) => ({
    url: `${baseUrl}/podcast/${ep.slug.current}`,
    lastModified: ep.publishedAt ? new Date(ep.publishedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticEntries, ...blogEntries, ...podcastEntries, ...referenceEntries]
}
