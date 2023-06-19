import { useMutation } from '@tanstack/vue-query'

export const useLogin = () => {
  const { $client } = useNuxtApp()
  return useMutation({
    mutationFn: $client.auth.login.mutate,
  })
}
