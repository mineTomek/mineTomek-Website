import Category from "./Category"
import Tag from "./Tag"

export type PostWithContent = Post & { content: string }

export default interface Post {
  id: string
  title: string
  subtitle: string
  created_time: Date
  cover_url: string
  category: Category,
  tags: Tag[]
}
