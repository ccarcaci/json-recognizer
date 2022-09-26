import assert from 'assert'
import { initJsonRecognizer } from '@bitacode/json-recognizer'

import { readFile } from '../util/readFile'

const testInvalidJson = () => {
  const finalString = readFile(__dirname + '/../../assets/final.json')
  const parseFunction = initJsonRecognizer()

  try {
    parseFunction(finalString)
  } catch (error) {
    assert((error as Error).name === 'SyntaxError')
    console.log('testInvalidJson / OK')
  }
}

export { testInvalidJson }
