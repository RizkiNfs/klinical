export const waitFor = (time: number = 1000) => new Promise<void>((resolve) => {
  setTimeout(() => {
    resolve()
  }, time)
})

export const dummyFetch = async <T>(dummyData: T): Promise<T> => {
  await waitFor()
  return dummyData
}