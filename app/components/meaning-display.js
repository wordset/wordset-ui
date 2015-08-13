import Ember from 'ember';

export default Ember.Component.extend({
  notifier: Ember.inject.service(),
  editing: false,
  meaningProposal: null,
  store: Ember.computed.alias("targetObject.store"),
  canEdit: Ember.computed("model.hasProposal", function() {
    return !this.get("meaning").get("hasProposal");
  }),
  hasOpenProposal: Ember.computed("model.hasProposal", "openProposal", "openProposal.state", function() {
    return this.get("meaning.hasProposal") && (this.get("openProposal.state") === "open");
  }),
  displayEdit: Ember.computed("canEdit", "editing", function() {
    return (this.get("canEdit") &&
            this.get("editing") &&
            !this.get("meaning.hasProposal"));
  }),
  actions: {
    startEditing() {
      if(this.session.get("isAuthenticated")) {
        this.set("meaningProposal", this.get("store").createRecord("proposal", {
          meaning: this.get("meaning"),
          def: this.get("meaning.def"),
          example: this.get("meaning.example"),
          lang: this.get("meaning.wordset.lang"),
        }));
        this.get("meaningProposal.labels").addObjects(this.get("meaning.labels"));
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
