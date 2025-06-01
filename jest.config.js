module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@mui|react-chartjs-2|chart.js|react-redux)/)',
    '\\.pnp\\.[^\\s]+$'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],

};