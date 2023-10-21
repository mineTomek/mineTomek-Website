'use client'

import React, { useState, useEffect } from 'react'
import Text from './components/Text'
import useSWR from 'swr'
import Post from './types/Post'
import PostCard from './components/PostCard'
import Category from './types/Category'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home() {
  const [userLanguage, setUserLanguage] = useState('en-US')

  const {
    data: posts,
    isLoading: isLoadingPosts,
    error: postsError,
  } = useSWR<Post[]>('/api/posts', fetcher)

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useSWR<Category[]>('/api/categories', fetcher)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserLanguage(window.navigator.language)
    }
  }, [])

  return (
    <main className='flex min-h-[100vh] flex-col gap-y-4 p-6'>
      <h2 className='text-center text-2xl'>
        <Text
          text='newest_posts'
          lang={userLanguage}
        />
      </h2>

      {isLoadingCategories && <p>Loading categories...</p>}
      {categoriesError && (
        <p>Categories loading error: {JSON.stringify(categoriesError)}</p>
      )}

      {categories && !isLoadingCategories && !categoriesError && (
        <div className='no-scrollbar flex snap-x scroll-mx-2 overflow-x-auto'>
          {categories!.map(category => (
            <div
              key={category._id.toString()}
              className='m-2 flex snap-start gap-2 rounded-md border bg-slate-100 p-2 px-3 text-center [box-shadow:1px_-4px_3px_0_#00000012_inset]'
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
              <span className='text-slate-400'>
                {Math.floor(Math.random() * 9 + 1)}
              </span>
            </div>
          ))}
        </div>
      )}

      {!categories && !isLoadingCategories && !categoriesError && (
        <p>Posts data is not available!</p>
      )}

      {isLoadingPosts && <p>Loading posts...</p>}
      {postsError && <p>Post loading error: {JSON.stringify(postsError)}</p>}

      {posts && !isLoadingPosts && !postsError && (
        <div className='flex flex-col gap-y-5'>
          {posts!.map((post, i) => (
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

      {!posts && !isLoadingPosts && !postsError && (
        <p>Posts data is not available!</p>
      )}
    </main>
  )
}
