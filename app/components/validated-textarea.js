import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {

  showError: false,
  placeholder: "",

  anyErrors: Ember.computed("errors", function() {
    if(Ember.isEmpty(this.get("errors"))) {
      return false;
    } else {
      return true;
    }
  }),

  actions: {
    showErrors() {
      this.set("showError", true);
    },
  }
});
