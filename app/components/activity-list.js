import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "activity-list",
  limitedActivities: Ember.computed("activities.[]", function() {
    return this.get("activities").sortBy('createdAt').reverse().slice(0,24);
  }),
});
