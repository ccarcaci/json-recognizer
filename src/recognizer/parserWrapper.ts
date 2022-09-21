import { jsonChunkParserGenerator } from './jsonChunkParser'
import { ParsingType } from '../types/ParsingType'

export type ParseFunctionType = () => IteratorResult<ParsingType, ParsingType>

const parserWrapper = (chunk: string, currentParsing: ParsingType): ParseFunctionType => {
  const jsonChunkParser = jsonChunkParserGenerator(chunk, currentParsing)
  // parse() function.
  return () => jsonChunkParser.next()
}

export { parserWrapper }
