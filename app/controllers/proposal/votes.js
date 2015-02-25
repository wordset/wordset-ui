import Ember from "ember";
import ENV from '../../config/environment';

export default Ember.ArrayController.extend({
  needs: [ "proposal", "application" ],
  proposal: Ember.computed.alias("controllers.proposal"),
  isOpen: Ember.computed.alias("controllers.proposal.isOpen"),
  currentUser: Ember.computed.alias("controllers.application.session.currentUser"),
  myVote: function() {
    return this.get("model").filterBy("usurped", false).filterBy("withdrawn", false).findBy("user", this.get("currentUser"));
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
    withdrawVote: function() {
      var _this = this;
      Ember.$.post(ENV.api + "/votes/" + this.get("myVote.id") + "/withdraw",
      {}, function(data) {
        _this.store.pushPayload('proposal', data);
      })
    },
  },

  registerVote: function(_this, yae, flagged) {
    var p = _this.get("proposal").get("model");
    _this.send("log", "vote");
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
