import { Metadata } from 'next'
import { ContactPageClient } from './contact-page-client'
import { webPageJsonLd } from '@/components/structured-data'

export const metadata: Metadata = {
  title: "Contact RubixKube - Talk to the Team",
  description: "Plan your reliability path with us. From your first cluster to billions in transactions, we help you keep infra and customer trust intact.",
  keywords: [
    "contact SRE experts",
    "enterprise reliability",
    "scale with confidence"
  ],
  openGraph: {
    title: "Contact RubixKube - Talk to the Team",
    description: "Plan your reliability path with us. From your first cluster to billions in transactions, we help you keep infra and customer trust intact.",
    url: "https://rubixkube.ai/contact",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact RubixKube - Talk to the Team",
    description: "Plan your reliability path with us. From your first cluster to billions in transactions, we help you keep infra and customer trust intact.",
  },
}

const pageJsonLd = webPageJsonLd({
  name: 'Contact RubixKube - Talk to the Team',
  description: 'Plan your reliability path with us. From your first cluster to billions in transactions, we help you keep infra and customer trust intact.',
  url: 'https://rubixkube.ai/contact',
  type: 'ContactPage',
})

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <ContactPageClient />
    </>
  )
}
