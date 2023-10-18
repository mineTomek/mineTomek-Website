import { Kdam_Thmor_Pro } from 'next/font/google'
import Logo from './Logo'

const kdamThmorPro = Kdam_Thmor_Pro({ subsets: ['latin'], weight: '400' })

export default function Navbar() {
  return (
    <div className='flex flex-row justify-between items-center px-4 pt-4 gap-2'>
      <Logo
        width={32}
        height={32}
      />
      <h1 className={`text-xl ${kdamThmorPro.className}`}>mineTomek</h1>
    </div>
  )
}
