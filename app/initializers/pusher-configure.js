import Ember from 'ember';
import ENV from '../config/environment.js';

export function initialize(container, application) {
  if (typeof application.PUSHER_OPTS === 'undefined') {
    application.deferReadiness();
    ENV.APP.PUSHER_OPTS = new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
          dataType: "json",
          url: (ENV.api + "/auth/pusher_configuration"),
          success: function(data) {
            application.advanceReadiness();
            resolve(data);
          },
          failure: function(error) {
            reject(error);
            console.warn("Unable to load pusher configuration in time")
          }
        });
    });
    console.log()
  }
}

export default {
  name: 'pusher-configure',
  before: 'pusher',
  initialize: initialize
};
