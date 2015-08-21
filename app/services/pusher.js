import Ember from 'ember';
import ENV from '../config/environment';
/* global Pusher */

export default Ember.Service.extend({
  store: Ember.inject.service(),
  browserNotifier: Ember.inject.service(),
  search: Ember.inject.service(),
  session: Ember.inject.service(),
  chatReceived: false,
  connection: null,
  online: [],
  connect(configPromise) {
    var _this = this;
    configPromise.then(function(config) {
      var conn = new Pusher(config.key, config.connection);
      _this.public = conn.subscribe('public');
      _this.public.bind('push', (data) => _this.handlePayload(data));
      _this.public.bind('reload', (data) => _this.handleReload(data));
      _this.set("connection", conn);
    }, function(err) {
      console.warn("Error configuring pusher", err);
    })
  },
  connectPrivateChannel: Ember.observer("session.username", "connection", function() {
    var conn = this.get('connection');
    if(conn) {
      if(this.privateChannel) {
        this.connection.unsubscribe(this.privateChannel.channelName);
      }
      if(this.presenceChannel) {
        this.connection.unsubscribe(this.presenceChannel.channelName);
      }
      if(this.get("session.username")) {
        var authorizer = this.container.lookup('authorizer:api');
        conn.config.auth = {
          headers: {
            Authorization: authorizer.get("bearerKey")
          }
        };
        this.privateChannel = conn.subscribe('private-' + this.get("session.username"));
        this.privateChannel.bind('push', (data) => this.handlePayload(data));
        this.privateChannel.bind('notify', (data) => this.handleNotification(data));
        this.presenceChannel = this.connection.subscribe('presence-en');
        this.presenceChannel.bind('pusher:subscription_succeeded', (members) => this.set('online', Object.keys(members.members)));
        this.presenceChannel.bind('pusher:member_added', (member) => this.get("online").addObject(member.id));
        this.presenceChannel.bind('pusher:member_removed', (member) => this.get("online").removeObject(member.id));
      }
    }
  }),
  handlePayload(data) {
    if(data.meta) {
      delete data.meta;
    }
    this.get("store").pushPayload(data);
    if(data.message) {
      this.handleMessage(data.message);
    }
  },
  handleReload(data) {
    if(data.target === "search") {
      this.get("search").send("load", data.lang);
    } else if(data.target === "model") {
      var model = this.get("store").peekRecord(data.type, data.id);
      if(model) {
        model.reload();
      }
    }
  },
  handleNotification(data) {
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
  handleMessage(message) {
    if(localStorage.notificationsEnabled === "true") {
      this.get("browserNotifier").newMessage(message);
    }
    this.set("chatReceived", true);
  }

});
