import * as fs from 'fs'
import * as stream from 'stream'
import { TransformCallback } from 'stream'
import assert from 'assert'

import { recognizeJsonTransformStream } from '@bitacode/json-recognizer'

import { readFile } from '../util/readFile'
import { formatJson } from '../util/formatJson'

const limiterTransformStream = (): stream.Transform =>
  new stream.Transform({
    writableObjectMode: true,
    readableObjectMode: true,
    transform(chunk: string, _: BufferEncoding, callback: TransformCallback) {
      Array.from(chunk).forEach((charValue) => {
        this.push(charValue)
      })
      callback()
    },
  })

const jsonWritableStream = (): stream.Writable => {
  const jsonString = readFile(__dirname + '/../../assets/example.json')
  const jsonStringFormatted = formatJson(jsonString)

  return new stream.Writable({
    objectMode: true,
    write(chunk: Record<string, unknown>[], _: BufferEncoding, callback: (error?: Error | null) => void) {
      const chunkStringFormatted = JSON.stringify(chunk)
      assert(jsonStringFormatted === chunkStringFormatted)
      console.log('testStream / OK')
      callback()
    },
  })
}

// Stream
const testStream = async () =>
  new Promise<void>((resolve) => {
    const fstream = fs.createReadStream(__dirname + '/../../assets/example.json', 'utf-8')
    fstream
      .pipe(limiterTransformStream())
      .pipe(recognizeJsonTransformStream())
      .pipe(jsonWritableStream().on('finish', resolve))
  })

export { testStream }
