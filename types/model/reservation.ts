import { z } from 'zod'
import { commonField } from './utils'
import { patientSchema } from './patient'

export const reservationSchema = z.object({
  patient: patientSchema.pick({ name: true, phone: true }),
  date: z.union([z.string(), z.date()]),
  description: z.string()
}).merge(commonField)


export type Reservation = z.infer<typeof reservationSchema>