import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import React, { FC } from 'react'
import Link from 'next/link'

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
        {props.name}{' '}
        <span>
          <FontAwesomeIcon
            icon={faQuoteRight}
            style={{ color: '#ccc' }}
          />
        </span>
      </h2>
      <p>{props.description}</p>
      {/* <Image
                src={props.imageSrc}
                alt="Post image"
                width={400}
                height={300}
            /> */}
      <div className=''>
        <img
          src={props.imageSrc}
          alt='Post image'
        />
      </div>
    </Link>
  )
}

export default PostCard
