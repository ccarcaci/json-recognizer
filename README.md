# json-recognizer

## Contribute

### High-level code explanation

The library entrypoint is the [`initJsonRecognizer()`](src/recognizer/initJsonRecognizer.ts) function. This second-order function returns an anonymous function that receive the chunk where to recognize Json(s). For clarity, we call this anonymous function `recognize()`.

The `recognize()` function receives the chunk, then instantiate the `parse()` function calling the `parseWrapper()` which instantiate the generator that, by scanning the chunk char by char, recognize the Json(s) inside it considering the status retained from previous scans. [`parse()`](src/recognizer/parserWrapper.ts) function is nothing more than the generator's call to `next()`.
