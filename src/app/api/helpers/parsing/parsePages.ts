import Category from '@/app/types/Category'
import Post, { MultiLanguageText } from '@/app/types/Post'
import Tag from '@/app/types/Tag'

export default function parsePages(pages: any[]) {
  return pages.map((page: any) => {
    const tags: Tag[] =
      page.properties?.Tags?.multi_select?.map((tag: Tag) => ({
        id: tag.id ?? '',
        name: tag.name ?? '',
      })) ?? []

    const title: MultiLanguageText = {
      en:
        (page.properties?.Name?.title[0].plain_text as string) ?? 'Error Title',
      pl: 'Brak Polskiego Tytułu',
    }

    const subtitle: MultiLanguageText = {
      en: (page.properties?.Subtitle?.rich_text[0]?.plain_text as string) ?? '',
      pl: 'Brak Polskiego Podtytułu',
    }

    const post: Post = {
      id: (page.id as string) ?? '',
      title,
      subtitle,
      created_time: new Date((page.created_time as string) ?? ''),
      cover_url: (page.cover?.external?.url as string) ?? '',
      category: (page.properties?.Category?.select as Category) ?? {
        name: '',
        id: '',
      },
      tags,
    }

    return post
  })
}
