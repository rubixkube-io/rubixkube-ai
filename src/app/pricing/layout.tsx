import { ReferencePagesNavProvider } from '@/components/reference-pages-nav-provider'
import { fetchReferenceGuidesForNav } from '@/lib/fetch-reference-guides-for-nav'

export default async function PricingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const guides = await fetchReferenceGuidesForNav()
  return <ReferencePagesNavProvider guides={guides}>{children}</ReferencePagesNavProvider>
}
