import Ember from 'ember';
import AppPusherMixin from '../mixins/app_pusher';

// global mixpanel //

export default Ember.Controller.extend(AppPusherMixin, {
  showMenu: false,
  notifier: Ember.inject.service(),
  showPanel: false,
  chatReceived: false,
  browserNotifications: [],
  visibilityChangeHup: function() {
    this.hup.to();
  }.observes("visible.now"),
  notifications: function() {
    return this.get("notifier.notifications");
  }.property("notifier.notifications.@each"),
  hasChatAlert: function() {
    return (!this.get("showPanel")) && this.get("chatReceived");
  }.property("showPanel", "chatReceived"),
  clearNotifications: function() {
    if(this.get("visible.now") === true) {
      this.get("browserNotifications").forEach(function(n) {
        n.close();
      });
      this.set("browserNotifications", []);
    }
  }.observes("visible.now"),
  username: function() {
    return this.get("session.username");
  }.property("session.username"),
  currentUser: function() {
    return this.session.get("user");
  }.property("session.user"),
  init: function() {
    this._super();
    if(localStorage.showPanel) {
      this.set("showPanel", JSON.parse(localStorage.showPanel));
    }
  },
  shouldShowBanner: function() {
    return (Ember.isEmpty(this.get("username")) &&
            !(window.location.pathname.indexOf("/users") === 0));
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
    browserNotification: function(title, body, tag) {
      if(this.get("visible.now") === false) {
        var opt = {body: body, tag: tag, icon: "/assets/images/square-logo.png"};
        var n = new Notification(title, opt);
        this.get("browserNotifications").addObject(n);
      }
    },
  }
});
