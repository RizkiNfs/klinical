import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import * as respository from '../../repository/inventory'
import { createPaginationOpts } from '../../utils/common'
import { inventorySchema } from '../../../types/model/'


const getInventories = publicProcedure
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

const createInventory = publicProcedure
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


const deleteInventory = publicProcedure
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


const updateInventory = publicProcedure
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
