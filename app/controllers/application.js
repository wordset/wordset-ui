import Ember from 'ember';
import AppPusherMixin from '../mixins/app_pusher';

// global mixpanel //

export default Ember.Controller.extend(AppPusherMixin, {
  showMenu: false,
  notifier: Ember.inject.service(),
  showPanel: false,
  chatReceived: Ember.computed.alias('pusher.chatReceived'),
  notifications: Ember.computed("notifier.notifications.[]", function() {
    return this.get("notifier.notifications");
  }),
  hasChatAlert: Ember.computed("showPanel", "chatReceived", function() {
    return (!this.get("showPanel")) && this.get("chatReceived");
  }),
  username: Ember.computed("session.username", function() {
    return this.get("session.username");
  }),
  connectToPusher: Ember.observer("username", function() { // THIS IS SO SHITTY
    this.pusher.set("username", this.get("username"));
  }),
  currentUser: Ember.computed("session.user", function() {
    return this.session.get("user");
  }),
  mobileMaxWidth: 550,
  init() {
    this._super();
    if (window.innerWidth < this.get('mobileMaxWidth')) {
      localStorage.showPanel = false
    } else if(localStorage.showPanel) {
      this.set("showPanel", JSON.parse(localStorage.showPanel));
    }
  },
  shouldShowBanner: Ember.computed("username", "currentPath", function() {
    return (Ember.isEmpty(this.get("username")) &&
            (window.location.pathname.indexOf("/users") !== 0));
  }),
  currentPathDidChange: function() {
    if (this.get("showPanel") && window.innerWidth < this.get('mobileMaxWidth')) {
      this.set("showPanel", false);
      localStorage.showPanel = false;
      this.set("chatReceived", false);
    }
  }.observes('currentPath'),
  actions: {
    toggleMenu() {
      this.tracker.log("nav", "menu_click");
      this.toggleProperty("showMenu");
    },
    togglePanel() {
      this.tracker.log("nav", "chat_click");
      this.toggleProperty("showPanel");
      localStorage.showPanel = this.get("showPanel");
      this.set("chatReceived", false);
    },
  }
});
