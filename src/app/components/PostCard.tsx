import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import Category from '../types/Category'
import { motion } from 'framer-motion'

export default function PostCard(props: {
  title: string
  link: string
  subtitle?: string
  imageSrc: string
  category?: Category
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-10%' }}
    >
      <Link
        href={props.link}
        className='flex flex-col justify-between gap-2 rounded-2xl bg-zinc-100 p-3 transition-transform hover:-translate-y-1 dark:bg-zinc-800'
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='flex justify-between text-lg tracking-wide'>
          {props.title}
          <div className='flex gap-4'>
            <span className='my-auto text-sm text-zinc-600 dark:text-zinc-300'>
              {props.category && props.category.name.split(':')[1]}
            </span>
            <FontAwesomeIcon
              icon={faQuoteRight}
              style={{ color: '#ccc' }}
              className='hidden h-auto w-6 sm:block'
            />
          </div>
        </div>
        {props.subtitle && <p>{props.subtitle}</p>}
        <motion.div
          initial={{ translateY: '3rem', opacity: 0 }}
          whileInView={{ translateY: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <Image
            src={props.imageSrc}
            alt='Post image'
            width={1920}
            height={1080}
            className='aspect-video rounded-xl object-cover'
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}
