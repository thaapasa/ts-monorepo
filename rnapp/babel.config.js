module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          cwd: 'packagejson',
          alias: {
            app: './src',
            assets: './assets',
            shared: '../shared/src',
          },
        },
      ],
    ],
  };
};
