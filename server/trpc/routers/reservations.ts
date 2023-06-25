import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import * as respository from '../../repository/reservation'
import { reservationSchema } from '../../../types/model'


const getReservations = protectedProcedure
  .input(
    z.object({
      startDate: z.union([z.string(), z.date()]).nullable().optional(),
      endDate: z.union([z.string(), z.date()]).nullable().optional(),
    }),
  )
  .query(async ({ input }) => {

    const { startDate, endDate } = input

    const { data, count } = await respository.getReservations(
      { startDate, endDate } 
    )
    return {
      data: data,
      meta: {
        total: count
      }
    }
  })

const createReservation = protectedProcedure
  .input(reservationSchema.pick({
    date: true,
    patient: true,
    description: true
  }))
  .mutation(async ({ input }) => {

    const reservation = await respository.createReservation({ ...input, date: new Date(input.date) })
    
    return {
      message: 'success',
      insertedId: reservation?.insertedId
    }
  })


const deleteReservation = protectedProcedure
  .input(reservationSchema.pick({
    _id: true,
  }))
  .mutation(async ({ input }) => {

    const reservation = await respository.deleteReservation(input._id)
    
    return {
      message: 'success',
      data: reservation
    }
  })


const updateReservation = protectedProcedure
  .input(reservationSchema.pick({
    date: true,
    _id: true,
    patient: true,
    description: true
  }))
  .mutation(async ({ input }) => {

    const reservation = await respository.updateReservation({ ...input, date: new Date(input.date) })
    
    return {
      message: 'success',
      data: reservation
    }
  })


export const reservationsRouter = router({
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation
})
