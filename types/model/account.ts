import { z } from 'zod'
import { commonField } from './utils'


const accountTypeSchema = z.union([
  z.object({
    code: z.literal('1'),
    name: z.literal('asset'),
    label: z.literal('Aset'),
  }),
  z.object({
    code: z.literal('2'),
    name: z.literal('liability'),
    label: z.literal('Kewajiban'),
  }),
  z.object({
    code: z.literal('3'),
    name: z.literal('equity'),
    label: z.literal('Modal'),
  }),
  z.object({
    code: z.literal('4'),
    name: z.literal('income'),
    label: z.literal('Pendapatan'),
  }),
  z.object({
    code: z.literal('5'),
    name: z.literal('cost'),
    label: z.literal('Beban'),
  }),
])

export const accountSchema = z.object({
  name: z.string(),
  code: z.string(),
  type: accountTypeSchema,
  searchKey: z.string(),
}).merge(commonField)


export type Account = z.infer<typeof accountSchema>

export const accountType = [
  { code: '1', name: 'asset', label: 'Aset' },
  { code: '2', name: 'liability', label: 'Kewajiban' },
  { code: '3', name: 'equity', label: 'Modal' },
  { code: '4', name: 'income', label: 'Pendapatan' },
  { code: '5', name: 'cost', label: 'Beban' },
] satisfies Array<Account['type']>