import assert from 'assert'
import { initJsonRecognizer } from '@bitacode/json-recognizer'

import { readFile } from '../util/readFile'
import { formatJson } from '../util/formatJson'

// |== ==|
const testMultipleChunks = () => {
  const partialString = readFile(__dirname + '/../../assets/partial.json')
  const finalString = readFile(__dirname + '/../../assets/final.json')
  const jsonStringFormatted = formatJson(partialString + finalString)

  const parseFunction = initJsonRecognizer()
  const recognizedJsons = parseFunction(partialString)
  const recognizedJsons2 = parseFunction(finalString)

  assert(recognizedJsons.length === 0)

  assert(recognizedJsons2.length === 1)

  const recognizedJson2String = JSON.stringify(recognizedJsons2[0])

  assert(jsonStringFormatted === recognizedJson2String)

  console.log('testMultipleChunks / OK')
}

export { testMultipleChunks }
