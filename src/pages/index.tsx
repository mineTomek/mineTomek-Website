import React, { useState, useEffect } from 'react'
import styles from '@/styles/Home.module.css'
import Text from '../components/Text'
import Logo from '../components/Logo'
import Head from 'next/head'
import useSWR from 'swr'
import Post from '@/types/Post'
import PostCard from '@/components/PostCard'

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
    <>
      <Head>
        <title>mineTomek</title>
        <meta
          name='description'
          content="mineTomek's Website"
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        {/* <link rel="icon" type="image/svg+xml" href={} /> */}
        <link
          rel='icon'
          type='image/svg+xml'
          href='/favicon.svg'
        />
        <link
          rel='icon'
          type='image/png'
          href='/favicon.png'
        />
        <meta
          name='theme-color'
          content='#6dc53b'
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            <Logo
              width={32}
              height={32}
            />
            mineTomek
          </p>
        </div>

        <h1 className={styles.center}>
          <Text
            text='newest_posts'
            lang={userLanguage}
          />
        </h1>

        {isLoading && <p>Loading...</p>}

        {error && <p>Error: {JSON.stringify(error)}</p>}

        {(data && !isLoading && !error) && (
          <div className={styles.grid}>
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

        {!data && <p> Data is not available!</p>}
      </main>
    </>
  )
}
