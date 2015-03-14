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
      console.log("notified of ", data);
      this.store.pushPayload('notification', data);
    }
  },
});
