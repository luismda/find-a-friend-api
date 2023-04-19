import { randomUUID } from 'node:crypto'

export function generateFilenameToUpload(originalName: string) {
  const formattedFilename = originalName
    .replace(/[@#$%^&~<>:()"'`/\\|!?*+]+/g, '')
    .replace(/ /g, '_')
    .toLowerCase()

  return `${randomUUID()}-${formattedFilename}`
}
