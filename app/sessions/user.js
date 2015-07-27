import Session from 'simple-auth/session';
import Ember from 'ember';

export default Session.extend({
  pusher: Ember.inject.service(),
  user: function() {
    var userId = this.get('username');
    if (!Ember.isEmpty(userId)) {
      return this.container.lookup('store:main').find('user', userId);
    }
  }.property('username'),
  connectToPusher: function() {
    this.set("pusher.username", this.get("username"));
  }.observes('username')
});
