import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submitSuggestion: function(model, reason, ok, error) {
      this.sendAction("action", model, reason, ok, error);
    }
  }
});
