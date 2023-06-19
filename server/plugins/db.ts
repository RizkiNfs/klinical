import { mongo } from '../utils/db'

export default defineNitroPlugin(async () => {

  const runtimeConfig = useRuntimeConfig()

  try {
    await mongo.connect(runtimeConfig.MONGO_URL, runtimeConfig.DB_NAME)
    console.log('DB connection established')
  } catch(e) {
    console.log('failed connecting to DB : ', e)
  }

})