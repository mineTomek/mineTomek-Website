import createError from '@/app/api/helpers/createError'
import { NextRequest } from 'next/server'
import initHeaders from '../../helpers/initHeaders'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = JSON.stringify({
      filter: {
        property: 'Name',
        title: {
          equals: params.slug,
        },
      },
    })

    const headers = initHeaders()

    const result = await fetch(
      `https://api.notion.com/v1/databases/${
        process.env.NOTION_LINKS_DB ?? ''
      }/query`,
      {
        method: 'POST',
        redirect: 'follow',
        headers,
        body,
      }
    ).then(res => res.json())

    const dest: string = result.results[0].properties.Destination.url

    if (!dest) {
      return createError(`There's no link with name '${params.slug}'`, 400)
    }

    return Response.json(dest)
  } catch (error) {
    return createError((error as Error).message, 500, error as Error)
  }
}
