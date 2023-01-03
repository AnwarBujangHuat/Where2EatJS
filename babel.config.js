module.exports = {
  // ... some other config
  presets: ['module:metro-react-native-babel-preset'],

  plugins: [
    // ... some other plugins
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          /**
           * Regular expression is used to match all files inside `./src` directory and map each `.src/folder/[..]` to `~folder/[..]` path
           */
          'images': './app/assets/images',
          'lottie': './app/assets/lottie',
          'atoms': './app/components/atoms',
          'molecules': './app/components/molecules',
          'configs': './app/configs',
          'model': './app/model',
          'navigation': './app/navigation',
          'screens': './app/screens',
          'store': './app/store',
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.json',
          '.tsx',
          '.ts',
          '.native.js',
        ],
      },
    ],
  ],
};
