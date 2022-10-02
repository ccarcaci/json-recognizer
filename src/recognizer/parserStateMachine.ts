export type StatusesType =
  | 'START'
  | 'ERROR'
  | 'PROGRESS SQUARES'
  | 'PROGRESS BRACKETS'
  | 'RECOGNIZED'
  | 'QUOTE SQUARES'
  | 'QUOTE BRACKETS'

export type ParserStatusType = {
  openBrackets: number
  openSquares: number
  partial: string
  status: StatusesType
  recognizedJsons: Record<string, unknown>[]
}

const parserStateMachine = (chunk: string, status: ParserStatusType): ParserStatusType => {
  const trimmedChunk = chunk.trim()
  let newStatus = status

  trimmedChunk

  return newStatus
}

//  --

type StateInputType = {
  current: string
  openBrackets: number
  openSquares: number
  status: StatusesType
}

const stateMachine = (currentChar: string, status: ParserStatusType): ParserStatusType => {}

//  --

export { parserStateMachine }
