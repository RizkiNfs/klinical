import { ObjectId } from 'mongodb'
import { Reservation } from '../../types/model'
import { dayjs } from '../../utils/date'

interface Params extends Partial<Reservation> {
  startDate?: string | Date | null
  endDate?: string | Date | null
}

export const getReservations = async (params: Params) => {
  
  const startDate = dayjs(params.startDate || new Date()).format('YYYY-MM-DD')
  const endDate = dayjs(startDate).add(4, 'day').format('YYYY-MM-DD')

  const query = {
    date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    },
  }

  const [data, count] = await Promise.all([
    mongo.Reservation?.find<Reservation>(query).toArray(),
    mongo.Reservation?.countDocuments(query)
  ])

  if(!data) throw createError({
    statusCode: 404
  })

  return { data, count }
}

export const createReservation = async (reservation: Partial<Reservation>) => {
  
  return mongo.Reservation?.insertOne({
    ...reservation,
    createdAt: new Date(),
    _id: new ObjectId(),
  })

}

export const updateReservation = async ({ _id, ...reservation }: Partial<Reservation>) => {

  return mongo.Reservation?.findOneAndUpdate(
    { _id: new ObjectId(_id) },
    {
      $set: {
        ...reservation,
        updatedAt: new Date(),
      }
    }
  )

}

export const deleteReservation = async (id: ObjectId | string) => {

  return mongo.Reservation?.findOneAndDelete({
    _id: new ObjectId(id)
  })

}