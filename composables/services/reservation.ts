import { useQuery, useMutation } from '@tanstack/vue-query'

interface useReservationsParams {
  startDate?: Ref<string|Date>
  endDate?: Ref<string|Date>
}

export const useReservations = ({ startDate, endDate }: useReservationsParams ) => {
  const { $client } = useNuxtApp()
  return useQuery({
    queryKey: [
      'reservations',
      startDate, 
      endDate,
    ],
    queryFn: () => $client.reservations.getReservations.query({
      startDate: startDate?.value,
      endDate: endDate?.value
    })
  })
  
}

export const useCreateReservation = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.reservations.createReservation.mutate,
  })
}

export const useDeleteReservation = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.reservations.deleteReservation.mutate,
  })
}

export const useUpdateReservation = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.reservations.updateReservation.mutate,
  })
}