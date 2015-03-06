import Ember from 'ember';
import ENV from '../config/environment';
import VisibilityMixin from '../mixins/visibility.js';
import { Bindings } from 'ember-pusher/bindings';
/* global mixpanel */

export default Ember.Controller.extend(Bindings, VisibilityMixin, {
  logPusherEvents: (ENV.environment === "development"),
  PUSHER_SUBSCRIPTIONS: {
    activities: ["push"]
  },
  showMenu: false,
  showPanel: false,
  wordList: null,
  chatReceived: false,
  notifications: [],
  hasChatAlert: function() {
    return (!this.get("showPanel")) && this.get("chatReceived")
  }.property("showPanel", "chatReceived"),
  isAdmin: function() {
    return this.get("currentUser").get("isAdmin");
  }.property("currentUser"),
  clearNotifications: function() {
    if(this.get("visible") === true) {
      this.get("notifications").forEach(function(n) { n.close() });
      this.set("notifications", []);
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
    };
  },
  actions: {
    toggleMenu: function() {
      this.toggleProperty("showMenu");
    },
    toggleChat: function() {
      this.toggleProperty("showPanel");
      localStorage.showPanel = this.get("showPanel");
      this.set("chatReceived", false);
    },
    notify: function(title, body, tag) {
      if(this.get("visible") === false) {
        var opt = {body: body, tag: tag, icon: "/assets/images/square-logo.png"};
        var n = new Notification(title, opt);
        this.get("notifications").addObject(n)
      }
    },
    push: function(data) {
      this.store.pushPayload('activity', data);
    }
  }
});
