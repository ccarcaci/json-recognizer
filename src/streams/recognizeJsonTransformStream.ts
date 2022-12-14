import stream, { TransformCallback } from 'stream'
import { initJsonRecognizer } from '../recognizer/initJsonRecognizer'

const recognizeJsonTransformStream = (): stream.Transform => {
  const parseChunkFunction = initJsonRecognizer()
  return new stream.Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform(chunk: string, _: BufferEncoding, callback: TransformCallback) {
      const jsons: Record<string, unknown>[] = parseChunkFunction(chunk)
      jsons.forEach((json) => this.push(json))
      callback()
    },
  })
}

export { recognizeJsonTransformStream }
