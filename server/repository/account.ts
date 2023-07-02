import { ObjectId, FindOptions } from 'mongodb'
import { Account } from '../../types/model'

interface Pagination {
  limit?: number
  skip?: number
}
export const getAccounts = async (account: Partial<Account>, pagination: Pagination) => {
  
  const findOpts: FindOptions = { 
    sort: {
      _id: -1
    },
    ...pagination
  }

  let query = {}

  if(account.searchKey) {
    query = {
      searchKey: {
        $regex: account.searchKey,
        $options: 'i'
      }
    }
  }
  const [data, count] = await Promise.all([
    mongo.Account?.find<Account>(query, findOpts).toArray(),
    mongo.Account?.countDocuments(query)
  ])

  if(!data) throw createError({
    statusCode: 404
  })

  return { data, count }
}

export const createAccount = async (account: Partial<Account>) => {
  
  return mongo.Account?.insertOne({
    ...account,
    createdAt: new Date(),
    _id: new ObjectId(),
  })

}

export const updateAccount = async ({ _id, ...account }: Partial<Account>) => {
  
  return mongo.Account?.findOneAndUpdate(
    { _id: new ObjectId(_id) },
    {
      $set: {
        ...account,
        updatedAt: new Date(),
      }
    }
  )

}

export const deleteAccount = async (id: ObjectId | string) => {

  return mongo.Account?.findOneAndDelete({
    _id: new ObjectId(id)
  })

}