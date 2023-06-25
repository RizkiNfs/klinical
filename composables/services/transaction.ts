import { useQuery, useMutation } from '@tanstack/vue-query'


export const useTransactions = ({ page, searchKey }: any) => {
  const { $client } = useNuxtApp()
  return useQuery({
    queryKey: [
      'transactions.getTransactions',
      page,
      searchKey
    ],
    queryFn: () => $client.transactions.getTransactions.query({
      page: page?.value,
      searchKey: searchKey.value
    }),
  })
  
}

export const useCreateTransaction = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.transactions.createTransaction.mutate,
  })
}

export const useDeleteTransaction = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.transactions.deleteTransaction.mutate,
  })
}

export const useUpdateTransaction = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.transactions.updateTransaction.mutate,
  })
}