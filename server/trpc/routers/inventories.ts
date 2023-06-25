import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import * as respository from '../../repository/inventory'
import { createPaginationOpts } from '../../utils/common'
import { inventorySchema } from '../../../types/model/'


const getInventories = protectedProcedure
  .input(
    z.object({
      page: z.number().nullable().optional(),
      limit: z.number().nullable().optional(),
      searchKey: z.string().nullable().optional(),
    }),
  )
  .query(async ({ input }) => {

    const { page, limit, searchKey } = input

    const { data, count } = await respository.getInventories(
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

const createInventory = protectedProcedure
  .input(inventorySchema.pick({
    name: true,
    description: true,
    price: true,
    stock: true,
  }))
  .mutation(async ({ input }) => {

    const inventory = await respository.createInventory(input)
    
    return {
      message: 'success',
      insertedId: inventory?.insertedId
    }
  })


const deleteInventory = protectedProcedure
  .input(inventorySchema.pick({
    _id: true,
  }))
  .mutation(async ({ input }) => {

    const inventory = await respository.deleteInventory(input._id)
    
    return {
      message: 'success',
      data: inventory
    }
  })


const updateInventory = protectedProcedure
  .input(inventorySchema.pick({
    _id: true,
    name: true,
    description: true,
    price: true,
    stock: true,
  }))
  .mutation(async ({ input }) => {

    const inventory = await respository.updateInventory(input)
    
    return {
      message: 'success',
      data: inventory
    }
  })


export const inventoriesRouter = router({
  getInventories,
  createInventory,
  updateInventory,
  deleteInventory
})
