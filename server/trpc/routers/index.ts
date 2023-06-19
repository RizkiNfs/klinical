import { router } from '../trpc'
import { authRouter } from './auth'
import { patientsRouter } from './patients'

export const appRouter = router({
  auth: authRouter,
  patients: patientsRouter
})

// export type definition of API
export type AppRouter = typeof appRouter