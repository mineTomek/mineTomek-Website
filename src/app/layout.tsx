import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'
import { getContentFont } from './fonts'

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
    <html lang='en' className='dark'>
      <body
        className={`bg-background ${getContentFont().className} text-text-800`}
      >
        <Navbar />
        <div className='pt-16'>{children}</div>
      </body>
    </html>
  )
}
