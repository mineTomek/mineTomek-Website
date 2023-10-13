import React, { useState, useEffect } from 'react'
import styles from '@/styles/Home.module.css'
import PostCard from '../components/PostCard'
import Text from '../components/Text'
import Logo from '../components/Logo'
import Head from 'next/head'
//'next/font/google'

export default function Home() {
  const [userLanguage, setUserLanguage] = useState('en-US')

  const { data, isLoading, error } = useSWR<Post[]>('/api/posts', fetcher)

  useEffect(() => {
    // Load the navigator object only on the client-side
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

        <div className={styles.grid}>
            <PostCard
            />
          ))}
        </div>
      </main>
    </>
  )
}
