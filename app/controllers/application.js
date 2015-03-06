import Ember from 'ember';
import ENV from '../config/environment';
import VisibilityMixin from '../mixins/visibility.js'
/* global mixpanel */

export default Ember.Controller.extend(VisibilityMixin, {
  showMenu: false,
  showChat: false,
  wordList: null,
  chatReceived: false,
  notifications: [],
  hasChatAlert: function() {
    return (!this.get("showChat")) && this.get("chatReceived")
  }.property("showChat", "chatReceived"),
  isAdmin: function() {
    return this.get("currentUser").get("isAdmin");
  }.property("currentUser"),
  clearNotifications: function() {
    if(this.get("visible") === true) {
      this.get("notifications").forEach(function(n) { n.close() });
      this.set("notifications", []);
    }
  }.observes("visible"),
  currentUser: function() {
    return this.get("session").get("currentUser");
  }.property("session.currentUser"),
  init: function() {
    this._super();
    if(localStorage.showChat) {
      this.set("showChat", JSON.parse(localStorage.showChat));
    };
  },
  actions: {
    toggleMenu: function() {
      this.toggleProperty("showMenu");
    },
    toggleChat: function() {
      this.toggleProperty("showChat");
      localStorage.showChat = this.get("showChat");
      this.set("chatReceived", false);
    },
    notify: function(title, body, tag) {
      if(this.get("visible") === false) {
        var opt = {body: body, tag: tag, icon: "/assets/images/square-logo.png"};
        var n = new Notification(title, opt);
        this.get("notifications").addObject(n)
      }
    },
  }
});
