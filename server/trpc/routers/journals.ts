import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import * as respository from '../../repository/journal'
import { createPaginationOpts } from '../../utils/common'
import { journalSchema } from '../../../types/model/journal'


const getJournals = protectedProcedure
  .input(
    z.object({
      page: z.number().nullable().optional(),
      limit: z.number().nullable().optional(),
      startDate: z.string().nullable().optional(),
      endDate: z.string().nullable().optional()
    }),
  )
  .query(async ({ input }) => {

    const { page } = input

    const { data, count } = await respository.getJournals(
      { }, 
      createPaginationOpts(page as number, 9999) 
    )
    return {
      data: data,
      meta: {
        total: count
      }
    }
  })

const createJournal = protectedProcedure
  .input(journalSchema.pick({
    debit: true,
    credit: true,
    date: true,
  }))
  .mutation(async ({ input }) => {

    const journal = await respository.createJournal({
      ...input,
    })
    
    return {
      message: 'success',
      insertedId: journal?.insertedId
    }
  })


const deleteJournal = protectedProcedure
  .input(journalSchema.pick({
    _id: true,
  }))
  .mutation(async ({ input }) => {

    const journal = await respository.deleteJournal(input._id)
    
    return {
      message: 'success',
      data: journal
    }
  })


const updateJournal = protectedProcedure
  .input(journalSchema.pick({
    _id: true,
    debit: true,
    credit: true,
    date: true,
  }))
  .mutation(async ({ input }) => {

    const journal = await respository.updateJournal({
      ...input,
    })
    
    return {
      message: 'success',
      data: journal
    }
  })


export const journalsRouter = router({
  getJournals,
  createJournal,
  updateJournal,
  deleteJournal
})
