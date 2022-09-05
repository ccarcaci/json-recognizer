import stream from 'stream'
import { recognizeJsonUseCase } from './recognizeJsonUseCase'

const recognizeJsonStage = (): stream.Transform => {
  const parseChunkFunction = recognizeJsonUseCase()
  return new stream.Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform(chunk: string, _, callback) {
      const jsons: Record<string, unknown>[] = parseChunkFunction(chunk)
      jsons.forEach((json) => this.push(json))
      callback()
    },
  })
}

export { recognizeJsonStage }
