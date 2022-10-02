export type ParsingType = {
  openBrackets: number
  openSquares: number
  openQuote: boolean
  partial: string
  status: 'START' | 'PROGRESS' | 'ERROR' | 'RECOGNIZED'
}
