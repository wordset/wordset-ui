import Ember from 'ember';

export default Ember.Component.extend({
  errors: [],
  canEdit: function() {
    return !this.get("meaning").get("locked") &&
            !this.get("locked");
  }.property("meaning", "locked"),
  displayEdit: function() {
    return (this.get("canEdit") &&
            this.get("editing") &&
            !this.get("locked"));
  }.property("canEdit", "editing", "locked"),
  actions: {
    submitSuggestion: function() {
      var _this = this;
      var ok = function() {
        console.log("OKAY!")
        _this.set("locked", true);
        _this.set("errors", []);
      };
      var error = function(errors) {
        _this.set("errors", errors.errors);
      }
      this.sendAction("action", this.get("meaning"), this.get("reason"), ok, error);
    },
    startEditing: function() {
      console.log("Start editing");
      this.set("editing", true);
    },
    cancel: function() {
      this.get("meaning").rollback();
      this.set("errors", []);
      this.set("editing", false);
    }
  }
});
