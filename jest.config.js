/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // preset: 'ts-jest',
  testEnvironment: 'node',

  testMatch: [
      "**/unit/**/*.test.ts",
      "**/unit/*.test.ts",
  ],

  collectCoverage: true,
  coverageProvider: "babel",
  coverageDirectory: "coverage",

  // coverageThreshold: {
  //   branches: 100,
  //   functions: 100,
  //   lines: 100,
  //   statements: 100
  // },
  // reporters: [
  //     "default"
  // ],
};