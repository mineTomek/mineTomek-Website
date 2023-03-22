import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import Text from '../components/Text'
import PostCard from '../components/PostCard'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [userLanguage, setUserLanguage] = useState('en-US');

  useEffect(() => {
    // Load the navigator object only on the client-side
    if (typeof window !== 'undefined') {
      setUserLanguage(window.navigator.language);
    }
  }, []);

  let posts = [];

  for (let i = 0; i < 10; i++) {
    posts.push({
      name: "A name",
      description: "A long description that is soo long that it needs few lines to be properly displayed in a textbox. It is so long that it never ends. Or it does... But who knows. No one is ever going to read this anyway.",
      link: "https://youtube.com",
      image: "https://source.unsplash.com/1600x900/?coding"
    });
  }

  return (
    <>
      <Head>
        <title>mineTomek</title>
        <meta name="description" content="mineTomek's Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6dc53b" />
        <meta name="msapplication-TileColor" content="#6dc53b" />
        <meta name="theme-color" content="#6dc53b" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            <Image
              src="/logo.svg"
              alt="mineTomek's logo"
              width={30}
              height={30}
            />
            mineTomek
          </p>
        </div>

        <h1 className={styles.center}><Text text="newest_posts" lang={userLanguage} /></h1>

        <div className={styles.grid}>
          {posts.map(post => {
            console.log(post)
            return (
              <PostCard key={post.name} name={post.name} descriprion={post.description} link={post.link} imageSrc={post.image} />
            )
          })}
        </div>
      </main>
    </>
  )
}
