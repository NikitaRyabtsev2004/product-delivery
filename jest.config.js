module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.cjs'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  reporters: [
    "default",
    ["<rootDir>/jest-custom-reporter.js", {}] // Добавьте пустой объект конфигурации
  ]
};