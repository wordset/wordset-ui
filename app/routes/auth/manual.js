import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return params;
  },
  setupController(controller, model) {
    this._super(controller, model);
    this.get("session").authenticate('authenticator:api', model);
    this.notifier.show("You successefully signed in as " + model.username);
    this.replaceWith("user", model.username);
  }
});
