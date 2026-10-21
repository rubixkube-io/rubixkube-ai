import { ReferencePagesNavProvider } from '@/components/reference-pages-nav-provider'
import { fetchReferenceGuidesForNav, fetchRecentForNav } from '@/lib/fetch-reference-guides-for-nav'

export default async function PricingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [guides, recent] = await Promise.all([fetchReferenceGuidesForNav(), fetchRecentForNav()])
  return <ReferencePagesNavProvider guides={guides} recent={recent}>{children}</ReferencePagesNavProvider>
}
