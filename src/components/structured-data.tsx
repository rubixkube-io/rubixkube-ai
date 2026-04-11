import { pricingFaqPageSchema } from '@/lib/jsonld/pricing-faq'
import { SITE_URL, STATIC_MARKETING_OG_URL } from '@/lib/og-metadata'

const SITE = SITE_URL

/** Aligns with on-site hero + pillars: autonomous loop, memory, safety, explainability, agent mesh. */
const softwareDescription =
  'AI-native Site Reliability Intelligence (SRI) that detects anomalies, diagnoses root cause, and resolves failures autonomously. Agent mesh with operational memory, safety guardrails, and evidence-linked RCA. Goes beyond traditional observability.'

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
      'Autonomous detection, diagnosis, and resolution loop',
      'Agent mesh (observe, plan, act, learn)',
      'Operational memory that compounds with every incident',
      'Safety guardrails, approvals, and explainability',
      'Evidence-linked root cause analysis (RCA)',
      'Conversational operations and integrations (Slack, Jira, and more)',
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
      'RubixKube builds Site Reliability Intelligence (SRI): systems that heal infrastructure autonomously while keeping humans in control.',
    foundingDate: '2024',
    industry: 'Software Development',
    sameAs: ['https://linkedin.com/company/rubixkube', 'https://github.com/rubixkube-io'],
    knowsAbout: [
      'Site Reliability Intelligence',
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

export function articleJsonLd(input: {
  headline: string
  description?: string
  dateModified?: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    ...(input.dateModified && {
      dateModified: input.dateModified,
      datePublished: input.dateModified,
    }),
    author: { '@type': 'Organization', name: 'RubixKube' },
    publisher: {
      '@type': 'Organization',
      name: 'RubixKube',
      logo: { '@type': 'ImageObject', url: `${SITE}/logo-icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
  }
}

export type WebPageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'

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
