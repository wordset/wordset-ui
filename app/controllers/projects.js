import Ember from 'ember';

export default Ember.Controller.extend({

  activeProjects: Ember.computed("model.@each", function() {
    return this.get("model").filterBy("state", "active");
  }),

  completedProjects: Ember.computed("model.@each", function() {
    return this.get("model").filterBy("state", "completed");
  }),

  upcomingProjects: Ember.computed("model.@each", function() {
    return this.get("model").filterBy("state", "upcoming");
  }),


});
