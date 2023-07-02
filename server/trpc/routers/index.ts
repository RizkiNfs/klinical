import { router } from '../trpc'
import { accountsRouter } from './accounts'
import { authRouter } from './auth'
import { patientsRouter } from './patients'
import { reservationsRouter } from './reservations'
import { servicesRouter } from './services'
import { inventoriesRouter } from './inventories'
import { journalsRouter } from './journals'
import { transactionsRouter } from './transaction'

export const appRouter = router({
  accounts: accountsRouter,
  auth: authRouter,
  patients: patientsRouter,
  reservations: reservationsRouter,
  services: servicesRouter,
  inventories: inventoriesRouter,
  journals: journalsRouter,
  transactions: transactionsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter