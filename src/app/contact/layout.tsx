import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact Us - RubixKube",
  description: "Get in touch with the RubixKube team. We're here to help with questions, support, and partnership opportunities.",
  keywords: [
    "contact RubixKube",
    "support",
    "partnership",
    "sales inquiry"
  ],
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
