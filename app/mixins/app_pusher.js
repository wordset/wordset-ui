import Ember from 'ember';
import ENV from '../config/environment';

// used by the Application controller

export default Ember.Mixin.create({
  actions: {
    notify(data) {
      this.store.pushPayload('notification', data);
      console.log("Notify is running")
      var activity = data.activities[0];
      Ember.$.post(ENV.api + "/notifications/" + data.notification.id + "/ack");
      switch (activity.type) {
        case "proposal-comment":
          this.get("notifier").show("On your proposal for " + activity.word_name, {name: "New Comment", route: ["proposal", activity.proposal_id]});
          break;
        case "proposal-closed":
          this.get("notifier").show("Your proposal for " + activity.word_name + " was " + activity.finalState, {name: "Proposal", route: ["proposal", activity.proposal_id]});
          break;
        case "user-badge":
          this.send('openModal', 'new-badge', data);
      }

    }
  },
});
