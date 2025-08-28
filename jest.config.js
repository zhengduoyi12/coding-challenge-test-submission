const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Load next.config.js and .env.* into the test env
  dir: './',
})

// Custom Jest config passed to next/jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/types$': '<rootDir>/src/types',                
    '^@/types/(.*)$': '<rootDir>/src/types/$1',       
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/components/(.*)$': '<rootDir>/src/ui/components/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/ui/hooks/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
