import { pricingFaqPageSchema } from '@/lib/jsonld/pricing-faq'
import { SITE_URL, STATIC_MARKETING_OG_URL } from '@/lib/og-metadata'

const SITE = SITE_URL

/** What RubixKube is, in the words the site uses: an AI SRE across Kubernetes, clouds and machines. */
const softwareDescription =
  'RubixKube is an AI SRE. Read-only observers watch Kubernetes, AWS, Google Cloud, Azure and Linux machines, and alerts come in from Datadog, PagerDuty, Grafana and other tools. Rubix groups related alerts into one incident, writes a root cause analysis with the evidence behind it, and proposes the fix, within the limits you set: Observe, Assist or Auto.'

function softwareApplicationNode() {
  return {
    '@type': 'SoftwareApplication',
    name: 'RubixKube',
    url: SITE,
    description: softwareDescription,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    image: STATIC_MARKETING_OG_URL,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RubixKube',
      url: SITE,
    },
    featureList: [
      'Read-only observers for Kubernetes, AWS, Google Cloud, Azure and Linux machines',
      'Alert triage and grouping across Datadog, PagerDuty, Grafana, Sentry and more',
      'Root cause analysis with cited, checked evidence',
      'Proposed Fix and Follow-up Tasks, each with a check',
      'Observe, Assist and Auto modes, hooks and an activity log',
      'Memory of past incidents, RCAs and fixes',
      'Console, Slack, CLI and MCP'
    ],
  }
}

function organizationNode() {
  return {
    '@type': 'Organization',
    name: 'RubixKube',
    url: SITE,
    logo: `${SITE}/logo-icon.png`,
    description:
      'RubixKube builds an AI SRE that investigates every incident to a root cause with evidence and proposes the fix, while people stay in control.',
    foundingDate: '2024',
    industry: 'Software Development',
    sameAs: ['https://linkedin.com/company/rubixkube', 'https://github.com/rubixkube-io'],
    knowsAbout: [
      'AI SRE',
      'Site Reliability Engineering',
      'AIOps',
      'Kubernetes',
      'Cloud Native',
      'Incident Response',
      'Root Cause Analysis',
      'Autonomous remediation',
      'Observability',
      'Metrics, logs, and traces',
      'Application performance monitoring (APM)',
      'Distributed tracing',
      'Alerting and on-call',
      'Datadog',
      'New Relic',
      'Grafana',
      'Prometheus',
      'Splunk',
      'Elastic',
      'AWS CloudWatch',
      'Google Cloud Operations',
      'Azure Monitor',
      'Jira',
      'Confluence',
      'Linear',
      'GitHub',
      'Slack',
      'PagerDuty',
      'ServiceNow',
      'Terraform',
      'CI/CD',
    ],
  }
}

function webSiteNode() {
  return {
    '@type': 'WebSite',
    name: 'RubixKube',
    url: SITE,
    description: softwareDescription,
    publisher: {
      '@type': 'Organization',
      name: 'RubixKube',
      url: SITE,
    },
  }
}

/** Single script: SoftwareApplication + Organization + WebSite (used on all marketing routes except /pricing). */
export function siteJsonLdDocument() {
  return {
    '@context': 'https://schema.org',
    '@graph': [softwareApplicationNode(), organizationNode(), webSiteNode()],
  }
}

/** Single script for /pricing: site graph + FAQPage (avoids duplicate global schema from root layout). */
export function pricingPageJsonLdDocument() {
  const faq = pricingFaqPageSchema()
  return {
    '@context': 'https://schema.org',
    '@graph': [
      softwareApplicationNode(),
      organizationNode(),
      webSiteNode(),
      {
        '@type': 'FAQPage',
        mainEntity: faq.mainEntity,
      },
    ],
  }
}

export function SiteGraphJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(siteJsonLdDocument()),
      }}
    />
  )
}

export function PricingPageJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(pricingPageJsonLdDocument()),
      }}
    />
  )
}

/* ---------------------------------------------------------------------------
 * Per-page schema builders for AEO (server-rendered JSON-LD)
 * --------------------------------------------------------------------------- */

export function blogPostingJsonLd(input: {
  headline: string
  description?: string
  datePublished: string
  authorName?: string
  imageUrl?: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    author: input.authorName
      ? { '@type': 'Person', name: input.authorName }
      : { '@type': 'Organization', name: 'RubixKube' },
    image: input.imageUrl,
    publisher: {
      '@type': 'Organization',
      name: 'RubixKube',
      logo: { '@type': 'ImageObject', url: `${SITE}/logo-icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
  }
}

/**
 * Returns a valid ISO 8601 string if `value` parses to a real date, otherwise undefined.
 * Guards against free-text values like "April 2026" leaking into JSON-LD
 * or OpenGraph date fields, which Google's Rich Results validator rejects.
 */
export function toIsoDate(value?: string): string | undefined {
  if (!value) return undefined
  const ms = Date.parse(value)
  if (Number.isNaN(ms)) return undefined
  return new Date(ms).toISOString()
}

export function articleJsonLd(input: {
  headline: string
  description?: string
  datePublished?: string
  dateModified?: string
  imageUrl?: string
  url: string
}) {
  const datePublished = toIsoDate(input.datePublished)
  const dateModified = toIsoDate(input.dateModified) ?? datePublished

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(input.imageUrl && { image: input.imageUrl }),
    author: { '@type': 'Organization', name: 'RubixKube' },
    publisher: {
      '@type': 'Organization',
      name: 'RubixKube',
      logo: { '@type': 'ImageObject', url: `${SITE}/logo-icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
  }
}

export function videoObjectJsonLd(input: {
  name: string
  description?: string
  youtubeId: string
  thumbnailUrl: string
  uploadDate?: string
  duration?: string
}) {
  const uploadDate = toIsoDate(input.uploadDate)
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: input.name,
    description: input.description,
    thumbnailUrl: input.thumbnailUrl,
    ...(uploadDate && { uploadDate }),
    ...(input.duration && { duration: input.duration }),
    contentUrl: `https://www.youtube.com/watch?v=${input.youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${input.youtubeId}`,
    publisher: {
      '@type': 'Organization',
      name: 'RubixKube',
      logo: { '@type': 'ImageObject', url: `${SITE}/logo-icon.png` },
    },
  }
}

export type WebPageType ='WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'

export function webPageJsonLd(input: {
  name: string
  description: string
  url: string
  type?: WebPageType
}) {
  return {
    '@context': 'https://schema.org',
    '@type': input.type || 'WebPage',
    name: input.name,
    description: input.description,
    url: input.url,
    isPartOf: { '@type': 'WebSite', name: 'RubixKube', url: SITE },
    publisher: { '@type': 'Organization', name: 'RubixKube', url: SITE },
  }
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
