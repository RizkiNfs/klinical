import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import * as respository from '../../repository/patient'
import { createPaginationOpts } from '../../utils/common'
import { patientSchema } from '../../../types/model/patient'


const getPatients = publicProcedure
  .input(
    z.object({
      page: z.number().optional(),
      limit: z.number().optional(),
      searchKey: z.string().optional(),
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

const createPatient = publicProcedure
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


const deletePatient = publicProcedure
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


const updatePatient = publicProcedure
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