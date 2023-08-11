/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  projects: [
    {
      preset: "ts-jest",
      // tsconfig.jsonのpathsと合わせる
      moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
      testEnvironment: "node",
      testMatch: [
        "<rootDir>/src/app/**/*.test.{ts,tsx}",
        "<rootDir>/src/__shared__/**/*.test.{ts,tsx}",
      ],
    },
    {
      preset: "ts-jest",
      // tsconfig.jsonのpathsと合わせる
      moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
      testEnvironment: "@quramy/jest-prisma/environment",
      // testEnvironmentOptions: { verboseQuery: true },
      testMatch: ["<rootDir>/src/backend/**/*.test.ts"],
    },
  ],
};
