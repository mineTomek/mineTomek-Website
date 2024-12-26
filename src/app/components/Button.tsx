import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { mergeCss } from '../utils/mergeCss'

type ButtonColor = 'primary' | 'secondary' | 'accent' | 'zinc'

const buttonColors: Record<ButtonColor, string> = {
  primary: 'bg-primary-100 dark:bg-primary-800',
  secondary: 'bg-secondary-100 dark:bg-secondary-800',
  accent: 'bg-accent-100 dark:bg-accent-800',
  zinc: 'bg-zinc-100 dark:bg-zinc-800',
}

export default function Button(
  props: PropsWithChildren<{
    disabled?: boolean
    className?: string
    clickAction?: (router: AppRouterInstance) => void
    color?: ButtonColor
    defaultCursor?: boolean
  }>
) {
  const router = useRouter()

  return (
    <button
      className={mergeCss(
        'w-fit rounded-full p-4 shadow-none transition-all hover:rotate-1 hover:scale-110 hover:shadow-xl hover:brightness-125 disabled:cursor-default disabled:opacity-50',
        props.defaultCursor && 'cursor-default',
        buttonColors[props.color ?? 'primary'],
        props.className
      )}
      disabled={props.disabled ?? false}
      onClick={() => {
        if (props.clickAction) {
          props.clickAction(router)
        }
      }}
    >
      {props.children}
    </button>
  )
}
