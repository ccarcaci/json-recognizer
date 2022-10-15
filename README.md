json-recognizer
===============

[![npm](https://img.shields.io/npm/v/@bitacode/json-recognizer?color=green)](https://www.npmjs.com/package/@bitacode/json-recognizer)
[![License](https://img.shields.io/npm/l/@bitacode/json-recognizer)](https://mit-license.org/)

This library recognizes jsons inside a flow of chars.

> This library follows the minimal dependencies principle.

## Usage

Refer to the sources in the [integration](integration/src/cases) folder.

```typescript
const parseFunction = initJsonRecognizer() // Initialize the recognizer
const recognizedJsons = parseFunction(rawtring) // Call the parse function with raw string containing JSON
const recognizedJsons2 = parseFunction(rawString2) // Call the parse function with raw string containins JSON
```

The `recognizedJsons` and `recognizedJsons2` vars will contain the jsons.

The `initJsonRecognizer()` call initializes an internal state machine that is able to recognize jsons that lies between `rawString` and `rawString2`.

### Usage with streams

The [src/streams/recognizeJsonTransformStream.ts](src/streams/recognizeJsonTransformStream.ts) module contains a transform stream that receives as raw strings chunks stream and provide as output JSON objects stream.

Refer to the related [integration](integration/src/cases/testStream.ts) for stream usage.

### High-level code explanation

The library entrypoint is the [`initJsonRecognizer()`](src/recognizer/initJsonRecognizer.ts) function. This second-order function returns an anonymous function that receives the chunk string, this chunk contains JSONs parts. For clarity, we call this anonymous function `recognize()`.

The `recognize()` function receives the chunk, then instantiate the `parse()`(src/recognizer/parserWrapper.ts) function calling the `parseWrapper()`. This function instantiates the generator that, by scanning the chunk char by char, recognizes the Json(s) inside it using an internal status built from previous scans. [`parse()`] function is basically a call to generator's `next()` function.

## What's next?

The library now is still in development phase revision (as per [semver](https://semver.org/)) 0.x.y.

There are some known bugs and missing implementations:

- Stream recognizer duplicates the last recognized json when receiving new line as last char.
- JSON arrays are not recognized as valid input.

A new implementation based on pure state machine instead of Javascript generators is coming. This new version is meant to solve the bug above and to simplify the internal architecture.

## License

Distributed under the [MIT](LICENSE) License.
