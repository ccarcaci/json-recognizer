import { testSingleJson } from './cases/testSingleJson'
import { testMultipleJsons } from './cases/testMultipleJsons'
import { testMultipleChunks } from './cases/testMultipleChunks'
import { testPartialJson } from './cases/testPartialJson'
import { testInvalidJson } from './cases/testInvalidJson'
import { testArrayJson } from './cases/testArrayJson'

console.log('Launching integration tests')

testSingleJson()
testMultipleJsons()
testMultipleChunks()
testPartialJson()
testInvalidJson()
testArrayJson()

console.log('Integration tests done')
