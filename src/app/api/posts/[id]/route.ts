import createError from '@/app/api/helpers/createError'
import Post from '@/app/types/Post'
import { NextRequest } from 'next/server'
import parsePages from '../../helpers/parsing/parsePages'
import initHeaders from '../../helpers/initHeaders'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = JSON.stringify({
      filter: {
        property: 'ID',
        select: {
          equals: params.id,
        },
      },
    })

    const headers = initHeaders()

    const result = await fetch(
      `https://api.notion.com/v1/databases/${
        process.env.NOTION_POSTS_DB ?? ''
      }/query`,
      {
        method: 'POST',
        redirect: 'follow',
        headers,
        body,
      }
    ).then(res => res.json())

    const posts: Post[] = parsePages(result.results)

    return Response.json(posts[0])
  } catch (error) {
    return createError((error as Error).message, 500, error as Error)
  }
}
