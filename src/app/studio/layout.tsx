import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio | RubixKube',
  robots: { index: false, follow: false },
  alternates: {
    canonical: '/studio',
  },
}

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
