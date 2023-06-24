import { z } from 'zod'
import { commonField } from './utils'


export const inventorySchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  stock: z.number(),
  searchKey: z.string(),
}).merge(commonField)


export type Inventory = z.infer<typeof inventorySchema>