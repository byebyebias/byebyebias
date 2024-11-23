module.exports = {

  moduleNameMapper: {
    // identity obj proxy prevents css imports from interfering with jest tests
    "\\.(css|less)$": "identity-obj-proxy"
  },
  
  preset: 'ts-jest',

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Handle TypeScript files with ts-jest
    '^.+\\.(js|jsx)$': 'babel-jest', // Handle JavaScript/JSX files with Babel
  },
  testEnvironment: 'jsdom',
  // setupFilesAfterEnv: ['node_modules/@testing-library/jest-dom/extend-expect'],
  // setupFilesAfterEnv: ['frontend/src/setupTests.ts'],
  
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  
};


