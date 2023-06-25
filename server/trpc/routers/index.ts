import { router } from '../trpc'
import { authRouter } from './auth'
import { patientsRouter } from './patients'
import { reservationsRouter } from './reservations'
import { servicesRouter } from './services'
import { inventoriesRouter } from './inventories'
import { transactionsRouter } from './transaction'

export const appRouter = router({
  auth: authRouter,
  patients: patientsRouter,
  reservations: reservationsRouter,
  services: servicesRouter,
  inventories: inventoriesRouter,
  transactions: transactionsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter