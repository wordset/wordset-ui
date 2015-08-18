import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  showBanner: Ember.computed("session.isAuthenticated", function() {
    return !this.get("session").get("isAuthenticated");
  }),
  actions: {
    startEditing() {
      this.set("isEditing", true);
      this.set("changeSet", this.get("model.wordset").generateInitialChangeSet());
    },
    cancel() {
      this.set("isEditing", false);
    },
    submitProposal() {
      var _this = this;
      this.store.createRecord('proposal', {
        wordset: this.get("model.wordset"),
        lang: this.get("model.wordset.lang"),
        changes: this.get("changeSet")
      }).save().then((proposal) => {
        _this.transitionTo("proposal.index", proposal.get("id"));
      });
    }
  }
});
