import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
  authenticator: 'authenticator:api',
  actions: {
    authenticate: function() {
      var _this = this;
      this._super().then(function() {
        _this.send("log", "account", "login");
        location.reload();
      }, function() {
        _this.set('errorMessage', 'Invalid username and password');
      });
    }
  }
});
