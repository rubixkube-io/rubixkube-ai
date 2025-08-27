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
    url: "https://rubixkube.io/contact",
    images: [
      {
        url: "https://rubixkube.io/og.png",
        width: 1200,
        height: 630,
        alt: "Contact RubixKube - Talk to the Team"
      }
    ],
  },
  twitter: {
    title: "Contact RubixKube - Talk to the Team",
    description: "Plan your reliability path with us. From your first cluster to billions in transactions, we help you keep infra and customer trust intact.",
    images: ["https://rubixkube.io/og.png"],
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
