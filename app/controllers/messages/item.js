import Ember from "ember";

export default Ember.ObjectController.extend({
  isSelf: function() {
    return ("self" === this.get("type"));
  }.property("type"),
  isLink: function() {
    return ("link" === this.get("type"));
  }.property("type"),
  isSay: function() {
    return ("say" === this.get("type"));
  }.property("type"),
  actions: {
    goToLink: function() {
      if(this.get("url")) {
        this.transitionToRoute(this.get("url"));
      }
    },
  },
});
