import { ParsingType } from '../types/ParsingType'

function* jsonChunkParserGenerator(chunk: string, prevParsing: ParsingType): Generator<ParsingType, ParsingType> {
  let parsing: ParsingType = prevParsing
  let index = 0
  const chunkTrimmed = chunk.trim()

  while (index < chunkTrimmed.length) {
    const current = chunkTrimmed[index]
    if (current === '"') {
      parsing.openQuote = detectOpenQuote(parsing.openQuote, chunkTrimmed[index - 1])
    }

    let newParsing = detectParsingStatus(current, parsing)
    index++

    if (newParsing.status === 'PROGRESS' && parsing.status === 'ERROR') {
      yield parsing
    }

    if (newParsing.status === 'RECOGNIZED' && index < chunkTrimmed.length) {
      yield newParsing
    }

    parsing = newParsing
  }

  return parsing
}

// --

const detectOpenQuote = (openQuote: boolean, previousChar: string): boolean => {
  if (previousChar === '\\') {
    return true
  }

  return !openQuote
}

const detectParsingStatus = (current: string, parsing: ParsingType): ParsingType => {
  let { openBrackets, openSquares, partial, status } = parsing
  partial += current

  if (parsing.openQuote && parsing.status !== 'ERROR') {
    return { ...parsing, partial }
  }

  if (parsing.status === 'START' && !['{', '['].includes(current)) {
    return {
      openBrackets,
      openSquares,
      openQuote: false,
      partial,
      status: 'ERROR',
    }
  }

  if (current === '{') {
    openBrackets = Math.max(1, openBrackets + 1)
    partial = openBrackets + openSquares === 1 ? '{' : partial
    return {
      openBrackets,
      openSquares,
      openQuote: false,
      partial,
      status: 'PROGRESS',
    }
  }
  if (current === '}') {
    openBrackets--
    status = detectNewStatus(openBrackets, openSquares)

    return {
      openBrackets,
      openSquares,
      openQuote: false,
      partial,
      status,
    }
  }
  if (current === '[') {
    openSquares = Math.max(1, openSquares + 1)
    partial = openBrackets + openSquares === 1 ? '[' : partial
    return {
      openBrackets,
      openSquares,
      openQuote: false,
      partial,
      status: 'PROGRESS',
    }
  }
  if (current === ']') {
    openSquares--
    status = detectNewStatus(openBrackets, openSquares)

    return {
      openBrackets,
      openSquares,
      openQuote: false,
      partial,
      status,
    }
  }

  return {
    openBrackets,
    openSquares,
    openQuote: false,
    partial,
    status,
  }
}

const detectNewStatus = (openBrackets: number, openSquares: number): 'RECOGNIZED' | 'PROGRESS' | 'ERROR' =>
  openBrackets < 0 || openSquares < 0 ? 'ERROR' : openBrackets === 0 && openSquares === 0 ? 'RECOGNIZED' : 'PROGRESS'

// --

export { jsonChunkParserGenerator }
