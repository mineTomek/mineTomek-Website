import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const mergeCss = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
