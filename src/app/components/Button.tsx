import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'

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
      className={
        `w-fit ${
          props.defaultCursor && 'cursor-default'
        } rounded-full p-4 disabled:cursor-default disabled:opacity-50 ${
          buttonColors[props.color ?? 'primary']
        } ` + props.className ?? ''
      }
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
