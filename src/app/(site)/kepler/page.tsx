import { Metadata } from 'next'
import { webPageJsonLd } from '@/components/structured-data'
import { TAGLINE } from './content'
import { KeplerLaunch } from './_launch/kepler-launch'
import './kepler.css'

const title = "Kepler, the world's first SRE IDE"
const description = TAGLINE

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Kepler', 'SRE IDE', 'IDE for operators', 'desktop agent', 'SRE', 'RubixKube'],
  openGraph: { title, description, url: 'https://rubixkube.ai/kepler' },
  twitter: { card: 'summary_large_image', title, description },
}

const pageJsonLd = webPageJsonLd({ name: title, description, url: 'https://rubixkube.ai/kepler' })

export default function KeplerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      <KeplerLaunch serverNow={Date.now()} />
    </>
  )
}
