import { useQuery, useMutation } from '@tanstack/vue-query'


export const useAccounts = ({ page, searchKey }: any) => {
  const { $client } = useNuxtApp()
  return useQuery({
    queryKey: [
      'accounts.getAccounts',
      page,
      searchKey,
    ],
    queryFn: () => $client.accounts.getAccounts.query({
      page: page?.value,
      searchKey: searchKey?.value
    }),
    keepPreviousData: true
  })
  
}

export const useCreateAccount = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.accounts.createAccount.mutate,
  })
}

export const useDeleteAccount = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.accounts.deleteAccount.mutate,
  })
}

export const useUpdateAccount = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.accounts.updateAccount.mutate,
  })
}