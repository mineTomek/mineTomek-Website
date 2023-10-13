import { MongoClient, Db } from 'mongodb'

let cachedDb: Db | null = null

export default async function getDb(dbName: string = 'website'): Promise<Db> {
  if (cachedDb) {
    return cachedDb
  }

  const client = new MongoClient(process.env.MONGODB_URI!)

  cachedDb = client.db(dbName)

  return cachedDb
}
