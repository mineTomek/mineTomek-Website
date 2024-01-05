'use client'

import { getTitleFont } from '@/app/fonts'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home({ params }: { params: { name: string } }) {
  const {
    data: link,
    isLoading: loadingLink,
    error: linkLoadingError,
  } = useSWR<string>(`/api/link?name=${params.name}`, fetcher)

  const router = useRouter()

  if (link) {
    router.push(link)
  }

  return (
    <div className={`flex justify-evenly items-center h-[calc(100dvh-4rem)] text-xl`}>
      {loadingLink && 'Loading your destination...'}
      {linkLoadingError && 'Something went wrong. Error: ' + linkLoadingError}
      {link && 'Redirecting you to the destination...'}
    </div>
  )
}
