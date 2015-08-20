import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
  authenticator: 'authenticator:api',
  actions: {
    authenticate() {
      var _this = this;
      this._super().then(function() {
        _this.tracker.log("account", "login");
        // This transition to previous route is from http://stackoverflow.com/questions/21122503/emberjs-return-to-current-route-after-login
        var previousTransition = _this.get("previousTransition");
        var previousTarget = _this.get("previousTransition.targetName");
        // This checks to see if the previous target was the
        // registration page; if so, we can assume that the user
        // just registered and should go to the index
        if(previousTarget === "users.new") {
          _this.transitionToRoute("index");
          return;
        } else if(previousTransition) {
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
