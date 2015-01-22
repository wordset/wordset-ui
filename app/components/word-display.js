import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submitSuggestion: function(model, reason) {
      this.sendAction("action", model, reason);
    }
  }
});
