import { useQuery } from '@tanstack/vue-query'


export const useIncomeAndCost = ({ date }: any) => {
  const { $client } = useNuxtApp()
  return useQuery({
    queryKey: [
      'inventories.getInventories',
      date,
    ],
    queryFn: () => $client.financeReports.getIncomeAndCost.query({
      date: date?.value,
    }),
    keepPreviousData: true
  })
  
}
