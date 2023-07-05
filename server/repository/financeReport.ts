import { dayjs } from '../../utils/date'

interface Result {
  _id: string
  total: number
}

export const getIncomeAndCost = async (dateArg: Date) => {
  
  const date = {
    '$gte': dayjs(dateArg).startOf('month').toDate(),
    '$lte': dayjs(dateArg).endOf('month').toDate(),
  }
  const [income,cost] = await Promise.all([
    mongo.Journal?.aggregate<Result>([
      {
        '$match': { 
          'credit.type.code': '4',
          date
        }
      },
      {
        '$unwind': '$credit'
      },
      {
        '$group': {
          _id: '$credit.name',
          total: {
            $sum: '$credit.value',
          },
        }
      }
    ]).toArray(),
    mongo.Journal?.aggregate<Result>([
      {
        '$match': { 
          'debit.type.code': '5',
          date
        },
      },
      {
        '$unwind': '$debit'
      },
      {
        '$group': {
          _id: '$debit.name',
          total: {
            $sum: '$debit.value',
          },
        }
      }
    ]).toArray(),
  ])

  return { income, cost }
}
