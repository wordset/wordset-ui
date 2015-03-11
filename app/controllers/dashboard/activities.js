import Ember from "ember";

export default Ember.ArrayController.extend({
  sortProperties: ['createdAt'],
  sortAscending: false,
  limitedActivities: function() {
    return this.get("arrangedContent").slice(0,24);
  }.property("arrangedContent.@each"),
});
