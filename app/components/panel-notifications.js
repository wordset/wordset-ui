import Ember from "ember";

export default Ember.Component.extend({
  sortedNotifications: function() {
    return this.get("notifications").sortBy("createdAt").reverse();
  }.property("notifications.@each")
});
