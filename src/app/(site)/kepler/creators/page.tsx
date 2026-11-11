import { Metadata } from 'next'
import { CreatorsPageClient } from './creators-page-client'

const title = 'Kepler for creators'
const description = 'Two months of Kepler Pro, free. Six if you post. Say what you think.'

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
  return <CreatorsPageClient />
}
