import TimelineItem from '@/app/types/timeline/TimelineItem'
import Item from './Item'

export default function Timeline(props: { items: TimelineItem[] }) {
  return (
    <div>
      {props.items.map((item, i) => (
        <Item
          item={item}
          index={i}
          key={i}
        />
      ))}
    </div>
  )
}
