export type ParsingType = {
  openParens: number
  openQuote: boolean
  partial: string
  status: 'START' | 'PROGRESS' | 'ERROR' | 'RECOGNIZED'
}
