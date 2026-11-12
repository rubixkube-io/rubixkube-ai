import { Metadata } from 'next'
import { CreatorsPageClient } from './creators-page-client'
import '../kepler.css'

const title = 'Kepler for creators'
const description = 'Two months of Kepler Pro, free. Post an honest take and get four more.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://rubixkube.ai/kepler/creators',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function KeplerCreatorsPage() {
  return <CreatorsPageClient serverNow={Date.now()} />
}
