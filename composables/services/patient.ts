import { useQuery, useMutation } from '@tanstack/vue-query'


export const usePatients = ({ page, searchKey }: any) => {
  const { $client } = useNuxtApp()
  return useQuery({
    queryKey: [
      '/api/patients',
      page,
      searchKey
    ],
    queryFn: () => $client.patients.getPatients.query({
      page: page.value,
      searchKey: searchKey.value
    }),
    keepPreviousData: true
  })
  
}

export const useCreatePatient = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.patients.createPatient.mutate,
  })
}

export const useDeletePatient = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.patients.deletePatient.mutate,
  })
}

export const useUpdatePatient = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.patients.updatePatient.mutate,
  })
}