'use client'

import { getTitleFont } from '@/app/fonts'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home({ params }: { params: { slug: string } }) {
  const {
    data: link,
    isLoading: loadingLink,
    error: linkLoadingError,
  } = useSWR<string | {message: string}>(`/api/link/${params.slug}`, fetcher)

  const router = useRouter()

  if (link && typeof link == 'string') {
    router.push(link)
  }

  return (
    <div
      className={`flex h-[calc(100dvh-4rem)] items-center justify-evenly text-xl ${getTitleFont().className}`}
    >
      {linkLoadingError &&
        'Something went wrong. Error: ' + linkLoadingError}
      {link && typeof link != 'string' && `Short-link '${params.slug}' doesn't exist.`}
      {loadingLink && 'Loading your destination...'}
      {link &&
        typeof link == 'string' &&
        'Redirecting you to the destination...'}
    </div>
  )
}
