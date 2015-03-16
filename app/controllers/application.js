import Ember from 'ember';
import VisibilityMixin from '../mixins/visibility.js';
import AppPusherMixin from '../mixins/app_pusher.js';

// global mixpanel //

export default Ember.Controller.extend(AppPusherMixin, VisibilityMixin, {
  showMenu: false,
  notifier: Ember.inject.service(),
  showPanel: false,
  chatReceived: false,
  browserNotifications: [],
  notifications: function() {
    return this.get("notifier.notifications");
  }.property("notifier.notifications.@each"),
  hasChatAlert: function() {
    return (!this.get("showPanel")) && this.get("chatReceived");
  }.property("showPanel", "chatReceived"),
  clearNotifications: function() {
    if(this.get("visible") === true) {
      this.get("browserNotifications").forEach(function(n) {
        n.close();
      });
      this.set("browserNotifications", []);
    }
  }.observes("visible"),
  username: function() {
    return this.get("session.username");
  }.property("session.username"),
  currentUser: function() {
    return this.get("session").get("currentUser");
  }.property("session.currentUser"),
  init: function() {
    this._super();
    if(localStorage.showPanel) {
      this.set("showPanel", JSON.parse(localStorage.showPanel));
    }
  },
  actions: {
    toggleMenu: function() {
      this.toggleProperty("showMenu");
    },
    togglePanel: function() {
      this.toggleProperty("showPanel");
      localStorage.showPanel = this.get("showPanel");
      this.set("chatReceived", false);
    },
    browserNotification: function(title, body, tag) {
      if(this.get("visible") === false) {
        var opt = {body: body, tag: tag, icon: "/assets/images/square-logo.png"};
        var n = new Notification(title, opt);
        this.get("browserNotifications").addObject(n);
      }
    },
    showAlert: function() {
      this.get("notifier").show("Showed the menu!", {type: "Alert"});
    }
  }
});
