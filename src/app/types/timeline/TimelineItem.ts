import { ObjectId } from 'mongodb'

export default interface TimelineItem {
  _id: ObjectId
  title: string
  date: Date
  description: string
  imageSrc: string
  dateAccuracy: number
  buttons: TimelineItemButton[]
}

export interface TimelineItemButton {
  label: string
  href: string
}
