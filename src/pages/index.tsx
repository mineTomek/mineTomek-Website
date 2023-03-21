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
      link: "youtube.com",
      image: ""
    });
  }

  return (
    <>
      <Head>
        <title>mineTomek</title>
        <meta name="description" content="mineTomek's Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
              <PostCard key={post.name} name={post.name} descriprion={post.description} link={post.link} imageSrc="https://source.unsplash.com/random/800x600" />
            )
          })}
        </div>
      </main>
    </>
  )
}
