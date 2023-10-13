import { ObjectId } from 'mongodb'

export default interface Post {
  _id: ObjectId
  creationDate: Date
  authorId: ObjectId
  title: { en: string; pl: string }
  content: { en: string; pl: string }
  languages: string[]
  views: number
  categoryId: ObjectId
  categoryVariation: number
  tags: string[]
}
