import type { NextApiRequest, NextApiResponse } from 'next'
import createError from '@/helpers/error'
import getDb from '@/helpers/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await getDb()

    const collection = db.collection('posts')

    let query = {}

    // const { q } = req.query

    // if (q) {
    //   try {
    //     query = JSON.parse(q.toString())
    //   } catch (error) {
    //     throw new Error('Invalid query parameter')
    //   }
    // }

    const posts = await collection.find(query).toArray()

    res.status(200).json(posts)
  } catch (error) {
    createError((error as Error).message, res, 500, error as Error)
  }
}
