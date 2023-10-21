import createError from '@/app/api/helpers/createError'
import getDb from '@/app/api/helpers/db'
import { ObjectId } from 'mongodb'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb()

    const collection = db.collection('posts')

    const posts = await collection
      .find({ 'categoryId': new ObjectId(params.id) })
      .toArray()

    return Response.json(posts)
  } catch (error) {
    return createError((error as Error).message, 500, error as Error)
  }
}
