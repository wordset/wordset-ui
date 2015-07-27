import Ember from 'ember';
import ENV from '../config/environment';

// used by the Application controller

export default Ember.Mixin.create({
  subscribeToMyChannel: function() {
    var channelName = this.get("username") + '_channel';
    //this.pusher.wire(this, channelName, ['notify']);
  }.observes("userChannel"),
  init: function() {
    this._super();
    this.subscribeToMyChannel();
  },
  actions: {
    notify: function(data) {
      this.store.pushPayload('notification', data);
      var activity = data.activities[0];
      Ember.$.post(ENV.api + "/notifications/" + data.notification.id + "/ack");
      switch (activity.type) {
        case "ProposalComment":
          this.get("notifier").show("On your proposal for " + activity.wordName, {name: "New Comment", route: ["proposal.index", activity.proposalId]});
          break;
        case "ProposalClosed":
          this.get("notifier").show("Your proposal for " + activity.wordName + " was " + activity.finalState, {name: "Proposal", route: ["proposal.index", activity.proposalId]});
          break;
        case "UserBadge":
          this.send('openModal', 'new-badge', data);
      }

    }
  },
});
