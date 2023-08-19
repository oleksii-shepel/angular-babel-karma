const babelConfig = require('./babel.config.json');

module.exports = {
  resolve: {
    extensions: ['.js', '.ts'],
  },

  module: {
    rules: [
      {
        test: () => true,
        sideEffects: true,
      },
      {
        test: /\.[jt]s$/,
        /**
         * Exclude `node_modules` except the ones that need transpiling for IE11 compatibility.
         * Run `$ npx are-you-es5 check . -r` to get a list of those modules.
         */
        exclude: '/node_modules',
        use: {
          loader: 'babel-loader',
          options: Object.assign({}, babelConfig, {
            compact: false,
            cacheDirectory: true,
          }),
        },
      }
    ],
  }
};
