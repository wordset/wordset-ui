import Ember from 'ember';

export default Ember.Component.extend({

  showError: false,
  placeholder: "",

  actions: {
    showErrors: function() {
      this.set("showError", true);
    }
  }
});
