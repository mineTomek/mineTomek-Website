import type { NextApiRequest, NextApiResponse } from 'next'
import createError from '@/middleware/error'
import getDb from '@/middleware/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await getDb()

    const collection = db.collection('posts')

    const posts = await collection.find({}).toArray()

    res.status(200).json(posts)
  } catch (error) {
    createError((error as Error).message, res, 500, error as Error)
  }
}
