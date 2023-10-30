export default function Button(props: {text: string}) {
  return (
    <button className='w-fit cursor-pointer rounded-md border dark:border-primary-950 bg-primary-100 dark:bg-primary-800 p-2 [box-shadow:1px_-4px_3px_0_#00000070_inset]'>
      {props.text}
    </button>
  )
}
