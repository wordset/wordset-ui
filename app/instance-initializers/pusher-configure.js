import Ember from 'ember';
import ENV from '../config/environment';

export function initialize(application) {
  application.container.lookup("service:pusher").connect(
    new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        dataType: "json",
        url: (ENV.api + "/auth/pusher_configuration"),
        success(data) {
          resolve(data);
        },
        failure(error) {
          reject(error);
          console.warn("Unable to load pusher configuration in time");
        }
      });
    }));
}

export default {
  name: 'pusher-configure',
  initialize: initialize
};
