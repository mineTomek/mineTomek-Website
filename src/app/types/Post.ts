import Category from "./Category"
import Tag from "./Tag"

export type PostWithContent = Post & { content: string }

export default interface Post {
  id: string
  title: MultiLanguageText
  subtitle: MultiLanguageText
  created_time: Date
  cover_url: string
  category: Category,
  tags: Tag[]
}

export interface MultiLanguageText {
  en: string
  pl: string
}
