import assert from 'assert'
import { initJsonRecognizer } from '@bitacode/json-recognizer'

import { readFile } from '../util/readFile'
import { formatJson } from '../util/formatJson'

// |==|
const testSingleJson = () => {
  const jsonString = readFile(__dirname + '/../../assets/example.json')
  const jsonStringFormatted = formatJson(jsonString)
  const parseFunction = initJsonRecognizer()
  const recognizedJsons = parseFunction(jsonString)

  assert(recognizedJsons.length === 1)

  const recognizedJsonString = JSON.stringify(recognizedJsons[0])

  assert(jsonStringFormatted === recognizedJsonString)

  console.log('testSingleJson / OK')
}

export { testSingleJson }
