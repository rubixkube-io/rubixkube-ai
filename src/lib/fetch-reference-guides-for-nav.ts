import { sanityFetch } from '@/sanity/lib/live'
import { NAV_GUIDES_QUERY, type ReferenceGuideNavItem } from '@/lib/reference-nav'
import type { RecentNavItem } from '@/components/reference-pages-nav-provider'

export async function fetchReferenceGuidesForNav(): Promise<ReferenceGuideNavItem[]> {
  const { data } = await sanityFetch({ query: NAV_GUIDES_QUERY })
  return (data ?? []) as ReferenceGuideNavItem[]
}

/** The two newest blog posts and the two newest podcast episodes */
const RECENT_NAV_QUERY = `{
  "posts": *[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...2]{ title, "slug": slug.current, publishedAt },
  "episodes": *[_type == "podcastEpisode" && defined(slug.current)]|order(publishedAt desc)[0...2]{ title, "slug": slug.current, publishedAt }
}`

type Row = { title?: string; slug?: string; publishedAt?: string }

export async function fetchRecentForNav(): Promise<RecentNavItem[]> {
  const { data } = await sanityFetch({ query: RECENT_NAV_QUERY })
  const { posts = [], episodes = [] } = (data ?? {}) as { posts?: Row[]; episodes?: Row[] }
  const pick = (rows: Row[], kind: RecentNavItem['kind'], base: string): RecentNavItem[] =>
    rows.flatMap((r) => (r.title && r.slug ? [{ kind, title: r.title, href: `${base}/${r.slug}`, date: r.publishedAt ?? null }] : []))
  return [...pick(posts, 'post', '/blog'), ...pick(episodes, 'episode', '/podcast')]
}
