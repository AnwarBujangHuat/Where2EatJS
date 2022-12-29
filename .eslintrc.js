module.exports = {
  root: true,
  extends: '@react-native-community',
  settings: {
    'import/resolver': {
      'babel-module': {
        extensions: ['.ios.js', '.android.js', '.js', '.json', '.node'],
        alias: {
          app: './app',
        },
      },
    },
  },
};
