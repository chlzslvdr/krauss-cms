const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@contents/(.*)$': '<rootDir>/src/contents/$1',
    '^@commons/(.*)$': '<rootDir>/src/commons/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [
    "/node_modules/(?!remark|remark-parse|remark-html|other-esm-deps)/"
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text-summary', 'lcov'],
};

module.exports = createJestConfig(customJestConfig);
