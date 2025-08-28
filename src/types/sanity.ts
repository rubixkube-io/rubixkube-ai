// Sanity document types
export interface SanityAsset {
  _ref: string
  _type: string
}

export interface SanityImage {
  asset: SanityAsset
  alt?: string
  caption?: string
}

export interface SanityAuthor {
  name: string
  bio?: string | SanityBlock[]
  image?: SanityImage
}

export interface SanityBlockChild {
  _key: string
  _type: string
  text: string
  marks?: string[]
}

export interface SanityBlock {
  _key: string
  _type: 'block'
  style?: string
  children: SanityBlockChild[]
  markDefs?: Array<{
    _key: string
    _type: string
    href?: string
  }>
}

export interface SanityImageBlock {
  _key: string
  _type: 'image'
  asset: SanityAsset
  alt?: string
  caption?: string
}

export interface SanityCallout {
  _key: string
  _type: 'callout'
  type: 'note' | 'caution' | 'insight'
  title?: string
  content: SanityBlock[]
}

export interface SanityCode {
  _key: string
  _type: 'code'
  code: string
  language: string
  filename?: string
  showLineNumbers?: boolean
}

export type SanityBodyContent = SanityBlock | SanityImageBlock | SanityCallout | SanityCode

export interface SanityPost {
  _id: string
  _type: 'post'
  title: string
  slug: {
    current: string
  }
  excerpt: string
  publishedAt: string
  featured?: boolean
  image?: SanityImage
  body: SanityBodyContent[]
  seoTitle?: string
  seoDescription?: string
  author?: SanityAuthor
  categories?: string[]
}

// Props types for components
export interface PortableTextImageProps {
  value: SanityImageBlock
}

export interface PortableTextCalloutProps {
  value: SanityCallout
}

export interface PortableTextCodeProps {
  value: SanityCode
}

export interface PortableTextBlockProps {
  children: React.ReactNode
  value: SanityBlock
}
