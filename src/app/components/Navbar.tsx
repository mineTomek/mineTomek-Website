import { getTitleFont } from '../fonts'
import Logo from './Logo'

export default function Navbar() {
  return (
    <div
      className={`fixed top-0 .-inset-x-16 inset-x-0 flex flex-row justify-evenly items-center gap-2 h-16 bg-gradient-to-b from-white to-slate-100  ${getTitleFont().className}`}
    >
      <Logo
        width={32}
        height={32}
      />
      <h1 className='text-xl'>mineTomek</h1>
      <div>Menu</div>
    </div>
  )
}
