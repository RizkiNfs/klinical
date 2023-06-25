import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { protectedProcedure, router } from '../trpc'
import * as respository from '../../repository/transaction'
import { createPaginationOpts } from '../../utils/common'
import { transactionSchema } from '../../../types/model/'
import { sumTransaction } from '../../../utils/transaction'


const getTransactions = protectedProcedure
  .input(
    z.object({
      page: z.number().nullable().optional(),
      limit: z.number().nullable().optional(),
      searchKey: z.string().nullable().optional(),
    }),
  )
  .query(async ({ input }) => {

    const { page, limit, searchKey } = input

    try {
      const { data, count } = await respository.getTransactions(
        { searchKey: searchKey as string }, 
        createPaginationOpts(page as number, limit as number) 
      )
      return {
        data: data,
        meta: {
          total: count
        }
      }

    } catch(err) {
      throw new TRPCError({ code: 'BAD_REQUEST' })
    }
  })

const createTransaction = protectedProcedure
  .input(transactionSchema.omit({
    _id: true,
    createdAt: true,
    updatedAt: true,
    searchKey: true,
    price: true
  }))
  .mutation(async ({ input }) => {

    const transaction = await respository.createTransaction({
      ...input,
      price: sumTransaction(input)
    })
    
    return {
      message: 'success',
      insertedId: transaction?.insertedId
    }
  })


const deleteTransaction = protectedProcedure
  .input(transactionSchema.pick({
    _id: true,
  }))
  .mutation(async ({ input }) => {

    const transaction = await respository.deleteTransaction(input._id)
    
    return {
      message: 'success',
      data: transaction
    }
  })


const updateTransaction = protectedProcedure
  .input(transactionSchema.omit({
    createdAt: true,
    updatedAt: true,
    searchKey: true,
    price: true
  }))
  .mutation(async ({ input }) => {

    const transaction = await respository.updateTransaction({
      ...input,
      price: sumTransaction(input)
    })
    
    return {
      message: 'success',
      data: transaction
    }
  })


export const transactionsRouter = router({
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
})
