import { jsonChunkParserGenerator } from './jsonChunkParser'
import { ParsingType } from './types/ParsingType'

describe('Pure function that recognizes JSON coming in chunks', () => {
  test('Receive full fledge JSON in a string', () => {
    const currentParsing: ParsingType = {
      openParens: 0,
      openQuote: false,
      partial: '',
      status: 'START',
    }
    const jsonChunkParser = jsonChunkParserGenerator('{}', currentParsing)
    const result = jsonChunkParser.next()

    expect(result).toEqual({
      value: {
        openParens: 0,
        openQuote: false,
        partial: '{}',
        status: 'RECOGNIZED',
      },
      done: true,
    })
  })

  test('Receive two JSONs within a single chunk', () => {
    const currentParsing: ParsingType = {
      openParens: 0,
      openQuote: false,
      partial: '',
      status: 'START',
    }
    const jsonChunkParser = jsonChunkParserGenerator('{}{}', currentParsing)
    const result = jsonChunkParser.next()
    const result2 = jsonChunkParser.next()

    expect(result).toEqual({
      value: {
        openParens: 0,
        openQuote: false,
        partial: '{}',
        status: 'RECOGNIZED',
      },
      done: false,
    })
    expect(result2).toEqual({
      value: {
        openParens: 0,
        openQuote: false,
        partial: '{}',
        status: 'RECOGNIZED',
      },
      done: true,
    })
  })

  test('JSON contains string with brackets', () => {
    const jsonExample = {
      foo: '{{',
    }
    const currentParsing: ParsingType = {
      openParens: 0,
      openQuote: false,
      partial: '',
      status: 'START',
    }
    const jsonChunkParser = jsonChunkParserGenerator(JSON.stringify(jsonExample), currentParsing)
    const result = jsonChunkParser.next()

    expect(result).toEqual({
      value: {
        openParens: 0,
        openQuote: false,
        partial: JSON.stringify(jsonExample),
        status: 'RECOGNIZED',
      },
      done: true,
    })
  })

  test('JSON contains escaped quotes', () => {
    const jsonExample = {
      foo: '"quoted"',
    }
    const currentParsing: ParsingType = {
      openParens: 0,
      openQuote: false,
      partial: '',
      status: 'START',
    }
    const jsonChunkParser = jsonChunkParserGenerator(JSON.stringify(jsonExample), currentParsing)
    const result = jsonChunkParser.next()

    expect(result).toEqual({
      value: {
        openParens: 0,
        openQuote: false,
        partial: JSON.stringify(jsonExample),
        status: 'RECOGNIZED',
      },
      done: true,
    })
  })

  test('Chunk has closing JSON first', () => {
    const currentParsing: ParsingType = {
      openParens: 0,
      openQuote: false,
      partial: '',
      status: 'START',
    }
    const jsonChunkParser = jsonChunkParserGenerator('}{ foo: "bar" }', currentParsing)
    const result = jsonChunkParser.next()
    const result2 = jsonChunkParser.next()

    expect(result).toEqual({
      value: {
        openParens: -1,
        openQuote: false,
        partial: '}',
        status: 'ERROR',
      },
      done: false,
    })
    expect(result2).toEqual({
      value: {
        openParens: 0,
        openQuote: false,
        partial: '{ foo: "bar" }',
        status: 'RECOGNIZED',
      },
      done: true,
    })
  })

  test('Chunks contains two halves of JSON', () => {
    const currentParsing: ParsingType = {
      openParens: 0,
      openQuote: false,
      partial: '',
      status: 'START',
    }
    const jsonChunkParser = jsonChunkParserGenerator('az"}{"foo', currentParsing)
    const result = jsonChunkParser.next()
    const result2 = jsonChunkParser.next()

    expect(result).toEqual({
      value: {
        openParens: -1,
        openQuote: false,
        partial: 'az"}',
        status: 'ERROR',
      },
      done: false,
    })
    expect(result2).toEqual({
      value: {
        openParens: 1,
        openQuote: true,
        partial: '{"foo',
        status: 'PROGRESS',
      },
      done: true,
    })
  })
})
