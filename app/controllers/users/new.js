import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend( EmberValidations.Mixin, {
  notifier: Ember.inject.service(),
  validations: {
    "model.id": {
      presence: true,
      length: { minimum: 1,
                maximum: 16 }
    },
    "model.email": {
      presence: true,
      length: { minimum: 10 },
      format: { with: /^\S+@\S+\.\S+$/,
                message: "must be a valid e-mail"}
    },
    "model.password": {
      presence: true,
      length: { minimum: 8 },
      confirmation: true,
    },
    "model.acceptTos": {
      acceptance: true,
    }
  },
  actions: {
    register: function() {
      var _this = this;
      this.get("model").save().then(function(){
        _this.get("notifier").show('Welcome! Now just log in to begin!', {type: "Success"});
        _this.transitionToRoute('users.login');
        _this.send("log", "account", "register");
      }, function(resp) {
        // Couldn't save, do nothing about it.
        _this.set("isError", true);
        resp.errors.id = resp.errors;
        _this.set("errors", resp.errors);
        _this.get("notifier").show('Oops! Looks like something was amiss.', {name: "Alert"});
      });
    }
  }
});
