import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Resources - RubixKube",
  description: "Access RubixKube resources including documentation, blog posts, case studies, and more. Learn how to maximize the value of your infrastructure.",
  keywords: [
    "RubixKube resources",
    "documentation",
    "blog",
    "case studies",
    "infrastructure guides"
  ],
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
