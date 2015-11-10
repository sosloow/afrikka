module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: [
      'jspm',
      'mocha',
      'chai-as-promised',
      'sinon-chai'
    ],

    jspm: {
      useBundles: true,
      config: 'src/config.js',
      loadFiles: ['spec/**/*-spec.js'],
      serveFiles: [
        'src/js/**/*.js',
        'spec/fixtures/*.js'],
      packages: 'src/lib'
    },

    proxies: {
      '/spec/': '/base/spec/',
      '/lib/': '/base/src/lib/',
      '/src/': '/base/src/'
    },

    exclude: [],

    preprocessors: {},

    reporters: ['mocha'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: [
      'PhantomJS2'
    ],

    singleRun: true
  });
};
