import { initJsonRecognizer } from '@bitacode/json-recognizer'

console.log('Launching integration tests')

const parseFunction = initJsonRecognizer()
const recognizedJson = parseFunction('{"foo":"bar"}')

console.log(`Recognized JSON: ${JSON.stringify(recognizedJson)}`)
console.log('Integration tests done')
