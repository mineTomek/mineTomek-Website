export default function Button(props: { text: string; disabled?: boolean }) {
  return (
    <button
      className='w-fit cursor-pointer rounded-md border bg-primary-100 p-2 [box-shadow:1px_-4px_3px_0_#00000070_inset] disabled:cursor-default disabled:opacity-50 dark:border-primary-950 dark:bg-primary-800'
      disabled={props.disabled ?? false}
    >
      {props.text}
    </button>
  )
}
