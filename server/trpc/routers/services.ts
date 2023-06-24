import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import * as respository from '../../repository/service'
import { createPaginationOpts } from '../../utils/common'
import { serviceSchema } from '../../../types/model/'


const getServices = publicProcedure
  .input(
    z.object({
      page: z.number().nullable().optional(),
      limit: z.number().nullable().optional(),
      searchKey: z.string().nullable().optional(),
    }),
  )
  .query(async ({ input }) => {

    const { page, limit, searchKey } = input

    const { data, count } = await respository.getServices(
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

const createService = publicProcedure
  .input(serviceSchema.pick({
    name: true,
    description: true,
    price: true
  }))
  .mutation(async ({ input }) => {

    const service = await respository.createService(input)
    
    return {
      message: 'success',
      insertedId: service?.insertedId
    }
  })


const deleteService = publicProcedure
  .input(serviceSchema.pick({
    _id: true,
  }))
  .mutation(async ({ input }) => {

    const service = await respository.deleteService(input._id)
    
    return {
      message: 'success',
      data: service
    }
  })


const updateService = publicProcedure
  .input(serviceSchema.pick({
    _id: true,
    name: true,
    description: true,
    price: true
  }))
  .mutation(async ({ input }) => {

    const service = await respository.updateService(input)
    
    return {
      message: 'success',
      data: service
    }
  })


export const servicesRouter = router({
  getServices,
  createService,
  updateService,
  deleteService
})
