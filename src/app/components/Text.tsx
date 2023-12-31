import data from '@/app/translation.json'

interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

const translations: Translations = data

export default function Text(props: {
  text: string
  lang: string
  replacement?: string
}) {
  let userLanguage = props.lang

  if (userLanguage.includes('en')) {
    userLanguage = 'en'
  } else if (userLanguage.includes('pl')) {
    userLanguage = 'pl'
  } else {
    userLanguage = 'en'
  }

  const translation = translations[props.text][userLanguage]

  return (
    <span>
      {translation == undefined || translation.length == 0
        ? 'Error'
        : translation.replace('%d', props.replacement ?? '%d')}
    </span>
  )
}
