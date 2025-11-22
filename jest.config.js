module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.presetup.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|moti|react-native-reanimated|@react-navigation)/)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1'
  },
  resolver: '<rootDir>/node_modules/react-native/jest/resolver.js',
  testTimeout: 20000,
  moduleFileExtensions: ['ts','tsx','js','jsx','json','node'],
};
