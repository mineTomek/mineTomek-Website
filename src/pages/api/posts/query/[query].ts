// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import createError from '@/middleware/error'
import getDb from '@/middleware/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse/*<Data>*/
) {
  try {
    const db = await getDb()

    const collection = db.collection('posts')
    
    let q = {}

    const { query } = req.query;

    if (query) {
      try {
        q = JSON.parse(query as string)
      } catch (error) {
        throw new Error('Invalid query parameter')
      }
    }

    const posts = await collection.find(q).toArray()


    res.status(200).json(posts)

  } catch (error) {
    createError((error as Error).message, res)
  }
}