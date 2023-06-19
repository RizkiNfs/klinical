export const createPaginationOpts = (page = 1, limit = 10) => {
  if(page < 1) page = 1
  return ({
    limit,
    skip: limit * ((page || 1) - 1)
  })
}