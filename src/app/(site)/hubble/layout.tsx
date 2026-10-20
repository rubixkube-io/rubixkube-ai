import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: '/hubble',
  },
}

export default function HubbleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
