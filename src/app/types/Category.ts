import { ObjectId } from 'mongodb'

export default interface Category {
  _id: ObjectId
  name: string
  description: string
  variations: string[]
  icon: string
  slug: string
}
