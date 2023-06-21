import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import * as bcrypt from 'bcrypt'
import * as jose from 'jose'
import { setCookie } from 'h3'
import { publicProcedure, router } from '../trpc'
import { mongo } from '../../utils/db'
import type { User } from '../../../types/model'

const login = publicProcedure.input(
  z.object({
    username: z.string(),
    password: z.string(),
  }),
)
  .mutation(async ({ input, ctx }) => {


    const runtimeConfig = useRuntimeConfig()

    const { password, username } = input

    const user = await mongo.User?.findOne<User>({ username })

    if(!user) {
      throw new TRPCError({ code: 'BAD_REQUEST' })
    }
  
    try {
      await bcrypt.compare(password, user.password)

      const payload = {
        username: user.username,
        role: user.role
      }
      const token = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt(new Date().getTime())
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(runtimeConfig.JWT_KEY,))
    
      setCookie(ctx.event, 'token', token)

      return { token, ...payload }

    } catch {
      throw new TRPCError({ code: 'BAD_REQUEST' })
    }

  })

export const authRouter = router({
  login,
})
