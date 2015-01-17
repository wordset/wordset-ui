/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'wordset',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    apiPrefix: '/api/v1',

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self'",
      'font-src': "'self'",
      'connect-src': "'self' http://localhost:3000 http://wordnet-data.herokuapp.com",
      'img-src': "'self'",
      'style-src': "'self'",
      'media-src': "'self'"
    },
    "simple-auth": {
      store: 'simple-auth-session-store:local-storage',
      authorizer: 'authorizer:api',
      crossOriginWhitelist: ['http://api.wordset.org', 'http://localhost:3000']
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.apiHost = 'http://localhost:3000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.apiHost = 'http://wordset-data.herokuapp.com';
  }


  return ENV;
};
