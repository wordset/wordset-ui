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
      'script-src': "'self' 'unsafe-inline' https://www.google-analytics.com https://stats.pusher.com https://js-agent.newrelic.com https://bam.nr-data.net",
      'font-src': "'self'",
      'connect-src': "'self' https://api.wordset.org https://bam.nr-data.net wss://ws.pusherapp.com",
      'img-src': "'self'  https://api.wordset.org https://bam.nr-data.net https://stats.g.doubleclick.net https://www.google-analytics.com https://secure.gravatar.com",
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
    ENV.pusherConfig = {};
    ENV.apiHost = 'http://localhost:3000';
    ENV.uiHost = 'http://localhost:4200';
    ENV.contentSecurityPolicy['img-src'] += " http://localhost:3000"
    ENV.contentSecurityPolicy['connect-src'] += " http://localhost:3000 ws://127.0.0.1:* ws://ws.pusherapp.com";
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
    ENV.uiHost = 'https://www.wordset.org';
    ENV.apiHost = 'https://api.wordset.org';
    ENV.pusherConfig = {
      key: '89cac67060d4d835fe7c',
      connection: {
        authEndpoint: "https://api.wordset.org/api/v1/auth/pusher_authorization"
      }
    };
  }

  ENV.api = ENV.apiHost + "/" + ENV.apiPrefix;

  return ENV;
};
