import { client } from '@/sanity/lib/client'
import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

const clientWithToken = client.withConfig({
  token: process.env.SANITY_API_READ_TOKEN,
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const redirectPath = searchParams.get('redirect')

  // Handle custom previewAction queries
  if (secret && redirectPath) {
    if (secret !== process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET) {
      return new Response('Invalid secret', { status: 401 })
    }
    const dm = await draftMode()
    dm.enable()
    redirect(redirectPath)
  }

  // Fallback to standard Sanity preview URL secret format
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    clientWithToken,
    request.url,
  )

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  const dm = await draftMode()
  dm.enable()
  redirect(redirectTo)
}
