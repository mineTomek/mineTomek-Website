import { MongoClient, Db } from 'mongodb'

let cachedDb: Db | null = null

export default async function getDb(dbName: string = 'website'): Promise<Db> {
  if (cachedDb) {
    return cachedDb
  }

  if (process.env.MONGODB_URI === undefined) {
    throw new Error('MONGODB_URI environment variable is undefined')
  }

  const client = new MongoClient(process.env.MONGODB_URI!)

  cachedDb = client.db(dbName)

  return cachedDb
}
