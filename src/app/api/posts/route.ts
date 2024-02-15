import createError from '@/app/api/helpers/createError'
import { NextRequest } from 'next/server'
import initHeaders from '../helpers/initHeaders'
import Post from '@/app/types/Post'
import parsePages from '../helpers/parsing/parsePages'

export async function GET(request: NextRequest) {
  try {
    const headers = initHeaders()

    const result = await fetch(
      `https://api.notion.com/v1/databases/${
        process.env.NOTION_POSTS_DB ?? ''
      }/query`,
      {
        method: 'POST',
        redirect: 'follow',
        headers,
      }
    ).then(res => res.json())

    const posts: Post[] = parsePages(result.results)

    return Response.json(posts)
  } catch (error) {
    return createError((error as Error).message, 500, error as Error)
  }
}
