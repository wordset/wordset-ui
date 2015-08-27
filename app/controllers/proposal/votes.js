import Ember from "ember";
import ENV from '../../config/environment';
// global _gaq //

export default Ember.Controller.extend({
  proposalController: Ember.inject.controller("proposal"),
  proposal: Ember.computed.alias("proposalController.model"),
  isOpen: Ember.computed.alias("proposalController.isOpen"),
  currentUser: Ember.computed.alias("session.user"),

  canVote: Ember.computed("proposal.userVoteIds.[]", "currentUser.id", function() {
    return ((this.get("proposal.userVoteIds") || []).indexOf(this.get("currentUser.id")) < 0);
  }),
  actions: {
    registerVote(type) {
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
    withdrawVote() {
      var _this = this;
      Ember.$.post(ENV.api + "/votes/" + this.get("proposal.id") + "/withdraw",
      {}, function(data) {
        _this.store.pushPayload('proposal', data);
      });
    },
    randomWord() {
      this.transitionToRoute('words.random', "en");
    },
  },


});
