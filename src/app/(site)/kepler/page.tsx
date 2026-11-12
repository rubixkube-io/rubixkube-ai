import { Metadata } from 'next'
import { webPageJsonLd } from '@/components/structured-data'
import { KeplerLaunch } from './_launch/kepler-launch'
import './kepler.css'

const title = 'Kepler: your personal AI SRE | By RubixKube'
const description =
  'Your personal AI SRE for everything after git push. Kepler runs on your machine, finds the cause with evidence and asks before it changes anything.'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Kepler', 'AI SRE', 'personal AI SRE', 'AI for DevOps', 'platform engineering', 'SRE', 'DevOps', 'RubixKube'],
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
