import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
  authenticator: 'authenticator:api',
  actions: {
    authenticate: function() {
      var _this = this;
      this._super().then(function() {
        _this.send("log", "account", "login");
        var previousTransition = _this.get("previousTransition");
        if(previousTransition) {
          previousTransition.retry();
          return;
        }
        _this.transitionToRoute("index");
      }, function() {
        _this.set('errorMessage', 'Invalid username and password');
      });
    }
  }
});
