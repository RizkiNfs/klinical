import type { Transaction } from '~/types/model'

export const sumTransaction = (transaction: Transaction) => {

  const totalServicesPrice = transaction.services?.reduce((acc,i) => acc+i.price,0) || 0
  const totalInventoriesPrice = transaction.inventories?.reduce((acc,i) => acc+(i.price * (i.count || 1)),0) || 0
  return totalInventoriesPrice + totalServicesPrice
}