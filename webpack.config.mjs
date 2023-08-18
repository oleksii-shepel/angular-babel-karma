import linkerPlugin from '@angular/compiler-cli/linker/babel';
import { readFile } from 'fs/promises';

const babelConfig = JSON.parse(await readFile(new URL('./babel.config.json', import.meta.url)));

export default {
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
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
            plugins: [linkerPlugin],
            compact: false,
            cacheDirectory: true,
          })
        }
      }
    ]
  }
};
