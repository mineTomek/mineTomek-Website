'use client'

import React, { useState, useEffect } from 'react'
import Text from './components/Text'
import useSWR from 'swr'
import Post from './types/Post'
import PostCard from './components/PostCard'
import Category from './types/Category'
import { ObjectId } from 'mongodb'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import { getTitleFont } from './fonts'
import Logo from './components/Logo'
import Button from './components/Button'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home() {
  const [userLanguage, setUserLanguage] = useState('en-US')
  const [selectedCategory, setSelectedCategory] = useState<
    ObjectId | undefined
  >(undefined)

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
    <main className='mb-6 flex min-h-[100vh] flex-col gap-y-4'>
      <div
        className={`text-bold min-h-[calc(100vh-4rem)] space-y-4 bg-gradient-to-b from-zinc-100 to-transparent px-6 py-16 dark:from-zinc-800 ${
          getTitleFont().className
        } text-center`}
      >
        <div className='border-pulse mx-auto h-52 w-52 rounded-2xl border-2 bg-gradient-to-br from-white to-primary-100 p-6 shadow dark:from-zinc-700 dark:to-zinc-900'>
          <Logo
            width={200}
            height={200}
            className=''
          />
        </div>
        <h1 className='text-[3rem] text-text-900 dark:text-text-100'>
          mineTomek
        </h1>
        <h3 className='text-md'>The official mineTomek{"'"}s website</h3>
        <p className='pt-8'>
          Here you can find all my work, and the newest updates
        </p>
        <div className='mx-auto flex flex-col items-center gap-4 pt-16'>
          <Button text='Check the blog' />
          <Button text='Go to the project timeline' />
        </div>

        <FontAwesomeIcon
          icon={faAnglesDown}
          className='h-10 w-10 pt-8 motion-safe:animate-pulse'
        />
      </div>

      <h2 className='text-center text-2xl'>
        <Text
          text='newest_posts'
          lang={userLanguage}
        />
      </h2>

      {(isLoadingPosts || isLoadingCategories) && (
        <div className='pt-16'>
          <div className='flex w-screen justify-center gap-4 p-2'>
            <span>Loading...</span>
          </div>
        </div>
      )}

      {!posts && !isLoadingPosts && !postsError && (
        <div className='p-4'>
          <p>Couldn{"'"}t retrieve posts data, but no error occurred!</p>
        </div>
      )}

      {!categories && !isLoadingCategories && !categoriesError && (
        <div className='p-4'>
          <p>Couldn{"'"}t retrieve categories data, but no error occurred!</p>
        </div>
      )}

      {categoriesError && (
        <div className='p-4'>
          <p>Categories loading error: {JSON.stringify(categoriesError)}</p>
        </div>
      )}

      {postsError && (
        <div className='p-4'>
          <p>Post loading error: {JSON.stringify(postsError)}</p>
        </div>
      )}

      {categories && !isLoadingCategories && !categoriesError && (
        <div className='no-scrollbar flex snap-x gap-4 overflow-x-auto'>
          {categories.map(category => (
            <div
              key={category._id.toString()}
              className={`flex cursor-pointer snap-start scroll-mx-6 gap-2 rounded-md border p-2 text-center [box-shadow:1px_-4px_3px_0_#00000012_inset] first:ml-6 last:mr-6 dark:border-zinc-800 ${
                selectedCategory === category._id &&
                'bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800'
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
              {selectedCategory === category._id && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className='my-auto'
                />
              )}
            </div>
          ))}
        </div>
      )}

      {posts && !isLoadingPosts && !postsError && (
        <div className='mx-6 flex flex-col gap-y-5'>
          {posts
            .filter(post => {
              if (selectedCategory) {
                return post.categoryId === selectedCategory
              }
              return true
            })
            .map((post, i) => (
              <PostCard
                key={post._id.toString()}
                name={userLanguage === 'pl_PL' ? post.title.pl : post.title.en}
                description={
                  userLanguage === 'pl_PL' ? post.content.pl : post.content.en
                }
                link={''}
                imageSrc={post.imageUrl}
                category={categories?.find(c => c._id === post.categoryId)}
              />
            ))}
        </div>
      )}
    </main>
  )
}
