"use client"

import React, { useState, useEffect } from 'react'
import Text from './components/Text'
import Logo from './components/Logo'
import Head from 'next/head'
import useSWR from 'swr'
import Post from './types/Post'
import PostCard from './components/PostCard'
import { Kdam_Thmor_Pro } from 'next/font/google'

const kdamThmorPro = Kdam_Thmor_Pro({ subsets: ['latin'], weight: '400' })

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home() {
  const [userLanguage, setUserLanguage] = useState('en-US')

  const { data, isLoading, error } = useSWR<Post[]>('/api/posts', fetcher)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserLanguage(window.navigator.language)
    }
  }, [])

  return (
    <>
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

      <main className='flex flex-col gap-y-4 items-center p-6 min-h-[100vh]'>
        <div className='flex flex-row justify-between items-center px-4 pt-4 gap-2'>
          <Logo
            width={32}
            height={32}
          />
          <h1 className={`text-xl ${kdamThmorPro.className}`}>mineTomek</h1>
        </div>

        <h2 className='text-center text-2xl'>
          <Text
            text='newest_posts'
            lang={userLanguage}
          />
        </h2>

        {isLoading && <p>Loading...</p>}

        {error && <p>Error: {JSON.stringify(error)}</p>}

        {data && !isLoading && !error && (
          <div className='flex flex-col gap-y-5'>
            {data!.map((post, i) => (
              <PostCard
                key={post._id.toString()}
                name={userLanguage === 'pl_PL' ? post.title.pl : post.title.en}
                description={
                  userLanguage === 'pl_PL' ? post.content.pl : post.content.en
                }
                link={''}
                imageSrc={post.imageUrl}
              />
            ))}
          </div>
        )}

        {!data && <p> Data is not available!</p>}
      </main>
    </>
  )
}
