import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getTitleFont } from '../fonts'
import Logo from './Logo'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  return (
    <div
      className={`.-inset-x-16 fixed inset-x-0 top-0 flex h-16 flex-row items-center justify-evenly gap-2 bg-gradient-to-b from-white to-slate-100  ${
        getTitleFont().className
      }`}
    >
      <Logo />
      <h1 className='text-xl'>mineTomek</h1>
      <FontAwesomeIcon
        icon={faBars}
        width={30}
        height={30}
      />
    </div>
  )
}
