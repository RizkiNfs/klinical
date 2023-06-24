import { ObjectId, FindOptions } from 'mongodb'
import { Service } from '../../types/model'

interface Pagination {
  limit?: number
  skip?: number
}
export const getServices = async (patient: Partial<Service>, pagination: Pagination) => {
  
  const findOpts: FindOptions = { 
    sort: {
      _id: -1
    },
    ...pagination
  }

  let query = {}

  if(patient.searchKey) {
    query = {
      searchKey: {
        $regex: patient.searchKey,
        $options: 'i'
      }
    }
  }
  const [data, count] = await Promise.all([
    mongo.Service?.find<Service>(query, findOpts).toArray(),
    mongo.Service?.countDocuments(query)
  ])

  if(!data) throw createError({
    statusCode: 404
  })

  return { data, count }
}

export const createService = async (patient: Partial<Service>) => {
  
  return mongo.Service?.insertOne({
    ...patient,
    createdAt: new Date(),
    _id: new ObjectId(),
    searchKey: `${patient.name} ${patient.description}`
  })

}

export const updateService = async ({ _id, ...patient }: Partial<Service>) => {
  
  return mongo.Service?.findOneAndUpdate(
    { _id: new ObjectId(_id) },
    {
      $set: {
        ...patient,
        updatedAt: new Date(),
      }
    }
  )

}

export const deleteService = async (id: ObjectId | string) => {

  return mongo.Service?.findOneAndDelete({
    _id: new ObjectId(id)
  })

}