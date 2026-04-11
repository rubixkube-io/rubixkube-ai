import { SiteGraphJsonLd } from '@/components/structured-data'
import { ReferencePagesNavProvider } from '@/components/reference-pages-nav-provider'
import { fetchReferenceGuidesForNav } from '@/lib/fetch-reference-guides-for-nav'
import { SanityLive } from '@/sanity/lib/live'

export const revalidate = 60

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const guides = await fetchReferenceGuidesForNav()

  return (
    <>
      <SiteGraphJsonLd />
      <ReferencePagesNavProvider guides={guides}>{children}</ReferencePagesNavProvider>
      <SanityLive />
    </>
  )
}
