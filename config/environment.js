/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'wordset',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    apiPrefix: 'api/v1',

    posList: ["adv", "adj", "verb", "noun", "conj", "pronoun", "prep"],

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {

    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' https://www.google-analytics.com https://cdn.mxpnl.com https://stats.pusher.com",
      'font-src': "'self'",
      'connect-src': "'self' https://api.wordset.org https://api.mixpanel.com wss://ws.pusherapp.com",
      'img-src': "'self' https://www.google-analytics.com https://secure.gravatar.com",
      'style-src': "'self' 'unsafe-inline'",
      'media-src': "'self'"
    },
    "simple-auth": {
      store: 'simple-auth-session-store:local-storage',
      authorizer: 'authorizer:api',
      crossOriginWhitelist: ['http://api.wordset.org', 'http://localhost:3000'],

    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.apiHost = 'http://localhost:3000';
    ENV.APP.PUSHER_OPTS = {
      key: 'e8039c23fe140e473468',
    };
    ENV.contentSecurityPolicy['connect-src'] += " http://localhost:3000 http://api.mixpanel.com ws://ws.pusherapp.com";
    ENV.contentSecurityPolicy['script-src'] += "  http://stats.pusher.com";
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
    ENV.apiHost = 'https://api.wordset.org';
    ENV.APP.PUSHER_OPTS = {
      key: '48d537b460788bef06f4',
    };
  }

  ENV.api = ENV.apiHost + "/" + ENV.apiPrefix;


  return ENV;
};
