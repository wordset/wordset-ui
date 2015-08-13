import Ember from "ember";

export default Ember.ArrayController.extend({
  sortProperties: ['createdAt'],
  sortAscending: false,
  limitedActivities: Ember.computed("arrangedContent.[]", function() {
    return this.get("arrangedContent").slice(0,24);
  }),
});
