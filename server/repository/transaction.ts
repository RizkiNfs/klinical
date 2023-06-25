import { ObjectId, FindOptions } from 'mongodb'
import { Transaction } from '../../types/model'

interface Pagination {
  limit?: number
  skip?: number
}
export const getTransactions = async (transaction: Partial<Transaction>, pagination: Pagination) => {
  
  const findOpts: FindOptions = { 
    sort: {
      _id: -1
    },
    ...pagination
  }

  let query = {}

  if(transaction.searchKey) {
    query = {
      searchKey: {
        $regex: transaction.searchKey,
        $options: 'i'
      }
    }
  }
  const [data, count] = await Promise.all([
    mongo.Transaction?.find<Transaction>(query, findOpts).toArray(),
    mongo.Transaction?.countDocuments(query)
  ])

  if(!data) throw createError({
    statusCode: 404
  })

  return { data, count }
}

export const createTransaction = async (transaction: Partial<Transaction>) => {
  
  return mongo.Transaction?.insertOne({
    ...transaction,
    createdAt: new Date(),
    _id: new ObjectId(),
  })

}

export const updateTransaction = async ({ _id, ...transaction }: Partial<Transaction>) => {
  
  return mongo.Transaction?.findOneAndUpdate(
    { _id: new ObjectId(_id) },
    {
      $set: {
        ...transaction,
        updatedAt: new Date(),
      }
    }
  )

}

export const deleteTransaction = async (id: ObjectId | string) => {

  return mongo.Transaction?.findOneAndDelete({
    _id: new ObjectId(id)
  })

}