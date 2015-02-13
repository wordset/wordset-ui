import Ember from 'ember';

export default Ember.Component.extend({

  showError: false,

  actions: {
    showErrors: function() {
      console.log("whe")
      this.set("showError", true);
    }
  }

});
