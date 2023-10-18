import { Kdam_Thmor_Pro } from 'next/font/google'
import Logo from './Logo'

const kdamThmorPro = Kdam_Thmor_Pro({ subsets: ['latin'], weight: '400' })

export default function Navbar() {
  return (
    <div
      className={`fixed top-0 .-inset-x-16 inset-x-0 flex flex-row justify-evenly items-center gap-2 h-16 bg-gradient-to-b from-white to-slate-100  ${kdamThmorPro.className}`}
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
