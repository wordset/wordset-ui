import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {

  showError: false,

  actions: {
    showErrors() {
      this.set("showError", true);
    },
    sendAction() {
      this.sendAction();
    }
  }

});
