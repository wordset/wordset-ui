import Ember from 'ember';

export default Ember.ObjectController.extend({
  errors: [],
  canEdit: function() {
    return !this.get("model").get("hasProposal");
  }.property("hasProposal"),
  displayEdit: function() {
    return (this.get("canEdit") &&
            this.get("editing") &&
            !this.get("hasProposal"));
  }.property("canEdit", "editing", "hasProposal"),
  actions: {
    submitProposal: function() {
      var _this = this;
      var proposal = this.get("proposal");
      if(!proposal) {
        proposal = this.store.createRecord("proposal");
        this.set("proposal", proposal);
      }
      proposal.set("reason", this.get("reason"));
      proposal.set("meaning", this.get("model"));
      proposal.set("def", this.get("def"));
      proposal.set("example", this.get("example"));
      proposal.set("type", "MeaningChange");

      proposal.save().then(function(proposal) {
        _this.set("hasProposal", proposal);
        _this.set("errors", []);
      },
      function(errors) {
        _this.set("errors", errors.errors);
      });
    },
    startEditing: function() {
      console.log("Start editing");
      if(this.get("session").get("isAuthenticated")) {
        this.set("editing", true);
      } else {
        this.flash.notice("You must login to propose changes!")
      }

    },
    cancel: function() {
      this.get("model").rollback();
      this.set("errors", []);
      this.set("editing", false);
    }
  }
});
