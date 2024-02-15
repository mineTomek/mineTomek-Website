import TimelineItem from '@/app/types/timeline/TimelineItem'
import initHeaders from '../initHeaders'
import RichTextElement from '@/app/types/RichTextElement'
import parseRichText from './parseRichText'

export default async function parseTimeline(pages: any[]) {
  let items: TimelineItem[] = []

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]

    const headers = initHeaders()

    const result = await fetch(
      `https://api.notion.com/v1/blocks/${
        page.id
      }/children`,
      {
        method: 'GET',
        redirect: 'follow',
        headers,
      }
    ).then(res => res.json())

    const description = parseRichText(result.results[0].paragraph.rich_text.map((res: any) => res as RichTextElement))

    const item: TimelineItem = {
      id: (page.id as string) ?? '',
      title:
        (page.properties.Name.title[0].plain_text as string) ?? 'Error Title',
      description,
      buttons: JSON.parse(
        page.properties.Buttons.rich_text[0].plain_text ?? '[]'
      ),
      date: new Date((page.properties.Date.date.start as string) ?? ''),
      imageSrc: (page.cover?.external?.url as string) ?? '',
      dateAccuracy: (page.properties.Accuracy.number as number) ?? -1,
    }

    items.push(item)
  }

  return items
}
