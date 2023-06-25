import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import * as respository from '../../repository/patient'
import { createPaginationOpts } from '../../utils/common'
import { patientSchema } from '../../../types/model/patient'


const getPatients = protectedProcedure
  .input(
    z.object({
      page: z.number().nullable().optional(),
      limit: z.number().nullable().optional(),
      searchKey: z.string().nullable().optional(),
    }),
  )
  .query(async ({ input }) => {

    const { page, limit, searchKey } = input

    const { data, count } = await respository.getPatients(
      { searchKey: searchKey as string }, 
      createPaginationOpts(page as number, limit as number) 
    )
    return {
      data: data,
      meta: {
        total: count
      }
    }
  })

const createPatient = protectedProcedure
  .input(patientSchema.pick({
    address: true,
    name:  true,
    phone: true,
    gender: true,
    dateOfBirth: true,
  }))
  .mutation(async ({ input }) => {

    const patient = await respository.createPatient(input)
    
    return {
      message: 'success',
      insertedId: patient?.insertedId
    }
  })


const deletePatient = protectedProcedure
  .input(patientSchema.pick({
    _id: true,
  }))
  .mutation(async ({ input }) => {

    const patient = await respository.deletePatient(input._id)
    
    return {
      message: 'success',
      data: patient
    }
  })


const updatePatient = protectedProcedure
  .input(patientSchema.pick({
    _id: true,
    address: true,
    name:  true,
    phone: true,
    gender: true,
    dateOfBirth: true,
  }))
  .mutation(async ({ input }) => {

    const patient = await respository.updatePatient(input)
    
    return {
      message: 'success',
      data: patient
    }
  })


export const patientsRouter = router({
  getPatients,
  createPatient,
  updatePatient,
  deletePatient
})
