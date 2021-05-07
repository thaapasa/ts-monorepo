const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      // CracoAlias reads aliases from tsconfig-paths.json and sets them to webpack
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: "./",
        // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
        tsConfigPath: "./tsconfig.paths.json"
      }
    }
  ],
  webpack: {
    configure: (webpackConfig, { paths }) => {
      // Drop ModuleScopePlugin that checks for references outside of src
      // (without this CRA will fail the build because of the imports)
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);

      // ts-loader is required to reference external typescript projects/files (non-transpiled)
      webpackConfig.module.rules.push({
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          configFile: 'tsconfig.json',
        },
      })

      return webpackConfig;
    }
  },
};