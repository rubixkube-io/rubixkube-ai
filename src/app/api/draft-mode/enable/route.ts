import { client } from '@/sanity/lib/client'
import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

const clientWithToken = client.withConfig({
  token: process.env.SANITY_API_READ_TOKEN,
})

export async function GET(request: Request) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    clientWithToken,
    request.url,
  )

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  ;(await draftMode()).enable()
  redirect(redirectTo)
}
