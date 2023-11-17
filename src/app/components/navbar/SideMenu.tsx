'use client'

import SideMenuItem from '@/app/types/SideMenuItem'
import { Variants, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

const sidebar: Variants = {
  open: {
    transform: 'translateX(0)',

    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
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
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Project Timeline',
    href: '/timeline',
  },
]

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className='fixed bottom-0 right-0 top-0 z-10 w-80 gap-2'
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <div
        className={`ml-auto flex h-16 flex-col justify-center bg-zinc-100 pl-5 transition-[background-color,width] ${
          isOpen ? 'w-full dark:bg-zinc-900' : 'w-16 dark:bg-zinc-800'
        }`}
        onClick={_e => setIsOpen(prev => !prev)}
      >
        <motion.p variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}>
          Menu
        </motion.p>
      </div>
      <motion.div
        className='z-20 flex flex-col gap-2 rounded-bl-lg bg-zinc-100 p-4 dark:bg-zinc-700'
        variants={sidebar}
      >
        {menuItems.map((item, i) => (
          <motion.div
            key={`menu_item_${i}`}
            variants={menuItem}
          >
            <Link href={item.href} onClick={_e => setIsOpen(false)}>{item.label}</Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
