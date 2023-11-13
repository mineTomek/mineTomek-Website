import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'

export default function Button(props: {
  text: string
  disabled?: boolean
  clickAction?: (router: AppRouterInstance) => void
}) {
  const router = useRouter()

  return (
    <button
      className='w-fit cursor-pointer rounded-md border bg-primary-100 p-2 [box-shadow:1px_-4px_3px_0_#00000070_inset] disabled:cursor-default disabled:opacity-50 dark:border-primary-950 dark:bg-primary-800'
      disabled={props.disabled ?? false}
      onClick={() => {
        if (props.clickAction) {
          props.clickAction(router)
        }
      }}
    >
      {props.text}
    </button>
  )
}
