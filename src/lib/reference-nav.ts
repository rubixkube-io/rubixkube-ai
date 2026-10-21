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

export const SOLUTIONS_CATEGORIES = ['use-case', 'case-study', 'products'] as const
export const RESOURCES_CATEGORIES = ['learn', 'compare', 'tools', 'guide', 'glossary'] as const

export const REFERENCE_CATEGORY_LABELS: Record<string, string> = {
  learn: 'Learn',
  compare: 'Compare',
  tools: 'Tools',
  guide: 'Guide',
  'use-case': 'Use case',
  'case-study': 'Case Study',
  glossary: 'Glossary',
  products: 'Products',
}

export function guidesForCategories(
  guides: ReferenceGuideNavItem[],
  categories: readonly string[],
): ReferenceGuideNavItem[] {
  const set = new Set(categories)
  return guides.filter((g) => set.has(g.category))
}

const under = (pathname: string, base: string) => pathname === base || pathname.startsWith(`${base}/`)

/** Products menu: the platform, Hubble and the Sanity product pages */
export function isProductsNavActive(pathname: string): boolean {
  return ['/platform', '/hubble', '/products'].some((b) => under(pathname, b))
}

/** Use cases menu: /solutions and the use case and case study pages */
export function isSolutionsNavActive(pathname: string): boolean {
  return ['/solutions', '/use-case', '/case-study'].some((b) => under(pathname, b))
}

export function isResourcesNavActive(pathname: string): boolean {
  if (['/resources', '/blog', '/podcast'].some((b) => under(pathname, b))) return true
  return RESOURCES_CATEGORIES.some((c) => pathname === `/${c}` || pathname.startsWith(`/${c}/`))
}

/** Company menu: who we are and how to reach us */
export function isCompanyNavActive(pathname: string): boolean {
  return ['/about', '/contact', '/status'].some((b) => under(pathname, b))
}
