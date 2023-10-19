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
      className='p-3 bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl flex flex-col gap-2'
      target='_blank'
      rel='noopener noreferrer'
    >
      <div className='flex justify-between'>
        {props.name}
        <FontAwesomeIcon
          icon={faQuoteRight}
          style={{ color: '#ccc' }}
          className='w-12'
        />
      </div>
      <p>{props.description}</p>
      <Image
        src={props.imageSrc}
        alt='Post image'
        width={1000}
        height={750}
        className='rounded-xl shadow-lg'
      />
    </Link>
  )
}

export default PostCard
