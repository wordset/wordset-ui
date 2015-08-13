import Ember from "ember";

export default Ember.Component.extend({
  sortedNotifications: Ember.computed("notifications.@each", function() {
    return this.get("notifications").sortBy("createdAt").reverse();
  })
});
