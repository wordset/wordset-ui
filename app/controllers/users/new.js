import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from '../config/environment';

export default Ember.ObjectController.extend( EmberValidations.Mixin, {
  validations: {
    id: {
      presence: true,
      length: { minimum: 1,
                maximum: 16 }
    },
    email: {
      presence: true,
      length: { minimum: 10 },
      format: { with: /^\S+@\S+\.\S+$/,
                message: "must be a valid e-mail"}
    },
    password: {
      presence: true,
      length: { minimum: 8 },
      confirmation: true,
    },
    acceptTos: {
      acceptance: true,
    }
  },
  actions: {
    register: function() {
      var _this = this;
      this.get("model").save().then(function(){
        _this.flash.success('Welcome! Now just log in to begin!');
        _trackEvent(category, action, opt_label, opt_value, opt_noninteraction)
        _this.transitionToRoute('users.login');
        this.send("log", "account", "register");
      }, function(resp) {
        // Couldn't save, do nothing about it.
        _this.set("isError", true);
        resp.errors.id = resp.errors.username;
        _this.set("errors", resp.errors);
        _this.flash.notice('Oops! Looks like something was amiss.');
      });
    }
  }
});
