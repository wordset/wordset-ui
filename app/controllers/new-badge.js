import Ember from 'ember';

export default Ember.Controller.extend({
  activity: function() {
    return this.get("model.activities.0");
  }.property("model.activities.0"),
  notification: function() {
    return this.get("model.notification");
  }.property("model.notification"),
  badge: function() {
    return this.get("activity.badge");
  }.property("activity.badge"),
  actions: {
    close: function() {
      this.send("closeModal");
    }
  }
});
