import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: '/kepler',
  },
}

export default function KeplerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
