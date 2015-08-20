import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["validated-input"],
  showError: false,

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
    sendAction() {
      this.sendAction();
    }
  }

});
