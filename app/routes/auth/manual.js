import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return params;
  },
  setupController: function(controller, model) {
    this.get("session").authenticate('authenticator:api', model);
    this.notifier.show("You successefully signed in as " + model.username);
    this.replaceWith("user", {id: model.username});
  }
});
