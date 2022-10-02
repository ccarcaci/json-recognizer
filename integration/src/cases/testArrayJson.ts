import { initJsonRecognizer } from '@bitacode/json-recognizer'

import { formatJson } from '../util/formatJson'
import { readFile } from '../util/readFile'
import assert from 'assert'

// [ |==| |==| ]
const testArrayJson = () => {
  const arrayString = readFile(__dirname + '/../../assets/example-array.json')
  const arrayJsonStringFormatted = formatJson(arrayString)

  const parseFunction = initJsonRecognizer()
  const recognizedJsons = parseFunction(arrayString)

  assert(recognizedJsons.length === 1)

  const recognizedJsonsString = JSON.stringify(recognizedJsons[0])

  assert(arrayJsonStringFormatted === recognizedJsonsString)
}

export { testArrayJson }
