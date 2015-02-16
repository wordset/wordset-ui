import Ember from "ember";

export default Ember.ArrayController.extend({
  needs: [ "proposal", "application" ],
  proposal: Ember.computed.alias("controllers.proposal"),
  isOpen: Ember.computed.alias("controllers.proposal.isOpen"),
  currentUser: Ember.computed.alias("controllers.application.session.currentUser"),
  myVote: function() {
    return this.get("model").findBy("user", this.get("currentUser"));
  }.property("model.@each.user", "currentUser"),
  actions: {
    voteYae: function() {
      this.get("registerVote")(this, true, false);
    },
    voteNay: function() {
      this.get("registerVote")(this, false, false);
    },
    voteFlag: function() {
      this.get("registerVote")(this, false, true);
    },
  },
  registerVote: function(_this, yae, flagged) {
    var p = _this.get("proposal").get("model");
    var v = _this.store.createRecord("vote", {
      proposal: p,
      yae: yae,
      flagged: flagged,
      comment: _this.get("comment")
    });
    v.save().then(function() {
      p.reload();
    }, function() {
      v.deleteRecord();
      p.reload();
      _this.flash.notice("We were unable to accept your vote.");
    });
  }
});
