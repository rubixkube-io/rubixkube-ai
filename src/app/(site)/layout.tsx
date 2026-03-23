import { SiteGraphJsonLd } from '@/components/structured-data'

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SiteGraphJsonLd />
      {children}
    </>
  )
}
