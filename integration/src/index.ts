import { testSingleJson } from './cases/testSingleJson'
import { testMultipleJsons } from './cases/testMultipleJsons'
import { testMultipleChunks } from './cases/testMultipleChunks'
import { testPartialJson } from './cases/testPartialJson'
import { testInvalidJson } from './cases/testInvalidJson'

console.log('Launching integration tests')

testSingleJson()
testMultipleJsons()
testMultipleChunks()
testPartialJson()
testInvalidJson()

console.log('Integration tests ran')
