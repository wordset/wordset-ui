import Ember from 'ember';

export default Ember.Component.extend({

  showError: false,
  placeholder: "",

  anyErrors: function() {
    if(this.get("errors").length > 0) {
      return true;
    } else {
      return false;
    }
  }.property("errors"),

  actions: {
    showErrors: function() {
      this.set("showError", true);
    },
  }
});
