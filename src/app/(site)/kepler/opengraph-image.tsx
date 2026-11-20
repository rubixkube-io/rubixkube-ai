import { KEPLER_OG_SIZE, keplerOgImage } from '@/lib/og-kepler'

export const alt = 'Kepler: the harness for operations. Code has a harness. Now operations does too.'
export const size = KEPLER_OG_SIZE
export const contentType = 'image/png'

export default async function Image() {
  return keplerOgImage({
    background: 'kepler-bg.jpg',
    bright: 'The harness for operations.',
    soft: 'Code has a harness. Now operations does too.',
    address: 'rubixkube.ai/kepler',
  })
}
