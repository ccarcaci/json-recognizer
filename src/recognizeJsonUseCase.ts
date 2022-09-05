import { ParseFunctionType, parserWrapper } from './parserWrapper'
import { ParsingType } from './types/ParsingType'

type RecognizeJsonFunctionType = (chunk: string) => Record<string, unknown>[]

const recognizeJsonUseCase = (): RecognizeJsonFunctionType => {
  let currentParsing: ParsingType = {
    openParens: 0,
    openQuote: false,
    partial: '',
    status: 'START',
  }

  return (chunk: string) => {
    const parse = parserWrapper(chunk, currentParsing)
    let { iteratorResult, recognizedJsons } = iterateParsing([], parse)

    while (!iteratorResult.done) {
      ;({ iteratorResult, recognizedJsons } = iterateParsing(recognizedJsons, parse))
    }

    currentParsing = iteratorResult.value

    return recognizedJsons
  }
}

// --

type IterateParsingType = {
  iteratorResult: IteratorResult<ParsingType, ParsingType>
  recognizedJsons: Record<string, unknown>[]
}

const iterateParsing = (
  prevRecognizedJsons: Record<string, unknown>[],
  parse: ParseFunctionType
): IterateParsingType => {
  const iteratorResult = parse()
  const currentParsing = iteratorResult.value
  let recognizedJsons = prevRecognizedJsons

  if (currentParsing.status === 'RECOGNIZED') {
    recognizedJsons = [...recognizedJsons, JSON.parse(currentParsing.partial)]
  }

  return {
    iteratorResult,
    recognizedJsons,
  }
}

// --

export { recognizeJsonUseCase }
