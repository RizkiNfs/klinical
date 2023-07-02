import { ObjectId, FindOptions } from 'mongodb'
import { Journal } from '../../types/model'

interface Pagination {
  limit?: number
  skip?: number
}
export const getJournals = async (journal: Partial<Journal>, pagination: Pagination) => {
  
  const findOpts: FindOptions = { 
    sort: {
      _id: -1
    },
    ...pagination
  }

  const query = {}

  const [data, count] = await Promise.all([
    mongo.Journal?.find<Journal>(query, findOpts).toArray(),
    mongo.Journal?.countDocuments(query)
  ])

  if(!data) throw createError({
    statusCode: 404
  })

  return { data, count }
}

export const createJournal = async (journal: Partial<Journal>) => {
  
  return mongo.Journal?.insertOne({
    ...journal,
    createdAt: new Date(),
    _id: new ObjectId(),
  })

}

export const updateJournal = async ({ _id, ...journal }: Partial<Journal>) => {
  
  return mongo.Journal?.findOneAndUpdate(
    { _id: new ObjectId(_id) },
    {
      $set: {
        ...journal,
        updatedAt: new Date(),
      }
    }
  )

}

export const deleteJournal = async (id: ObjectId | string) => {

  return mongo.Journal?.findOneAndDelete({
    _id: new ObjectId(id)
  })

}