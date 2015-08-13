import Ember from 'ember';
import ENV from '../config/environment';

export function initialize(container, application) {
  application.inject('controller', 'pusher', 'service:pusher');
  application.inject('component', 'pusher', 'service:pusher');
  application.inject('route', 'pusher', 'service:pusher');
  application.inject('model', 'pusher', 'service:pusher');

  if (typeof application.PUSHER_OPTS === 'undefined') {
    application.deferReadiness();
    ENV.APP.PUSHER_OPTS = new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
          dataType: "json",
          url: (ENV.api + "/auth/pusher_configuration"),
          success(data) {
            application.advanceReadiness();
            resolve(data);
          },
          failure(error) {
            reject(error);
            console.warn("Unable to load pusher configuration in time");
          }
        });
    });
  }
}

export default {
  name: 'pusher-configure',
  initialize: initialize
};
