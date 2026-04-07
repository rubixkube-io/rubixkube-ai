import { type SchemaTypeDefinition } from 'sanity'
import { postType } from '../../../sanity/schemas/post'
import { authorType } from '../../../sanity/schemas/author'
import { categoryType } from '../../../sanity/schemas/category'
import { referencePageType } from '../../../sanity/schemas/referencePage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, authorType, categoryType, referencePageType],
}
