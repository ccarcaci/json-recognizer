import assert from 'assert'
import { initJsonRecognizer } from '@bitacode/json-recognizer'

import { readFile } from '../util/readFile'

const testSingleJson = () => {
  const jsonString = readFile(__dirname + '/../../assets/example.json')
  const jsonStringFormatted = JSON.stringify(JSON.parse(jsonString))
  const parseFunction = initJsonRecognizer()
  const recognizedJsons = parseFunction(jsonString)

  assert(recognizedJsons.length === 1)

  const recognizedJsonString = JSON.stringify(recognizedJsons[0])

  assert(jsonStringFormatted == recognizedJsonString)

  console.log('testSingleJson - OK')
}

export { testSingleJson }
