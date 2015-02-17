import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
/* global ga */
/* global mixpanel */

export default Ember.Route.extend(ApplicationRouteMixin).extend({
  activate: function() {
    return this.store.find('word_list');
  },
  actions: {
    willTransition: function() {
      this.controller.set("showMenu", false);
      Ember.$(document).attr('title', 'Wordset – the Collaborative Dictionary');
    },
    didTransition: function(paths) {
      mixpanel.track("pageview", {"url": window.location.pathname });
      var user = this.get("session").get("username");
      mixpanel.identify(user);
      mixpanel.people.set({
        '$name': user,
      });
      ga('send', 'pageview', {
        'page': window.location.pathname,
        'title': document.title,
      });
    }
  }
});
