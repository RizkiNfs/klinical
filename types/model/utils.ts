import { ObjectId } from 'mongodb'
import { z } from 'zod'

export interface CommonField {
  createdAt: string | Date
  updatedAt: string |Date
  _id: string | ObjectId
}

export const commonField = z.object({
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
  _id: z.string()
})