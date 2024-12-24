'use client'

import { useEffect, useState } from 'react'

export default function Countdown(props: {
  to: Date
  countdownSuffix: string
  finishedMessage: string | JSX.Element
}) {
  const [difference, setDifference] = useState(0)

  useEffect(() => {
    setInterval(() => {
      const newDifference = props.to.getTime() - new Date().getTime()

      setDifference(newDifference)
    }, 100)
  }, [props.to])

  //   var days = Math.floor(difference / (1000 * 60 * 60 * 24))
  var hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = Math.floor((difference % (1000 * 60)) / 1000)

  return (
    <>
      {difference > 0 && (
        <span>
          {hours}h {minutes}m {seconds}s {props.countdownSuffix}
        </span>
      )}
      {difference <= 0 && props.finishedMessage}
    </>
  )
}
