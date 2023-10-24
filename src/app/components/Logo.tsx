import Image from 'next/image'

export default function Logo(props: { width: number; height: number }) {
  return (
    <Image
      src={'/favicon.svg'}
      alt='logo'
      width={props.width}
      height={props.height}
    />
  )
}
