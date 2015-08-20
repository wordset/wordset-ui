import Ember from "ember";

export default Ember.Controller.extend({
  limitedActivities: Ember.computed("model.[]", function() {
    return this.get("model").sortBy('createdAt').reverse().slice(0,24);
  }),
});
