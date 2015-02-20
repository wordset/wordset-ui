import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import ENV from '../config/environment';
/* global ga */
/* global mixpanel */

export default Ember.Route.extend(ApplicationRouteMixin).extend({
  activate: function() {
    return this.store.find('word_list');
  },

  actions: {
    willTransition: function() {
      Ember.$(document).attr('title', 'Wordset – the Collaborative Dictionary');
    },
    didTransition: function(paths) {
      this.controller.send("clear");
      this.controller.set("showMenu", false);
      if (ENV.environment === 'production') {
        ga('send', 'pageview', {
          'page': window.location.pathname,
          'title': document.title,
        });
      }
    },
    log: function(name) {
      var metaData = {"url": window.location.pathname, "user": this.get("session").get("username")};
      if(ENV.environment === "production") {
        mixpanel.track(name, metaData);
      } else {
        console.log(name, metaData);
      }
    },
  }
});
