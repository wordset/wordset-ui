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
    return (this.get("model.state") !== "completed");
  }),


  // This figures out if there are no targets left to fix
  projectHasNoTargetsToPropose: Ember.computed(
    "model.totalTargetsCount",
    "model.pendingTargetsCount",
    "model.fixedTargetsCount",
    function() {
      return ((this.get("model.totalTargetsCount") - 1) === (this.get("model.pendingTargetsCount") + this.get("model.fixedTargetsCount")));
    }
  ),
  actions: {
    signUp() {
      this.transitionToRoute("users.new");
    },
    randomTarget() {
      this.transitionToRoute("project.propose");
    }
  }
});
