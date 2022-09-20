import type { Config } from "@jest/types"
import tsConfig from './tsconfig.json';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  rootDir: '../',
  modulePaths: [tsConfig.compilerOptions.baseUrl],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.yaml$': 'yaml-jest'
  },
};

export default config;