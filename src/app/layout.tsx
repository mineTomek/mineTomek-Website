import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from './components/Navbar'
import { getContentFont } from './fonts'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'mineTomek',
  description: "mineTomek's official website",
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#4e9c76',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className='no-scrollbar overflow-x-hidden'
    >
      <body
        className={`bg-zinc-100 dark:bg-zinc-900 ${
          getContentFont().className
        } text-text-800 dark:text-text-50`}
      >
        <Navbar />
        <div className='mt-16 bg-white dark:bg-zinc-900'>{children}</div>
        {!process.env.LOADED_ENV && <p>.env isn&apos;t loaded</p>}
        <SpeedInsights />
      </body>
    </html>
  )
}
