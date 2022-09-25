# json-recognizer

## Contribute

### High-level code explanation

The library entrypoint is the [`initJsonRecognizer()`](src/recognizer/initJsonRecognizer.ts) function. This second-order function returns an anonymous function that receives the chunk string, this chunk contains JSONs parts. For clarity, we call this anonymous function `recognize()`.

The `recognize()` function receives the chunk, then instantiate the `parse()`(src/recognizer/parserWrapper.ts) function calling the `parseWrapper()`. This function instantiates the generator that, by scanning the chunk char by char, recognizes the Json(s) inside it using an internal status built from previous scans. [`parse()`] function is basically a call to generator's `next()` function.
