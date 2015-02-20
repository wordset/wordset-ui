import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from '../../config/environment.js';

export default Ember.Controller.extend( EmberValidations.Mixin, {
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
          _this.flash.notice("Go check email!");
        });
    },
  },
});
