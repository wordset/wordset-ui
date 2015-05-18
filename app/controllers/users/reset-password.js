import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from '../../config/environment';

export default Ember.Controller.extend( EmberValidations.Mixin, {
  notifier: Ember.inject.service(),
  queryParams: 'token',
  password: '',
  passwordConfirmation: '',
  validations: {
    password: {
      presence: true,
      length: { minimum: 8 },
      confirmation: true,
    },
  },
  actions: {
    submit: function() {
      var _this = this;
      var url = ENV.api + "/users/reset_password";
      Ember.$.post(url, {
        token: this.get("token"),
        password: this.get("password"),
        password_confirmation: this.get("passwordConfirmation") },
        function(data) {
          _this.get("session").authenticate('authenticator:api', {
            identification: data.username,
            password: _this.get("password"),
          }).then(function() {
            _this.transitionToRoute("index");
            _this.get("notifier").show("Logged in!", {name: "Success"});
            _this.send("log", "account", "resetpassword");
          });
        });
    },
  },
});
