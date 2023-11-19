import { ObjectId } from 'mongodb'

export default interface Post {
  _id: ObjectId
  creationDate: Date
  authorId: ObjectId
  title: MultiLanguageText
  subtitle: MultiLanguageText
  content: MultiLanguageText
  languages: string[]
  imageUrl: string
  views: number
  categoryId: ObjectId
  categoryVariation: number
  tags: string[]
}

export interface MultiLanguageText {
  en: string
  pl: string
}
