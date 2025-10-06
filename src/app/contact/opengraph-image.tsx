import { generateOGImage } from '@/lib/og-image'

export const alt = 'RubixKube Contact - Site Reliability Intelligence'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return generateOGImage({
    title: 'Contact',
    description: 'Ready to transform your site reliability? Let\'s talk.',
    stats: '24/7 Support'
  })
}