'use client'
import {
  faMoon,
  faStar as faStarFull,
  faSun,
} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

export default function ThemeSwitch() {
  const [darkMode, setDarkMode] = useState(false)

  const [autoTheme, setAutoTheme] = useState(true)

  const updateTheme = () => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    setAutoTheme(false)
  }, [darkMode])

  useEffect(() => {
    if (autoTheme) {
      localStorage.removeItem('theme')
    }
  }, [autoTheme])

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', _ => {
        updateTheme()
      })
  }, [])

  useEffect(updateTheme, [darkMode, autoTheme])

  return (
    <div className='fixed bottom-4 left-4 flex h-10 w-32 flex-row justify-between rounded-lg bg-zinc-300 px-2 dark:bg-zinc-800'>
      <FontAwesomeIcon
        icon={faSun}
        className='my-auto aspect-square h-5 rounded-lg bg-zinc-400 p-1 transition-colors dark:bg-zinc-800'
        onClick={() => setDarkMode(false)}
      />
      <FontAwesomeIcon
        icon={faMoon}
        className='my-auto aspect-square h-5 rounded-lg bg-zinc-300 p-1 transition-colors dark:bg-zinc-700'
        onClick={() => setDarkMode(true)}
      />
      <FontAwesomeIcon
        icon={autoTheme ? faStarFull : faStarRegular}
        className='my-auto aspect-square h-5 rounded-lg bg-zinc-300 p-1 transition-colors dark:bg-zinc-800'
        onClick={() => setAutoTheme(prev => !prev)}
      />
    </div>
  )
}
