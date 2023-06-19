import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

export const authRouter = router({
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(({ input }) => {
      return {
        greeting: `hello ${input.username} pass ${input.password}`,
      }
    }),
})
