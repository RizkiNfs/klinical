import { useQuery, useMutation } from '@tanstack/vue-query'


export const useServices = ({ page, searchKey }: any) => {
  const { $client } = useNuxtApp()
  return useQuery({
    queryKey: [
      '/api/services',
      page,
      searchKey
    ],
    queryFn: () => $client.services.getServices.query({
      page: page?.value,
      searchKey: searchKey.value
    }),
    keepPreviousData: true
  })
  
}

export const useCreateService = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.services.createService.mutate,
  })
}

export const useDeleteService = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.services.deleteService.mutate,
  })
}

export const useUpdateService = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.services.updateService.mutate,
  })
}