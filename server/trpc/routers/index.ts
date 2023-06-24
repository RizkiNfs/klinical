import { router } from '../trpc'
import { authRouter } from './auth'
import { patientsRouter } from './patients'
import { reservationsRouter } from './reservations'
import { servicesRouter } from './services'

export const appRouter = router({
  auth: authRouter,
  patients: patientsRouter,
  reservations: reservationsRouter,
  services: servicesRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter