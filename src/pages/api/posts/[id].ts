import type { NextApiRequest, NextApiResponse } from 'next'
import createError from '@/helpers/error'
import getDb from '@/helpers/db'
import { ObjectId } from 'mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await getDb()

    const collection = db.collection('posts')

    const id = req.query.id as string

    if (!ObjectId.isValid(id)) {
      createError('Invalid ObjectId: ' + id, res, 400)
    }

    const post = await collection.findOne({ _id: new ObjectId(id) })

    res.status(200).json(post)
  } catch (error) {
    createError((error as Error).message, res, 500, error as Error)
  }
}
