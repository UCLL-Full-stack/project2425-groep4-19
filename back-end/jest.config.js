/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
      '\\.[jt]sx?$': 'esbuild-jest',
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};