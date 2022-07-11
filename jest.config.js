/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  roots: [
    '<rootDir>/src',
    '<rootDir>/test',
    '<rootDir>/lib',
    '<rootDir>/servers'
  ],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.vue',
    'src/**/*.js',
    '!src/translations/*.yaml',
    '!src/app.js',
    'lib/**/*.js',
    '!lib/sdk/',
    '!lib/config/',
    'servers/**/*.js'
  ],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['js', 'json', 'node', 'yaml'],
  transformIgnorePatterns: ['/node_modules/(?!ol)'],
  transform: {
    '^.+\\.(js)$': 'babel-jest',
    '\\.yaml$': 'jest-transform-yaml'
  },
  testEnvironment: 'jsdom'
};
