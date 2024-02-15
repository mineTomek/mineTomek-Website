import createError from '@/app/api/helpers/createError'
import { NextRequest } from 'next/server'
import initHeaders from '../helpers/initHeaders'
import Category from '@/app/types/Category'
import parseCategories from '../helpers/parsing/parseCategories'

export async function GET(request: NextRequest) {
  try {
    const headers = initHeaders()

    const result = await fetch(
      `https://api.notion.com/v1/databases/${
        process.env.NOTION_POSTS_DB ?? ''
      }`,
      {
        method: 'GET',
        redirect: 'follow',
        headers,
      }
    ).then(res => res.json())

    const categories: Category[] = parseCategories(result.properties.Category)

    return Response.json(categories)
  } catch (error) {
    return createError((error as Error).message, 500, error as Error)
  }
}
