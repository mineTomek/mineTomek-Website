import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getTitleFont } from '../fonts'
import Logo from './Logo'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 flex h-16 flex-row items-center justify-between gap-2 bg-zinc-100 px-4 dark:bg-zinc-800 ${
        getTitleFont().className
      }`}
    >
      <Logo />
      <FontAwesomeIcon
        icon={faBars}
        className='h-8 w-8'
      />
    </div>
  )
}
