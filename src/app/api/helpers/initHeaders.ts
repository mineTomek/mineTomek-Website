export default function initHeaders() {
  const headers = new Headers()

  headers.append('Content-Type', 'application/json')
  headers.append('Notion-Version', process.env.NOTION_VERSION ?? '0.0.0')
  headers.append('Authorization', `Bearer ${process.env.NOTION_TOKEN}`)

  return headers
}
