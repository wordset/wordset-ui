import Ember from 'ember';

export default Ember.ArrayController.extend({
  activitiesList: function() {
    return this.get('activities').slice(0,20)
  }.property('activities.@each'),
});
