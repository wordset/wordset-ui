import Ember from 'ember';

export default Ember.ObjectController.extend({
  notifier: Ember.inject.service(),
  editing: false,
  meaningProposal: null,
  canEdit: function() {
    return !this.get("model").get("hasProposal");
  }.property("model.hasProposal"),
  hasOpenProposal: function() {
    return this.get("model.hasProposal") && (this.get("openProposal.state") === "open");
  }.property("model.hasProposal", "openProposal", "openProposal.state"),
  displayEdit: function() {
    return (this.get("canEdit") &&
            this.get("editing") &&
            !this.get("model.hasProposal"));
  }.property("canEdit", "editing"),
  actions: {
    startEditing: function() {
      if(this.get("session").get("isAuthenticated")) {
        this.set("meaningProposal", this.store.createRecord("proposal", {
          meaning: this.get("model"),
          def: this.get("model.def"),
          example: this.get("model.example"),
        }));
        this.set("editing", true);
      } else {
        this.get("notifier").show("You must login to propose changes!", {type: "Alert"});
      }
    },
    cancel: function() {
      this.get("meaningProposal").destroy();
      this.set("editing", false);
    }
  }
});
