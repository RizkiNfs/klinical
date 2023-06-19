import { MongoClient, Db, Collection, MongoClientOptions } from 'mongodb'

export class Mongo {
  private static instance: Mongo
  private client: MongoClient | null = null
  private options?: MongoClientOptions
  public db: Db | null = null
  public User: Collection | null = null
  public Patient: Collection | null = null

  constructor(options?: MongoClientOptions ) {
    if (Mongo.instance) {
      return Mongo.instance
    }

    this.options = options
  }

  async connect(url: string, dbName: string): Promise<void> {
    this.client = new MongoClient(`mongodb://${url}/${dbName}`, this.options)
    await this.client.connect()

    this.db = this.client.db()
    this.User = this.db.collection('users')
    this.Patient = this.db.collection('patients')

    await this.createIndex()
  }

  async createIndex(): Promise<void> {
    this.Patient?.createIndex({ searchKey: 'text' })
  }
}
