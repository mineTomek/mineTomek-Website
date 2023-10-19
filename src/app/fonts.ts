import { Inter, Kdam_Thmor_Pro } from 'next/font/google'

const title = Kdam_Thmor_Pro({ subsets: ['latin'], weight: '400' })
const content = Inter({ subsets: ['latin'] })

export function getTitleFont() {
  return title
}

export function getContentFont() {
  return content
}
