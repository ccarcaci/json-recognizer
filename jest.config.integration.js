module.exports = {
  roots: ['<rootDir>/test/integration'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', '.'],
  testTimeout: 1000 * 60 * 15,
}
