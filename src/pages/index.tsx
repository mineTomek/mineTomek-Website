import React, { useState, useEffect } from 'react'
import styles from '@/styles/Home.module.css'
import PostCard from '../components/PostCard'
import Text from '../components/Text'
import Logo from '../components/Logo'
import Head from 'next/head'
//'next/font/google'

async function getRandomNumber(from: number, to: number): Promise<number> {
  return Math.random() * to + from;
}

export default function Home() {
  const [userLanguage, setUserLanguage] = useState('en-US')
  const [words, setWords] = useState<string[]>([])

  const localWords = [
    'code',
    'programming',
    'project management',
    'programming language',
    'computers',
    'coding algorithms',
    'code syntax',
    'video games',
    'coder',
    'programmer',
    'developer',
    'software engineer',
    'hacker',
    'python coding',
    'computer scientist',
    'agumented reality',
    'coding',
    'software engineering',
    'virtual reality',
    'ChatGPT'
  ]

  useEffect(() => {
    setWords(localWords.sort(() => Math.random() - 0.5))
  }, [])

  useEffect(() => {
    // Load the navigator object only on the client-side
    if (typeof window !== 'undefined') {
      setUserLanguage(window.navigator.language)
    }
  }, []);

  let posts = [];

  for (let i = 0; i < words.length; i++) {
    const keyword = words[i]
    posts.push({
      index: i,
      description: `A long description about ${keyword} that is soo long that it needs few lines to be properly displayed in a textbox. It is so long that it never ends. Or it does... But who knows. No one is ever going to read this anyway. It's all about ${keyword}.`,
      keyword: keyword
    });
  }

  return (
    <>
      <Head>
        <title>mineTomek</title>
        <meta name="description" content="mineTomek's Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" type="image/svg+xml" href={} /> */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content="#6dc53b" />
      </Head>

      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            <Logo width={32} height={32}/>
            mineTomek
          </p>
        </div>

        <h1 className={styles.center}><Text text="newest_posts" lang={userLanguage} /></h1>

        <div className={styles.grid}>
          {posts.map(post => (
            <PostCard 
              key={post.index} 
              name={post.keyword.split(' ').map(word => (word[0].toUpperCase() + word.slice(1))).join(' ')} 
              descriprion={post.description} 
              link={`https://unsplash.com/s/photos/${post.keyword}`} 
              imageSrc={`https://source.unsplash.com/1600x900/?${post.keyword}`} />
            )
          )}
        </div>
      </main>
    </>
  )
}
