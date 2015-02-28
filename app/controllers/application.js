import Ember from 'ember';
import ENV from '../config/environment';
import VisibilityMixin from '../mixins/visibility.js'
/* global mixpanel */

export default Ember.Controller.extend(VisibilityMixin, {
  showMenu: false,
  showChat: false,
  wordList: null,
  chatReceived: false,
  hasChatAlert: function() {
    return (!this.get("showChat")) && this.get("chatReceived")
  }.property("showChat", "chatReceived"),
  isAdmin: function() {
    return this.get("currentUser").get("isAdmin");
  }.property("currentUser"),
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
        new Notification(title, {body: body, tag: tag, icon: "/assets/images/square-logo.png"})
      }
    },
    log: function(name) {
      var metaData = {"url": window.location.pathname, "user": this.get("currentUser").get("id")};
      if(ENV.environment === "production") {
        mixpanel.track(name, metaData);
      } else {
        console.log(name, metaData);
      }
    }
  }
});
