import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
/* global ga */
/* global mixpanel */

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
  notifyMixpanel: function(){
    Ember.run.next(function(){
      path = window.location.href;
      mixpanel.track("pageview", {"url": path });
    });
  }.on('didTransition'),
  actions: {
    willTransition: function() {
      this.controller.set("showMenu", false);
      Ember.$(document).attr('title', 'Wordset – the Collaborative Dictionary');
    }
  }
});
