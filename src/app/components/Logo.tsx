import Image from 'next/image'
import { mergeCss } from '../utils/mergeCss'

export default function Logo(props: {
  width?: number
  height?: number
  className?: string
}) {
  return (
    <Image
      src={'/favicon.svg'}
      alt='logo'
      width={props.width ?? 48}
      height={props.height ?? 48}
      className={mergeCss(props.className, 'dark:invert')}
    />
  )
}
