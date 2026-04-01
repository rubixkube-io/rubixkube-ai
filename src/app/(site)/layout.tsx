import { SiteGraphJsonLd } from '@/components/structured-data'
import { SanityLive } from '@/sanity/lib/live'

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SiteGraphJsonLd />
      {children}
      <SanityLive />
    </>
  )
}
