import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from '../../config/environment';

export default Ember.Controller.extend(EmberValidations.Mixin, {

  validations: {
    "model.username": {
      presence: true,
      length: {
        minimum: 1,
        maximum: 16,
      },
      format: {
        with: /^\w+$/,
        message: "Only letters and numbers, please!",
      }
    },
    "model.acceptTos": {
      acceptance: true,
    }
  },
  actions: {
    cancel: function() {
      this.notifier.show("Signup cancelled");
      this.transitionToRoute("index");
    },
    submit: function() {
      var _this = this;
      Ember.$.post(ENV.apiHost + "/auth/" + this.get("model.provider") + "/create", this.get("model")).then(
        function(response) {
          _this.get("session").authenticate('authenticator:api', response);
          _this.notifier.show("Welcome to the site! You've successfully registered!");
          _this.transitionToRoute("user", response.username);
        }, function(error) {
          _this.notifier.error("Something went wrong. We've been notified. Please ensure you've filled out all fields");
        }
      );
    }
  }

});
