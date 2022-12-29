module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-flow-strip-types'],
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.ios.js', '.android.js', '.js', '.ios.jsx', '.android.jsx', '.jsx', '.json'],
        alias: {
          app: './app',
          '~': './app/components',
        },
      },
    ],
  ],
};
