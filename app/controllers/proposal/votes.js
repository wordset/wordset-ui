import Ember from "ember";
import ENV from '../../config/environment';
// global _gaq //

export default Ember.Controller.extend({
  needs: [ "proposal", "application" ],
  proposal: Ember.computed.alias("controllers.proposal.model"),
  isOpen: Ember.computed.alias("controllers.proposal.isOpen"),
  currentUser: Ember.computed.alias("controllers.application.currentUser"),

  canVote: function() {
    return ((this.get("proposal.userVoteIds") || []).indexOf(this.get("currentUser.id")) < 0);
  }.property("proposal.userVoteIds.@each", "currentUser.id"),
  actions: {
    registerVote: function(type) {
      if(this.get("canVote")) {
        var _this = this;
        var p = _this.get("proposal");
        this.set("justVoted", true);
        _this.send("randomProposal", p.get("id"));
        Ember.$.post(ENV.api + "/votes", {
          vote: {
            type: type,
            proposal_id: p.get('id'),
          }
        }).then(function(data) {
          _this.store.pushPayload(data);
          _this.tracker.log("votes", type);
        });

      }
    },
    withdrawVote: function() {
      var _this = this;
      Ember.$.post(ENV.api + "/votes/" + this.get("proposal.id") + "/withdraw",
      {}, function(data) {
        _this.store.pushPayload('proposal', data);
      });
    },
  },


});
