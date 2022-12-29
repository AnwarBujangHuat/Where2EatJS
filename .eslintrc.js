module.exports = {
  root: true,
  extends: '@react-native-community',
  settings: {
    'import/resolver': {
      'babel-module': {
        extensions: ['.ios.js', '.android.js', '.js', '.ios.jsx', '.android.jsx', '.jsx', '.json', '.node'],
        alias: {
          app: './app',
          '~': './app/components',
        },
      },
    },
  },
};
