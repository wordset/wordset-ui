
import Ember from 'ember';
/* global moment */

export default Ember.Component.extend({
  messagedAt: function() {
    return moment(this.get("message.createdAt")).fromNow();
  }.property("message.createdAt", "hup.at"),
  actions: {
    goToLink: function() {
      console.log("linked");
      this.get("targetObject").send("log", "messages", "clickedlink");
      this.get("targetObject").transitionToRoute(this.get("message.url"));
    },
  },
});
