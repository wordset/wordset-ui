import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    submitSuggestion: function(model, reason) {
      var suggestion = this.store.createRecord("suggestion", {
        reason: reason,
        user: this.session.get("currentUser"),
      });
      suggestion.changeModel(model);
      suggestion.save();
    }
  }
});
