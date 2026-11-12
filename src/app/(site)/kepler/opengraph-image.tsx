import { KEPLER_OG_SIZE, keplerOgImage } from '@/lib/og-kepler'

export const alt = 'Kepler: your personal AI SRE, for everything after git push'
export const size = KEPLER_OG_SIZE
export const contentType = 'image/png'

export default async function Image() {
  return keplerOgImage({
    background: 'kepler-bg.jpg',
    bright: 'Your personal AI SRE.',
    soft: 'For everything after git push.',
    address: 'rubixkube.ai/kepler',
  })
}
