'use client'

import React, { useState, useEffect } from 'react'
import Text from './components/Text'
import useSWR from 'swr'
import Post from './types/Post'
import PostCard from './components/PostCard'
import Navbar from './components/Navbar'

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
    <main className='flex flex-col gap-y-4 items-center p-6 min-h-[100vh]'>

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

      {(!data && !isLoading && !error) && <p> Data is not available!</p>}
    </main>
  )
}
