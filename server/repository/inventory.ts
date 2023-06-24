import { ObjectId, FindOptions } from 'mongodb'
import { Inventory } from '../../types/model'

interface Pagination {
  limit?: number
  skip?: number
}
export const getInventories = async (patient: Partial<Inventory>, pagination: Pagination) => {
  
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
    mongo.Inventory?.find<Inventory>(query, findOpts).toArray(),
    mongo.Inventory?.countDocuments(query)
  ])

  if(!data) throw createError({
    statusCode: 404
  })

  return { data, count }
}

export const createInventory = async (patient: Partial<Inventory>) => {
  
  return mongo.Inventory?.insertOne({
    ...patient,
    createdAt: new Date(),
    _id: new ObjectId(),
    searchKey: `${patient.name} ${patient.description}`
  })

}

export const updateInventory = async ({ _id, ...patient }: Partial<Inventory>) => {
  
  return mongo.Inventory?.findOneAndUpdate(
    { _id: new ObjectId(_id) },
    {
      $set: {
        ...patient,
        updatedAt: new Date(),
      }
    }
  )

}

export const deleteInventory = async (id: ObjectId | string) => {

  return mongo.Inventory?.findOneAndDelete({
    _id: new ObjectId(id)
  })

}