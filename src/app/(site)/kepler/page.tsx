import { Metadata } from 'next'
import { webPageJsonLd } from '@/components/structured-data'
import { KeplerLaunch } from './_launch/kepler-launch'
import './kepler.css'

const title = 'Kepler: the IDE for operations | By RubixKube'
const description =
  'Kepler is the IDE for operations, with a harness for the AI inside it. It learns your systems, shows its proof and asks before it changes anything.'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Kepler', 'IDE for operations', 'harness for operations', 'AI for operations', 'AI for DevOps', 'platform engineering', 'SRE', 'DevOps', 'RubixKube'],
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
