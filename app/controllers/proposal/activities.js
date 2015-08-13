import Ember from "ember";

export default Ember.Controller.extend({
  activities: Ember.computed('model.[]', function() {
    return this.get('model').sortBy('createdAt').reverse();
  }),
});
