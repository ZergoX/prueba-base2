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
        '^@/(.*)$': '<rootDir>/$1',
    },
}

module.exports = createJestConfig(customJestConfig)