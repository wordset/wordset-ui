import Ember from 'ember';
import ENV from '../config/environment';
/* global Pusher */

export default Ember.Service.extend({
  store: Ember.inject.service(),
  browserNotifier: Ember.inject.service(),
  connection: null,
  online: [],
  init: function() {
    var key = ENV.APP.PUSHER_OPTS.key;

    if(typeof key === 'undefined') {
      var _this = this;
      Ember.$.ajax({
        dataType: "json",
        url: (ENV.api + "/auth/pusher_configuration"),
        success: function(data) {
          _this.connect(data.key, data.connection);
        },
        failure: function(error) {
          console.warn("Unable to load pusher configuration in time", error);
        }
      });
    } else {
      this.connect(ENV.APP.PUSHER_OPTS.key, ENV.APP.PUSHER_OPTS.connection);
    }
  },
  connect: function(key, options) {
    var conn = new Pusher(key, options);
    this.set("connection", conn);
    this.public = conn.subscribe('public');
    var _this = this;
    this.public.bind('push', (data) => this.handlePayload(data));
    console.log("session", this.get("session"));
  },
  connectPrivateChannel: function() {
    var conn = this.get('connection');
    if(conn) {
      if(this.privateChannel) {
        this.connection.unsubscribe(privateChannel.channelName);
      }
      if(this.presenceChannel) {
        this.connection.unsubscribe(presenceChannel.channelName);
      }
      if(this.get("username")) {
        var authorizer = this.container.lookup('authorizer:api');
        conn.config.auth = {
          headers: {
            Authorization: authorizer.get("bearerKey")
          }
        };
        var _this = this;
        this.privateChannel = conn.subscribe('private-' + this.get("username"));
        this.privateChannel.bind('push', (data) => this.handlePayload(data));
        this.privateChannel.bind('notify', (data) => this.handleNotification(data));
        this.presenceChannel = this.connection.subscribe('presence-en');
        this.presenceChannel.bind('pusher:subscription_succeeded', (members) => this.set('online', Object.keys(members.members)));
        this.presenceChannel.bind('pusher:member_added', (member) => this.get("online").addObject(member.id));
        this.presenceChannel.bind('pusher:member_removed', (member) => this.get("online").removeObject(member.id));
      }
    }
  }.observes("username", "connection"),
  handlePayload: function(data) {
    if(data.meta) {
      delete data.meta
    }
    this.get("store").pushPayload(data);
    if(data.message) {
      this.handleMessage(data.message);
    }
  },
  handleNotification: function(data) {
    this.handlePayload(data);
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
  },
  handleMessage: function(message) {
    if(localStorage.notificationsEnabled === "true") {
      this.get("browserNotifier").newMessage(message);
    }
  }

});
