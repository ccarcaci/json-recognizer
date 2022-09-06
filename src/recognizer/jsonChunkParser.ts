import { ParsingType } from '../types/ParsingType'

function* jsonChunkParserGenerator(chunk: string, prevParsing: ParsingType): Generator<ParsingType, ParsingType> {
  let parsing: ParsingType = prevParsing
  let index = 0

  while (index < chunk.length) {
    const current = chunk[index]
    if (current === '"') {
      parsing.openQuote = detectOpenQuote(parsing.openQuote, chunk[index - 1])
    }

    let newParsing = detectParsingStatus(current, parsing)
    index++

    if (newParsing.status === 'PROGRESS' && parsing.status === 'ERROR') {
      yield parsing
    }

    if (newParsing.status === 'RECOGNIZED' && index < chunk.length) {
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
  let { openParens, partial, status } = parsing
  partial += current

  if (parsing.openQuote && parsing.status !== 'ERROR') {
    return { ...parsing, partial }
  }

  if (parsing.status === 'START' && !['{', '}'].includes(current)) {
    return {
      openParens,
      openQuote: false,
      partial,
      status: 'ERROR',
    }
  }

  if (current === '{') {
    openParens = Math.max(1, openParens + 1)
    partial = openParens === 1 ? '{' : partial
    return {
      openParens,
      openQuote: false,
      partial,
      status: 'PROGRESS',
    }
  }
  if (current === '}') {
    openParens--
    status = openParens < 0 ? 'ERROR' : openParens === 0 ? 'RECOGNIZED' : 'PROGRESS'

    return {
      openParens,
      openQuote: false,
      partial,
      status,
    }
  }

  return {
    openParens,
    openQuote: false,
    partial,
    status,
  }
}

// --

export { jsonChunkParserGenerator }
