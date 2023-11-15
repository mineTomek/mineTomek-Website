import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import Category from '../types/Category'

export default function PostCard(props: {
  name: string
  link: string
  description: string
  imageSrc: string
  category?: Category
}) {
  return (
    <Link
      href={props.link}
      className='flex flex-col justify-between gap-2 rounded-xl border bg-gradient-to-b from-zinc-50 to-zinc-100 p-3 transition-[transform,_box-shadow] [box-shadow:1px_-4px_3px_0_#00000012_inset] hover:-translate-y-1 hover:[box-shadow:1px_-1px_3px_0_#00000012_inset] dark:border-zinc-800 dark:from-zinc-800 dark:to-zinc-800'
      target='_blank'
      rel='noopener noreferrer'
    >
      <div className='flex justify-between text-lg tracking-wide'>
        {props.name}
        <div className='flex gap-4'>
          <span className='my-auto text-sm text-zinc-600 dark:text-zinc-300'>
            {props.category && props.category.name}
          </span>
          <FontAwesomeIcon
            icon={faQuoteRight}
            style={{ color: '#ccc' }}
            className='hidden h-auto w-6 sm:block'
          />
        </div>
      </div>
      <p>
        {props.description.split('.')[0] +
          (props.description.split('.').length > 2 ? '...' : '.')}
      </p>
      <Image
        src={props.imageSrc}
        alt='Post image'
        width={1920}
        height={1080}
        className='aspect-video rounded-xl object-cover shadow-lg'
      />
    </Link>
  )
}
