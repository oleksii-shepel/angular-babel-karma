// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    customHeaders: [{
        match: /\.*$/,
        name: 'Cross-Origin-Embedder-Policy',
        value: 'require-corp'
      }, {
        match: /\.*$/,
        name: 'Cross-Origin-Opener-Policy',
        value: 'same-origin'
      }
    ],
    frameworks: ['jasmine', '@angular-devkit/build-angular', 'webpack'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-webpack'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    preprocessors: {
      './src/**/*.ts': ['webpack']
    },

    webpack: {
      resolve: {
        extensions: [ '.js', '.ts' ]
      },
      module: {
        rules: [
          {
            test: /\.[jt]s$/,
            /**
             * Exclude `node_modules` except the ones that need transpiling for IE11 compatibility.
             * Run `$ npx are-you-es5 check . -r` to get a list of those modules.
             */
            exclude: "/node_modules",
            use: {
              loader: "babel-loader",
              options: require('./babel.config.json')
            }
          },
        ]
      },
    },
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/angular-custom-webpack'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['Chrome'],
    restartOnFileChange: true
  });
};
