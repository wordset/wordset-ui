import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  isEditing: false,
  showBanner: Ember.computed("session.isAuthenticated", function() {
    return !this.get("session").get("isAuthenticated");
  }),
  altSpellings: Ember.computed("model.wordset.seqs", function() {
    var otherSeqs = this.get("model.wordset.seqs");
    return otherSeqs.rejectBy("id", this.get("model.id"));
  }),
  actions: {
    startEditing() {
      this.set("changeSet", this.get("model.wordset").generateInitialChangeSet());
      this.set("isEditing", true);
    },
    cancel() {
      this.set("isEditing", false);
    },
    submitProposal() {
      var _this = this;
      this.store.createRecord('proposal', {
        wordset: this.get("model.wordset"),
        lang: this.get("model.wordset.lang"),
        changes: this.get("changeSet"),
        reason: this.get("reason"),
      }).save().then((proposal) => {
        _this.transitionTo("proposal.index", proposal.get("id"));
      });
    }
  }
});
