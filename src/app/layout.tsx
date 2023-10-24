import type { Metadata } from 'next'
import './globals.css'
import Head from 'next/head'
import Navbar from './components/Navbar'
import { getContentFont } from './fonts'

export const metadata: Metadata = {
  title: 'mineTomek',
  description: "mineTomek's official website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <Head>
        <title>mineTomek</title>
        <meta
          name='description'
          content="mineTomek's Website"
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          rel='icon'
          type='image/svg+xml'
          href='/favicon.svg'
        />
        <link
          rel='icon'
          type='image/png'
          href='/favicon.png'
        />
        <meta
          name='theme-color'
          content='#4E9C76'
        />
      </Head>
      <body className={`bg-background ${getContentFont().className} text-text-800`}>
        <Navbar />
        <div className='pt-16'>{children}</div>
      </body>
    </html>
  )
}
