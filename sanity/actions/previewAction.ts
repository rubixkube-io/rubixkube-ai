import type { DocumentActionComponent } from 'sanity'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const PREVIEW_SECRET = process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET || ''

export const previewAction: DocumentActionComponent = (props) => {
  const slug = (props.draft ?? props.published) as { slug?: { current?: string } } | null
  const slugValue = slug?.slug?.current

  if (!slugValue) return null

  return {
    label: 'Preview',
    onHandle: () => {
      let redirectPath = ''
      if (props.type === 'post') {
        redirectPath = `/blog/${slugValue}`
      } else if (props.type === 'referencePage') {
        const doc = props.draft ?? props.published
        const category = (doc as any)?.category || 'learn'
        redirectPath = `/${category}/${slugValue}`
      }

      if (!redirectPath) return

      const url = `${SITE_URL}/api/draft-mode/enable?secret=${PREVIEW_SECRET}&redirect=${redirectPath}`
      window.open(url, '_blank')
    },
  }
}
