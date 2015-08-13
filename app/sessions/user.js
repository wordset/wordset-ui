import Session from 'simple-auth/session';
import Ember from 'ember';

export default Session.extend({
  username: Ember.computed.alias("secure.username"),
  user: function() {
    var userId = this.get('secure.username');
    if (!Ember.isEmpty(userId)) {
      return this.container.lookup('store:main').find('user', userId);
    }
  }.property('secure.username'),
});
