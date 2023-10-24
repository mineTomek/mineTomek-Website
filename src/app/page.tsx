'use client'

import React, { useState, useEffect } from 'react'
import Text from './components/Text'
import useSWR from 'swr'
import Post from './types/Post'
import PostCard from './components/PostCard'
import Category from './types/Category'
import { ObjectId } from 'mongodb'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { getTitleFont } from './fonts'
import Logo from './components/Logo'

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
    <main className='flex min-h-[100vh] flex-col gap-y-4'>
      <div
        className={`text-bold min-h-[calc(100vh-4rem)] space-y-4 bg-gradient-to-b from-slate-100 to-transparent px-6 py-16 ${
          getTitleFont().className
        } text-center`}
      >
        <Logo width={200} height={200} className='mx-auto border-2 p-6 rounded-2xl shadow bg-gradient-to-br from-white to-primary-100'/>
        <h1 className='text-text-900 text-[3rem]'>mineTomek</h1>
        <h3 className='text-md'>The official mineTomek{"'"}s website</h3>
        <p className='pt-8'>
          Here you can find all my work, and the newest updates
        </p>
        <div className='mx-auto flex flex-col gap-4 items-center pt-16'>
          <button className='bg-primary-100 cursor-pointer rounded-md border p-2 [box-shadow:1px_-4px_3px_0_#00000012_inset] w-fit'>
            Check the blog
          </button>
          <button className='bg-primary-100 cursor-pointer rounded-md border p-2 [box-shadow:1px_-4px_3px_0_#00000012_inset] w-fit'>
            Go to the project timeline
          </button>
        </div>
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
              className={`flex cursor-pointer snap-start scroll-mx-6 gap-2 rounded-md border p-2 text-center [box-shadow:1px_-4px_3px_0_#00000012_inset] first:ml-6 last:mr-6 ${
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
