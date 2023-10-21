'use client'

import React, { useState, useEffect } from 'react'
import Text from './components/Text'
import useSWR from 'swr'
import Post from './types/Post'
import PostCard from './components/PostCard'
import Category from './types/Category'
import { ObjectId } from 'mongodb'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home() {
  const [userLanguage, setUserLanguage] = useState('en-US')
  const [selectedCategory, setSelectedCategory] = useState<
    ObjectId | undefined
  >(undefined)

  let postsUrl = '/api/posts'
  if (selectedCategory) {
    postsUrl += `/category/${selectedCategory.toString()}`
  }
  const {
    data: posts,
    isLoading: isLoadingPosts,
    error: postsError,
  } = useSWR<Post[]>(postsUrl, fetcher)

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
              className={`m-2 flex cursor-pointer snap-start gap-2 rounded-md border p-2 px-3 text-center [box-shadow:1px_-4px_3px_0_#00000012_inset] ${
                selectedCategory === category._id && 'bg-slate-100'
              }`}
              onClick={() => {
                if (selectedCategory === category._id) {
                  setSelectedCategory(undefined)
                } else {
                  setSelectedCategory(category._id)
                }
              }}
            >
              <span>{category.icon}</span>
              <span className='tracking-wider'>{category.name}</span>
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
