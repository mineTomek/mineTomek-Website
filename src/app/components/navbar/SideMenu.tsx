'use client'

import SideMenuItem from '@/app/types/SideMenuItem'
import { mergeCss } from '@/app/utils/mergeCss'
import {
  faArrowUpRightFromSquare,
  faHouse,
  faPager,
  faTimeline,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Variants, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const sidebar: Variants = {
  open: {
    transform: 'translateX(0)',

    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
  closed: {
    transform: 'translateX(100%)',

    transition: {},
  },
}

const menuItem: Variants = {
  open: {
    transform: 'translateY(0) scale(1)',
    opacity: 1,
  },
  closed: {
    transform: 'translateY(1rem) scale(.7)',
    opacity: 0,
  },
}

const menuItems: SideMenuItem[] = [
  {
    label: 'Main Page',
    href: '/',
    icon: faHouse,
    subItems: [],
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: faPager,
    subItems: [],
  },
  {
    label: 'Project Timeline',
    href: '/timeline',
    icon: faTimeline,
    subItems: [],
  },
]

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const currentPath = usePathname()

  return (
    <motion.div
      className='fixed right-0 top-0 z-10 w-80 gap-2'
      initial={false}
      variants={{ open: { height: '100%' }, closed: { height: '0%' } }}
      animate={isOpen ? 'open' : 'closed'}
    >
      <div
        className={mergeCss(
          'ml-auto flex h-16 cursor-pointer flex-col justify-center transition-[background-color,width]',
          isOpen ? 'bg-zinc-200 pl-4 dark:bg-zinc-900' : 'w-16 pl-16'
        )}
        onClick={_e => setIsOpen(prev => !prev)}
      >
        <motion.p variants={{ open: { opacity: 1 }, closed: { opacity: 0.3 } }}>
          Menu
        </motion.p>
      </div>
      <motion.div
        className='z-20 flex flex-col gap-2 rounded-bl-2xl bg-zinc-50 p-4 dark:bg-zinc-700'
        variants={sidebar}
      >
        {menuItems.map((item, i) => (
          <motion.div
            key={`menu_item_${i}`}
            variants={menuItem}
          >
            <Link
              href={item.href}
              onClick={_e => setIsOpen(false)}
              className={mergeCss(
                'flex justify-between',
                currentPath === item.href && 'bold text-primary-400'
              )}
            >
              {item.label}
              <FontAwesomeIcon
                icon={item.icon}
                className={mergeCss(
                  'h-5 w-5',
                  currentPath === item.href
                    ? 'text-primary-400'
                    : 'text-black dark:text-white'
                )}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
