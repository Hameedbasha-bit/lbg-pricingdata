export default {
  rootDir: '.',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'controllers/**/*.js',
    'services/**/*.js'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};
