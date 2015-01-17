import Ember from 'ember';
import Base from 'simple-auth/authorizers/base';

export default Base.extend({
  authorize: function(jqXHR) {
    var username = this.get('session').get('username');
    var authKey = this.get('session').get('auth_key');
    console.log("set auth key", authKey);
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(username) && !Ember.isEmpty(authKey)) {
      var authData = username + ':' + authKey;
      jqXHR.setRequestHeader('Authorization', 'Bearer ' + authData);
    }
  }
});
