import { initJsonRecognizer } from './initJsonRecognizer'
import { parserWrapper } from './parserWrapper'

jest.mock('./parserWrapper')

const parserWrapperMock = jest.mocked(parserWrapper)

describe('JSON comes into chunks', () => {
  const parseMock = jest.fn()
  parserWrapperMock.mockReturnValue(parseMock)

  afterEach(() => jest.clearAllMocks())

  // |===|
  test('Recognize JSON coming in single chunk', () => {
    parseMock.mockReturnValue({
      value: {
        openParens: 0,
        openQuote: false,
        partial: '{"foo":"bar"}',
        status: 'RECOGNIZED',
      },
      done: true,
    })
    const chunk = '{"foo":"bar"}'
    const jsonsSequence = initJsonRecognizer()(chunk)

    expect(parserWrapperMock).toBeCalledTimes(1)
    expect(parserWrapperMock).toBeCalledWith('{"foo":"bar"}', {
      openParens: 0,
      openQuote: false,
      partial: '',
      status: 'START',
    })
    expect(parseMock).toBeCalledTimes(1)
    expect(jsonsSequence).toEqual([{ foo: 'bar' }])
  })

  // |=== ===|
  test('Recognize JSON coming in two chunks', () => {
    parseMock
      .mockReturnValueOnce({
        value: {
          openParens: 1,
          openQuote: false,
          partial: '{"foo":',
          status: 'PROGRESS',
        },
        done: true,
      })
      .mockReturnValue({
        value: {
          openParens: 0,
          openQuote: false,
          partial: '{"foo":"bar"}',
          status: 'RECOGNIZED',
        },
        done: true,
      })
    const chunk = '{"foo":'
    const chunk2 = '"bar"}'
    const parseFunction = initJsonRecognizer()
    const jsonsSequence = parseFunction(chunk)
    const jsonsSequence2 = parseFunction(chunk2)

    expect(parserWrapperMock).toHaveBeenNthCalledWith(1, '{"foo":', {
      openParens: 0,
      openQuote: false,
      partial: '',
      status: 'START',
    })
    expect(parserWrapperMock).toHaveBeenNthCalledWith(2, '"bar"}', {
      openParens: 1,
      openQuote: false,
      partial: '{"foo":',
      status: 'PROGRESS',
    })
    expect(parseMock).toBeCalledTimes(2)
    expect(jsonsSequence).toEqual([])
    expect(jsonsSequence2).toEqual([{ foo: 'bar' }])
  })

  // ==|== ==|==
  test('Recognize JSON nested in chunks', () => {
    parseMock
      .mockReturnValueOnce({
        value: {
          openParens: -1,
          openQuote: true,
          partial: 'az"}',
          status: 'ERROR',
        },
        done: false,
      })
      .mockReturnValueOnce({
        value: {
          openParens: 1,
          openQuote: true,
          partial: '{"foo',
          status: 'PROGRESS',
        },
        done: true,
      })
      .mockReturnValueOnce({
        value: {
          openParens: 0,
          openQuote: false,
          partial: '{"foo":"bar"}',
          status: 'RECOGNIZED',
        },
        done: false,
      })
      .mockReturnValueOnce({
        value: {
          openParens: 1,
          openQuote: true,
          partial: '{"ee',
          status: 'PROGRESS',
        },
        done: true,
      })
    const chunk = 'az"}{"foo'
    const chunk2 = '":"bar"}{"ee'
    const parseFunction = initJsonRecognizer()
    const jsonsSequence = parseFunction(chunk)
    const jsonsSequence2 = parseFunction(chunk2)

    expect(parserWrapperMock).toHaveBeenNthCalledWith(1, 'az"}{"foo', {
      openParens: 0,
      openQuote: false,
      partial: '',
      status: 'START',
    })
    expect(parserWrapperMock).toHaveBeenNthCalledWith(2, '":"bar"}{"ee', {
      openParens: 1,
      openQuote: true,
      partial: '{"foo',
      status: 'PROGRESS',
    })
    expect(jsonsSequence).toEqual([])
    expect(jsonsSequence2).toEqual([{ foo: 'bar' }])
  })

  // |==|==|
  test('Multiple JSON in single chunk', () => {
    parseMock
      .mockReturnValueOnce({
        value: {
          openParens: 0,
          openQuote: false,
          partial: '{"the": "json"}',
          status: 'RECOGNIZED',
        },
        done: false,
      })
      .mockReturnValueOnce({
        value: {
          openParens: 0,
          openQuote: false,
          partial: '{"another": "json"}',
          status: 'RECOGNIZED',
        },
        done: true,
      })
    const chunk = 'randomchunk'
    const parseFunction = initJsonRecognizer()
    const jsonsSequence = parseFunction(chunk)

    expect(jsonsSequence).toEqual([{ the: 'json' }, { another: 'json' }])
  })

  // |==| |==|
  test('Parse multiple chunks, discard previous recognized JSONs', () => {
    parseMock.mockReturnValueOnce({
      value: {
        openParens: 0,
        openQuote: false,
        partial: '{"the": "json"}',
        status: 'RECOGNIZED',
      },
      done: true,
    })
    parseMock.mockReturnValueOnce({
      value: {
        openParens: 0,
        openQuote: false,
        partial: '{"another": "json"}',
        status: 'RECOGNIZED',
      },
      done: true,
    })
    const chunk = 'thejson'
    const chunk2 = 'anotherjson'
    const parseFunction = initJsonRecognizer()
    const jsonsSequence = parseFunction(chunk)
    const jsonsSequence2 = parseFunction(chunk2)

    expect(jsonsSequence).toEqual([{ the: 'json' }])
    expect(jsonsSequence2).toEqual([{ another: 'json' }])
  })

  // |==| \n
  test('Parse multiple chunks, discard previous recognized JSONs', () => {
    parseMock.mockReturnValueOnce({
      value: {
        openParens: 0,
        openQuote: false,
        partial: '{"the": "json"}',
        status: 'RECOGNIZED',
      },
      done: true,
    })
    parseMock.mockReturnValueOnce({
      value: {
        openParens: 0,
        openQuote: false,
        partial: '',
        status: 'PROGRESS',
      },
      done: true,
    })
    const chunk = 'thejson'
    const chunk2 = '\n'
    const parseFunction = initJsonRecognizer()
    const jsonsSequence = parseFunction(chunk)
    const jsonsSequence2 = parseFunction(chunk2)

    expect(jsonsSequence).toEqual([{ the: 'json' }])
    expect(jsonsSequence2).toEqual([])
  })
})
