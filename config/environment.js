/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'wordset',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    apiPrefix: 'api/v1',
    langs: ['en'],

    posList: ["adv", "adj", "verb", "noun", "conj", "pronoun", "prep", "intj"],

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
      'script-src': "'self' 'unsafe-inline' https://www.google-analytics.com https://cdn.mxpnl.com https://stats.pusher.com https://js-agent.newrelic.com https://bam.nr-data.net",
      'font-src': "'self'",
      'connect-src': "'self' https://api.wordset.org https://bam.nr-data.net https://api.mixpanel.com wss://ws.pusherapp.com",
      'img-src': "'self' https://bam.nr-data.net https://stats.g.doubleclick.net https://www.google-analytics.com https://secure.gravatar.com",
      'style-src': "'self' 'unsafe-inline'",
      'media-src': "'self'"
    },
    "simple-auth": {
      store: 'simple-auth-session-store:local-storage',
      authorizer: 'authorizer:api',
      session: 'session:user',
      crossOriginWhitelist: ['https://api.wordset.org', 'http://localhost:3000'],
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.apiHost = 'http://localhost:3000';
    ENV.contentSecurityPolicy['connect-src'] += " http://localhost:3000 ws://127.0.0.1:* http://api.mixpanel.com ws://ws.pusherapp.com";
    ENV.contentSecurityPolicy['script-src'] += "  http://stats.pusher.com http://js-agent.newrelic.com http://bam.nr-data.net";
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
      key: '981cd5a1b0a2a518c814',
    };
  }

  ENV.api = ENV.apiHost + "/" + ENV.apiPrefix;

  return ENV;
};
