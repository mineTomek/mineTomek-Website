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
import Select from 'react-select'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Blog() {
  const [userLanguage, setUserLanguage] = useState('en-US')

  const [selectedCategory, setSelectedCategory] = useState<
    ObjectId | undefined
  >(undefined)

  const [sorting, setSorting] = useState<string | null>(null)

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

      <div className='mr-6 flex flex-col-reverse justify-between lg:flex-row'>
        <div>
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
        <Select
          options={[
            { value: 'date_asc', label: 'Date Ascending' },
            { value: 'date_desc', label: 'Date Descending' },
            { value: 'title_asc', label: 'Title Ascending' },
            { value: 'title_desc', label: 'Title Descending' },
            { value: 'views_asc', label: 'Views Ascending' },
            { value: 'views_desc', label: 'Views Descending' },
          ]}
          placeholder='Sort by...'
          isClearable
          unstyled
          classNames={{
            container: _state => 'relative box-border ml-6',
            control: _state =>
              'w-80 border dark:border-zinc-700 rounded-md flex align-center justify-between box-border relative',
            valueContainer: _state => 'py-2 px-2',
            indicatorsContainer: _state => 'px-2',
            menu: _state => 'p-4 bg-zinc-700 rounded-md',
            menuList: _state => 'flex flex-col gap-4',
            option: state =>
              `hover:text-primary-400 transition-colors ${
                state.isSelected && 'font-bold'
              }`,
          }}
          onChange={event => setSorting(event == null ? null : event.value)}
        />
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
            .sort((a, b) => {
              const direction =
                sorting === null ? 0 : sorting.split('_')[1] === 'asc' ? 1 : -1
              switch (sorting === null ? '' : sorting.split('_')[0]) {
                case 'date':
                  return (
                    (Number.parseInt(a._id.toString().substring(0, 8), 16) -
                      Number.parseInt(b._id.toString().substring(0, 8), 16)) *
                    direction
                  )
                case 'title':
                  const aTitle = (
                    userLanguage === 'pl_PL' ? a.title.pl : a.title.en
                  ).toLowerCase()
                  const bTitle = (
                    userLanguage === 'pl_PL' ? b.title.pl : b.title.en
                  ).toLowerCase()
                  return (
                    (aTitle < bTitle ? -1 : aTitle > bTitle ? 1 : 0) * direction
                  )
                case 'views':
                  return a.views - b.views * direction
                default:
                  return 0
              }
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
