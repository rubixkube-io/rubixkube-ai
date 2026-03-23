import { Metadata } from 'next'
import { ResourcesPageClient } from './resources-page-client'

export const metadata: Metadata = {
  title: "Resources - Docs, Playbooks, Case Studies",
  description: "Learn the reliability playbook. Guides, docs, and stories that show how teams prevent outages and ship with confidence using RubixKube.",
  keywords: [
    "documentation",
    "playbooks",
    "case studies",
    "best practices",
    "SRE guides"
  ],
  openGraph: {
    title: "Resources - Docs, Playbooks, Case Studies",
    description: "Learn the reliability playbook. Guides, docs, and stories that show how teams prevent outages and ship with confidence using RubixKube.",
    url: "https://rubixkube.ai/resources",
    images: [
      {
        url: "https://rubixkube.ai/og.jpg",
        width: 1200,
        height: 630,
        alt: "Resources - Docs, Playbooks, Case Studies"
      }
    ],
  },
  twitter: {
    title: "Resources - Docs, Playbooks, Case Studies",
    description: "Learn the reliability playbook. Guides, docs, and stories that show how teams prevent outages and ship with confidence using RubixKube.",
    images: ["https://rubixkube.ai/og.jpg"],
  },
}

export default function ResourcesPage() {
  return <ResourcesPageClient />
}
