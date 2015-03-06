import Ember from 'ember';

export default Ember.ArrayController.extend({
  // This seemed to break the pusher
  // activitiesList: function() {
  //   console.log("Activity list recalculate")
  //   return this.get('activities').slice(0,20)
  // }.property('activities.@each'),
});
