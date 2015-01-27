import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    submitProposal: function(model, reason, ok, error) {
      var _this = this;
      var proposal = this.store.createRecord("proposal", {
        reason: reason,
        user: this.session.get("currentUser"),
      });
      proposal.changeModel(model);
      proposal.save().then(function(sug) {
        ok(sug);
      },
      function(errors) {
        _this.flash.notice(errors.message);
        error(errors);
      });
    }
  }
});
