import assert from 'assert'
import { initJsonRecognizer } from '@bitacode/json-recognizer'

import { readFile } from '../util/readFile'
import { formatJson } from '../util/formatJson'

// |==| |==|
const testMultipleJsons = () => {
  const jsonString = readFile(__dirname + '/../../assets/example.json')
  const jsonStringFormatted = formatJson(jsonString)
  const jsonString2 = readFile(__dirname + '/../../assets/example2.json')
  const jsonString2Formatted = formatJson(jsonString2)

  const parseFunction = initJsonRecognizer()
  const recognizedJsons = parseFunction(jsonString)
  const recognizedJsons2 = parseFunction(jsonString2)

  assert(recognizedJsons.length === 1)

  const recognizedJsonString = JSON.stringify(recognizedJsons[0])

  assert(jsonStringFormatted === recognizedJsonString)

  assert(recognizedJsons2.length === 1)

  const recognizedJson2String = JSON.stringify(recognizedJsons2[0])

  assert(jsonString2Formatted === recognizedJson2String)

  console.log('testMultipleJsons / OK')
}

export { testMultipleJsons }
