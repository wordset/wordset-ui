import Session from 'simple-auth/session';
import Ember from 'ember';

export default Session.extend({
  pusher: Ember.inject.service(),
  username: Ember.computed.alias("secure.username"),
  user: Ember.computed('secure.username', function() {
    var userId = this.get('secure.username');
    if (!Ember.isEmpty(userId)) {
      return this.container.lookup('service:store').find('user', userId);
    }
  }),
  setupPusher: Ember.observer('username', function() {
    if(!Ember.isBlank(this.get("username"))) {
      this.get("pusher").set("username", this.get("username"));
    }
  }),
});
