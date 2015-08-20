import Ember from 'ember';

export default Ember.Component.extend({
  isYae: Ember.computed("activity.vote_value", function() {
    return this.get("activity.vote_value") > 0;
  }),
});
