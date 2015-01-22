// app/initializers/custom-session.js
import Session from 'simple-auth/session';

export default {
  name: 'custom-session',
  before: 'simple-auth',
  initialize: function(app, container) {
    Session.reopen({
      setCurrentUser: function() {

        var id = this.get('username'),
        self = this;

        if (!Ember.isEmpty(id)) {
          return this.container.lookup('store:main').find('user', id)
            .then(function(user) {
              self.set('currentUser', user);
            });
        }
      }.observes('user_id')
    });
  }
}
