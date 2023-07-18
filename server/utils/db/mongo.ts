import { MongoClient, Db, Collection, MongoClientOptions } from 'mongodb'

export class Mongo {
  private static instance: Mongo
  private client: MongoClient | null = null
  private options?: MongoClientOptions
  public db: Db | null = null
  public User: Collection | null = null
  public Patient: Collection | null = null
  public Reservation: Collection | null = null
  public Service: Collection | null = null
  public Inventory: Collection | null = null
  public Transaction: Collection | null = null
  public Account: Collection | null = null
  public Journal: Collection | null = null

  constructor(options?: MongoClientOptions ) {
    if (Mongo.instance) {
      return Mongo.instance
    }

    this.options = options
  }

  async connect(uri: string): Promise<void> {
    this.client = new MongoClient(uri, this.options)
    await this.client.connect()

    this.db = this.client.db()
    this.User = this.db.collection('users')
    this.Patient = this.db.collection('patients')
    this.Reservation = this.db.collection('reservations')
    this.Service = this.db.collection('services')
    this.Inventory = this.db.collection('inventories')
    this.Transaction = this.db.collection('transactions')
    this.Account = this.db.collection('accounts')
    this.Journal = this.db.collection('journals')

    await this.createIndex()
  }

  async createIndex(): Promise<void> {
    this.Patient?.createIndex({ searchKey: 'text' })
  }
}
