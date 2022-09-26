import { testSingleJson } from './cases/testSingleJson'
import { testMultipleJsons } from './cases/testMultipleJsons'
import { testMultipleChunks } from './cases/testMultipleChunks'

console.log('Launching integration tests')

testSingleJson()
testMultipleJsons()
testMultipleChunks()

console.log('Integration tests done')
