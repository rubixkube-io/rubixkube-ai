import { SiteGraphJsonLd } from '@/components/structured-data'
import { CookieBanner } from '@/components/cookie-banner'
import { ReferencePagesNavProvider } from '@/components/reference-pages-nav-provider'
import { fetchReferenceGuidesForNav, fetchRecentForNav } from '@/lib/fetch-reference-guides-for-nav'
import { SanityLive } from '@/sanity/lib/live'

export const revalidate = 60

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [guides, recent] = await Promise.all([fetchReferenceGuidesForNav(), fetchRecentForNav()])

  return (
    <>
      <SiteGraphJsonLd />
      <ReferencePagesNavProvider guides={guides} recent={recent}>
        <main>{children}</main>
      </ReferencePagesNavProvider>
      <SanityLive />
      <CookieBanner />
    </>
  )
}
