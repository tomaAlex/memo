module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript'
  ],
  'plugins': [
    'tsconfig-paths-module-resolver',
    'react-native-reanimated/plugin'
  ]
};
