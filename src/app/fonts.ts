import { Noto_Sans_Cuneiform, Rubik } from 'next/font/google'

const title = Rubik({ subsets: ['latin'], weight: '400' })
const content = Noto_Sans_Cuneiform({ subsets: ['latin'], weight: '400' })

export function getTitleFont() {
  return title
}

export function getContentFont() {
  return content
}
