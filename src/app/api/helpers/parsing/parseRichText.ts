import RichTextElement from '@/app/types/RichTextElement'

export default function parseRichText(richText: RichTextElement[]) {
  return richText
    .map(element => {
      let result = element.text.content

      if (element.annotations.bold) result = `**${result}**`
      if (element.annotations.italic) result = `*${result}*`
      if (element.annotations.code) result = '`' + result + '`'
      if (element.annotations.underline) result = `u:${result}:u`
      if (element.annotations.strikethrough) result = `~${result}~`

      return result
    })
    .join('')
}
