import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
/* global ga */

export default Ember.Route.extend(ApplicationRouteMixin).extend({
  activate: function() {
    return this.store.find('word_list');
  },
  notifyGoogleAnalytics: function() {
    return ga('send', 'pageview', {
      'page': this.get('url'),
      'title': this.get('url')
    });
  }.on('didTransition'),
  actions: {
    willTransition: function() {
      this.controller.set("showMenu", false);
    }
  },
  afterModel: function(model) {
    Ember.$(document).attr('title', 'Wordset');
  }
});
