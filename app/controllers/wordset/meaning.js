import Ember from 'ember';

export default Ember.Controller.extend({
  notifier: Ember.inject.service(),
  editing: false,
  meaningProposal: null,
  canEdit: Ember.computed("model.hasProposal", function() {
    return !this.get("model").get("hasProposal");
  }),
  hasOpenProposal: Ember.computed("model.hasProposal", "openProposal", "openProposal.state", function() {
    return this.get("model.hasProposal") && (this.get("openProposal.state") === "open");
  }),
  displayEdit: Ember.computed("canEdit", "editing", function() {
    return (this.get("canEdit") &&
            this.get("editing") &&
            !this.get("model.hasProposal"));
  }),
  actions: {
    startEditing() {
      if(this.get("session").get("isAuthenticated")) {
        this.set("meaningProposal", this.store.createRecord('proposal', {
          meaning: this.get("model"),
          def: this.get("model.def"),
          example: this.get("model.example"),
        }));
        this.set("editing", true);
      } else {
        this.get("notifier").show("You must login to propose changes!", {name: "Alert"});
      }
    },
    cancel() {
      this.get("meaningProposal").destroy();
      this.set("editing", false);
    }
  }
});
