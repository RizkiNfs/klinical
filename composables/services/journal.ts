import { useQuery, useMutation } from '@tanstack/vue-query'


export const useJournals = ({ page }: any) => {
  const { $client } = useNuxtApp()
  return useQuery({
    queryKey: [
      'journals.getJournals',
      page,
    ],
    queryFn: () => $client.journals.getJournals.query({
      page: page?.value,
    }),
    keepPreviousData: true
  })
  
}

export const useCreateJournal = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.journals.createJournal.mutate,
  })
}

export const useDeleteJournal = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.journals.deleteJournal.mutate,
  })
}

export const useUpdateJournal = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.journals.updateJournal.mutate,
  })
}