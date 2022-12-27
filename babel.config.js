module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-flow-strip-types'],
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.ios.js', '.android.js', '.js', '.ios.jsx', '.android.jsx', '.jsx', '.json', '.tsx'],
        alias: {
          apis: './app/apis',
          components: './app/components',
          configs: './app/configs',
          constant: './app/constant',
          contexts: './app/contexts',
          hooks: './app/hooks',
          navigations: './app/navigations',
          screens: './app/screens',
          stores: './app/stores',
          styles: './app/styles',
          utils: './app/utils',
          assets: './app/assets',
          atoms: './app/components/atoms',
          molecules: './app/components/molecules',
          organisms: './app/components/organisms',
          templates: './app/components/templates',
          auth: './app/auth',
          softToken: './app/softToken',
        },
      },
    ],
  ],
};
