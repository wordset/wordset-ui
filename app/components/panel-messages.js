import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from '../config/environment';

export default Ember.Component.extend(EmberValidations, {
  notifier: Ember.inject.service(),
  pusher: Ember.inject.service(),
  currentUser: Ember.computed.alias('controllers.application.currentUser'),

  showUsers: false,
  showSettings: false,
  messageList: function() {
    return this.get("messages").sortBy("createdAt");
  }.property("messages.@each"),
  onlineUsers: function() {
    return this.get("pusher.online");
  }.property("pusher.online.@each"),
  validations: {
    text: {
      presence: true,
      length: { minimum: 1, maximum: 255 },
    },
  },
  init: function() {
    this._super();
    if(localStorage.notificationsEnabled) {
      this.set("notificationsEnabled", JSON.parse(localStorage.notificationsEnabled));
    }
  },
  actions: {
    submitMessage: function() {
      if(this.get("isValid")) {
        this.tracker.log("messages", "sentchat");
        Ember.$.post(ENV.api + "/messages", {
          message: {
            text: this.get("text"),
            path: document.location.pathname
          },
        });
      }
      this.set("text", "");
    },
    toggleUsers: function() { this.toggleProperty("showUsers"); },
    toggleSettings: function() { this.toggleProperty("showSettings"); },
    enableNotifications: function() {
      var _this = this;
      Notification.requestPermission(function(result) {
        if(result === "granted") {
          _this.set("notificationsEnabled", true);
          _this.tracker.log("notifications", "enabled");
          _this.get("notifier").show("We'll let you know when someone messages", {name: "Alert"});
          localStorage.notificationsEnabled = true;
        } else {
          _this.get("notifier").show("We can't notify because you said no. :(", {name: "Alert"});
        }
      });
    },
    disableNotifications: function() {
      this.set("notificationsEnabled", false);
      this.tracker.log("notifications", "disabled");
      localStorage.notificationsEnabled = false;
      this.get("notifier").show("Notifications disabled", {name: "Alert"});
    },
  }
});
