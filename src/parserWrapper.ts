import { jsonChunkParserGenerator } from './jsonChunkParser'
import { ParsingType } from './types/ParsingType'

export type ParseFunctionType = () => IteratorResult<ParsingType, ParsingType>

const parserWrapper = (chunk: string, currentParsingType: ParsingType): ParseFunctionType => {
  const jsonChunkParser = jsonChunkParserGenerator(chunk, currentParsingType)
  return () => jsonChunkParser.next()
}

export { parserWrapper }
