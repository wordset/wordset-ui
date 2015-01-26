import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    submitSuggestion: function(model, reason, ok, error) {
      var _this = this;
      var suggestion = this.store.createRecord("suggestion", {
        reason: reason,
        user: this.session.get("currentUser"),
      });
      suggestion.changeModel(model);
      suggestion.save().then(function(sug) {
        ok(sug);
      },
      function(errors) {
        _this.flash.notice(errors.message);
        error(errors);
      });
    }
  }
});
