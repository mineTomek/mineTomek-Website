import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  name: string
  link: string
  description: string
  imageSrc: string
}

const PostCard: FC<Props> = props => {
  return (
    <Link
      href={props.link}
      className='p-3 bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl flex flex-col gap-2 border [box-shadow:1px_-4px_3px_0_#00000012_inset]'
      target='_blank'
      rel='noopener noreferrer'
    >
      <div className='flex justify-between text-lg tracking-wide'>
        {props.name}
        <FontAwesomeIcon
          icon={faQuoteRight}
          style={{ color: '#ccc' }}
          className='w-6 h-auto'
        />
      </div>
      <p>{props.description.split('.')[0] + (props.description.split('.').length > 2 ? '...' : '.')}</p>
      <Image
        src={props.imageSrc}
        alt='Post image'
        width={1920}
        height={1080}
        className='rounded-xl shadow-lg aspect-video object-cover'
      />
    </Link>
  )
}

export default PostCard
