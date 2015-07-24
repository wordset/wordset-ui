import Ember from "ember";

export default Ember.Controller.extend({
  sortedNotifications: function() {
    return this.get("model").sortBy("createdAt").reverse();
  }.property("model.@each")
});
