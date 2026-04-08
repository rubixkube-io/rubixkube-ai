/** Sanity hero/cover image on reference pages (nav mega). Matches `urlFor` / image-url input shape. */
export type ReferenceGuideHeroImage = {
  _type?: string
  asset?: { _ref: string; _type?: string }
  alt?: string
}

export type ReferenceGuideNavItem = {
  title: string
  seoTitle?: string | null
  slug: string
  category: string
  subtitle?: string | null
  lastUpdated?: string | null
  heroImage?: ReferenceGuideHeroImage | null
}

/** Nav / list label: SEO title when set, else full page title. */
export function referenceGuideNavDisplayTitle(item: ReferenceGuideNavItem): string {
  const t = item.seoTitle?.trim()
  return t || item.title
}

export const NAV_GUIDES_QUERY = `*[
  _type == "referencePage"
  && defined(slug.current)
]|order(category asc, title asc){
  title,
  seoTitle,
  "slug": slug.current,
  category,
  subtitle,
  lastUpdated,
  heroImage
}`

export const SOLUTIONS_CATEGORIES = ['case-study', 'glossary'] as const
export const RESOURCES_CATEGORIES = ['learn', 'compare', 'tools', 'guide'] as const

export const REFERENCE_CATEGORY_LABELS: Record<string, string> = {
  learn: 'Learn',
  compare: 'Compare',
  tools: 'Tools',
  guide: 'Guide',
  'case-study': 'Case Study',
  glossary: 'Glossary',
}

export function guidesForCategories(
  guides: ReferenceGuideNavItem[],
  categories: readonly string[],
): ReferenceGuideNavItem[] {
  const set = new Set(categories)
  return guides.filter((g) => set.has(g.category))
}

export function isSolutionsNavActive(pathname: string): boolean {
  if (pathname === '/solutions' || pathname.startsWith('/solutions/')) return true
  return SOLUTIONS_CATEGORIES.some((c) => pathname === `/${c}` || pathname.startsWith(`/${c}/`))
}

export function isResourcesNavActive(pathname: string): boolean {
  if (pathname === '/resources' || pathname.startsWith('/resources/')) return true
  if (pathname === '/blog' || pathname.startsWith('/blog/')) return true
  return RESOURCES_CATEGORIES.some((c) => pathname === `/${c}` || pathname.startsWith(`/${c}/`))
}
