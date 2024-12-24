import createError from '@/app/api/helpers/createError'
import { NextRequest } from 'next/server'
import initHeaders from '../helpers/initHeaders'
import Post from '@/app/types/Post'
import parsePages from '../helpers/parsing/parsePages'

export async function GET(request: NextRequest) {
  try {
    const headers = initHeaders()

    const response = await fetch(
      `https://api.notion.com/v1/databases/${
        process.env.NOTION_POSTS_DB ?? ''
      }/query`,
      {
        method: 'POST',
        redirect: 'follow',
        headers,
      }
    )

    if (response.status === 404) {
      return createError('Post database not found', 404)
    }

    const result = await response.json()

    const posts: Post[] = parsePages(result.results)

    return Response.json(posts)
  } catch (error) {
    return createError((error as Error).message, 500, error as Error)
  }
}
