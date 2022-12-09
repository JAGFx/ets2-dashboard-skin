import type { Config }          from "@jest/types"
import { JestConfigWithTsJest } from 'ts-jest';
import tsconfig                 from './tsconfig.json';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  rootDir: '../',
  modulePaths: [ tsconfig.compilerOptions.baseUrl],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '@core/(.*)$': '<rootDir>/lib/jagfx/core/src/$1',
    // '@server/(.*)$': '<rootDir>/lib/jagfx/server/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tools/tsconfig.json'
      },
    ],
    '^.+\\.yaml$': 'yaml-jest'
  },
};

export default config;