'use client'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Selection<T>(props: {
  selectionId: string
  options: SelectionOption<T>[]
  onChange: SelectionChangeCallback<T>
}) {
  const [selectedOption, setSelectedOption] = useState(0)

  return (
    <div className='align-center relative box-border flex gap-4 rounded-lg border p-2 dark:border-zinc-700'>
      {props.options.map((option, i) => (
        <div
          key={`option-${option.value}`}
          className='relative flex aspect-square items-center justify-center rounded-md px-2 cursor-pointer'
          onClick={event => {
            setSelectedOption(i)
            props.onChange(option.value)
          }}
        >
          <FontAwesomeIcon
            icon={option.icon}
            width={16}
            height={16}
            className='z-10'
          />

          {selectedOption == i && (
            <motion.div
              className='absolute h-[125%] w-[125%] rounded-lg bg-primary-500/50'
              layoutId={props.selectionId}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export interface SelectionOption<T> {
  value: T
  icon: IconProp
}

export type SelectionChangeCallback<T> = (newValue: T) => void
