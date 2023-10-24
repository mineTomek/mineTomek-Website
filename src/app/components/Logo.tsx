import Image from 'next/image'

export default function Logo(props: { width?: number; height?: number }) {
  return (
    <Image
      src={'/favicon.svg'}
      alt='logo'
      width={props.width ?? 48}
      height={props.height ?? 48}
    />
  )
}
