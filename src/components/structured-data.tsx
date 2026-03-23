import { pricingFaqPageSchema } from '@/lib/jsonld/pricing-faq'

const SITE = 'https://rubixkube.ai'

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
    image: `${SITE}/og.jpg`,
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
