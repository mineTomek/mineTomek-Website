export default interface TimelineItem {
  id: string
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
