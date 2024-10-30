module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // setupFilesAfterEnv: ['node_modules/@testing-library/jest-dom/extend-expect'],
  // setupFilesAfterEnv: ['frontend/src/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
