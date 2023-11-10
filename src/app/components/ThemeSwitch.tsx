'use client'

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

export default function ThemeSwitch() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  return (
    <div
      className='fixed bottom-4 left-4 flex h-10 w-20 flex-row justify-between dark:bg-zinc-800 bg-zinc-300 px-2 rounded-lg'
      onClick={() => setDarkMode(prev => !prev)}
    >
      <FontAwesomeIcon
        icon={faSun}
        className={`my-auto aspect-square h-5 rounded-lg bg-zinc-400 p-1 transition-colors dark:bg-zinc-800`}
      />
      <FontAwesomeIcon
        icon={faMoon}
        className={`my-auto aspect-square h-5 rounded-lg bg-zinc-300 p-1 transition-colors dark:bg-zinc-700`}
      />
    </div>
  )
}
