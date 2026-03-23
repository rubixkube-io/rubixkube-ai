import { Metadata } from 'next'
import { ContactPageClient } from './contact-page-client'

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

export default function ContactPage() {
  return <ContactPageClient />
}
