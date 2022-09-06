import { jsonChunkParserGenerator } from './jsonChunkParser'
import { ParsingType } from '../types/ParsingType'

import randomBig from '../../testAssets/randomBig.json'

describe('Pass big random JSON to the parser', () => {
  test('Random big JSON', () => {
    const currentParsing: ParsingType = {
      openParens: 0,
      openQuote: false,
      partial: '',
      status: 'START',
    }
    const jsonChunkParser = jsonChunkParserGenerator(JSON.stringify(randomBig), currentParsing)
    const result = jsonChunkParser.next()

    expect(result).toEqual({
      value: {
        openParens: 0,
        openQuote: false,
        partial: JSON.stringify(randomBig),
        status: 'RECOGNIZED',
      },
      done: true,
    })
  })

  test('Random invalid big JSON', () => {
    const currentParsing: ParsingType = {
      openParens: 0,
      openQuote: false,
      partial: '',
      status: 'START',
    }
    const jsonChunkParser = jsonChunkParserGenerator(INVALID_BIG_JSON, currentParsing)
    const result = jsonChunkParser.next()

    expect(result).toEqual({
      value: {
        openParens: 0,
        openQuote: false,
        partial: INVALID_RECOGNIZED_JSON,
        status: 'RECOGNIZED',
      },
      done: false,
    })
  })

  test('Pass multiple chunks, real use case', () => {
    const currentParsing: ParsingType = {
      openParens: 0,
      openQuote: false,
      partial: '',
      status: 'START',
    }
    let jsonChunkParser = jsonChunkParserGenerator(chunk, currentParsing)
    const result = jsonChunkParser.next()
    jsonChunkParser = jsonChunkParserGenerator(chunk2, result.value as ParsingType)
    const result2 = jsonChunkParser.next()
    jsonChunkParser = jsonChunkParserGenerator(chunk3, result2.value as ParsingType)
    const result3 = jsonChunkParser.next()
    const result4 = jsonChunkParser.next()

    expect(result).toEqual({
      value: {
        openParens: 1,
        openQuote: true,
        partial: chunk,
        status: 'PROGRESS',
      },
      done: true,
    })
    expect(result2).toEqual({
      value: {
        openParens: 1,
        openQuote: false,
        partial: chunk + chunk2,
        status: 'PROGRESS',
      },
      done: true,
    })
    expect(result3).toEqual({
      value: {
        openParens: 0,
        openQuote: false,
        partial: chunk + chunk2 + partialChunk3,
        status: 'RECOGNIZED',
      },
      done: false,
    })
    expect(result4).toEqual({
      value: {
        openParens: 1,
        openQuote: false,
        partial: finalChunk3,
        status: 'PROGRESS',
      },
      done: true,
    })
  })
})

const INVALID_BIG_JSON =
  '{"_id":"62097b2ca64bb50fe38c33a3","index":5,"guid":"13e7f11e-205a-46d4-9193-5d6c9fbbad37","isActive":true,"balance":"$3,838.06","picture":"http://placehold.it/32x32","age":38,"eyeColor":"brown","name":"Saunders Miranda","gender":"male","company":"METROZ","email":"saundersmiranda@metroz.com","phone":"+1 (803) 599-2321","address":"179 Amboy Street, Bawcomville, Marshall Islands, 5389","about":"Deserunt non aute reprehenderit excepteur laborum consectetur cupidatat excepteur. Ipsum Lorem eiusmod nisi ad velit cillum velit excepteur qui reprehenderit sunt et officia. Sint deserunt proident elit irure sint. Sit quis laboris ea laborum consequat voluptate tempor. Enim magna et quis est adipisicing dolore culpa sint.\\r\\n","registered":"2014-01-05T09:34:24 -01:00","latitude":-47.99393,"longitude":57.37658,"tags":["deserunt","pariatur","cupidatat","aliquip","non","consectetur","anim"],"friends":["id":0,"name":"Liz Delgado"},{"id":1,"name":"Socorro Mercer"},{"id":2,"name":"Lucinda Byrd"}],"greeting":"Hello, Saunders Miranda! You have 3 unread messages.","favoriteFruit":"banana"}'

const INVALID_RECOGNIZED_JSON =
  '{"_id":"62097b2ca64bb50fe38c33a3","index":5,"guid":"13e7f11e-205a-46d4-9193-5d6c9fbbad37","isActive":true,"balance":"$3,838.06","picture":"http://placehold.it/32x32","age":38,"eyeColor":"brown","name":"Saunders Miranda","gender":"male","company":"METROZ","email":"saundersmiranda@metroz.com","phone":"+1 (803) 599-2321","address":"179 Amboy Street, Bawcomville, Marshall Islands, 5389","about":"Deserunt non aute reprehenderit excepteur laborum consectetur cupidatat excepteur. Ipsum Lorem eiusmod nisi ad velit cillum velit excepteur qui reprehenderit sunt et officia. Sint deserunt proident elit irure sint. Sit quis laboris ea laborum consequat voluptate tempor. Enim magna et quis est adipisicing dolore culpa sint.\\r\\n","registered":"2014-01-05T09:34:24 -01:00","latitude":-47.99393,"longitude":57.37658,"tags":["deserunt","pariatur","cupidatat","aliquip","non","consectetur","anim"],"friends":["id":0,"name":"Liz Delgado"}'

const chunk =
  '{"_id":"62097b2ca64bb50fe38c33a3","index":5,"guid":"13e7f11e-205a-46d4-9193-5d6c9fbbad37","isActive":true,"balance":"$3,838.06","picture":"http://placehold.it/32x32","age":38,"eyeColor":"brown","name":"Saunders Miranda","gender":"male","company":"METROZ","email":"saundersmiranda@metroz.com","phone":"+1 (803) 599-2321","address":"179 Amboy Street, Bawcomville, Marshall Islands, 5389","about":"Deserunt non aute reprehenderit excepteur laborum consect'

const chunk2 =
  'etur cupidatat excepteur. Ipsum Lorem eiusmod nisi ad velit cillum velit excepteur qui reprehenderit sunt et officia. Sint deserunt proident elit irure sint. Sit quis laboris ea laborum consequat voluptate tempor. Enim magna et quis est adipisicing dolore culpa sint.\\r\\n","registered":"2014-01-05T09:34:24 -01:00","latitude":-47.99393,"longitude"'

const chunk3 =
  ':57.37658,"tags":["deserunt","pariatur","cupidatat","aliquip","non","consectetur","anim"],"friends":["id":0,"name":"Liz Delgado"}{"_id":"62097b2ca64bb50fe38c33a3","index":5,"guid":"13e7f11e-205a-46d4-9193-5d6c9fbbad37","isActive":true,"balance":"$3,838.06","picture":"http://placehold.it/32x32","age":38,"eyeColor":"brown","name":"Saunders Miranda","gender"'

const partialChunk3 =
  ':57.37658,"tags":["deserunt","pariatur","cupidatat","aliquip","non","consectetur","anim"],"friends":["id":0,"name":"Liz Delgado"}'

const finalChunk3 =
  '{"_id":"62097b2ca64bb50fe38c33a3","index":5,"guid":"13e7f11e-205a-46d4-9193-5d6c9fbbad37","isActive":true,"balance":"$3,838.06","picture":"http://placehold.it/32x32","age":38,"eyeColor":"brown","name":"Saunders Miranda","gender"'
