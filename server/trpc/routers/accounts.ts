import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import * as respository from '../../repository/account'
import { createPaginationOpts } from '../../utils/common'
import { accountSchema } from '../../../types/model/account'


const getAccounts = protectedProcedure
  .input(
    z.object({
      page: z.number().nullable().optional(),
      limit: z.number().nullable().optional(),
      searchKey: z.string().nullable().optional()
    }),
  )
  .query(async ({ input }) => {

    const { page, searchKey } = input

    const { data, count } = await respository.getAccounts(
      { searchKey: searchKey as string }, 
      createPaginationOpts(page as number, 9999) 
    )
    return {
      data: data.sort((a,b) => Number(a.type.code+a.code) - Number(b.type.code+b.code)),
      meta: {
        total: count
      }
    }
  })

const createAccount = protectedProcedure
  .input(accountSchema.pick({
    code: true,
    type: true,
    name: true,
  }))
  .mutation(async ({ input }) => {

    const account = await respository.createAccount({
      ...input,
      searchKey: `${input.name} ${input.type.label}`
    })
    
    return {
      message: 'success',
      insertedId: account?.insertedId
    }
  })


const deleteAccount = protectedProcedure
  .input(accountSchema.pick({
    _id: true,
  }))
  .mutation(async ({ input }) => {

    const account = await respository.deleteAccount(input._id)
    
    return {
      message: 'success',
      data: account
    }
  })


const updateAccount = protectedProcedure
  .input(accountSchema.pick({
    _id: true,
    code: true,
    type: true,
    name: true,
  }))
  .mutation(async ({ input }) => {

    const account = await respository.updateAccount({
      ...input,
      searchKey: `${input.name} ${input.type.label}`
    })
    
    return {
      message: 'success',
      data: account
    }
  })


export const accountsRouter = router({
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount
})
