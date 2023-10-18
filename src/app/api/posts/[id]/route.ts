import createError from '@/app/api/helpers/createError'
import getDb from '@/app/api/helpers/db'
import { ObjectId } from 'mongodb'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb()

    const collection = db.collection('posts')

    const id = params.id

    if (!ObjectId.isValid(id)) {
      return createError('Invalid ObjectId: ' + id, 400)
    }

    const post = await collection.findOne({ _id: new ObjectId(id) })

    return Response.json(post)
  } catch (error) {
    return createError((error as Error).message, 500, error as Error)
  }
}
