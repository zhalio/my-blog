import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'
import { page } from './page'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, page],
}
