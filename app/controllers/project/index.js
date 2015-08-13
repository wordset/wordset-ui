import Ember from 'ember';
import ProjectCountdown from '../../mixins/project-countdown';

export default Ember.Controller.extend( ProjectCountdown, {
  currentUser: Ember.computed.alias('session.user'),
  project: Ember.computed.alias('model'),

  htmlDescription: Ember.computed("model.longDescription", function() {
    return Ember.String.htmlSafe(this.get("model.longDescription"));
  }),

  isComplete: Ember.computed("model.state", function() {
    return (this.get("model.state") === "completed");
  }),

  isIncomplete: Ember.computed("model.state", function() {
    return !(this.get("model.state") === "completed");
  }),

  projectAction: Ember.computed("model", function() {
    if(this.get("model.name") === "Proper Noun Purge") {
      return "randomProposal";
    }
    return "randomTarget";
  }),

  actions: {
    signUp() {
      this.transitionToRoute("users.new");
    }
  }
});
