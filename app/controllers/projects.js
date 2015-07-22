import Ember from 'ember';

export default Ember.Controller.extend({

  activeProjects: function() {
    return this.get("model").filterBy("state", "active");
  }.property("model.@each"),

  completedProjects: function() {
    return this.get("model").filterBy("state", "completed");
  }.property("model.@each"),

  upcomingProjects: function() {
    return this.get("model").filterBy("state", "upcoming");
  }.property("model.@each"),


});
