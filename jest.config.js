const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

// Add any custom config to be passed to Jest
const config = {
  // coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}], // used to transpile TypeScript
  },
  setupFiles: ['dotenv/config'], // Loads environment variables from .env.test
  globalSetup: './jest.globalSetup.ts', // This file runs once before all tests
  globalTeardown: './jest.globalTeardown.ts', // This file runs once after all tests
  watchman: false // Used to supress watchman warning when running tests
};

// Use .env.test file for testing instead of .env
require('dotenv').config({ path: './.env.test' });

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
