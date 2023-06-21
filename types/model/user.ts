import { z } from 'zod'
import { commonField } from './utils'


export const userSchema = z.object({
  username: z.string(),
  role: z.union([z.literal('owner'), z.literal('admin')]),
  password: z.string(),
}).merge(commonField)


export type User = z.infer<typeof userSchema>