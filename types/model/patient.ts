import { z } from 'zod'
import { commonField } from './utils'


export const patientSchema = z.object({
  name: z.string(),
  gender: z.union([z.literal('Laki-laki'), z.literal('Perempuan')]),
  phone: z.string(),
  address: z.string(),
  searchKey: z.string(),
  dateOfBirth: z.union([z.string(), z.date()])
}).merge(commonField)


export type Patient = z.infer<typeof patientSchema>