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
  },
  twitter: {
    title: "Resources - Docs, Playbooks, Case Studies",
    description: "Learn the reliability playbook. Guides, docs, and stories that show how teams prevent outages and ship with confidence using RubixKube.",
  },
}

export default function ResourcesPage() {
  return <ResourcesPageClient />
}
