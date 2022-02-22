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
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.vue',
    'src/**/*.js',
    '!src/main.js',
    'lib/**/*.js',
    '!lib/sdk/',
    '!lib/config/',
    'servers/**/*.js',
    '!node_modules/'
  ],
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue2-jest'
  }
};
