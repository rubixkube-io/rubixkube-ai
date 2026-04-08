import { sanityFetch } from '@/sanity/lib/live'
import { NAV_GUIDES_QUERY, type ReferenceGuideNavItem } from '@/lib/reference-nav'

export async function fetchReferenceGuidesForNav(): Promise<ReferenceGuideNavItem[]> {
  const { data } = await sanityFetch({ query: NAV_GUIDES_QUERY })
  return (data ?? []) as ReferenceGuideNavItem[]
}
