import { z } from 'zod'
import { commonField } from './utils'


export const serviceSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  searchKey: z.string()
}).merge(commonField)


export type Service = z.infer<typeof serviceSchema>