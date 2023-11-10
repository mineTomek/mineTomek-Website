import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'
import { getContentFont } from './fonts'
import ThemeSwitch from './components/ThemeSwitch'

export const metadata: Metadata = {
  title: 'mineTomek',
  description: "mineTomek's official website",
  themeColor: '#4e9c76',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className='dark overflow-x-hidden'
    >
      <body
        className={`bg-zinc-100 dark:bg-zinc-900 ${
          getContentFont().className
        } text-text-800 dark:text-text-50`}
      >
        <Navbar />
        <div className='mt-16 bg-white dark:bg-zinc-900'>{children}</div>
        <ThemeSwitch />
      </body>
    </html>
  )
}
