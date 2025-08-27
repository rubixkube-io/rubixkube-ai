export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "RubixKube",
    "description": "Site Reliability Intelligence platform that predicts, prevents, and safely fixes failures across cloud-native stacks while quantifying revenue at risk.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "RubixKube",
      "url": "https://rubixkube.io"
    },
    "featureList": [
      "Conversational Control",
      "Smart Agent Operations", 
      "Evolving Memory",
      "Agent Mesh",
      "Guardrails and Approvals",
      "Evidence-Linked RCA"
    ],
    "screenshot": "https://rubixkube.io/hero.webm"
  }

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RubixKube",
    "url": "https://rubixkube.io",
    "logo": "https://rubixkube.io/logo-icon.png",
    "description": "Site Reliability Intelligence for the AI Era",
    "foundingDate": "2024",
    "industry": "Software Development",
    "knowsAbout": [
      "Site Reliability Engineering",
      "AIOps", 
      "Kubernetes",
      "Cloud Native",
      "Incident Response",
      "Root Cause Analysis"
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
    </>
  )
}
