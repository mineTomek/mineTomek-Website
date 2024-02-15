'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import Category from '../types/Category'
import {
  faArrowDown,
  faArrowUp,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'
import PostCard from '../components/PostCard'
import Selection from '../components/Selection'
import { faCalendar, faEdit } from '@fortawesome/free-regular-svg-icons'
import Post from '../types/Post'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Blog() {
  const [userLanguage, setUserLanguage] = useState('en-US')

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  )

  const [sorting, setSorting] = useState<string | null>(null)
  const [sortingDirection, setSortingDirection] = useState<number>(1)

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
    <main className='mb-6 flex min-h-[100vh] flex-col gap-4 pt-4'>
      <h2 className='text-center text-2xl'>Blog</h2>

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

      <div className='mr-6 flex flex-col-reverse justify-between gap-3 lg:flex-row'>
        <div>
          {categories && !isLoadingCategories && !categoriesError && (
            <div className='no-scrollbar flex snap-x gap-4 overflow-x-auto py-1'>
              {categories.map(category => (
                <div
                  key={category.id}
                  className={`flex cursor-pointer snap-start scroll-mx-6 gap-2 rounded-md border p-2 text-center transition-transform [box-shadow:1px_-4px_3px_0_#00000012_inset] first:ml-6 last:mr-6 hover:-translate-y-1 dark:border-zinc-800 ${
                    selectedCategory === category.id &&
                    'bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800'
                  }`}
                  onClick={() => {
                    if (selectedCategory === category.id) {
                      setSelectedCategory(undefined)
                    } else {
                      setSelectedCategory(category.id)
                    }
                  }}
                >
                  <span>{category.name.split(':')[0]}</span>
                  <span className='tracking-wider'>
                    {category.name.split(':')[1]}
                  </span>
                  {selectedCategory === category.id && (
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
        <div className='ml-6 flex justify-evenly gap-4'>
          <Selection
            selectionId='sorting-category'
            options={[
              { value: 'date', icon: faCalendar as IconDefinition },
              { value: 'title', icon: faEdit as IconDefinition },
              // { value: 'views', icon: faEye as IconDefinition },
            ]}
            onChange={newValue => setSorting(newValue)}
          />
          <Selection
            selectionId='sorting-direction'
            options={[
              { value: 1, icon: faArrowDown },
              { value: -1, icon: faArrowUp },
            ]}
            onChange={newDirection => setSortingDirection(newDirection)}
          />
        </div>
      </div>

      {posts && !isLoadingPosts && !postsError && (
        <div className='mx-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3'>
          {posts
            .filter(post => {
              if (selectedCategory) {
                return post.category.id === selectedCategory
              }
              return true
            })
            .sort((a, b) => {
              const direction = sortingDirection

              switch (sorting) {
                default:
                case 'date':
                  return (
                    new Date(a.created_time).getTime() -
                    new Date(b.created_time).getTime() * direction
                  )
                case 'title':
                  const aTitle = a.title.toLowerCase()
                  const bTitle = b.title.toLowerCase()
                  return (
                    (aTitle < bTitle ? -1 : aTitle > bTitle ? 1 : 0) * direction
                  )
                // case 'views':
                //   return a.views - b.views * direction
              }
            })
            .map(post => (
              <PostCard
                key={post.id.toString()}
                title={post.title}
                subtitle={post.subtitle}
                link={'/'}
                imageSrc={post.cover_url}
                category={categories?.find(c => c.id === post.category.id)}
              />
            ))}
        </div>
      )}

      {(isLoadingPosts || isLoadingCategories) && (
        <div className='pt-16'>
          <div className='flex w-screen justify-center gap-4 p-2'>
            <span>Loading...</span>
          </div>
        </div>
      )}
    </main>
  )
}
