import { useQuery, useMutation } from '@tanstack/vue-query'


export const useInventories = ({ page, searchKey }: any) => {
  const { $client } = useNuxtApp()
  return useQuery({
    queryKey: [
      'inventories.getInventories',
      page,
      searchKey
    ],
    queryFn: () => $client.inventories.getInventories.query({
      page: page?.value,
      searchKey: searchKey.value
    }),
    keepPreviousData: true
  })
  
}

export const useCreateInventory = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.inventories.createInventory.mutate,
  })
}

export const useDeleteInventory = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.inventories.deleteInventory.mutate,
  })
}

export const useUpdateInventory = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.inventories.updateInventory.mutate,
  })
}