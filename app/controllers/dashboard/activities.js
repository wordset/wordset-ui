import Ember from "ember";

export default Ember.ArrayController.extend({
  sortProperties: ['createdAt'],
  sortAscending: false,
  limitedActivities: Ember.computed("arrangedContent.@each", function() {
    return this.get("arrangedContent").slice(0,24);
  }),
});
