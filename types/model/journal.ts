import { z } from 'zod'
import { commonField } from './utils'
import { accountSchema } from './account'


const journalItems = z.array(z.object({
  value: z.number()
}).merge(accountSchema.pick({ code: true, name: true, type: true, _id: true })))

export const journalSchema = z.object({
  debit: journalItems,
  credit: journalItems,
  date: z.union([z.string(), z.date()])
}).merge(commonField)


export type Journal = z.infer<typeof journalSchema>
