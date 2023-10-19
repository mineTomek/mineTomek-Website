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
      className='p-4 bg-gradient-to-b from-slate-50 to-slate-100 block rounded-lg'
      target='_blank'
      rel='noopener noreferrer'
    >
      <h2>
        {props.name}
        <FontAwesomeIcon
          icon={faQuoteRight}
          style={{ color: '#ccc' }}
        />
      </h2>
      <p>{props.description}</p>
      <Image
        src={props.imageSrc}
        alt='Post image'
        width={1000}
        height={750}
      />
    </Link>
  )
}

export default PostCard
