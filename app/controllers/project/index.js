import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  currentUser: Ember.computed.alias('controllers.application.currentUser'),

  htmlDescription: function() {
    return Ember.String.htmlSafe(this.get("model.longDescription"));
  }.property("model.longDescription"),

  isComplete: function() {
    return (this.get("model.state") === "completed");
  }.property("model.state"),

  projectAction: function() {
    if(this.get("model.name") === "Proper Noun Purge") {
      return "randomProposal";
    }
    return "randomTarget";
  }.property("model"),

  actions: {
    signUp: function() {
      this.transitionToRoute("users.new");
    }
  }
});
