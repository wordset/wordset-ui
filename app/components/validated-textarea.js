import Ember from 'ember';

export default Ember.Component.extend({

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
