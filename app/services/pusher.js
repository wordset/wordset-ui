import Ember from 'ember';
/* global Pusher */

export default Ember.Service.extend({
  store: Ember.inject.service(),
  browserNotifier: Ember.inject.service(),
  notifier: Ember.inject.service(),
  search: Ember.inject.service(),
  chatReceived: false,
  online: [],
  username: null,
  connect(config) {
    var conn = new Pusher(config.key, config.connection);
    this.public = conn.subscribe('public');
    this.public.bind('push', (data) => this.handlePayload(data));
    this.public.bind('reload', (data) => this.handleReload(data));
    this.set("connection", conn);
  },
  connectPrivateChannel: function() {
    var username = this.get("username");
    var conn = this.get('connection');
    if(conn) {
      if(this.privateChannel) {
        conn.unsubscribe(this.privateChannel.channelName);
      }
      if(this.presenceChannel) {
        conn.unsubscribe(this.presenceChannel.channelName);
      }
      if(username) {
        var authorizer = this.container.lookup('authorizer:api');
        conn.config.auth = {
          headers: {
            Authorization: authorizer.get("bearerKey")
          }
        };
        this.privateChannel = conn.subscribe('private-' + username);
        this.privateChannel.bind('push', (data) => this.handlePayload(data));
        this.privateChannel.bind('notify', (data) => this.handleNotification(data));
        this.presenceChannel = conn.subscribe('presence-en');
        this.presenceChannel.bind('pusher:subscription_succeeded', (members) => this.set('online', Object.keys(members.members)));
        this.presenceChannel.bind('pusher:member_added', (member) => this.get("online").addObject(member.id));
        this.presenceChannel.bind('pusher:member_removed', (member) => this.get("online").removeObject(member.id));
      }
    }
  }.observes("connection", "username"),
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
    switch (activity.action) {
      case "proposal-comment":
        this.get("notifier").show("On your proposal for " + activity.word_name, {name: "New Comment", route: ["proposal", activity.proposal_id]});
        break;
      case "proposal-closed":
        this.get("notifier").show("Your proposal for " + activity.word_name + " was " + activity.finalState, {name: "Proposal", route: ["proposal", activity.proposal_id]});
        break;
      case "user-badge":
        this.container.lookup("router:main").send('openModal', 'new-badge', data);
    }
  },
  handleMessage(message) {
    if(localStorage.notificationsEnabled === "true") {
      this.get("browserNotifier").newMessage(message);
    }
    this.set("chatReceived", true);
  }

});
