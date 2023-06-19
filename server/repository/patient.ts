import { ObjectId, FindOptions } from 'mongodb'
import { Patient } from '../../types/model/patient'

interface Pagination {
  limit?: number
  skip?: number
}
export const getPatients = async (patient: Partial<Patient>, pagination: Pagination) => {
  
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
    mongo.Patient?.find<Patient>(query, findOpts).toArray(),
    mongo.Patient?.countDocuments(query)
  ])

  if(!data) throw createError({
    statusCode: 404
  })

  return { data, count }
}

export const createPatient = async (patient: Partial<Patient>) => {
  
  return mongo.Patient?.insertOne({
    ...patient,
    createdAt: new Date(),
    _id: new ObjectId(),
    searchKey: `${patient.name} ${patient.phone}`
  })

}

export const updatePatient = async ({ _id, ...patient }: Partial<Patient>) => {
  
  return mongo.Patient?.findOneAndUpdate(
    { _id: new ObjectId(_id) },
    {
      $set: {
        ...patient,
        updatedAt: new Date(),
      }
    }
  )

}

export const deletePatient = async (id: ObjectId | string) => {

  return mongo.Patient?.findOneAndDelete({
    _id: new ObjectId(id)
  })

}