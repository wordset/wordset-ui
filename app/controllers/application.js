import Ember from 'ember';
import AppPusherMixin from '../mixins/app_pusher';

// global mixpanel //

export default Ember.Controller.extend(AppPusherMixin, {
  showMenu: false,
  notifier: Ember.inject.service(),
  showPanel: false,
  chatReceived: Ember.computed.alias('pusher.chatReceived'),
  notifications: function() {
    return this.get("notifier.notifications");
  }.property("notifier.notifications.@each"),
  hasChatAlert: function() {
    return (!this.get("showPanel")) && this.get("chatReceived");
  }.property("showPanel", "chatReceived"),
  username: function() {
    return this.get("session.username");
  }.property("session.username"),
  connectToPusher: function() { // THIS IS SO SHITTY
    this.pusher.set("username", this.get("username"));
  }.observes("username"),
  currentUser: function() {
    return this.session.get("user");
  }.property("session.user"),
  loggedIn: function() {
    return !Ember.isEmpty(this.get("username"))
  }.property("username"),
  init: function() {
    this._super();
    if(localStorage.showPanel) {
      this.set("showPanel", JSON.parse(localStorage.showPanel));
    }
  },
  shouldShowBanner: function() {
    return (Ember.isEmpty(this.get("username")) &&
            (window.location.pathname.indexOf("/users") !== 0));
  }.property("username", "currentPath"),
  actions: {
    toggleMenu: function() {
      this.send("log", "nav", "menu_click");
      this.toggleProperty("showMenu");
    },
    togglePanel: function() {
      this.send("log", "nav", "chat_click");
      this.toggleProperty("showPanel");
      localStorage.showPanel = this.get("showPanel");
      this.set("chatReceived", false);
    },
  }
});
