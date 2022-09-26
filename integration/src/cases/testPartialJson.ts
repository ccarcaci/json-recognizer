import assert from 'assert'
import { initJsonRecognizer } from '@bitacode/json-recognizer'

import { readFile } from '../util/readFile'

// |==
const testPartialJson = () => {
  const partialString = readFile(__dirname + '/../../assets/partial.json')
  const parseFunction = initJsonRecognizer()
  const recognizedJsons = parseFunction(partialString)

  assert(recognizedJsons.length === 0)

  console.log('testPartialJson / OK')
}

export { testPartialJson }
