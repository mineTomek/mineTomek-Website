'use client'

import { ObjectId } from 'mongodb'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import Post from '../types/Post'
import Category from '../types/Category'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Text from '../components/Text'
import PostCard from '../components/PostCard'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Blog() {
  const [userLanguage, setUserLanguage] = useState('en-US')

  const [selectedCategory, setSelectedCategory] = useState<
    ObjectId | undefined
  >(undefined)

  const {
    data: posts,
    isLoading: isLoadingPosts,
    error: postsError,
  } = useSWR<Post[]>('/api/posts/', fetcher)

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
    <main className='mb-6 flex min-h-[100vh] flex-col gap-4 pt-4'>
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

      <div className='flex justify-between mr-6'>
        {categories && !isLoadingCategories && !categoriesError && (
          <div className='no-scrollbar flex snap-x gap-4 overflow-x-auto py-1'>
            {categories.map(category => (
              <div
                key={category._id.toString()}
                className={`flex cursor-pointer snap-start scroll-mx-6 gap-2 rounded-md border p-2 text-center transition-transform [box-shadow:1px_-4px_3px_0_#00000012_inset] first:ml-6 last:mr-6 hover:-translate-y-1 dark:border-zinc-800 ${
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
      </div>
      {posts && !isLoadingPosts && !postsError && (
        <div className='mx-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3'>
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
                subtitle={
                  userLanguage === 'pl_PL' ? post.subtitle.pl : post.subtitle.en
                }
                link={'/'}
                imageSrc={post.imageUrl}
                category={categories?.find(c => c._id === post.categoryId)}
              />
            ))}
        </div>
      )}
    </main>
  )
}
