import Ember from 'ember';
import Base from 'simple-auth/authorizers/base';

export default Base.extend({
  authorize(jqXHR) {
    var bearerKey = this.get("bearerKey");
    if (bearerKey) {
      jqXHR.setRequestHeader('Authorization', bearerKey);
    }
  },
  bearerKey: Ember.computed(
    "session.username",
    "session.content.secure.auth_key",
    "session.isAuthenticated",
    function() {
      var username = this.get('session.username');
      var authKey = this.get('session.content.secure.auth_key');
      if (this.get('session.isAuthenticated') && !Ember.isEmpty(username) && !Ember.isEmpty(authKey)) {
        var authData = username + ':' + authKey;
        return 'Bearer ' + authData;
      } else {
        return false;
      }
    }
  ),
});
