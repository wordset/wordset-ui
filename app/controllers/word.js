import Ember from 'ember';

export default Ember.ObjectController.extend({
  showBanner: function() {
    return !this.get("session").get("isAuthenticated");
  }.property("session.isAuthenticated"),
});
