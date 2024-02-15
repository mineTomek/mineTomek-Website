import createError from '@/app/api/helpers/createError'
import { NextRequest } from 'next/server'
import initHeaders from '../../helpers/initHeaders'
import parseTimeline from '../../helpers/parsing/parseTimeline'

export async function GET(request: NextRequest) {
  try {
    const headers = initHeaders()

    const result = await fetch(
      `https://api.notion.com/v1/databases/${
        process.env.NOTION_TIMELINE_DB ?? ''
      }/query`,
      {
        method: 'POST',
        redirect: 'follow',
        headers,
      }
    ).then(res => res.json())

    const timeline = await parseTimeline(result.results)

    return Response.json(timeline)
  } catch (error) {
    return createError((error as Error).message, 500, error as Error)
  }
}
