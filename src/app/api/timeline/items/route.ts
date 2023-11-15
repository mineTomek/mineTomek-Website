import createError from '@/app/api/helpers/createError'
import getDb from '@/app/api/helpers/db'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const db = await getDb()

    const collection = db.collection('timeline')

    let query = {}

    const q = request.nextUrl.searchParams.get('q')

    if (q) {
      try {
        query = JSON.parse(q.toString())
      } catch (error) {
        return createError(
          `Invalid query parameter: '${q}'`,
          400,
          error as Error
        )
      }
    }

    const items = await collection.find(query).sort({ date: 1 }).toArray()

    return Response.json(items)
  } catch (error) {
    return createError((error as Error).message, 500, error as Error)
  }
}
