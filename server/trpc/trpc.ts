import { initTRPC, TRPCError } from '@trpc/server'
import { Context } from './context'
import * as jose from 'jose'
import { User } from '../../types/model'


const t = initTRPC.context<Context>().create()

const isAuthed = t.middleware(async ({ next, ctx }) => {
  const runtimeConfig = useRuntimeConfig()

  let token = getCookie(ctx.event, 'token') || ''

  try {

    const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(runtimeConfig.JWT_KEY) )
    return next({
      ctx: {
        user: {
          username: payload.username as string,
          role: payload.role as User['role'] ,
        }
      }
    })
  } catch {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  
})

export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
export const router = t.router
export const middleware = t.middleware