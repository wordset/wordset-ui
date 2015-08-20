import Ember from 'ember';
import ENV from '../config/environment';
/* global ga */

export default Ember.Service.extend({
  log(category, name) {
    if(ENV.environment === "production") {
      Ember.run(function() {
        ga('send', 'event', category, name);
      });
    }
  },
});
