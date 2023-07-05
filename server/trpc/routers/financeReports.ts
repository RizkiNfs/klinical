import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import * as respository from '../../repository/financeReport'


const getIncomeAndCost = protectedProcedure
  .input(
    z.object({
      date: z.union([z.string(), z.date()]),
    }),
  )
  .query(async ({ input }) => {

    const { date } = input

    const { cost, income } = await respository.getIncomeAndCost(new Date(date))
    return {
      cost,
      income
    }
  })


export const financeReportsRouter = router({
  getIncomeAndCost,
})
