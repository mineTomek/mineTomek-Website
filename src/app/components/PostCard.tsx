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
      className='flex flex-col gap-2 rounded-xl border bg-gradient-to-b from-slate-50 to-slate-100 p-3 [box-shadow:1px_-4px_3px_0_#00000012_inset]'
      target='_blank'
      rel='noopener noreferrer'
    >
      <div className='flex justify-between text-lg tracking-wide'>
        {props.name}
        <FontAwesomeIcon
          icon={faQuoteRight}
          style={{ color: '#ccc' }}
          className='h-auto w-6'
        />
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

export default PostCard
