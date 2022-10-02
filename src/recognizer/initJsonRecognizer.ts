import { RecognizeJsonFunctionType } from '../types/RecognizeJsonFunctionType'
import { parserStateMachine, ParserStatusType } from './parserStateMachine'

export class ParsingError extends Error {
  constructor() {
    super()
    Object.setPrototypeOf(this, ParsingError)
  }
}

const initJsonRecognizer = (): RecognizeJsonFunctionType => {
  let status: ParserStatusType = {
    openBrackets: 0,
    openSquares: 0,
    partial: '',
    status: 'START',
    recognizedJsons: [],
  }

  // recognize() function.
  return (chunk: string) => {
    status = parserStateMachine(chunk, status)

    if (status.status === 'ERROR') {
      throw new ParsingError()
    }

    const recognizedJsons = status.recognizedJsons
    status.recognizedJsons = []

    return recognizedJsons
  }
}

export { initJsonRecognizer }
