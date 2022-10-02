import { ParsingType } from '../types/ParsingType'
import { jsonChunkParserGenerator } from './jsonChunkParser'

describe('Pure function that recognizes JSON coming in chunks', () => {
  test('Receive array JSON', () => {
    const currentParsing: ParsingType = {
      openBrackets: 0,
      openSquares: 0,
      openQuote: false,
      partial: '',
      status: 'START',
    }
    const jsonChunkParser = jsonChunkParserGenerator('[{},{}]', currentParsing)
    const result = jsonChunkParser.next()

    expect(result).toEqual({
      value: {
        openBrackets: 0,
        openSquares: 0,
        openQuote: false,
        partial: '[{},{}]',
        status: 'RECOGNIZED',
      },
      done: true,
    })
  })
})
