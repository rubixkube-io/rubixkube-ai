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
      const url = `${SITE_URL}/api/draft-mode/enable?secret=${PREVIEW_SECRET}&redirect=/blog/${slugValue}`
      window.open(url, '_blank')
    },
  }
}
