import Ember from 'ember';

export default Ember.Controller.extend({
  activity: Ember.computed("model.activities.0", function() {
    return this.get("model.activities.0");
  }),
  notification: Ember.computed("model.notification", function() {
    return this.get("model.notification");
  }),
  badge: Ember.computed("activity.badge", function() {
    return this.get("activity.badge");
  }),
  actions: {
    close() {
      this.send("closeModal");
    }
  }
});
