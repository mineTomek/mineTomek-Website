import TimelineItem from '@/app/types/timeline/TimelineItem'
import Image from 'next/image'
import Button from '../Button'
import Markdown from 'react-markdown'
import { motion } from 'framer-motion'

export default function Item(props: { item: TimelineItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      className='flex flex-col gap-4 p-8 before:ml-1 md:relative md:w-1/2 md:before:absolute md:before:bottom-0 md:before:top-0 md:before:w-2 md:before:bg-zinc-400 md:before:first:[border-radius:0.375rem_0.375rem_0_0] md:before:last:[border-radius:0_0_0.375rem_0.375rem] md:odd:before:left-full md:even:left-1/2 md:even:before:-left-0'
    >
      <div className='flex justify-between text-xl'>
        <p className='bold'>{props.item.title}</p>
        <p className='text-zinc-500'>
          {props.item.date
            .toString()
            .split(/[-T]/g)
            .slice(0, props.item.dateAccuracy)
            .join('/')}
        </p>
      </div>

      <p>
        <Markdown className='timeline-item-description'>
          {props.item.description}
        </Markdown>
      </p>

      <div className='flex flex-col justify-evenly gap-4 md:flex-row'>
        {props.item.buttons.map((button, iButton) => {
          return (
            <Button
              key={`timeline_item_${props.index}_button_${iButton}`}
              text={button.label}
              clickAction={router => router.push(button.href)}
              className='w-full md:w-auto'
            />
          )
        })}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
      >
        <Image
          src={props.item.imageSrc}
          alt={`${props.item.title} image`}
          width={1920}
          height={1080}
          className='aspect-video w-full rounded-lg object-cover'
        />
      </motion.div>
    </motion.div>
  )
}
