import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {

  showError: false,
  placeholder: "",

  anyErrors: Ember.computed("errors", function() {
    if(this.get("errors").length > 0) {
      return true;
    } else {
      return false;
    }
  }),

  actions: {
    showErrors() {
      this.set("showError", true);
    },
  }
});
