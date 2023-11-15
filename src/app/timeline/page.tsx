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
    <div className='p-4'>
      <div className='text-center'>
        <h1 className='text-[5vw]'>Welcome to my project timeline!</h1>
        <p className='text-[2.8vw]'>
          My projects are organized from the oldest to the newest.
          <a href='#footnote'>*</a>
        </p>
      </div>

      {items && <Timeline items={items} />}

      {!items && !isLoadingItems && !itemsError && (
        <p>Couldn{"'"}t retrieve timeline data, but no error occurred!</p>
      )}

      {isLoadingItems && <p>Loading timeline items...</p>}
      {itemsError && (
        <p>Categories loading error: {JSON.stringify(itemsError)}</p>
      )}

      <p
        id='footnote'
        className='mb-8 mt-16'
      >
        * The dates are approximated.
      </p>
    </div>
  )
}
