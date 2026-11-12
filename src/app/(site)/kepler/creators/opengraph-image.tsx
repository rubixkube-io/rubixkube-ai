import { KEPLER_OG_SIZE, keplerOgImage } from '@/lib/og-kepler'

export const alt = 'Kepler creator program: get Kepler Pro free'
export const size = KEPLER_OG_SIZE
export const contentType = 'image/png'

export default async function Image() {
  return keplerOgImage({
    background: 'creators-bg.jpg',
    label: 'Creator program',
    bright: 'Get Kepler Pro free.',
    soft: 'Two months, on us.',
    address: 'rubixkube.ai/kepler/creators',
  })
}
