'use client'

import useSWR from 'swr'
import Timeline from '../components/timeline/Timeline'
import TimelineItem from '../types/timeline/TimelineItem'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function TimelinePage() {
  const {
    data: items,
    isLoading: isLoadingItems,
    error: itemsError,
  } = useSWR<TimelineItem[]>('/api/timeline/items', fetcher)

  return (
    <main className='mb-6 flex min-h-[100vh] flex-col gap-4 pt-4'>
      <h2 className='text-center text-2xl'>Project Timeline</h2>

      {!items && !isLoadingItems && !itemsError && (
        <div className='p-4'>
          <p>Couldn{"'"}t retrieve items data, but no error occurred!</p>
        </div>
      )}

      {itemsError && (
        <div className='p-4'>
          <p>Item loading error: {JSON.stringify(itemsError)}</p>
        </div>
      )}

      {items && !isLoadingItems && !itemsError && <Timeline items={items} />}

      {isLoadingItems && (
        <div className='pt-16'>
          <div className='flex w-screen justify-center gap-4 p-2'>
            <span>Loading timeline items...</span>
          </div>
        </div>
      )}
    </main>
  )
}
