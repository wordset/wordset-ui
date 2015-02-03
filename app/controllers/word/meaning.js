import Ember from 'ember';

export default Ember.ObjectController.extend({
  errors: [],
  canEdit: function() {
    return !this.get("model").get("hasProposal")
  }.property("hasProposal"),
  displayEdit: function() {
    return (this.get("canEdit") &&
            this.get("editing") &&
            !this.get("hasProposal"));
  }.property("canEdit", "editing", "hasProposal"),
  actions: {
    submitProposal: function() {
      var _this = this;
      var proposal = this.store.createRecord("proposal", {
        reason: this.get("reason"),
        user: this.session.get("currentUser"),
      });
      proposal.changeModel(this.get("model"));
      proposal.save().then(function(sug) {
        _this.set("hasProposal", true);
        _this.set("errors", []);
      },
      function(errors) {
        _this.set("errors", errors.errors);
      });
    },
    startEditing: function() {
      console.log("Start editing");
      this.set("editing", true);
    },
    cancel: function() {
      this.get("model").rollback();
      this.set("errors", []);
      this.set("editing", false);
    }
  }
});
