import { Metadata } from 'next'
import { webPageJsonLd } from '@/components/structured-data'
import { KeplerLaunch } from './_launch/kepler-launch'
import './kepler.css'

const title = 'Kepler: the harness for operations | By RubixKube'
const description =
  'Code has a harness. Now operations does too. Kepler learns your systems, shows the proof behind every finding and asks before it changes anything.'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Kepler', 'harness for operations', 'AI for operations', 'AI for DevOps', 'platform engineering', 'SRE', 'DevOps', 'RubixKube'],
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
