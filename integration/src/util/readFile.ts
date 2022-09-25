import * as fs from 'fs'

const readFile = (filePath: string): string => {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  return fileContent
}

export { readFile }
