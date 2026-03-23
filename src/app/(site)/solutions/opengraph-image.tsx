import { generateOGImage } from '@/lib/og-image'

export const alt = 'RubixKube Solutions - Site Reliability Intelligence'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return generateOGImage({
    title: 'Solutions',
    description: 'Tailored solutions for enterprise reliability challenges',
    stats: 'Uptime: 99.99%'
  })
}
