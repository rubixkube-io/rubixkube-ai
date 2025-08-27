import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'RubixKube - Site Reliability Intelligence'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/jpeg'

export default async function Image() {
  // Read the existing og.jpg file from the public directory
  const imageData = await readFile(join(process.cwd(), 'public/og.jpg'))
  
  return new Response(new Uint8Array(imageData), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
