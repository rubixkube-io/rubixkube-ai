import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: '/kepler/creators',
  },
  robots: { index: false },
}

export default function KeplerCreatorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
