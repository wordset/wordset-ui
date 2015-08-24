import Ember from 'ember';
import ENV from '../config/environment';

// used by the Application controller

export default Ember.Mixin.create({
  actions: {
    notify(data) {
      this.store.pushPayload('notification', data);
      var activity = data.activities[0];
      Ember.$.post(ENV.api + "/notifications/" + data.notification.id + "/ack");
      switch (activity.type) {
        case "ProposalComment":
          this.get("notifier").show("On your proposal for " + activity.wordName, {name: "New Comment", route: ["proposal", activity.proposalId]});
          break;
        case "ProposalClosed":
          this.get("notifier").show("Your proposal for " + activity.wordName + " was " + activity.finalState, {name: "Proposal", route: ["proposal", activity.proposalId]});
          break;
        case "UserBadge":
          this.send('openModal', 'new-badge', data);
      }

    }
  },
});
