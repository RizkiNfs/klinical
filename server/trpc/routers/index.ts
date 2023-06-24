import { router } from '../trpc'
import { authRouter } from './auth'
import { patientsRouter } from './patients'
import { reservationsRouter } from './reservations'
import { servicesRouter } from './services'
import { inventoriesRouter } from './inventories'

export const appRouter = router({
  auth: authRouter,
  patients: patientsRouter,
  reservations: reservationsRouter,
  services: servicesRouter,
  inventories: inventoriesRouter
})

// export type definition of API
export type AppRouter = typeof appRouter