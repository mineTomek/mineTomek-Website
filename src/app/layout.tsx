import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'mineTomek',
  description: 'mineTomek\'s official website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
        {/* <link rel="icon" type="image/svg+xml" href={} /> */}
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
          content='#6dc53b'
        />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
