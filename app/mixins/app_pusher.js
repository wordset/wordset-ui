import Ember from 'ember';
import ENV from '../config/environment';
import { Bindings } from 'ember-pusher/bindings';

// used by the Application controller

export default Ember.Mixin.create(Bindings, {
  logPusherEvents: (ENV.environment === "development"),
  PUSHER_SUBSCRIPTIONS: {
    activities: ["push"]
  },
  userChannel: function() {
    console.log(this.get("session.username"));
  }.property("session.username"),
  subscribeToMyChannel: function() {
    var channelName = this.get("username") + '_channel';
    this.pusher.wire(this, channelName, ['notify']);
  }.observes("userChannel"),
  init: function() {
    this._super();
    this.subscribeToMyChannel();
  },
  actions: {
    push: function(data) {
      this.store.pushPayload('activity', data);
    },
    notify: function(data) {
      this.store.pushPayload('notification', data);
      var activity = data.activities[0];
      Ember.$.post(ENV.api + "/notifications/" + data.notification.id + "/ack");
      switch (activity.type) {
        case "ProposalComment":
          this.get("notifier").show("On your proposal for " + activity.wordId, {name: "New Comment", route: ["proposal.index", activity.proposalId]});
          break;
        case "ProposalClosed":
          this.get("notifier").show("Your proposal for " + activity.wordId + " was " + activity.finalState, {name: "Proposal", route: ["proposal.index", activity.proposalId]});
          break;
      }

    }
  },
});
