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
    <main className='flex flex-col gap-y-4 items-center p-6 min-h-[100vh]'>
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
        <div className='flex flex-row gap-x-3'>
          {categories!.map((category, i) => (
            <span key={category._id.toString()} className='bg-slate-100 p-1 px-3 rounded-md'>{category.icon} {category.name}</span>
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
