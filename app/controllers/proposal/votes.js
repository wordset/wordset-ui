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
  canVote: function() {
    return (!this.get("myVote"));
  }.property("myVote"),
  actions: {
    registerVote: function(type) {
      if(this.get("canVote")) {
        var _this = this;
        var p = _this.get("proposal").get("model");
        this.set("justVoted", true);
        Ember.$.post(ENV.api + "/votes", {
          vote: {
            type: type,
            proposal_id: p.get('id'),
          },
        });
        _this.send("randomProposal")
      }
    },
    withdrawVote: function() {
      var _this = this;
      Ember.$.post(ENV.api + "/votes/" + this.get("myVote.id") + "/withdraw",
      {}, function(data) {
        _this.store.pushPayload('proposal', data);
      })
    },
  },


});
