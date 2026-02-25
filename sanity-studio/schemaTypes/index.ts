import { type SchemaTypeDefinition } from 'sanity'
import heroSchema from './heroSchema'
import aboutSchema from './aboutSchema'
import projectSchema from './projectSchema'
import skillSchema from './skillSchema'
import experienceSchema from './experienceSchema'

export const schemaTypes: SchemaTypeDefinition[] = [
  heroSchema,
  aboutSchema,
  projectSchema,
  skillSchema,
  experienceSchema,
]
