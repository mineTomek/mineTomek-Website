import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default function Button(
  props: PropsWithChildren<{
    disabled?: boolean
    className?: string
    clickAction?: (router: AppRouterInstance) => void
    color?: string
    defaultCursor?: boolean
  }>
) {
  const router = useRouter()

  const buttonColors: any = {
    primary: 'bg-primary-100 dark:bg-primary-800',
    zinc: 'bg-zinc-100 dark:bg-zinc-800',
  }

  return (
    <button
      className={
        `w-fit ${props.defaultCursor && 'cursor-default'} rounded-md border p-2 [box-shadow:1px_-4px_3px_0_#00000070_inset] disabled:cursor-default disabled:opacity-50 dark:border-primary-950 ${
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
