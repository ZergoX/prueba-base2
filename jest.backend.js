// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    preset: 'ts-jest',
    testEnvironment: '@edge-runtime/jest-environment',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: ['**/*.server.test.(ts|tsx)'],
}

module.exports = createJestConfig(customJestConfig)