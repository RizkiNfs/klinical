import { z } from 'zod'
import { commonField } from './utils'
import { serviceSchema } from './service'
import { inventorySchema } from './inventory'
import { patientSchema } from './patient'

const inventory = inventorySchema.pick({
  _id: true,
  name: true,
  price: true
}).merge(z.object({
  count: z.number()
}))

export const transactionSchema = z.object({
  price: z.number(),
  services: z.array(serviceSchema.pick({
    _id: true,
    name: true,
    price: true
  })),
  inventories: z.array(inventory),
  patient: patientSchema.pick({
    _id: true,
    name: true,
    phone: true
  }),
  searchKey: z.string(),
  description: z.string(),
}).merge(commonField)


export type Transaction = z.infer<typeof transactionSchema>