import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from '../../config/environment.js';

export default Ember.Controller.extend( EmberValidations.Mixin, {
  notifier: Ember.inject.service(),
  email: '',
  validations: {
    email: {
      presence: true,
      length: { minimum: 4 },
      format: { with: /^\S+@\S+\.\S+$/,
                message: "must be a valid e-mail"}
    },
  },
  actions: {
    submit: function() {
      var _this = this;
      var url = ENV.api + "/users/forgot_password";
      Ember.$.post(url, { email: this.get("email") },
        function() {
          _this.get("notifier").show("You will receive instructions via e-mail", {type: "Forgotten Password"});
        });
    },
  },
});
