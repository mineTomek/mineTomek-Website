'use client'

import React, { useState, useEffect } from 'react'
import Text from './components/Text'
import useSWR from 'swr'
import Post from './types/Post'
import PostCard from './components/PostCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons'
import { getTitleFont } from './fonts'
import Logo from './components/Logo'
import Button from './components/Button'
import { motion } from 'framer-motion'
import Countdown from './components/Countdown'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home() {
  const [userLanguage, setUserLanguage] = useState('en-US')

  const {
    data: posts,
    isLoading: isLoadingPosts,
    error: postsError,
  } = useSWR<Post[]>('/api/posts/main-page', fetcher)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserLanguage(window.navigator.language)
    }
  }, [])

  const showNewYearCountdown = () => {
    const now = new Date()

    const checkForBeginningOfYear = () => {
      const beginningDate = new Date(now.getFullYear() - 1, 11, 30)
      const endDate = new Date(now.getFullYear(), 0, 8)

      return beginningDate < now && now < endDate
    }

    const checkForEndOfYear = () => {
      const beginningDate = new Date(now.getFullYear(), 11, 30)
      const endDate = new Date(now.getFullYear() + 1, 0, 8)

      return beginningDate < now && now < endDate
    }

    return checkForBeginningOfYear() || checkForEndOfYear()
  }

  return (
    <main className='mb-6 flex min-h-[100vh] flex-col gap-4'>
      <div
        className={`text-bold grid min-h-[calc(100vh-4rem-1rem)] items-center bg-gradient-to-b from-zinc-100 to-transparent px-6 pb-16 dark:from-zinc-800 md:grid-cols-2 ${
          getTitleFont().className
        } text-center`}
      >
        <div className='border-pulse col-span-1 col-start-1 mx-auto mt-4 h-52 w-52 rounded-2xl border-2 bg-gradient-to-br from-white to-primary-100 p-6 shadow dark:from-zinc-700 dark:to-zinc-900 md:col-span-2'>
          <Logo
            width={200}
            height={200}
            className=''
          />
        </div>
        <h1 className='col-start-1 text-[3rem] text-text-900 dark:text-text-100 md:col-span-2'>
          mineTomek
        </h1>
        <div className='col-span-1 col-start-1'>
          <h3 className='text-md'>The official mineTomek{"'"}s website</h3>
          <p className='pt-8'>
            Here you can find all my work, and the newest updates
          </p>
        </div>
        <div className='flex-col mx-auto mt-4 flex items-center gap-4 md:col-start-2'>
          <Button clickAction={router => router.push('/blog')}>
            Check the blog
          </Button>
          <Button clickAction={router => router.push('/timeline')}>
            Go to the project timeline
          </Button>
          {showNewYearCountdown() && (
            <Button
              color='zinc'
              defaultCursor
            >
              <Countdown
                to={new Date(`Jan 1, 2024 0:0:0`)}
                countdownSuffix={`until ${new Date().getFullYear() + 1}`}
                finishedMessage={
                  <Text
                    text='happy_new_year'
                    lang={userLanguage}
                    replacement={new Date().getFullYear().toString()}
                  />
                }
              />
            </Button>
          )}
        </div>

        <motion.div
          className='md:col-span-2'
          initial={{ translateY: '3rem', opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
        >
          <FontAwesomeIcon
            icon={faAnglesDown}
            className='h-10 w-10 pt-8 motion-safe:animate-pulse'
          />
        </motion.div>
      </div>

      <h2 className='text-center text-2xl'>
        <Text
          text='newest_posts'
          lang={userLanguage}
        />
      </h2>

      {isLoadingPosts && (
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

      {postsError && (
        <div className='p-4'>
          <p>Post loading error: {JSON.stringify(postsError)}</p>
        </div>
      )}

      {posts && !isLoadingPosts && !postsError && (
        <>
          <div className='mx-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3'>
            {posts.map(post => (
              <PostCard
                key={post._id.toString()}
                name={userLanguage === 'pl_PL' ? post.title.pl : post.title.en}
                subtitle={
                  userLanguage === 'pl_PL' ? post.subtitle.pl : post.subtitle.en
                }
                link={'/'}
                imageSrc={post.imageUrl}
              />
            ))}
          </div>

          <Button
            clickAction={router => router.push('/blog')}
            className='mx-auto'
          >
            See More Posts
          </Button>
        </>
      )}
    </main>
  )
}
