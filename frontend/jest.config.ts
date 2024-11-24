module.exports = {

  moduleNameMapper: {
    // identity obj proxy prevents css imports from interfering with jest tests
    "\\.(css|less)$": "identity-obj-proxy"
  },
  
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // setupFilesAfterEnv: ['node_modules/@testing-library/jest-dom/extend-expect'],
  // setupFilesAfterEnv: ['frontend/src/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  
};