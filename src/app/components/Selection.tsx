'use client'

import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
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
    <div className='align-center relative box-border flex gap-4 p-2'>
      {props.options.map((option, i) => (
        <div
          key={`option-${option.value}`}
          className='relative flex aspect-square cursor-pointer items-center justify-center rounded-md px-2'
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
  icon: IconDefinition
}

export type SelectionChangeCallback<T> = (newValue: T) => void
