import createError from '@/app/api/helpers/createError'
import getDb from '@/app/api/helpers/db'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const db = await getDb()

    const collection = db.collection('links')

    const name = request.nextUrl.searchParams.get('name')

    if (!name) {
      return createError('Missing query parameter name', 400)
    }

    const links = await collection
      .find(
        { name },
        {
          projection: {
            destination: 1,
            _id: 0,
          },
        }
      )
      .toArray()

    const link = links[0]

    if (!link) {
      return createError(`There's no link with name '${name}'`, 400)
    }

    return Response.json(link.destination)
  } catch (error) {
    return createError((error as Error).message, 500, error as Error)
  }
}
