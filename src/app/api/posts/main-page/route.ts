import createError from '@/app/api/helpers/createError'
import getDb from '@/app/api/helpers/db'
import { Sort } from 'mongodb'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const db = await getDb()

    const collection = db.collection('posts')

    const projection = {
      title: 1,
      subtitle: 1,
      imageUrl: 1,
    }

    const sort: Sort = { creationDate: 1 }

    let limit = 3

    const limitFromQuery = request.nextUrl.searchParams.get('limit')

    if (limitFromQuery) {
      try {
        limit = Number.parseInt(JSON.parse(limitFromQuery).limit)
      } catch (error) {
        return createError(
          `Invalid limit parameter: '${limitFromQuery}'`,
          400,
          error as Error
        )
      }
    }

    const posts = await collection
      .find({}, { projection, sort, limit })
      .toArray()

    return Response.json(posts)
  } catch (error) {
    return createError((error as Error).message, 500, error as Error)
  }
}
