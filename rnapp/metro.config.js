/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

const extraNodeModules = {
  shared: path.resolve(__dirname, '../shared'),
};

module.exports = {
  /**
   * Add workspace roots so that react native can find the source code for the included
   * packages in the monorepo
   */
  projectRoot: path.resolve(__dirname),
  watchFolders: [path.resolve(__dirname, '../shared')],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        // redirects dependencies referenced from shared/ to local node_modules
        name in target
          ? target[name]
          : path.join(process.cwd(), `node_modules/${name}`),
    }),
  },
};
