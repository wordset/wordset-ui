import Ember from 'ember';
import ENV from '../config/environment';

export function initialize(application) {
  var pusher = application.container.lookup("service:pusher");
  if(ENV.environment === "production") {
    pusher.connect(ENV.pusherConfig);
  } else {
    Ember.$.getJSON(ENV.api + "/auth/pusher_configuration").then(function(config) {
      pusher.connect(config);
    });
  }
}

export default {
  name: 'pusher-configure',
  initialize: initialize
};
