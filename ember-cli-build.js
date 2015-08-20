var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
    var app = new EmberApp(defaults, {
      fingerprint: {
        exclude: ['images/badges']
      },
      autoprefixer: {
        cascade: false
      },
      minifyCSS: {
        enabled: true,
        options: {
          aggressiveMerging: false,
          advanced: false
        }
      }
    });

    app.import("bower_components/jsdiff/diff.js");
    app.import("bower_components/moment/moment.js");
    app.import("bower_components/pusher/dist/pusher.js");

    return app.toTree();
};
